import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mailTransporter from "../mail.ts";
import db from "../db.ts";

interface AuthPayload {
  email: string;
  password: string;
}

export const isAuthPayloadValid = (req: Request<{}, {}, AuthPayload>, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!("email" in req.body) || typeof email !== "string" || !isEmailValid(email)) {
    return res.status(400).json({ message: "Invalid Email" });
  }
  if (!("password" in req.body) || typeof password !== "string" || !isPasswordValid(password)) {
    return res.status(400).json({ mesage: "Invalid Password" });
  }
  res.locals.email = email;
  res.locals.password = password;
  next();
};

export const isEmailUsed = async (req: Request, res: Response<{}, AuthPayload>, next: NextFunction) => {
  const { email } = res.locals;
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });
  if (user) {
    return res.status(409).json({ message: "Email is Already Used" });
  }
  next();
};

export const signIn = async (req: Request, res: Response<{}, AuthPayload>) => {
  const { email, password } = res.locals;
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "Email doesn't Exist" });
  }
  if (!user.isVerified) {
    return res.status(403).json({ message: "Email Must be Verified" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(403).json({ message: "Incorrect Password" });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.SECRET,
    {
      expiresIn: "1h",
    }
  );

  return res.status(200).json({ token: token });
};

export const signUp = async (req: Request, res: Response<{}, AuthPayload>) => {
  const { email, password } = res.locals;
  const hash = await bcrypt.hash(password, 10);
  const token = jwt.sign(
    {
      email: email,
      password: password,
    },
    process.env.SECRET,
    { expiresIn: "1h" }
  );
  const verificationUrl = `http://localhost:5173/verify-email?token=${token}`;
  const options = {
    from: process.env.TRANSPORTER_EMAIL,
    to: email,
    subject: "Email Verification",
    html: `Please click the following link to verify your email: <a href="${verificationUrl}">${verificationUrl}</a>`,
  };
  await db.user.create({
    data: {
      email: email,
      password: hash,
    },
  });
  await mailTransporter.sendMail(options);
  return res.status(200).json({ message: "Please Verify your Email" });
};

export const verifyEmail = async (req: Request<{}, {}, {}, { token: string }>, res: Response) => {
  const { token } = req.query;
  if (!("token" in req.query) || typeof token !== "string") {
    return res.status(400).json({ message: "Invalid Token" });
  }
  const payload = jwt.verify(token, process.env.SECRET);
  if (!(payload as { email: string }).email) {
    return res.status(400).json({ message: "Invalid Token Payload" });
  }
  const email = (payload as { email: string }).email;
  await db.user.update({
    data: {
      isVerified: true,
    },
    where: {
      email: email,
    },
  });
  return res.status(200).json({ message: "Email Verified Successfully" });
};

const isEmailValid = (email: string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

const isPasswordValid = (password: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

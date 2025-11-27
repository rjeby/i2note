import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mailTransporter from "../mail.ts";
import db from "../db.ts";

interface AuthPayload {
  email: string;
  password: string;
}

interface TokenPayload {
  userId: number;
  email: string;
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
  if (user && user.isVerified) {
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
      userId: user.id,
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
    },
    process.env.SECRET,
    { expiresIn: "15min" }
  );
  const verificationUrl = `${process.env.VITE_FRONTEND_BASE_URI}/verify-email?token=${token}`;
  const options = {
    from: process.env.TRANSPORTER_EMAIL,
    to: email,
    subject: "Email Verification",
    html: `Please click the following link to verify your email: <a href="${verificationUrl}">${verificationUrl}</a>`,
  };
  await db.user.upsert({
    where: {
      email: email,
    },
    create: {
      email: email,
      password: hash,
    },
    update: {
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
  const email = (payload as { email: string }).email;
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user.isVerified) {
    return res.status(400).json({ message: "User is Already Verified" });
  }

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

export const isTokenValid = async (req: Request, res: Response<{}, TokenPayload>, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!("authorization" in req.headers) || typeof authorization !== "string") {
    return res.status(400).json({ message: "Invalid Token" });
  }
  const payload = jwt.verify(authorization, process.env.SECRET) as TokenPayload;
  res.locals.userId = payload.userId;
  res.locals.email = payload.email;
  next();
};

const isEmailValid = (email: string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

const isPasswordValid = (password: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

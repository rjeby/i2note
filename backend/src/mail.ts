import nodeMailer from "nodemailer";

const TRANSPORTER_EMAIL = process.env.TRANSPORTER_EMAIL;
const TRANSPORTER_PASSWORD = process.env.TRANSPORTER_PASSWORD;

const mailTransporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: TRANSPORTER_EMAIL,
    pass: TRANSPORTER_PASSWORD,
  },
});

export default mailTransporter;

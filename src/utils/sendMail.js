import createHttpError from 'http-errors';
import nodemailer from 'nodemailer';
import { SMTP } from '../constants/constants.js';
import { env } from '../utils/env.js';

const transporter = nodemailer.createTransport({
  host: env(SMTP.SMTP_HOST),
  port: Number(env(SMTP.SMTP_PORT)),
  secure: false,
  requireTLS: true,
  auth: {
    user: env(SMTP.SMTP_USER),
    pass: env(SMTP.SMTP_PASSWORD),
  },
  tls: {
    rejectUnauthorized: false, // 🔥 self-signed SSL hatasını önler
  },
});

export const sendEmail = async (options) => {
  try {
    const info = await transporter.sendMail(options);
    return info;
  } catch (error) {
    throw createHttpError(500, error.message);
  }
};

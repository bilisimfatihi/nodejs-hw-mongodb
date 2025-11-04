import { Schema, model } from 'mongoose';

const userSchema = Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

export const Contact = model('User', userSchema);

import { Schema, model } from 'mongoose';

const contactSchema = Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    isFavourite: { type: Boolean, required: false },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
  },
  { timestamps: true },
);

export const Contact = model('Contact', contactSchema, 'Contact');

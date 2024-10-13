import mongoose, { Schema, model } from "mongoose";

export interface CardDocument {
  _id: string;
  prompt: string;
  definition: string;
  user: string;
}

const CardSchema = new Schema<CardDocument>(
  {
    prompt: {
      type: String,
      required: true,
    },
    definition: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Card = mongoose.models?.Card || model<CardDocument>("Card", CardSchema);
export default Card;

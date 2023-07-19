import { Schema, model } from 'mongoose'
import { cowBreed, cowCategory, cowLabel, cowLocations } from './cow.constant'
import { CowModel, ICow } from './cow.interface'

const cowSchema = new Schema<ICow>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
      enum: cowLocations,
    },
    breed: {
      type: String,
      required: true,
      enum: cowBreed,
    },
    weight: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
      enum: cowLabel,
    },
    category: {
      type: String,
      required: true,
      enum: cowCategory,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Cow = model<ICow, CowModel>('Cow', cowSchema)

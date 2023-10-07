/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'

import { IUser, UserModel } from './user.interface'

const UserSchema = new Schema<IUser>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ['seller', 'buyer', 'admin'],
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: false,
    },
    income: {
      type: Number,
      required: false,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },

    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

UserSchema.statics.isUserExists = async function (
  phoneNumber: string,
): Promise<Pick<
  IUser,
  'phoneNumber' | 'password' | 'needsPasswordChange' | 'role'
> | null> {
  const user = await User.findOne(
    { phoneNumber },
    { phoneNumber: 1, password: 1, needsPasswordChange: 1, role: 1 },
  )

  return user
}

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword)
}

// UserSchema.pre('save', async function (next) {
//   const user = this
//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bcrypt_salt_rounds),
//   )
//   next()
// })

export const User = model<IUser, UserModel>('User', UserSchema)

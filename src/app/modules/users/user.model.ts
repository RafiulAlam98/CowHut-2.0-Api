/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'
import config from '../../../config'
import { IUser, UserModel } from './user.interface'

const UserSchema = new Schema<IUser>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'Seller',
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'Buyer',
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
  return await User.findOne(
    { phoneNumber },
    { phoneNumber: 1, password: 1, needsPasswordChange: 1 },
  )
}

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword)
}

UserSchema.pre('save', async function () {
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )
})

export const User = model<IUser, UserModel>('User', UserSchema)

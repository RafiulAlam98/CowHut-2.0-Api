import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import ApiError from '../../errors/ApiError'
import { User } from '../users/user.model'
import { IUserLogin } from './auth.interface'

const loginUser = async (payload: IUserLogin) => {
  const { phoneNumber, password } = payload

  // check user exist
  const isUserExist = User.findOne(
    { phoneNumber },
    { phoneNumber: 1, password: 1, needsPasswordChange: 1 },
  ).lean()

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not found')
  }

  console.log(isUserExist)

  //check password
  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist?.password,
  )

  //create access token

  return {}
}
export const AuthService = {
  loginUser,
}

import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import config from '../../../config'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import ApiError from '../../errors/ApiError'
import { User } from '../users/user.model'
import { IUserLogin } from './auth.interface'

const loginUser = async (payload: IUserLogin) => {
  const { phone, password } = payload

  // check user exist
  const isUserExists = await User.isUserExists(phone)
  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  //matched password
  if (
    isUserExists?.password &&
    !(await User.isPasswordMatched(password, isUserExists?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }

  const { phoneNumber, role, needsPasswordChange } = isUserExists

  // create access token
  const accessToken = jwtHelpers.createToken(
    { phoneNumber, role },
    config.jwt.secret as Secret,
    config.jwt.secret_expire_in as string,
  )

  const refreshToken = jwtHelpers.createToken(
    { phoneNumber, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_secret_expire_in as string,
  )

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  }
}
export const AuthService = {
  loginUser,
}

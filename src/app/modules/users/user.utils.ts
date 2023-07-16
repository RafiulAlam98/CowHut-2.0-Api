import { User } from './user.model'

//generate seller id

export const findLastSellerId = async (): Promise<string | undefined> => {
  const lastSellerId = await User.findOne(
    { role: 'seller' },
    { userId: 1, _id: 0 },
  )
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastSellerId?.userId ? lastSellerId.userId.substring(2) : undefined
}

export const generateSellerId = async (): Promise<string> => {
  const currentId =
    (await findLastSellerId()) || (0).toString().padStart(5, '0')
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  incrementedId = `S-${incrementedId}`
  return incrementedId
}

//Generate Buyer Id

export const findLastBuyerId = async (): Promise<string | undefined> => {
  const lastBuyer = await User.findOne({ role: 'buyer' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastBuyer?.userId ? lastBuyer.userId.substring(2) : undefined
}

export const generateBuyerId = async (): Promise<string> => {
  const currentId = (await findLastBuyerId()) || (0).toString().padStart(5, '0')
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  incrementedId = `B-${incrementedId}`

  return incrementedId
}

import { Seller } from './seller.model'

const getAllSellerService = async () => {
  const result = await Seller.find()
  return result
}
const getSingleSellerService = async (id: string) => {
  const result = await Seller.findById(id)
  return result
}

export const SellerService = {
  getAllSellerService,
  getSingleSellerService,
}

import { IBreed, ICategory, ILabel, ILocations } from './cow.interface'

export const cowLocations: ILocations[] = [
  'Dhaka',
  'Chattogram',
  'Barishal',
  'Rajshahi',
  'Sylhet',
  'Comilla',
  'Rangpur',
  'Mymensingh',
]

export const cowBreed: IBreed[] = [
  'Brahman',
  'Nellore',
  'Sahiwal',
  'Gir',
  'Indigenous',
  'Tharparkar',
  'Kankrej',
]
export const cowLabel: ILabel[] = ['for sale', 'sold out']

export const cowCategory: ICategory[] = ['Dairy', 'Beef', 'Dual Purpose']

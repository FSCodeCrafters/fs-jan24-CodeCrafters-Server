import { type ProductDescription } from './ProductDescription';

export interface ProductDetails {
  id: string
  category: string
  namespaceId?: string | null
  name: string
  capacityAvailable: string[]
  capacity: string
  priceRegular: number
  priceDiscount: number
  colorsAvailable: string[]
  color: string
  images: string[]
  description: ProductDescription[]
  screen: string
  resolution: string
  processor: string
  ram: string
  camera?: string | null
  zoom?: string | null
  cell: string[]
}

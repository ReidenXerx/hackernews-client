import { ItemTypes } from './constants'

export type CommentsLevel = {
  [id: number]: Item
}

export type Item = {
  by: string
  descendants: number
  id: number
  kids?: Array<number> | CommentsLevel
  parts: Array<number>
  score: number
  text: string
  time: number
  title: string
  type: ItemTypes
  imageUrl?: string
  url?: string
}

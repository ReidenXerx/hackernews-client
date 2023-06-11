import { RequestMethods } from '../constants'
import { Item } from '../types'
import { fetchRequest } from './requester'
import { deleteWrongWords } from './validators'

const apiUrlBase = '/api'
const topStories = '/topstories.json'
const getItem = (id: number) => `/item/${id}.json?print=pretty`

export const getTopStories = () =>
  fetchRequest<Array<number>>(`${apiUrlBase}${topStories}`, {
    method: RequestMethods.get,
  })

export const getItemById = async (id: number) => {
  const item = await fetchRequest<Item>(`${apiUrlBase}${getItem(id)}`, {
    method: RequestMethods.get,
  })
  item.text && (item.text = deleteWrongWords(item.text))
  return item
}

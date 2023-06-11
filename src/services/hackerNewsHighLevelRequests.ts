import { CommentsLevel, Item } from '../types'
import { getItemById } from './hackerNewsLowLevelRequests'

export const getCommentTree = async (
  commentIds: Array<number> = [],
): Promise<CommentsLevel> => {
  const currentLevelComments: { [id: number]: Item } = {}
  for (const commentId of commentIds) {
    const commentObject = await getItemById(commentId)
    if (commentObject.kids && typeof commentObject.kids[0] === 'number') {
      commentObject.kids = await getCommentTree(
        commentObject.kids as Array<number>,
      )
    }
    currentLevelComments[commentObject.id] = commentObject
  }
  return currentLevelComments
}

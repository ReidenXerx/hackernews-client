import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Post from '../components/Post'
import * as hackerNewsHighLevelRequests from '../services/hackerNewsHighLevelRequests'
import { CommentsLevel, Item } from '../types'
import { ItemTypes } from '../constants'

jest.mock('../services/hackerNewsHighLevelRequests')

const mockPost: Item = {
  title: 'Test Post',
  by: 'Test User',
  text: 'Test Text',
  type: ItemTypes.story,
  score: 100,
  time: 1175714200,
  descendants: 1,
  kids: [1],
  id: 1,
  parts: [],
}

const mockComments: CommentsLevel = {
  1: {
    id: 1,
    text: 'Mock Comment',
    kids: {},
    by: 'john',
    descendants: 0,
    title: 'title',
    score: 4,
    time: Date.now(),
    type: ItemTypes.comment,
    parts: [],
  },
}

jest.mock('../assets/gung.jpg', () => ({
  default: 'test-image-path.jpg',
}))

beforeEach(() => {
  jest
    .spyOn(hackerNewsHighLevelRequests, 'getCommentTree')
    .mockResolvedValue(mockComments)
})

it('renders PostCard correctly', () => {
  render(<Post post={mockPost} />)
  expect(screen.getByText('Test Post')).toBeInTheDocument()
})

it('comment section doesnt render initially', () => {
  render(<Post post={mockPost} />)
  const commentsSection = screen.queryByTestId('comments-section') ?? null
  expect(commentsSection).not.toBeInTheDocument()
})

it('loads comments on click', async () => {
  render(<Post post={mockPost} />)

  fireEvent.click(screen.getByText(/Comments: 1/i))
  expect(hackerNewsHighLevelRequests.getCommentTree).toHaveBeenCalledWith([1])

  await waitFor(
    () => {
      expect(screen.findByText('Mock Comment'))
    },
    { timeout: 1000 },
  )
})

import { useState } from 'react'
import './App.css'
import { useAsyncEffect } from './hooks/useAsyncEffect'
import {
  getItemById,
  getTopStories,
} from './services/hackerNewsLowLevelRequests'
import { Item } from './types'
import Post from './components/Post'
import Context from './Context'

function App() {
  const [posts, setPosts] = useState(Array<Item>)

  useAsyncEffect(async () => {
    console.log()
    const topStoriesIds = await getTopStories()
    const getItemByIdCreators = topStoriesIds
      .slice(0, 9)
      .map((id) => () => getItemById(id))
    setPosts(
      await Promise.all(
        getItemByIdCreators.reduce(
          (acc: Array<Promise<Item>>, creator: () => Promise<Item>) => [
            ...acc,
            creator(),
          ],
          [],
        ),
      ),
    )
  })

  return (
    <Context>
      <>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </>
    </Context>
  )
}

export default App

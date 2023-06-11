import { useState } from 'react'
import { TextField, Button } from '@mui/material'
import { useCustomContext } from '../hooks/useCustomContext'
import { ItemTypes } from '../constants'

const CommentForm: React.FC = () => {
  const [comment, setComment] = useState('')
  const { pasteComment } = useCustomContext()

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value)
  }

  const handleSendComment = () => {
    pasteComment?.callback({
      id: Math.floor(Math.random() * 1_000_000) + 1,
      text: comment,
      by: 'me',
      descendants: 0,
      parts: [],
      score: 5,
      time: Date.now() / 1000,
      title: comment,
      type: ItemTypes.comment,
    })
    setComment('')
  }

  return (
    <div>
      <TextField
        label="Comment"
        value={comment}
        onChange={handleCommentChange}
        fullWidth
        variant="outlined"
        margin="normal"
        color="success"
      />
      <Button variant="contained" onClick={handleSendComment}>
        Send
      </Button>
    </div>
  )
}

export default CommentForm

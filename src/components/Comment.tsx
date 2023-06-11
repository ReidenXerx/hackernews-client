import { Button, Typography } from '@mui/material'

type CommentProps = {
  time: number
  label: string
  by: string
  selected: boolean
  onClickReply: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Comment = ({ time, by, onClickReply, label, selected }: CommentProps) => {
  return (
    <Typography variant="body2" align="left">
      {time && (
        <Typography variant="caption">
          {new Date(time * 1000).toDateString()}
        </Typography>
      )}
      {by && (
        <Typography variant="body2" fontWeight={800}>
          {' '}
          {by}:
        </Typography>
      )}
      {label}
      {selected && <Button onClick={onClickReply}>Reply</Button>}
    </Typography>
  )
}

export default Comment

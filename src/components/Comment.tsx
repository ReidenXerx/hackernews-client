import { Typography } from '@mui/material'

type CommentProps = {
  time: number
  label: string
  by: string
  onContextMenu: (event: React.MouseEvent<HTMLDivElement>) => void
}

const Comment = ({ time, by, onContextMenu, label }: CommentProps) => {
  return (
    <Typography onContextMenu={onContextMenu} variant="body2" align="left">
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
    </Typography>
  )
}

export default Comment

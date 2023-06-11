import { useState } from 'react'
import MuiTreeItem from '@mui/lab/TreeItem'
import { CommentsLevel, Item } from '../types'
import { Typography } from '@mui/material'
import React from 'react'
import { useCustomContext } from '../hooks/useCustomContext'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

type TreeItemProps = {
  nodeId: string
  label: string
  kids: CommentsLevel
  onContextMenu?: (event: Event) => void
  by: string
  time: number
}

export const TreeItem: React.FC<TreeItemProps> = ({
  nodeId,
  by,
  time,
  label,
  kids,
}) => {
  const [comments, setComments] = useState<CommentsLevel | undefined>(kids)
  const { updatePasteComment, expandedTreeItems } = useCustomContext()

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    updatePasteComment?.((comment: Item) => {
      setComments({ ...comments, [comment.id]: comment })
    })
  }

  return (
    <MuiTreeItem
      expandIcon={comments ? <ExpandMoreIcon /> : <></>}
      collapseIcon={comments ? <ChevronRightIcon /> : <></>}
      label={
        <Typography
          onContextMenu={handleContextMenu}
          variant="body2"
          align="left"
        >
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
      }
      nodeId={nodeId}
      key={nodeId}
      sx={{
        '&:not(:last-child)': {
          marginBottom: '10px',
        },
      }}
    >
      {/* optimization for not rendering whole tree at initial start when it is not expanded */}
      {!!comments &&
        Object.entries<Item>(comments)
          .slice(0, 1)
          .map(([id, comment]) => (
            <TreeItem
              nodeId={id}
              label={comment.text}
              kids={comment.kids as CommentsLevel}
              by={comment.by}
              time={comment.time}
            />
          ))}
      {!!comments &&
        expandedTreeItems?.includes(nodeId) &&
        Object.entries<Item>(comments)
          .slice(1)
          .map(([id, comment]) => (
            <TreeItem
              nodeId={id}
              label={comment.text}
              kids={comment.kids as CommentsLevel}
              by={comment.by}
              time={comment.time}
            />
          ))}
    </MuiTreeItem>
  )
}
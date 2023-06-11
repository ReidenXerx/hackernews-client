import { useState } from 'react'
import MuiTreeItem from '@mui/lab/TreeItem'
import { CommentsLevel, Item } from '../types'
import React from 'react'
import { useCustomContext } from '../hooks/useCustomContext'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Comment from './Comment'

type TreeItemProps = {
  nodeId: string
  label: string
  kids: CommentsLevel
  onContextMenu?: (event: Event) => void
  by?: string
  time?: number
}

export const TreeItem: React.FC<TreeItemProps> = ({
  nodeId,
  by,
  time,
  label,
  kids,
}) => {
  const [comments, setComments] = useState<CommentsLevel | undefined>(kids)
  const { updatePasteComment, expandedTreeItems, selectedTreeItems } =
    useCustomContext()

  const onClickReply = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    updatePasteComment?.((comment: Item) => {
      setComments({ ...comments, [comment.id]: comment })
    })
  }

  return (
    <MuiTreeItem
      expandIcon={comments ? <ExpandMoreIcon /> : <></>}
      collapseIcon={comments ? <ChevronRightIcon /> : <></>}
      label={
        <Comment
          by={by}
          time={time}
          label={label}
          selected={!!selectedTreeItems?.includes(nodeId)}
          onClickReply={onClickReply}
        />
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
          .map(([id, { text, kids, by, time }]) => (
            <TreeItem
              nodeId={id}
              label={text}
              kids={kids as CommentsLevel}
              by={by}
              time={time}
            />
          ))}
      {!!comments &&
        expandedTreeItems?.includes(nodeId) &&
        Object.entries<Item>(comments)
          .slice(1)
          .map(([id, { text, kids, by, time }]) => (
            <TreeItem
              nodeId={id}
              label={text}
              kids={kids as CommentsLevel}
              by={by}
              time={time}
            />
          ))}
    </MuiTreeItem>
  )
}

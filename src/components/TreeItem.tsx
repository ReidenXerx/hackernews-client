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
  const [comments, setComments] = useState<Array<Item>>(
    kids ? Object.values(kids) : [],
  )
  const { updatePasteComment, expandedTreeItems, selectedTreeItems } =
    useCustomContext()

  const onClickReply = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    updatePasteComment?.((comment: Item) => {
      setComments((prevComments) => [...prevComments, comment])
    })
  }

  return (
    <MuiTreeItem
      expandIcon={comments.length ? <ExpandMoreIcon /> : <></>}
      collapseIcon={comments.length ? <ChevronRightIcon /> : <></>}
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
      {!!comments.length &&
        comments
          .slice(0, 1)
          .map(({ text, kids, by, time, id }) => (
            <TreeItem
              nodeId={id.toString()}
              label={text}
              kids={kids as CommentsLevel}
              by={by}
              time={time}
            />
          ))}
      {!!comments.length &&
        expandedTreeItems?.includes(nodeId) &&
        comments
          .slice(1)
          .map(({ text, kids, by, time, id }) => (
            <TreeItem
              nodeId={id.toString()}
              label={text}
              kids={kids as CommentsLevel}
              by={by}
              time={time}
            />
          ))}
    </MuiTreeItem>
  )
}

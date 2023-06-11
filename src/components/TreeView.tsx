import TreeView from '@mui/lab/TreeView'
import { CommentsLevel } from '../types'
import { TreeItem } from './TreeItem'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useCustomContext } from '../hooks/useCustomContext'

type TreeViewProps = {
  id: string
  title: string
  kids: CommentsLevel
}

function CustomTreeView({ kids, id, title }: TreeViewProps) {
  const {
    updateExpandedTreeItems,
    expandedTreeItems,
    selectedTreeItems,
    updateSelectedTreeItems,
  } = useCustomContext()

  const handleToggle = (
    _event: React.SyntheticEvent,
    nodeIds: Array<string>,
  ) => {
    updateExpandedTreeItems?.(nodeIds)
  }

  const handleSelect = (
    _event: React.SyntheticEvent,
    nodeIds: Array<string>,
  ) => {
    updateSelectedTreeItems?.(nodeIds)
  }

  return (
    <TreeView
      expanded={expandedTreeItems}
      selected={selectedTreeItems}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <TreeItem key={`${id} container`} nodeId={id} label={title} kids={kids} />
    </TreeView>
  )
}

export default CustomTreeView

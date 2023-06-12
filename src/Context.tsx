import React, { createContext, useState } from 'react'
import { Item } from './types'

export interface ContextType {
  expandedTreeItems: Array<string>
  updateExpandedTreeItems?: (expandedTreeItems: Array<string>) => void
  selectedTreeItems: Array<string>
  updateSelectedTreeItems?: (selectedTreeItems: Array<string>) => void
  pasteComment?: { callback: (comment: Item) => void }
  // bypassing collision with setState callback in updatePasteComment
  updatePasteComment?: (callback: (comment: Item) => void) => void
  clearPasteComment?: () => void
}

type MyContextProviderProps = {
  children: React.ReactNode
}

export const CustomContext = createContext<ContextType>({
  expandedTreeItems: [],
  selectedTreeItems: [],
})

const CustomContextProvider: React.FC<MyContextProviderProps> = ({
  children,
}) => {
  const [expandedTreeItems, setExpandedTreeItems] = useState<Array<string>>([])
  const [selectedTreeItems, setSelectedTreeItems] = useState<Array<string>>([])
  const [pasteComment, setPasteComment] = useState<{
    callback: (comment: Item) => void
  }>()

  const updateExpandedTreeItems = (expandedTreeItems: Array<string>) => {
    setExpandedTreeItems(expandedTreeItems)
  }

  const updateSelectedTreeItems = (selectedTreeItems: Array<string>) => {
    setSelectedTreeItems(selectedTreeItems)
  }

  const updatePasteComment = (pasteComment: (comment: Item) => void) => {
    setPasteComment({ callback: pasteComment })
  }

  const clearPasteComment = () => {
    setPasteComment(undefined)
  }

  const contextValue = {
    expandedTreeItems,
    selectedTreeItems,
    pasteComment,
    updateExpandedTreeItems,
    updateSelectedTreeItems,
    updatePasteComment,
    clearPasteComment,
  }

  return (
    <CustomContext.Provider value={contextValue}>
      {children}
    </CustomContext.Provider>
  )
}

export default CustomContextProvider

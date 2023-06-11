import { render, screen } from '@testing-library/react'
import MyTreeView from '../components/TreeView'
import { ItemTypes } from '../constants'
import '@testing-library/jest-dom/extend-expect'

describe('MyTreeView', () => {
  test('renders tree view with title', () => {
    render(
      <MyTreeView
        id="1"
        title="Test title"
        kids={{
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
        }}
      />,
    )

    expect(screen.getByText('Test title')).toBeInTheDocument()
  })
})

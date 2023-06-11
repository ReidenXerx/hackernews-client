import { render, screen, fireEvent } from '@testing-library/react'
import CommentForm from '../components/CommentForm'
import '@testing-library/jest-dom/extend-expect'
import { CustomContext } from '../Context'

jest.mock('../hooks/useCustomContext', () => ({
  useCustomContext: () => ({
    pasteComment: { callback: jest.fn() },
  }),
}))

describe('CommentForm', () => {
  test('changes value when typing', () => {
    render(
      <CustomContext.Provider
        value={{
          pasteComment: { callback: jest.fn() },
        }}
      >
        <CommentForm />
      </CustomContext.Provider>,
    )

    fireEvent.change(screen.getByLabelText('Comment'), {
      target: { value: 'test comment' },
    })

    expect(screen.getByLabelText('Comment')).toHaveValue('test comment')
  })
})

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const addBlog = jest.fn()
  const handleChangeTitle = jest.fn()

  render(<BlogForm blogAdder={addBlog} handleChangeTitle={handleChangeTitle} />)

  const title = screen.getByPlaceholderText('Title')
  const author = screen.getByPlaceholderText('Author')
  const url = screen.getByPlaceholderText('Url')
  const sendButton = screen.getByText('create')

  await user.type(title, 'Nyt lopppu juominen, sano Jamppa Tuominen')
  await user.type(author, 'Jamppa Tuominen')
  await user.type(url, 'www.jokuvaan.com')
  await user.click(sendButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0]).toEqual({
    title: 'Nyt lopppu juominen, sano Jamppa Tuominen',
    author: 'Jamppa Tuominen',
    url: 'www.jokuvaan.com',
    likes: 0,
  })

})
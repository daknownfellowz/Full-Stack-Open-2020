import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog/>', () => {
  let container

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Jaska Jokunen',
    url: 'www.bloggeri1.fi',
    likes: 100
  }

  test('renders title and author by default', () => {
    container = render(
      <Blog
        blog={blog}
        updateBlog={() => console.log('delete')}
        removeBlog={() => console.log('like')}
      />
    ).container

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('Component testing is done with react-testing-library')
    expect(div).toHaveTextContent('Jaska Jokunen')
  })


  test('does not render url and likes by default', () => {
    container = render(
      <Blog
        blog={blog}
        updateBlog={() => console.log('like')}
        removeBlog={() => console.log('delete')}
      />
    ).container

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })


  test('after clicking the button, url and likes are displayed', async () => {
    container = render(
      <Blog
        blog={blog}
        updateBlog={() => console.log('like')}
        removeBlog={() => console.log('delete')}
      />
    ).container

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })


  test('clicking the like button twice calls event handler twice', async () => {

    const mockHandler = jest.fn()

    render(
      <Blog blog={blog} updateBlog={mockHandler} />
    )

    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  screen.debug()

})
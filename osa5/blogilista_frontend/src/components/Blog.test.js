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

  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        deleteBlog={() => console.log('delete')}
        handleLikes={() => console.log('like')}
      />
    ).container
  })

  test('renders title and author by default', () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('Component testing is done with react-testing-library')
    expect(div).toHaveTextContent('Jaska Jokunen')
  })

  test('does not render url and likes by default', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, url and likes are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  // screen.debug()

})
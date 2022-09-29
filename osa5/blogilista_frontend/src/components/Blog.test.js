import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog/>', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Jaska Jokunen',
    url: 'www.bloggeri1.fi',
    likes: 100
  }

  const component = render(
    <Blog blog={blog} />
  )

  const div = component.container.querySelector('.blog')

  test('renders title and author by default', () => {
    expect(div).toHaveTextContent('Component testing is done with react-testing-library')
    expect(div).toHaveTextContent('Jaska Jokunen')
  })

  test('does not render url and likes by default', () => {
    expect(div).not.toHaveTextContent('www.bloggeri1.fi')
    expect(div).not.toHaveTextContent('100')
  })

  // screen.debug()

})
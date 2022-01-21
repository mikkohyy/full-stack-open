import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

const testBlog = {
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
  user: {
    username: 'acidburn',
    name: 'Kate Libby',
    id: '61e44b8aa3e17777cf7fce8c'
  },
  id: '61e7094634ccc6bd2942d5ee'
}

test('does not render all the information at the beginning', () => {
  const renderedComponent = render(
    <Blog blog={testBlog} updateBlog={() => {}} removeBlog={() => {}} />
  )

  const additionalInfo = renderedComponent.container.querySelector('.additionalBlogInfo')
  expect(additionalInfo).toHaveStyle('display: none')
})
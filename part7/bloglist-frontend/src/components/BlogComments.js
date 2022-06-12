import React from 'react'

const BlogComments = ({ comments }) => {
  return (
    <div>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogComments

import React, { useState } from 'react'
import Button from './Button'
import commentService from '../services/comments'
import { addComment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const CommentAddField = ({ blogId }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const onClick = async (event) => {
    event.preventDefault()
    const newComment = {
      blogId: blogId,
      text: comment,
    }
    const addedComment = await commentService.addComment(newComment)
    dispatch(addComment(addedComment))
    setComment('')
  }

  return (
    <div>
      <form>
        <input value={comment} onChange={handleCommentChange} />
        <Button text="add comment" onClick={onClick} />
      </form>
    </div>
  )
}

export default CommentAddField

import React, { useState } from 'react'
import commentService from '../services/comments'
import { addComment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { TextField, Button } from '@mui/material'

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
        <div>
          <TextField
            value={comment}
            onChange={handleCommentChange}
            label="comment"
            size="small"
          />
        </div>
        <div>
          <Button onClick={onClick} size="small" variant="outlined">
            add comment
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CommentAddField

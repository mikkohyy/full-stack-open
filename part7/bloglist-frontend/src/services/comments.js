import axios from 'axios'

const baseUrl = '/api/blogs'

const addComment = async (comment) => {
  const response = await axios.post(
    `${baseUrl}/${comment.blogId}/comments`,
    comment
  )

  return response.data
}

export default { addComment }

import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}))

const UserBlogs = () => {
  const id = useParams().id
  const users = useSelector((state) => state.users)
  const user = users.find((user) => user.id === id)

  if (!user) {
    return null
  } else {
    return (
      <div>
        <h2>{user.name}</h2>
        <h3>added blogs</h3>
        <TableContainer>
          <Table>
            <TableBody>
              {user.blogs.map((blog) => (
                <StyledTableRow key={blog.title}>
                  <TableCell>{blog.title}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }
}

export default UserBlogs

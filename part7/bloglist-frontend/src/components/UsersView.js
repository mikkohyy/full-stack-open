import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersWithBlogN } from '../reducers/usersReducer'
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}))

const UsersView = () => {
  const dispatch = useDispatch()
  const usersWithBlogsN = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(getUsersWithBlogN())
  }, [])

  return (
    <TableContainer>
      <h2>Created blogs</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>blogs created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersWithBlogsN.map((user) => (
            <StyledTableRow key={user.name}>
              <TableCell>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </TableCell>
              <TableCell>{user.nOfBlogs}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UsersView

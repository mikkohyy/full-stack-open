import { useQuery, useLazyQuery } from '@apollo/client'
import { USER_FAVOURITE_GENRE, ALL_BOOKS_IN_GENRE } from '../queries'
import React, { useEffect, useState } from 'react'

const RecommendView = ({ show, token }) => {
  const [recommendedBooks, setRecommendedBooks] = useState([])
  const [favouriteGenre, setFavouriteGenre] = useState('')

  const userInfo = useQuery(USER_FAVOURITE_GENRE)
  const [getBooks, books] = useLazyQuery(ALL_BOOKS_IN_GENRE, {
    variables: { genre: favouriteGenre },
  })

  useEffect(() => {
    if (!userInfo.loading) {
      setFavouriteGenre(userInfo.data.me.favouriteGenre)
    }
  }, [userInfo])

  useEffect(() => {
    if (!userInfo.loading && favouriteGenre !== '') {
      getBooks({
        variables: { genre: favouriteGenre },
      })
    }
  }, [userInfo, getBooks, favouriteGenre])

  useEffect(() => {
    if (!userInfo.loading && !books.loading && books.data) {
      setRecommendedBooks(books.data.allBooks)
    }
  }, [userInfo, books])

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      {!books.loading && !userInfo.loading && (
        <div>
          books in your favourite genre <b>{favouriteGenre}</b>
        </div>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {!books.loading &&
            !userInfo.loading &&
            recommendedBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecommendView

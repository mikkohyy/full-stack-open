import { useQuery } from '@apollo/client'
import { USER_FAVOURITE_GENRE, ALL_BOOKS } from '../queries'
import React, { useEffect, useState } from 'react'

const RecommendView = ({ show }) => {
  const userInfo = useQuery(USER_FAVOURITE_GENRE)
  const books = useQuery(ALL_BOOKS)

  const [recommendedBooks, setRecommendedBooks] = useState([])

  useEffect(() => {
    if (!userInfo.loading && !books.loading) {
      const loadedBooks = books.data.allBooks
      const userFavouriteGenre = userInfo.data.me.favouriteGenre

      setRecommendedBooks(() => {
        const booksInGenre = loadedBooks.filter((book) =>
          book.genres.includes(userFavouriteGenre)
        )
        return booksInGenre
      })
    }
  }, [books, userInfo])

  if (!show) {
    return null
  }
  return (
    <div>
      <h2>recommendations</h2>
      {!books.loading && !userInfo.loading && (
        <div>
          books in your favourite genre <b>{userInfo.data.me.favouriteGenre}</b>
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

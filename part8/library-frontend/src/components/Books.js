import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import GenreSelector from './GenreSelector'

const Books = (props) => {
  const books = useQuery(ALL_BOOKS)
  const [filteredBooks, setFilteredBooks] = useState([])
  const [genres, setGenres] = useState(['all genres'])
  const [selectedGenre, setSelectedGenre] = useState('all genres')

  useEffect(() => {
    if (!books.loading) {
      const booksData = books.data.allBooks
      setGenres((genres) => {
        const genreData = booksData.map((book) => book.genres).flat()
        const uniqueGenres = ['all genres', ...new Set(genreData)]
        return uniqueGenres
      })
    }
  }, [books])

  useEffect(() => {
    if (!books.loading) {
      const booksData = books.data.allBooks
      const filtered =
        selectedGenre === 'all genres'
          ? booksData
          : booksData.filter((book) => book.genres.includes(selectedGenre))
      setFilteredBooks(filtered)
    }
  }, [books, selectedGenre])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {!books.loading &&
            filteredBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <GenreSelector genres={genres} setGenre={setSelectedGenre} />
    </div>
  )
}

export default Books

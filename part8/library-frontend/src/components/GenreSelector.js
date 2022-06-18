import React from 'react'

const GenreSelector = ({ genres, setGenre }) => {
  return (
    <div>
      {genres.map((genre) => (
        <button key={genre} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      ))}
    </div>
  )
}

export default GenreSelector

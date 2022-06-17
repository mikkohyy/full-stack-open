import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import ModifyBirthYear from './ModifyBirthYear'

const Authors = ({ show, token }) => {
  const authors = useQuery(ALL_AUTHORS)

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {!authors.loading &&
            authors.data.allAuthors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {!authors.loading && token && (
        <ModifyBirthYear currentAuthors={authors.data.allAuthors} />
      )}
    </div>
  )
}

export default Authors

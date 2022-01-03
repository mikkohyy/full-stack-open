import React, { useState } from 'react'

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const DisplayAnecdote = ({ anecdote, votes }) => {
  return (
    <div>
      {anecdote}
      <br />
      has {votes} votes
      <br />
    </div>
  )
}

const Title = ({ text }) => {
  return (
    <h2>{text}</h2>
  )
}

const DisplayAnecdoteWithMostVotes = ({ anecdotes, votes }) => {
  const maxValue = Math.max(...votes)
  const indexOfMaxValue = votes.indexOf(maxValue)
  return (
    <DisplayAnecdote
      anecdote={anecdotes[indexOfMaxValue]}
      votes={votes[indexOfMaxValue]}
    />
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const changeDisplayedAnecdote = () => {
    const randomAnecdotesIndex = Math.floor(Math.random(0) * anecdotes.length)

    setSelected(randomAnecdotesIndex)
  }

  const addVote = () => {
    const copyOfVotes = [...votes]
    copyOfVotes[selected] += 1
    setVotes(copyOfVotes)
  }

  return (
    <div>
      <Title text="Anecdote of the day" />
      <DisplayAnecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button text="vote" handleClick={addVote}/>
      <Button text="next anecdote" handleClick={changeDisplayedAnecdote} />
      <Title text ="Anecdote with most votes" />
      <DisplayAnecdoteWithMostVotes anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App

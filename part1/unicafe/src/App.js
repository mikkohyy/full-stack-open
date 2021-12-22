import React, { useState } from 'react'

const Header = ({ text }) => (
  <h1>{text}</h1>
)

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
)

const Statisticsline = ({ text, value }) => (
  <div>{text} {value}</div>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addFeedback = (value, setFunction) => () => {
    setFunction(value+1)
  }

  return (
    <div>
      <Header text="Give feedback" />
      <Button text="good" handleClick={addFeedback(good, setGood)} />
      <Button text="neutral" handleClick={addFeedback(neutral, setNeutral)} />
      <Button text="bad" handleClick={addFeedback(bad, setBad)} />
      <Header text="Statistics" />
      <Statisticsline text="good" value={good} />
      <Statisticsline text="neutral" value={neutral} />
      <Statisticsline text="bad" value={bad} />
    </div>
  )
}

export default App
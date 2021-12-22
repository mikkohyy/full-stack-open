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

  const countAverage = () => {
    const nOfFeedbacks = good + neutral + bad
    console.log(nOfFeedbacks)
    const sumOfScores = (1 * good) + (-1 * bad)
    const average = sumOfScores / nOfFeedbacks
    return average
  }
  
  const countPositivePresentage = () => {
    const nOfFeedbacks = good + neutral + bad
    const positiveProportion = good / nOfFeedbacks
    const positivePresentage = positiveProportion * 100
    return positivePresentage
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
      <Statisticsline text="all" value={good + neutral + bad} />
      <Statisticsline text="average" value={countAverage()} />
      <Statisticsline text="positive" value={countPositivePresentage() + " %"} /> 
    </div>
  )
}

export default App
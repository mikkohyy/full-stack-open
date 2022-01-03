import React, { useState } from 'react'

const Header = ({ text }) => (
  <h1>{text}</h1>
)

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad}) => {
  const countAverage = () => {
    let average = 0
    const nOfFeedbacks = good + neutral + bad
    
    if (nOfFeedbacks !== 0) {
      const sumOfScores = (1 * good) + (-1 * bad)
      average = sumOfScores / nOfFeedbacks
    }

    return average
  }
  
  const countPositivePresentage = () => {
    let positivePresentage = 0
    
    if (good !== 0) {
      const nOfFeedbacks = good + neutral + bad
      const positiveProportion = good / nOfFeedbacks
      positivePresentage = positiveProportion * 100
    }
    
    return positivePresentage
  }

  if (bad + neutral + good === 0) {
    return (
      <div>No feedback given</div>
    )
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={good + neutral + bad} />
          <StatisticLine text="average" value={countAverage()} />
          <StatisticLine text="positive" value={countPositivePresentage() + " %"} />
        </tbody>
      </table>
    )
  }
}

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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
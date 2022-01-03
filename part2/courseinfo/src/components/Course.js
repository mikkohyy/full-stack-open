import React from 'react'

const Header = ({ text }) => {
    return (
      <h2>{text}</h2>
    )
  }
  
const Total = ({ parts }) => {
  
  const numberOfExercises = parts.reduce(
    (previous, current) => previous + current.exercises, 0
  )
  
  return (
    <b>total of {numberOfExercises} exercises</b>
  )
}
  
const Part = ({ part }) => {
  const { name, exercises } = part
  return (
    <p>
      {name} {exercises}
    </p>    
  )
}
  
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </div>
  )
}
  
const Course = ({ course }) => {
  const { name, parts } = course
  return (
    <div>
      <Header text={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default Course
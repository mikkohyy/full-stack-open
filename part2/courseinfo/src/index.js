import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Total = ({ parts }) => {
  let numberOfExercises = 0

  for (let i = 0; i < parts.length; i++) {
    numberOfExercises += parts[i].exercises
  }

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

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <Course course={course} />
  )

}

ReactDOM.render(<App />, document.getElementById('root'))
import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>
      {props.course.name}
    </h1>    
  )  
}

const Content = (props) => {
  return (<div>
    {props.parts.parts.map((parts, index) => (
        <p key={index}>{parts.name} {parts.exercises}</p>
    ))}
    </div>);
}

const Course = (props) => {
  const { course } = props
  return (
    <div>
      <Header course={course} />
      <Content parts={course} />
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
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
    <div>
      <Course course={course} />
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))
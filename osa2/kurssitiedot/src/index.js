import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h2>
      {props.course.name}
    </h2>    
  )  
}

const Content = (props) => {
  return (<div>
    {props.parts.parts.map((parts, index) => (
        <p key={index}>{parts.name} {parts.exercises}</p>
    ))}
    </div>);
}

const Total = (props) => {

  const total = props.parts.parts.reduce((totalExercises, part) => totalExercises + part.exercises, 0);

  return (
    <>
    <p><b>total of {total} exercises</b></p>
    </>
  )  
}

const Course = (props) => {
  const { course } = props
  return (
    <div>
      <Header course={course} />
      <Content parts={course} />
      <Total parts={course} />
    </div>
  )
}

const App = () => {
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
        <h1>Web development curriculum</h1>
       { courses.map(course => <Course key={course.id} course={course} />) }    
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
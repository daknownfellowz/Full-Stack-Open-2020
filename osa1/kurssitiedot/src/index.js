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
  console.log(props)
  return (<div>
    {props.parts.parts.map((parts, index) => (
        <p key={index}>{parts.name} {parts.exercises}</p>
    ))}
    </div>);
}

const Total = (props) => {

  let sum = 0;

  props.parts.parts.forEach(value => {
    sum = sum + value.exercises
  })

  return (
    <>
    <p>Number of exercises {sum}</p>
    </>
  )  
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course} />
      <Total parts={course} />
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))
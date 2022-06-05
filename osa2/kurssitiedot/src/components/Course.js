import React from 'react'

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

export default Course
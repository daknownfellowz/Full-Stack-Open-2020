import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {

  return (
  <div>
    <h2>statistics</h2>
    <p>
    good {props.good}<br />
    neutral {props.neutral}<br />
    bad {props.bad}<br />
    all {props.all}<br />
    average {props.average}<br />
    positive {props.positive} %
    </p>
  </div>
  )

}

const App = () => {

  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0, all: 0, average: 0, positive: 0
  })

  const handleGoodClick = () => {

    clicks.good = clicks.good + 1
    let sum = clicks.good + clicks.neutral + clicks.bad

    const newClicks = {
      good: clicks.good,
      neutral: clicks.neutral,
      bad: clicks.bad,
      all: clicks.good + clicks.neutral + clicks.bad,
      average: ((clicks.good * 1) + (clicks.neutral * 0) + (clicks.bad * -1)) / sum,
      positive: (clicks.good / sum) * 100
    }
    setClicks(newClicks)
    
  }

  const handleNeutralClick = () => {

    clicks.neutral = clicks.neutral + 1
    let sum = clicks.good + clicks.neutral + clicks.bad

    const newClicks = {
      good: clicks.good,
      neutral: clicks.neutral,
      bad: clicks.bad,
      all: clicks.good + clicks.neutral + clicks.bad,
      average: ((clicks.good * 1) + (clicks.neutral * 0) + (clicks.bad * -1)) / sum,
      positive: (clicks.good / sum) * 100
    }
    setClicks(newClicks)
    
  }

  const handleBadClick = () => {

    clicks.bad = clicks.bad + 1
    let sum = clicks.good + clicks.neutral + clicks.bad

    const newClicks = {
      good: clicks.good,
      neutral: clicks.neutral,
      bad: clicks.bad,
      all: clicks.good + clicks.neutral + clicks.bad,
      average: ((clicks.good * 1) + (clicks.neutral * 0) + (clicks.bad * -1)) / sum,
      positive: (clicks.good / sum) * 100
    }
    setClicks(newClicks)
    
  }

  return (
    <div>
      <h1>give feedback</h1>

      <button onClick={handleGoodClick}>Good</button>
      <button onClick={handleNeutralClick}>Neutral</button>
      <button onClick={handleBadClick}>Bad</button>

      <Statistics good={clicks.good} neutral={clicks.neutral} bad={clicks.bad} all={clicks.all} 
      average={clicks.average} positive={clicks.positive} />
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
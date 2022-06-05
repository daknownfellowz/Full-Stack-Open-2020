import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {

  if (props.all > 0) {
    return (
    <div>
      <h2>statistics</h2>
      <p>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.all} />
      <StatisticLine text="average" value={props.average} />
      <StatisticLine text="positive" value={props.positive + ' %'} />
      </p>
    </div>
    )
  } else {
    return (
      <div>
      <h2>statistics</h2>
      <p>No feedback given</p>
      </div>
    )
  }

}

const StatisticLine = (props) => <div>{props.text}: {props.value}</div>

const Button = (props) => <button onClick={props.onClick}>{props.label}</button>

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

      <Button onClick={handleGoodClick} label="Good" />
      <Button onClick={handleNeutralClick} label="Neutral" />
      <Button onClick={handleBadClick} label="Bad" />

      <Statistics good={clicks.good} neutral={clicks.neutral} bad={clicks.bad} all={clicks.all} 
      average={clicks.average} positive={clicks.positive} />
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
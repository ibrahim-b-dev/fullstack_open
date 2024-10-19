import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>;

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

  const Statistics = ({ values }) => {
  const [good, neutral, bad] = values;
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;
  
  if (all === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive + " %"} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseGood = () => {
    const newValue = good + 1
    setGood(newValue)
  }

  const increaseNeutral = () => {
    const newValue = neutral + 1
    setNeutral(newValue)
  }
  const increaseBad = () => {
    const newValue = bad + 1
    setBad(newValue)
  }

  return (
    <div>
      <Header text={"give feed back"}/>

      <Button handleClick={increaseGood} text="good" />
      <Button handleClick={increaseNeutral} text="neutral" />
      <Button handleClick={increaseBad} text="bad" />

      <Header text="statistics" />
      <Statistics values={[good, neutral, bad]} />
    </div>
  )
};

export default App;

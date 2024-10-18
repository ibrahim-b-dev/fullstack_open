const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  const parts = props.parts

  return (
    <div>
      <p>
        {parts[0].title} {parts[0].exercises}
      </p>
      <p>
        {parts[1].title} {parts[1].exercises}
      </p>
      <p>
        {parts[2].title} {parts[2].exercises}
      </p>
    </div>
  )
}

const Total = (props) => {
  console.log(props);
  
  return (
    <p>Number of exercises {props.total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content parts={[{title: part1, exercises: exercises1}, {title: part2, exercises: exercises2}, {title: part3, exercises: exercises3}]} />
      <Total total={exercises1+exercises2+exercises3} />
    </div>
  )
}

export default App
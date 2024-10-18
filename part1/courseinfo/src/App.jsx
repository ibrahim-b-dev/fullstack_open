const Header = (props) => {
  console.log(props)

  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  const part = props.part

  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

  const Content = (props) => {
  const parts = props.parts

  return (
    <div>
      <Part part={parts[0]}/>
      <Part part={parts[1]}/>
      <Part part={parts[2]}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App
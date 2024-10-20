const Part = ({ part }) => {
  const { name, exercises } = part

  return (
    <p>{name} {exercises}</p>
  )
}

const Content = ({ content }) => {
  const total = content.reduce((acc, part) => acc + part.exercises, 0)

  return (
    <div>
      {content.map(
        part => <Part key={part.id} part={part} />
      )}
      <p>total of {total} exercises</p>
    </div>
  )
}

const Header = ({ name }) => <h1>{name}</h1>

const Course = ({ course }) => {
  const { name, parts } = course;

  return (
    <>
      <Header name={name} />
      <Content content={parts} />
    </>
  )
};

export default Course;
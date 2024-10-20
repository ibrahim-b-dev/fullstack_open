const Persons = ({ persons }) => {
  return (
    <div>
      {
        persons.map(person => 
          <p key={person.number}>{person.name} {person.number}</p>
        )
      }
    </div>
  )
}

export default Persons
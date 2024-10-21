const Persons = ({ persons, deletePerson }) => {
  return (
    <>
      {
        persons.map(person => 
          <div key={person.number}>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person.id)}>delete</button>
          </div>
        )
      }
    </>
  )
}

export default Persons
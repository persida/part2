const Persons = ({ persons, searchPhrase, handleDeletePerson }) => {
  return (
    <>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(searchPhrase.toLowerCase())
        )
        .map((person) => (
          <p key={person.name}>
            {person.name} {person.number} <button onClick={() => handleDeletePerson(person)}>delete</button>
          </p>
        ))}
    </>
  );
};

export default Persons;

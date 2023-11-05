import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Notification from "./Notification";
import personServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchPhrase, setSearchPhrase] = useState("");
  const [message, setMessage] = useState({ text: null, type: null });

  const handleSubmit = (event) => {
    event.preventDefault();
    const person = persons.find((person) => person.name === newName);
    if (person) {
      if (
        window.confirm(
          `${person.name} is already in the phonebook, replace the old number with a new one?`
        )
      ) {
        const updatePerson = { ...person, number: newNumber };
        personServices
          .update(person.id, updatePerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === updatedPerson.id ? updatedPerson : person
              )
            );
            setMessage({
              text: `Number was changed for ${updatedPerson.name}`,
              type: "notification",
            });
            setTimeout(() => setMessage(null), 5000);
          })
          .catch((error) => {
            setMessage({
              text: `Information of ${updatePerson.name} has already been removed from server`,
              type: "error",
            });
            setTimeout(() => setMessage(null), 5000);
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      personServices.create(newPerson).then((createdPerson) => {
        setPersons(persons.concat(createdPerson));
        setMessage({
          text: `${createdPerson.name} was added to phonebook`,
          type: "notification",
        });
        setTimeout(() => setMessage(null), 5000);
      });
    }
    setNewName("");
    setNewNumber("");
  };

  const handleChangeName = (e) => {
    setNewName(e.target.value);
  };

  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleChangePhrase = (e) => {
    setSearchPhrase(e.target.value);
  };

  const handleDeletePerson = (personForDeletion) => {
    if (window.confirm(`Delete ${personForDeletion.name}?`)) {
      personServices
        .deleteObject(personForDeletion.id)
        .then(
          setPersons(
            persons.filter((person) => person.id !== personForDeletion.id)
          )
        );
    }
  };

  useEffect(() => {
    personServices.getAll().then((allPersons) => setPersons(allPersons));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter
        searchPhrase={searchPhrase}
        handleChangePhrase={handleChangePhrase}
      />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        searchPhrase={searchPhrase}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'
import Footer from './components/Footer'
import personService from './services/persons'


const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ successMessage, setSuccessMessage ] = useState(null)
  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const namesArray = persons.map((person) => person.name)
    let oldPerson = persons.filter(person => person.name === newName)
    let oldNumber
    let oldID
    if(oldPerson.length !== 0) {
      console.log('oldPerson name: ', oldPerson[0].name)
      oldNumber = oldPerson[0].name.number
      oldID = oldPerson[0].name.id
    }

    let personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    if(namesArray.includes(newName) && oldPerson.length !== 0) {
       
       if(oldNumber !== newNumber) {
         if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) )
          {
              personObject = {
              name: newName,
              number: newNumber,
              id: oldID
            }
            deletePerson(oldPerson[0]) 
          } else {
              personObject = {
              name: newName,
              number: oldNumber,
              id: oldID
            }
            deletePerson(oldPerson[0])
          } 
       } else {
         window.alert(`${newName} is already added to phonebook with the same number`)
       } 
       
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setSuccessMessage(
          `Person ${personObject.name} was added to the server`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
        setNewFilter('')
      })

  }

  const deletePerson = (person) => {
    if(person !== undefined) {
      if(window.confirm(`Delete ${person.name}?`)) {  
        personService
          .deletePerson(person.id, person)
          .then(setPersons(persons.filter(contact => contact.id !== person.id)))
          setSuccessMessage(
            `Person ${person.name}'s number was changed`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
          /* .catch(error => {
            setErrorMessage(
              `Person '${person.name}' was already removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== person.id))
          }) */
      } else {
          return null
      } 
    } else {
      console.log('person undefined')
      return null
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setShowAll(false)
    setNewFilter(event.target.value)
  }



  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter value={newFilter} onChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm onSubmit={addPerson} 
                  namevalue={newName} namechange={handleNameChange}
                  numbervalue={newNumber} numberchange={handleNumberChange}/>
      
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map( person => 
         <Person id={person.id} name={person.name} number={person.number} deletePerson={() => deletePerson(person)}/>)
        }
      </ul>
      <Footer />
    </div>
  )
}

export default App

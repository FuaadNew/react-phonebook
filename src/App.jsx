import { useState } from 'react'


const Numbers = ({persons}) =>{
  
  return (
    <>
      {persons.map (person => <p key = {person.name}> {person.name} {person.number}</p>)}
    </>
    
  )
}



const App = () => {
 
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1234567'
     }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const handleNameChange = (event) =>{
    setNewName(event.target.value)
    
  }

  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
    


  }


  const addPerson = (event) =>{

    
    event.preventDefault()
    const newPerson = {
      name: newName,
      number:newNumber

    }
   
    if (persons.some(person => person.name === newName)){
      alert(`${newName} has already been added to the phonebook`)
      setNewName('')
      
      return
    }

    
    if (newPerson.name !== ''){

    
    setPersons(persons.concat(newPerson))
    console.log(newPerson)
    setNewName('')
    setNewNumber('')

    }
    
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
          placeholder='' 
          value = {newName}
          onChange = {handleNameChange}
          />
          <div>
            number: <input placeholder='' value = {newNumber} onChange={handleNumberChange}/>
           
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons}></Numbers>
      
    
    </div>
  )
}

export default App
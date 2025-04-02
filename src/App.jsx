import { useState, useEffect} from 'react'
import axios from 'axios'



const Persons = ({persons, newFilter}) =>{
  const filteredPerson = persons.filter(person => 
    person.name.toLowerCase().includes(newFilter.toLowerCase()))
  
  return (
    <>
      
      {filteredPerson.map(person => <p key = {person.name}> {person.name} {person.number}</p>)}
    </>
    
  )
}

const Filter = ({newFilter, setNewFilter}) =>{

  const filterList = (event) =>{
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <div> filter shown with <input type="text" value = {newFilter} onChange={filterList} /> </div>

    </div>
  )
}

const PersonForm = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber}) => {


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
  )

}



const App = () => {
  useEffect(()=>{
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
     })

  },[])
  

  

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')




 

  return (
    <div>
      <h2>Phonebook</h2>
      

      <Filter newFilter = {newFilter} setNewFilter={setNewFilter}></Filter>

      <h3>Add a new</h3>

      <PersonForm persons = {persons} setPersons = {setPersons} newName={newName} setNewName={setNewName} newNumber = {newNumber} setNewNumber={setNewNumber}></PersonForm>

     
      


      
   
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter}></Persons>
      
    
    </div>
  )
}

export default App
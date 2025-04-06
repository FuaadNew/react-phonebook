import { useState, useEffect} from 'react'
import personService from './services/Persons'


const Notification = ({style, message}) =>{
  const NotificationStyle = {
    display: `${style}`,
    backgroundColor: 'lightgrey',
    border: '1px solid green',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'

  }
  return (
    <div style={NotificationStyle}> {message}</div>
  )
}

const DeleteButton = ({onClick}) =>{
  return( <button onClick={onClick}>Delete</button>)


}


const Persons = ({persons, newFilter, onClick}) =>{
  const filteredPerson = persons.filter(person => 
    person.name.toLowerCase().includes(newFilter.toLowerCase()))
  
  return (
    <>
      
      {filteredPerson.map(person => <p key = {person.name}> {person.name} {person.number} <DeleteButton onClick = {() => onClick(person.id)}></DeleteButton></p>)}
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

const PersonForm = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber, setNotificationStyle}) => {


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
   
    if (persons.some(person => person.name === newName && person.number !== newNumber)){
      const existingPerson = persons.find(person=> person.name == newName)
      if( window.confirm(`${newName} has already been added to the phonebook, replace the old number with the new one?`)){
        personService.update(existingPerson.id, newPerson).then(response => {
          setPersons(persons.map(person => person.id == existingPerson.id ? response.data: person ))
        })
      }
      setNewName('')
      setNewNumber('')
    
      return
    }else if (persons.some(person => person.name == newName ))
    {
      alert(`${newName} is already in the phoneBook`)
      setNewName('')
      setNewNumber('')
      
      return
    }


    
    if (newPerson.name !== ''){
      personService.create(newPerson).then(response => {
     
    setPersons(persons.concat(response.data))
    console.log(newPerson)
    setNewName('')
    setNewNumber('')
    setNotificationStyle({style:'block', message: `Added ${newPerson.name}`})
    setTimeout(()=>{setNotificationStyle({style:'none', message: ''})},5000)
      })


    
    

    

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

  const handleDelete = (id) => {
    if (window.confirm("Delete this person?")){
      personService.deletePerson(id).then(()=>{
        setPersons(persons.filter(person => person.id !== id))
      }).catch(error => {
        const person = persons.filter(person => person.id == id)
        console.log(error)
        console.log(person)
        setNotificationStyle({style:'block', message: `${person[0].name} has already been deleted from the phone book`})
        setTimeout(()=>{setNotificationStyle({style:'none', message: ''})},5000)
          
      })

      }

      }
    
  


  useEffect(()=>{

  personService.getAll().then(response => {
      setPersons(response)
     })

  },[])
  

  
  const [notificationStyle, setNotificationStyle] = useState({style:'None', name: ''})
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')




 

  return (
    <div>
      
      <h2>Phonebook</h2>

      <Notification style ={notificationStyle.style} message ={notificationStyle.message}> </Notification>
      

      <Filter newFilter = {newFilter} setNewFilter={setNewFilter}></Filter>

      <h3>Add a new</h3>

      <PersonForm persons = {persons} setPersons = {setPersons} newName={newName} setNewName={setNewName} newNumber = {newNumber} setNewNumber={setNewNumber} setNotificationStyle={setNotificationStyle}></PersonForm>

     
      


      
   
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} onClick={handleDelete}></Persons>
      
    
    </div>
  )
}

export default App
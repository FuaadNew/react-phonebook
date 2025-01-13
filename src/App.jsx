import {useState, useEffect} from 'react'
import axios from 'axios'
import personService from './services/Persons.js'

const Notifcation = ({message}) =>{

  const NotifcationStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  if (message === null){
    return null
  }
  return <div style={NotifcationStyle}>
    <p>{`${message} was added`}</p>
  </div>
}

const Filter = ({filter, setFilter}) => {return (
 <div> Filter Shown with: <input onChange={(e)=>{setFilter(e.target.value)
    console.log({filter})}}></input>
    
  
</div>)}



const PersonForm = ({newName, setNewName, newNumber,setNewNumber, persons, setPersons,setNotificationMessage }) =>{


  const addPerson = (event)=>{
   
    
    event.preventDefault()
    const nameSet = new Set(persons.map(person=>person.name))

    const newPerson = {
      name: newName,
      number: newNumber,
     
    }
    
    if (nameSet.has(newName) && nameSet.has(newNumber) ){
      alert(`${newName } is already added to the phonebook`)
      return

    }else if (nameSet.has(newName) &&  !nameSet.has(newNumber) ){
      const personToUpdate = persons.find(person => person.name === newName)

      if (window.confirm(`${newName } is already added to phonebook, replace the old number with a new one? `)){
        personService.changeNumber(personToUpdate.id,newPerson).then(response =>{
          setPersons(persons.map(person => person.id === personToUpdate.id ? {...person,number:newNumber}:person))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(`Updated ${newName}'s number`)
          setTimeout(()=>setNotificationMessage(null),5000)

        }).catch(error => {
          setNotificationMessage(`Information of ${newPerson.name} has already been removed from the server. `)
          setTimeout(()=>setNotificationMessage(null),5000)
        })
      }
    }
    

      
    
    personService.create(newPerson).then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        setNotificationMessage(`${newName} was added`)
        setTimeout(()=>setNotificationMessage(null),5000)





      })

}
  return (

    <form onSubmit={addPerson}>
      <div>name:<input value={newName}  onChange={(e)=>setNewName(e.target.value)} /></div>
      <div>number:<input value= {newNumber} onChange={(e) => setNewNumber(e.target.value)} /></div>
      <div><button type='submit'>add</button></div>
    </form>
  )

}

const Numbers = ({persons, filter, setPersons}) =>{
  const dynamicFilter = persons.filter((person) =>
    person.name && person.name.toLowerCase().includes(filter.toLowerCase())
  );
  const handleDelete = (id,name) => {
    if (window.confirm(`Do you really want to delete ${name}?`)) {
    personService.deletePerson(id).then(()=>{
      setPersons(prevPersons => prevPersons.filter(person => person.id !== id))
      
    })

  }
  
  
  }

  

  
  return ( <div>{dynamicFilter.map((person)=><p key = {person.id}>{person.name} {person.number} <button onClick={()=>handleDelete(person.id, person.name) }>Delete</button></p>)}</div>)

}




const App = () =>{
  const [persons,setPersons] = useState([])
  useEffect( ()=>{
    personService.GetAll().then(response =>{
      setPersons(response)
    })
  },[])

 
  
 
  const [newName,setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [filter,setFilter] = useState('')
  const [notificationMessage,setNotificationMessage] = useState(null)


    
    
  
 

  return( <div>
    <Notifcation message = {notificationMessage}></Notifcation>
    <h2>PhoneBook</h2>
    <Filter setFilter={setFilter} filter={filter}></Filter>
    <h3>Add a new</h3>
    <PersonForm newName = {newName} setNewName = {setNewName} newNumber = {newNumber} setNewNumber = {setNewNumber} persons={persons} setPersons = {setPersons} setNotificationMessage = {setNotificationMessage}></PersonForm>
 



  

    <h3>Numbers</h3>
    <Numbers persons={persons} filter ={filter} setPersons={setPersons}></Numbers>

    
      
    
  </div>)


    }
export default App
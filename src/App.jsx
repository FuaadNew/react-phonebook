import {useState, useEffect} from 'react'
import axios from 'axios'


const Filter = ({filter, setFilter}) => {return (
 <div> Filter Shown with: <input onChange={(e)=>{setFilter(e.target.value)
    console.log({filter})}}></input>
    
  
</div>)}



const PersonForm = ({newName, setNewName, newNumber,setNewNumber, persons, setPersons }) =>{

  const addPerson = (event)=>{
    event.preventDefault()
    const nameSet = new Set(persons.map(person=>person.name))
    
    if (nameSet.has(newName)){
      alert(`${newName } is already added to the phonebook`)
      return

    } 
    setPersons([...persons,{name:newName, number:newNumber, id:persons.length+1}])
      setNewName('')
      setNewNumber('')

}
  return (

    <form onSubmit={addPerson}>
      <div>name:<input value={newName}  onChange={(e)=>setNewName(e.target.value)} /></div>
      <div>number:<input value= {newNumber} onChange={(e) => setNewNumber(e.target.value)} /></div>
      <div><button type='submit'>add</button></div>
    </form>
  )

}

const Numbers = ({persons, filter}) =>{
  const dynamicFilter = persons.filter(person=> person.name.toLowerCase().includes(filter.toLowerCase()))

  return ( <div>{dynamicFilter.map((person)=><p key = {person.id}>{person.name} {person.number}</p>)}</div>)

}


const App = () =>{
  const [persons,setPersons] = useState([])
  useEffect( ()=>{
    axios.get('http://localhost:3001/persons').then(response =>{
      setPersons(response.data)
    })
  },[])

 
  
 
  const [newName,setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [filter,setFilter] = useState('')


    
    
  
 

  return( <div>
    <h2>PhoneBook</h2>
    <Filter setFilter={setFilter} filter={filter}></Filter>
    <h3>Add a new</h3>
    <PersonForm newName = {newName} setNewName = {setNewName} newNumber = {newNumber} setNewNumber = {setNewNumber} persons={persons} setPersons = {setPersons} ></PersonForm>
 



  

    <h3>Numbers</h3>
    <Numbers persons={persons} filter ={filter}></Numbers>

    
      
    
  </div>)


    }
export default App
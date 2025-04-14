import axios from "axios";

const baseurl ='http://localhost:3001/api/persons'


const GetAll = () =>{
    const request = axios.get(baseurl)
    return request.then(response=> response.data)
}

const create = (newPerson) => {
    const request = axios.post(baseurl, newPerson)
    console.log('Creating new person:', newPerson)
    return request.then(response=> response.data)
}

const update = (updatedPerson) => {
    const request = axios.put(`${baseurl}/${updatedPerson.id}`, updatedPerson)
    console.log('Updating person with ID:', updatedPerson.id)
    console.log('Update data:', updatedPerson)
    return request.then(response=> response.data)
}

const changeNumber = (id, updatedPerson) => {
    const request = axios.put(`${baseurl}/${id}`, updatedPerson)
    return request.then(response=> response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseurl}/${id}`)
    return request.then(response => response.data)
}

export default { GetAll, create, update, changeNumber, deletePerson }
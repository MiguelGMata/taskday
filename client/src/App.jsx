import { useState, useEffect } from 'react'
import { getDataUsers } from './axios';
import './App.css'

const App = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const dataUsers = await getDataUsers();
      setUsers(dataUsers)
    }
    fetchUsers();
  }, [])

  return (
    <>
      <div className='App'>
        {users.map((user) =>
          <ul key={user.id}>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
          </ul>
        )}
      </div>
    </>
  )
}

export default App

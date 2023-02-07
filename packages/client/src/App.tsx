import { useEffect } from 'react'
import './App.css'
import UserAPI from './api/profile'

function App() {
  useEffect(() => {

    const userProfile = UserAPI.getUserById(123)
    console.log('userProfile ', userProfile)

    // const fetchServerData = async () => {
    //   const url = `http://localhost:${__SERVER_PORT__}`
    //   const response = await fetch(url)
    //   const data = await response.json()
    //   console.log(data)
    // }

    // fetchServerData()
  }, [])
  return <div className="App">Вот тут будет жить ваше приложение :)</div>
}

export default App

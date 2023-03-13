import React, { useEffect } from 'react'
import { Router } from './Router'
import { serviceWorkersRegistration } from './serviceWorkersRegistration'

function App() {
  useEffect(() => {
    serviceWorkersRegistration()
  }, [])

  return <Router />
}

export default App

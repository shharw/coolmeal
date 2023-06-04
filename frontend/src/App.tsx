import React from 'react'
import './input.css'
import Router from './Router'
import Header from './Header'

const App: React.FC = () => {
  return (
    <div className="bg-yellow min-h-screen">
      <Header/>
      <div className="px-6">
        <Router/>
      </div>
    </div>
  )
}

export default App

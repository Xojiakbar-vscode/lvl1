import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'

const Home = () => <h1>Home Page</h1>
const About = () => <h1>About Page</h1>
const Contact = () => <h1>Contact Page</h1>

const App = () => {
  return (
    <div>
      <nav style={{ display: 'flex', gap: '20px', padding: '20px' }}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App

import './styles/App.css'

import { Routes, Route } from "react-router-dom";
import Header from "./components/layouts/Header";
import Home from "./scenes/Home";
import About from "./scenes/About";
import Projects from "./scenes/Projects";
import Education from "./scenes/Education";
import Services from "./scenes/Services";
import Contact from "./scenes/Contact";
import Login from "./scenes/Login";
import Register from "./scenes/Register";

function App() {
  
  return (
    <>
      <Header/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/education" element={<Education />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
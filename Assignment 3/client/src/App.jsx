import './styles/App.css'

import { Routes, Route } from "react-router-dom";
import { useUser } from './context/UserContext';

import Header from "./components/layouts/Header";
import Home from "./scenes/Home";
import About from "./scenes/About";
import Projects from "./scenes/Projects";
import Education from "./scenes/Education";
import Services from "./scenes/Services";
import Contact from "./scenes/Contact";
import Login from "./scenes/Login";
import Register from "./scenes/Register";
import ProtectedRoute from './routes/ProtectedRoute';

function App() {

  const { user } = useUser();

  return (
    <>
      <Header />
      <Routes>

        {/* Protected Group */}
        <Route element={<ProtectedRoute />} >
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/education" element={<Education />} />
          <Route path="/services" element={<Services />} />
        </Route>

        {/* Public Group */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/contact" element={<Contact />} />

        {/* any other path -> if authenticated go to Home, otherwise redirect to /login */}
        <Route path="*" element={user ? <Home /> : <Login />} />
      </Routes>
    </>
  );
}

export default App
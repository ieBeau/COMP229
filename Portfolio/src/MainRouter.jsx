/**
 * MainRouter component sets up the application's main routing structure and renders the Header.
 * 
 * It defines routes for the Home, About, Projects, Education, Services, and Contact pages using React Router.
 * The Header component is displayed on all pages.
 * 
 * @component
 * @returns {JSX.Element} The rendered router with header and all defined routes.
 * 
 * @example
 * // Usage in App.jsx
 * <BrowserRouter>
 *   <MainRouter />
 * </BrowserRouter>
 */

import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./scenes/Home";
import About from "./scenes/About";
import Projects from "./scenes/Projects";
import Education from "./scenes/Education";
import Services from "./scenes/Services";
import Contact from "./scenes/Contact";

const MainRouter = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/education" element={<Education />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </>
    );
}

export default MainRouter;
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./scenes/Home";
import About from "./scenes/About";
import Projects from "./scenes/Projects";
import Education from "./scenes/Education";
import Services from "./scenes/Services";
import Contact from "./scenes/Contact";

const MainRouter = () => {
    return (
        <>
            <Layout />
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
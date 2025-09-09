import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Education from "./components/Education";
import Projects from "./components/Projects";

const MainRouter = () => {
    return (
        <>
            <Layout />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/education" element={<Education />} />
                <Route path="/projects" element={<Projects />} />
            </Routes>
        </>
    );
}

export default MainRouter;
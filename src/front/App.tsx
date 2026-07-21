import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import About from "./pages/About";
import CaseDetail from "./pages/CaseDetail";
import Cases from "./pages/Cases";
import Contact from "./pages/Contact";
import ContactThanks from "./pages/ContactThanks";
import Engineers from "./pages/Engineers";
import Home from "./pages/Home";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Philosophy from "./pages/Philosophy";
import SlideCategory from "./pages/SlideCategory";
import Slides from "./pages/Slides";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/cases/:id" element={<CaseDetail />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/introduction"
          element={<Navigate to="/engineers/philosophy" replace />}
        />
        <Route path="/engineers" element={<Engineers />} />
        <Route path="/engineers/philosophy" element={<Philosophy />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/slides" element={<Slides />} />
        <Route path="/slides/:categoryId" element={<SlideCategory />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact/thanks" element={<ContactThanks />} />
      </Routes>
    </Layout>
  );
}

export default App;

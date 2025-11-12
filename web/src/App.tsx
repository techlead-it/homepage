import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ContactThanks from "./pages/ContactThanks";
import Home from "./pages/Home";
import Introduction from "./pages/Introduction";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact/thanks" element={<ContactThanks />} />
      </Routes>
    </Layout>
  );
}

export default App;

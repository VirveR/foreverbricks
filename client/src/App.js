import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Parts from './components/Parts';
import Sets from './components/Sets';
import Admin from './components/Admin';
import Blog from './components/Blog';
import NotFound from './components/NotFound';

function App() {
  return (
    <>
      <Header />

      {/* Navigation */}
      <BrowserRouter>
        <nav id="nav-main" className="row">
          <div id="nav-home" className="nav-item inset-box">
            <Link to="/" className="no-underline">Home</Link>
          </div>
          <div id="nav-parts" className="nav-item inset-box">
            <Link to="/parts" className="no-underline">Parts</Link>
          </div>
          <div id="nav-sets" className="nav-item inset-box">
            <Link to="/sets" className="no-underline">Sets</Link>
          </div>
          <div id="nav-admin" className="nav-item inset-box">
            <Link to="/admin" className="no-underline">Admin</Link>
          </div>
          <div id="nav-blog" className="nav-item inset-box">
            <Link to="/blog" className="no-underline">Blog</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/parts" element={<Parts />} />
          <Route path="/sets" element={<Sets />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      <Footer />
  </>
  );
}

export default App;

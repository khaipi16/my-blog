import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import { Home } from './components/home/Home';
import {WriteBlog} from './components/blogs/WriteBlog'
import { Login } from './components/login/Login';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/write" element={<WriteBlog />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>

  );
}

export default App;

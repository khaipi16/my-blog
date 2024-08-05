import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import { Home } from './components/pages/home/Home';
import { WriteBlog } from './components/blogs/WriteBlog'
import { Login } from './components/pages/login/Login';
import SingleBlog from './components/pages/single-blog/BlogPage';
import Timeline from './components/pages/timeline/Timeline';
import Register from './components/pages/login/Register';
import AllBlogs from './components/pages/allBlogs/AllBlogs';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs/:id" element={<SingleBlog />} />
        <Route path="/recent-blogs" element={<Timeline />} />
        <Route path="/all-blogs" element={<AllBlogs />} />
        <Route path="/write" element={<WriteBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>

  );
}

export default App;

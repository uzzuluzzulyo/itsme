import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/navbar.jsx';
import Footer from './components/common/footer.jsx';
import Home from './pages/home.jsx';
import Posts from './pages/posts.jsx';
import PostDetail from './pages/post-detail.jsx';
import Login from './pages/login.jsx';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

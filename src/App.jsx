import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/navbar.jsx';
import Footer from './components/common/footer.jsx';
import RequireAuth from './components/common/require-auth.jsx';
import Home from './pages/home.jsx';
import About from './pages/about.jsx';
import Posts from './pages/posts.jsx';
import Login from './pages/login.jsx';
import Signup from './pages/signup.jsx';
import FindId from './pages/find-id.jsx';
import FindPassword from './pages/find-password.jsx';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/find-id" element={<FindId />} />
        <Route path="/find-password" element={<FindPassword />} />
        <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="/about" element={<RequireAuth><About /></RequireAuth>} />
        <Route path="/posts" element={<RequireAuth><Posts /></RequireAuth>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

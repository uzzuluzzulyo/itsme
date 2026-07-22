import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/navbar.jsx';
import Footer from './components/common/footer.jsx';
import RequireAuth from './components/common/require-auth.jsx';
import CursorEffects from './components/common/cursor-effects.jsx';
import Home from './pages/home.jsx';
import About from './pages/about.jsx';
import Members from './pages/members.jsx';
import Discography from './pages/discography.jsx';
import GatewayVideos from './pages/gateway-videos.jsx';
import Board from './pages/board.jsx';
import Login from './pages/login.jsx';
import Signup from './pages/signup.jsx';
import FindId from './pages/find-id.jsx';
import FindPassword from './pages/find-password.jsx';

function App() {
  return (
    <>
      <CursorEffects />
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/find-id" element={<FindId />} />
        <Route path="/find-password" element={<FindPassword />} />
        <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="/about" element={<RequireAuth><About /></RequireAuth>} />
        <Route path="/members" element={<RequireAuth><Members /></RequireAuth>} />
        <Route path="/discography" element={<RequireAuth><Discography /></RequireAuth>} />
        <Route path="/gateway" element={<RequireAuth><GatewayVideos /></RequireAuth>} />
        <Route path="/board" element={<RequireAuth><Board /></RequireAuth>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

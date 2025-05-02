import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import EditNote from './pages/EditNote/EditNote'; // Add this import
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './pages/Landing/LandingPage';

function App() {
  return (
    <>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-[#1a0223]">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/edit/:noteId" element={<EditNote />} /> {/* Add this route */}
          </Routes>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Router>
    </>
  )
}

export default App

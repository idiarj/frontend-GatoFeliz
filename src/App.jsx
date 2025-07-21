import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './views/auth/login.jsx';
import Register from './views/auth/register.jsx';
import RecoverPassword from './views/auth/RecoverPassword.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/recoverPassword' element={<RecoverPassword/>}/>
        <Route path="*" element={<Navigate to= "/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App

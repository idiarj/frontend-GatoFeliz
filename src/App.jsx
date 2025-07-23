import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './views/auth/login.jsx';
import Register from './views/auth/register.jsx';
import RecoverPassword from './views/auth/recoverPassword.jsx';
import NewPassword from './views/auth/newPassword.jsx';
import Dashboard from './views/user/dashboard.jsx';
import AboutUs from './views/user/aboutUs.jsx';
import Donations from './views/user/donations.jsx';
import Questions from './views/user/questions.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/recoverPassword' element={<RecoverPassword/>}/>
        <Route path='/NewPassword' element={<NewPassword/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/aboutUs' element={<AboutUs/>}/>
        <Route path='/donations' element={<Donations/>}/>
        <Route path='/questions' element={<Questions/>}/>
        {/* Redirigir a login si no hay ruta coincidente */}
        <Route path="*" element={<Navigate to= "/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App

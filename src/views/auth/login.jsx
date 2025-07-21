
import React from 'react';
import { FaUserCircle, FaLock } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import gatosesion from '../../assets/gatosesion.png';
import '../../App.css';

const Login = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f5f5f5' }}>
      {/* Left side with logo */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
        <img src={logo} alt="Fundación Gato Feliz" style={{ maxWidth: '65%', height: 'auto' }} />
      </div>
      {/* Right side with login form */}
      <div style={{ flex: 1, minWidth: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#fff', boxShadow: '0 0 40px 0 rgba(0,0,0,0.07)' }}>
        <h1 style={{ color: '#F37021', fontWeight: 'bold', fontSize: '3.2rem', marginBottom: '2.5rem', textAlign: 'center', letterSpacing: '1px' }}>INICIA SESIÓN</h1>
        <form style={{ width: '100%', maxWidth: 440 }}>
          {/* Usuario */}
          <div style={{ position: 'relative', marginBottom: '2rem' }}>
            <FaUserCircle style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', color: '#F37021', fontSize: 32 }} />
            <input
              type="text"
              placeholder="USUARIO"
              style={{
                width: '100%',
                padding: '22px 22px 22px 60px',
                borderRadius: 36,
                border: 'none',
                background: '#E5E5E5',
                fontWeight: 'bold',
                fontSize: '1.35rem',
                outline: 'none',
                boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
              }}
            />
            <img src={gatosesion} alt="Gato sesión" style={{ position: 'absolute', right: -60, top: -45, width: 100, height: 'auto' }} />
          </div>
          {/* Contraseña */}
          <div style={{ position: 'relative', marginBottom: '2rem' }}>
            <FaLock style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', color: '#F37021', fontSize: 32 }} />
            <input
              type="password"
              placeholder="CONTRASEÑA"
              style={{
                width: '100%',
                padding: '22px 22px 22px 60px',
                borderRadius: 36,
                border: 'none',
                background: '#E5E5E5',
                fontWeight: 'bold',
                fontSize: '1.35rem',
                outline: 'none',
                boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
              }}
            />
          </div>
          {/* Links */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem', fontWeight: 'bold', fontSize: '1.15rem', color: '#F37021', letterSpacing: '0.5px' }}>
            ¿OLVIDASTE TU CONTRASEÑA? <span style={{ color: '#F7B95B', cursor: 'pointer', fontSize: '16px' }}> HAGA CLICK AQUI</span><br />
            ¿NO TIENES CUENTA? <span style={{ color: '#F7B95B', cursor: 'pointer', fontSize: '16px' }}> HAGA CLICK AQUI</span>
          </div>
          {/* Botón ingresar */}
          <button type="submit" style={{ width: '100%', background: '#F37021', color: '#fff', fontWeight: 'bold', fontSize: '1.45rem', border: 'none', borderRadius: 36, padding: '22px 0', cursor: 'pointer', letterSpacing: '1px', boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)' }}>
            INGRESAR
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

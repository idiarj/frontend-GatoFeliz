
import React, { useState } from 'react';
import { FaUserCircle, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import gatosesion from '../../assets/gatosesion.png';
import gatosesiondespierto from '../../assets/gatosesiondespierto.png';
import miau from '../../assets/miau.mp3';
import { playSoundOnce, stopAllPurring } from '../../utils/audio';
import '../../App.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [gatoDespierto, setGatoDespierto] = useState(false);

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f5f5f5' }}>
      {/* Left side with logo */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff9db' }}>
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
              placeholder="Usuario"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '22px 44px 22px 60px',
                borderRadius: 36,
                border: 'none',
                background: '#E5E5E5',
                fontSize: '1.35rem',
                outline: 'none',
                boxShadow: '0 4px 16px 0 rgba(0,0,0,0.10)',
                transition: 'box-shadow 0.2s',
                color: '#b94d0d',
              }}
            />
            <img
              src={gatoDespierto ? gatosesiondespierto : gatosesion}
              alt="Gato sesión"
              style={{
                position: 'absolute',
                right: 10,
                top: gatoDespierto ? -55 : -55,
                width: gatoDespierto ? 120 : 120,
                height: 'auto',
                cursor: 'pointer',
                transition: 'all 0.2s',
                zIndex: 2
              }}
              onMouseEnter={() => {
                setGatoDespierto(true);
                playSoundOnce(miau);
              }}
              onMouseLeave={() => {
                setGatoDespierto(false);
                stopAllPurring();
              }}
              onMouseDown={() => setGatoDespierto(true)}
              onMouseUp={() => {
                setGatoDespierto(false);
                stopAllPurring();
              }}
              onTouchStart={() => {
                setGatoDespierto(true);
                playSoundOnce(miau);
              }}
              onTouchEnd={() => {
                setGatoDespierto(false);
                stopAllPurring();
              }}
            />
          </div>
          {/* Contraseña */}
          <div style={{ position: 'relative', marginBottom: '2rem' }}>
            <FaLock style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', color: '#F37021', fontSize: 32 }} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '22px 44px 22px 60px',
                borderRadius: 36,
                border: 'none',
                background: '#E5E5E5',
                fontSize: '1.35rem',
                outline: 'none',
                boxShadow: '0 4px 16px 0 rgba(0,0,0,0.10)',
                transition: 'box-shadow 0.2s',
                color: '#b94d0d',
              }}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', top: '50%', right: 18, transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, outline: 'none' }}
              tabIndex={-1}
              onMouseDown={e => e.preventDefault()}
              onFocus={e => e.target.style.outline = 'none'}
              onBlur={e => e.target.style.outline = 'none'}
            >
              {showPassword ? <FaEyeSlash size={28} color="#F37021" /> : <FaEye size={28} color="#F37021" />}
            </button>
          </div>
          {/* Links */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem', fontWeight: 'bold', fontSize: '1.15rem', color: '#F37021', letterSpacing: '0.5px' }}>
            ¿OLVIDASTE TU CONTRASEÑA? <a href="/recoverPassword" style={{ color: '#F7B95B', cursor: 'pointer', fontSize: '16px',fontWeight: 'bold' }}> HAGA CLICK AQUI</a><br />
            ¿NO TIENES CUENTA? <a href="/register" style={{ color: '#F7B95B', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}> HAGA CLICK AQUI</a>
          </div>
          {/* Botón ingresar */}
          <button type="submit" style={{ width: '100%', background: '#F37021', color: '#fff', fontWeight: 'bold', fontSize: '1.45rem', border: 'none', borderRadius: 36, padding: '22px 0', cursor: 'pointer', letterSpacing: '1px', boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)' }}>
            INGRESAR
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '2rem', fontWeight: 'bold', fontSize: '1.1rem' }}>
          <a href="/dashboard" style={{ color: '#F37021', cursor: 'pointer' }}>
          Volver al dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;


import { useState } from 'react';
import { FaUserCircle, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { playSoundOnce, stopAllPurring } from '../../utils/audio';
import { fetchInstance } from '../../utils/Fetch';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import gatosesion from '../../assets/images/gatosesion.png';
import gatosesiondespierto from '../../assets/images/gatosesiondespierto.png';
import miau from '../../assets/audios/miau.mp3';
import '../../App.css';

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    identifier_usuario: "",
    pwd_usuario: ""
  })
  const [showPassword, setShowPassword] = useState(false);
  const [gatoDespierto, setGatoDespierto] = useState(false);

    const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(e.target)
    console.log(`Campo cambiado: ${name}, Nuevo valor: ${value}`);

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };


    const handleSubmit = async (e)=>{
      e.preventDefault();
      try {
        console.log('Formulario enviado')
        console.table(formData)
        const response = await fetchInstance.post({
          endpoint: '/auth/login',
          headers: {
            'Content-Type': 'application/json'
          },
          body: formData,
          credentials: 'include'
        })
        const data = await response.json();
        if(!response.ok && !data.success){
          console.log('Error while trying to log in', data)
          return;
        }
        console.log('Logged in succesfully', data)
        navigate('/dashboard')
      } catch (error) {
        console.error(`Error while trying to log in`, error)
      }
    }


  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f5f5f5' }}>
      {/* Left side with logo */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff9db' }}>
        <img src={logo} alt="Fundación Gato Feliz" style={{ maxWidth: '65%', height: 'auto' }} />
      </div>
      {/* Right side with login form */}
      <div style={{ flex: 1, minWidth: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#fff', boxShadow: '0 0 40px 0 rgba(0,0,0,0.07)' }}>
        <h1 style={{ color: '#F37021', fontWeight: 'bold', fontSize: '3.2rem', marginBottom: '3.4rem', textAlign: 'center', letterSpacing: '1px' }}>INICIA SESIÓN</h1>
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 440 }}>
          {/* Usuario */}
          <div style={{ position: 'relative', marginBottom: '2rem' }}>
            <FaUserCircle style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', color: '#F37021', fontSize: 32 }} />
            <input
              name='identifier_usuario'
              onChange={handleChange}
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
              name='pwd_usuario'
              onChange={handleChange}
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
          <div style={{ textAlign: 'center', marginBottom: '2.5rem', fontWeight: 'bold', fontSize: '1.15rem', color: '#F7B95B', letterSpacing: '0.5px' }}> 
            ¿OLVIDASTE TU CONTRASEÑA? <a href="/recoverPassword" style={{ color: '#F37021', cursor: 'pointer', fontSize: '16px',fontWeight: 'bold' }}> HAGA CLICK AQUI</a><br />
            ¿NO TIENES CUENTA? <a href="/register" style={{ color: '#F37021', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}> HAGA CLICK AQUI</a>
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

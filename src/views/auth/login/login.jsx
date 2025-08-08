
import { useState } from 'react';
import { FaUserCircle, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { playSoundOnce, stopAllPurring } from '../../../utils/audio';
import { fetchInstance } from '../../../utils/Fetch';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../hooks/useUser';
import logo from '../../../assets/images/logo.png';
import gatosesion from '../../../assets/images/gatosesion.png';
import gatosesiondespierto from '../../../assets/images/gatosesiondespierto.png';
import miau from '../../../assets/audios/miau.mp3';
import "../../../App.css";
import './login.css';

const Login = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier_usuario: "",
    pwd_usuario: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [gatoDespierto, setGatoDespierto] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchInstance.post({
        endpoint: '/auth/login',
        headers: {
          'Content-Type': 'application/json'
        },
        body: formData,
        credentials: 'include'
      });
      const data = await response.json();
      console.log("Login response:", data);
      if (!response.ok && !data.success) {
        return;
      }
      setUser(data.data);
      navigate('/dashboard');
    } catch (error) {
      // Puedes mostrar un mensaje de error aquí si lo deseas
      console.error("Error during login:", error);
      return;
    }
  };

  return (
    <div className="login-container">
      {/* Left side with logo */}
      <div className="login-logo-section">
        <img src={logo} alt="Fundación Gato Feliz" className="login-logo" />
      </div>
      <div className="login-form-section">
        <h1 className="login-title">INICIA SESIÓN</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-input-group">
            <FaUserCircle className="login-icon user" />
            <input
              name='identifier_usuario'
              onChange={handleChange}
              type="text"
              placeholder="Usuario"
              className="login-input"
            />
            <img
              src={gatoDespierto ? gatosesiondespierto : gatosesion}
              alt="Gato sesión"
              className={`login-cat ${gatoDespierto ? 'awake' : ''}`}
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
          <div className="login-input-group">
            <FaLock className="login-icon lock" />
            <input
              name='pwd_usuario'
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              className="login-input"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password-btn"
              tabIndex={-1}
              onMouseDown={e => e.preventDefault()}
              onFocus={e => e.target.style.outline = 'none'}
              onBlur={e => e.target.style.outline = 'none'}
            >
              {showPassword ? <FaEyeSlash size={28} color="#F37021" /> : <FaEye size={28} color="#F37021" />}
            </button>
          </div>
          <div className="login-links">
            ¿OLVIDASTE TU CONTRASEÑA? <a href="/recoverPassword" className="login-link"> HAGA CLICK AQUI</a><br />
            ¿NO TIENES CUENTA? <a href="/register" className="login-link"> HAGA CLICK AQUI</a>
          </div>
          <button type="submit" className="login-btn">
            INGRESAR
          </button>
        </form>
        <div className="login-dashboard-link">
          <a href="/dashboard" className="dashboard-link">
            Volver al dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

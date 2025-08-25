
import { useState, useEffect } from 'react';
import { FaUserCircle, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { playSoundOnce, stopAllPurring } from '../../../utils/audio';
import { login } from '../../../api/Auth';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../../hooks/useUser';
import logo from '../../../assets/images/logo.png';
import gatosesion from '../../../assets/images/gatosesion.png';
import gatosesiondespierto from '../../../assets/images/gatosesiondespierto.png';
import miau from '../../../assets/audios/miau.mp3';
import "../../../App.css";
import './login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [gatoDespierto, setGatoDespierto] = useState(false);
  const [error, setError] = useState(null);
  const { setUser, user } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier_usuario: "",
    pwd_usuario: ""
  });

  useEffect(()=>{
    if(user){
      console.log(`Usuario autenticado: ${user.nom_usuario}`);
      navigate('/dashboard')
    }
  })

  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    setError(null);
    e.preventDefault();
    try {
      const data = await login(formData);
      console.log("Login response:", data);
      if (!data.success) {
        setError(data.errorMsg || "Error de inicio de sesión");
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
              className="toggle-password-btn-login"
              tabIndex={-1}
              onMouseDown={e => e.preventDefault()}
              onFocus={e => e.target.style.outline = 'none'}
              onBlur={e => e.target.style.outline = 'none'}
            >
              {showPassword ? <FaEyeSlash size={28} color="#F37021" /> : <FaEye size={28} color="#F37021" />}
            </button>
          </div>
           { error && (
             <div className="login-error">
               {error}
             </div>
           ) }
          {/* Espacio extra para separar el error de los links */}
          { error && <div style={{marginBottom: '1.5rem'}}></div> }
          <div className="login-links">
            ¿OLVIDASTE TU CONTRASEÑA? <Link to="/auth/recoverPassword" className="login-link"> HAGA CLICK AQUI</Link><br />
            ¿NO TIENES CUENTA? <Link to="/auth/register" className="login-link"> HAGA CLICK AQUI</Link>
          </div>
          <button type="submit" className="login-btn">
            INGRESAR
          </button>
        </form>
        <div className="login-dashboard-link">
          <Link to="/dashboard" className="dashboard-link">
            Volver al dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

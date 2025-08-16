import { useState, useEffect } from 'react';
import { FaUserCircle, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { playSoundOnce, stopAllPurring } from '../../../utils/audio';
import { fetchInstance } from '../../../utils/Fetch';
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from '../../../hooks/useAuthUser';
import { useQueryClient } from '@tanstack/react-query';
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
  const [formData, setFormData] = useState({
    identifier_usuario: "",
    pwd_usuario: ""
  });

  const { data: authUser, isLoading } = useAuthUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // ✅ Redirigir si ya hay usuario autenticado
  useEffect(() => {
    if (!isLoading && authUser) {
      navigate('/dashboard');
    }
  }, [authUser, isLoading, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetchInstance.post({
        endpoint: '/auth/login',
        headers: { 'Content-Type': 'application/json' },
        body: formData,
        credentials: 'include'
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        setError(data.errorMsg || "Error de inicio de sesión");
        return;
      }

      // ✅ Refrescar el estado global del usuario
      await queryClient.invalidateQueries({ queryKey: ['authUser'] });

      // ✅ Redirigir
      navigate('/dashboard');
    } catch (error) {
      console.error("Error during login:", error);
      setError("Ocurrió un error al iniciar sesión.");
    }
  };

  return (
    <div className="login-container">
      {/* Sección izquierda con logo */}
      <div className="login-logo-section">
        <img src={logo} alt="Fundación Gato Feliz" className="login-logo" />
      </div>

      {/* Sección derecha con formulario */}
      <div className="login-form-section">
        <h1 className="login-title">INICIA SESIÓN</h1>
        <form onSubmit={handleSubmit} className="login-form">
          {/* Input de usuario */}
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
              onMouseEnter={() => { setGatoDespierto(true); playSoundOnce(miau); }}
              onMouseLeave={() => { setGatoDespierto(false); stopAllPurring(); }}
              onMouseDown={() => setGatoDespierto(true)}
              onMouseUp={() => { setGatoDespierto(false); stopAllPurring(); }}
              onTouchStart={() => { setGatoDespierto(true); playSoundOnce(miau); }}
              onTouchEnd={() => { setGatoDespierto(false); stopAllPurring(); }}
            />
          </div>

          {/* Input de contraseña */}
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
              {showPassword
                ? <FaEyeSlash size={28} color="#F37021" />
                : <FaEye size={28} color="#F37021" />
              }
            </button>
          </div>

          {/* Mensaje de error */}
          {error && <div className="login-error">{error}</div>}
          {error && <div style={{ marginBottom: '1.5rem' }}></div>}

          {/* Enlaces de ayuda */}
          <div className="login-links">
            ¿OLVIDASTE TU CONTRASEÑA? <a href="/recoverPassword" className="login-link"> HAGA CLICK AQUÍ</a><br />
            ¿NO TIENES CUENTA? <a href="/register" className="login-link"> HAGA CLICK AQUÍ</a>
          </div>

          {/* Botón de login */}
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

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { playSoundOnce, stopAllPurring } from "../../../utils/audio";
import { fetchInstance } from "../../../utils/Fetch";
import recoverPasswordImg from "../../../assets/images/recoverPassword.png";
import gatosesiondespierto from "../../../assets/images/gatosesiondespierto.png";
import gatosesion from "../../../assets/images/gatosesion.png";
import miau from '../../../assets/audios/miau.mp3';
import "../../../App.css";
import "../../../index.css";
import "./newPassword.css";



const NewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [gatoDespierto, setGatoDespierto] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  useEffect(() => {
    if (!token) {
      console.error("No token found in URL, the password reset wont work.");
      //navigate("/login");
    }
    console.log("Token from URL:", token);
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess("");
    try {
      console.log("New password submitted:", password);
      const response = await fetchInstance.post({
        endpoint: '/auth/reset-password',
        body: {
          token,
          newPassword: password
        },
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (!response.ok && !data.success) {
        setError(data.errorMsg || "Error al restablecer la contraseña");
        console.log("Restablecimiento de contraseña fallido:", data);
        return;
      }
      setSuccess("¡Listo! Tu contraseña ha sido cambiada exitosamente. Ahora puedes iniciar sesión con tu nueva contraseña. 🐾");
      setPassword("");
      setTimeout(() => {
        navigate("/auth/login");
      }, 1000);
      console.log("Password reset successful");
    } catch (error) {
      setError("Ocurrió un error inesperado. Intenta de nuevo más tarde.");
      console.error("Error submitting new password:", error);
    }
  }



  return (
    <div className="newpass-container">
      {/* Left side with image */}
      <div className="newpass-image-section">
        <img src={recoverPasswordImg} alt="Recuperar contraseña" className="newpass-image" />
      </div>
      {/* Right side with form */}
      <div className="newpass-form-section">
        <h1 className="newpass-title">NUEVA<br />CONTRASEÑA</h1>
        <form onSubmit={handleSubmit} className="newpass-form">
          <div className="newpass-input-group">
            <img
              src={gatoDespierto ? gatosesiondespierto : gatosesion}
              alt="Gato sesión"
              className={`newpass-cat${gatoDespierto ? ' awake' : ''}`}
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
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Ingrese su nueva contraseña"
              className="newpass-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
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
              {showPassword ? <FaEyeSlash size={28} color="#FF6B2C" /> : <FaEye size={28} color="#FF6B2C" />}
            </button>
          </div>
          <div className="newpass-links">
            <span>VOLVER AL INICIO DE SESION</span>
            <Link to="/auth/login" className="newpass-link">HAGA CLICK AQUI</Link>
          </div>
          { success && (
            <div className="recover-success">
              {success}
            </div>
          )}
          { error && (
            <div className="login-error">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="newpass-btn"
            disabled={!!success}
          >
            ENVIAR
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;

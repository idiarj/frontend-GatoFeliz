import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { playSoundOnce, stopAllPurring } from "../../../utils/audio";
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
  return (
    <div className="newpass-container">
      {/* Left side with image */}
      <div className="newpass-image-section">
        <img src={recoverPasswordImg} alt="Recuperar contraseña" className="newpass-image" />
      </div>como
      {/* Right side with form */}
      <div className="newpass-form-section">
        <h1 className="newpass-title">NUEVA<br />CONTRASEÑA</h1>
        <form className="newpass-form">
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
            <a href="/login" className="newpass-link">HAGA CLICK AQUI</a>
          </div>
          <button
            type="submit"
            className="newpass-btn"
          >
            ENVIAR
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;

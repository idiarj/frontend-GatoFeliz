import { useState } from "react";
import { playSoundOnce, stopAllPurring } from "../../../utils/audio";
import { fetchInstance } from "../../../utils/Fetch";
import gatosesion from "../../../assets/images/gatosesion.png";
import gatosesiondespierto from "../../../assets/images/gatosesiondespierto.png";
import purring from "../../../assets/audios/purrings.mp3";
import recoverPasswordImg from "../../../assets/images/recoverPassword.png";
import "../../../App.css";
import "../../../index.css";
import "./recoverPassword.css";

const RecoverPassword = () => {
  const [gatoDespierto, setGatoDespierto] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const response = await fetchInstance.post({
        endpoint: '/auth/forgot-password',
        body: { email_usuario: email },
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      console.log("Email submitted:", email);
      console.log("Response data:", data);

      if (data.success) {
        console.log("Password recovery email sent successfully");
      }
    } catch (error) {
      console.error("Error submitting email:", error);
    }
  }
  
  return (
    <div className="recover-container">
      {/* Left side with image */}
      <div className="recover-image-section">
        <img src={recoverPasswordImg} alt="Recuperar contraseña" className="recover-image" />
      </div>
      {/* Right side with form */}
      <div className="recover-form-section">
        <h1 className="recover-title">RECUPERAR<br />CONTRASEÑA</h1>
        <form onSubmit={handleSubmit} className="recover-form">
          <img
            src={gatoDespierto ? gatosesiondespierto : gatosesion}
            alt="Gato sesión"
            className={`recover-cat${gatoDespierto ? ' awake' : ''}`}
            onMouseEnter={() => {
              setGatoDespierto(true);
              playSoundOnce(purring);
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
              playSoundOnce(purring);
            }}
            onTouchEnd={() => {
              setGatoDespierto(false);
              stopAllPurring();
            }}
          />
          <input
            onChange={e => setEmail(e.target.value)}
            type="email"
            placeholder="Ingrese su correo"
            className="recover-input"
          />
          <div className="recover-links">
            <span>VOLVER AL INICIO DE SESION</span>
            <a href="/login" className="recover-link">HAGA CLICK AQUI</a>
          </div>
          <button
            type="submit"
            className="recover-btn"
          >
            ENVIAR
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecoverPassword;

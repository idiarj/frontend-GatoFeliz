import { useState } from "react";
import { Link } from "react-router-dom";
import { playSoundOnce, stopAllPurring } from "../../../utils/audio";
import { forgotPassword } from "../../../api/Auth";
import gatosesion from "../../../assets/images/gatosesion.png";
import gatosesiondespierto from "../../../assets/images/gatosesiondespierto.png";
import purring from "../../../assets/audios/purrings.mp3";
import recoverPasswordImg from "../../../assets/images/recoverPassword.png";
import "./recoverPassword.css";

const RecoverPassword = () => {
  const [gatoDespierto, setGatoDespierto] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess("");
    try {
      const data = await forgotPassword({ email_usuario: email });
      console.log("Email submitted:", email);
      console.log("Response data:", data);
      
      if (!data.success) {
        setError(data.errorMsg || "Error al enviar el correo");
      } else {
        setSuccess("¡Listo! Te hemos enviado un maullido con instrucciones para recuperar tu contraseña. 🐾");
      }
      console.log("Password recovery email sent successfully");
    } catch (error) {
      setError("Ocurrió un error inesperado. Intenta de nuevo más tarde.");
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
          { success && (
            <div className="recover-success">
              {success}
            </div>
          )}
          { error && (
            <div className="recover-error">
              {error}
            </div>
          ) }
          <div className="recover-links">
            <span>VOLVER AL INICIO DE SESION</span>
            <Link to="/auth/login" className="recover-link">HAGA CLICK AQUI</Link>
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

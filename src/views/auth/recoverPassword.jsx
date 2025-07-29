import { useState } from "react";
import { playSoundOnce, stopAllPurring } from "../../utils/audio";
import gatosesion from "../../assets/images/gatosesion.png";
import gatosesiondespierto from "../../assets/images/gatosesiondespierto.png";
import purring from "../../assets/audios/purrings.mp3";
import recoverPasswordImg from "../../assets/images/recoverPassword.png";
import "../../App.css";
import "../../index.css";

const RecoverPassword = () => {
  const [gatoDespierto, setGatoDespierto] = useState(false);
  
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left side with image */}
      <div style={{ flex: 1, background: "#fff9db", display: "flex", alignItems: "stretch", justifyContent: "stretch" }}>
        <img src={recoverPasswordImg} alt="Recuperar contraseña" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      {/* Right side with form */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "#fff" }}>
        <h1 style={{ color: "#F37021", fontWeight: "bold", fontSize: "3.2rem", textAlign: "center", marginBottom: 24 }}>RECUPERAR<br />CONTRASEÑA</h1>
        <form style={{ width: "90%", maxWidth: 480, marginTop: 32, position: 'relative' }}>
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
            type="email"
            placeholder="Ingrese su correo"
            style={{ width: "100%", padding: "22px", fontSize: "1.3rem", borderRadius: 32, color: "#b94d0d", border: "none", background: "#E5E5E5", marginBottom: 32, outline: "none" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32, fontSize: 18, color: "#F7B95B", fontWeight: "bold" }}>
            <span>VOLVER AL INICIO DE SESION</span>
            <a href="/login" style={{ cursor: "pointer", color: "#FF6B2C" }}>HAGA CLICK AQUI</a>
          </div>
          <button
            type="submit"
            style={{ width: "100%", padding: "22px", borderRadius: 32, border: "none", background: "#FF6B2C", color: "#fff", fontWeight: "bold", fontSize: "1.3rem", cursor: "pointer", letterSpacing: 1 }}
          >
            ENVIAR
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecoverPassword;

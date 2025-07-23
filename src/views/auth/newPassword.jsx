import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../App.css";
import "../../index.css";
import recoverPasswordImg from "../../assets/recoverPassword.png";
import gatosesiondespierto from "../../assets/gatosesiondespierto.png";
import gatosesion from "../../assets/gatosesion.png";
import miau from '../../assets/miau.mp3';
import { playSoundOnce, stopAllPurring } from "../../utils/audio";

const NewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [gatoDespierto, setGatoDespierto] = useState(false);
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left side with image */}
      <div style={{ flex: 1, background: "#fff9db", display: "flex", alignItems: "stretch", justifyContent: "stretch" }}>
        <img src={recoverPasswordImg} alt="Recuperar contraseña" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>como
      {/* Right side with form */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "#fff" }}>
        <h1 style={{ color: "#FF6B2C", fontWeight: "bold", fontSize: "3.2rem", textAlign: "center", marginBottom: 24 }}>NUEVA<br />CONTRASEÑA</h1>        
        <form style={{ width: "90%", maxWidth: 480, marginTop: 32 }}>
          <div style={{ position: "relative", width: "100%", marginBottom: 32 }}>
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
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Ingrese su nueva contraseña"
              style={{ width: "100%", boxSizing: "border-box", padding: "22px 44px 22px 22px", fontSize: "1.3rem", borderRadius: 32, color: "#b94d0d", border: "none", background: "#E5E5E5", outline: "none" }}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: "absolute", top: "50%", right: 18, transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0, outline: "none" }}
              tabIndex={-1}
              onMouseDown={e => e.preventDefault()}
              onFocus={e => e.target.style.outline = 'none'}
              onBlur={e => e.target.style.outline = 'none'}
            >
              {showPassword ? <FaEyeSlash size={28} color="#FF6B2C" /> : <FaEye size={28} color="#FF6B2C" />}
            </button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32, fontSize: 18, color: "#FF6B2C", fontWeight: "bold" }}>
            <span>VOLVER AL INICIO DE SESION</span>
            <a href="/login" style={{ cursor: "pointer", color: "#F7B95B" }}>HAGA CLICK AQUI</a>
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

export default NewPassword;

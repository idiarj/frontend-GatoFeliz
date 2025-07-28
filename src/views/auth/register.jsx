
import { useState } from "react";
import { FaUserCircle, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import registroImg from "../../assets/images/registro.png";
import "../../App.css";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  return (
    <div style={{
      display: "flex",
      height: "100vh",
      background: "#fff"
    }}>
      {/* Izquierda: Formulario */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100vh",
        padding: "1rem",
        paddingTop: '3.5vh',
        minHeight: 0,
        overflow: 'hidden'
      }}>
        <h2 style={{ color: "#F57C2A", fontWeight: "bold", fontSize: "2.5rem", marginBottom: "0.5rem" }}>REGISTRATE</h2>
        <h3 style={{ color: "#F7B95B", fontWeight: "bold", fontSize: "1.5rem", marginBottom: "2rem" }}>UNETE A NOSOTROS!!</h3>
        <form style={{ width: "100%", maxWidth: 400, marginTop: 0 }}>
          <div style={{ position: "relative", marginBottom: '1.2rem', marginLeft: '-40px' }}>
            <FaUserCircle style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", color: "#F37021", fontSize: 32 }} />
            <input type="text" placeholder="Usuario" style={{ ...inputStyle, paddingLeft: 70 }} />
          </div>
          <div style={{ position: "relative", marginBottom: '1.2rem', marginLeft: '-40px' }}>
            <FaEnvelope style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", color: "#F7B95B", fontSize: 32 }} />
            <input type="email" placeholder="Correo Electronico" style={{ ...inputStyle, paddingLeft: 70 }} />
          </div>
          <div style={{ position: "relative", marginBottom: '1.2rem', marginLeft: '-40px', display: 'flex', alignItems: 'center', width: '500px' }}>
            <FaLock style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", color: "#F37021", fontSize: 32 }} />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Contraseña" 
              style={{ ...inputStyle, paddingLeft: 70, paddingRight: 40, width: '75%' }} 
            />
            <button 
              type="button"
              onClick={handleTogglePassword} 
              style={{
                position: "absolute",
                right: 35,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                padding: 0,
                margin: 0,
                cursor: "pointer",
                color: "#F37021",
                fontSize: 24,
                outline: "none"
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div style={{ marginBottom: '1.2rem', marginLeft: '-40px' }}>
            <div style={{ position: "relative" }}>
              <FaPhone style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", color: "#F7B95B", fontSize: 32, pointerEvents: 'none' }} />
              <input 
                type="tel" 
                placeholder="Telefono" 
                style={{ ...inputStyle, paddingLeft: 70 }} 
                pattern="[0-9]{10}"
                maxLength={10}
                inputMode="numeric"
                required
                onInput={e => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                }}
              />
            </div>
            <div style={{ color: '#cccccc', fontSize: '13px', marginTop: '0.2rem', marginLeft: '0.5rem' }}>Ingrese un número de teléfono de 10 dígitos ejemplo: 4140000000</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 13 }}>
            <span style={{ color: "#F57C2A", fontWeight: "bold", textDecoration: "none"}}>VOLVER AL INICIO DE SESION</span>
            <a href="/login" style={{ color: "#F7B95B", fontWeight: "bold" }}>HAGA CLICK AQUI</a>
          </div>
          <button type="submit" style={{
            width: "100%",
            background: "#F57C2A",
            color: "#fff",
            border: "none",
            borderRadius: 25,
            padding: "0.8rem",
            fontWeight: "bold",
            fontSize: "1.1rem",
            cursor: "pointer"
          }}>INGRESAR</button>
        </form>
                <div style={{ textAlign: 'center', marginTop: '2rem', fontWeight: 'bold', fontSize: '1.1rem' }}>
          <a href="/dashboard" style={{ color: '#F37021', cursor: 'pointer' }}>
          Volver al dashboard
          </a>
        </div>
      </div>
      {/* Derecha: Imagen */}
      <div style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#fff9db",
        height: "100vh"
      }}>
        <img src={registroImg} alt="Registro" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    </div>
  );
};

const inputStyle = {
  width: '400px',
  padding: '16px 16px 16px 50px',
  borderRadius: 30,
  border: 'none',
  background: '#E5E5E5',
  fontSize: '1.1rem',
  outline: 'none',
  boxShadow: '0 4px 16px 0 rgba(0,0,0,0.10)',
  transition: 'box-shadow 0.2s',
  color: '#b94d0d',
};

export default Register;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../hooks/useUser.jsx";
import { FaUserCircle, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { fetchInstance } from "../../../utils/Fetch.js";
import registroImg from "../../../assets/images/registro.png";
import "../../../App.css";
import "./register.css";

const Register = () => {
  
  const [formData, setFormData] = useState({
    nom_usuario: "",
    email_usuario: "",
    pwd_usuario: "",
    tlf_usuario: ""
  })

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const { user } = useUser();

    useEffect(()=>{
      if(user){
        navigate('/dashboard')
      }
    })

  const handleSubmit = async (e)=>{
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario
    try {
      console.log("Formulario enviado:", formData);
      const response = await fetchInstance.post({
        endpoint: '/auth/register',
        body: formData,
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      console.log("Respuesta del servidor:", response);
      const data = await response.json();   
      console.log("Datos recibidos:", data);
      if(!response.ok && !data.success){
        console.log("Registro fallido:", data);
        return;
      }

      console.log("Registro exitoso:", data);
      
      navigate('/login'); // Redirigir al usuario a la página de inicio de sesión después del registro exitoso


    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      return;
    }
    // Por ejemplo, podrías hacer una llamada a la API para registrar al usuario
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(e.target)
    console.log(`Campo cambiado: ${name}, Nuevo valor: ${value}`);

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };



  return (
    <div className="register-container">
      {/* Izquierda: Formulario */}
      <div className="register-form-section">
        <h2 className="register-title">REGISTRATE</h2>
        <h3 className="register-subtitle">UNETE A NOSOTROS!!</h3>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="register-input-group">
            <FaUserCircle className="register-icon user" />
            <input name="nom_usuario" type="text" placeholder="Usuario" className="register-input" onChange={handleChange}/>
          </div>
          <div className="register-input-group">
            <FaEnvelope className="register-icon email" />
            <input name="email_usuario" type="email" placeholder="Correo Electronico" className="register-input" onChange={handleChange} />
          </div>
          <div className="register-input-group password-group">
            <FaLock className="register-icon lock" />
            <input 
              name="pwd_usuario"  
              type={showPassword ? "text" : "password"} 
              placeholder="Contraseña" 
              className="register-input password" 
              onChange={handleChange}
            />
            <button 
              type="button"
              onClick={handleTogglePassword} 
              className="toggle-password-btn-register"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="register-input-group">
            <div className="phone-group">
              <FaPhone className="register-icon phone" />
              <input 
                name="tlf_usuario"
                type="tel"
                placeholder="Telefono"
                className="register-input"
                pattern="[0-9]{10}"
                maxLength={10}
                inputMode="numeric"
                required
                onChange={handleChange}
                onInput={e => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                }}
              />
            </div>
            <div className="phone-hint">Ingrese un número de teléfono de 10 dígitos ejemplo: 4140000000</div>
          </div>
          <div className="register-links">
            <span className="register-link-text">VOLVER AL INICIO DE SESION</span>
            <a href="/login" className="register-link">HAGA CLICK AQUI</a>
          </div>
          <button type="submit" className="register-btn">INGRESAR</button>
        </form>
        <div className="register-dashboard-link">
          <a href="/dashboard" className="dashboard-link">
          Volver al dashboard
          </a>
        </div>
      </div>
      {/* Derecha: Imagen */}
      <div className="register-image-section">
        <img src={registroImg} alt="Registro" className="register-image" />
      </div>
    </div>
  );
};


export default Register;

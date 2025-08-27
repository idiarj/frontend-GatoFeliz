
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../../hooks/useUser.jsx";
import { FaUserCircle, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { register } from "../../../api/Auth.js";
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
  const [isSubmitting, setIsSubmitting] = useState(false);          // NEW
  const [dots, setDots] = useState('');      
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const { user } = useUser();

    useEffect(()=>{
      if(user){
        navigate('/dashboard')
      }
    })

  useEffect(() => {                                                  // NEW
    if (!isSubmitting) return;
    const id = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 450);
    return () => clearInterval(id);
  }, [isSubmitting]);

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setError(null);                      // NEW (opcional para limpiar error previo)
    setIsSubmitting(true);               // NEW: empieza indicador

    try {
      console.log("Formulario enviado:", formData);
      const data = await register(formData);
      console.log("Datos recibidos:", data);

      if(!data.success){
        setError(data.errorMsg || "Error al registrar el usuario");
        console.log("Registro fallido:", data);
        setIsSubmitting(false);          // NEW: termina indicador en error
        return;
      }

      console.log("Registro exitoso:", data);
      // Mantener isSubmitting true hasta que la navegación cambie la vista
      navigate('/auth/login');

    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setIsSubmitting(false);            // NEW: termina indicador en excepción
      return;
    }
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
            <Link to="/auth/login" className="register-link">HAGA CLICK AQUI</Link>
          </div>
          <button type="submit" className="register-btn">INGRESAR</button>
        </form>
          {/* { error && (
             <div className="login-error">
               {error}
             </div>
           ) } */}
        {isSubmitting && (                                                  // NEW
          <div className="register-progress" role="status" aria-live="polite">
            Registrando usuario{dots}
          </div>
        )}

        <div className="register-dashboard-link">
          <Link to="/dashboard" className="dashboard-link">
          Volver al dashboard
          </Link>
        </div>
          { error && (
             <div className="login-error">
               {error}
             </div>
           ) }
      </div>
      {/* Derecha: Imagen */}
      <div className="register-image-section">
        <img src={registroImg} alt="Registro" className="register-image" />
      </div>
    </div>
  );
};


export default Register;

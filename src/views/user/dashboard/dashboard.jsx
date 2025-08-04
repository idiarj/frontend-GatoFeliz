import React from 'react';
import { FiPhone } from 'react-icons/fi';
import { FaQuestionCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Head from '../../../components/head/head.jsx';
import Menu from '../../../components/menu/menu.jsx';
import './dashboard.css';

import logoIcono from '../../../assets/images/logoicono.png';
import michiNina from '../../../assets/michis/michi1siames.png';
import michiPair from '../../../assets/michis/michi2blancoynegro.png';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      {/* Sidebar with Menu component */}
      <div className="dashboard-sidebar">
        <Menu />
      </div>

      {/* Main content area */}
      <div className="dashboard-main">
        {/* Header component */}
        <Head 
          title="Bienvenido a Gato Feliz Venezuela"
          logoSrc={logoIcono}
        />

        {/* Dashboard sections grid */}
        <div className="dashboard-sections">
          {/* Adopciones Card */}
          <div 
            className="dashboard-section adopciones"
            onClick={() => navigate('/adoptions')}
          >
            <h2>Adopciones</h2>
            <img src={michiNina} alt="Nina - Gatita en adopción" />
            <div className="dashboard-section-info">
              <span>Nina | Hembra | 1 año aprox</span>
              <div className="dashboard-link">Ver mas…</div>
            </div>
          </div>

          {/* Donaciones Card */}
          <div 
            className="dashboard-section donaciones"
            onClick={() => navigate('/donations')}
          >
            <h2>Donaciones</h2>
            <div className="dashboard-section-info">
              <strong>Método de pago</strong>
              <span>Zelle | Pago móvil | PayPal</span>
              <strong>También puedes donar:</strong>
              <span>Alimento</span>
              <span>Medicinas</span>
              <span>Productos de limpieza...</span>
              <div className="dashboard-link">Cada aporte cuenta</div>
            </div>
          </div>

          {/* Apadrinar Card */}
          <div 
            className="dashboard-section apadrinar"
            onClick={() => navigate('/sponsor')}
          >
            <img src={michiPair} alt="Gatitos para apadrinar" />
            <div className="dashboard-section-info">
              <span>
                ¿No puedes adoptar pero quieres ofrecerle amor y 
                estabilidad a un gatito?
              </span>
              <div className="dashboard-link">Apadrinar</div>
            </div>
          </div>

          {/* Preguntas Card */}
          <div 
            className="dashboard-section preguntas"
            onClick={() => navigate('/questions')}
          >
            <h2>Preguntas <FaQuestionCircle size={30} color="#a67c00" style={{verticalAlign: 'middle', marginLeft: '110px'}} /></h2>
            <div className="dashboard-section-info">
              <span>¿Se puede visitar la fundación?</span>
              <span>¿Solo ayudan gatos?</span>
              <span>¿Cuánto cuesta esterilizar?</span>
              <span>¿Cómo puedo ayudar?</span>
              <div className="dashboard-link">Ver más preguntas</div>
            </div>
          </div>

          {/* Contacto de denuncias Card */}
          <div className="dashboard-section contacto">
            <h3>CONTACTO DE<br /> DENUNCIAS POR MALTRATO</h3>
            <span><FiPhone size={24} color="#f47c2c" /> +58 4129267842</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
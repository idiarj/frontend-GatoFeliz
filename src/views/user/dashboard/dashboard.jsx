import React from 'react';
import { FiPhone } from 'react-icons/fi';
import { FaQuestionCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Head from '../../../components/head/head.jsx';
import Menu from '../../../components/menu/menu.jsx';
import './dashboard.css';
import logoIcono from '../../../assets/images/logoicono.png';
import zelleLogo from '../../../assets/logos/zelle.png';
import pagomovilLogo from '../../../assets/logos/pagomovil.png';
import paypalLogo from '../../../assets/logos/paypal.png';
import binanceLogo from '../../../assets/logos/binance.png';
import venmoLogo from '../../../assets/logos/venmo.png';
import alimentoLogo from '../../../assets/logos/alimento.png';
import medicinaLogo from '../../../assets/logos/medicina.png';
import limpiezaLogo from '../../../assets/logos/limpieza.png';
import michi1 from '../../../assets/michis/michi1siames.png';
import michiPair from '../../../assets/michis/michi2blancoynegro.png';
import AdoptionCard from '../../../components/adoptionCard/adoptionCard.jsx';
// Copia de catsData desde adoption.jsx
const catsData = [
  {
    id: 1,
    name: "Milo",
    gender: "Macho",
    age: "2 años",
    image: michi1,
    description: "Cariñoso y juguetón, busca un hogar amoroso."
  },
];

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
          logoSrc={logoIcono}
        />

        {/* Dashboard sections grid */}
        <div className="dashboard-sections">
          {/* Adopciones Card usando AdoptionCard */}
          <div className="dashboard-section adopciones" onClick={() => navigate('/adoption')}>
            <AdoptionCard
              name={catsData[catsData.length-1].name}
              gender={catsData[catsData.length-1].gender}
              age={catsData[catsData.length-1].age}
              image={catsData[catsData.length-1].image}
              onRequest={() => navigate('/adoptions')}
              buttonLabel="Ver más…"
              boxShadow={false}
              animatedImage={false}
            />
            <div className="dashboard-section-info">
              <h2>Adopciones</h2>
            </div>
          </div>
          {/* Donaciones Card */}
          <div 
            className="dashboard-section donaciones"
            onClick={() => navigate('/donations')}
          >
            <h2 className="donaciones-title">Método de pago</h2>
            <div className="dashboard-section-info">
              <div className="donaciones-logos-row">
                <img src={zelleLogo} alt="Zelle" className="donaciones-logo" />
                <img src={pagomovilLogo} alt="Pago móvil" className="donaciones-logo" />
                <img src={paypalLogo} alt="PayPal" className="donaciones-logo" />
                <img src={binanceLogo} alt="Binance" className="donaciones-logo" />
                <img src={venmoLogo} alt="Venmo" className="donaciones-logo" />
              </div>
              <strong>También puedes donar:</strong>
              <div className="donaciones-tipos-row">
                <div className="donaciones-tipo">
                  <img src={alimentoLogo} alt="Alimento" />
                  <span>Alimento</span>
                </div>
                <div className="donaciones-tipo">
                  <img src={medicinaLogo} alt="Medicinas" />
                  <span>Medicinas</span>
                </div>
                <div className="donaciones-tipo">
                  <img src={limpiezaLogo} alt="Productos de limpieza" />
                  <span>Limpieza</span>
                </div>
              </div>
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
            <h2>Preguntas <FaQuestionCircle size={30} color="#f47c2c" style={{verticalAlign: 'middle', marginLeft: '190px'}} /></h2>
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
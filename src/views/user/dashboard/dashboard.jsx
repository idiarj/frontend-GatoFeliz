import React from 'react';
import { FiPhone } from 'react-icons/fi';
import { FaHome, FaBriefcaseMedical, FaHandHoldingHeart } from 'react-icons/fa';
import { MdPets } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../hooks/useUser.jsx';
import Head from '../../../components/head/head.jsx';
import Menu from '../../../components/menu/menu.jsx';
import './dashboard.css';
import AdoptionCard from '../../../components/adoptionCard/adoptionCard.jsx';
import { dashboardImages, getLastCat, getPaymentLogos, getDonationTypes, getSponsorImage} from './importdata.jsx';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="dashboard-container">
      <div>
        <Head  />
        <Menu />
      </div>
      <div className="dashboard-main">
        <Head 
          logoSrc={dashboardImages.logoIcono}
        />
        <div className="dashboard-sections">
          {/* Adopciones Card usando AdoptionCard */}
          <div className="dashboard-section adopciones" onClick={() => navigate('/adoption')}>
            <AdoptionCard
              name={getLastCat().name}
              gender={getLastCat().gender}
              age={getLastCat().age}
              image={getLastCat().image}
              onRequest={() => navigate('/adoptions')}
              buttonLabel="Ver más…"
              boxShadow={false}
              animatedImage={false}
            />
          </div>
          {/* Donaciones Card */}
          <div 
            className="dashboard-section donaciones"
            onClick={() => navigate('/donations')}
          >
            <h2 className="donaciones-title">Método de pago</h2>
            <div className="dashboard-section-info">
              <div className="donaciones-logos-row">
                {getPaymentLogos().map((logo, idx) => (
                  <img key={idx} src={logo} alt="Método de pago" className="donaciones-logo" />
                ))}
              </div>
              <strong>También puedes donar:</strong>
              <div className="donaciones-tipos-row">
                {getDonationTypes().map((tipo, idx) => (
                  <div className="donaciones-tipo" key={idx}>
                    <img src={tipo.logo} alt={tipo.label} />
                    <span>{tipo.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Apadrinar Card */}
          <div 
            className="dashboard-section apadrinar"
            onClick={() => navigate('/sponsor')}
          >
            <img src={getSponsorImage()} alt="Gatitos para apadrinar" />
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
            <h2 className="preguntas-title">Preguntas </h2>
            <div className="preguntas-icons-row">
              <div className="pregunta-icon-block">
                <FaHome size={32} color="#f47c2c" />
                <span>Visitar</span>
              </div>
              <div className="pregunta-icon-block">
                <MdPets size={32} color="#f47c2c" />
                <span>Gatos</span>
              </div>
              <div className="pregunta-icon-block">
                <FaBriefcaseMedical size={32} color="#f47c2c" />
                <span>Esterilizar</span>
              </div>
              <div className="pregunta-icon-block">
                <FaHandHoldingHeart size={32} color="#f47c2c" />
                <span>Ayudar</span>
              </div>
            </div>
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
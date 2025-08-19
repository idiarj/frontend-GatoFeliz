import { FiPhone } from 'react-icons/fi';
import { FaHome, FaBriefcaseMedical, FaHandHoldingHeart } from 'react-icons/fa';
import { MdPets } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { getLastCat, getPaymentLogos, getDonationTypes } from './importdata.jsx';
import CatCard from '../../../components/catCard/catCard.jsx';
import './dashboard.css';



const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="dashboard-main">
        <div className="dashboard-sections">
          {/* Adopciones Card usando CatCard */}
          <div className="dashboard-section adopciones" onClick={() => navigate('/adoption')}>
            <CatCard
              name={getLastCat().name}
              gender={getLastCat().gender}
              age={getLastCat().age}
              image={getLastCat().image}
              onRequest={() => navigate('/adoptions')}
              buttonLabel="ENVIAR SOLICITUD"
              boxShadow={false}
              animatedImage={false}
            />
          </div>

          {/* Card informativo arriba del sponsor */}
          <div className="dashboard-section info-animales">
            <p>
              ¿Sabías que todos nuestros animales han sido abandonados y ahora buscan una adopción que les de la vida que merecen?
            </p>
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

            {/* Sponsor CatCard con estilos de adopciones */}
            <div className="dashboard-section sponsor" onClick={() => navigate('/sponsor')}>
              <CatCard
                name={getLastCat().name}
                gender={getLastCat().gender}
                age={getLastCat().age}
                image={getLastCat().image}
                onRequest={() => navigate('/sponsor')}
                buttonLabel="ENVIAR SOLICITUD"
                boxShadow={false}
                fromSponsor={true}
              />
            </div>

          {/* Preguntas Card */}
          <div 
            className="dashboard-section preguntas"
            onClick={() => navigate('/questions')}
          >
            <h2 className="preguntas-title">Preguntas frecuentes</h2>
            <div className="dashboard-section-info preguntas-list">
                <div className="pregunta-item" style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                  <span style={{marginRight: '60px'}}>¿Se puede visitar la fundación?</span>
                  <FaHome size={24} color="#f47c2c" className="pregunta-icon" />
                </div>
                <div className="pregunta-item" style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                  <span style={{marginRight: '132px'}}>¿Solo ayudan gatos?</span>
                  <MdPets size={24} color="#f47c2c" className="pregunta-icon" />
                </div>
                <div className="pregunta-item" style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                  <span style={{marginRight: '90px'}}>¿Cuánto cuesta esterilizar?</span>
                  <FaBriefcaseMedical size={24} color="#f47c2c" className="pregunta-icon" />
                </div>
                <div className="pregunta-item" style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                  <span style={{marginRight: '117px'}}>¿Cómo puedo ayudar?</span>
                  <FaHandHoldingHeart size={24} color="#f47c2c" className="pregunta-icon" />
                </div>
            </div>
          </div>

          {/* Contacto de denuncias Card */}
          <div className="dashboard-section contacto">
            <h3>Contacto de<br /> Denuncias por maltrato</h3>
            <span><FiPhone size={24} color="#f47c2c" /> +58 4129267842</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
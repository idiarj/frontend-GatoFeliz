import React from 'react';
import { FiPhone } from 'react-icons/fi';
import { FaQuestionCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Head from '../../../components/head/head.jsx';
import Menu from '../../../components/menu/menu.jsx';
import './dashboard.css';

import logoIcono from '../../../assets/images/logoicono.png';
import michi1 from '../../../assets/michis/michi1siames.png';
import michi2 from '../../../assets/michis/michi2blancoynegro.png';
import michi3 from '../../../assets/michis/michi3tabby.png';
import michi4 from '../../../assets/michis/michi4naranja.png';
import michi5 from '../../../assets/michis/michi5bebe.png';
import michi6 from '../../../assets/michis/michi6ragdoll.png';
import michi7 from '../../../assets/michis/michi7naranjo.png';
import michi8 from '../../../assets/michis/michi8siamesDis.png';
import michi9 from '../../../assets/michis/michi9tabbywhite.png';
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
  {
    id: 2,
    name: "Luna",
    gender: "Hembra",
    age: "1 año",
    image: michi2,
    description: "Muy tranquila y sociable con otros gatos."
  },
  {
    id: 3,
    name: "Tofu",
    gender: "Macho",
    age: "2 meses",
    image: michi3,
    description: "Cachorro curioso y activo, ideal para familias."
  },
  {
    id: 4,
    name: "Michis",
    gender: "Hembra",
    age: "3 años",
    image: michi4,
    description: "Le encanta dormir al sol y recibir caricias en la panza."
  },
  {
    id: 5,
    name: "Tigresa",
    gender: "Hembra",
    age: "1 año y medio",
    image: michi5,
    description: "Muy activa y curiosa, ideal para hogares con niños."
  },
  {
    id: 6,
    name: "Simón",
    gender: "Macho",
    age: "4 años",
    image: michi6,
    description: "Tranquilo y protector, perfecto para compañía."
  },
  {
    id: 7,
    name: "Nina",
    gender: "Hembra",
    age: "2 años",
    image: michi7,
    description: "Muy sociable, se lleva bien con otros gatos y perros."
  },
  {
    id: 8,
    name: "Koda",
    gender: "Macho",
    age: "5 meses",
    image: michi8,
    description: "Cachorro juguetón, le encanta explorar y trepar."
  },
  {
    id: 9,
    name: "Purr",
    gender: "Hembra",
    age: "1 año",
    image: michi9,
    description: "Ronronea mucho y busca un hogar tranquilo."
  }
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
            <h2>Adopciones</h2>
            <AdoptionCard
              name={catsData[catsData.length-1].name}
              gender={catsData[catsData.length-1].gender}
              age={catsData[catsData.length-1].age}
              image={catsData[catsData.length-1].image}
              onRequest={() => navigate('/adoptions')}
              buttonLabel="Ver más…"
              boxShadow={false}
            />
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
import { FaCreditCard, FaGlobeAmericas, FaWhatsapp, FaDog } from "react-icons/fa";
import { MdAnnouncement } from "react-icons/md";
import donacionesImg from '../../../assets/images/donaciones.png';
import aportesImg from '../../../assets/images/aportes.png';
import Head from '../../../components/head/head.jsx';
import Menu from "../../../components/menu/menu.jsx";

import './donations.css';

const Donations = () => {
  return (
    <>
      <Head title={"Donaciones y aportes"} />
      <Menu />
      <div className="donations-root">
        <div className="donations-container-modern">
          <section className="donations-header">
            <p>Tu ayuda transforma vidas. Elige tu método favorito y apoya a nuestros gatitos.</p>
          </section>
          <div className="donations-grid">
              <div className="donations-card" style={{ background: '#ffe0d1' }}>
                <h3><FaCreditCard /> Métodos de pago (BS)</h3>
                <ul>
                  <li><strong>Transferencia:</strong> Saile Devis<br />CI: 11.281.817<br />Cuenta: 0134 0050 4105 0102 3671</li>
                  <li><strong>Pago Móvil:</strong> Banesco<br />Titular: Saile Devis<br />C.I.: 11.281.817<br />Teléfono: 0414 640-7460</li>
                </ul>
              </div>
              <div className="donations-card whatsapp" style={{ background: '#fff8e1' }}>
                <h3><FaWhatsapp /> ¿Hiciste una donación?</h3>
                <p>¡Mándanos tu capture y te agradecemos con ronroneo!</p>
                <img src={donacionesImg} alt="gatito donación" className="donations-img-modern" />
                <a href="https://wa.me/584146407460" target="_blank" rel="noopener noreferrer" className="donations-whatsapp-btn-modern">
                  <FaWhatsapp /> Ir a WhatsApp
                </a>
              </div>
              <div className="donations-card" style={{ background: '#ffe0d1' }}>
                <h3><FaGlobeAmericas /> Métodos de pago (US$)</h3>
                <ul>
                  <li><strong>Paypal:</strong> sailedevis@hotmail.com (Saile Devis)</li>
                  <li><strong>Zelle:</strong> gatofelizvenezuela@gmail.com (Luis Prado)</li>
                  <li><strong>Venmo:</strong> @Janell-Copello</li>
                  <li><strong>Binance:</strong> ID:5800</li>
                  <li><strong>Gofundme:</strong> <a href="https://www.gofundme.com/f/9yevcq-ayudanos-a-que-400-gatos-no-vuelvan-a-la-calle" target="_blank" rel="noopener noreferrer">¡Apoya a 400 gatitos! 🐾</a></li>
                </ul>
              </div>
          </div>
          <section className="aportes-modern">
            <div className="aportes-urgentes-modern">
              <h2><MdAnnouncement /> Aportes urgentes</h2>
              <div className="aportes-badges">
                <span className="badge">DOXIKUM</span>
                <span className="badge">ALCOHOL</span>
                <span className="badge">GUANTES</span>
              </div>
              <img src={aportesImg} alt="Aportes" className="aportes-img-modern" />
            </div>
            <div className="aportes-info-modern">
              <p>
                En Gato Feliz cada aporte cuenta.<br />
                Nuestra labor va más allá de alimentar a los más de 400 gatos que cuidamos dentro y fuera de la fundación. También necesitamos mantener nuestros espacios limpios y seguros, por lo que los productos de limpieza son esenciales.<br /><br />
                Diariamente atendemos casos médicos que requieren insumos como guantes, jeringas, gasas, hisopos, etc. Y aunque los gatitos son nuestra prioridad, también brindamos apoyo a perritos e incluso a abuelitos de la comunidad que necesitan comida y abrigo.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Donations;

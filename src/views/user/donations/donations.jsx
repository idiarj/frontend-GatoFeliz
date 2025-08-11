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
        <div className="donations-container">
          {/* DONACIONES */}
          <div className="donations-section">
            <img
              src={donacionesImg}
              alt="gatito donación"
              className="donations-img"
            />

            <div className="donations-method-bs">
              <h3 className="donations-title-bs">
                <FaCreditCard /> Métodos de pago (BS)
              </h3>
              <div className="donations-details-bs">
                <strong>Transferencia</strong><br />
                Titular: Saile Devis<br />
                CI: 11.281.817<br />
                Cuenta: 0134 0050 4105 0102 3671<br />
                <strong>Pago Móvil</strong><br />
                Banco: Banesco<br />
                Titular: Saile Devis<br />
                C.I.: 11.281.817<br />
                Teléfono: 0414 640-7460
              </div>
            </div>

            <div className="donations-method-us">
              <h3 className="donations-title-us">
                <FaGlobeAmericas /> Métodos de pago (US$)
              </h3>
              <div className="donations-details-us">
                <strong>Paypal:</strong> sailedevis@hotmail.com<br /> (Titular: Saile Devis)<br />
                <strong>Zelle:</strong> gatofelizvenezuela@gmail.com<br />  (Titular: Luis Prado)<br />
                <strong>Venmo:</strong> @Janell-Copello<br />
                <strong>Binance:</strong> ID:5800<br />
                <strong>Gofundme:</strong>{" "}
                <a
                  href="https://www.gofundme.com/f/9yevcq-ayudanos-a-que-400-gatos-no-vuelvan-a-la-calle"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#ff8800",
                    textDecoration: "underline",
                    fontWeight: "bold",
                  }}
                >
                  ¡Apoya a 400 gatitos! 🐾
                </a>
              </div>
            </div>

            <div className="donations-whatsapp-container">
              <div className="donations-whatsapp-message">
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      ¿Hiciste una donación?
                </span>
                ¡Mándanos tu capture y te agradecemos con ronroneo!
              </div>
              <a
                href="https://wa.me/584146407460"
                target="_blank"
                rel="noopener noreferrer"
                className="donations-whatsapp-btn"
              >
                <FaWhatsapp /> IR A WHATSAPP
              </a>
            </div>
          </div>

          {/* APORTES */}
          <div className="aportes-section">
            <div className="aportes-urgentes">
              <h2 className="aportes-title">
                <MdAnnouncement /> Aportes urgentes
              </h2>
              <div className="aportes-list">
                DOXIKUM (medicamento)<br />
                ALCOHOL<br />
                GUANTES
              </div>
              <img
                src={aportesImg}
                alt="Aporte"
                className="aportes-img"
              />
            </div>
            <div className="aportes-info">
              <div className="aportes-details">
                <span style={{ fontSize: 22, marginTop: 2 }}>
                  En Gato Feliz cada aporte cuenta.<br />
                  Nuestra labor va más allá de alimentar a los más de 400 gatos que cuidamos dentro y fuera de la fundación. También necesitamos mantener nuestros espacios limpios y seguros, por lo que los productos de limpieza son esenciales.<br /><br />
                  Diariamente atendemos casos médicos que requieren insumos como guantes, jeringas, gasas, hisopos, etc. Y aunque los gatitos son nuestra prioridad, también brindamos apoyo a perritos e incluso a abuelitos de la comunidad que necesitan comida y abrigo.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Donations;

import { FaCreditCard, FaGlobeAmericas, FaWhatsapp, FaDog } from "react-icons/fa";
import { MdAnnouncement } from "react-icons/md";
import donacionesImg from '../../../assets/images/donaciones.png';
import aportesImg from '../../../assets/images/aportes.png';
import proteinaIcon from '../../../assets/logos/proteina.png';
import medicinasIcon from '../../../assets/logos/medicinas.png';
import limpiezasIcon from '../../../assets/logos/limpiezas.png';
import ropaIcon from '../../../assets/logos/ropa.png';
import Head from '../../../components/head/head.jsx';
import Menu from "../../../components/menu/menu.jsx";

import './donations.css';

const Donations = () => {
  return (
    <>
      {/* <Head title={"Donaciones y aportes"} />
      <Menu /> */}
      {/* <div className="donations-root">
      </div> */}
        <div className="donations-container-modern">
          <section className="donations-header">
            <p>Tu ayuda transforma vidas. Elige tu método favorito y apoya a nuestros gatitos.</p>
          </section>
          <div className="donations-grid">
              <div className="donations-card" style={{ background: '#ffe0d1' }}>
                <h3><FaCreditCard /> Métodos de pago (BS)</h3>
                <div className="donations-block">
                  <div className="donations-block-title">Transferencia</div>
                  <div className="donations-block-info">
                    <span><strong>Titular:</strong> Saile Devis</span><br />
                    <span><strong>CI:</strong> 11.281.817</span><br />
                    <span><strong>Cuenta:</strong> 0134 0050 4105 0102 3671</span>
                  </div>
                </div>
                <div className="donations-divider"></div>
                <div className="donations-block">
                  <div className="donations-block-title">Pago Móvil</div>
                  <div className="donations-block-info">
                    <span><strong>Banco:</strong> Banesco</span><br />
                    <span><strong>Titular:</strong> Saile Devis</span><br />
                    <span><strong>CI:</strong> 11.281.817</span><br />
                    <span><strong>Teléfono:</strong> 0414 640-7460</span>
                  </div>
                </div>
              </div>
              <div className="donations-card whatsapp" style={{ background: '#fff8e1' }}>
                <h3> ¿Hiciste una donación?</h3>
                <p>¡Mándanos tu capture y te agradecemos personalmente!</p>
                <img src={donacionesImg} alt="gatito donación" className="donations-img-modern" />
                <a href="https://wa.me/584146407460" target="_blank" rel="noopener noreferrer" className="donations-whatsapp-btn-modern">
                  <FaWhatsapp /> Ir a WhatsApp
                </a>
              </div>
              <div className="donations-card" style={{ background: '#ffe0d1' }}>
                <h3><FaGlobeAmericas /> Métodos de pago (US$)</h3>
                <div className="donations-block">
                  <div className="donations-block-title">Paypal</div>
                  <div className="donations-block-info">
                    <span><strong>Email:</strong> sailedevis@hotmail.com</span><br />
                    <span><strong>Titular:</strong> Saile Devis</span>
                  </div>
                </div>
                <div className="donations-divider"></div>
                <div className="donations-block">
                  <div className="donations-block-title">Zelle</div>
                  <div className="donations-block-info">
                    <span><strong>Email:</strong> gatofelizvenezuela@gmail.com</span><br />
                    <span><strong>Titular:</strong> Luis Prado</span>
                  </div>
                </div>
                <div className="donations-divider"></div>
                <div className="donations-block" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <div>
                    <div className="donations-block-title">Binance</div>
                    <div className="donations-block-info">
                      <span><strong>ID:</strong> 580089055</span>
                    </div>
                  </div>
                  <div>
                    <div className="donations-block-title">Gofundme</div>
                    <div className="donations-block-info">
                      <a href="https://www.gofundme.com/f/9yevcq-ayudanos-a-que-400-gatos-no-vuelvan-a-la-calle" target="_blank" rel="noopener noreferrer" style={{ color: '#F37021', fontWeight: 'bold', textDecoration: 'underline' }}>¡Apoya a 400 gatitos! 🐾</a>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <h2 className="aportes-title-modern">
            ¿No puedes donar dinero? ¡También puedes ayudarnos con alguno de estos aportes!
          </h2>
          <section className="aportes-modern">
            <div className="aportes-items-modern">
              <div className="aportes-item-modern">
                <img src={proteinaIcon} alt="Proteínas" className="aportes-icon-modern" />
                <div className="aportes-text-modern">Proteínas:<br /> pollo, sardinas, carne, mollejas o gatarina</div>
              </div>
              <div className="aportes-item-modern">
                <img src={medicinasIcon} alt="Medicinas" className="aportes-icon-modern" />
                <div className="aportes-text-modern">Medicinas:<br /> guantes, hisopos, gasas, vitaminas y alcohol</div>
              </div>
              <div className="aportes-item-modern">
                <img src={limpiezasIcon} alt="Limpieza" className="aportes-icon-modern aportes-icon-limpiezas" />
                <div className="aportes-text-modern">Productos de limpieza:<br /> desinfectantes, escobas, lavaplatos, esponjas</div>
              </div>
              <div className="aportes-item-modern">
                <img src={ropaIcon} alt="Ropa" className="aportes-icon-modern" />
                <div className="aportes-text-modern">Utiles:<br /> Ropa, almohadas, toallas, zapatos y alimentos no perecederos</div>
              </div>
            </div>
          </section>
        </div>
    </>
  );
};

export default Donations;

import React from "react";
import "../../App.css";
import donacionesImg from "../../assets/donaciones.png";
import purringImg from "../../assets/purring.png";
import Head from "../../components/head";
import Menu from "../../components/menu";

const Donations = () => {
  return (
    <>
      <Head title={"Donaciones y aportes"} />
      <Menu />
      <div style={{ background: "#fff", minHeight: "100vh", padding: "0", fontFamily: "Montserrat, sans-serif" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 16px" }}>
          {/* Donación */}
          <div style={{ background: "#FFF9E5", borderRadius: 16, boxShadow: "0 2px 8px #0001", margin: "32px 0", padding: 24, display: "flex", flexWrap: "wrap", gap: 32, marginTop: 120, marginLeft: 68}}>
            <div style={{ flex: 2, minWidth: 260 }}>
              <h2 style={{ color: "#F37021", fontWeight: 700, fontSize: 24 }}>Donación</h2>
              <h3 style={{ color: "#F37021", fontWeight: 700, fontSize: 20, marginTop: 16 }}>Métodos de pago</h3>
              <div style={{ marginTop: 8 }}>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ color: "#F37021", fontWeight: 600 }}>BANESCO</div>
                  <div style={{ color: "#F37021"}}>Titular: Saile Devis</div>
                  <div style={{ color: "#F37021"}}>C.I.: 11.281.817</div>
                  <div style={{ color: "#F37021"}}>Cuenta corriente No.: 0134 0050 4105 0102 3671</div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ color: "#F37021", fontWeight: 600 }}>PAGO MÓVIL Banesco</div>
                  <div style={{ color: "#F37021"}}>Titular: Saile Devis</div>
                  <div style={{ color: "#F37021"}}>C.I.: 11.281.817</div>
                  <div style={{ color: "#F37021"}}>Teléfono: 0414 640-7460</div>
                </div>
              </div>
            </div>
            <div style={{ flex: 2, minWidth: 260 }}>
              <h3 style={{ color: "#F37021", fontWeight: 700, fontSize: 20 }}>DONACIONES (US$)</h3>
              <div style={{ marginTop: 8 }}>
                <div style={{ color: "#F37021" }}><b>Paypal</b><br />Titular: Saile Devis<br />e-mail: sailedevis@hotmail.com</div>
                <div style={{ marginTop: 12,color: "#F37021" }}><b>Zelle</b><br />Titular: Luis Prado<br />e-mail: gatofelizvenezuela@gmail.com</div>
                <div style={{ marginTop: 12, color: "#F37021" }}><b>Venmo</b><br />@Janell-Copello</div>
                <div style={{ marginTop: 12,color: "#F37021" }}><b>Gofundme</b><br /><a href="https://www.gofundme.com/f/9yevcq-ayudanos-a-que-400-gatos-no-vuelvan-a-la-calle" target="_blank" rel="noopener noreferrer" style={{ color: "#FF6F1A" }}>https://www.gofundme.com/f/9yevcq-ayudanos-a-que-400-gatos-no-vuelvan-a-la-calle</a></div>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <img src={donacionesImg} alt="Donación" style={{ width: 120, marginBottom: 16 }} />
              <div style={{ background: "#fff9e5", borderRadius: 16, padding: 16, textAlign: "center", fontWeight: 600, color: "#FF6F1A", fontSize: 16, marginBottom: 8 }}>
                ¿Hiciste una donación?<br />envíanos el capture al número para agradecerte personalmente
              </div>
              <a href="https://wa.me/584146407460" target="_blank" rel="noopener noreferrer" style={{ background: "#FF6F1A", color: "#fff", borderRadius: 24, padding: "10px 24px", fontWeight: 700, textDecoration: "none", fontSize: 16, boxShadow: "0 2px 8px #0001" }}>IR A WHATSAPP</a>
            </div>
          </div>

          {/* Aportes */}
          <div style={{ background: "#FFF9E5", borderRadius: 16, boxShadow: "0 2px 8px #0001", margin: "32px 0", padding: 24, display: "flex", flexWrap: "wrap", gap: 32 }}>
            <div style={{ flex: 1.5, minWidth: 220 }}>
              <h2 style={{ color: "#C97B00", fontWeight: 700, fontSize: 24 }}>Aportes</h2>
              <div style={{ color: "#FF2E00", fontWeight: 700, fontSize: 18, marginTop: 12 }}>HOY NECESITAMOS DE URGENCIA!</div>
              <div style={{ background: "#fff9e5", borderRadius: 16, padding: 16, textAlign: "center", fontWeight: 700, color: "#C97B00", fontSize: 18, margin: "16px 0" }}>
                DOXIKUM(MEDICAMENTO),<br />ALCOHOL, GUANTES
              </div>
              <img src={purringImg} alt="Aporte" style={{ width: 120, margin: "0 auto", display: "block" }} />
            </div>
            <div style={{ flex: 2.5, minWidth: 260, display: "flex", alignItems: "center" }}>
              <div style={{ color: "#C97B00", fontWeight: 500, fontSize: 17, lineHeight: 1.6 }}>
                En Gato Feliz cada aporte cuenta. Nuestra labor va más allá de alimentar a los más de 400 gatos que cuidamos dentro y fuera de la fundación. También necesitamos mantener nuestros espacios limpios y seguros, por lo que los productos de limpieza son esenciales.<br /><br />
                Diariamente atendemos casos médicos que requieren insumos como guantes, jeringas, gasas, hisopos, etc. Y aunque los gatitos son nuestra prioridad, también brindamos apoyo a abuelitos de la comunidad que necesitan comida y abrigo.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Donations;

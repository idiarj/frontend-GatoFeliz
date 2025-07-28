import { FaCreditCard, FaGlobeAmericas, FaWhatsapp, FaDog } from "react-icons/fa";
import { MdAnnouncement } from "react-icons/md";
import donacionesImg from "../../assets/images/donaciones.png";
import aportesImg from "../../assets/images/aportes.png";
import Head from "../../components/head";
import Menu from "../../components/menu";
import "../../App.css";

const Donations = () => {
  return (
    <>
      <Head title={"Donaciones y aportes"} />
      <Menu />
      <div
        style={{
        //   background: "linear-gradient(to bottom, #fffced, #ffe0b2)",
          minHeight: "100vh",
          fontFamily: "Montserrat, sans-serif",
          display: "flex",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "32px 16px",
            marginLeft: 60, // espacio para el menú lateral
            marginTop: 10,// espacio para el head
            width: "100%"
          }}
        >
          {/* DONACIONES */}
          <div
            style={{
              background: "#fff8e1",
              borderRadius: 24,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              padding: "32px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 32,
              marginTop: 100,
              marginLeft: 200, // espacio para el menú lateral
              position: "relative",
              width: "1100px",
              maxWidth: "95vw"
            }}
          >
            <img
              src={donacionesImg}
              alt="gatito donación"
              style={{
                position: "absolute",
                top: "20px",
                right: "150px",
                width: "90px",
                animation: "bounce 2s infinite",
                zIndex: 1,
                boxShadow: "0 2px 8px #0001",
                background: "#fff8e1",
                borderRadius: "50%"
              }}
            />

            <div style={{ flex: 1, minWidth: 260 }}>
              <h3 style={{ color: "#F7B95B", fontWeight: 800, fontSize: 20, display: "flex", alignItems: "center", gap: 8 }}>
                <FaCreditCard /> Métodos de pago (BS)
              </h3>
              <div style={{ marginTop: 12, lineHeight: 1.8, color: "#b94d0d" }}>
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

            <div style={{ flex: 1, minWidth: 260 }}>
              <h3 style={{ color: "#F7B95B", fontWeight: 800, fontSize: 22, display: "flex", alignItems: "center", gap: 8 }}>
                <FaGlobeAmericas /> Métodos de pago (US$)
              </h3>
              <div style={{ marginTop: 12, lineHeight: 1.8, color: "#b94d0d" }}>
                <strong>Paypal:</strong> sailedevis@hotmail.com<br /> (Titular: Saile Devis)<br />
                <strong>Zelle:</strong> gatofelizvenezuela@gmail.com<br />  (Titular: Luis Prado)<br />
                <strong>Venmo:</strong> @Janell-Copello<br />
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

            <div
              style={{
                flex: 1,
                minWidth: 220,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  background: "#ffe9c4",
                  borderRadius: 16,
                  padding: "16px 12px",
                  color: "#FF6F1A",
                  fontWeight: 600,
                  fontSize: 16,
                  lineHeight: 1.5,
                }}
              >
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      ¿Hiciste una donación?
                </span>
                ¡Mándanos tu capture y te agradecemos con ronroneo!
              </div>
              <a
                href="https://wa.me/584146407460"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#FF6F1A",
                  color: "#fff",
                  borderRadius: 32,
                  padding: "12px 26px",
                  fontWeight: 700,
                  textDecoration: "none",
                  fontSize: 16,
                  boxShadow: "0 4px 12px #0002",
                  transition: "all 0.3s",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  justifyContent: "center"
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.05)";
                  e.target.style.background = "#e65c00";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.background = "#FF6F1A";
                }}
              >
                <FaWhatsapp /> IR A WHATSAPP
              </a>
            </div>
          </div>

          {/* APORTES */}
          <div
            style={{
              background: "#ffe0d1",
              borderRadius: 24,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              padding: 32,
              marginTop: 20,
              position: "relative",
              marginLeft: 200,
              display: "flex",
              flexWrap: "wrap",
              gap: 32,
              width: "1100px",
              maxWidth: "95vw"
            }}
          >
            <div style={{ flex: 1.5, minWidth: 240 }}>
              <h2 style={{ color: "#F37021", fontWeight: 800, fontSize: 24, display: "flex", alignItems: "center", gap: 8 }}>
                <MdAnnouncement /> Aportes urgentes
              </h2>
              <div
                style={{
                  background: "#fcb47dff",
                  padding: 16,
                  borderRadius: 16,
                  color: "#ffffffff",
                  fontSize: 18,
                  fontWeight: 700,
                  margin: "16px 0",
                  textAlign: "center",
                }}
              >
                DOXIKUM (medicamento)<br />
                ALCOHOL<br />
                GUANTES
              </div>
              <img
                src={aportesImg}
                alt="Aporte"
                style={{ width: 120, display: "block", margin: "0 auto", marginTop: "36px" }}
              />
            </div>
            <div style={{ flex: 2.5, minWidth: 260 }}>
              <div
                style={{
                  color: "#b94d0d",
                  fontWeight: 500,
                  fontSize: 17,
                  lineHeight: 1.6,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 8,
                }}
              >
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

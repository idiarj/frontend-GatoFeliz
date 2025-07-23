import React, { useState } from "react";
import Head from "../../components/head";
import gatoFaq from "../../assets/gatosesiondespierto.png";
import questionsImg from "../../assets/questions.png";

const faqs = [
  {
    question: "¿Se puede visitar el refugio?",
    answer:
      "¡Claro que sí! Incluso si solo deseas venir a darle amor a los gatitos, estaremos encantados de recibirte. Solo te pedimos que nos avises primero por WhatsApp, ya que no tenemos la ubicación pública debido a que algunas personas han aprovechado la situación para abandonar animales irresponsablemente en nuestra puerta.",
  },
  {
    question: "¿Qué es apadrinar?",
    answer:
      "Apadrinar es ayudar a cubrir los gastos de alimentación, salud y bienestar de uno o varios gatitos del refugio. Puedes hacerlo con aportes mensuales o puntuales.",
  },
  {
    question: "¿Solo ayudan gatos?",
    answer:
      "Aunque los gatitos son nuestra prioridad, también brindamos apoyo a abuelitos de la comunidad que necesitan comida y abrigo.",
  },
  {
    question: "¿Cuánto cuesta una consulta o esterilizar?",
    answer:
      "El costo depende del caso y del veterinario. Si necesitas ayuda, contáctanos y te orientamos sobre precios y opciones solidarias.",
  },
  {
    question: "¿Puedo llevar cualquier gato que vea en la calle?",
    answer:
      "No siempre es posible recibir nuevos gatitos por temas de espacio y recursos. Escríbenos y te ayudamos a buscar la mejor solución para el animalito.",
  },
];

const Questions = () => {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <>
      <Head title={"Preguntas frecuentes"} />
      <div
        style={{            
          minHeight: "100vh",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 16px", marginLeft: 60, marginTop: 10, width: "100%" }}>
          <div
            style={{
              background: "#ffe0d1",
              borderRadius: 24,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              padding: "32px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 32,
              marginTop: 120,
              marginLeft: 200,
              position: "relative",
              width: "1100px",
              maxWidth: "95vw"
            }}
          >
            <div style={{ flex: 1.2, minWidth: 260, maxWidth: 520 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    style={{
                      borderRadius: 14,
                      boxShadow: "0 2px 8px #0001",
                      padding: "10px 18px",
                      marginBottom: 3,
                      maxWidth: 500,
                      background: "#fff"
                    }}
                  >
                    <div
                      style={{ color: "#F37021", fontWeight: 700, fontSize: 16, display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}
                      onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                    >
                      {faq.question}
                      <span style={{ marginLeft: "auto", fontSize: 20, color: "#F7B95B", transition: "transform 0.2s", transform: openIdx === idx ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                    </div>
                    {openIdx === idx && (
                      <div style={{ color: "#b94d0d", fontWeight: 500, fontSize: 14, marginTop: 5 }}>
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <img
                src={questionsImg}
                alt="Questions ilustración"
                style={{ width: 260, marginTop: 32, marginBottom: 16 }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Questions;

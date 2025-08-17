import { useState } from "react";
import Head from '../../../components/head/head.jsx';
import questionsImg from '../../../assets/images/questions.png';

import './questions.css';

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
      <div className="questions-root">
        <div className="questions-container">
          <div className="questions-section">
            <div className="questions-faqs">
              <div className="questions-faqs-list">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="questions-faq-item">
                    <div
                      className={`questions-faq-question${openIdx === idx ? ' open' : ''}`}
                      onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                    >
                      {faq.question}
                      <span className="questions-faq-arrow" style={{ transform: openIdx === idx ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                    </div>
                    {openIdx === idx && (
                      <div className="questions-faq-answer">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="questions-img-container">
              <img
                src={questionsImg}
                alt="Questions ilustración"
                className="questions-img"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Questions;

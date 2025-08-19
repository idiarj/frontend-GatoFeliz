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
  // --- nuevas preguntas agregadas ---
  {
    question: "¿Atienden consultas de rutinas que no son emergencias?",
    answer: "Sí, atendemos consultas de rutina además de emergencias."
  },
  {
    question: "¿Piensan expandirse más allá de Maracaibo?",
    answer: "No, es logísticamente imposible expandirnos fuera de Maracaibo."
  },
  {
    question: "¿Cómo manejan la organización y logística para cubrir todas las necesidades de la fundación?",
    answer: "Responde Luis. Luis es el gerente, estoy esperando que me conteste para cambiarlo."
  },
  {
    question: "¿Cómo puedo participar en las actividades de la fundación?",
    answer: "Puedes participar estando pendiente de nuestro Instagram, donde publicamos cuando necesitamos traslados o ayuda en actividades."
  },
  {
    question: "¿Cómo llevan el control de los gatos hospitalizados y los que no para no confundirse?",
    answer: "Los gatos hospitalizados están en jaulas, lo que facilita su control y seguimiento."
  },
  {
    question: "¿La fundación solo existe gracias a los donativos?",
    answer: "Sí, la fundación se sostiene únicamente gracias a los donativos."
  },
  {
    question: "¿Cómo logran ayudar a tantos gatos con emergencias médicas y también en la alimentación de los de la fundación y zonas cercanas?",
    answer: "Responde Luis. Luis es el gerente, estoy esperando que me conteste para cambiarlo."
  },
  {
    question: "¿Cómo se puede colaborar sin necesidad de dar dinero?",
    answer: "Puedes colaborar donando medicinas, gatarina, proteínas, productos de limpieza y accesorios para gatos como jaulas, comederos, etc."
  },
  {
    question: "¿Tienen consultas? ¿Cuáles son los costos y horarios?",
    answer: "Sí, el costo de la consulta es $7. El horario es de 8am a 8pm, por orden de llegada y según disponibilidad."
  },
  {
    question: "¿Cuántos gatitos tienen actualmente?",
    answer: "Tenemos aproximadamente 300 gatitos en este momento."
  },
  {
    question: "¿Cuántas personas trabajan en la fundación?",
    answer: "Actualmente trabajan 7 personas, una señora encargada de la limpieza y 5 auxiliares veterinarios que se turnan."
  },
  {
    question: "¿Qué hacen con los gatos cuando se recuperan y no tienen a dónde ir? ¿Se quedan en la fundación?",
    answer: "Sí, se les busca un hogar, pero si no lo consiguen permanecen en la fundación."
  },
  {
    question: "¿Qué se requiere para adoptar un gato?",
    answer: "Responsabilidad y disposición para quererlos y cuidarlos."
  },
  {
    question: "¿Dónde se encuentra la sede principal?",
    answer: "Puedes encontrar la ubicación buscando el nombre de la fundación en Google."
  },
  {
    question: "¿Por qué solo gatos y no perros también?",
    answer: "También atendemos perros, pero nos enfocamos principalmente en gatos por... Responde Luis. Luis es el gerente, estoy esperando que me conteste para cambiarlo."
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

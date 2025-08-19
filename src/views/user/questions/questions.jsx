import { useState } from "react";
import Head from '../../../components/head/head.jsx';
import questionsImg from '../../../assets/images/questions.png';
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import './questions.css';

const faqs = [
  {
    question: "¿Qué es apadrinar?",
    answer:
      "Apadrinar es ayudar a cubrir los gastos de alimentación, salud y bienestar de uno o varios gatitos del refugio. Puedes hacerlo con aportes mensuales.",
  },
  {
    question: "¿Se puede visitar el refugio?",
    answer:
      "Si, incluso si solo quieres ir a ver a los gatitos. Puedes encontrar la ubicación buscando el nombre de la fundación en Google.",
  },
  {
    question: "¿Solo ayudan gatos?",
    answer:
      "Ofrecemos atención a todos los animales, pero nuestra prioridad son los gatos.",
  },
  {
    question: "¿En que parte de Venezuela se encuentran?",
    answer: "Estamos ubicados en Maracaibo, estado Zulia."
  },
  {
    question: "¿Cuánto cuesta esterilizar?",
    answer:
      "Cuesta $10, el horario de llevar el animalito es de 8am a 10am y la de entra de entre 3pm y 5pm. Te recomendamos llegar temprano ya que es por orden de llegada.",
  },
  {
    question: "¿Puedo llevar cualquier gato que vea en la calle?",
    answer:
      "No siempre es posible recibir nuevos gatitos por temas de espacio y recursos. Escríbenos y te ayudamos a buscar la mejor solución para el animalito.",
  },
  {
    question: "¿Atienden consultas de rutinas que no son emergencias?",
    answer: "Sí, el costo de la consulta es $7. El horario es de 8am a 8pm, por orden de llegada y según disponibilidad."
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
    answer: "Puedes participar estando pendiente de nuestro Instagram, donde publicamos cuando necesitamos traslados para los rescates."
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
    question: "¿Cuántos gatitos tienen actualmente?",
    answer: "Tenemos aproximadamente 300 gatitos en este momento."
  },
  {
    question: "¿Cuántas personas trabajan en la fundación?",
    answer: "Actualmente 7 trabajadores, una señora encargada de la limpieza y 5 auxiliares veterinarios que se turnan."
  },
  {
    question: "¿Qué hacen con los gatos cuando se recuperan y no tienen a dónde ir? ¿Se quedan en la fundación?",
    answer: "Sí, se les busca un hogar, pero si no lo consiguen permanecen en la fundación."
  },
  {
    question: "¿Qué se requiere para adoptar un gato?",
    answer: "Responsabilidad y disposición para quererlos y cuidarlos."
  },

];


const chunkArray = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const Questions = () => {
  const [openIdx, setOpenIdx] = useState(null);
  // Agrupar preguntas en bloques de 4
  const faqChunks = chunkArray(faqs, 4);
  return (
    <>
      <div className="questions-root">
        <div className="questions-container">
          <div className="questions-section">
            <div className="questions-benito-fixed">
              <img src={questionsImg} alt="Benito responde" className="questions-benito-img" />
              <div className="questions-benito-text">Benito responde tus dudas...</div>
            </div>
            <div className="questions-faqs">
              {faqs.map((faq, idx) => (
                <div key={idx} className={`questions-faq-item${openIdx === idx ? ' active' : ''}`}>
                  <div
                    className={`questions-faq-question${openIdx === idx ? ' open' : ''}`}
                    onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  >
                    <span className="questions-faq-question-text">{faq.question}</span>
                    <span className="questions-faq-arrow">
                      {openIdx === idx ? (
                        <FaArrowCircleDown size={24} color="#ff9500" />
                      ) : (
                        <FaArrowCircleUp size={24} color="#ff9500" />
                      )}
                    </span>
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
        </div>
      </div>
    </>
  );
};

export default Questions;

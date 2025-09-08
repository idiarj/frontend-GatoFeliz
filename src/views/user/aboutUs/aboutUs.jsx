
import Head from '../../../components/head/head.jsx';
import Menu from "../../../components/menu/menu.jsx";
import rescueCat from '../../../assets/images/aboutus1.png';
import adoptCat from '../../../assets/images/aboutus2.png';
import careCat from '../../../assets/images/aboutus3.png';
import './aboutUs.css';

import nota1 from '../../../assets/audios/a6Nota1.mp3';
import nota2 from '../../../assets/audios/g6Nota2.mp3';
import nota3 from '../../../assets/audios/b6Nota3.mp3';

const cardData = [
  {
    title: 'Rescate',
    img: rescueCat,
    bg: '#fff8e1',
    text: 'Rescatamos y acogemos a los animales necesitados.',
    color: '#F37021',
    audio: nota1,
  },
  {
    title: 'Hogar',
    img: adoptCat,
    bg: '#ffe0d1',
    text: 'Buscamos un hogar adecuado para ellos.',
    color: '#F37021',
    audio: nota2,
  },
  {
    title: 'Cuidado',
    img: careCat,
    bg: '#fff8e1',
    text: 'Les brindamos atención médica 24/7 en la fundación.',
    color: '#F37021',
    audio: nota3,
  },
];

import React, { useRef } from 'react';

export default function AboutUs() {
  // refs para los audios
  const audioRefs = useRef([]);

  // Función para reproducir el audio correspondiente
  const handlePlayAudio = (idx) => {
    const audio = audioRefs.current[idx];
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  return (
    <div className="aboutus-bg">
      {/* <Head title="¿Qué hacemos?" />
      <Menu /> */}
      <div className="aboutus-cards">
        {cardData.map((card, idx) => (
          <div
            key={idx}
            className={`aboutus-card aboutus-card${idx}`}
            style={{ background: card.bg }}
            onMouseEnter={() => handlePlayAudio(idx)}
          >
            <div className="aboutus-title" style={{ color: card.color }}>{card.title}</div>
            <img
              src={card.img}
              alt={card.title}
              className="aboutus-img"
            />
            <div className="aboutus-text">{card.text}</div>
            <audio
              ref={el => (audioRefs.current[idx] = el)}
              src={card.audio}
              preload="auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

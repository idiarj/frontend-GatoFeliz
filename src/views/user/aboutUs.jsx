import React from 'react';
import Head from '../../components/head.jsx';
import rescueCat from '../../assets/aboutus1.png';
import adoptCat from '../../assets/aboutus2.png';
import careCat from '../../assets/aboutus3.png';

const cardData = [
  {
    title: 'Rescate',
    img: rescueCat,
    bg: '#fff8e1',
    text: 'Rescatamos y acogemos a los animales necesitados.',
    color: '#F37021',
  },
  {
    title: 'Hogar',
    img: adoptCat,
    bg: '#ffe0d1',
    text: 'Buscamos un hogar adecuado para ellos.',
    color: '#F37021',
  },
  {
    title: 'Cuidado',
    img: careCat,
    bg: '#fff8e1',
    text: 'Brindamos atención médica 24/7 en la fundación.',
    color: '#F37021',
  },
];

export default function AboutUs() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <Head title="¿Qué hacemos?" />
      <div style={{
        marginTop: 180,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 40,
        flexWrap: 'wrap',
        marginLeft: 300,
      }}>
        {cardData.map((card, idx) => (
          <div key={idx} style={{
            background: card.bg,
            borderRadius: 24,
            boxShadow: '0 2px 12px 0 rgba(243,112,33,0.07)',
            width: 300,
            minHeight: 420,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2.2rem 1.2rem 1.5rem 1.2rem',
            marginBottom: 24,
          }}>
            <div style={{ color: card.color, fontWeight: 'bold', fontSize: 60, marginBottom: 22, letterSpacing: 0.5 }}>{card.title}</div>
            <img
              src={card.img}
              alt={card.title}
              style={{
                width: 180,
                height: 180,
                objectFit: 'contain',
                marginBottom: 18,
                transition: 'transform 0.25s cubic-bezier(.4,1.3,.6,1)',
                cursor: 'pointer',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.18)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
            <div style={{ color: '#F37021', fontWeight: 600, fontSize: 20, textAlign: 'center', marginTop: 14 }}>{card.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

import Head from '../../../components/head/head.jsx';
import Menu from "../../../components/menu/menu.jsx";
import rescueCat from '../../../assets/images/aboutus1.png';
import adoptCat from '../../../assets/images/aboutus2.png';
import careCat from '../../../assets/images/aboutus3.png';
import './aboutUs.css';

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
    text: 'Les brindamos atención médica 24/7 en la fundación.',
    color: '#F37021',
  },
];

export default function AboutUs() {
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
          >
            <div className="aboutus-title" style={{ color: card.color }}>{card.title}</div>
            <img
              src={card.img}
              alt={card.title}
              className="aboutus-img"
            />
            <div className="aboutus-text">{card.text}</div>
          </div>
        ))}
      </div>
    </div>

  );
}

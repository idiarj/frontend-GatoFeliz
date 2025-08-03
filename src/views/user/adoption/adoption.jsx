import React, { useEffect, useState } from "react";
import AdoptionCard from "../../../components/AdoptionCard";
import AddAdoptionCard from "../../../components/AddAdoptionCard";
import Head from "../../../components/head";
import Menu from "../../../components/menu";
import michi1 from "../../assets/michis/michi1siames.png";
import michi2 from "../../assets/michis/michi2blancoynegro.png";
import michi3 from "../../assets/michis/michi3tabby.png";
import michi4 from "../../assets/michis/michi4naranja.png";
import michi5 from "../../assets/michis/michi5bebe.png";
import michi6 from "../../assets/michis/michi6ragdoll.png";
import michi7 from "../../assets/michis/michi7naranjo.png";
import michi8 from "../../assets/michis/michi8siamesDis.png";
import michi9 from "../../assets/michis/michi9tabbywhite.png";
import "./adoption.css";

const catsData = [
  {
    id: 1,
    name: "Milo",
    gender: "Macho",
    age: "2 años",
    image: michi1,
    description: "Cariñoso y juguetón, busca un hogar amoroso."
  },
  {
    id: 2,
    name: "Luna",
    gender: "Hembra",
    age: "1 año",
    image: michi2,
    description: "Muy tranquila y sociable con otros gatos."
  },
  {
    id: 3,
    name: "Tofu",
    gender: "Macho",
    age: "2 meses",
    image: michi3,
    description: "Cachorro curioso y activo, ideal para familias."
  },
  {
    id: 4,
    name: "Michis",
    gender: "Hembra",
    age: "3 años",
    image: michi4,
    description: "Le encanta dormir al sol y recibir caricias en la panza."
  },
  {
    id: 5,
    name: "Tigresa",
    gender: "Hembra",
    age: "1 año y medio",
    image: michi5,
    description: "Muy activa y curiosa, ideal para hogares con niños."
  },
  {
    id: 6,
    name: "Simón",
    gender: "Macho",
    age: "4 años",
    image: michi6,
    description: "Tranquilo y protector, perfecto para compañía."
  },
  {
    id: 7,
    name: "Nina",
    gender: "Hembra",
    age: "2 años",
    image: michi7,
    description: "Muy sociable, se lleva bien con otros gatos y perros."
  },
  {
    id: 8,
    name: "Koda",
    gender: "Macho",
    age: "5 meses",
    image: michi8,
    description: "Cachorro juguetón, le encanta explorar y trepar."
  },
  {
    id: 9,
    name: "Purr",
    gender: "Hembra",
    age: "1 año",
    image: michi9,
    description: "Ronronea mucho y busca un hogar tranquilo."
  }
];

const Adoptions = () => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    // Simula la petición a la base de datos
    setTimeout(() => {
      setCats(catsData);
    }, 500); // Simula un pequeño delay
  }, []);

  return (
    <div className="adoption-container">
      <Head title="Adopciones" />
      <Menu />
      <div className="adoption-content">
        <div className="adoption-info">
          La manera de adoptar es enviando una solicitud o visitando directamente la fundación.<br />
          Escríbenos antes de venir para coordinar tu visita y poder atenderte de la mejor manera posible.
        </div>
        <div className="adoption-cards">
          {cats.map((cat) => (
            <AdoptionCard key={cat.id} {...cat} onRequest={() => alert(`Solicitud enviada para ${cat.name}`)} />
          ))}
          <AddAdoptionCard onAdd={() => alert("Agregar nuevo gato (funcionalidad pendiente)")} />
        </div>
      </div>
    </div>
  );
};

export default Adoptions;
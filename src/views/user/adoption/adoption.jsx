import React, { useState, useEffect } from "react";
import { fetchInstance } from "../../../utils/Fetch";
import { useLoaderData } from "react-router-dom";
import { useUser } from "../../../hooks/useUser.jsx";
import AdoptionCard from "../../../components/adoptionCard/adoptionCard";
import AddAdoptionCard from "../../../components/addAdoptionCard/addAdoptionCard.jsx";
import Head from '../../../components/head/head.jsx';
import Menu from "../../../components/menu/menu.jsx";

import "./adoption.css";


const Adoptions = () => {
  const [cats, setCats] = useState([]);
  const { user } = useUser();
  const test = true;
  //const [search, setSearch] = useState("");

  const data = useLoaderData();
  useEffect(() => {
    setCats(data);
  }, [data]);

  // Filtrar gatos por nombre
  // const filteredCats = cats.filter(cat =>
  //   cat.name.toLowerCase().includes(search.toLowerCase())
  // );

    const onDelete = async (id) => {
      try {
        await fetchInstance.delete({
          endpoint: `/animal/${id}`
        });
        setCats((prevCats) => prevCats.filter((cat) => cat.id_animal !== id));
      } catch (error) {
        console.error("Error deleting cat:", error);
      }
    };

    const onSubmit = async (data) => {
    try {
      const response = await fetchInstance.postMultipart({
        endpoint: "/animal",
        body: data,
      });
      console.log("Response:", response.data);
      const catData = await response.json();
      setCats((prevCats) => {
        console.log("Previous cats:", prevCats);
        console.log("New cat data:", catData);
        return [...prevCats, catData.data];
      });

      return catData;
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  }

  return (
    <div className="adoption-container">
      <Head title="Adopciones" showSearch={true} onSearch={() => {}} />
      <Menu />
      <div className="adoption-content">
        <div className="adoption-info">
          La manera de adoptar es enviando una solicitud o visitando directamente la fundación.<br />
          Escríbenos antes de venir para coordinar tu visita y poder atenderte de la mejor manera posible.
        </div>
        <div className="adoption-cards">
          {/* {filteredCats.map((cat) => (
            <AdoptionCard key={cat.id} {...cat} onRequest={() => alert(`Solicitud enviada para ${cat.name}`)} />
          ))} */}
          {cats && (
            cats.map((cat)=>(
              <AdoptionCard
                key={cat.id_animal}
                name={cat.nom_animal}
                gender={cat.genero_animal}
                age={cat.edad_animal}
                image={cat.ruta_imagen_an}
                onRequest={() => alert(`Solicitud enviada para ${cat.nom_animal}`)}
                onDelete={() => onDelete(cat.id_animal)}
              />
            ))
          )}
          {
            (test || (user && (user.id_perfil === 1 || user.id_perfil === 2))) && (
              <AddAdoptionCard onSubmit={onSubmit} uploading={false} />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Adoptions;
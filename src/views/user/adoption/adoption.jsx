import React, { useState, useEffect } from "react";
import { createRequest } from "../../../api/Requests.js";
import { deleteCat, postCat } from "../../../api/Cats.js";
import { useLoaderData } from "react-router-dom";
import { useUser } from "../../../hooks/useUser.jsx";
import CatCard from "../../../components/catCard/catCard.jsx";
import AddCatCard from "../../../components/addCatCard/addCatCard"
import "./adoption.css";


const Adoptions = () => {
  const [cats, setCats] = useState([]);
  const { user } = useUser();
  const testing = import.meta.env.VITE_TESTING === 'true';
  console.log(cats)
  const {data} = useLoaderData();
  useEffect(() => {
    setCats(data);
  }, [data]);

  // Filtrar gatos por nombre
  // const filteredCats = cats.filter(cat =>
  //   cat.name.toLowerCase().includes(search.toLowerCase())
  // );

  const handleRequest = async (cat)=>{
    try {
      console.table(cat);
      const data = await createRequest({ id_animal: cat.id_animal }, "adopt");
      console.table(data);
      if(!data.success){
        console.error('Error al enviar la solicitud de apadrinamiento:', data.errorMsg);
      }
    } catch (error) {
      console.error("Error handling request:", error);
    }
  }

  const onDelete = async (id) => {
    try {
      setCats((prevCats = []) => prevCats.filter((cat) => cat.id_animal !== id));
      await deleteCat(id);
    } catch (error) {
      console.error("Error deleting cat:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      console.table(data);
      const catData = await postCat(data);
      console.table(catData.data);
      setCats((prevCats) => [...(prevCats || []), catData.data]);

      // return catData;
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  }

  return (
       <div className="adoption-content">
        <div className="adoption-info">
          La manera de adoptar es enviando una solicitud o visitando directamente la fundación.<br />
          Escríbenos antes de venir para coordinar tu visita y poder atenderte de la mejor manera posible.
        </div>
        <div className="adoption-cards">
          {/* {filteredCats.map((cat) => (
            <AdoptionCard key={cat.id} {...cat} onRequest={() => alert(`Solicitud enviada para ${cat.name}`)} />
          ))} */}
          {/* {cats && cats.length === 0 && (
            <div className="no-cats-message">
              No hay gatos disponibles para adopción en este momento.
            </div>
          )} */}
          {cats && cats.length > 0 && (
            cats.map((cat)=>(
              <CatCard
                key={cat.id_animal}
                name={cat.nom_animal}
                gender={cat.genero_animal}
                age={cat.edad_animal}
                image={cat.ruta_imagen_an}
                onRequest={() => handleRequest(cat)}
                onDelete={() => onDelete(cat.id_animal)}
              />
            ))
          )}
          {
            (testing || (user && (user.id_perfil === 1 || user.id_perfil === 2))) && (
              <AddCatCard onSubmit={onSubmit} uploading={false} />
            )
          }
        </div>
      </div>
  );
};

export default Adoptions;
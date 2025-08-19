import React, { useState, useEffect } from "react";
import { fetchInstance } from "../../../utils/Fetch";
import { useLoaderData } from "react-router-dom";
import CatCard from "../../../components/catCard/catCard.jsx";
import AddCatCard from "../../../components/addCatCard/addCatCard.jsx";
import "./sponsor.css";


const Sponsor =  () => {
  const [cats, setCats] = useState([]);
  //const [search, setSearch] = useState("");

  const data = useLoaderData();
  useEffect(() => {
    setCats(data);
  }, [data]);

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

  // Filtrar gatos por nombre
  // const filteredCats = cats.filter(cat =>
  //   cat.name.toLowerCase().includes(search.toLowerCase())
  // );

    const onSubmit = async (data) => {
    try {
      const response = await fetchInstance.postMultipart({
        endpoint: "/animal",
        body: data,
      });
      console.log("Response:", response.data);
      const catData = await response.json();
      setCats((prevCats) => [...prevCats, catData]);

      return catData;
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  }

  return (
    // <div className="sponsor-container">
    // </div>
      <div className="sponsor-content">
        <div className="sponsor-info">
          Apadrinar tiene un costo de tan solo $12 al mes, con esto le aseguras la comida y salud a tu peludo favorito, Envíanos el nombre del gato y captura del comprobante por whatsapp
        </div>
        <div className="sponsor-cards">
          {/* {filteredCats.map((cat) => (
            <AdoptionCard key={cat.id} {...cat} onRequest={() => alert(`Solicitud enviada para ${cat.name}`)} />
          ))} */}
          {cats && (
            cats.map((cat) => (
              <CatCard
                key={cat.id_animal}
                name={cat.nom_animal}
                gender={cat.genero_animal}
                age={cat.edad_animal}
                image={cat.ruta_imagen_an}
                onRequest={() => alert(`Solicitud enviada para ${cat.nom_animal}`)}
                onDelete={onDelete}
                buttonLabel="ENVIAR SOLICITUD"
                boxShadow={true}
                fromSponsor={true}
              />
            ))
          )}
            <AddCatCard onSubmit={onSubmit} uploading={false}/>
        </div>
      </div>
  );
};

export default Sponsor;
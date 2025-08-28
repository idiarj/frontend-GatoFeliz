import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { postCat, deleteCat } from "../../../api/Cats.js";
import { createRequest } from "../../../api/Requests.js";
import { useUser } from "../../../hooks/useUser.jsx";
import CatCard from "../../../components/catCard/catCard.jsx";
import AddCatCard from "../../../components/addCatCard/addCatCard.jsx";
import "./sponsor.css";


const Sponsor =  () => {
  const testing = import.meta.env.VITE_TESTING === 'true';
  const { user } = useUser();
  const [cats, setCats] = useState([]);
  const {data}  = useLoaderData();
  //console.log(data)
  useEffect(() => {
    setCats(data);
  }, [data]);

  const handleRequest = async (cat)=>{
    try {
      console.table(cat);
      const data = await createRequest({ id_animal: cat.id_animal }, "sponsor");
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
      setCats((prevCats) => prevCats.filter((cat) => cat.id_animal !== id));
      await deleteCat(id);
    } catch (error) {
      console.error("Error deleting cat:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const catData = await postCat(data);
      console.table(catData.data);
      setCats((prevCats) => [...(prevCats || []), catData.data]);

      return catData/data;
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  }

  return (
      <div className="sponsor-content">
        <div className="sponsor-info">
          Apadrinar tiene un costo de tan solo $12 al mes, con esto le aseguras la comida y salud a tu peludo favorito, Envíanos el nombre del gato y captura del comprobante por whatsapp
        </div>
        <div className="sponsor-cards">
          {cats && cats.length === 0 && (
            <div className="no-cats-message">
              No hay gatos disponibles para apadrinar en este momento.
            </div>
          )}
          {cats && (
            cats.map((cat) => (
              <CatCard
                key={cat.id_animal}
                name={cat.nom_animal}
                gender={cat.genero_animal}
                age={cat.edad_animal}
                image={cat.ruta_imagen_an}
                onRequest={() => handleRequest(cat)}
                onDelete={() => onDelete(cat.id_animal)}
                buttonLabel="ENVIAR SOLICITUD"
                boxShadow={true}
                fromSponsor={true}
              />
            ))
          )}
          {
            (testing || (user && (user.id_perfil === 1 || user.id_perfil === 2))) && (
              <AddCatCard onSubmit={onSubmit} uploading={false} fromSponsor={true}/>
            )
          }
        </div>
      </div>
  );
};

export default Sponsor;
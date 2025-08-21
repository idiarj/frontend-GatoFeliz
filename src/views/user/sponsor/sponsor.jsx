import { useState, useEffect } from "react";
import { fetchInstance } from "../../../utils/Fetch";
import { useLoaderData } from "react-router-dom";
import { useUser } from "../../../hooks/useUser.jsx";
import CatCard from "../../../components/catCard/catCard.jsx";
import AddCatCard from "../../../components/addCatCard/addCatCard.jsx";
import "./sponsor.css";


const Sponsor =  () => {
  const testing = import.meta.env.VITE_TESTING === 'true';
  const { user } = useUser();
  const [cats, setCats] = useState([]);
  const data  = useLoaderData();
  //console.log(data)
  useEffect(() => {
    setCats(data);
  }, [data]);

  const handleRequest = async (cat)=>{
    try {
      console.table(cat);
      const response = await fetchInstance.post({
        endpoint: "/request-cat?type=sponsor",
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: { id_animal: cat.id_animal }
      });
      console.table(response);
      console.log("Request successful:", response.ok);
    } catch (error) {
      console.error("Error handling request:", error);
    }
  }

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
      setCats((prevCats) => [...prevCats, catData]);

      return catData;
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
          {cats && (
            cats.map((cat) => (
              <CatCard
                key={cat.id_animal}
                name={cat.nom_animal}
                gender={cat.genero_animal}
                age={cat.edad_animal}
                image={cat.ruta_imagen_an}
                onRequest={() => handleRequest(cat)}
                onDelete={onDelete}
                buttonLabel="ENVIAR SOLICITUD"
                boxShadow={true}
                fromSponsor={true}
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

export default Sponsor;
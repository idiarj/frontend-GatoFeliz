// Sponsor.jsx
import { useState, useMemo } from "react";
import {useOutletContext } from "react-router-dom";
import { postCat, deleteCat, fetchAllCats } from "../../../api/Cats.js";
import { createRequest } from "../../../api/Requests.js";
import { useUser } from "../../../hooks/useUser.jsx";
import { useQuery } from "@tanstack/react-query";
import CatCard from "../../../components/catCard/catCard.jsx";
import AddCatCard from "../../../components/addCatCard/addCatCard.jsx";
import Loading from "../loading/Loading.jsx";
import "./sponsor.css";

const normalize = (s = "") =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

const Sponsor = () => {
  const testing = import.meta.env.VITE_TESTING === "true";
  const {_, setCats} = useState([]);
  const { user } = useUser();
  const { data, isLoading } = useQuery({
    queryKey: ["sponsorCats"],
    queryFn: async () => {
      const res = await fetchAllCats();
      if (!res.success || !res.data) {
        return [];
      }
      console.log("Sponsor cats fetched:", res);
      return res.data;
    },
  });
  const { search = "" } = useOutletContext() || {};


  // 🔎 Filtrado por nombre (insensible a acentos y mayúsculas)
  const filteredCats = useMemo(() => {
    if (!search) return data;
    const q = normalize(search);
    return (data || []).filter((cat) => normalize(cat.nom_animal).includes(q));
  }, [data, search]);


  if(isLoading){
    return <div style={{marginTop: '250px'}}><Loading subtitle={'Cargando gatos para apadrinables...'} compact/></div>;
  }

  const handleRequest = async (cat) => {
    try {
      const res = await createRequest({ id_animal: cat.id_animal }, "sponsor");
      if (!res.success) {
        console.error("Error al enviar la solicitud de apadrinamiento:", res.errorMsg);
      }
    } catch (error) {
      console.error("Error handling request:", error);
    }
  };

  const onDelete = async (id) => {
    try {
      setCats((prev) => (prev || []).filter((cat) => cat.id_animal !== id));
      await deleteCat(id);
    } catch (error) {
      console.error("Error deleting cat:", error);
    }
  };

  const onSubmit = async (formData) => {
    try {
      const catData = await postCat(formData);
      setCats((prev) => [...(prev || []), catData.data]);
      return catData.data; // ✅ corregido
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  };

  return (
    <div className="sponsor-content">
      <div className="sponsor-info">
        Apadrinar tiene un costo de tan solo $12 al mes, con esto le aseguras la comida y salud a tu peludo favorito. Envíanos el nombre del gato y captura del comprobante por WhatsApp.
      </div>

      {/* Sin gatos en absoluto */}
      {(!data || data.length === 0) && (
        <div className="no-cats-message">
          No hay gatos disponibles para apadrinar en este momento.
        </div>
      )}

      <div className="sponsor-cards">
        {/* Lista filtrada */}
        {filteredCats && filteredCats.length > 0 && filteredCats.map((cat) => (
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
        ))}

        {/* Hay gatos, pero ninguno coincide con la búsqueda */}
        {data.length > 0 && filteredCats.length === 0 && search && (
          <div className="no-cats-message">
            No hay coincidencias para “{search}”.
          </div>
        )}

        {(testing || (user && user.perfil !== "Usuario")) && (
          <AddCatCard onSubmit={onSubmit} uploading={false} fromSponsor={true} />
        )}
      </div>
    </div>
  );
};

export default Sponsor;

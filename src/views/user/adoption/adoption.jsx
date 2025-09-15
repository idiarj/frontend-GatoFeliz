// Adoptions.jsx
import { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { createRequest } from "../../../api/Requests.js";
import { deleteCat, postCat, fetchAdoptableCats } from "../../../api/Cats.js";
import { useUser } from "../../../hooks/useUser.jsx";
import { useQuery } from "@tanstack/react-query";
import Loading from "../loading/Loading.jsx";
import CatCard from "../../../components/catCard/catCard.jsx";
import AddCatCard from "../../../components/addCatCard/addCatCard"
import "./adoption.css";

const normalize = (s = "") =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

const Adoptions = () => {
  const [cats, setCats] = useState([]);
  const { user } = useUser();
  const testing = import.meta.env.VITE_TESTING === 'true';
  // const { data } = useLoaderData();
  // const { data } = { data: [], success: true }; // datos por defecto
  const { data, isLoading } = useQuery({
    queryKey: ['adoptableCats'],
    queryFn: async () => {
      const res = await fetchAdoptableCats();
      if (!res.success || !res.data) {
        return [];
      }
      console.log("Adoptable cats fetched:", res);
      return res.data;
    }
  });


  const { search = "" } = useOutletContext() || {};

  // useEffect(() => {
  //   setCats(data);
  // }, [data]);

  // 🔎 Filtrado por nombre (insensible a acentos y mayúsculas)
  const filteredCats = useMemo(() => {
    if (!search) return data;
    const q = normalize(search);
    return (data || []).filter(cat => normalize(cat.nom_animal).includes(q));
  }, [data, search]);

  if (isLoading) {
    return <div style={{ marginTop: '250px' }}><Loading subtitle={'Cargando gatos adoptables...'} compact /></div>;
  }

  const handleRequest = async (cat) => {
    try {
      const res = await createRequest({ id_animal: cat.id_animal }, "adopt");
      if (!res.success) {
        console.error('Error al enviar la solicitud de adopción:', res.errorMsg);
      }
    } catch (error) {
      console.error("Error handling request:", error);
    }
  };

  const onDelete = async (id) => {
    try {
      setCats(prev => (prev || []).filter(cat => cat.id_animal !== id));
      await deleteCat(id);
    } catch (error) {
      console.error("Error deleting cat:", error);
    }
  };

  const onSubmit = async (formData) => {
    try {
      const catData = await postCat(formData);
      setCats(prev => ([...(prev || []), catData.data]));
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  };

  return (
    <div className="adoption-content">
      <div className="adoption-info">
        La manera de adoptar es enviando una solicitud o visitando directamente la fundación.<br />
        Escríbenos antes de venir para coordinar tu visita y poder atenderte de la mejor manera posible.
      </div>

      {/* Mensaje cuando no hay gatos en absoluto */}
      {(!data || data.length === 0) && (
        <div className="no-cats-message">
          No hay gatos disponibles para adopción en este momento.
        </div>
      )}

      <div className="adoption-cards">
        {/* Render con filtro */}
        {filteredCats && filteredCats.length > 0 && filteredCats.map((cat) => (
          <CatCard
            key={cat.id_animal}
            name={cat.nom_animal}
            gender={cat.genero_animal}
            age={cat.edad_animal}
            image={cat.ruta_imagen_an}
            onRequest={() => handleRequest(cat)}
            onDelete={() => onDelete(cat.id_animal)}
          />
        ))}

        {/* Mensaje cuando hay gatos pero no coinciden con la búsqueda */}
        {cats.length > 0 && filteredCats.length === 0 && search && (
          <div className="no-cats-message">
            No hay coincidencias para “{search}”.
          </div>
        )}

        {(testing || (user && (user.perfil !== 'Usuario'))) && (
          <AddCatCard onSubmit={onSubmit} uploading={false} />
        )}
      </div>
    </div>
  );
};

export default Adoptions;

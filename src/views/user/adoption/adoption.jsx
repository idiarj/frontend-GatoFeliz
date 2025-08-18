import React, { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";
import { useUser } from "../../../hooks/useUser.jsx";
import Loading from "../loading/Loading.jsx";
import AdoptionCard from "../../../components/adoptionCard/adoptionCard";
import AddAdoptionCard from "../../../components/addAdoptionCard/addAdoptionCard.jsx";
import "./adoption.css";

const Adoptions = () => {
  const { user } = useUser();
  const testing = import.meta.env.VITE_TESTING === "true";

  // 👇 Aquí cats es una PROMESA
  const { cats } = useLoaderData();

  const onDelete = async (id) => { /* ... */ };
  const onSubmit = async (data) => { /* ... */ };

  return (
    <div className="adoption-content">
      <Suspense fallback={<Loading subtitle={"Cargando gatos…"} compact/>}>
        <Await resolve={cats} errorElement={<p>Error cargando gatos</p>}>
          {(list) => (
            <>
              <div className="adoption-info">
                La manera de adoptar es enviando una solicitud...
              </div>
              <div className="adoption-cards">
                {list.map((cat) => (
                  <AdoptionCard
                    key={cat.id_animal}
                    name={cat.nom_animal}
                    gender={cat.genero_animal}
                    age={cat.edad_animal}
                    image={cat.ruta_imagen_an}
                    onRequest={() => alert(`Solicitud enviada para ${cat.nom_animal}`)}
                    onDelete={() => onDelete(cat.id_animal)}
                  />
                ))}
                {(testing ||
                  (user && (user.id_perfil === 1 || user.id_perfil === 2))) && (
                  <AddAdoptionCard onSubmit={onSubmit} uploading={false} />
                )}
              </div>
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export default Adoptions;

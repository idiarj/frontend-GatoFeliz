import { useEffect, useState } from "react"
import { useLoaderData, useNavigate, Link } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";
import { MyCatCard } from "../../../components/myCatCard/myCatCard";
import './MyCats.css';


export const MyCats = () => {
    const [myCats, setMyCats] = useState([]);
    const { user } = useUser();
    const { data } = useLoaderData();
    const navigate = useNavigate();

    console.log(data)
    useEffect(()=>{
        if(!user) {
            navigate('/dashboard');
        }
    }, [user, navigate]); 

    useEffect(()=>{
        if(data) {
            setMyCats(data);
        }
    }, [data]);


    return (
    <div className="myCats-content">
        <div className="myCats-info">
            Aqui puedes ver los gatos que has apadrinado.
        </div>
        {myCats && myCats.length === 0 && (
            <div className="no-cats-message">
                No tienes gatos en tu lista de favoritos.<br />
                <Link to="/apadrinar" className="myCats-link">
                ¡Explora gatos para apadrinar!
                </Link>
            </div>
        )}
        <div className="myCats-cards">
        {myCats && myCats.length > 0 && (
            myCats.map((cat)=>(
              <MyCatCard
                key={cat.id_animal}
                name={cat.nom_animal}
                gender={cat.genero_animal}
                age={cat.edad_animal}
                image={cat.ruta_imagen_an}
              />
            ))
          )}
        </div>
    </div>
  )
}

import { useEffect, useState } from "react"
import { useLoaderData, useNavigate } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";
import { MyCatCard } from "../../../components/myCatCard/myCatCard";
import './MyCats.css';


export const MyCats = () => {
    const [myCats, setMyCats] = useState(['hola', '1', 2]);
    const { user } = useUser();
    // const { data } = useLoaderData();
    const navigate = useNavigate();
    useEffect(()=>{
        if(!user) {
            navigate('/dashboard');
        }
    }, [user, navigate]); 

    
    return (
    <div className="myCats-content">
        <div className="myCats-info">
            Info pantalla
        </div>

        <div className="myCats-cards">
        {myCats && myCats.length > 0 && (
            myCats.map((cat)=>(
              <MyCatCard
                // key={cat.id_animal}
                // name={cat.nom_animal}
                // gender={cat.genero_animal}
                // age={cat.edad_animal}
                // image={cat.ruta_imagen_an}
              />
            ))
          )}
        </div>
    </div>
  )
}

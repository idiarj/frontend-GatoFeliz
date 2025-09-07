import { PermissionContext } from "../context/PermissionsContext";
import { getProfiles } from "../api/Admin";
import { useState, useEffect } from "react";

export const PermissionsProvider = ({children}) => {
    const [permissions, setPermissions] = useState({});
    const [loading, setLoading] = useState(true); // Nuevo estado

    useEffect(()=>{
        const fetchProfiles = async () =>{
            setLoading(true); // Empieza cargando
            const data = await getProfiles();
            if(!data.success){
                setPermissions(null);
                setLoading(false);
                return;
            }
            setPermissions(data.data);
            setLoading(false); // Termina de cargar
        };
        fetchProfiles();
    }, []);

    return (
        <PermissionContext.Provider value={{permissions, setPermissions, loading}}>
            {children}
        </PermissionContext.Provider>
    );
}
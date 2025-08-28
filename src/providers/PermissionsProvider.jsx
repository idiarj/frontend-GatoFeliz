import { PermissionContext } from "../context/PermissionsContext";
import { getProfiles } from "../api/Admin";
import { useState, useEffect } from "react";


export const PermissionsProvider = ({children}) => {
    const [profiles, setProfiles] = useState({})

    useEffect(()=>{
        const fetchProfiles = async () =>{
            const data = await getProfiles()
            console.log(data);
            if(!data.success){
                setProfiles(null);
                return
            }
            setProfiles(data.data)
        };
        fetchProfiles()
    }, [])


    return (
        <PermissionContext.Provider value={(profiles, setProfiles)}>
            {children}
        </PermissionContext.Provider>
    )
}

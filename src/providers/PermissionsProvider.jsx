import { PermissionContext } from "../context/PermissionsContext";
import { getProfiles } from "../api/Admin";
import { useState, useEffect } from "react";


export const PermissionsProvider = ({children}) => {
    const [permissions, setPermissions] = useState({})

    useEffect(()=>{
        const fetchProfiles = async () =>{
            const data = await getProfiles()
            console.log(data);
            if(!data.success){
                setPermissions(null);
                return;
            }
            console.log(data.data)
            setPermissions(data.data)
        };
        fetchProfiles()
    }, [])


    return (
        <PermissionContext.Provider value={{permissions, setPermissions}}>
            {children}
        </PermissionContext.Provider>
    )
}

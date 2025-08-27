import { useState, useEffect } from "react";
import { me } from "../api/Auth.js";
import { UserContext } from "../context/UserContext.jsx";


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Aquí puedes hacer una llamada a la API para obtener los permisos del usuario
    const fetchUser = async () => {
      const data = await me();
      console.log(data)
      if (!data.success) {
        setUser(null);
        return;
      }
      setUser(data.data);
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

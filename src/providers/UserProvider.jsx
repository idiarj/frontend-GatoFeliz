import { useState, useEffect } from "react";
import { fetchInstance } from "../utils/Fetch";
import { UserContext } from "../context/UserContext.jsx";


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Aquí puedes hacer una llamada a la API para obtener los permisos del usuario
    const fetchUser = async () => {
      const response = await fetchInstance.get({
        endpoint: '/auth/me',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include'
      })
      console.log(response)
      const data = await response.json();
      console.log(data)
      if (!response.ok ) {
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

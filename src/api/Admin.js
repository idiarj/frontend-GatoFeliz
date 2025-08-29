import { fetchInstance } from "../utils/Fetch";

export const getProfiles = async () => {
  try {
    const response = await fetchInstance.get({
        endpoint: "/admin/profiles",
        headers: { 'Content-type': 'application/json' },
        credentials: 'include'
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching profiles:", error);
    throw error;
  }
};


export const getUsers = async () => {
  try {
    const response = await fetchInstance.get({
        endpoint: "/admin/users",
        headers: { 'Content-type': 'application/json' },
        credentials: 'include'
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};



export const assignProfiles = async ({id_perfil, id_usuario}) => {
  try {
    const response = await fetchInstance.post({
      endpoint: "/admin/assign-profile",
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
      body: { id_perfil, id_usuario }
    });
    return await response.json();
  } catch (error) {
    console.error("Error assigning profile:", error);
    throw error;
  }
}
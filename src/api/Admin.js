import { fetchInstance } from "../utils/Fetch.js";

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

export const manageProfilePermissions = async (payload) =>{
  try {
    const response = await fetchInstance.post({
      endpoint: "/admin/manage-permissions",
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
      body: payload
    });
    return await response.json();
  } catch (error) {
    console.error("Error managing profile:", error);
    throw error;
  }
}


export const checkIfProfileHasPermission = (permissions, profileId, permission) => {
  if (!profileId) return false;
  const profilePermissions = permissions.filter(p => p.id_perfil === profileId);
  console.log("Profile Permissions:", profilePermissions);
  profilePermissions.forEach(p => console.log(`Permission ${permission} for profile ${profileId}:`, p.permissions[permission]));
  return profilePermissions.some(p => p.permissions[permission] === true);
}

// const permissions = [
//         {
//             "id_perfil": 1,
//             "perfil": "Administrador",
//             "permissions": {
//                 "Panel Medico": true,
//                 "Administracion": true
//             }
//         },
//         {
//             "id_perfil": 2,
//             "perfil": "Veterinario",
//             "permissions": {
//                 "Panel Medico": true,
//                 "Administracion": true
//             }
//         },
//         {
//             "id_perfil": 3,
//             "perfil": "Usuario",
//             "permissions": {
//                 "Panel Medico": false,
//                 "Administracion": false
//             }
//         }
//     ];

//     const profileId = 3; // ID del perfil a verificar
//     const permissionToCheck = "Administracion"; // Permiso a verificar

//     const hasPermission = checkIfProfileHasPermission(permissions, profileId, permissionToCheck);
//     console.log(`El perfil con ID ${profileId} tiene el permiso '${permissionToCheck}': ${hasPermission}`);
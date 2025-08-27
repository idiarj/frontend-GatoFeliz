import React, { useEffect, useState } from "react";
import { getUsers, getProfiles } from "../../../../../api/Admin";
import "./rol.css";

const ROLES = ["Usuario", "Veterinario", "adminVeterinario", "Admin"];

const initialUsers = [
  { name: "Yajaira", role: "Usuario" },
  { name: "David", role: "Usuario" },
  { name: "Elena", role: "Usuario" },
  { name: "Carlos", role: "Usuario" },
    { name: "Marta", role: "Usuario" },
    { name: "Luis", role: "Usuario" }

];

export default function RolAdmin() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [profiles, setProfiles] = useState([]);

  const handleRoleChange = (index, newRole) => {
    const updated = [...users];
    updated[index].role = newRole;
    setUsers(updated);
  };

  useEffect(() => {
    const usersData = async () => {
      const usersData = await getUsers();
      setUsers(usersData.data);
    };
    const profileData = async () => {
      const profileData = await getProfiles();
      setProfiles(profileData.data);
    };
    usersData();
    profileData();
  }, []);

  const handleSave = () => {
    // Aquí iría la lógica para guardar los cambios en el backend
    alert("Cambios guardados");
  };

  const filteredUsers = users.filter(u =>
    u.nom_usuario.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="rol-back" onClick={() => window.history.back()}>
        <span style={{ color: '#ff8c2b', fontSize: '2rem', fontWeight: 'bold', cursor: 'pointer' }}>&larr; Volver</span>
      </div>
      <div className="rol-admin-container">
        <div className="rol-header">
          <h2>Administrar roles</h2>
        </div>
        <div className="rol-content">
          <input
            className="rol-search"
            type="text"
            placeholder="Buscar usuario"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="rol-users-list">
            {filteredUsers.length === 0 ? (
              <div className="rol-no-users">No se encontraron usuarios</div>
            ) : (
              filteredUsers.map((user, idx) => (
                <div className="rol-user-row" key={user.nom_usuario}>
                  <span className="rol-user-name">{user.nom_usuario}</span>
                  <select
                    className="rol-select"
                    value={user.des_perfil}
                    onChange={e => handleRoleChange(idx, e.target.value)}
                  >
                    {profiles.map(role => (
                      <option key={role.id_perfil} value={role.id_perfil}>{role.perfil}</option>
                    ))}
                  </select>
                </div>
              ))
            )}
          </div>
          <button className="rol-save-btn" onClick={handleSave}>
            Guardar cambios
          </button>
        </div>
      </div>
    </>
  );
}

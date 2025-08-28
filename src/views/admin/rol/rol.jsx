import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, getProfiles } from "../../../api/Admin";
import "./rol.css";

const ROLES = ["Usuario", "Veterinario", "adminVeterinario", "Admin"];

// const initialUsers = [
//   { name: "Yajaira", role: "Usuario" },
//   { name: "David", role: "Usuario" },
//   { name: "Elena", role: "Usuario" },
//   { name: "Carlos", role: "Usuario" },
//     { name: "Marta", role: "Usuario" },
//     { name: "Luis", role: "Usuario" }

// ];


export default function RolAdmin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const usersData = async () => {
      const usersData = await getUsers();
      setUsers(Array.isArray(usersData.data) ? usersData.data : []);
    };
    const profileData = async () => {
      const profileData = await getProfiles();
      setProfiles(profileData.data);
    };
    usersData();
    profileData();
  }, []);

  const filteredUsers = users.filter(u =>
    typeof u.nom_usuario === "string" && u.nom_usuario.toLowerCase().includes(search.toLowerCase())
  );

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setSelectedRole(user.id_perfil || "");
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSave = async () => {
    if (!selectedUser || !selectedRole) return;
    setLoading(true);
    // Aquí deberías llamar a tu API para actualizar el rol del usuario
    // await updateUserRole(selectedUser.id_usuario, selectedRole);
    setLoading(false);
    alert("Rol actualizado para " + selectedUser.nom_usuario);
    setSelectedUser(null);
    setSelectedRole("");
    setSearch("");
  };

  return (
    <>
      <div className="rol-back" onClick={() => navigate('/administration')}>
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
              filteredUsers.map((user) => (
                <div className="rol-user-row" key={user.nom_usuario}>
                  <span className="rol-user-name">{user.nom_usuario}</span>
                  <button className="rol-select-btn" onClick={() => handleUserSelect(user)}>
                    Seleccionar
                  </button>
                </div>
              ))
            )}
          </div>
          {selectedUser && (
            <div className="rol-selected-user">
              <span className="rol-user-name">{selectedUser.nom_usuario}</span>
              <select
                className="rol-select"
                value={selectedRole}
                onChange={handleRoleChange}
              >
                {selectedRole === "" && (
                  <option value="" disabled hidden>Seleccione un rol</option>
                )}
                {ROLES.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              <button className="rol-save-btn" onClick={handleSave} disabled={loading || !selectedRole}>
                {loading ? "Guardando..." : "Guardar rol"}
              </button>
              <button className="rol-cancel-btn" onClick={() => setSelectedUser(null)}>
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

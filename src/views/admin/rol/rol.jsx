import { useEffect, useState } from "react";
import { assignProfiles } from "../../../api/Admin";
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
      console.log(usersData);
      setUsers(usersData.data);
    };
    const profileData = async () => {
      const profileData = await getProfiles();
      setProfiles(profileData.data);
    };
    usersData();
    profileData();
  }, []);

const filteredUsers = users.filter(u =>
  typeof u.nom_usuario === "string" &&
  u.nom_usuario.toLowerCase().includes(search.toLowerCase())
);

const handleUserSelect = (user) => {
  setSelectedUser(user);
  setSelectedRole(user.id_perfil != null ? user.id_perfil : null);
};

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSave = async () => {
    if (!selectedUser || !selectedRole) return;
    console.log("Guardando rol", selectedRole, "para usuario", selectedUser);
    console.log(typeof selectedRole);
    let selectedProfile = typeof selectedRole === "string" ? parseInt(selectedRole) : selectedRole;
    console.log(typeof selectedProfile);

    setLoading(true);
    const data = await assignProfiles({ id_perfil: selectedProfile, id_usuario: selectedUser.id_usuario });
    console.log(data);
    if(!data.success){
      alert(data.errorMsg);
    }
    setUsers(users.map(u => u.id_usuario === selectedUser.id_usuario ? { ...u, id_perfil: selectedProfile } : u));
    setLoading(false);
    // alert("Rol actualizado para " + selectedUser.nom_usuario);
    setSelectedUser(null);
    setSelectedRole("");
    setSearch("");
  };

  return (
    <>
      <div className="permision-back" onClick={() => navigate('/administration')}>
        <span className="permision-back-arrow">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign: 'middle'}}>
            <path d="M20 6L10 16L20 26" stroke="#F47C2C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        <span className="permision-back-text">Volver</span>
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
                <div className="rol-user-row" key={user.id_usuario}>
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
                {profiles.map((p) => (
                  <option key={p.id_perfil} value={p.id_perfil}>
                    {p.perfil}
                  </option>
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

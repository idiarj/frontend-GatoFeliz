import React, { useState } from "react";
import "./test.css";

const ROLES = ["Usuario", "Veterinario", "adminVeterinario", "Admin"];
const PERMISOS = [
  "Panel Médico",
  "Panel Adopciones",
  "Panel Administrativo"
];
const initialUsers = [
  { name: "Carlos", role: "Usuario", permisos: ["Panel Adopciones"] },
  { name: "Marta", role: "Usuario", permisos: [] },
  { name: "Luis", role: "Usuario", permisos: [] }
];

export default function RolesPermisos() {
  const [users] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [role, setRole] = useState(ROLES[0]);
  const [permisos, setPermisos] = useState([]);

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setRole(user.role);
    setPermisos(user.permisos);
  };

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setRole(newRole);
    // Asignar permisos por defecto según el rol
    if (newRole === "Usuario") {
      setPermisos(["Panel Adopciones"]);
    } else if (newRole === "Veterinario") {
      setPermisos(["Panel Médico", "Panel Adopciones"]);
    } else if (newRole === "Admin" || newRole === "adminVeterinario") {
      setPermisos([...PERMISOS]);
    } else {
      setPermisos([]);
    }
  };

  const handlePermisoChange = (permiso) => {
    setPermisos(prev =>
      prev.includes(permiso)
        ? prev.filter(p => p !== permiso)
        : [...prev, permiso]
    );
  };

  const handleReset = () => {
    if (selectedUser) {
      setRole(selectedUser.role);
      setPermisos(selectedUser.permisos);
    }
  };

  const handleSave = () => {
    alert("Cambios guardados para " + (selectedUser ? selectedUser.name : "ningún usuario"));
    // Aquí iría la lógica para guardar los cambios en el backend
  };

  return (
    <div className="roles-permisos-root">
      <div className="roles-permisos-back" onClick={() => window.history.back()}>
        <span style={{ color: '#f57c1a', fontSize: '2rem', fontWeight: 'bold', cursor: 'pointer' , marginTop: '-32px'}}>&larr; Volver</span>
      </div>
      <div className="roles-permisos-container">
        <h2 className="roles-permisos-title">Administrar roles y permisos</h2>
        <input
          className="roles-permisos-search"
          type="text"
          placeholder="Buscar usuario"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="roles-permisos-users-list">
          {filteredUsers.map(user => (
            <div
              key={user.name}
              className={`roles-permisos-user-row${selectedUser && selectedUser.name === user.name ? ' selected' : ''}`}
              onClick={() => handleUserSelect(user)}
            >
              {user.name}
            </div>
          ))}
        </div>
        {selectedUser && (
          <>
            <label className="roles-permisos-label" style={{marginTop: '18px'}}>Roles asignados</label>
            <select
              className="roles-permisos-select"
              value={role}
              onChange={handleRoleChange}
            >
              {ROLES.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <label className="roles-permisos-label" style={{marginTop: '18px'}}>Permisos</label>
            <div className="roles-permisos-checkboxes">
              {PERMISOS.map(permiso => (
                <label key={permiso} className="roles-permisos-checkbox-label">
                  <input
                    type="checkbox"
                    checked={permisos.includes(permiso)}
                    onChange={() => handlePermisoChange(permiso)}
                  />
                  {permiso}
                </label>
              ))}
            </div>
            <div className="roles-permisos-actions">
              <button className="roles-permisos-reset" onClick={handleReset}>Restablecer</button>
              <button className="roles-permisos-save" onClick={handleSave}>Guardar cambios</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

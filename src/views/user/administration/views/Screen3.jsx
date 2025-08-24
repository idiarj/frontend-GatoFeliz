import './Screen3.css';

import React, { useState } from 'react';

const rolesData = [
  { id: 1, nombre: 'Usuario', permisos: ['Panel Adopciones'] },
  { id: 2, nombre: 'Administrador', permisos: ['Panel Médico', 'Panel Administrativo', 'Panel Adopciones'] },
  { id: 3, nombre: 'Veterinario', permisos: ['Panel Médico'] },
  { id: 4, nombre: 'Super Veterinario', permisos: ['Panel Médico', 'Panel Administrativo', 'Panel Adopciones'] }
];
const permisosDisponibles = [
  'Panel Médico',
  'Panel Administrativo',
  'Panel Adopciones'
];

const Screen3 = () => {
  const [roles, setRoles] = useState(rolesData);
  const [selectedPermisoRole, setSelectedPermisoRole] = useState(rolesData[0].id);

  const handlePermisoToggle = (permiso) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.id === selectedPermisoRole
          ? {
              ...role,
              permisos: role.permisos.includes(permiso)
                ? role.permisos.filter((p) => p !== permiso)
                : [...role.permisos, permiso]
            }
          : role
      )
    );
  };

  return (
    <section className="permisos-panel">
      <h2>Administrar permisos a roles</h2>
      <div className="roles-asignados">
        <label htmlFor="roles-asignados">Selecciona un rol</label>
        <select
          id="roles-asignados"
          value={selectedPermisoRole}
          onChange={e => setSelectedPermisoRole(Number(e.target.value))}
        >
          {roles.map(role => (
            <option key={role.id} value={role.id}>{role.nombre}</option>
          ))}
        </select>
      </div>
      <div className="permisos-list">
        <span>Permisos</span>
        <div className="permisos-grid">
          {permisosDisponibles.map((permiso) => (
            <label key={permiso} className="permiso-label">
              <input
                type="checkbox"
                checked={roles.find((r) => r.id === selectedPermisoRole).permisos.includes(permiso)}
                onChange={() => handlePermisoToggle(permiso)}
              />
              {permiso}
            </label>
          ))}
        </div>
      </div>
      <div className="roles-buttons">
        <button className="btn-restablecer">Restablecer</button>
        <button className="btn-guardar">Guardar cambios</button>
      </div>
    </section>
  );
};

export default Screen3;

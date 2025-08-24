import './Screen2.css';

import React, { useState } from 'react';

const rolesData = [
  { id: 1, nombre: 'Usuario' },
  { id: 2, nombre: 'Administrador' },
  { id: 3, nombre: 'Veterinario' },
  { id: 4, nombre: 'Super Veterinario' }
];
const usuarios = [
  { id: 1, nombre: 'Yajaira' },
  { id: 2, nombre: 'David' },
  { id: 3, nombre: 'Elena' },
  { id: 4, nombre: 'Javier' }
];

const Screen2 = () => {
  const [searchUser, setSearchUser] = useState('');
  const [userRoles, setUserRoles] = useState(
    usuarios.reduce((acc, user) => {
      acc[user.id] = 1;
      return acc;
    }, {})
  );

  const handleUserRoleChange = (userId, roleId) => {
    setUserRoles((prev) => ({ ...prev, [userId]: Number(roleId) }));
  };

  return (
    <section className="roles-panel">
      <h2>Administrar roles</h2>
      <div className="buscar-usuario">
        <label htmlFor="buscar-usuario">Buscar usuario</label>
        <input
          id="buscar-usuario"
          type="text"
          placeholder="Buscar usuario"
          className="search-user"
          value={searchUser}
          onChange={e => setSearchUser(e.target.value)}
        />
      </div>
      <div className="usuarios-list">
        <label>Usuarios</label>
        <ul>
          {usuarios.filter(u => u.nombre.toLowerCase().includes(searchUser.toLowerCase())).length === 0 ? (
            <li className="usuario-item usuario-no-encontrado" style={{color: '#E85C1A', fontWeight: '600', fontSize: '1.1rem', padding: '1rem 0'}}>
              No se encontró ese usuario
            </li>
          ) : (
            usuarios
              .filter(u => u.nombre.toLowerCase().includes(searchUser.toLowerCase()))
              .map(user => (
                <li key={user.id} className="usuario-item">
                  {user.nombre}
                  <select
                    value={userRoles[user.id]}
                    onChange={e => handleUserRoleChange(user.id, e.target.value)}
                  >
                    {rolesData.map(role => (
                      <option key={role.id} value={role.id}>{role.nombre}</option>
                    ))}
                  </select>
                </li>
              ))
          )}
        </ul>
      </div>
      <div className="roles-buttons" style={{marginTop: '1.5rem'}}>
        <button className="btn-guardar">Guardar cambios</button>
      </div>
    </section>
  );
};

export default Screen2;

import './Screen4.css';

const Screen4 = () => {
  return (
    <section className="ejemplo-panel">
      <h2>Otro ejemplo</h2>
      <section className="roles-permisos">
        <h2>Administrar roles y permisos</h2>
        <div className="buscar-usuario">
          <label htmlFor="buscar-usuario">Buscar usuario</label>
          <input id="buscar-usuario" type="text" placeholder="Buscar usuario" className="search-user" />
        </div>
        <div className="roles-asignados">
          <label htmlFor="roles-asignados">Roles asignados</label>
          <select id="roles-asignados">
            <option>Usuario</option>
            <option>Administrador</option>
            <option>Veterinario</option>
            <option>Super Veterinario</option>
          </select>
        </div>
        <div className="permisos-list">
          <span>Permisos</span>
          <div className="permisos-grid">
            <label className="permiso-label">
              <input type="checkbox" />Panel Médico
            </label>
            <label className="permiso-label">
              <input type="checkbox" />Panel Administrativo
            </label>
            <label className="permiso-label">
              <input type="checkbox" />Panel Adopciones
            </label>
          </div>
        </div>
        <div className="roles-buttons">
          <button className="btn-restablecer">Restablecer</button>
          <button className="btn-guardar">Guardar cambios</button>
        </div>
      </section>
    </section>
  );
};

export default Screen4;

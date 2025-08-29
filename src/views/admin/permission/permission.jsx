import React, { useState } from "react";
// import { getProfiles } from "../../../../../api/Admin";
import "./permission.css";

const roles = [
  { value: "usuario", label: "Usuario" },
  { value: "veterinario", label: "Veterinario" },
  { value: "adminveterinario", label: "Admin Veterinario" },
  { value: "admin", label: "Admin" },
];

const permisos = [
  { value: "medico", label: "Panel Médico" },
  { value: "administrativo", label: "Panel Administrativo" },
];

const Permision = () => {

  const [rol, setRol] = useState("");
  const [selectedPermisos, setSelectedPermisos] = useState([]);

  // Permisos automáticos por rol
  const getPermisosPorRol = (rol) => {
    switch (rol) {
      case "admin":
        return permisos.map((p) => p.value);
      case "adminveterinario":
        return permisos.map((p) => p.value);
      case "veterinario":
        return ["medico", "adopciones"];
      case "usuario":
        return ["adopciones"];
      default:
        return [];
    }
  };

  // Actualizar permisos al cambiar el rol
  const handleRolChange = (newRol) => {
    setRol(newRol);
    setSelectedPermisos(getPermisosPorRol(newRol));
  };

  const handlePermisoChange = (permiso) => {
    setSelectedPermisos((prev) =>
      prev.includes(permiso)
        ? prev.filter((p) => p !== permiso)
        : [...prev, permiso]
    );
  };

  const handleReset = () => {
    setRol(roles[0].value);
    setSelectedPermisos(getPermisosPorRol(roles[0].value));
  };

  const handleSave = () => {
    alert(`Guardado para rol: ${rol}, permisos: ${selectedPermisos.join(", ")}`);
  };

  return (
    
      <div className="permision-root">
        <div className="permision-back" onClick={() => window.history.back()}>
          <span className="permision-back-arrow">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign: 'middle'}}>
              <path d="M20 6L10 16L20 26" stroke="#F47C2C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className="permision-back-text">Volver</span>
        </div>
        <div className="permision-card">
          <h2 className="permision-title">Administrar permisos a roles</h2>
          <div className="permision-form">
            <select
              id="rol-select"
              className="permision-select"
              value={rol}
              onChange={(e) => handleRolChange(e.target.value)}
            >
              <option value="" disabled hidden>Seleccione un rol</option>
              {roles.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
            <div className="permision-permisos">
              <span className="permision-label">Permisos</span>
              <div className="permision-permisos-list">
                {permisos.map((p) => (
                  <label key={p.value} className="permision-checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedPermisos.includes(p.value)}
                      onChange={() => handlePermisoChange(p.value)}
                    />
                    <span>{p.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="permision-actions">
              <button className="permision-btn reset" type="button" onClick={handleReset}>Restablecer</button>
              <button className="permision-btn save" type="button" onClick={handleSave}>Guardar cambios</button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Permision;

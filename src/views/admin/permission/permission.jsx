import React, { useEffect, useMemo, useState } from "react";
import { usePermissions } from "../../../hooks/usePermissions";
import { useLoaderData } from "react-router-dom";
import { manageProfilePermissions } from "../../../api/Admin";
import "./permission.css";

/** ============================
 *  Mocks de API (reemplazar)
 *  ============================ */
async function getProfilesWithPermissions() {
  // Debe devolver: { success: true, data: RawProfile[] }
  // RawProfile = { id_perfil:number, perfil:string, permissions: Record<string, boolean> }
  return {
    success: true,
    data: [
      {
        id_perfil: 1,
        perfil: "Administrador",
        permissions: { "Panel Medico": true, Administracion: true },
      },
      {
        id_perfil: 2,
        perfil: "Veterinario",
        permissions: { "Panel Medico": true, Administracion: false },
      },
      {
        id_perfil: 3,
        perfil: "Usuario",
        permissions: { "Panel Medico": false, Administracion: false },
      },
    ],
  };
}

// Tu backend espera { id_perfil, permissions }
async function patchProfilePermissions(payload /* { id_perfil:number, permissions:Record<string,boolean> } */) {
  console.log("PATCH /profiles/permissions", payload);
  // Simula éxito
  return { success: true, message: "Permisos actualizados" };
}

/** ============================
 *  Utilidades
 *  ============================ */

// Construye el mapa completo de permisos según todas las claves (true/false)
function buildPermissionMap(allKeys, currentState) {
  const out = {};
  for (const key of allKeys) out[key] = Boolean(currentState?.[key]);
  return out;
}

// Compara si el estado actual difiere del baseline (normalizados por allKeys)
function isDifferent(allKeys, baselineMap, currentMap) {
  for (const key of allKeys) {
    const before = Boolean(baselineMap?.[key]);
    const after = Boolean(currentMap?.[key]);
    if (before !== after) return true;
  }
  return false;
}

const Permision = () => {
  const data = useLoaderData();
  console.log("Profiles from loader:", data.data);
  // Datos crudos del backend
  const [profiles, setProfiles] = useState([]); // [{id_perfil, perfil, permissions:{...}}]
  // Baseline (lo que trae el backend por perfil): { [id_perfil]: Record<permKey, boolean> }
  const [baselines, setBaselines] = useState({});
  // Perfil seleccionado (id como string para el <select>)
  const [selectedProfileId, setSelectedProfileId] = useState("");
  // Estado editable actual de permisos (Record<permKey, boolean>)
  const [permState, setPermState] = useState({});

  // Cargando / Guardando
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Une todas las claves de permisos presentes en todos los perfiles (columnas consistentes)
  const allPermKeys = useMemo(() => {
    const keys = new Set();
    for (const p of profiles) {
      for (const k of Object.keys(p.permissions || {})) keys.add(k);
    }
    return Array.from(keys).sort((a, b) => a.localeCompare(b, "es"));
  }, [profiles]);

  // Carga inicial: perfiles + baselines + seleccionar primero
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = data;
        const profilesData = res?.data ?? [];
        setProfiles(profilesData);

        // Guarda baseline por perfil
        const base = {};
        profilesData.forEach((p) => {
          base[p.id_perfil] = { ...(p.permissions || {}) };
        });
        setBaselines(base);

        // Seleccionar el primero por defecto (si existe)
        if (profilesData.length > 0) {
          const firstId = String(profilesData[0].id_perfil);
          setSelectedProfileId(firstId);
          // PermState inicial normalizado con claves disponibles del primer render
          const normalized = buildPermissionMap(
            Array.from(
              new Set(
                profilesData.flatMap((pr) => Object.keys(pr.permissions || {}))
              )
            ),
            profilesData[0].permissions || {}
          );
          setPermState(normalized);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [data]);

  // Cuando cambie el perfil o cambien las claves globales, normaliza permState con su baseline
  useEffect(() => {
    if (!selectedProfileId || allPermKeys.length === 0) return;
    const base = baselines[Number(selectedProfileId)] || {};
    const normalized = buildPermissionMap(allPermKeys, base);
    setPermState(normalized);
  }, [selectedProfileId, allPermKeys, baselines]);

  // Cambiar perfil en el select
  const handleRolChange = (newId) => {
    setSelectedProfileId(newId);
    // (permState se normaliza en el useEffect de arriba)
  };

  // Toggle de un permiso
  const handlePermisoChange = (permKey) => {
    setPermState((prev) => ({ ...prev, [permKey]: !prev?.[permKey] }));
  };

  // Restablecer = volver al baseline del perfil seleccionado (normalizado por allPermKeys)
  const handleReset = () => {
    if (!selectedProfileId) return;
    const base = baselines[Number(selectedProfileId)] || {};
    const normalized = buildPermissionMap(allPermKeys, base);
    setPermState(normalized);
  };

  // Guardar = enviar exactamente { id_perfil, permissions }
  const handleSave = async () => {
    if (!selectedProfileId) return;
    setSaving(true);
    try {
      const payload = {
        id_perfil: Number(selectedProfileId),
        permissions: buildPermissionMap(allPermKeys, permState), // manda todas las claves true/false
      };

      console.log("Saving permissions payload:", payload);

      const res = await manageProfilePermissions(payload);
      console.log("Save permissions response:", res);
      if (res?.success) {
        // Actualiza baseline con lo que quedó en backend (el payload que mandamos)
        setBaselines((prev) => ({
          ...prev,
          [payload.id_perfil]: { ...payload.permissions },
        }));
        alert("Permisos guardados correctamente");
      } else {
        alert("No se pudo guardar");
      }
    } catch (e) {
      console.error(e);
      alert("Error guardando permisos");
    } finally {
      setSaving(false);
    }
  };

  // Dirty state: deshabilita Guardar si no hay cambios vs baseline
  const dirty = useMemo(() => {
    const base = baselines[Number(selectedProfileId)] || {};
    return isDifferent(allPermKeys, base, permState);
  }, [allPermKeys, baselines, permState, selectedProfileId]);

  // === Mantengo tu estructura y clases CSS ===
  return (
    <div className="permision-root">
      <div className="permision-back" onClick={() => window.history.back()}>
        <span className="permision-back-arrow">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ verticalAlign: "middle" }}
          >
            <path
              d="M20 6L10 16L20 26"
              stroke="#F47C2C"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="permision-back-text">Volver</span>
      </div>

      <div className="permision-card">
        <h2 className="permision-title">Administrar permisos a roles</h2>

        <div className="permision-form">
          {/* Select de perfiles desde backend */}
          <select
            id="rol-select"
            className="permision-select"
            value={selectedProfileId}
            onChange={(e) => handleRolChange(e.target.value)}
            disabled={loading}
          >
            <option value="" disabled hidden>
              {loading ? "Cargando roles..." : "Seleccione un rol"}
            </option>
            {profiles.map((p) => (
              <option key={p.id_perfil} value={p.id_perfil}>
                {p.perfil}
              </option>
            ))}
          </select>

          {/* Permisos (unión de claves) */}
          <div className="permision-permisos">
            <span className="permision-label">Permisos</span>
            <div className="permision-permisos-list">
              {allPermKeys.length === 0 && (
                <span style={{ opacity: 0.7 }}>
                  {loading ? "Cargando permisos..." : "Sin permisos definidos"}
                </span>
              )}
              {allPermKeys.map((key) => (
                <label key={key} className="permision-checkbox-label">
                  <input
                    type="checkbox"
                    checked={Boolean(permState?.[key])}
                    onChange={() => handlePermisoChange(key)}
                    disabled={!selectedProfileId || loading}
                  />
                  <span>{key}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="permision-actions">
            <button
              className="permision-btn reset"
              type="button"
              onClick={handleReset}
              disabled={!selectedProfileId || loading}
            >
              Restablecer
            </button>
            <button
              className="permision-btn save"
              type="button"
              onClick={handleSave}
              disabled={!selectedProfileId || saving || loading || !dirty}
              title={!dirty ? "No hay cambios por guardar" : undefined}
            >
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Permision;

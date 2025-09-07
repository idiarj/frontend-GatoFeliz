import React, { useState, useEffect, useRef } from "react";
import "./medicalCaseForm.css";

const today = new Date().toISOString().slice(0, 10);

const initialForm = {
  historiaClinica: "",
  fechaAdmision: today,
  horaAdmision: "",
  nombrePaciente: "",
  propietario: "",
  veterinario: "",
  direccion: "",
  telefono: "",
  ciudad: "",
  especie: "",
  sexo: "",
  edad: "",
  color: "",
  motivo: "",
  historia: "",
  dieta: "",
  vacunacion: false,
  desparasitacion: false,
  productos: "",
  fechas: "",
  estadoReproductivo: "",
  procedencia: "",
  constantes: {
    peso: "",
    temperatura: "",
    fCar: "",
    fRes: "",
    tllc: "",
    mucosas: "",
    turgencia: "",
    pulso: "",
    otras: ""
  },
  anamnesis: "",
  enfermedadesPrevias: "",
  firmaEncargado: "",
  firmaPropietario: ""
};

const pruebaGatos = [
  { id_animal: 101, nom_animal: "Michi" },
  { id_animal: 102, nom_animal: "Pelusa" },
  { id_animal: 103, nom_animal: "Bigotes" }
];

const MedicalCaseForm = ({ selectedCase, onSave, medicalCases = [], onClose, veterinarios, gatos }) => {
  // Si no pasan onClose, el modal se controla internamente
  const [internalOpen, setInternalOpen] = useState(true);
  console.log(medicalCases)
  // Ref para enfocar el modal y manejar Escape
  const modalRef = useRef(null);

    // Mapeo de campos del formulario a los nombres de la tabla
    const mapFormToDb = (form) => ({
      des_caso: form.historiaClinica,
      id_usuario: form.veterinario || null,
      id_animal: (gatos && Array.isArray(gatos) && form.nombrePaciente)
        ? (gatos.find(g => g.nom_animal === form.nombrePaciente)?.id_animal || null)
        : (pruebaGatos.find(g => g.nom_animal === form.nombrePaciente)?.id_animal || null),
      id_caso_est: selectedCase?.id_caso_est || 1,
      nom_dueno_caso: form.propietario,
      tlf_dueno_caso: form.telefono,
      nom_animal_caso: form.nombrePaciente,
      sexo_animal_caso: form.sexo,
      especie_animal_caso: form.especie,
      edad_animal_caso: form.edad,
      senas_caso: form.color,
      motivo_caso: form.motivo,
      historia_caso: form.historia,
      dieta_caso: form.dieta,
      vacunacion_caso: form.vacunacion,
      desp_caso: form.desparasitacion,
      prod_caso: form.productos,
      fechas_caso: form.fechas,
      estado_repr: form.estadoReproductivo,
      proc_caso: form.procedencia,
      peso_animal_caso: form.constantes.peso,
      temperatura_animal_caso: form.constantes.temperatura,
      fcar_animal_caso: form.constantes.fCar,
      fres_animal_caso: form.constantes.fRes,
      tllc_animal_caso: form.constantes.tllc,
      mucosas_animal_caso: form.constantes.mucosas,
      turg_piel_animal_caso: form.constantes.turgencia,
      pulso_animal_caso: form.constantes.pulso,
      otras_animal_caso: form.constantes.otras,
      anamnesis_caso: form.anamnesis,
      enfer_ante_animal_caso: form.enfermedadesPrevias,
      hora_agregado_caso: form.horaAdmision,
      fecha_agregado_caso: form.fechaAdmision,
      id_kennel: form.kennel || 1,
      direccion_dueno: form.direccion,
      ciudad_dueno: form.ciudad,
    });

  const closeModal = () => {
    setInternalOpen(false);
    if (onClose) onClose();
  };

  useEffect(() => {
    // Enfocar modal al montar
    if (modalRef.current) {
      modalRef.current.focus();
    }
    // Cerrar con Escape
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [form, setForm] = useState(initialForm);
  const [esFundacion, setEsFundacion] = useState(false);

  // Si no hay onClose y ya se cerró internamente, no renderizar
  // (Move this check after all hooks)
  
  const getNextHistoriaClinica = () => {
    if (!medicalCases.length) return "002";
    const last = medicalCases.reduce((max, c) => {
      const num = parseInt(c.historiaClinica, 10);
      return num > max ? num : max;
    }, 0);
    return String(last + 1).padStart(3, "0");
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Solo actualiza el formulario cuando selectedCase cambia
  useEffect(() => {
    if (selectedCase) {
      setForm(selectedCase);
    }
  }, [selectedCase]);

  // Inicializa el formulario solo una vez al montar si no hay selectedCase
  useEffect(() => {
    if (!selectedCase) {
      setForm({
        ...initialForm,
        historiaClinica: getNextHistoriaClinica(),
        fechaAdmision: today,
        horaAdmision: getCurrentTime(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!internalOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "esFundacion") {
      setEsFundacion(checked);
      if (!checked) {
        setForm((prev) => ({ ...prev, nombrePaciente: "" }));
      }
      return;
    }
    if (name === "telefono") {
      // Permitir solo números y máximo 11 dígitos
      const soloNumeros = value.replace(/\D/g, "").slice(0, 11);
      setForm((prev) => ({ ...prev, telefono: soloNumeros }));
      return;
    }
    if (name.startsWith("constantes.")) {
      setForm((prev) => ({
        ...prev,
        constantes: {
          ...prev.constantes,
          [name.split(".")[1]]: value
        }
      }));
    } else if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  const dbData = mapFormToDb(form);
  console.log("Guardando caso:", dbData);
  onSave(dbData);
  };

  return (
    <div
      className="medical-modal-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.35)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto',
        padding: '12px'
      }}
      tabIndex={-1}
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      onClick={e => {
        if (e.target.classList.contains('medical-modal-overlay')) closeModal();
      }}
    >
      <form
        className="medical-case-form medical-case-form--compact"
        onSubmit={handleSubmit}
        style={{
          maxWidth: '820px',
          minWidth: '680px',
          maxHeight: '85vh',
          overflowY: 'auto',
          margin: '0 auto',
          padding: '20px 16px',
          borderRadius: '12px',
          boxShadow: '0 4px 32px #0002',
          background: '#fff',
          position: 'relative',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Sección 1: Encabezado */}
        <div className="section-table">
          {/* Checkbox gato de la fundación */}
          <div className="form-row" style={{ marginBottom: '12px' }}>
            <label>
              <input
                type="checkbox"
                name="esFundacion"
                checked={esFundacion}
                onChange={handleChange}
                style={{ marginRight: '8px' }}
              />
              El gato es de la fundación
            </label>
          </div>
    <div className="form-row" style={{ display: 'flex', gap: '24px', paddingRight: '16px' }}>
            <div style={{ flex: 1 }}>
              <label>N° Historia clínica:</label>
              <input className="modern-input" name="historiaClinica" value={medicalCases[0].id + 1} type="text" readOnly />
            </div>
            <div style={{ flex: 1 }}>
              <label>Fecha admisión:</label>
              <input className="modern-input" name="fechaAdmision" value={form.fechaAdmision} type="date" readOnly />
            </div>
            <div style={{ flex: 1 }}>
              <label>Hora:</label>
              <input className="modern-input" name="horaAdmision" value={form.horaAdmision} type="text" readOnly />
            </div>
          </div>
          <div className="form-row" style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
            <div style={{ flex: 1 }}>
              <label>Propietario:</label>
              <input className="modern-input" name="propietario" value={form.propietario} onChange={handleChange} />
            </div>
            <div style={{ flex: 1 }}>
              <label>Nombre del paciente:</label>
              {esFundacion ? (
                <select
                  className="modern-input"
                  name="nombrePaciente"
                  value={form.nombrePaciente}
                  onChange={handleChange}
                >
                  {!form.nombrePaciente && (
                    <option value="" disabled hidden>Selecciona un gato</option>
                  )}
                  {gatos.map(g => (
                    <option key={g.id_animal} value={g.nom_animal}>
                      {g.nom_animal}
                    </option>
                  ))}
                </select>
              ) : (
                <input className="modern-input" name="nombrePaciente" value={form.nombrePaciente} onChange={handleChange} />
              )}
            </div>
            <div style={{ flex: 1 }}>
              <label>Veterinario encargado:</label>
              <select
                className="modern-input"
                name="veterinario"
                value={form.veterinario}
                onChange={handleChange}
              >
                {!form.veterinario && (
                  <option value="" disabled hidden>Selecciona un veterinario</option>
                )}
                {veterinarios.map(v => (
                  <option key={v.id_usuario} value={v.id_usuario}>{`Dr. ${v.veterinario}`}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-row" style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
            <div style={{ flex: 1 }}>
              <label>Dirección:</label>
              <input className="modern-input" name="direccion" value={form.direccion} onChange={handleChange} />
            </div>
            <div style={{ flex: 1 }}>
              <label>Teléfono:</label>
              <input 
                className="modern-input" 
                name="telefono" 
                value={form.telefono} 
                onChange={handleChange} 
                type="tel" 
                pattern="[0-9]*" 
                maxLength={11} 
                inputMode="numeric" 
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Ciudad:</label>
              <input className="modern-input" name="ciudad" value={form.ciudad} onChange={handleChange} />
            </div>
          </div>
          <div className="form-row" style={{display: 'flex', gap: '24px', marginTop: '16px'}}>
            <div style={{flex: 1}}>
              <label>Especie:</label>
              <input className="modern-input" name="especie" value={form.especie} onChange={handleChange} />
            </div>
            {/* Raza eliminado */}
            <div style={{flex: 1}}>
              <label>Sexo:</label>
              <input className="modern-input" name="sexo" value={form.sexo} onChange={handleChange} />
            </div>
            <div style={{flex: 1}}>
              <label>Edad:</label>
              <input className="modern-input" name="edad" value={form.edad} onChange={handleChange} />
            </div>
          </div>
          <div className="form-row" style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
            <div style={{ flex: 1 }}>
              <label>Color y señas particulares:</label>
              <input className="modern-input" name="color" value={form.color} onChange={handleChange} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 0 , marginLeft: '10px' }}>
                <input
                  type="checkbox"
                  name="kennelFundacion"
                  checked={form.kennelFundacion || false}
                  onChange={e => setForm(prev => ({ ...prev, kennelFundacion: e.target.checked }))}
                  style={{ marginRight: '8px' }}
                />
                <span style={{ whiteSpace: 'nowrap' }}>Es kennel de fundación</span>
              </label>
              <input
                className="modern-input"
                name="kennel"
                value={form.kennel || ''}
                onChange={handleChange}
                type="text"
                placeholder={form.kennelFundacion ? "N° fundación" : "N° propietario"}
                style={{ width: '350px', marginTop: '0px', marginLeft: '20px' }}
              />
            </div>
          </div>
        </div>

        {/* Sección 2: Motivo consulta */}
        <div className="section-table">
          <div className="section-title">2. Motivo consulta</div>
          <div className="form-row" style={{ display: 'flex', gap: '24px' }}>
            <div style={{ flex: 1 }}>
              <input className="modern-input" name="motivo" value={form.motivo} onChange={handleChange} placeholder="Motivo consulta" />
            </div>
          </div>
        </div>

        {/* Sección 3 y 4: Historia y Dieta */}
        <div className="section-table">
          <div className="form-row" style={{ display: 'flex', gap: '24px' }}>
            <div style={{ flex: 1 }}>
              <label>3. Historia:</label>
              <input className="modern-input" name="historia" value={form.historia} onChange={handleChange} />
            </div>
            <div style={{ flex: 1 }}>
              <label>4. Dieta:</label>
              <input className="modern-input" name="dieta" value={form.dieta} onChange={handleChange} />
            </div>
          </div>
          <div className="form-row" style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
            <div style={{ flex: 1 }}>
              <label>Vacunación:</label>
              <input type="checkbox" name="vacunacion" checked={form.vacunacion} onChange={handleChange} />
            </div>
            <div style={{ flex: 1 }}>
              <label>Desparasitaciones:</label>
              <input type="checkbox" name="desparasitacion" checked={form.desparasitacion} onChange={handleChange} />
            </div>
          </div>
          <div className="form-row" style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
            <div style={{ flex: 1 }}>
              <label>Productos:</label>
              <input className="modern-input" name="productos" value={form.productos} onChange={handleChange} />
            </div>
            <div style={{ flex: 1 }}>
              <label>Fechas:</label>
              <input className="modern-input" name="fechas" value={form.fechas} onChange={handleChange} />
            </div>
            <div style={{ flex: 1 }}>
              <label>Estado reproductivo:</label>
              <input className="modern-input" name="estadoReproductivo" value={form.estadoReproductivo} onChange={handleChange} />
            </div>
            <div style={{ flex: 1 }}>
              <label>Procedencia:</label>
              <input className="modern-input" name="procedencia" value={form.procedencia} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Sección 6: Constantes fisiológicas */}
        <div className="section-table">
          <div className="section-title">6. Constantes fisiológicas</div>
          <div className="constantes-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
            <div style={{ flex: '1 1 120px', marginLeft: '8px', marginRight: '8px' }}>
              <label>Peso</label>
              <input className="modern-input" name="constantes.peso" value={form.constantes.peso} onChange={handleChange} />
            </div>
            <div style={{ flex: '1 1 120px' }}>
              <label>T°</label>
              <input className="modern-input" name="constantes.temperatura" value={form.constantes.temperatura} onChange={handleChange} />
            </div>
            <div style={{ flex: '1 1 120px' }}>
              <label>F. Car.</label>
              <input className="modern-input" name="constantes.fCar" value={form.constantes.fCar} onChange={handleChange} />
            </div>
            <div style={{ flex: '1 1 120px' }}>
              <label>F. Res.</label>
              <input className="modern-input" name="constantes.fRes" value={form.constantes.fRes} onChange={handleChange} />
            </div>
            <div style={{ flex: '1 1 120px' }}>
              <label>T. LL. C</label>
              <input className="modern-input" name="constantes.tllc" value={form.constantes.tllc} onChange={handleChange} />
            </div>
            <div style={{ flex: '1 1 120px' }}>
              <label>Mucosas</label>
              <input className="modern-input" name="constantes.mucosas" value={form.constantes.mucosas} onChange={handleChange} />
            </div>
            <div style={{ flex: '1 1 120px' }}>
              <label>Turgencia piel</label>
              <input className="modern-input" name="constantes.turgencia" value={form.constantes.turgencia} onChange={handleChange} style={{ width: '120px' }} />
            </div>
            <div style={{ flex: '1 1 120px' }}>
              <label>Pulso</label>
              <input className="modern-input" name="constantes.pulso" value={form.constantes.pulso} onChange={handleChange} />
            </div>
            <div style={{ flex: '1 1 120px' }}>
              <label>Otras</label>
              <input className="modern-input" name="constantes.otras" value={form.constantes.otras} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Sección 7: Anamnesis */}
        <div className="section-table">
          <div className="section-title">7. Anamnesis</div>
          <div className="form-row" style={{ display: 'flex', gap: '24px' }}>
            <div style={{ flex: 1 }}>
              <input className="modern-input" name="anamnesis" value={form.anamnesis} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Sección 8: Enfermedades o procedimientos anteriores */}
        <div className="section-table">
          <div className="section-title">8. Enfermedades o procedimientos anteriores</div>
          <div className="form-row" style={{ display: 'flex', gap: '24px' }}>
            <div style={{ flex: 1 }}>
              <input className="modern-input" name="enfermedadesPrevias" value={form.enfermedadesPrevias} onChange={handleChange}/>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="medical-case-form-btn"
          style={{
            marginTop: '24px',
            width: '100%',
            padding: '14px',
            fontSize: '1.05rem',
            background: '#fb7d00ff',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 2px 8px #0002'
          }}
        >
          {selectedCase ? "Guardar cambios" : "Agregar nuevo caso"}
        </button>
      </form>
    </div>
  );
};


// Método para visualizar la información de un caso (solo visualización)
export function VisualizeCaseInfo({caseData}) {
  console.log("Visualizando caso:", caseData);
  let caso = caseData.__db || caseData;
  console.log("Datos originales del caso:", caso);
  if (!caso) return <div>No hay datos para mostrar.</div>;
  return (
    <div className="medical-case-visualization">
      <h2>Historia Clínica #{caso.id_caso}</h2>
      {/* Fecha, hora y propietario */}
      <div className="mc-row">
        <div><strong>Fecha admisión:</strong> {caso.fecha_agregado_caso}</div>
        <div><strong>Hora:</strong> {caso.hora_agregado_caso}</div>
        <div><strong>Propietario:</strong> {caso.nom_dueno_caso}</div>
      </div>
      {/* Nombre paciente y veterinario */}
      <div className="mc-row">
        <div><strong>Nombre del paciente:</strong> {caso.nom_animal_caso}</div>
        {/* Si tienes veterinario en la base de datos, usa el campo correspondiente */}
        <div><strong>Veterinario encargado:</strong> {caso.veterinario || ''}</div>
      </div>
      {/* Dirección, teléfono y ciudad */}
      <div className="mc-row">
        <div><strong>Dirección:</strong> {caso.direccion_dueno || ''}</div>
        <div><strong>Teléfono:</strong> {caso.tlf_dueno_caso}</div>
        <div><strong>Ciudad:</strong> {caso.ciudad_dueno || ''}</div>
      </div>
      {/* Especie, sexo y edad (raza eliminado) */}
      <div className="mc-row">
        <div><strong>Especie:</strong> {caso.especie_animal_caso}</div>
        <div><strong>Sexo:</strong> {caso.sexo_animal_caso}</div>
        <div><strong>Edad:</strong> {caso.edad_animal_caso}</div>
      </div>
      {/* Color y Kennel */}
      <div className="mc-row">
        <div><strong>Color y señas particulares:</strong> {caso.senas_caso}</div>
        <div><strong>N° Kennel:</strong> {caso.id_kennel}</div>
      </div>
      {/* Motivo consulta */}
      <div className="mc-section">
        <span className="mc-section-title">Motivo consulta:</span> {caso.motivo_caso}
      </div>
      {/* Historia */}
      <div className="mc-section">
        <span className="mc-section-title">Historia:</span> {caso.historia_caso}
      </div>
      {/* Dieta, vacunación y desparasitante */}
      <div className="mc-row">
        <div><strong>Dieta:</strong> {caso.dieta_caso}</div>
        <div><strong>Vacunación:</strong> {caso.vacunacion_caso ? 'Sí' : 'No'}</div>
        <div><strong>Desparasitaciones:</strong> {caso.desp_caso ? 'Sí' : 'No'}</div>
      </div>
      {/* Productos */}
      <div className="mc-section">
        <span className="mc-section-title">Productos:</span> {caso.prod_caso}</div>
      {/* Fechas */}
      <div className="mc-section">
        <span className="mc-section-title">Fechas:</span> {caso.fechas_caso}</div>
      {/* Estado reproductivo y procedencia */}
      <div className="mc-row">
        <div><strong>Estado reproductivo:</strong> {caso.estado_repr}</div>
        <div><strong>Procedencia:</strong> {caso.proc_caso}</div>
      </div>
      {/* Constantes fisiológicas */}
      <div className="mc-section">
        <span className="mc-section-title">Constantes fisiológicas:</span>
        <ul>
          <li>Peso: {caso.peso_animal_caso}</li>
          <li>Temperatura: {caso.temperatura_animal_caso}</li>
          <li>F. Car.: {caso.fcar_animal_caso}</li>
          <li>F. Res.: {caso.fres_animal_caso}</li>
          <li>T. LL. C: {caso.tllc_animal_caso}</li>
          <li>Mucosas: {caso.mucosas_animal_caso}</li>
          <li>Turgencia piel: {caso.turg_piel_animal_caso}</li>
          <li>Pulso: {caso.pulso_animal_caso}</li>
          <li>Otras: {caso.otras_animal_caso}</li>
        </ul>
      </div>
      <div className="mc-section">
        <span className="mc-section-title">Anamnesis:</span> {caso.anamnesis_caso}</div>
      <div className="mc-section">
        <span className="mc-section-title">Enfermedades o procedimientos anteriores:</span> {caso.enfer_ante_animal_caso}</div>
      <div className="mc-firmas">
        <div><strong>Firma encargado:</strong> {caso.veterinario || ''}</div>
        <div><strong>Firma propietario:</strong> {caso.nom_dueno_caso || ''}</div>
      </div>
    </div>
  );
}

export default MedicalCaseForm;


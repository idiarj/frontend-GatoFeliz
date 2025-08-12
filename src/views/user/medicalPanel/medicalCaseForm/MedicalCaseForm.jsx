import React, { useState, useEffect } from "react";
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
  raza: "",
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

const MedicalCaseForm = ({ selectedCase, onSave, medicalCases = [] }) => {
  const getNextHistoriaClinica = () => {
    if (!medicalCases.length) return "001";
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

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (selectedCase) {
      setForm(selectedCase);
    } else {
      setForm({
        ...initialForm,
        historiaClinica: getNextHistoriaClinica(),
        fechaAdmision: today,
        horaAdmision: getCurrentTime(),
      });
    }
  }, [selectedCase, medicalCases]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
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
    onSave(form);
  };

  return (
    <form className="medical-case-form" onSubmit={handleSubmit}>
      {/* Sección 1: Encabezado */}
      <div className="section-table">
        <div className="form-row">
          <div>
            <label>N° Historia clínica:</label>
            <input name="historiaClinica" value={form.historiaClinica} onChange={handleChange} />
          </div>
          <div>
            <label>Fecha admisión:</label>
            <input name="fechaAdmision" value={form.fechaAdmision} onChange={handleChange} type="date" />
          </div>
          <div>
            <label>Hora:</label>
            <input name="horaAdmision" value={form.horaAdmision} onChange={handleChange} />
          </div>
          <div>
            <label>Nombre del paciente:</label>
            <input name="nombrePaciente" value={form.nombrePaciente} onChange={handleChange} />
          </div>
        </div>
        <div className="form-row">
          <div>
            <label>Propietario:</label>
            <input name="propietario" value={form.propietario} onChange={handleChange} />
          </div>
          <div>
            <label>Veterinario encargado:</label>
            <input name="veterinario" value={form.veterinario} onChange={handleChange} />
          </div>
        </div>
        <div className="form-row">
          <div>
            <label>Dirección:</label>
            <input name="direccion" value={form.direccion} onChange={handleChange} />
          </div>
          <div>
            <label>Teléfono:</label>
            <input name="telefono" value={form.telefono} onChange={handleChange} />
          </div>
          <div>
            <label>Ciudad:</label>
            <input name="ciudad" value={form.ciudad} onChange={handleChange} />
          </div>
        </div>
        <div className="form-row" style={{display: 'flex', gap: '12px'}}>
          <div style={{flex: 1}}>
            <label>Especie:</label>
            <input name="especie" value={form.especie} onChange={handleChange} />
          </div>
          <div style={{flex: 1}}>
            <label>Raza:</label>
            <input name="raza" value={form.raza} onChange={handleChange} />
          </div>
          <div style={{flex: 1}}>
            <label>Sexo:</label>
            <input name="sexo" value={form.sexo} onChange={handleChange} />
          </div>
          <div style={{flex: 1}}>
            <label>Edad:</label>
            <input name="edad" value={form.edad} onChange={handleChange} />
          </div>
        </div>
        <div className="form-row">
          <div>
            <label>Color y señas particulares:</label>
            <input name="color" value={form.color} onChange={handleChange} />
          </div>
        </div>
      </div>
      {/* Sección 2: Motivo consulta */}
      <div className="section-table">
        <div className="section-title">2. Motivo consulta</div>
        <div className="form-row">
          <div>
            <input name="motivo" value={form.motivo} onChange={handleChange} placeholder="Motivo consulta" />
          </div>
        </div>
      </div>
      {/* Sección 3 y 4: Historia y Dieta */}
      <div className="section-table">
        <div className="form-row">
          <div>
            <label>3. Historia:</label>
            <input name="historia" value={form.historia} onChange={handleChange} />
          </div>
          <div>
            <label>4. Dieta:</label>
            <input name="dieta" value={form.dieta} onChange={handleChange} />
          </div>
        </div>
        <div className="form-row">
          <div>
            <label>Vacunación:</label>
            <input type="checkbox" name="vacunacion" checked={form.vacunacion} onChange={handleChange} />
          </div>
          <div>
            <label>Desparasitaciones:</label>
            <input type="checkbox" name="desparasitacion" checked={form.desparasitacion} onChange={handleChange} />
          </div>
        </div>
        <div className="form-row">
          <div>
            <label>Productos:</label>
            <input name="productos" value={form.productos} onChange={handleChange} />
          </div>
          <div>
            <label>Fechas:</label>
            <input name="fechas" value={form.fechas} onChange={handleChange} />
          </div>
          <div>
            <label>Estado reproductivo:</label>
            <input name="estadoReproductivo" value={form.estadoReproductivo} onChange={handleChange} />
          </div>
          <div>
            <label>Procedencia:</label>
            <input name="procedencia" value={form.procedencia} onChange={handleChange} />
          </div>
        </div>
      </div>
      {/* Sección 6: Constantes fisiológicas */}
      <div className="section-table">
        <div className="section-title">6. Constantes fisiológicas</div>
        <div className="constantes-row">
          <div>
            <label>Peso</label>
            <input name="constantes.peso" value={form.constantes.peso} onChange={handleChange} />
          </div>
          <div>
            <label>T°</label>
            <input name="constantes.temperatura" value={form.constantes.temperatura} onChange={handleChange} />
          </div>
          <div>
            <label>F. Car.</label>
            <input name="constantes.fCar" value={form.constantes.fCar} onChange={handleChange} />
          </div>
          <div>
            <label>F. Res.</label>
            <input name="constantes.fRes" value={form.constantes.fRes} onChange={handleChange} />
          </div>
          <div>
            <label>T. LL. C</label>
            <input name="constantes.tllc" value={form.constantes.tllc} onChange={handleChange} />
          </div>
          <div>
            <label>Mucosas</label>
            <input name="constantes.mucosas" value={form.constantes.mucosas} onChange={handleChange} />
          </div>
          <div>
            <label>Turgencia piel</label>
            <input name="constantes.turgencia" value={form.constantes.turgencia} onChange={handleChange} />
          </div>
          <div>
            <label>Pulso</label>
            <input name="constantes.pulso" value={form.constantes.pulso} onChange={handleChange} />
          </div>
          <div>
            <label>Otras</label>
            <input name="constantes.otras" value={form.constantes.otras} onChange={handleChange} />
          </div>
        </div>
      </div>
      {/* Sección 7: Anamnesis */}
      <div className="section-table">
        <div className="section-title">7. Anamnesis</div>
        <div className="form-row">
          <div>
            <input name="anamnesis" value={form.anamnesis} onChange={handleChange} placeholder="Anamnesis" />
          </div>
        </div>
      </div>
      {/* Sección 8: Enfermedades o procedimientos anteriores */}
      <div className="section-table">
        <div className="section-title">8. Enfermedades o procedimientos (tto) anteriores</div>
        <div className="form-row">
          <div>
            <input name="enfermedadesPrevias" value={form.enfermedadesPrevias} onChange={handleChange} placeholder="Enfermedades o procedimientos previos" />
          </div>
        </div>
      </div>
      {/* Firmas */}
      <div className="firmas-row">
        <div>
          <label>Firma Encargado:</label>
          <input name="firmaEncargado" value={form.firmaEncargado} onChange={handleChange} />
        </div>
        <div>
          <label>Firma Propietario:</label>
          <input name="firmaPropietario" value={form.firmaPropietario} onChange={handleChange} />
        </div>
      </div>
      <button type="submit" className="medical-case-form-btn">
        {selectedCase ? "Guardar cambios" : "Agregar nuevo caso"}
      </button>
    </form>
  );
};

export default MedicalCaseForm;

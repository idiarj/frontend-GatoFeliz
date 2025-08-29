import React, { useState } from 'react';
import { visualizeCaseInfo } from '../../../components/medicalCaseForm/MedicalCaseForm';
import MedicalCaseForm from '../../../components/medicalCaseForm/MedicalCaseForm';
import MedicalPanelModal from './medicalpanelmodal/MedicalPanelModal';
import './medicalPanel.css';

const TOTAL_KENNELS = 50;

// JSON de prueba
const initialCases = [
  {
    id: 1,
    motivo: 'Herida en pata trasera',
    kennelNumber: 12,
    tratamiento: 'Antibiótico y limpieza diaria',
    insumos: 'Gasas, antibiótico, guantes',
    estado: 'En tratamiento',
    date: '2025-08-29T10:00:00',
    nombreGato: 'Michi',
    edadGato: '2 años',
    razaGato: 'Tabby',
    sexoGato: 'Macho',
    nombreDueno: 'Juan Pérez',
    telefonoDueno: '+58 412-1234567',
    historia: 'El gato fue encontrado con una herida profunda en la pata trasera. Se inició tratamiento antibiótico y limpieza diaria.'
  },
  {
    id: 2,
    motivo: 'Chequeo anual',
    kennelNumber: null,
    tratamiento: 'Vacunación y desparasitación',
    insumos: 'Vacunas, desparasitante',
    estado: 'Finalizado',
    date: '2025-08-28T09:00:00',
    nombreGato: 'Pelusa',
    edadGato: '3 años',
    razaGato: 'Siames',
    sexoGato: 'Hembra',
    nombreDueno: 'María Gómez',
    telefonoDueno: '+58 414-9876543',
    historia: 'Chequeo anual realizado, todo en orden. Se aplicaron vacunas y desparasitante.'
  },
  {
    id: 3,
    motivo: 'Problema respiratorio',
    kennelNumber: 5,
    tratamiento: 'Nebulización y control',
    insumos: 'Nebulizador, solución salina',
    estado: 'En observación',
    date: '2025-08-27T15:30:00',
    nombreGato: 'Nube',
    edadGato: '1 año',
    razaGato: 'Persa',
    sexoGato: 'Hembra',
    nombreDueno: 'Carlos Ruiz',
    telefonoDueno: '+58 424-5556677',
    historia: 'El gato presenta dificultad respiratoria, se realiza nebulización y se mantiene en observación.'
  }
];

function MedicalPanel() {
  // Data de prueba con todos los campos rellenos
  const fullCaseData = {
    historiaClinica: '001',
    fechaAdmision: '2025-08-29',
    horaAdmision: '10:00',
    nombrePaciente: 'Michi',
    propietario: 'Juan Pérez',
    veterinario: 'Dra. Felina',
    direccion: 'Calle Gato Feliz 123',
    telefono: '+58 412-1234567',
    ciudad: 'Caracas',
    especie: 'Felino',
    raza: 'Tabby',
    sexo: 'Macho',
    edad: '2 años',
    color: 'Gris con rayas',
    kennel: '12',
    motivo: 'Herida en pata trasera',
    historia: 'El gato fue encontrado con una herida profunda en la pata trasera. Se inició tratamiento antibiótico y limpieza diaria.',
    dieta: 'Alimento seco y húmedo',
    vacunacion: true,
    desparasitacion: true,
    productos: 'Gasas, antibiótico, guantes',
    fechas: '2025-08-29',
    estadoReproductivo: 'Entero',
    procedencia: 'Rescatado',
    constantes: {
      peso: '4.2kg',
      temperatura: '38.5°C',
      fCar: '120',
      fRes: '30',
      tllc: '2s',
      mucosas: 'Rosadas',
      turgencia: 'Normal',
      pulso: 'Fuerte',
      otras: 'Sin observaciones'
    },
    anamnesis: 'No antecedentes relevantes.',
    enfermedadesPrevias: 'Ninguna',
    firmaEncargado: 'Dra. Felina',
    firmaPropietario: 'Juan Pérez'
  };

  
  const [cases, setCases] = useState(initialCases);
  const [showForm, setShowForm] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [showFullForm, setShowFullForm] = useState(false);

  // Permite acceso global para CaseDetailEditor
  if (typeof window !== 'undefined') {
    window.setShowFullForm = setShowFullForm;
  }

  const kennelsUsed = cases.filter(c => c.kennelNumber).length;
  const kennelsAvailable = TOTAL_KENNELS - kennelsUsed;

  // Agrega un nuevo caso
  const handleAddCase = (newCase) => {
    setCases(prev => [{
      ...newCase,
      id: prev.length + 1,
      date: new Date().toISOString(),
    }, ...prev]);
    setShowForm(false);
  };

  // Ordena casos por id descendente (el más alto primero)
  const sortedCases = [...cases].sort((a, b) => b.id - a.id);

  return (
    <div className="medical-panel">
      <header className="medical-panel-header">
        <h2> Panel de registro médico </h2>
        <div className="medical-panel-header-row" style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'24px',marginBottom:'16px'}}>
          <div className="medical-panel-summary" style={{display:'flex',gap:'32px', marginRight: '150px'}}>
            <div>Jaulas totales: <span>{TOTAL_KENNELS}</span></div>
            <div>Jaulas disponibles: <span>{kennelsAvailable}</span></div>
            <div>Número de casos: <span>{cases.length}</span></div>
          </div>
          <button className="create-case-btn" onClick={() => setShowForm(true)}>
            Crear historia clínica
          </button>
        </div>
      </header>
      <section className="medical-panel-cases">
        {sortedCases.length === 0 ? (
          <div className="no-cases">No hay casos registrados.</div>
        ) : (
          <ul className="cases-list">
            {sortedCases.map((c) => (
              <li key={c.id} className="case-card" onClick={() => setSelectedCase(c)}>
                <div><strong>#{c.id}</strong> - {c.motivo}</div>
                <div>Kennel: {c.kennelNumber || 'Sin asignar'}</div>
                <div>Estado: {c.estado}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
      {showForm && (
        <MedicalPanelModal onClose={() => setShowForm(false)}>
          <MedicalCaseForm onSubmit={handleAddCase} />
        </MedicalPanelModal>
      )}
      {selectedCase && (
        <MedicalPanelModal onClose={() => { setSelectedCase(null); setShowFullForm(false); }}>
          {showFullForm
            ? visualizeCaseInfo(fullCaseData)
            : <CaseDetailEditor
                caseData={selectedCase}
                onClose={() => setSelectedCase(null)}
                onSave={(updatedCase) => {
                  setCases(prev => prev.map(c => c.id === updatedCase.id ? updatedCase : c));
                  setSelectedCase(null);
                }}
              />
          }
        </MedicalPanelModal>
      )}
    </div>
  );
}

// Nuevo componente para editar el caso
function CaseDetailEditor({ caseData, onClose, onSave }) {
  const [estado, setEstado] = useState(caseData.estado || '');
  const [tratamiento, setTratamiento] = useState(caseData.tratamiento || '');
  const [insumos, setInsumos] = useState(caseData.insumos || '');
  const [editMode, setEditMode] = useState(false);

  const handleSave = () => {
    onSave({ ...caseData, estado, tratamiento, insumos });
  };

  return (
    <div className="case-detail">
      <h3>Historia Clínica #{caseData.id}</h3>
      <div><strong>Motivo:</strong> {caseData.motivo}</div>
      <div><strong>Kennel:</strong> {caseData.kennelNumber || 'Sin asignar'}</div>
      <hr style={{margin: '16px 0'}} />
      <div className="case-detail-gato-owner">
        <div>
          <strong>Datos del gato:</strong><br/>
          Nombre: {caseData.nombreGato}<br/>
          Edad: {caseData.edadGato}<br/>
          Raza: {caseData.razaGato}<br/>
          Sexo: {caseData.sexoGato}
        </div>
        <div>
          <strong>Datos del dueño:</strong><br/>
          Nombre: {caseData.nombreDueno || 'No registrado'}<br/>
          Teléfono: {caseData.telefonoDueno || 'No registrado'}
        </div>
      </div>
      <hr style={{margin: '16px 0'}} />
  <div><strong>Historia médica:</strong></div>
  <div className="case-detail-historia">{caseData.historia}</div>
      <hr style={{margin: '16px 0'}} />
        {editMode ? (
          <>
            <div>
              <label>Estado:&nbsp;
                <select value={estado} onChange={e => setEstado(e.target.value)}>
                  <option value="En tratamiento">En tratamiento</option>
                  <option value="Sano">Sano</option>
                  <option value="Finalizado">Finalizado</option>
                  <option value="En observación">En observación</option>
                </select>
              </label>
            </div>
            <div>
              <label>Tratamiento:&nbsp;
                <input type="text" value={tratamiento} onChange={e => setTratamiento(e.target.value)} />
              </label>
            </div>
            <div>
              <label>Insumos requeridos:&nbsp;
                <input type="text" value={insumos} onChange={e => setInsumos(e.target.value)} />
              </label>
            </div>
            <div style={{marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div>
                <button className="create-case-btn" onClick={handleSave}>Guardar cambios</button>
                <button className="create-case-btn" style={{background:'#888',marginLeft:'8px'}} onClick={() => setEditMode(false)}>Cancelar</button>
              </div>
              <button className="create-case-btn" style={{marginLeft:'8px', display: 'flex'}} onClick={() => setShowFullForm(true)}>
                Mostrar formulario completo
              </button>
            </div>
          </>
        ) : (
          <>
            <div><strong>Estado:</strong> {estado}</div>
            <div><strong>Tratamiento:</strong> {tratamiento}</div>
            <div><strong>Insumos requeridos:</strong> {insumos}</div>
            <div style={{marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div>
                <button className="create-case-btn" onClick={() => setEditMode(true)}>Editar</button>
                <button className="create-case-btn" style={{background:'#888',marginLeft:'8px'}} onClick={onClose}>Cerrar</button>
              </div>
              <button className="create-case-btn" style={{marginLeft:'8px', display: 'flex'}} onClick={() => setShowFullForm(true)}>
                Mostrar formulario completo
              </button>
            </div>
          </>
        )}
    </div>
  );
}

export default MedicalPanel;
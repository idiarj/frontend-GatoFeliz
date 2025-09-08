import React, { useMemo, useState } from 'react';
import { VisualizeCaseInfo } from '../../../components/medicalCaseForm/MedicalCaseForm';
import { createMedicalRecord, updateMedicalRecord } from '../../../api/Medical.js';
import { useLoaderData } from 'react-router-dom';
import MedicalCaseForm from '../../../components/medicalCaseForm/MedicalCaseForm';
import MedicalPanelModal from './medicalpanelmodal/MedicalPanelModal';
import './medicalPanel.css';

/* =========================================
   Mapeo de estados (id ↔ etiqueta)
   ========================================= */
const CASE_STATUS_LABEL = {
  1: 'En tratamiento',
  2: 'Sano',
  3: 'Finalizado',
  4: 'En observación',
};
const CASE_STATUS_ID = {
  'En tratamiento': 1,
  'Sano': 2,
  'Finalizado': 3,
  'En observación': 4,
};

/* =========================================
   Adaptador BD → UI (sin cambiar tus clases)
   ========================================= */
// (Eliminado: función mapDbCaseToUI no utilizada en el ámbito global)

/* =========================================
   Editor inline
   ========================================= */
function CaseDetailEditor({ caseData, onClose, onSave }) {
  const [editMode, setEditMode] = useState(false);
  const [estado, setEstado] = useState(caseData.estado || 'En tratamiento');
  const [tratamiento, setTratamiento] = useState(caseData.tratamiento || '');
  const [insumos, setInsumos] = useState(caseData.insumos || '');
  console.log('Editing case:', caseData); 
  console.log('Current estado:', CASE_STATUS_ID[estado]);
  console.log('Current tratamiento:', tratamiento);
  console.log('Current insumos:', insumos);

  const handleSave = () => {
    const updated = {
      ...caseData,
      estado,
      tratamiento,
      insumos,
      id_caso_est: CASE_STATUS_ID[estado] ?? caseData.__db?.id_caso_est,
    };
    onSave(caseData.id, {
      newEstado: CASE_STATUS_ID[estado],
      newTratamiento: tratamiento,
      newInsumos: insumos,
    });
    setEditMode(false);
  };

  return (
    <div className="case-detail">
      <h3>Historia Clínica #{caseData.id}</h3>
      <div><strong>Motivo:</strong> {caseData.motivo}</div>
      <div><strong>Kennel:</strong> {caseData.kennelNumber || 'Sin asignar'}</div>
      <hr style={{ margin: '16px 0' }} />
      <div className="case-detail-gato-owner">
        <div>
          <strong>Datos del gato:</strong><br />
          Nombre: {caseData.nombreGato}<br />
          Edad: {caseData.edadGato}<br />
          Sexo: {caseData.sexoGato}
        </div>
        <div>
          <strong>Datos del dueño:</strong><br />
          Nombre: {caseData.nombreDueno || 'No registrado'}<br />
          Teléfono: {caseData.telefonoDueno || 'No registrado'}
        </div>
      </div>
      <hr style={{ margin: '16px 0' }} />
      <div><strong>Historia médica:</strong></div>
      <div className="case-detail-historia">{caseData.historia}</div>
      <hr style={{ margin: '16px 0' }} />

      {editMode ? (
        <>
          <div>
            <label>Estado:&nbsp;
              <select value={estado} onChange={e => setEstado(e.target.value)}>
                <option>En tratamiento</option>
                <option>Sano</option>
                <option>Finalizado</option>
                <option>En observación</option>
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
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <button className="create-case-btn" onClick={handleSave}>Guardar cambios</button>
              <button className="create-case-btn" style={{ background: '#888', marginLeft: '8px' }} onClick={() => setEditMode(false)}>Cancelar</button>
            </div>
            <button className="create-case-btn" style={{ marginLeft: '8px', display: 'flex' }} onClick={() => window.setShowFullForm?.(true)}>
              Mostrar formulario completo
            </button>
          </div>
        </>
      ) : (
        <>
          <div><strong>Estado:</strong> {estado}</div>
          <div><strong>Tratamiento:</strong> {tratamiento}</div>
          <div><strong>Insumos requeridos:</strong> {insumos}</div>
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <button className="create-case-btn" onClick={() => setEditMode(true)}>Editar</button>
              <button className="create-case-btn" style={{ background: '#888', marginLeft: '8px' }} onClick={onClose}>Cerrar</button>
            </div>
            <button className="create-case-btn" style={{ marginLeft: '8px', display: 'flex' }} onClick={() => window.setShowFullForm?.(true)}>
              Mostrar formulario completo
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* =========================================
   PANEL
   ========================================= */
function MedicalPanel() {
  // Trae datos del loader
  const loaderData = useLoaderData() || {};
  console.log('Loader data:', loaderData);
  const { records = [], kennels = [], veterinarians = [], animals = [] } = loaderData;

  // Mapea los registros de BD que vienen del loader
  const [cases, setCases] = useState(() => records.map(mapDbCaseToUI));

  // Total de jaulas desde loader con fallback
  const TOTAL_KENNELS = kennels?.length > 0 ? kennels.length : 50;

  const [showForm, setShowForm] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [showFullForm, setShowFullForm] = useState(false);

  // Exponer toggler para el botón “Mostrar formulario completo”
  if (typeof window !== 'undefined') {
    window.setShowFullForm = setShowFullForm;
  }

  const kennelsUsed = cases.filter(c => c.kennelNumber).length;
  const kennelsAvailable = TOTAL_KENNELS - kennelsUsed;

  // Crear nuevo caso (viene del formulario)
  // Mapea un caso de la BD al formato UI
  function mapDbCaseToUI(db) {
    return {
      id: db.id_caso ?? db.id,
      id_caso: db.id_caso ?? db.id,
      id_animal: db.id_animal,
      id_usuario: db.id_usuario,
      motivo: db.motivo_caso ?? '',
      estado: CASE_STATUS_LABEL[db.id_caso_est] || '—',
      tratamiento: db.des_caso ?? '',
      insumos: db.prod_caso ?? '',
      date: db.date ?? db.fechas_caso ?? null,
      kennelNumber: db.id_kennel ?? null,
      nombreGato: db.nom_animal_caso ?? db.nombrePaciente,
      edadGato: db.edad_animal_caso ?? '—',
      sexoGato: db.sexo_animal_caso ?? '—',
      nombreDueno: db.nom_dueno_caso ?? db.propietario,
      telefonoDueno: db.tlf_dueno_caso ?? db.telefono,
      historia: db.historia_caso ?? '',
      __db: db,
    };
  }

  const handleAddCase = async (newCase) => {
    await createMedicalRecord(newCase);
    const uiCase = mapDbCaseToUI({
      ...newCase,
      id: newCase.id_caso ?? (cases.length ? Math.max(...cases.map(c => c.id)) + 1 : 1),
      date: new Date().toISOString(),
    });
    setCases(prev => [uiCase, ...prev]);
    setShowForm(false);
  };

  // Actualizar caso desde el editor inline
  const handleUpdateCase = async (id, updatedData) => {
    try {
      console.log('Updating case:', updatedData);
      const { data } = await updateMedicalRecord(id, updatedData);
      console.log('Update response data:', data);
      const mapedData = mapDbCaseToUI(data);
      setCases(prev => prev.map(c => c.id === id ? { ...c, id: mapedData.id, ...mapedData } : c));
      setSelectedCase(null);
    } catch (error) {
      console.error("Error updating medical record:", error);
    }
  };

  // Orden por fecha (desc) con fallback al id
  const sortedCases = useMemo(() => {
    const withSort = cases.map(c => ({
      ...c,
      _sortDate: c.date ? new Date(c.date).getTime() : 0,
    }));
    withSort.sort((a, b) => {
      if (b._sortDate !== a._sortDate) return b._sortDate - a._sortDate;
      return (b.id ?? 0) - (a.id ?? 0);
    });
    return withSort;
  }, [cases]);

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
          {/* Pasa info del loader al form por si quieres usar vets/kennels allí */}
          <MedicalCaseForm
            onSave={handleAddCase}
            medicalCases={cases}
            veterinarians={veterinarians}
            kennels={kennels}
            
            onClose={() => setShowForm(false)}
            veterinarios={veterinarians}
            gatos={animals}
          />
        </MedicalPanelModal>
      )}

      {selectedCase && (
        <MedicalPanelModal onClose={() => { setSelectedCase(null); setShowFullForm(false); }}>
          {showFullForm
            ? (
                <VisualizeCaseInfo
                  caseData={selectedCase}
                />
              )
            : (
                <CaseDetailEditor
                  caseData={selectedCase}
                  onClose={() => setSelectedCase(null)}
                  onSave={handleUpdateCase}
                />
              )
          }
        </MedicalPanelModal>
      )}
    </div>
  );
}

export default MedicalPanel;

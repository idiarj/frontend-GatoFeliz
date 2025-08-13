import React from "react";
import "./medicanlPanel.css";
import MedicalPanelPanel from "./medicalPanelPanel/medicalPanelPanel.jsx";
import Modal from "../../../components/modal/Modal.jsx";
import { medicalPanelStats } from "./medicalPanelData";
import MedicalCaseForm from "./medicalCaseForm/MedicalCaseForm.jsx";
import Head from '../../../components/head/head.jsx';
import Menu from '../../../components/menu/menu.jsx';

const MedicalPanel = () => {
  // JSON de prueba para los casos médicos
  const [medicalCases, setMedicalCases] = React.useState([
    {
      historiaClinica: "001",
      kennel: "10",
      historia: "Fractura en pata trasera",
      tratamiento: "Férula",
      insumos: "Yes",
      estado: "En tratamiento",
      aporte: "$2000",
      // ...otros campos del formulario
    },
    {
      historiaClinica: "002",
      historia: "Ingesta de cuerpo extraño",
      kennel: "32",
      tratamiento: "Cirugía",
      insumos: "Yes",
      estado: "En tratamiento",
      aporte: "$1000",
    },
    {
      historiaClinica: "003",
      historia: "Infección respiratoria",
      tratamiento: "Antibióticos",
      insumos: "Yes",
      estado: "Resuelto",
      aporte: "—",
    },
    {
      historiaClinica: "004",
      kennel: "21",
      historia: "Fractura en pata trasera",
      tratamiento: "Férula",
      insumos: "Yes",
      estado: "Pendiente",
      aporte: "$1500",
    },
    {
      historiaClinica: "005",
      historia: "Lesión en el ojo",
      tratamiento: "Medicamentos",
      insumos: "Pendiente",
      estado: "En tratamiento",
      aporte: "$500",
    },
  ]);

  const [selectedCase, setSelectedCase] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleRowClick = (idx) => {
    setSelectedCase([...medicalCases].reverse()[idx]);
    // El modal NO se abre al hacer click en la fila
  };
  const handleAddNew = () => {
    setSelectedCase(null);
    setModalOpen(true);
  };
  const handleSave = (newCase) => {
    setMedicalCases([newCase, ...medicalCases]);
    setSelectedCase(null);
    setModalOpen(false);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCase(null);
  };

  return (
    <>
      <Head title="Panel medico" />
      <div style={{ display: "flex" }}>
        <Menu />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', marginTop: '60px' }}>
          <MedicalPanelPanel 
            medicalPanelStats={medicalPanelStats} 
            medicalCases={medicalCases} 
            handleRowClick={handleRowClick} 
          />
          <button 
            style={{ marginTop: '32px', padding: '12px 32px', fontSize: '1.1rem', background: '#1976d2', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 2px 8px #0002' }}
            onClick={handleAddNew}
          >
            Agregar historia clínica
          </button>
        </div>
      </div>
      {modalOpen && (
        <div style={{ position: 'fixed', left: 0, right: 0, top: '180px', zIndex: 9999 }}>
          <Modal open={modalOpen} onClose={handleCloseModal}>
            <MedicalCaseForm selectedCase={selectedCase} onSave={handleSave} medicalCases={medicalCases} />
          </Modal>
        </div>
      )}
    </>
  );
};

export default MedicalPanel;

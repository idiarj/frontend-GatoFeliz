import React from "react";
import "./medicanlPanel.css";
import MedicalPanelPanel from "./medicalPanelPanel/medicalPanelPanel.jsx";
import { medicalPanelStats } from "./medicalPanelData";
import MedicalCaseForm from "./medicalCaseForm/MedicalCaseForm.jsx";
import Head from '../../../components/head/head.jsx';
import Menu from '../../../components/menu/menu.jsx';

const MedicalPanel = () => {
  // JSON de prueba para los casos médicos
  const [medicalCases, setMedicalCases] = React.useState([
    {
      historiaClinica: "001",
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
  const handleRowClick = (idx) => {
    setSelectedCase([...medicalCases].reverse()[idx]);
  };
  const handleAddNew = () => {
    setSelectedCase(null);
  };
  const handleSave = (newCase) => {
    setMedicalCases([newCase, ...medicalCases]);
    setSelectedCase(null);
  };

  return (
    <>
      <Head title="Panel medico" />
      <div style={{ display: "flex" }}>
        <Menu />
        <MedicalPanelPanel 
          medicalPanelStats={medicalPanelStats} 
          medicalCases={medicalCases} 
          handleRowClick={handleRowClick} 
        />
        <div style={{ flex: 1, padding: '24px', background: '#fff', minWidth: '500px' }}>
          <MedicalCaseForm selectedCase={selectedCase} onSave={handleSave} />
        </div>
      </div>
    </>
  );
};

export default MedicalPanel;

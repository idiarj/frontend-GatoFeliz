import "./medicanlPanel.css";
import { useEffect, useState } from "react";
import { medicalPanelStats } from "./medicalPanelData";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../hooks/useUser.jsx";
import MedicalPanelPanel from "./medicalPanelPanel/medicalPanelPanel.jsx";
import MedicalCaseForm from "./medicalCaseForm/MedicalCaseForm.jsx";
import Head from '../../../components/head/head.jsx';
import Menu from '../../../components/menu/menu.jsx';

const MedicalPanel = () => {
  let testing = import.meta.env.VITE_TESTING === 'true'
  const navigate = useNavigate()
  const { user } = useUser();
  const logical = !user || (user.id_perfil !== 1 && user.id_perfil !== 2)
  console.log(logical)
  console.log('Hay user?', !!user)
  console.log('Estoy testeando?', testing)
  //console.log('El usuario tiene los perfiles adecuados?',(user.id_perfil !== 1 && user.id_perfil !== 2))
  console.log(logical)

useEffect(() => {
  if (
    (!user || (user.id_perfil !== 1 && user.id_perfil !== 2)) &&
    !testing
  ) {
    navigate('/dashboard');
  }
}, [user, testing, navigate]);
  // JSON de prueba para los casos médicos
  const [medicalCases, setMedicalCases] = useState([
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

  const [selectedCase, setSelectedCase] = useState(null);

  const handleRowClick = (idx) => {
    setSelectedCase([...medicalCases].reverse()[idx]);
  };

  // const handleAddNew = () => {
  //   setSelectedCase(null);
  // };

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
        <div style={{ flex: 1, padding: '24px', background: '#fff', marginTop: '120px' }}>
          <MedicalCaseForm selectedCase={selectedCase} onSave={handleSave} medicalCases={medicalCases} />
        </div>
      </div>
    </>
  );
};

export default MedicalPanel;

import "./medicalPanel.css";
import { useEffect, useState } from "react";
import { medicalPanelStats } from "./medicalPanelData";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../hooks/useUser.jsx";
import MedicalCaseForm from "../../../components/medicalCaseForm/MedicalCaseForm.jsx";
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

  const [selectedCase, setSelectedCase] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleRowClick = (idx) => {
    setSelectedCase([...medicalCases].reverse()[idx]);
    // El modal NO se abre al hacer click en la fila
  };

  // const handleAddNew = () => {
  //   setSelectedCase(null);
  // };

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
      {/* <div className="medicalpanel-flex">
      </div> */}
        {/* <div className="medicalpanel-content">
          {/* Panel principal integrado aquí 
        </div> */}
          <div className="medical-panel-container medicalpanel-maincontainer">
            <div className="medical-panel-header">
              <div className="medical-panel-header-box">
                <h2>{medicalPanelStats.cajasTotales}</h2>
                <p>Kennels Totales</p>
              </div>
              <div className="medical-panel-header-box">
                <h2>{medicalPanelStats.cajasDisponibles}</h2>
                <p>Kennels Disponibles</p>
              </div>
              <div className="medical-panel-header-box">
                <h2>{medicalPanelStats.casos}</h2>
                <p>Casos</p>
                {medicalCases.length > 0 && medicalCases[medicalCases.length - 1].kennel && (
                  <p className="medicalpanel-kennelinfo">
                    Kennel: {medicalCases[medicalCases.length - 1].kennel}
                  </p>
                )}
              </div>
            </div>
            <section className="medicalpanel-table-section">
              <div className="medicalpanel-table-wrapper">
                <table className="medical-panel-table">
                  <thead>
                    <tr>
                      <th className="medicalpanel-nowrap">N° Caso</th>
                      <th className="medicalpanel-nowrap">N° Kennel (opcional)</th>
                      <th className="medicalpanel-nowrap">Motivo del Caso</th>
                      <th className="medicalpanel-nowrap">Tratamiento</th>
                      <th className="medicalpanel-nowrap">Insumos Requeridos</th>
                      <th className="medicalpanel-nowrap">Estado del Caso</th>
                      <th className="medicalpanel-nowrap">Aporte Monetario del Familiar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...medicalCases].reverse().map((item, idx, arr) => (
                      <tr key={arr.length - idx - 1} className="medicalpanel-row" onClick={() => handleRowClick(idx)}>
                        <td>{String(arr.length - idx).padStart(3, '0')}</td>
                        <td>{item.kennel ? item.kennel : '-'}</td>
                        <td>{item.historia}</td>
                        <td>{item.tratamiento}</td>
                        <td>{item.insumos}</td>
                        <td>{item.estado}</td>
                        <td>{item.aporte}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
          <button 
            className="medicalpanel-addbtn"
            onClick={handleAddNew}
          >
            Agregar historia clínica
          </button>
      {modalOpen && (
        <div className="medicalpanel-modalbg" onClick={handleCloseModal}>
            <MedicalCaseForm selectedCase={selectedCase} onSave={handleSave} medicalCases={medicalCases} />
        </div>
      )}
    </>
  );
};

export default MedicalPanel;

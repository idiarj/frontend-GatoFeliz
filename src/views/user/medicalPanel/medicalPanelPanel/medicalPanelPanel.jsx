import React from "react";
import "./medicalPanelPanel.css";

const MedicalPanelPanel = ({ medicalPanelStats, medicalCases, handleRowClick }) => (
  <div className="medical-panel-container" style={{ flex: 1, marginLeft: '350px', marginTop: '80px' }}>
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
          <p style={{ fontSize: '1rem', marginTop: '4px', color: '#1976d2' }}>
            Kennel: {medicalCases[medicalCases.length - 1].kennel}
          </p>
        )}
      </div>
    </div>
    <table className="medical-panel-table">
      <thead>
        <tr>
          <th style={{whiteSpace: 'nowrap'}}>N° Caso</th>
          <th style={{whiteSpace: 'nowrap'}}>Kennel (opcional)</th>
          <th style={{whiteSpace: 'nowrap'}}>Motivo del Caso</th>
          <th style={{whiteSpace: 'nowrap'}}>Tratamiento</th>
          <th style={{whiteSpace: 'nowrap'}}>Insumos Requeridos</th>
          <th style={{whiteSpace: 'nowrap'}}>Estado del Caso</th>
          <th style={{whiteSpace: 'nowrap'}}>Aporte Monetario del Familiar</th>
        </tr>
      </thead>
      <tbody>
        {[...medicalCases].reverse().map((item, idx, arr) => (
          <tr key={arr.length - idx - 1} style={{ cursor: 'pointer' }} onClick={() => handleRowClick(idx)}>
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
);

export default MedicalPanelPanel;

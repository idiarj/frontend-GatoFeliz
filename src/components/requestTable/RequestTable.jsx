import React from 'react'

const RequestTable = ({ requests, handleAccept, handleReject, page, totalPages, handlePrev, handleNext, status}) => {
  return (
    <>
        <h2 className="request-title">{status === "pending" ? "Solicitudes Pendientes" : "Historial de Solicitudes"}</h2>
            <table className="request-table">
                <thead>
                    <tr className="request-table-header">
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Gato</th>
                        <th>Tipo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((s, idx) => (
                        <tr key={idx}>
                            <td>{s.nom_usuario}</td>
                            <td className="telefono">{s.tlf_usuario}</td>
                            <td>{s.nom_animal}</td>
                            <td>{s.des_acogida}</td>
                            <td>
                                <button className="request-btn accept" onClick={() => handleAccept(s.id_acogida)}>Aceptar</button>
                                <button className="request-btn reject" onClick={() => handleReject(s.id_acogida)}>Rechazar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        <div className="request-pagination">
            <button onClick={handlePrev} disabled={page === 1}>&lt;</button>
            <span>{page}</span>
            <button onClick={handleNext} disabled={page === totalPages}>&gt;</button>
        </div>
    </>
  )
}

export default RequestTable
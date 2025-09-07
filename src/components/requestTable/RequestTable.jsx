import { MdDeleteOutline } from "react-icons/md";

const RequestTable = ({ requests, handleAccept, handleReject, page, totalPages, handlePrev, handleNext, status, handleDeleteRequest }) => {
    const message = status === "pending" ? "No hay solicitudes pendientes" : "No hay solicitudes en el historial";

  return (
    <>
      <h2 className="request-title">
        {status === "pending" ? "Solicitudes Pendientes" : "Historial de Solicitudes"}
      </h2>

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
          {requests.length > 0 ? (
            requests.map((s, idx) => (
              <tr key={idx}>
                <td>{s.nom_usuario}</td>
                <td className="telefono">{s.tlf_usuario}</td>
                <td>{s.nom_animal}</td>
                <td>{s.des_acogida}</td>
                  <td>
                    {status === "pending" ? (
                      <>
                        <button
                          className="request-btn accept"
                          onClick={() => handleAccept(s.id_acogida)}
                        >
                          Aceptar
                        </button>
                        <button
                          className="request-btn reject"
                          onClick={() => handleReject(s.id_acogida)}
                        >
                          Rechazar
                        </button>
                      </>
                    ) : (
                      // status === "history"
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "6px 16px",
                            borderRadius: "12px",
                            fontWeight: 500,
                            background: s.des_estado === "Aprobada" ? "#eafbe7" : "#ffeaea",
                            color: s.des_estado === "Aprobada" ? "#1e7c2a" : "#c62828",
                            border: s.des_estado === "Aprobada" ? "1px solid #b6e2c6" : "1px solid #f7bcbc"
                          }}
                        >
                          {s.des_estado === "Aprobada" ? "Aceptada" : "Rechazada"}
                        </span>
                          <button
                            className="request-btn delete"
                            title="Eliminar solicitud"
                            onClick={() => {
                              if (window.confirm("¿Seguro que deseas eliminar esta solicitud?")) {
                                if (typeof handleDeleteRequest === "function") {
                                  handleDeleteRequest(s.id_acogida);
                                } else {
                                  alert("Función de eliminar no disponible");
                                }
                              }
                            }}
                            style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 10px' }}
                          >
                            <MdDeleteOutline size={20} style={{ verticalAlign: 'middle' }} />
                            <span style={{ fontSize: '1rem' }}>Eliminar</span>
                          </button>
                      </div>
                    )}
                  </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "10px" }}>
                {message}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="request-pagination">
        <button onClick={handlePrev} disabled={page === 0}>
          &lt;
        </button>
        <span>{page+1}</span>
        <button onClick={handleNext} disabled={page + 1 === totalPages}>
          &gt;
        </button>
      </div>
    </>
  )
}

export default RequestTable

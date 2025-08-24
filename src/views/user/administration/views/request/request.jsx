import React, { useState } from "react";
import "./request.css";

const solicitudesData = [
	{ nombre: "Yajaira", apellido: "Fuenmayor", telefono: "555-123456789", gato: "Milo", tipo: "Adopción" },
	{ nombre: "David", apellido: "Gómez", telefono: "555-987654321", gato: "Luna", tipo: "Apadrinamiento" },
	{ nombre: "Elena", apellido: "Sánchez", telefono: "555-567890123", gato: "Nala", tipo: "Adopción" },
	{ nombre: "Javier", apellido: "Ruiz", telefono: "555-234567890", gato: "Simba", tipo: "Apadrinamiento" },
];

const Request = () => {
	const [page, setPage] = useState(1);
	const rowsPerPage = 4;
	const totalPages = Math.ceil(solicitudesData.length / rowsPerPage);

	const handleAccept = (nombre) => {
		alert(`Solicitud de ${nombre} aceptada`);
	};
	const handleReject = (nombre) => {
		alert(`Solicitud de ${nombre} rechazada`);
	};

	const handlePrev = () => setPage((p) => Math.max(1, p - 1));
	const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

	const solicitudes = solicitudesData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

	return (
			<div className="request-root">
				<div className="request-back" onClick={() => window.history.back()}>
					<span style={{ color: '#ff8c2b', fontSize: '2rem', fontWeight: 'bold', cursor: 'pointer' }}>&larr; Volver</span>
				</div>
				<div className="request-table-container">
					<h2 className="request-title">Solicitudes</h2>
					<table className="request-table">
						<thead>
							<tr className="request-table-header">
								<th>Nombre</th>
								<th>Apellido</th>
								<th>Teléfono</th>
								<th>Gato</th>
								<th>Tipo</th>
								<th>Acciones</th>
							</tr>
						</thead>
						<tbody>
							{solicitudes.map((s, idx) => (
								<tr key={idx}>
									<td>{s.nombre}</td>
									<td>{s.apellido}</td>
									  <td className="telefono">{s.telefono}</td>
									<td>{s.gato}</td>
									<td>{s.tipo}</td>
									<td>
										<button className="request-btn accept" onClick={() => handleAccept(s.nombre)}>Aceptar</button>
										<button className="request-btn reject" onClick={() => handleReject(s.nombre)}>Rechazar</button>
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
				</div>
			</div>
	);
};

export default Request;

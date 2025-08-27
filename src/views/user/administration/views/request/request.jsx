import { useState } from "react";
import { acceptRequest, rejectRequest } from "../../../../../api/Requests";
import { useLoaderData } from "react-router-dom";
import RequestTable from "../../../../../components/requestTable/RequestTable";
import "./request.css";

// const solicitudesData = [
// 	{ nombre: "Yajaira", apellido: "Fuenmayor", telefono: "555-123456789", gato: "Milo", tipo: "Adopción" },
// 	{ nombre: "David", apellido: "Gómez", telefono: "555-987654321", gato: "Luna", tipo: "Apadrinamiento" },
// 	{ nombre: "Elena", apellido: "Sánchez", telefono: "555-567890123", gato: "Nala", tipo: "Adopción" },
// 	{ nombre: "Javier", apellido: "Ruiz", telefono: "555-234567890", gato: "Simba", tipo: "Apadrinamiento" },
// ];

const Request = () => {
	const { allRequestData, pendingRequestData } = useLoaderData();
	console.log("Datos de las solicitudes pendientes:", pendingRequestData);
	console.log("Datos de todas las solicitudes:", allRequestData);
	const [page, setPage] = useState(0);
	const rowsPerPage = 4;
	const totalPages = Math.ceil(pendingRequestData.data.length / rowsPerPage);

	const handleAccept = async (id) => {
		alert(`Solicitud de ${id} aceptada`);
		try {
			const data = await acceptRequest(id);
			if (data.success) {
				console.log("Solicitud aceptada con exito:", data);
			} else {
				console.error("Error al aceptar la solicitud:", data);
			}
		} catch (error) {
			console.error("Error al aceptar la solicitud:", error);
		}
	};

	const handleReject = async (id) => {
		alert(`Solicitud de ${id} rechazada`);
		try {
			const data = await rejectRequest(id);
			if (data.success) {
				console.log("Solicitud rechazada con exito:", data);
			} else {
				console.error("Error al rechazar la solicitud:", data);
			}
		} catch (error) {
			console.error("Error al rechazar la solicitud:", error);
		}
	};

	const handlePrev = () => setPage((p) => Math.max(1, p - 1));
	const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

	const solicitudes = pendingRequestData.data.slice((page) * rowsPerPage, (page + 1) * rowsPerPage);

	return (
			<div className="request-root">
				<div className="request-back" onClick={() => window.history.back()}>
					<span style={{ color: '#ff8c2b', fontSize: '2rem', fontWeight: 'bold', cursor: 'pointer' }}>&larr; Volver</span>
				</div>
				<div className="request-table-container">
					<RequestTable
						requests={solicitudes}
						handleAccept={handleAccept}
						handleReject={handleReject}
						page={page}
						totalPages={totalPages}
						handlePrev={handlePrev}
						handleNext={handleNext}
						status="pending"
					/>
				</div>
			</div>
	);
};

export default Request;

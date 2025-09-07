import { useState } from "react";
import { acceptRequest, rejectRequest, deleteRequest } from "../../../api/Requests";
import { useLoaderData } from "react-router-dom";
import RequestTable from "../../../components/requestTable/RequestTable";
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

	const rowsPerPage = 4;
	const [pagePending, setPagePending] = useState(0);
	const [pendingDataArray, setPendingDataArray] = useState(
		pendingRequestData && Array.isArray(pendingRequestData.data) ? pendingRequestData.data : []
	);
	const totalPages = Math.ceil(pendingDataArray.length / rowsPerPage);

	const [pageHistory, setPageHistory] = useState(0);
	const [allDataArray, setAllDataArray] = useState(
		allRequestData && Array.isArray(allRequestData.data) ? allRequestData.data : []
	);
	const totalPagesHistory = Math.ceil(allDataArray.length / rowsPerPage);

	console.log("Total de páginas (pendientes):", totalPages);
	console.log("Total de páginas (historial):", totalPagesHistory);



	const handleAccept = async (id) => {
		alert(`Solicitud de ${id} aceptada`);
		try {
			const data = await acceptRequest(id);
			if (data.success) {
				// Elimina la solicitud aceptada del array local
				setPendingDataArray(prev => prev.filter(req => req.id_acogida !== id));
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
				// Elimina la solicitud rechazada del array local
				setPendingDataArray(prev => prev.filter(req => req.id_acogida !== id));
				console.log("Solicitud rechazada con exito:", data);
			} else {
				console.error("Error al rechazar la solicitud:", data);
			}
		} catch (error) {
			console.error("Error al rechazar la solicitud:", error);
		}
	};
	
	const handleDeleteRequest = async (id) => {
		try {
			const data = await deleteRequest(id);
			if (data.success) {
				// Elimina la solicitud del array local
				setAllDataArray(prev => prev.filter(req => req.id_acogida !== id));
				console.log("Solicitud eliminada con éxito:", data);
			} else {
				console.error("Error al eliminar la solicitud:", data);
			}
		} catch (error) {
			console.log(`Eliminar solicitud con ID: ${id} fallo `, error);
		}
	}


	const handlePrevPending = () => setPagePending((p) => Math.max(0, p - 1));
	const handleNextPending = () => setPagePending((p) => Math.min(totalPages, p + 1));

	const handlePrevHistory = () => setPageHistory((p) => Math.max(0, p - 1));
	const handleNextHistory = () => setPageHistory((p) => Math.min(totalPagesHistory, p + 1));


	const solicitudes = pendingDataArray.slice((pagePending) * rowsPerPage, (pagePending + 1) * rowsPerPage);
	const historialSolicitudes = allDataArray.slice((pageHistory) * rowsPerPage, (pageHistory + 1) * rowsPerPage);


	return (
			<div className="request-root">
				<div className="permision-back" onClick={() => window.history.back()}>
					<span className="permision-back-arrow">
						<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign: 'middle'}}>
							<path d="M20 6L10 16L20 26" stroke="#F47C2C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
					</span>
					<span className="permision-back-text">Volver</span>
				</div>
				<div className="tables-container">
				<div className="request-table-container">
					<RequestTable
						requests={solicitudes}
						handleAccept={handleAccept}
						handleReject={handleReject}
						page={pagePending}
						totalPages={totalPages}
						handlePrev={handlePrevPending}
						handleNext={handleNextPending}
						status="pending"
					/>
				</div>
				<div className="request-table-container">
					<RequestTable
						requests={historialSolicitudes}
						handleAccept={handleAccept}
						handleReject={handleReject}
						handleDeleteRequest={handleDeleteRequest}
						page={pageHistory}
						totalPages={totalPagesHistory}
						handlePrev={handlePrevHistory}
						handleNext={handleNextHistory}
						status="history"
					/>
				</div>
				</div>
			</div>
	);
};

export default Request;

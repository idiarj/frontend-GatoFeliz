

import React from "react";
import { useNavigate } from "react-router-dom";
import "./administration.css";

const Administration = () => {
	const navigate = useNavigate();

	const handleClick = (btn) => {
		if (btn === 'adopciones') {
			navigate('/administration/request');
		} else if (btn === 'roles') {
			navigate('/administration/rol');
		} else if (btn === 'permisos') {
			navigate('/administration/permission');
		} else if (btn === 'ejemplo') {
			navigate('/administration/test');
		} else {
			console.log(`Botón ${btn} presionado`);
		}
	};

	return (
		<div className="administration-container" style={{ background: '#f7f8fa', minHeight: '100vh', padding: '0' }}>
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', marginTop: '60px' }}>
				<button
					className="admin-btn admin-btn-yellow"
					onClick={() => handleClick('adopciones')}
				>
					Solicitudes de adopciones y apadrinaciones
				</button>
				<button
					className="admin-btn admin-btn-orange"
					onClick={() => handleClick('roles')}
				>
					Administrar roles
				</button>
				<button
					className="admin-btn admin-btn-yellow"
					onClick={() => handleClick('permisos')}
				>
					Administrar permisos a roles
				</button>
				<button
					className="admin-btn admin-btn-blue"
					onClick={() => handleClick('ejemplo')}
				>
					Otro ejemplo
				</button>
			</div>
		</div>
	);
};

export default Administration;

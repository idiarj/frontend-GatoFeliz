
import React, { useState } from "react";
import "./administration.css";

const rolesData = [
	{
		id: 1,
		nombre: "Usuario",
		permisos: ["Panel Adopciones"]
	},
	{
		id: 2,
		nombre: "Administrador",
		permisos: ["Panel Médico", "Panel Administrativo", "Panel Adopciones"]
	},
	{
		id: 3,
		nombre: "Veterinario",
		permisos: ["Panel médico"]
	}
];

const solicitudesData = [
	{
		id: 1,
		nombre: "Yajaira",
		apellido: "Fuenmayor",
		telefono: "555-123-4567",
		gato: "Milo",
		tipo: "Adopción"
	},
	{
		id: 2,
		nombre: "David",
		apellido: "Gómez",
		telefono: "555-987-6543",
		gato: "Luna",
		tipo: "Apadrinamiento"
	},
	{
		id: 3,
		nombre: "Elena",
		apellido: "Sánchez",
		telefono: "555-567-8901",
		gato: "Nala",
		tipo: "Adopción"
	},
	{
		id: 4,
		nombre: "Javier",
		apellido: "Ruiz",
		telefono: "555-234-5678",
		gato: "Simba",
		tipo: "Apadrinamiento"
	}
];

const Administration = () => {
	const [selectedRole, setSelectedRole] = useState(rolesData[0].id);
	const [roles, setRoles] = useState(rolesData);
	const [solicitudes, setSolicitudes] = useState(solicitudesData);

	const handleRoleChange = (e) => {
		setSelectedRole(Number(e.target.value));
	};

	const handlePermisoToggle = (permiso) => {
		setRoles((prevRoles) =>
			prevRoles.map((role) =>
				role.id === selectedRole
					? {
							...role,
							permisos: role.permisos.includes(permiso)
								? role.permisos.filter((p) => p !== permiso)
								: [...role.permisos, permiso]
						}
					: role
			)
		);
	};

	const permisosDisponibles = [
		"Panel Médico",
		"Panel Administrativo",
		"Panel Adopciones"
	];

	// ...existing code...

	return (
		<div className="admin-container">
			<div className="admin-panels">
				{/* Área de administración de roles y permisos */}
				<section className="roles-permisos">
					<h2>Administrar roles y permisos</h2>
					<div className="buscar-usuario">
						<label htmlFor="buscar-usuario">Buscar usuario</label>
						<input id="buscar-usuario" type="text" placeholder="Buscar usuario" className="search-user" />
					</div>
					<div className="roles-asignados">
						<label htmlFor="roles-asignados">Roles asignados</label>
						<select id="roles-asignados" value={selectedRole} onChange={handleRoleChange}>
							{roles.map((role) => (
								<option key={role.id} value={role.id}>{role.nombre}</option>
							))}
						</select>
					</div>
					<div className="permisos-list">
						<span>Permisos</span>
						<div className="permisos-grid">
							{permisosDisponibles.map((permiso) => (
								<label key={permiso} className="permiso-label">
									<input
										type="checkbox"
										checked={roles.find((r) => r.id === selectedRole).permisos.includes(permiso)}
										onChange={() => handlePermisoToggle(permiso)}
									/>
									{permiso}
								</label>
							))}
						</div>
					</div>
					<div className="roles-buttons">
						<button className="btn-restablecer">Restablecer</button>
						<button className="btn-guardar">Guardar cambios</button>
					</div>
				</section>

				{/* Área de solicitudes */}
				<section className="solicitudes-panel">
					<h2>Solicitudes</h2>
					<table className="solicitudes-table">
						<thead>
							<tr>
								<th className="th-nombre">Nombre</th>
								<th className="th-apellido">Apellido</th>
								<th className="th-telefono">Teléfono</th>
								<th className="th-gato">Gato</th>
								<th className="th-tipo">Tipo</th>
								<th className="th-acciones">Acciones</th>
							</tr>
						</thead>
						<tbody>
							{solicitudes.map((sol) => (
								<tr key={sol.id} className="sol-row">
									<td className="nombre">{sol.nombre}</td>
									<td className="apellido">{sol.apellido}</td>
									<td className="telefono">{sol.telefono}</td>
									<td className="gato">{sol.gato}</td>
									<td className="tipo">{sol.tipo}</td>
									<td className="acciones">
										<button className="btn-aceptar">Aceptar</button>
										<button className="btn-rechazar">Rechazar</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					{/* Paginación falsa */}
					<div className="paginacion">
						<button className="btn-paginar">&lt;</button>
						<span className="pagina-actual">1</span>
						<button className="btn-paginar">2</button>
						<button className="btn-paginar">&gt;</button>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Administration;

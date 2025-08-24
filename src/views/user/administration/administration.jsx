
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
		permisos: ["Panel Médico"]
	},
	{
		id: 4,
		nombre: "Super Veterinario",
		permisos: ["Panel Médico", "Panel Administrativo", "Panel Adopciones"]
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
	const [activePanel, setActivePanel] = useState(null); // null, 'solicitudes', 'roles', 'permisos', 'ejemplo'
	const [searchUser, setSearchUser] = useState("");
	const [selectedPermisoRole, setSelectedPermisoRole] = useState(rolesData[0].id);

	const handleRoleChange = (e) => {
		setSelectedRole(Number(e.target.value));
	};

	const handlePermisoToggle = (permiso) => {
		setRoles((prevRoles) =>
			prevRoles.map((role) =>
				role.id === selectedPermisoRole
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

	// Simulación de usuarios para el buscador
	const usuarios = [
		{ id: 1, nombre: "Yajaira" },
		{ id: 2, nombre: "David" },
		{ id: 3, nombre: "Elena" },
		{ id: 4, nombre: "Javier" }
	];

	// Asignar rol a usuario (simulado)
	const [userRoles, setUserRoles] = useState(
		usuarios.reduce((acc, user) => {
			acc[user.id] = 1; // por defecto todos son Usuario
			return acc;
		}, {})
	);

	const handleUserRoleChange = (userId, roleId) => {
		setUserRoles((prev) => ({ ...prev, [userId]: Number(roleId) }));
	};

	// Renderizado de paneles
	const renderPanel = () => {
		switch (activePanel) {
			case "solicitudes":
				return (
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
						<div className="paginacion">
							<button className="btn-paginar">&lt;</button>
							<span className="pagina-actual">1</span>
							<button className="btn-paginar">2</button>
							<button className="btn-paginar">&gt;</button>
						</div>
					</section>
				);
			case "roles":
				return (
					<section className="roles-panel">
						<h2>Administrar roles</h2>
						<div className="buscar-usuario">
							<label htmlFor="buscar-usuario">Buscar usuario</label>
							<input
								id="buscar-usuario"
								type="text"
								placeholder="Buscar usuario"
								className="search-user"
								value={searchUser}
								onChange={e => setSearchUser(e.target.value)}
							/>
						</div>
						<div className="usuarios-list">
							<label>Usuarios</label>
							<ul>
								{usuarios
									.filter(u => u.nombre.toLowerCase().includes(searchUser.toLowerCase())).length === 0 ? (
										<li className="usuario-item usuario-no-encontrado" style={{color: '#E85C1A', fontWeight: '600', fontSize: '1.1rem', padding: '1rem 0'}}>
											No se encontró ese usuario
										</li>
									) : (
										usuarios
											.filter(u => u.nombre.toLowerCase().includes(searchUser.toLowerCase()))
											.map(user => (
												<li key={user.id} className="usuario-item">
													{user.nombre}
													<select
														value={userRoles[user.id]}
														onChange={e => handleUserRoleChange(user.id, e.target.value)}
													>
														{roles.map(role => (
															<option key={role.id} value={role.id}>{role.nombre}</option>
														))}
													</select>
												</li>
											))
									)}
							</ul>
						</div>
						<div className="roles-buttons" style={{marginTop: '1.5rem'}}>
							<button className="btn-guardar">Guardar cambios</button>
						</div>
					</section>
				);
			case "permisos":
				return (
					<section className="permisos-panel">
						<h2>Administrar permisos a roles</h2>
						<div className="roles-asignados">
							<label htmlFor="roles-asignados">Selecciona un rol</label>
							<select
								id="roles-asignados"
								value={selectedPermisoRole}
								onChange={e => setSelectedPermisoRole(Number(e.target.value))}
							>
								{roles.map(role => (
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
											checked={roles.find((r) => r.id === selectedPermisoRole).permisos.includes(permiso)}
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
				);
			case "ejemplo":
				return (
					<section className="ejemplo-panel">
						<h2>Otro ejemplo</h2>
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
					</section>
				);
			default:
				return null;
		}
	};

	return (
		<div className="admin-container">
			{activePanel === null ? (
				<div className="admin-buttons">
					<button className="panel-btn" onClick={() => setActivePanel("solicitudes")}>Solicitudes de adopciones y apadrinaciones</button>
					<button className="panel-btn" onClick={() => setActivePanel("roles")}>Administrar roles</button>
					<button className="panel-btn" onClick={() => setActivePanel("permisos")}>Administrar permisos a roles</button>
					<button className="panel-btn" onClick={() => setActivePanel("ejemplo")}>Otro ejemplo</button>
				</div>
			) : (
				<>
					<div className="volver-container">
						<button className="btn-volver" onClick={() => setActivePanel(null)}>
							<span className="arrow"></span>
							Volver
						</button>
					</div>
					<div className="admin-panels">
						{renderPanel()}
					</div>
				</>
			)}
		</div>
	);
};

export default Administration;

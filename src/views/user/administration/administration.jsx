import React from "react";
import adminImg from "../../../assets/images/admin.png";
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
		 <div className="admin-container admin-flex-layout">
			 <div className="admin-cards-column">
				 <div className="admin-card" onClick={() => handleClick('adopciones')} style={{ cursor: 'pointer' }}>
					 <div className="admin-card-title">Solicitudes de adopciones y apadrinaciones</div>
					 <div className="admin-card-desc">Aquí se muestran las solicitudes de los usuarios que quieren adoptar o apadrina</div>
				 </div>
				 <div className="admin-card roles" onClick={() => handleClick('roles')} style={{ cursor: 'pointer' }}>
					 <div className="admin-card-title">Administrar roles</div>
					 <div className="admin-card-desc">Aquí se le asigna un rol a un usuario</div>
				 </div>
				 <div className="admin-card" onClick={() => handleClick('permisos')} style={{ cursor: 'pointer' }}>
					 <div className="admin-card-title">Administrar permisos a roles</div>
					 <div className="admin-card-desc">Aquí se le asignan los permisos a los módulos dependiendo de los roles</div>
				 </div>
			 </div>
			 <div className="admin-img-wrapper">
				 <img src={adminImg} alt="admin" className="admin-img-side" />
			 </div>
		 </div>
	 );
};

export default Administration;

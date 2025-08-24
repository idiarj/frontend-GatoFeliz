import './Screen1.css';

const solicitudesData = [
  { id: 1, nombre: 'Yajaira', apellido: 'Fuenmayor', telefono: '555-123-4567', gato: 'Milo', tipo: 'Adopción' },
  { id: 2, nombre: 'David', apellido: 'Gómez', telefono: '555-987-6543', gato: 'Luna', tipo: 'Apadrinamiento' },
  { id: 3, nombre: 'Elena', apellido: 'Sánchez', telefono: '555-567-8901', gato: 'Nala', tipo: 'Adopción' },
  { id: 4, nombre: 'Javier', apellido: 'Ruiz', telefono: '555-234-5678', gato: 'Simba', tipo: 'Apadrinamiento' }
];

const Screen1 = () => {
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
          {solicitudesData.map((sol) => (
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
};

export default Screen1;

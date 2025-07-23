import React from 'react';

import Head from '../../components/head.jsx';
import Menu from '../../components/menu.jsx';

const Dashboard = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <Head title="Bienvenido a Gato Feliz Venzuela" />
      {/* Layout principal */}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', padding: '2vw 3vw' }}>
        <div style={{ minWidth: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 0 }}>
        </div>
        <div style={{ flex: 1, padding: 0, minWidth: 0 }}>
          {/* Aquí puedes renderizar el contenido principal del dashboard */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

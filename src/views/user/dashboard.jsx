import React from 'react';
import Menu from '../../components/menu.jsx';
import Logo from '../../components/logo.jsx';

const Dashboard = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Header amarillo */}
      <div style={{
        width: '100%',
        background: '#fff9db',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.8rem 2.5rem 0.8rem 2.5rem',
        boxSizing: 'border-box',
        minHeight: 90,
      }}>
        <h1 style={{ color: '#F37021', fontWeight: 'bold', fontSize: '2.5rem', margin: 0 }}>
          Bienvenido a Gato Feliz Venzuela
        </h1>
        <Logo width={180} height={180} style={{ marginTop: -10, marginBottom: -20, marginLeft: 60 }} />
      </div>
      {/* Layout principal */}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', padding: '2vw 3vw' }}>
        <div style={{ minWidth: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 0 }}>
          <Menu />
        </div>
        <div style={{ flex: 1, padding: 0, minWidth: 0 }}>
          {/* Contacto box */}
          <div style={{
            marginBottom: 24,
            background: '#fff9db',
            borderRadius: 16,
            padding: '1rem',
            color: '#b94d0d',
            fontWeight: 'bold',
            fontSize: 16,
            boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
            maxWidth: 340
          }}>
            <div style={{ marginBottom: 6 }}>CONTACTO</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span role="img" aria-label="phone">📞</span> 0414 640-7460
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span role="img" aria-label="instagram">📸</span> gatofelizvenezuela
            </div>
          </div>
          {/* Aquí puedes renderizar el contenido principal del dashboard */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

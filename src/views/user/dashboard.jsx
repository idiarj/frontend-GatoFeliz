import React from 'react';
import Menu from '../../components/menu.jsx';
import Logo from '../../components/logo.jsx';

const Dashboard = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#fff9db', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
        background: '#fff',
        borderRadius: 28,
        boxShadow: '0 4px 32px 0 rgba(0,0,0,0.07)',
        padding: '2.5vw 3vw',
        minWidth: 340,
        maxWidth: '98vw',
        width: '100%',
        height: '90vh',
        display: 'flex',
        flexDirection: 'row',
        gap: 32,
        justifyContent: 'center',
        alignItems: 'flex-start',
        boxSizing: 'border-box',
      }}>
        <div style={{ minWidth: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 0 }}>
          <Logo width={260} height={260} style={{ marginTop: -30, marginLeft: -60 }} />
          <div style={{ marginTop: -38, marginLeft: -95 }}>
            <Menu />
          </div>
        </div>
        <div style={{ flex: 1, padding: 0, minWidth: 0 }}>
          <h1 style={{ color: '#F37021', fontWeight: 'bold', fontSize: '2.2rem', marginBottom: '1.2rem' }}>
            Bienvenido al Dashboard
          </h1>
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

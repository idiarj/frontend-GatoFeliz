import React from 'react';
import { IoCall, IoLogoInstagram } from 'react-icons/io5';
import Logo from './logo.jsx';
import Menu from './menu.jsx';

const Head = ({ title }) => {
  return (
    <div style={{
      width: '100%',
      margin: '0 auto',
      background: '#fff9db',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.8rem 2.5rem 0.8rem 2.5rem',
      boxSizing: 'border-box',
      minHeight: 90,
      boxShadow: '0 2px 12px 0 rgba(243,112,33,0.04)',
      gap: 32,
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 32 }}>
        <Menu />
        <h1 style={{ color: '#F37021', fontWeight: 'bold', fontSize: '2.5rem', marginLeft: 200, marginBottom: 0 }}>
          {title}
        </h1>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 32 }}>
        <div style={{
          background: '#fff',
          borderRadius: 14,
          boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
          padding: '0.7rem 1.2rem',
          color: '#b94d0d',
          fontWeight: 'bold',
          fontSize: 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          minWidth: 180,
          marginRight: 10
        }}>
          <div style={{ marginBottom: 4, color: '#F37021', fontWeight: 700, fontSize: 16 }}>CONTACTO</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2, fontSize: 15 }}>
            <IoCall style={{ color: '#F37021', fontSize: 20 }} />
            <span style={{color: '#F37021'}}>0414 640-7460</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15 }}>
            <IoLogoInstagram style={{ color: '#F37021', fontSize: 20 }} />
            <span style={{color: '#F37021'}}>gatofelizvenezuela</span>
          </div>
        </div>
        <Logo width={100} height={100} style={{ marginTop: -3, marginBottom: 3, marginLeft: 20 }} />
      </div>
    </div>
  );
};

export default Head;

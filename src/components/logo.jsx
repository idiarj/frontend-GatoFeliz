import React from 'react';
import logo from '../assets/logo.png';

const Logo = ({ width = 120, height = 120, style = {} }) => (
  <img
    src={logo}
    alt="Gato Feliz Logo"
    width={width}
    height={height}
    style={{ display: 'block', objectFit: 'contain', ...style }}
    draggable={false}
  />
);

export default Logo;

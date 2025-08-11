import logoIcono from '../../../assets/images/logoicono.png';
import zelleLogo from '../../../assets/logos/zelle.png';
import pagomovilLogo from '../../../assets/logos/pagomovil.png';
import paypalLogo from '../../../assets/logos/paypal.png';
import binanceLogo from '../../../assets/logos/binance.png';
import venmoLogo from '../../../assets/logos/venmo.png';
import alimentoLogo from '../../../assets/logos/alimento.png';
import medicinaLogo from '../../../assets/logos/medicina.png';
import limpiezaLogo from '../../../assets/logos/limpieza.png';
import michi1 from '../../../assets/michis/michi1.png';
import michiPair from '../../../assets/michis/michi2blancoynegro.png';

export const dashboardImages = {
  logoIcono,
  zelleLogo,
  pagomovilLogo,
  paypalLogo,
  binanceLogo,
  venmoLogo,
  alimentoLogo,
  medicinaLogo,
  limpiezaLogo,
  michi1,
  michiPair,
};

export const catsData = [
  {
    id: 1,
    name: 'Milo',
    gender: 'Macho',
    age: '2 años',
    image: michi1,
    description: 'Cariñoso y juguetón, busca un hogar amoroso.'
  },
];

// Métodos de ejemplo para obtener datos
export function getLastCat() {
  return catsData[catsData.length - 1];
}

export function getPaymentLogos() {
  return [zelleLogo, pagomovilLogo, paypalLogo, binanceLogo, venmoLogo];
}

export function getDonationTypes() {
  return [
    { logo: alimentoLogo, label: 'Alimento' },
    { logo: medicinaLogo, label: 'Medicinas' },
    { logo: limpiezaLogo, label: 'Limpieza' },
  ];
}

export function getSponsorImage() {
  return michiPair;
}

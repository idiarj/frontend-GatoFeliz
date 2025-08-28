import React from 'react'
import { FiShare2 } from 'react-icons/fi'
import './myCatCard.css'
export const MyCatCard = ({gender, age}) => {
  return (
    <div className="cat-share-card">
      <div className="cat-share-card-image-wrapper">
        <img
          src={'https://res.cloudinary.com/dqc0yku26/image/upload/v1756355363/gatoFeliz/icons/cat_siames_cat.png'}
          alt={`Foto de ${'gato'}`}
          className="cat-share-card-image"
        />
      </div>
      <div className="cat-share-card-content">
        <h3 className="cat-share-card-title">{'gato'}</h3>
        <p className="cat-share-card-subtitle">
          {'genero'} · {'edad'}
        </p>

        <div className="cat-share-card-actions">
          <div className="share-dropdown">
            <button
              type="button"
              className="cat-share-card-share-main"
            >
              <span className="share-icon"><FiShare2 /></span>
              Compartir
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import { FiShare2 } from 'react-icons/fi'
import './myCatCard.css'
export const MyCatCard = ({gender, age, image, name}) => {
  return (
    <div className="cat-share-card">
      <div className="cat-share-card-image-wrapper">
        <img
          src={image}
          alt={`Foto de ${name}`}
          className="cat-share-card-image"
        />
      </div>
      <div className="cat-share-card-content">
        <h3 className="cat-share-card-title">{name}</h3>
        <p className="cat-share-card-subtitle">
          {gender} · {age}
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

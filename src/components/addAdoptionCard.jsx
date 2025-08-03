import React, { useRef } from "react";
import { FaImage, FaEdit, FaCheck, FaTimes } from "react-icons/fa";

const AddAdoptionCard = ({ onAdd, uploading }) => {
  const fileInput = useRef();

  return (
    <div
      style={{
        background: "#f4f4f4",
        border: "2px solid #1a237e33",
        borderRadius: 18,
        boxShadow: "0 2px 8px #0001",
        width: 270,
        height: 320,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto",
        padding: 0,
      }}
    >
      <button
        onClick={() => fileInput.current.click()}
        style={{
          background: "#e0e0e0",
          border: "2px solid #1976d2",
          borderRadius: 8,
          width: 210,
          height: 170,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#1565c0",
          fontWeight: 700,
          fontSize: 20,
          cursor: "pointer",
          marginBottom: 16,
        }}
      >
        <FaImage size={48} style={{ marginBottom: 8 }} />
        Insertar imagen
        <input
          type="file"
          accept="image/*"
          ref={fileInput}
          style={{ display: "none" }}
          disabled={uploading}
        />
      </button>
      <div style={{ marginBottom: 10, marginTop: 2 }}>
        <button style={{
          background: "#fff",
          border: "1px solid #1976d2",
          color: "#1976d2",
          borderRadius: 8,
          fontWeight: 700,
          fontSize: 15,
          padding: "4px 12px",
          marginRight: 6,
          cursor: "pointer"
        }}>
          Agregar nombre | Sexo | Edad
        </button>
      </div>
      <div style={{ color: "#bdbdbd", fontSize: 13, marginTop: 2, textAlign: "center" }}>
        Completa los datos y sube la foto del animal para crear una nueva tarjeta de adopción.
      </div>
    </div>
  );
};

export default AddAdoptionCard;
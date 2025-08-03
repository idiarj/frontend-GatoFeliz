import React from "react";

const AdoptionCard = ({ name, gender, age, image, onRequest, buttonLabel = "ENVIAR SOLICITUD" }) => {
  return (
    <div
      style={{
        background: "#fff9db",
        borderRadius: 24,
        boxShadow: "0 2px 8px #0001",
        padding: 0,
        overflow: "hidden",
        width: 270,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 auto"
      }}
    >
      <img
        src={image}
        alt={name}
        style={{ width: "100%", height: 200, objectFit: "cover" }}
      />
      <div style={{ padding: "16px 12px 0 12px", width: "100%", textAlign: "center" }}>
        <div style={{ color: "#b94d0d", fontWeight: 700, fontSize: 17, marginBottom: 2 }}>
          {name} {gender && ` | ${gender}`} {age && ` | ${age}`}
        </div>
        <button
          onClick={onRequest}
          style={{
            background: "none",
            border: "none",
            color: "#F37021",
            fontWeight: 900,
            fontSize: 16,
            marginTop: 8,
            cursor: "pointer",
            textTransform: "uppercase",
            letterSpacing: 0.5,
            padding: 0
          }}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default AdoptionCard;
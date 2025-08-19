import { Link } from "react-router-dom";
import gatoSus from "../../../assets/images/suspicious-cat.png"
import "./notFound.css";

export default function NotFound(){
  return (
    <section className="nf-wrap" role="alert" aria-live="polite">
      <div className="nf-card">

        {/* Columna izquierda: texto y acciones */}
        <div className="nf-copy">
          <div className="nf-badge">404</div>
          <h1 className="nf-title">¡Ups! Página no encontrada</h1>
          <p className="nf-text">
            Parece que este ratón se escapó… o tal vez el enlace está roto.
            Tranquilo, puedes volver al inicio o seguir viendo nuestros mininos en adopción.
          </p>

          <div className="nf-actions">
            <Link to="/dashboard" className="nf-btn nf-btn-primary">
              Volver al inicio
            </Link>
            <Link to="/adoption" className="nf-btn nf-btn-ghost">
              Ver gatos en adopción
            </Link>
          </div>
        </div>

        {/* Columna derecha: ilustración */}
        <div className="nf-illustration">
          <div className="nf-blob" aria-hidden="true" />
            <img
              className="nf-img"
              src={gatoSus}
              alt="Gato enojado y adorable"
              loading="lazy"
            />
        </div>
      </div>
    </section>
  );
}

import "./Loading.css";
import Menu from "../../../components/menu/menu";
import Head from "../../../components/head/head";


/**
 * Vista de Loading para Fundación Gato Feliz
 * Props:
 *  - message?: string  → Texto que indica qué se está cargando (ej: "Adopciones", "Perfil del gato Benito")
 *  - subtitle?: string → Texto opcional secundario (ej: "Esto tomará pocos segundos…")
 *  - compact?: boolean → Modo compacto (sin overlay a pantalla completa)
 */
export default function Loading({ message = "Cargando…", subtitle, compact = false }) {
  return (
    <div
      className={`loading-root${compact ? " compact" : ""}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
        <Menu/>
        <Head/>
      <div className="loading-card">
        <div className="loading-left">
          <div className="spinner" aria-hidden="true" />
          {/* Gatito (SVG) tintado con currentColor = var(--accent) */}
          {/* <svg className="cat" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M5.5 4.5c.6-.4 1.4-.2 1.8.4l1 1.5c1.9-.6 4-.6 5.9 0l1-1.5c.4-.6 1.2-.8 1.8-.4.6.4.8 1.2.4 1.8l-.8 1.2c1.8 1.3 2.9 3.3 2.9 5.5 0 3.9-3.6 7-8.5 7S3.3 17.9 3.3 14c0-2.2 1.1-4.2 2.9-5.5l-.8-1.2c-.4-.6-.2-1.4.4-1.8zM8 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-4.1 3.8c1.3 0 2.5-.6 3.3-1.6.3-.4.2-1-.2-1.3a1 1 0 0 0-1.4.2c-.4.5-1.1.7-1.7.7s-1.3-.2-1.7-.7a1 1 0 0 0-1.6 1.1c.8 1 2 1.6 3.5 1.6z"
            />
          </svg> */}
          {/* Huellitas */}
          {/* <div className="paws" aria-hidden="true">
            <span className="paw" />
            <span className="paw" />
            <span className="paw" />
          </div> */}
        </div>

        <div className="loading-text">
          <span className="visually-hidden">Cargando contenido</span>
          <div className="loading-title">{message}</div>
          {subtitle ? <div className="loading-sub">{subtitle}</div> : null}
        </div>
      </div>
    </div>
  );
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './SiteRoutes.jsx'

const navigationEntry =
  performance.getEntriesByType("navigation")[0];

if (
  navigationEntry?.type === "reload" &&
  window.location.pathname !== "/"
) {
  window.history.replaceState(null, "", "/");
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
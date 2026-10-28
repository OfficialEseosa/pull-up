// Entry point: mounts the React app into <div id="root"> in index.html
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter watches the address bar so App can pick a page by URL */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

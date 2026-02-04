import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/manrope'
import '@fontsource/outfit'
import '@fontsource/jetbrains-mono'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

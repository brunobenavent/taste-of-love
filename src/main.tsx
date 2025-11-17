import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import App from './App'
import './styles/globals.css'

// 1. IMPORTA EL COMPONENTE NUEVO
import ScrollToTop from './components/ScrollToTop' 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Asegúrate de que el basename siga estando ahí si lo pusimos antes */}
    <BrowserRouter basename="/taste-of-love">
      
      {/* 2. AÑADE LA ETIQUETA AQUÍ DENTRO */}
      <ScrollToTop />
      
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
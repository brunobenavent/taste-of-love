import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  // Obtenemos la ruta actual (el pathname)
  const { pathname } = useLocation()

  // Este efecto se ejecuta cada vez que cambia la ruta
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // No renderiza nada visualmente
  return null
}
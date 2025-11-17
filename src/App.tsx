import { Routes, Route } from 'react-router-dom'
import RecipeListPage from './pages/RecipeListPage'
import RecipeDetailPage from './pages/RecipeDetailPage'

function App() {
  return (
    <Routes>
      {/* Ruta principal: /
        Mostrará la lista de recetas
      */}
      <Route path="/" element={<RecipeListPage />} />
      
      {/* Ruta dinámica: /recetas/jarabe-de-rosas
        Esta es la URL que pondrás en tus QRs
      */}
      <Route path="/recetas/:slug" element={<RecipeDetailPage />} />
    </Routes>
  )
}

export default App
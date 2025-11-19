import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronDown, Check } from 'lucide-react'
import recipesData from '@/data/recipes.json'

// Define la "forma" de una receta
interface Recipe {
  slug: string;
  title: string;
  image: string;
  description: string;
  ingredients: string[];
  preparation: string;
}

export default function RecipeDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  
  // Estado para controlar si el menú de recetas está abierto o cerrado
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Buscamos la receta actual
  const recipe = (recipesData as Recipe[]).find((r) => r.slug === slug)

  if (!recipe) {
    return (
      <main className="min-h-screen bg-gray-100 py-12 px-4 flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold text-gray-800">Receta no encontrada</h1>
        <Link to="/" className="text-pink-500 hover:underline flex items-center gap-2">
          <ArrowLeft size={20} /> Volver al listado
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 md:py-12 font-sans">
      <div className="max-w-[1000px] mx-auto">
        
        {/* 1. LOGO */}
        <div className="flex justify-center mb-8">
          <Link to="/">
            <img
              src="/taste-of-love/logo-tasteoflove.svg" 
              alt="Taste of Love - Culinary Roses"
              width={280}
              className="h-auto opacity-90 hover:opacity-100 transition-opacity"
            />
          </Link>
        </div>

        {/* 2. BARRA DE NAVEGACIÓN */}
        <nav className="relative z-50 flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-100 shadow-sm">
          
          {/* Botón Volver */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-gray-500 hover:text-pink-500 transition-colors font-medium text-sm uppercase tracking-wider group w-full md:w-auto justify-center md:justify-start"
          >
            <div className="bg-gray-100 p-2 rounded-full group-hover:bg-pink-50 transition-colors">
                <ArrowLeft size={18} />
            </div>
            <span>Volver</span>
          </Link>

          {/* --- DROPDOWN PERSONALIZADO --- */}
          <div className="relative w-full md:w-72">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-full flex items-center justify-between bg-white border border-gray-200 text-gray-700 py-2.5 px-4 rounded-lg shadow-sm hover:border-pink-300 hover:ring-2 hover:ring-pink-100 transition-all text-sm font-medium cursor-pointer"
            >
              <span className="truncate mr-2">{recipe.title}</span>
              <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isMenuOpen && (
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsMenuOpen(false)}
              ></div>
            )}

            {isMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-2xl max-h-[300px] overflow-y-auto z-50">
                <ul className="py-1">
                  {recipesData.map((r) => (
                    <li key={r.slug}>
                      <button
                        onClick={() => {
                          navigate(`/recetas/${r.slug}`);
                          setIsMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-pink-50 transition-colors flex items-center justify-between
                          ${r.slug === recipe.slug ? 'bg-pink-50/50 text-pink-600 font-semibold' : 'text-gray-600'}
                        `}
                      >
                        <span className="truncate">{r.title}</span>
                        {r.slug === recipe.slug && <Check size={14} />}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </nav>

        {/* --- Tarjeta de la Receta --- */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 relative z-0">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Imagen */}
            <div className="relative h-[400px] md:h-auto md:min-h-[600px]">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = "/taste-of-love/imagenes/placeholder-receta.jpg"; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:hidden"></div>
            </div>

            {/* Contenido */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl font-light mb-6 text-pink-400 tracking-wide uppercase border-b border-pink-100 pb-4 font-serif">
                {recipe.title}
              </h1>

              <p className="text-gray-600 mb-8 leading-relaxed text-base italic">
                {recipe.description}
              </p>

              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-8 h-1 bg-pink-300 rounded-full"></span>
                    Ingredientes
                  </h2>
                  <ul className="text-gray-700 space-y-2 leading-relaxed text-base pl-4">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="list-disc marker:text-pink-300 pl-1">
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-8 h-1 bg-pink-300 rounded-full"></span>
                    Preparación
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-base text-justify">
                    {recipe.preparation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
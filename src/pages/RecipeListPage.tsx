import { useState } from 'react'
import { Link } from 'react-router-dom'
import recipesData from '@/data/recipes.json'

// Definimos la forma de la receta
interface Recipe {
  slug: string;
  title: string;
  image: string;
  description: string;
  ingredients: string[];
  preparation: string;
}

export default function RecipeListPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'taste-of-love' | 'aurora'>('all')
  const currentYear = new Date().getFullYear()

  const filteredRecipes = recipesData.filter((recipe) => {
    const content = (recipe.title + recipe.description).toLowerCase()
    const isAurora = content.includes('escaramujo') || content.includes('hip')

    if (activeTab === 'aurora') return isAurora
    if (activeTab === 'taste-of-love') return !isAurora
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* --- HEADER --- */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm/50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src="/taste-of-love/logo-tasteoflove.svg" 
              alt="Taste of Love" 
              className="h-12 w-auto hover:opacity-80 transition-opacity cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </div>

          {/* Tabs de navegación */}
          <nav className="flex gap-2 bg-gray-100/50 p-1 rounded-full">
            <button
              onClick={() => { setActiveTab('all'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'all'
                  ? 'bg-white text-pink-500 shadow-sm'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Todas
            </button>
            
            <button
              onClick={() => { setActiveTab('taste-of-love'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'taste-of-love'
                  ? 'bg-pink-100 text-pink-600 shadow-sm'
                  : 'text-gray-500 hover:text-pink-400'
              }`}
            >
              Taste of Love
            </button>

            <button
              onClick={() => { setActiveTab('aurora'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'aurora'
                  ? 'bg-orange-100 text-orange-600 shadow-sm'
                  : 'text-gray-500 hover:text-orange-400'
              }`}
            >
              Aurora
            </button>
          </nav>
        </div>
      </header>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="flex-grow max-w-6xl mx-auto p-4 md:p-8 w-full">
        
        <div className="mb-8 flex items-center gap-4">
           <h2 className="text-xl font-light text-gray-400 uppercase tracking-widest">
             {activeTab === 'all' && 'Recetario Completo'}
             {activeTab === 'taste-of-love' && 'Colección Pétalos de Rosa'}
             {activeTab === 'aurora' && 'Colección Escaramujo'}
           </h2>
           <div className="h-px bg-gray-200 flex-grow"></div>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(filteredRecipes as Recipe[]).map((recipe: Recipe) => (
            <li 
              key={recipe.slug} 
              className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:border-pink-100 transition-all duration-300 group"
            >
              <Link 
                to={`/recetas/${recipe.slug}`} 
                className="flex flex-row h-32 md:h-48"
              >
                <div className="w-1/3 md:w-48 h-full relative shrink-0 overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => { e.currentTarget.src = "/taste-of-love/imagenes/placeholder-receta.jpg"; }}
                  />
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity ${
                     (recipe.title + recipe.description).toLowerCase().includes('escaramujo') ? 'bg-orange-500' : 'bg-pink-500'
                  }`} />
                </div>

                <div className="p-4 flex flex-col justify-center flex-1 relative">
                  <div className="absolute top-4 right-4">
                     {(recipe.title + recipe.description).toLowerCase().includes('escaramujo') ? (
                        <span className="text-[9px] font-black text-orange-400 uppercase tracking-widest border border-orange-100 px-1.5 py-0.5 rounded">Aurora</span>
                     ) : (
                        <span className="text-[9px] font-black text-pink-300 uppercase tracking-widest border border-pink-100 px-1.5 py-0.5 rounded">Rose</span>
                     )}
                  </div>

                  <h2 className="text-lg md:text-xl font-serif font-medium text-gray-800 mb-2 group-hover:text-pink-600 line-clamp-2 pr-12">
                    {recipe.title}
                  </h2>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-3">
                    {recipe.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No hay recetas en esta colección.</p>
          </div>
        )}
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col items-center justify-center gap-2">
          <img 
             src="/taste-of-love/logo-tasteoflove.svg" 
             alt="Taste of Love" 
             className="h-8 opacity-40 grayscale mb-2"
          />
          <p className="text-gray-500 text-sm font-medium">
            © Ilove plants {currentYear} Todos los derechos reservados
          </p>
        </div>
      </footer>
    </div>
  )
}
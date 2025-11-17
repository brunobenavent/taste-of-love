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
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 min-h-screen bg-gray-50">
      {/* Cabecera con el logo pequeño si quieres, o solo título */}
      <div className="text-center mb-12">
        <img 
          src="/taste-of-love/logo-tasteoflove.svg" 
          alt="Taste of Love" 
          className="h-16 mx-auto mb-6"
        />
        <h1 className="text-3xl md:text-4xl font-light text-gray-800 tracking-widest uppercase border-b border-pink-200 pb-4 inline-block">
          Recetario
        </h1>
      </div>

      <ul className="grid gap-6">
        {(recipesData as Recipe[]).map((recipe: Recipe) => (
          <li 
            key={recipe.slug} 
            className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
          >
            {/* Usamos un Link que envuelve todo para que se pueda hacer clic 
                en la imagen o en el texto.
            */}
            <Link 
              to={`/recetas/${recipe.slug}`} 
              className="flex flex-col sm:flex-row h-full"
            >
              {/* --- THUMBNAIL (IMAGEN) --- */}
              <div className="w-full sm:w-48 h-48 sm:h-auto relative shrink-0 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  // Usamos la misma técnica de fallback para evitar imágenes rotas
                  onError={(e) => { e.currentTarget.src = "/taste-of-love/imagenes/placeholder-receta.jpg"; }}
                />
                {/* Capa rosada sutil al pasar el ratón */}
                <div className="absolute inset-0 bg-pink-500/0 group-hover:bg-pink-500/10 transition-colors" />
              </div>

              {/* --- CONTENIDO (TEXTO) --- */}
              <div className="p-6 flex flex-col justify-center flex-1">
                <h2 className="text-xl font-semibold text-pink-500 mb-2 group-hover:text-pink-600 font-serif tracking-wide">
                  {recipe.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {recipe.description}
                </p>
                <div className="mt-4">
                  <span className="text-xs font-bold text-pink-400 uppercase tracking-wider border border-pink-200 px-2 py-1 rounded-full group-hover:bg-pink-50 transition-colors">
                    Ver receta →
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ChefHat } from 'lucide-react' // Importamos iconos
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
  // 1. Hooks de navegación
  const { slug } = useParams()
  const navigate = useNavigate()
  
  // 2. Buscamos la receta actual
  const recipe = (recipesData as Recipe[]).find((r) => r.slug === slug)

  // 3. Función para cambiar de receta desde el dropdown
  const handleRecipeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSlug = event.target.value;
    if (newSlug) {
      navigate(`/recetas/${newSlug}`);
    }
  };

  // Si no existe la receta, mostramos un error
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
    <main className="min-h-screen bg-gray-50 py-8 px-4 md:py-12">
      <div className="max-w-[1000px] mx-auto">
        
        {/* --- BARRA DE NAVEGACIÓN --- */}
        <nav className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-4 rounded-xl shadow-sm">
          {/* Botón Volver */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-gray-600 hover:text-pink-500 transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            <span className="hidden md:inline">Volver al recetario</span>
            <span className="md:hidden">Volver</span>
          </Link>

          {/* Dropdown de Navegación Rápida */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <ChefHat className="text-pink-400 hidden md:block" size={24} />
            <select 
              value={recipe.slug} 
              onChange={handleRecipeChange}
              className="w-full md:w-64 p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400 transition-all cursor-pointer text-sm md:text-base"
            >
              {recipesData.map((r) => (
                <option key={r.slug} value={r.slug}>
                  {r.title}
                </option>
              ))}
            </select>
          </div>
        </nav>

        {/* --- Logo --- */}
        <div className="flex justify-center mb-8">
          <img
            src="/taste-of-love/logo-tasteoflove.svg" 
            alt="Taste of Love - Culinary Roses"
            width={300}
            className="h-auto opacity-90 hover:opacity-100 transition-opacity"
          />
        </div>

        {/* --- Tarjeta de la Receta --- */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Imagen */}
            <div className="relative h-[400px] md:h-auto md:min-h-[600px]">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = "/taste-of-love/imagenes/placeholder-receta.jpg"; }}
              />
              {/* Gradiente sutil sobre la imagen para darle estilo */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:hidden"></div>
            </div>

            {/* Contenido */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl font-light mb-6 text-pink-400 tracking-wide uppercase border-b border-pink-100 pb-4">
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
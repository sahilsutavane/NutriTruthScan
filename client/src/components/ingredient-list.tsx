import { ChevronDown, Star, Heart, Flag, Trash2, Info, AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';
import type { Product } from '@shared/schema';
import { Progress } from '@/components/ui/progress';

interface Props {
  product: Product;
}

export function IngredientList({ product }: Props) {
  // Calculate the filled stars for rating
  const rating = Math.round((product.analysis.foodScore / 100) * 5);
  
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Product Image & Size */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-56 h-56 bg-white/5 rounded-2xl flex items-center justify-center p-2 shadow-lg">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="max-w-full max-h-full object-contain rounded-xl" />
          ) : (
            <div className="text-white/20 flex flex-col items-center">
              <ShieldAlert className="w-16 h-16 mb-2 text-white/30" />
              <span>No image available</span>
            </div>
          )}
        </div>
      </div>

      {/* Scores Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-white/90 border-b border-white/10 pb-2">
          Health Ratings
        </h3>
        
        {/* Rating Stars */}
        <div className="flex justify-center items-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <Star 
              key={n} 
              fill={n <= rating ? "#FFCC33" : "none"}
              className={`w-8 h-8 ${n <= rating ? 'text-yellow-400' : 'text-gray-500'}`} 
            />
          ))}
        </div>
        
        {/* Scores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-b from-white/10 to-white/5 p-4 rounded-xl shadow-md">
            <h3 className="font-medium mb-2 text-white/90 text-center">NUTRI-SCORE</h3>
            <div className="flex gap-1">
              {['A', 'B', 'C', 'D', 'E'].map((score) => {
                const isSelected = product.analysis.nutriScore === score;
                // Color mapping for scores
                const scoreColors: Record<string, string> = {
                  'A': 'bg-green-500',
                  'B': 'bg-lime-500',
                  'C': 'bg-yellow-500',
                  'D': 'bg-orange-500',
                  'E': 'bg-red-500'
                };
                
                return (
                  <div
                    key={score}
                    className={`flex-1 py-2 text-center rounded-md ${
                      isSelected 
                        ? `${scoreColors[score]} text-white font-bold shadow-lg scale-110` 
                        : 'bg-white/10 text-white/60'
                    }`}
                  >
                    {score}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-b from-white/10 to-white/5 p-4 rounded-xl shadow-md">
            <h3 className="font-medium mb-2 text-white/90 text-center">NOVA SCORE</h3>
            <div className="text-3xl font-bold text-center">
              <span className={`bg-gradient-to-r ${getNovaColor(product.analysis.novaScore)} bg-clip-text text-transparent`}>
                {product.analysis.novaScore}
              </span>
              <span className="text-white/60 text-xl">/4</span>
            </div>
            <div className="mt-2 text-xs text-center text-white/70">
              {getNovaDescription(product.analysis.novaScore)}
            </div>
          </div>

          <div className="bg-gradient-to-b from-white/10 to-white/5 p-4 rounded-xl shadow-md relative overflow-hidden">
            <h3 className="font-medium mb-2 text-white/90 text-center">FOOD-SCORE</h3>
            <div className="text-3xl font-bold text-center text-white relative z-10">
              {product.analysis.foodScore}
              <span className="text-white/60 text-xl">/100</span>
            </div>
            <Progress 
              value={product.analysis.foodScore} 
              className="h-2 mt-2 bg-white/20" 
            />
          </div>
        </div>
      </div>

      {/* Warning & Benefit Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Warnings */}
        {product.analysis.warnings && product.analysis.warnings.length > 0 && (
          <div className="bg-red-900/20 p-4 rounded-xl space-y-2 border border-red-800/30">
            <h3 className="font-medium text-red-300 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Warnings
            </h3>
            <ul className="space-y-1 text-sm">
              {product.analysis.warnings.map((warning, idx) => (
                <li key={idx} className="text-white/80 flex items-start">
                  <span className="mr-2 text-red-400">•</span>
                  {warning}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Benefits */}
        {product.analysis.goodIngredients && product.analysis.goodIngredients.length > 0 && (
          <div className="bg-green-900/20 p-4 rounded-xl space-y-2 border border-green-800/30">
            <h3 className="font-medium text-green-300 flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Benefits
            </h3>
            <ul className="space-y-1 text-sm">
              {product.analysis.goodIngredients.map((benefit, idx) => (
                <li key={idx} className="text-white/80 flex items-start">
                  <span className="mr-2 text-green-400">•</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Additives */}
      {product.additives && product.additives.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white/90 border-b border-white/10 pb-2">
            Additives
          </h3>
          <div className="flex flex-wrap gap-2">
            {product.additives.map((additive) => (
              <span key={additive} className="px-3 py-1 bg-red-900/30 border border-red-800/20 rounded-full text-sm text-white/90 shadow-sm">
                {additive}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Nutrition */}
      {product.nutrition && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white/90 border-b border-white/10 pb-2">
            Nutrition per 100g
          </h3>
          <div className="space-y-2">
            {Object.entries(product.nutrition).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <span className="capitalize text-white/80">{key}</span>
                <div className="flex items-center gap-2 text-white">
                  <span>{value}g</span>
                  <ChevronDown className="w-4 h-4 text-white/60" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ingredients */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white/90 border-b border-white/10 pb-2">
          Ingredients
        </h3>
        <p className="text-white/70 text-sm leading-relaxed bg-white/5 p-4 rounded-lg">
          {product.ingredients.join(", ")}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 pt-4">
        <button className="flex items-center justify-center gap-2 p-3 bg-gradient-to-b from-white/10 to-white/5 rounded-xl hover:from-white/15 hover:to-white/10 transition-all shadow-md">
          <Heart className="w-5 h-5 text-pink-400" />
          <span className="text-white">Add to Favorites</span>
        </button>
        <button className="flex items-center justify-center gap-2 p-3 bg-gradient-to-b from-white/10 to-white/5 rounded-xl hover:from-white/15 hover:to-white/10 transition-all shadow-md">
          <Info className="w-5 h-5 text-blue-400" />
          <span className="text-white">How We Rate</span>
        </button>
      </div>
    </div>
  );
}

// Helper function to get NOVA score color
function getNovaColor(score: number): string {
  switch(score) {
    case 1: return 'from-green-400 to-green-600';
    case 2: return 'from-yellow-400 to-yellow-600';
    case 3: return 'from-orange-400 to-orange-600';
    case 4: return 'from-red-400 to-red-600';
    default: return 'from-gray-400 to-gray-600';
  }
}

// Helper function to get NOVA score description
function getNovaDescription(score: number): string {
  switch(score) {
    case 1: return 'Unprocessed or minimally processed foods';
    case 2: return 'Processed culinary ingredients';
    case 3: return 'Processed foods';
    case 4: return 'Ultra-processed food and drink products';
    default: return 'Processing level unknown';
  }
}

export default IngredientList;
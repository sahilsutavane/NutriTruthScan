import { ChevronDown, Star, Heart, Flag, Trash2, Info } from 'lucide-react';
import type { Product } from '@shared/schema';

interface Props {
  product: Product;
}

export function IngredientList({ product }: Props) {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Product Image & Size */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-48 h-48 bg-white/5 rounded-xl flex items-center justify-center">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="w-40 h-40 object-contain" />
          ) : (
            <div className="text-white/20">No image</div>
          )}
        </div>
        {product.size && (
          <span className="text-white/60">{product.size}</span>
        )}
      </div>

      {/* Scores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 p-4 rounded-xl">
          <h3 className="font-medium mb-2 text-white/90">NUTRI-SCORE</h3>
          <div className="flex gap-2">
            {['A', 'B', 'C', 'D', 'E'].map((score) => (
              <div
                key={score}
                className={`flex-1 py-2 text-center rounded ${
                  product.analysis.nutriScore === score
                    ? 'bg-primary text-white'
                    : 'bg-white/10 text-white/60'
                }`}
              >
                {score}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 p-4 rounded-xl">
          <h3 className="font-medium mb-2 text-white/90">NOVA SCORE</h3>
          <div className="text-3xl font-bold text-center text-white">
            {product.analysis.novaScore}/4
          </div>
        </div>

        <div className="bg-white/5 p-4 rounded-xl">
          <h3 className="font-medium mb-2 text-white/90">FOOD-SCORE</h3>
          <div className="text-3xl font-bold text-center text-white">
            {product.analysis.foodScore}/100
          </div>
        </div>
      </div>

      {/* Additives */}
      {product.additives && product.additives.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium text-white/90">Additives</h3>
          <div className="flex flex-wrap gap-2">
            {product.additives.map((additive) => (
              <span key={additive} className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">
                {additive}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Nutrition */}
      {product.nutrition && (
        <div className="space-y-4">
          <h3 className="font-medium text-white/90">Nutrition per 100g</h3>
          <div className="space-y-2">
            {Object.entries(product.nutrition).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
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
      <div className="space-y-2">
        <h3 className="font-medium text-white/90">Ingredients</h3>
        <p className="text-white/60 text-sm leading-relaxed">
          {product.ingredients.join(", ")}
        </p>
      </div>

      {/* Reviews */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <Star key={n} className="w-6 h-6 text-yellow-400 cursor-pointer" />
          ))}
        </div>
        <button className="text-sm text-primary hover:underline">
          Write a review
        </button>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-2 p-3 bg-white/5 rounded-xl hover:bg-white/10">
          <Heart className="w-5 h-5" />
          <span className="text-white/90">Add to Favorites</span>
        </button>
        <button className="flex items-center justify-center gap-2 p-3 bg-white/5 rounded-xl hover:bg-white/10">
          <Info className="w-5 h-5" />
          <span className="text-white/90">How do we rate</span>
        </button>
        <button className="flex items-center justify-center gap-2 p-3 bg-white/5 rounded-xl hover:bg-white/10 text-red-400">
          <Trash2 className="w-5 h-5" />
          <span>Delete</span>
        </button>
        <button className="flex items-center justify-center gap-2 p-3 bg-white/5 rounded-xl hover:bg-white/10">
          <Flag className="w-5 h-5" />
          <span className="text-white/90">Report an issue</span>
        </button>
      </div>
    </div>
  );
}

export default IngredientList;
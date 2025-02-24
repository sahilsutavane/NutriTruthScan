
import { Star, ChevronDown, ChevronLeft, Heart, Flag, Trash2, Info, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import type { Product } from '@shared/schema';

interface Props {
  product: Product;
}

export function IngredientList({ product }: Props) {
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-white/5 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-semibold">{product.name}</h1>
      </div>

      {/* Product Image & Size */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-48 h-48 bg-white/5 rounded-xl flex items-center justify-center">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="w-40 h-40 object-contain" />
          ) : (
            <div className="text-white/20">No image</div>
          )}
        </div>
        <span className="text-white/60">{product.size}</span>
      </div>

      {/* Scores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 p-4 rounded-xl">
          <h3 className="font-medium mb-2">NUTRI-SCORE</h3>
          <div className="flex gap-2">
            {['A', 'B', 'C', 'D', 'E'].map((score) => (
              <div
                key={score}
                className={`flex-1 py-2 text-center rounded ${
                  product.analysis.nutriScore === score
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-white/10'
                }`}
              >
                {score}
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white/5 p-4 rounded-xl">
          <h3 className="font-medium mb-2">NOVA SCORE</h3>
          <div className="text-3xl font-bold text-center">
            {product.analysis.novaScore}/4
          </div>
        </div>

        <div className="bg-white/5 p-4 rounded-xl">
          <h3 className="font-medium mb-2">FOOD-SCORE</h3>
          <div className="text-3xl font-bold text-center">
            {product.analysis.foodScore}/100
          </div>
        </div>
      </div>

      {/* Additives */}
      <div className="space-y-4">
        <h3 className="font-medium">Additives</h3>
        <div className="flex flex-wrap gap-2">
          {product.additives.map((additive) => (
            <span key={additive} className="px-3 py-1 bg-white/10 rounded-full text-sm">
              {additive}
            </span>
          ))}
        </div>
      </div>

      {/* Nutrition */}
      <div className="space-y-4">
        <h3 className="font-medium">Nutrition per 100g</h3>
        <div className="space-y-2">
          {Object.entries(product.nutrition).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="capitalize">{key}</span>
              <div className="flex items-center gap-2">
                <span>{value}</span>
                <ChevronDown className="w-4 h-4 text-white/60" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ingredients */}
      <div className="space-y-2">
        <h3 className="font-medium">Ingredients</h3>
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
        <button className="text-sm text-primary-500 hover:underline">
          Write a review
        </button>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-2 p-3 bg-white/5 rounded-xl hover:bg-white/10">
          <Heart className="w-5 h-5" />
          <span>Add to Favorites</span>
        </button>
        <button className="flex items-center justify-center gap-2 p-3 bg-white/5 rounded-xl hover:bg-white/10">
          <Info className="w-5 h-5" />
          <span>How do we rate</span>
        </button>
        <button className="flex items-center justify-center gap-2 p-3 bg-white/5 rounded-xl hover:bg-white/10 text-red-400">
          <Trash2 className="w-5 h-5" />
          <span>Delete</span>
        </button>
        <button className="flex items-center justify-center gap-2 p-3 bg-white/5 rounded-xl hover:bg-white/10">
          <Flag className="w-5 h-5" />
          <span>Report an issue</span>
        </button>
      </div>
    </div>
  );
}

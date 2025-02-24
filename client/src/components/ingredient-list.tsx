
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import type { Product } from '@shared/schema';

interface IngredientListProps {
  product: Product;
}

export default function IngredientList({ product }: IngredientListProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className={`
          px-4 py-2 rounded-full text-sm font-medium shadow-lg
          ${product.analysis.riskLevel === 'low' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 
            product.analysis.riskLevel === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : 
            'bg-red-500/20 text-red-400 border border-red-500/30'}
        `}>
          {product.analysis.riskLevel.charAt(0).toUpperCase() + product.analysis.riskLevel.slice(1)} Risk Level
        </div>
      </div>

      {product.analysis.warnings.length > 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 shadow-lg">
          <h3 className="font-medium flex items-center gap-2 text-yellow-400">
            <AlertCircle className="h-5 w-5" />
            Warnings
          </h3>
          <ul className="mt-3 space-y-2">
            {product.analysis.warnings.map((warning, i) => (
              <li key={i} className="text-sm text-yellow-200/80">{warning}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 shadow-lg">
          <h3 className="font-medium flex items-center gap-2 text-green-400">
            <CheckCircle className="h-5 w-5" />
            Safe Ingredients
          </h3>
          <ul className="mt-3 space-y-2">
            {product.analysis.goodIngredients.map((ingredient, i) => (
              <li key={i} className="text-sm text-green-200/80">{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 shadow-lg">
          <h3 className="font-medium flex items-center gap-2 text-red-400">
            <XCircle className="h-5 w-5" />
            Ingredients to Watch
          </h3>
          <ul className="mt-3 space-y-2">
            {product.analysis.badIngredients.map((ingredient, i) => (
              <li key={i} className="text-sm text-red-200/80">{ingredient}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-lg">
        <h3 className="font-medium text-white/90">Complete Ingredients List</h3>
        <p className="text-sm mt-3 text-white/60 leading-relaxed">
          {product.ingredients.join(", ")}
        </p>
      </div>
    </div>
  );
}

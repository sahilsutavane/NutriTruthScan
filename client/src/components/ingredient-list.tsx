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
          px-4 py-2 rounded-full text-sm font-medium
          ${product.analysis.riskLevel === 'low' ? 'bg-green-500/20 text-green-400' : 
            product.analysis.riskLevel === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 
            'bg-red-500/20 text-red-400'}
        `}>
          {product.analysis.riskLevel.charAt(0).toUpperCase() + product.analysis.riskLevel.slice(1)} Risk Level
        </div>
      </div>

      {product.analysis.warnings.length > 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
          <h3 className="font-medium flex items-center gap-2 text-yellow-400">
            <AlertCircle className="h-4 w-4" />
            Warnings
          </h3>
          <ul className="mt-2 space-y-1">
            {product.analysis.warnings.map((warning, i) => (
              <li key={i} className="text-sm text-yellow-200/80">{warning}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <h3 className="font-medium flex items-center gap-2 text-green-400">
            <CheckCircle className="h-4 w-4" />
            Safe Ingredients
          </h3>
          <ul className="mt-2 space-y-1">
            {product.analysis.goodIngredients.map((ingredient, i) => (
              <li key={i} className="text-sm text-green-200/80">{ingredient}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium flex items-center gap-2 text-red-400">
            <XCircle className="h-4 w-4" />
            Ingredients to Watch
          </h3>
          <ul className="mt-2 space-y-1">
            {product.analysis.badIngredients.map((ingredient, i) => (
              <li key={i} className="text-sm text-red-200/80">{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t border-white/10">
          <h3 className="font-medium text-white/90">Complete Ingredients List</h3>
          <p className="text-sm mt-2 text-white/60">
            {product.ingredients.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}
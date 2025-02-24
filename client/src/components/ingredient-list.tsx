import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import type { Product } from '@shared/schema';

interface IngredientListProps {
  product: Product;
}

export default function IngredientList({ product }: IngredientListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className={`
          px-3 py-1 rounded-full text-sm font-medium
          ${product.analysis.riskLevel === 'low' ? 'bg-green-100 text-green-800' : 
            product.analysis.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
            'bg-red-100 text-red-800'}
        `}>
          {product.analysis.riskLevel.charAt(0).toUpperCase() + product.analysis.riskLevel.slice(1)} Risk
        </div>
      </div>

      {product.analysis.warnings.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-medium flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Warnings
          </h3>
          <ul className="mt-2 space-y-1">
            {product.analysis.warnings.map((warning, i) => (
              <li key={i} className="text-sm">{warning}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <h3 className="font-medium flex items-center gap-2 text-green-700">
            <CheckCircle className="h-4 w-4" />
            Good Ingredients
          </h3>
          <ul className="mt-2 space-y-1">
            {product.analysis.goodIngredients.map((ingredient, i) => (
              <li key={i} className="text-sm">{ingredient}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium flex items-center gap-2 text-red-700">
            <XCircle className="h-4 w-4" />
            Ingredients to Avoid
          </h3>
          <ul className="mt-2 space-y-1">
            {product.analysis.badIngredients.map((ingredient, i) => (
              <li key={i} className="text-sm">{ingredient}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium">Full Ingredients List</h3>
          <p className="text-sm mt-2">
            {product.ingredients.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}

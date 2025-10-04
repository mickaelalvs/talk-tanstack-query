"use client";

import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import {
  addToCart,
  optimisticAddToCart,
} from "@/app/nantes-shop/_stores/cartSlice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppDispatch } from "@/lib/hooks";
import type { Product } from "./types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(
      optimisticAddToCart({
        productId: product.id,
        quantity: 1,
        product: product,
      }),
    );
    dispatch(addToCart({ productId: product.id, quantity: 1 }));
  };

  return (
    <div>
      <Card className="overflow-hidden transition-all duration-300 border-0 shadow-md rounded-2xl h-full">
        <div className="flex h-full">
          {/* Left Image Section - Compact */}
          <div className="w-32 sm:w-36 h-48 relative overflow-hidden flex-shrink-0">
            <Image
              src={`/nantes-shop${product.image}` || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500"
              width={128}
              height={128}
            />
            {/* Badges positioned on image */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.isPromotion && (
                <Badge className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  PROMO
                </Badge>
              )}
              {!product.inStock && (
                <Badge className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  RUPTURE
                </Badge>
              )}
            </div>
          </div>

          {/* Right Content Section */}
          <div className="flex-1 p-4 flex flex-col justify-between">
            {/* Product Info */}
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight mb-1 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-3">
                {product.category}
              </p>

              {/* Price - Prominent display */}
              <div className="mb-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {product.price.toFixed(2)}€
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {product.originalPrice.toFixed(2)}€
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
                {product.description}
              </p>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-semibold text-gray-700">
                    {product.rating}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  ({product.reviews} avis)
                </span>
              </div>
            </div>

            <div className="mt-auto">
              <Button
                className={`w-full py-2 rounded-lg font-medium text-sm transition-all duration-300 border ${
                  product.inStock
                    ? "bg-transparent text-gray-900 border-gray-300 hover:bg-gray-50"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                }`}
                disabled={!product.inStock}
                variant="outline"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {product.inStock ? "AJOUTER AU PANIER" : "INDISPONIBLE"}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

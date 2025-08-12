// src/components/products/ProductCard.tsx
import React, { useState } from "react";
import { Star, Package, TrendingUp, Image as ImageIcon } from "lucide-react";
import { Product } from "../../types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageError, setImageError] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const getStatusColor = (status: Product["status"]): string => {
    switch (status.toLowerCase()) {
      case "in stock":
        return "bg-green-100 text-green-800";
      case "low stock":
        return "bg-yellow-100 text-yellow-800";
      case "out of stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderStars = (rating: number): JSX.Element[] => {
    const stars: JSX.Element[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-4 w-4 fill-yellow-200 text-yellow-400" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Product Image with Error Handling */}
      <div className="relative aspect-w-16 aspect-h-12 bg-gray-200 h-48">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        )}

        {imageError ? (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Image not available</p>
            </div>
          </div>
        ) : (
          <img
            src={
              product.image ||
              "https://via.placeholder.com/300x200/e5e7eb/9ca3af?text=No+Image"
            }
            alt={product.name}
            className="w-full h-48 object-cover"
            onError={handleImageError}
            onLoad={handleImageLoad}
            style={{ display: imageLoading ? "none" : "block" }}
          />
        )}
      </div>

      {/* Rest of the component remains the same */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
            {product.category}
          </span>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
              product.status
            )}`}
          >
            {product.status}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="flex items-center mb-3">
          <div className="flex items-center">{renderStars(product.rating)}</div>
          <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="text-2xl font-bold text-gray-900">
            ${product.price}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Package className="h-4 w-4 mr-1" />
            {product.stock} in stock
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
            {product.sales} sold
          </div>
        </div>

        <div className="flex space-x-2">
          <button className="flex-1 bg-primary-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500">
            Edit Product
          </button>
          <button className="flex-1 bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

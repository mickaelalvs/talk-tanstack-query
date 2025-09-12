import { type NextRequest, NextResponse } from "next/server";
import { Product } from "@/app/nantes-shop/_components/types";
import { createProduct, getAllProducts } from "@/lib/database";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract query parameters
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "Tous";
    const minPrice = parseFloat(searchParams.get("minPrice") || "0");
    const maxPrice = parseFloat(searchParams.get("maxPrice") || "75000000");
    const sortBy = searchParams.get("sortBy") || "name";
    const showPromotions = searchParams.get("showPromotions") === "true";
    const showInStock = searchParams.get("showInStock") === "true";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "6");

    // Get all products from database
    const allProducts = getAllProducts();

    // Filter products
    const filteredProducts = allProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        category === "Tous" || product.category === category;
      const matchesPrice =
        product.price >= minPrice && product.price <= maxPrice;
      const matchesPromotion = !showPromotions || product.isPromotion;
      const matchesStock = !showInStock || product.inStock;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesPromotion &&
        matchesStock
      );
    });

    // Sort products
    filteredProducts.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    // Pagination
    const totalItems = filteredProducts.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return NextResponse.json({
      products: paginatedProducts,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      filters: {
        search,
        category,
        minPrice,
        maxPrice,
        sortBy,
        showPromotions,
        showInStock,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

// POST endpoint for creating new products
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "name",
      "description",
      "price",
      "category",
      "image",
      "rating",
      "reviews",
      "inStock",
      "isPromotion",
      "tags",
    ];
    for (const field of requiredFields) {
      if (body[field] === undefined) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 },
        );
      }
    }

    // Create product in database
    const newProduct = createProduct({
      name: body.name,
      description: body.description,
      price: body.price,
      originalPrice: body.originalPrice,
      category: body.category,
      image: body.image,
      rating: body.rating,
      reviews: body.reviews,
      inStock: body.inStock,
      isPromotion: body.isPromotion,
      tags: body.tags,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 },
    );
  }
}

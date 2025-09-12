export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isPromotion: boolean;
  tags: string[];
}

export const categories = [
  "Tous",
  "Vins",
  "Biscuits",
  "Pâtisseries",
  "Fromages",
  "Confiseries",
  "Légumes",
  "Sauces",
  "Monuments",
  "Transport",
  "Parcs",
];

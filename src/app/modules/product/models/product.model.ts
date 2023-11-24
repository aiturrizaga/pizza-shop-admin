import { Category } from '../../category/models/category.model';

export class Product {
  id: number | undefined;
  name: string | undefined;
  description?: string;
  imageUrl?: string;
  rating?: number;
  category: Category | undefined;
  slug?: string;
  price: number | undefined;
  active: boolean | undefined;
}

export class ProductDTO {
  name: string | undefined;
  description?: string;
  imageUrl?: string;
  rating?: number;
  categoryId: number | undefined;
  slug?: string;
  price: number | undefined;
}

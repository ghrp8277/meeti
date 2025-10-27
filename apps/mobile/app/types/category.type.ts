export interface Category {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  parentId?: number;
  createdAt: string;
  updatedAt: string;
}

export interface SubCategory {
  id: number;
  name: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryWithSubCategories {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  parentId?: number;
  subCategories: SubCategory[];
  createdAt: string;
  updatedAt: string;
}

export interface CategoryResponse {
  success: boolean;
  data: Category[];
}

export interface SubCategoryResponse {
  success: boolean;
  data: CategoryWithSubCategories;
}

import api from "@/lib/api";
import {
  Category,
  CategoryResponse,
  CategoryWithSubCategories,
  SubCategoryResponse,
} from "@/app/types/category.type";

export async function fetchCategories(): Promise<CategoryResponse> {
  const response = await api.get<Category[]>("/categories");

  return {
    success: response.success,
    data: response.data,
  };
}

export async function fetchCategoryWithSubCategories(
  categoryId: number
): Promise<SubCategoryResponse> {
  const response = await api.get<CategoryWithSubCategories>(
    `/categories/${categoryId}`
  );

  return {
    success: response.success,
    data: response.data,
  };
}

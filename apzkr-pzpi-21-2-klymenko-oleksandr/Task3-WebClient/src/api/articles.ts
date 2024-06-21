import { api } from "@/lib/axios";
import { Article } from "@/types/models";
import { CreateArticleDto } from "@/types/dto";
import { transformToFormData } from "@/utils/transform";

export const getArticles = async (): Promise<Article[]> => {
  try {
    const response = await api.get("/articles");
    return response.data;
  } catch (e: unknown) {
    throw new Error(`Could not fetch articles: ${e}`);
  }
};

export const createArticle = async (article: CreateArticleDto) => {
  try {
    const formData = transformToFormData(article);
    const response = await api.post("/articles", formData);
    return response.data;
  } catch (e: unknown) {
    throw new Error(`Could not create a article: ${e}`);
  }
};

export const updateArticle = async (
  article: Partial<CreateArticleDto> & { id: string }
) => {
  try {
    const formData = transformToFormData(article);
    const response = await api.patch(`articles/${article.id}`, formData);
    return response.data;
  } catch (e: unknown) {
    throw new Error(`Could not update the article ${article.id}: ${e}`);
  }
};

export const deleteArticle = async (id: string) => {
  try {
    const response = await api.delete(`articles/${id}`);
    return response.data;
  } catch (e: unknown) {
    throw new Error(`Could not delete the article ${id}: ${e}`);
  }
};

export type CreateArticleDto = {
  title: string;
  content: string;
  coverFile: File;
  tags: string[];
};

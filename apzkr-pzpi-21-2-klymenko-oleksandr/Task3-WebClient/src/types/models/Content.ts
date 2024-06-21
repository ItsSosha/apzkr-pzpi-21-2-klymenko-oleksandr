import { User } from "./User";

export type Article = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  cover: string;
  author: User;
};

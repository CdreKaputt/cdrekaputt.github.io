import type Author from "./author";
import type Tag from "./tag";

export default interface Post {
  title: string;
  excerpt: string;
  date: Date;
  href: string | URL;
  author: Author;
  category: Tag;
  tags: Tag[];
}

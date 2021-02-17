export type ArticleTranslatableProp = 'title' | 'body' | 'preview'; // list props

export interface ArticleTranslatableFieldI {
  lang: string;
  content: string;
}

export interface ArticleI {
  _id?: string;
  title: ArticleTranslatableFieldI[];
  author: string;
  body: ArticleTranslatableFieldI[];
  preview: ArticleTranslatableFieldI[];
  img: string;
  marks: {user: string, rate: number}[];
  comments: {author: string, body: string, timestamp?: Date}[];
  tags: string[];
}

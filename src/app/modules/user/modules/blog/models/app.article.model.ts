export type ArticleTranslatableProp = 'title' | 'body' | 'preview'; // list props

export interface ArticleTranslatableFieldI {
  lang: string;
  content: string;
}

export interface ArticleI {
  _id?: string;
  title: ArticleTranslatableFieldI[];
  author: {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
  };
  body: ArticleTranslatableFieldI[];
  preview: ArticleTranslatableFieldI[];
  img: string;
  marks: {user: string, rate: number}[];
  tags: string[];
}

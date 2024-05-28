export type TPostInfo = {
  title: string;
  description: string;
  publishedAt: string;
  keywords: TKeyword[];
  path: string;
  series: string | null;
};

export type TSeries = {
  title: string;
  desc: string | null;
  lastPublished: string;
  path: string;
  posts: TPostInfo[];
};

export type TKeyword = {
  title: string;
  path: string;
};

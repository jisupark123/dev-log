export type TPost = {
  title: string;
  description: string;
  publishedAt: string;
  keywords: string[];
  path: string;
};

export type TSeries = {
  title: string;
  desc: string | null;
  lastPublished: string;
  path: string;
  posts: TPost[];
};

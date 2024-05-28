import { Post } from '@/.contentlayer/generated';
import { TKeyword } from '@/types/postTypes';
import { stringToPath } from './seriesPath';

export default function getAllKeywords(allPosts: Post[]): TKeyword[] {
  return allPosts.reduce((acc, post) => {
    post.keywords.forEach((keyword) => {
      if (!acc.find((k) => k.title === keyword)) {
        acc.push({ title: keyword, path: `/keywords/${stringToPath(keyword)}` });
      }
    });
    return acc;
  }, [] as { title: string; path: string }[]);
}

import { Post } from '@/.contentlayer/generated';
import { TPostInfo } from '@/types/postTypes';
import { stringToPath } from './seriesPath';

// 시리즈별로 포스트 그룹핑
export default function getPostsGroupbySeries(posts: Post[]) {
  const result: { [key: string]: TPostInfo[] } = {};
  posts.forEach((post) => {
    if (post.series) {
      const postInfo = {
        title: post.title,
        description: post.description,
        publishedAt: post.publishedAt,
        keywords: post.keywords.map((k) => ({ title: k, path: `/keywords/${stringToPath(k)}` })) || [],
        path: post.path,
        series: post.series || null,
      };
      if (result[post.series]) {
        result[post.series].push(postInfo);
      } else {
        result[post.series] = [postInfo];
      }
    }
  });

  return result;
}

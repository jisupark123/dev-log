import { Post } from '@/.contentlayer/generated';

// 시리즈별로 마지막 업데이트된 날짜를 가져오는 함수
export default function getLastPublishedDateBySeries(posts: Post[]) {
  const result: { [series: string]: string } = {};
  posts.forEach((post) => {
    const { series, publishedAt } = post;
    if (!series) return;
    if (!result[series]) {
      result[series] = publishedAt;
    } else {
      if (result[series] < publishedAt) {
        result[series] = publishedAt;
      }
    }
  });
  return result;
}

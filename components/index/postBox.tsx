import Link from 'next/link';
import { useRouter } from 'next/router';

export type PostInfoType = {
  title: string;
  description: string;
  publishedAt: string;
  keywords: string[];
  path: string;
};

export default function PostBox(post: PostInfoType) {
  const router = useRouter();
  return (
    <article
      onClick={() => router.push(`/posts/${post.path}`)}
      className='v-box w-full px-30 py-20 max-w-[700px] cursor-pointer'
    >
      <h3 className='text-22 font-bold text-blue mb-10'>{post.title}</h3>
      <div className='text-14 mb-20'>{post.description}</div>
      <div className='flex-between'>
        <span className='text-14'>{post.publishedAt}</span>
        <div className='flex-center gap-3'>
          {post.keywords.map((keyword) => (
            <button
              key={keyword}
              // href={`/keywords/${keyword}`}
              className='bg-page1 text-blue py-3 px-10 rounded-20 text-14 hover:bg-page2'
              onClick={() => router.push(`/keywords/${keyword}`)}
            >
              {keyword}
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}

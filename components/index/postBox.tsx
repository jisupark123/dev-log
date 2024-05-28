import { TPostInfo } from '@/types/postTypes';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function PostBox(post: TPostInfo) {
  return (
    <Link href={post.path} className='v-box w-full px-30 py-20 cursor-pointer'>
      <h3 className='text-22 font-bold text-blue mb-10'>{post.title}</h3>
      <div className='text-14 mb-20'>{post.description}</div>
      <div className='flex-between'>
        <span className='text-14 text-gray shrink-0'>{post.publishedAt}</span>
        <div className='flex-center gap-3 flex-wrap'>
          {post.keywords.map((keyword) => (
            <Link
              key={keyword.title}
              href={keyword.path}
              className='bg-page1 text-blue py-3 px-10 rounded-20 text-14 hover:bg-page2'
            >
              {keyword.title}
            </Link>
          ))}
        </div>
      </div>
    </Link>
  );
}

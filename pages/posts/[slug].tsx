import React, { useState } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { allPosts, Post as TPost } from '@/.contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import Bookmark from '../../assets/icons/bookmark.svg';
import ChevronDown from '../../assets/icons/chevron_down.svg';
import ChevronUp from '../../assets/icons/chevron_up.svg';
import ChevronLeft from '../../assets/icons/chevron_left.svg';
import ChevronRight from '../../assets/icons/chevron_right.svg';
import { TSeries } from '@/types/postTypes';
import Page404 from '../404';
import Link from 'next/link';
import { cls } from '@/utils/cls';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import { stringToPath } from '@/utils/seriesPath';
interface Props {
  post: TPost;
  series?: Pick<TSeries, 'title' | 'path'>[];
  currenSeriesIndex?: number;
}

const Post = ({ post, series, currenSeriesIndex }: Props) => {
  const router = useRouter();
  const [showSeriesList, setShowSeriesList] = useState(false);
  const MDXComponent = useMDXComponent(post.body.code);
  if (!post) {
    return <Page404 />;
  }
  const onMovePage = (move: 'before' | 'after') => {
    if (move === 'before') {
      if (currenSeriesIndex !== 0) router.push(series![currenSeriesIndex! - 1].path);
    } else {
      if (currenSeriesIndex !== series!.length - 1) router.push(series![currenSeriesIndex! + 1].path);
    }
  };
  return (
    <Layout metaTitle={post.title} metaDescription={post.description}>
      <div className=' w-full'>
        {series && (
          <section className='max-w-[1024px] mx-auto w-full post-box py-20 px-30 mb-30'>
            <div className='flex items-center gap-20 mb-60'>
              <Bookmark width='34' height='43' color='#6B7AF7' />
              <h4 className='text-32 font-semibold'>{post.series}</h4>
            </div>
            <div className='flex justify-between items-center'>
              <button className='flex items-center gap-10' onClick={() => setShowSeriesList((prev) => !prev)}>
                {showSeriesList ? <ChevronUp /> : <ChevronDown />}
                <span className='text-18 font-normal text-gray hover:text-black'>
                  {showSeriesList ? '숨기기' : '목록 보기'}
                </span>
              </button>
              <div className='flex items-center gap-20'>
                <span className='text-18 font-normal text-gray'>
                  {currenSeriesIndex! + 1} / {series.length}
                </span>
                <div className='flex items-center justify-center gap-5'>
                  <button
                    className='flex justify-center items-center p-6 bg-page1 rounded-full hover:bg-lightGray disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-page1'
                    disabled={currenSeriesIndex === 0}
                    onClick={() => onMovePage('before')}
                  >
                    <ChevronLeft width='20' height='20' />
                  </button>
                  <button
                    className='flex justify-center items-center p-6 bg-page1 rounded-full hover:bg-lightGray disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-page1'
                    disabled={currenSeriesIndex === series.length - 1}
                    onClick={() => onMovePage('after')}
                  >
                    <ChevronRight width='20' height='20' />
                  </button>
                </div>
              </div>
            </div>
            {showSeriesList && (
              <div className='flex flex-col gap-10 mt-20 text-18'>
                {series.map((s, i) => (
                  <Link key={s.path} href={s.path} className='flex items-center gap-10'>
                    <span className='text-lightGray italic'>{i + 1}.</span>
                    <span
                      className={cls('hover:text-blue text-18', currenSeriesIndex === i ? 'text-blue' : 'text-gray')}
                    >
                      {s.title}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </section>
        )}
        <section className='p-40 w-full max-w-[1024px] mx-auto prose post-box'>
          <h1>{post.title}</h1>
          <div className='flex items-center gap-7 mb-50'>
            {post.keywords.map((keyword) => (
              <Link
                key={keyword}
                href={`/keywords/${stringToPath(keyword)}`}
                className='bg-page1 text-blue py-3 px-10 rounded-20 text-14 hover:bg-page2 no-underline'
              >
                {keyword}
              </Link>
            ))}
          </div>
          <MDXComponent />
        </section>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allPosts.map((p) => ({ params: { slug: p._raw.flattenedPath } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const post = allPosts.find((p) => p._raw.flattenedPath === params?.slug);
  if (!post?.series) {
    return {
      props: { post },
    };
  }
  const series = allPosts
    .filter((p) => p.series === post.series)
    .sort((a, b) => Number(new Date(a.publishedAt)) - Number(new Date(b.publishedAt)))
    .map((p) => ({
      ...p,
      keywords: p.keywords.map((k) => ({ title: k, path: `/keywords/${stringToPath(k)}` })) || [],
    }));
  const currenSeriesIndex = series.findIndex((p) => p._raw.flattenedPath === params?.slug);
  return {
    props: { post, series, currenSeriesIndex },
  };
};

export default Post;

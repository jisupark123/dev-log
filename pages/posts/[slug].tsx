import React from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { allPosts, Post as TPost } from '@/.contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import Link from 'next/link';

interface Props {
  post: TPost;
}

const Post = ({ post }: Props) => {
  const MDXComponent = useMDXComponent(post.body.code);
  return (
    <div className=' w-full'>
      <div className='p-40 mx-auto w-full prose max-w-[1024px] post-box'>
        <a href={'/'}>
          <a href={'/3'}></a>
        </a>
        <h1>{post.title}</h1>
        <MDXComponent />
      </div>
    </div>
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
  return {
    props: { post },
  };
};

export default Post;

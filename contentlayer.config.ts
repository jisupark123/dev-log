import { defineDocumentType, defineNestedType, makeSource } from 'contentlayer/source-files';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const options = {
  theme: 'github-dark',
};

export const Post = defineDocumentType(() => ({
  name: 'Post',
  contentType: 'mdx',
  filePathPattern: `**/*.mdx`,
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    publishedAt: { type: 'string', required: true },
    keywords: { type: 'list', of: { type: 'string' }, required: false, default: [] },
    series: { type: 'string', required: false },
  },
  computedFields: {
    path: {
      type: 'string',
      resolve: (p) => `/posts/${p._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: 'posts', // 소스를 읽어올 path
  documentTypes: [Post], // 생성할 타입
  mdx: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypePrettyCode, options], rehypeKatex as any],
  },
});

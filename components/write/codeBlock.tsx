import { TCodeLanguage } from '@/types/codeLanguage';
import { HTMLAttributes } from 'react';
import { Transforms } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';

export default function CodeBlock({
  textAlign,
  element,
  ...props
}: {
  textAlign: any;
  element: any;
} & HTMLAttributes<HTMLElement>) {
  const editor = useSlate();
  const setLanguage = (language: string) => {
    const path = ReactEditor.findPath(editor, element);
    Transforms.setNodes(editor, { language }, { at: path });
  };
  return (
    <div>
      <pre className='relative pt-30'>
        <code
          data-language='python'
          data-theme='default'
          spellCheck='false'
          translate='no'
          style={{ ...props.style, textAlign }}
        >
          <LanguageSelect
            defaultValue={'python'}
            value={element.language}
            onChange={(e) => setLanguage(e.target.value)}
          />
          {props.children}
        </code>
      </pre>
    </div>
  );
}

function LanguageSelect(props: JSX.IntrinsicElements['select']) {
  return (
    <select
      data-test-id='language-select'
      contentEditable={false}
      className='absolute top-10 right-10 z-10 bg-[#1F2937] outline-none text-page1 cursor-pointer'
      {...props}
    >
      {Object.keys(languageAlias).map((language) => (
        <option key={language} value={languageAlias[language]} className='bg-none'>
          {language}
        </option>
      ))}
    </select>
  );
}

const languageAlias: { [key: string]: TCodeLanguage } = {
  C: 'c',
  'C++': 'cpp',
  'C#': 'cs',
  CSS: 'css',
  Dart: 'dart',
  HTML: 'html',
  Java: 'java',
  JavaScript: 'javascript',
  JSON: 'json',
  Kotlin: 'kotlin',
  Markdown: 'markdown',
  Python: 'python',
  SQL: 'sql',
  Swift: 'swift',
  TypeScript: 'typescript',
};

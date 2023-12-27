import React, { useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Descendant, createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';
import isHotkey from 'is-hotkey';
import { toggleMark } from '@/lib/client/write/toggleMark';
import useUser from '@/recoil/user/useUser';
import SlateElement from '@/components/write/slateElement';
import SlateLeaf from '@/components/write/slateLeaf';
import HOTKEYS from '@/constants/hotkeys';
import BlockBtn from '@/components/write/blockBtn';
import MarkBtn from '@/components/write/markBtn';
import PluginBtn from '@/components/write/pluginBtn';
import Underline from '@/components/underline';

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '오늘의 이야기...' }],
  },
];

export default function Write() {
  const { isAdmin } = useUser();
  const router = useRouter();
  const renderElement = useCallback((props: any) => <SlateElement {...props} />, []);
  const renderLeaf = useCallback((props: any) => <SlateLeaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  useEffect(() => {
    if (!isAdmin) {
      router.replace('/');
    }
  }, [router, isAdmin]);
  return (
    <div className='p-40 mx-auto w-full min-h-[calc(100vh-124px)] max-w-[1024px] post-box'>
      {/* 제목 */}
      <input
        type='text'
        autoComplete='off'
        spellCheck='false'
        placeholder='제목을 입력하세요'
        className='w-full mb-50 p-20 text-48 font-bold box-border placeholder:text-page1'
        style={{ borderBottom: '1px solid #f0f0f5' }}
      />
      {/* 태그 */}
      <input
        type='text'
        autoComplete='off'
        spellCheck='false'
        placeholder='태그를 입력하세요. (쉼표로 구분)'
        className='w-full mb-50 py-10 px-20 text-24 box-border placeholder:text-page1'
        style={{ borderBottom: '1px solid #f0f0f5' }}
      />

      <div className='flex flex-col items-start'>
        <Slate editor={editor} initialValue={initialValue}>
          {/* Tools */}
          <div className='flex justify-center items-center bg-indigo font-bold text-white py-8 px-20 rounded-8 mb-20'>
            Tools
          </div>
          <div className='flex items-center mb-30'>
            <BlockBtn format='heading-one' className='mr-10' />
            <BlockBtn format='heading-two' className='mr-10' />
            <BlockBtn format='heading-three' className='mr-20' />
            <div className='w-1 h-30 bg-page1 mr-20'></div>
            <MarkBtn format='bold' className='mr-10' />
            <MarkBtn format='italic' className='mr-10' />
            <MarkBtn format='underline' className='mr-10' />
            <MarkBtn format='strikethrough' className='mr-10' />
            <MarkBtn format='code' className='mr-20' />
            <div className='w-1 h-30 bg-page1 mr-20'></div>
            <BlockBtn format='bulleted-list' className='mr-10' />
            <BlockBtn format='numbered-list' className='mr-10' />
            <BlockBtn format='image' className='mr-10' />
            <BlockBtn format='youtube' className='mr-10' />
            <BlockBtn format='code-block' className='mr-10' />
            <BlockBtn format='link' className='mr-10' />
            <BlockBtn format='block-quote' className='mr-10' />
            <BlockBtn format='hbar' />
          </div>
          {/* Plugins */}
          <div className='flex justify-center items-center bg-danger font-bold text-white py-8 px-20 rounded-8 mb-20'>
            Plugins
          </div>
          <div className='flex items-center mb-30'>
            <PluginBtn format='spell-check' />
          </div>
          <Underline className='bg-page1 mb-30' />
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder='오늘의 이야기...'
            autoFocus
            onKeyDown={(event) => {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event as any)) {
                  event.preventDefault();
                  const mark = HOTKEYS[hotkey];
                  toggleMark(editor, mark);
                }
              }
            }}
            className='w-full h-full outline-none prose'
          ></Editable>
        </Slate>
      </div>
    </div>
  );
}

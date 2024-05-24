import { TPluginFormat } from '@/types/editor';
import BlockBtn from './blockBtn';
import CodeBlockBtn from './codeBlockBtn';
import ListBlockBtn from './listBlockBtn';
import MarkBtn from './markBtn';
import PluginBtn from './pluginBtn';
import ImageBlockBtn from './imageBlockBtn';

export default function Tools({
  activatedPlugin,
  setActivatedPlugin,
}: {
  activatedPlugin: TPluginFormat | null;
  setActivatedPlugin: React.Dispatch<React.SetStateAction<TPluginFormat | null>>;
}) {
  return (
    <>
      {/* <div className=' flex justify-center items-center bg-indigo font-bold text-white py-8 px-20 rounded-8 mb-20'>
        Tools
      </div> */}
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
        <ListBlockBtn format='bulleted-list' className='mr-10' />
        <ListBlockBtn format='numbered-list' className='mr-10' />
        <ImageBlockBtn format='image' className='mr-10' />
        <BlockBtn format='youtube' className='mr-10' />
        <CodeBlockBtn format='code-block' className='mr-10' />
        <BlockBtn format='link' className='mr-10' />
        <BlockBtn format='block-quote' className='mr-10' />
        <BlockBtn format='hbar' className='mr-20' />
        <div className='w-1 h-30 bg-page1 mr-20'></div>
        <PluginBtn
          format='spell-check'
          activatedPlugin={activatedPlugin}
          setActivatedPlugin={setActivatedPlugin}
          className='mr-10'
        />
        <PluginBtn format='preview' activatedPlugin={activatedPlugin} setActivatedPlugin={setActivatedPlugin} />
      </div>
    </>
  );
}

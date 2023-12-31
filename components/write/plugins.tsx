import { TPluginFormat } from '@/types/editor';
import PluginBtn from './pluginBtn';

export default function Plugins({
  activatedPlugin,
  setActivatedPlugin,
}: {
  activatedPlugin: TPluginFormat | null;
  setActivatedPlugin: React.Dispatch<React.SetStateAction<TPluginFormat | null>>;
}) {
  return (
    <>
      <div className='flex justify-center items-center bg-danger font-bold text-white py-8 px-20 rounded-8 mb-20'>
        Plugins
      </div>
      <div className='flex items-center mb-30'>
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

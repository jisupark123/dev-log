import { isMarkActive } from '@/lib/client/write/isMarkActive';
import { toggleMark } from '@/lib/client/write/toggleMark';
import { TPluginFormat } from '@/types/editor';
import { useSlate } from 'slate-react';
import BaseBtn from './baseBtn';

// bold, italic, underline, strikeThrough
export default function PluginBtn({
  format,
  activatedPlugin,
  setActivatedPlugin,
  ...props
}: {
  format: TPluginFormat;
  activatedPlugin: TPluginFormat | null;
  setActivatedPlugin: React.Dispatch<React.SetStateAction<TPluginFormat | null>>;
} & React.HTMLAttributes<HTMLButtonElement>) {
  const editor = useSlate();
  return (
    <BaseBtn
      {...props}
      active={activatedPlugin === format}
      format={format}
      // 1. 다른 버튼이 active 상태면 동작하지 않음
      // 2. 해당 버튼이 active 상태면 active 상태 해제
      // 3. 해당 버튼이 active 상태가 아니면 active 상태로 변경
      onMouseDown={(event) => {
        event.preventDefault();
        if (activatedPlugin !== format && activatedPlugin === null) {
          setActivatedPlugin(format);
        } else if (activatedPlugin === format) {
          setActivatedPlugin(null);
        }
      }}
    />
  );
}

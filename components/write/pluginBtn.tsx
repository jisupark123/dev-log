import { isMarkActive } from '@/lib/client/write/isMarkActive';
import { toggleMark } from '@/lib/client/write/toggleMark';
import { TPluginBtnFormat } from '@/types/editor';
import { useSlate } from 'slate-react';
import BaseBtn from './baseBtn';

// bold, italic, underline, strikeThrough
export default function PluginBtn({
  format,
  ...props
}: { format: TPluginBtnFormat } & React.HTMLAttributes<HTMLButtonElement>) {
  const editor = useSlate();
  return (
    <BaseBtn
      {...props}
      active={false}
      format={format}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    />
  );
}

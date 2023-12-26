import { isMarkActive } from '@/lib/client/write/isMarkActive';
import { toggleMark } from '@/lib/client/write/toggleMark';
import { TBlockBtnFormat } from '@/types/editor';
import { useSlate } from 'slate-react';
import BaseBtn from './baseBtn';

// bold, italic, underline, strikeThrough
export default function BlockBtn({
  format,
  ...props
}: { format: TBlockBtnFormat } & React.HTMLAttributes<HTMLButtonElement>) {
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

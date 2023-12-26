import { isMarkActive } from '@/lib/client/write/isMarkActive';
import { toggleMark } from '@/lib/client/write/toggleMark';
import { TMarkBtnFormat } from '@/types/editor';
import { useSlate } from 'slate-react';
import BaseBtn from './baseBtn';

// bold, italic, underline, strikeThrough
export default function MarkBtn({
  format,
  ...props
}: { format: TMarkBtnFormat } & React.HTMLAttributes<HTMLButtonElement>) {
  const editor = useSlate();
  return (
    <BaseBtn
      {...props}
      active={isMarkActive(editor, format)}
      format={format}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    />
  );
}

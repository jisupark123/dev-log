import { TBlockBtnFormat } from '@/types/editor';
import { useSlate } from 'slate-react';
import BaseBtn from './baseBtn';
import isBlockActive from '@/lib/client/write/isBlockActive';
import toggleCodeBlock from '@/lib/client/write/toggleCodeBlock';

// bold, italic, underline, strikeThrough
export default function CodeBlockBtn({
  format,
  ...props
}: { format: TBlockBtnFormat } & React.HTMLAttributes<HTMLButtonElement>) {
  const editor = useSlate();
  return (
    <BaseBtn
      {...props}
      active={isBlockActive(editor, format)}
      format={format}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleCodeBlock(editor);
      }}
    />
  );
}

import { TBlockFormat } from '@/types/editor';
import { useSlate } from 'slate-react';
import BaseBtn from './baseBtn';
import isBlockActive from '@/lib/client/write/isBlockActive';
import toggleImageBlock from '@/lib/client/write/toggleImageBlock';

// bold, italic, underline, strikeThrough
export default function ImageBlockBtn({
  format,
  ...props
}: { format: TBlockFormat } & React.HTMLAttributes<HTMLButtonElement>) {
  const editor = useSlate();
  return (
    <BaseBtn
      {...props}
      active={isBlockActive(editor, format)}
      format={format}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleImageBlock(editor);
      }}
    />
  );
}

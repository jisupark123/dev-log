import { toggleMark } from '@/lib/client/write/toggleMark';
import { TBlockFormat } from '@/types/editor';
import { useSlate } from 'slate-react';
import BaseBtn from './baseBtn';
import isBlockActive from '@/lib/client/write/isBlockActive';
import toggleListBlock from '@/lib/client/write/toggleListBlock';

export default function ListBlockBtn({
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
        toggleListBlock(editor, format);
      }}
    />
  );
}

import { TBlockFormat, TEditor, TMarkFormat } from '@/types/editor';
import { Editor } from 'slate';

export const isMarkActive = (editor: TEditor, format: TMarkFormat | TBlockFormat) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format as never] === true : false;
};

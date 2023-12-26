import { TBlockBtnFormat, TEditor, TMarkBtnFormat } from '@/types/editor';
import { Editor } from 'slate';

export const isMarkActive = (editor: TEditor, format: TMarkBtnFormat | TBlockBtnFormat) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format as never] === true : false;
};

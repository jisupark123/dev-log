import { TBlockFormat, TEditor, TMarkFormat, TPluginFormat } from '@/types/editor';
import { Editor } from 'slate';
import { isMarkActive } from './isMarkActive';

//
export const toggleMark = (editor: TEditor, format: TMarkFormat | TBlockFormat | TPluginFormat) => {
  const isActive = isMarkActive(editor, format as never);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

import { TBlockBtnFormat } from '@/types/editor';
import { CustomEditor, CustomElement } from '@/types/slate_custom_types';
import { Editor, Element } from 'slate';

export default function isBlockActive(editor: CustomEditor, format: TBlockBtnFormat, blockType = 'type') {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n[blockType as never] === format,
    })
  );

  return !!match;
}

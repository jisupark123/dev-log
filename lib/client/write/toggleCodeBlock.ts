import { TBlockBtnFormat } from '@/types/editor';
import { CustomEditor, CustomElement } from '@/types/slate_custom_types';
import isBlockActive from './isBlockActive';
import { Editor, Element, Transforms } from 'slate';

const toggleCodeBlock = (editor: CustomEditor) => {
  const isActive = isBlockActive(editor, 'code-block');

  if (isActive) {
    Transforms.unwrapNodes(editor, {
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'code-block',
      split: true,
    });
    Transforms.setNodes(editor, { type: 'paragraph' });
  } else {
    Transforms.wrapNodes(editor, { type: 'code-block' as TBlockBtnFormat, children: [] } as CustomElement);
  }
};

export default toggleCodeBlock;

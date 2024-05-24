import { LIST_TYPES, TBlockFormat, blockFormats, markFormats } from '@/types/editor';
import { CodeBlockElement, CustomEditor, CustomElement, ImageElement } from '@/types/slate_custom_types';
import isBlockActive from './isBlockActive';
import { Editor, Element, Transforms } from 'slate';
import { isMarkActive } from './isMarkActive';

const toggleImageBlock = (editor: CustomEditor) => {
  const isActive = isBlockActive(editor, 'image');

  // List/Code 블록이면 따로 해제 (서로 겹칠 수 없음)
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && (n.type === 'code-block' || LIST_TYPES.includes(n.type)),
    split: true,
  });

  if (isActive) {
    Transforms.unwrapNodes(editor, {
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'image',
      split: true,
    });
    Transforms.setNodes(editor, { type: 'paragraph' });
  } else {
    // Transforms.setNodes(editor, { type: 'image' });
    // Transforms.insertNodes(editor, {
    //   type: 'paragraph',
    //   children: [{ text: '' }],
    // });
    Transforms.wrapNodes(editor, {
      type: 'image',
      url: '',
      children: [],
    } as ImageElement);
  }
};

export default toggleImageBlock;

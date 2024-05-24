import { LIST_TYPES, TBlockFormat, blockFormats, markFormats } from '@/types/editor';
import { CodeBlockElement, CustomEditor, CustomElement } from '@/types/slate_custom_types';
import isBlockActive from './isBlockActive';
import { Editor, Element, Transforms } from 'slate';
import { isMarkActive } from './isMarkActive';

const toggleCodeBlock = (editor: CustomEditor) => {
  const isActive = isBlockActive(editor, 'code-block');

  // List 블록이면 따로 해제
  Transforms.unwrapNodes(editor, {
    match: (n) => !Editor.isEditor(n) && Element.isElement(n) && LIST_TYPES.includes(n.type),
    split: true,
  });

  if (isActive) {
    Transforms.unwrapNodes(editor, {
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'code-block',
      split: true,
    });
    Transforms.setNodes(editor, { type: 'paragraph' });
  } else {
    // markFormats.forEach((format) => {
    //   if (isMarkActive(editor, format)) {
    //     Editor.removeMark(editor, format);
    //   }
    // });
    Transforms.setNodes(editor, { type: 'paragraph' });
    Transforms.wrapNodes(editor, {
      type: 'code-block' as TBlockFormat,
      language: 'python',
      children: [],
    } as CodeBlockElement);
  }
};

export default toggleCodeBlock;

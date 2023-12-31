import { LIST_TYPES, TBlockFormat } from '@/types/editor';
import { CustomEditor, CustomElement } from '@/types/slate_custom_types';
import isBlockActive from './isBlockActive';
import { Editor, Element, Transforms } from 'slate';

const toggleListBlock = (editor: CustomEditor, format: TBlockFormat) => {
  const isActive = isBlockActive(editor, format);

  // List/Code 블록이면 따로 해제
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && (n.type === 'code-block' || LIST_TYPES.includes(n.type)),
    split: true,
  });

  if (isActive) {
    // 활성화된 상태면 해제 (paragraph로 변환)
    Transforms.setNodes(editor, { type: 'paragraph' });
  } else {
    // list-item 처리를 한 후 format으로 감싸기
    Transforms.setNodes(editor, { type: 'list-item' });
    Transforms.wrapNodes(editor, { type: format, children: [] } as CustomElement);
  }
};

export default toggleListBlock;

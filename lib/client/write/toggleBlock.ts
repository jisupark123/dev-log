import { LIST_TYPES, TBlockFormat } from '@/types/editor';
import { CustomEditor, CustomElement } from '@/types/slate_custom_types';
import isBlockActive from './isBlockActive';
import { Editor, Element, Transforms } from 'slate';

const toggleBlock = (editor: CustomEditor, format: TBlockFormat) => {
  const isActive = isBlockActive(editor, format);

  // List/Code 블록이면 따로 해제 (서로 겹칠 수 없음)
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && (n.type === 'code-block' || LIST_TYPES.includes(n.type)),
    split: true,
  });

  if (isActive) {
    // 활성화된 상태면 해제 (paragraph로 변환)
    Transforms.setNodes(editor, { type: 'paragraph' });
  } else {
    Transforms.setNodes(editor, { type: format } as Partial<CustomElement>);
  }
};

export default toggleBlock;

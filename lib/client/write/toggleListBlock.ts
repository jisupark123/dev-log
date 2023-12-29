import { TBlockBtnFormat } from '@/types/editor';
import { CustomEditor, CustomElement } from '@/types/slate_custom_types';
import isBlockActive from './isBlockActive';
import { Editor, Element, Transforms } from 'slate';

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const toggleListBlock = (editor: CustomEditor, format: TBlockBtnFormat) => {
  const isActive = isBlockActive(editor, format);

  // list-item은 ul -> li/ol 이런식으로 복잡하게 구성되어 있기 때문에 별도로 해제
  Transforms.unwrapNodes(editor, {
    match: (n) => !Editor.isEditor(n) && Element.isElement(n) && LIST_TYPES.includes(n.type),
    split: true,
  });

  if (isActive) {
    // 활성화된 상태면 해제 (paragraph로 변환)
    Transforms.setNodes(editor, { type: 'paragraph' });
  } else {
    // list면 list-item 처리를 한 후 format으로 감싸기
    Transforms.setNodes(editor, { type: 'list-item' });
    Transforms.wrapNodes(editor, { type: format, children: [] } as CustomElement);
  }
};

export default toggleListBlock;

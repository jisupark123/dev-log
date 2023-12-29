import { TBlockBtnFormat } from '@/types/editor';
import { CustomEditor, CustomElement } from '@/types/slate_custom_types';
import isBlockActive from './isBlockActive';
import { Transforms } from 'slate';

const toggleBlock = (editor: CustomEditor, format: TBlockBtnFormat) => {
  const isActive = isBlockActive(editor, format);

  if (isActive) {
    // 활성화된 상태면 해제 (paragraph로 변환)
    Transforms.setNodes(editor, { type: 'paragraph' });
  } else {
    Transforms.setNodes(editor, { type: format } as Partial<CustomElement>);
  }
};

export default toggleBlock;

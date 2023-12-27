import { TBlockBtnFormat } from '@/types/editor';
import { CustomEditor, CustomElement } from '@/types/slate_custom_types';
import isBlockActive from './isBlockActive';
import { Descendant, Editor, Element, Transforms } from 'slate';

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const toggleBlock = (editor: CustomEditor, format: TBlockBtnFormat) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => !Editor.isEditor(n) && Element.isElement(n) && LIST_TYPES.includes(n.type),
    split: true,
  });
  let newProperties: Partial<Element>;
  newProperties = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  } as Partial<CustomElement>;
  Transforms.setNodes<Element>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] } as CustomElement;
    Transforms.wrapNodes(editor, block);
  }
};

export default toggleBlock;

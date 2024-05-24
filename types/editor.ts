import { BaseEditor } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';

export type TEditor = BaseEditor & ReactEditor & HistoryEditor;
export type TMarkFormat = 'bold' | 'italic' | 'strikethrough' | 'underline' | 'code';
export type TBlockFormat =
  | 'heading-one'
  | 'heading-two'
  | 'heading-three'
  | 'block-quote'
  | 'numbered-list'
  | 'bulleted-list'
  | 'link'
  | 'image'
  | 'youtube'
  | 'code-block'
  | 'hbar'
  | 'list-item'
  | 'paragraph';
export type TPluginFormat = 'spell-check' | 'preview';

export type TCustomText = {
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  underline?: boolean;
  code?: boolean;
  text: string;
};

export const markFormats: TMarkFormat[] = ['bold', 'italic', 'strikethrough', 'underline', 'code'];

export const blockFormats: TBlockFormat[] = [
  'heading-one',
  'heading-two',
  'heading-three',
  'block-quote',
  'numbered-list',
  'bulleted-list',
  'link',
  'image',
  'youtube',
  'code-block',
  'hbar',
  'list-item',
  'paragraph',
];

export const LIST_TYPES = ['numbered-list', 'bulleted-list'];

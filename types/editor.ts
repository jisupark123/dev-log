import { BaseEditor } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';
import { CustomText, EmptyText } from './slate_custom_types';

export type TEditor = BaseEditor & ReactEditor & HistoryEditor;
export type TMarkBtnFormat = 'bold' | 'italic' | 'strikethrough' | 'underline' | 'code';
export type TBlockBtnFormat =
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
  | 'hbar';
export type TPluginBtnFormat = 'spell-check';

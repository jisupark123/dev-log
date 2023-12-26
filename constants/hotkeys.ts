import { TFormat } from '@/types/editor';

const HOTKEYS: { [key: string]: TFormat } = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

export default HOTKEYS;

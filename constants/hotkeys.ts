import { TMarkFormat } from '@/types/editor';

const HOTKEYS: { [key: string]: TMarkFormat } = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

export default HOTKEYS;

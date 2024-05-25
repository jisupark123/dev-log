import React from 'react';
import { cls } from '@/utils/cls';

import Heading1Icon from '@/assets/icons/tool--h1.svg';
import Heading2Icon from '@/assets/icons/tool--h2.svg';
import Heading3Icon from '@/assets/icons/tool--h3.svg';
import BoldIcon from '@/assets/icons/tool--bold.svg';
import ItalicIcon from '@/assets/icons/tool--italic.svg';
import UnderlineIcon from '@/assets/icons/tool--underline.svg';
import StrikeThroughIcon from '@/assets/icons/tool--strikethrough.svg';
import CodeIcon from '@/assets/icons/tool--code.svg';
import BulletedListIcon from '@/assets/icons/tool--bulleted_list.svg';
import NumberedListIcon from '@/assets/icons/tool--numbered_list.svg';
import ImageIcon from '@/assets/icons/tool--image.svg';
import YoutubeIcon from '@/assets/icons/tool--youtube.svg';
import CodeBlockIcon from '@/assets/icons/tool--code_block.svg';
import LinkIcon from '@/assets/icons/tool--link.svg';
import BloackQuoteIcon from '@/assets/icons/tool--blockquote.svg';
import HBarIcon from '@/assets/icons/tool--hbar.svg';
import SpellCheckIcon from '@/assets/icons/plugin--spell_check.svg';
import PreviewIcon from '@/assets/icons/plugin--preview.svg';
import { TBlockFormat, TMarkFormat, TPluginFormat } from '@/types/editor';

const icons: { [key: string]: any } = {
  'heading-one': <Heading1Icon width='16px' />,
  'heading-two': <Heading2Icon width='16px' />,
  'heading-three': <Heading3Icon width='16px' />,
  bold: <BoldIcon width='12px' />,
  italic: <ItalicIcon width='10px' />,
  underline: <UnderlineIcon width='14px' />,
  strikethrough: <StrikeThroughIcon width='18px' />,
  code: <CodeIcon width='22px' />,
  'bulleted-list': <BulletedListIcon width='20px' />,
  'numbered-list': <NumberedListIcon width='20px' />,
  image: <ImageIcon width='18px' />,
  youtube: <YoutubeIcon width='20px' />,
  'code-block': <CodeBlockIcon width='20px' />,
  link: <LinkIcon width='20px' />,
  'block-quote': <BloackQuoteIcon width='20px' />,
  hbar: <HBarIcon width='16px' />,
  'spell-check': <SpellCheckIcon width='20px' />,
  preview: <PreviewIcon width='20px' />,
};

export default function BaseBtn({
  active,
  format,
  ...props
}: {
  active: boolean;
  format: TMarkFormat | TBlockFormat | TPluginFormat;
} & React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cls(
        props.className ?? '',
        active ? 'bg-black text-white' : 'bg-page1 text-black',
        'w-30 h-30 rounded-4 flex justify-center items-center'
      )}
    >
      {icons[format]}
    </button>
  );
}

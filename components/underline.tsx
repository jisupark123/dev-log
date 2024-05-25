import { cls } from '@/utils/cls';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Underline: React.FC<Props> = ({ ...props }) => {
  return <div className={cls('w-full h-1 bg-lightGray', props.className ?? '')}></div>;
};

export default Underline;

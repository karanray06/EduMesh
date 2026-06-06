import React from 'react';
import { cn } from '../../lib/utils';

const variants = {
 subject: 'bg-[rgba(178,204,255,0.25)] border-[1px] border-[rgba(178,204,255,0.5)]', // periwinkle 25%
 topic: 'bg-[rgba(178,255,212,0.25)] border-[1px] border-[rgba(178,255,212,0.5)]', // mint 25%
 correct: 'bg-[rgba(226,255,178,0.40)]', // lime 40%
 wrong: 'bg-[rgba(255,176,176,0.30)]', // rose 30%
 badge: 'bg-amber text-white',
 custom: '', // for custom passing in of styles
};

const Pill = ({ children, variant = 'subject', className, ...props }) => {
 return (
 <span
 className={cn(
 'rounded-full px-[14px] py-[4px] font-body font-medium text-[0.75rem] text-text-secondary inline-flex items-center justify-center',
 variants[variant],
 className
 )}
 {...props}
 >
 {children}
 </span>
 );
};

export default Pill;

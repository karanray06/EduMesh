import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const InputField = forwardRef(({ className, type = 'text', ...props }, ref) => {
 return (
 <input
 type={type}
 ref={ref}
 className={cn(
 'bg-glass-fill border border-glass-border',
 'rounded-xl px-4 py-3',
 'font-body font-normal text-base text-white placeholder:text-text-muted',
 'transition-all duration-300 outline-none',
 'focus:border-indigo focus:shadow-glow-indigo',
 className
 )}
 {...props}
 />
 );
});

InputField.displayName = 'InputField';

export default InputField;

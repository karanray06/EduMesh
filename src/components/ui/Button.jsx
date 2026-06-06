import React from 'react';
import { cn } from '../../lib/utils';

const variants = {
 primary: 'bg-gradient-to-br from-indigo to-violet text-white shadow-glow-indigo hover:shadow-glow-violet',
 secondary: 'bg-glass-fill border border-glass-border text-white hover:bg-glass-hover',
 danger: 'bg-gradient-to-br from-red-400 to-red-500 text-white',
 success: 'bg-gradient-to-br from-emerald-400 to-emerald-500 text-white',
 ghost: 'bg-transparent text-text-secondary hover:bg-glass-hover hover:text-white',
};

const sizes = {
 sm: 'px-4 py-2 text-sm',
 md: 'px-7 py-3 text-[0.9rem]',
 lg: 'px-8 py-4 text-base w-full',
};

const Button = ({
 children,
 variant = 'primary',
 size = 'md',
 className,
 disabled,
 ...props
}) => {
 return (
 <button
 disabled={disabled}
 className={cn(
 'font-body font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-2',
 'hover:scale-[1.03] active:scale-[0.97]',
 disabled && 'opacity-50 cursor-not-allowed hover:scale-100 active:scale-100',
 variants[variant],
 sizes[size],
 className
 )}
 {...props}
 >
 {children}
 </button>
 );
};

export default Button;

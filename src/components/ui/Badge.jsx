import React from 'react';

const Badge = ({ children, variant = 'filled', color = 'lavender', size = 'md', className = '' }) => {
 const sizes = {
 sm: 'px-2 py-0.5 text-xs',
 md: 'px-3 py-1 text-sm',
 };

 const colors = {
 lavender: {
 filled: 'bg-gradient-to-br from-indigo to-periwinkle text-white',
 outlined: 'border-[1.5px] border-indigo text-lavender',
 tonal: 'bg-[rgba(208,170,255,0.20)] text-white',
 },
 mint: {
 filled: 'bg-gradient-to-br from-mint to-seafoam text-white',
 outlined: 'border-[1.5px] border-mint text-white',
 tonal: 'bg-[rgba(178,255,212,0.25)] text-white',
 },
 rose: {
 filled: 'bg-gradient-to-br from-red-400 to-red-500 text-white',
 outlined: 'border-[1.5px] border-rose text-rose',
 tonal: 'bg-[rgba(255,176,176,0.25)] text-white',
 },
 lemon: {
 filled: 'bg-amber text-white',
 outlined: 'border-[1.5px] border-lemon text-white',
 tonal: 'bg-[rgba(245,245,168,0.30)] text-white',
 },
 orchid: {
 filled: 'bg-gradient-to-br from-orchid to-lilac text-white',
 outlined: 'border-[1.5px] border-orchid text-orchid',
 tonal: 'bg-[rgba(255,170,240,0.20)] text-white',
 },
 };

 const colorStyles = colors[color] || colors.lavender;

 return (
 <span className={`inline-block rounded-full font-body font-medium ${sizes[size]} ${colorStyles[variant]} ${className}`}>
 {children}
 </span>
 );
};

export default Badge;

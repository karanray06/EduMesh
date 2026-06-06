import React from 'react';

const Card = ({ children, className = '', hoverable = false, padding = 'md', ...props }) => {
 const paddings = {
 sm: 'p-3',
 md: 'p-6',
 lg: 'p-8',
 };

 return (
 <div
 className={`
 bg-bg-surface rounded-xl border border-glass-border ${hoverable ? 'hover:shadow-lg transition-shadow duration-200' : 'shadow-sm'}
 ${paddings[padding]} ${className}
 `}
 {...props}
 >
 {children}
 </div>
 );
};

export default Card;

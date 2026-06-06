import React from 'react';

export function GlassCard({ children, className = '', onClick, style = {} }) {
 return (
 <div
 className={`glass-card ${className}`}
 onClick={onClick}
 style={style}
 >
 {children}
 </div>
 );
}

export function GlassCardStatic({ children, className = '', style = {} }) {
 return (
 <div
 className={`glass-card--static ${className}`}
 style={style}
 >
 {children}
 </div>
 );
}

export default GlassCard;

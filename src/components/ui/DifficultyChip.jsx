import React from 'react';

const STYLES = {
 easy: {
 bg: 'rgba(34,197,94,0.1)',
 border: 'rgba(34,197,94,0.3)',
 text: '#4ade80',
 label: 'Easy'
 },
 medium: {
 bg: 'rgba(234,179,8,0.1)',
 border: 'rgba(234,179,8,0.3)',
 text: '#facc15',
 label: 'Medium'
 },
 hard: {
 bg: 'rgba(239,68,68,0.1)',
 border: 'rgba(239,68,68,0.3)',
 text: '#f87171',
 label: 'Hard'
 }
};

export const DifficultyChip = ({ level, className = '' }) => {
 const style = STYLES[level?.toLowerCase()] || STYLES.medium;
 
 return (
 <span
 className={`px-2 py-0.5 rounded-[6px] text-[10px] font-bold tracking-wide uppercase ${className}`}
 style={{
 background: style.bg,
 border: `1px solid ${style.border}`,
 color: style.text
 }}
 >
 {style.label}
 </span>
 );
};

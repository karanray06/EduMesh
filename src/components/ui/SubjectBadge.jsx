import React from 'react';

const SUBJECT_COLORS = {
 Physics: '#00A8E8', // Cyan
 Chemistry: '#D4A373', // Gold
 Mathematics: '#8D99AE', // Steel Blue
 Biology: '#7A847A', // Sage
 English: '#B58A63', // Bronze
 CS: '#5A738E', // Slate
 Default: '#8D99AE'
};

export const SubjectBadge = ({ subject, className = '' }) => {
 const color = SUBJECT_COLORS[subject] || SUBJECT_COLORS.Default;
 
 return (
 <span
 className={`px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${className}`}
 style={{
 background: `${color}1A`, // 10% opacity
 color: color,
 border: `1px solid ${color}40`, // 25% opacity
 }}
 >
 {subject}
 </span>
 );
};

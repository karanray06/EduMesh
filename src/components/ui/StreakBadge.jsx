import React from 'react';

export const StreakBadge = ({ days, className = '' }) => {
 const isHot = days >= 7;
 
 return (
 <div
 className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border ${
 isHot
 ? 'bg-amber/20 border-amber/50'
 : 'bg-glass-fill border-glass-border'
 } ${className}`}
 title={`${days} Day Streak`}
 >
 <span className={isHot ? 'animate-pulse' : 'opacity-80'}>🔥</span>
 <span className="text-amber font-bold text-sm font-mono">{days}</span>
 </div>
 );
};

import React from 'react';

export const XPBar = ({ current, max, tier = 'Bronze', className = '' }) => (
 <div className={`flex items-center gap-2 ${className}`}>
 <span className="text-xs text-amber font-bold font-mono tracking-wide">{tier}</span>
 <div className="flex-1 h-1.5 bg-glass-fill rounded-full overflow-hidden">
 <div
 className="h-full bg-cyan rounded-full transition-all duration-700 ease-out"
 style={{ width: `${Math.min((current / max) * 100, 100)}%` }}
 />
 </div>
 <span className="text-xs text-text-secondary font-mono">
 {current}/{max}
 </span>
 </div>
);

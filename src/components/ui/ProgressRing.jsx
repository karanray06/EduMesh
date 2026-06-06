import React from 'react';

export const ProgressRing = ({ 
 progress = 0, // 0 to 100
 size = 40,
 strokeWidth = 4,
 color = '#00A8E8', // Cyan by default
 trackColor = 'rgba(93,115,142,0.2)', // Slate 20%
 className = '',
 children
}) => {
 const radius = (size - strokeWidth) / 2;
 const circumference = radius * 2 * Math.PI;
 const offset = circumference - (progress / 100) * circumference;

 return (
 <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
 <svg className="transform -rotate-90 w-full h-full">
 {/* Background Track */}
 <circle
 cx={size / 2}
 cy={size / 2}
 r={radius}
 stroke={trackColor}
 strokeWidth={strokeWidth}
 fill="transparent"
 />
 {/* Progress Fill */}
 <circle
 cx={size / 2}
 cy={size / 2}
 r={radius}
 stroke={color}
 strokeWidth={strokeWidth}
 fill="transparent"
 strokeDasharray={circumference}
 strokeDashoffset={offset}
 strokeLinecap="round"
 className="transition-all duration-1000 ease-out"
 />
 </svg>
 {/* Content (e.g. percentage text) inside the ring */}
 {children && (
 <div className="absolute inset-0 flex items-center justify-center">
 {children}
 </div>
 )}
 </div>
 );
};

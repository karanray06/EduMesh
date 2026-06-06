import React from 'react';

const AnimatedBackground = () => {
 const blobs = [
 { bg: 'bg-[#3730a3]', size: 600, top: '-10%', left: '-5%', duration: 25, delay: 0 },
 { bg: 'bg-[#0e7490]', size: 500, top: '25%', right: '-10%', duration: 28, delay: 2 },
 { bg: 'bg-[#5b21b6]', size: 450, top: '65%', left: '5%', duration: 32, delay: 1 },
 { bg: 'bg-[#6d28d9]', size: 400, top: '35%', left: '30%', duration: 22, delay: 3 },
 ];

 return (
 <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-bg-primary">
 {blobs.map((blob, idx) => (
 <div
 key={idx}
 className={`absolute rounded-full ${blob.bg} opacity-[0.2] animate-orb-float blur-[100px]`}
 style={{
 width: `${blob.size}px`,
 height: `${blob.size}px`,
 top: blob.top,
 ...(blob.left ? { left: blob.left } : {}),
 ...(blob.right ? { right: blob.right } : {}),
 animationDuration: `${blob.duration}s`,
 animationDelay: `${blob.delay}s`,
 animationDirection: idx % 2 === 0 ? 'normal' : 'alternate-reverse'
 }}
 ></div>
 ))}
 </div>
 );
};

export default AnimatedBackground;

import React, { useMemo } from 'react';
import renderMathInElement from 'katex/contrib/auto-render';

/**
 * KaTeXBlock
 * Renders mathematics written in LaTeX inside the provided children.
 * Expects the children to be a string or elements containing $..$ (inline) or $$..$$ (block) math.
 * We use a ref and auto-render on mount/update.
 */
export const KaTeXBlock = ({ content, className = '' }) => {
 const containerRef = React.useRef(null);

 React.useEffect(() => {
 if (containerRef.current) {
 // Configure auto-render to parse standard delimiters
 renderMathInElement(containerRef.current, {
 delimiters: [
 { left: '$$', right: '$$', display: true },
 { left: '\\[', right: '\\]', display: true },
 { left: '$', right: '$', display: false },
 { left: '\\(', right: '\\)', display: false },
 ],
 throwOnError: false, // Don't crash the UI on bad LaTeX
 errorColor: '#f87171',
 });
 }
 }, [content]);

 return (
 <div
 ref={containerRef}
 className={`prose prose-invert max-w-none ${className}`}
 dangerouslySetInnerHTML={{ __html: content }}
 />
 );
};

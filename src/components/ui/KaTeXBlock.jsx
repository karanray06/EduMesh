import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import 'katex/dist/katex.min.css';

/**
 * KaTeXBlock (Now a Markdown Block)
 * Renders mathematics written in LaTeX inside Markdown content.
 */
export const KaTeXBlock = ({ content, className = '' }) => {
  return (
    <div className={`prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-bg-primary prose-pre:border prose-pre:border-glass-border prose-headings:font-display prose-headings:text-white ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex]}
        components={{
          a: ({ node, ...props }) => <a {...props} className="text-cyan hover:underline" target="_blank" rel="noopener noreferrer" />,
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '')
            return !inline ? (
              <div className="rounded-xl overflow-hidden my-4 border border-glass-border bg-bg-primary shadow-glass">
                <div className="px-4 py-2 bg-glass-fill border-b border-glass-border text-xs text-text-muted font-mono flex items-center justify-between">
                  <span>{match ? match[1] : 'code'}</span>
                </div>
                <div className="p-4 overflow-x-auto text-[14px]">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </div>
              </div>
            ) : (
              <code className="bg-bg-primary px-1.5 py-0.5 rounded-md text-cyan text-[0.9em] border border-glass-border" {...props}>
                {children}
              </code>
            )
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

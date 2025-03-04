import React, { FC } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";

interface SummarySectionProps {
  content: string;
}

const SummarySection: FC<SummarySectionProps> = ({ content }) => {
  return (
    <div
      className="p-4 overflow-auto text-primary"
      style={{
        lineHeight: "1.8", // Increased line spacing
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkRehype]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold mb-4">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-semibold mb-3">{children}</h2>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-6 mb-4">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 mb-4">{children}</ol>
          ),
          li: ({ children }) => <li className="mb-2">{children}</li>,
          p: ({ children }) => <p className="mb-4">{children}</p>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-4">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default SummarySection;

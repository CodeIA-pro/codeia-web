import React from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface MarkdownProps {
  markdownText: string;
}
const Markdown: React.FC<MarkdownProps> = ({ markdownText }) => {
  const getMarkdownText = () => {
    const rawMarkup = marked(markdownText);
    const sanitizedMarkup = DOMPurify.sanitize(rawMarkup.toString());
    return { __html: sanitizedMarkup };
  };

  return <div dangerouslySetInnerHTML={getMarkdownText()} />;
};

export default Markdown;

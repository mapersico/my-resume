import React from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

interface MarkdownProps {
  markdownText: string;
}

const MarkdownRenderer: React.FC<MarkdownProps> = ({ markdownText }) => {
  const rawMarkup = marked(markdownText);
  const sanitizedMarkup = DOMPurify.sanitize(rawMarkup as string);

  return <span dangerouslySetInnerHTML={{ __html: sanitizedMarkup }} />;
};

export default MarkdownRenderer;

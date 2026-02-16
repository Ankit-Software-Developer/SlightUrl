"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CodeBlock({ children, language = "javascript", small = false }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="relative group">
      <div className="absolute right-2 top-2 z-10">
        <button
          onClick={copyToClipboard}
          className="p-2 bg-gray-800 text-gray-200 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-700"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
      
      <pre className={`${small ? 'text-sm' : 'text-base'} bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto`}>
        <code className={`font-mono ${language}`}>
          {children}
        </code>
      </pre>
      
      <div className="absolute top-0 right-0 text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-bl-lg rounded-tr-lg">
        {language}
      </div>
    </div>
  );
}
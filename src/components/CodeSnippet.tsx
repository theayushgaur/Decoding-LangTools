
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check, Copy, Info } from "lucide-react";

interface CodeSnippetProps {
  code: string;
  language: string;
  title?: string;
}

export default function CodeSnippet({ code, language, title }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Function to process the code for terminal-like styling
  const processCode = (codeStr: string) => {
    if (language === 'bash' || language === 'shell') {
      // Split code by lines
      return codeStr.split('\n').map((line, index) => {
        // Check if it's a command line (starts with >)
        if (line.trim().startsWith('>')) {
          return <div key={index} className="text-white">{line}</div>;
        }
        // Check if line indicates success (has ✓)
        else if (line.trim().includes('✓') || line.trim().startsWith('√')) {
          return <div key={index} className="text-green-400">✓ {line.replace(/^√\s*/, '')}</div>;
        }
        // Check if line indicates info (has i or starts with a dash)
        else if (line.trim().startsWith('i') || line.trim().startsWith('-') || line.trim().startsWith('Updated')) {
          return <div key={index} className="text-blue-400">{line}</div>;
        }
        // Success message
        else if (line.includes('Success') || line.includes('completed')) {
          return <div key={index} className="text-white">{line}</div>;
        }
        // Default case
        else {
          return <div key={index} className="text-white">{line}</div>;
        }
      });
    }
    
    // For other languages, just return the code as is
    return <div className="text-white">{codeStr}</div>;
  };

  return (
    <div className="my-4 rounded-lg overflow-hidden border border-border/20">
      {title && (
        <div className="bg-[#1A1A1A] px-4 py-2 border-b border-border/20 flex justify-between items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="font-medium text-sm text-gray-400">{title}</span>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8 text-gray-400" 
            onClick={copyToClipboard}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      )}
      <pre className="bg-[#1A1A1A] p-4 overflow-x-auto">
        <code className="text-sm font-mono">
          {processCode(code)}
        </code>
      </pre>
    </div>
  );
}

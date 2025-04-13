
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

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

  return (
    <div className="my-4 rounded-lg border border-border overflow-hidden">
      {title && (
        <div className="bg-muted px-4 py-2 border-b border-border flex justify-between items-center">
          <span className="font-medium text-sm">{title}</span>
          <div className="flex items-center">
            <span className="text-xs mr-2 text-muted-foreground">{language}</span>
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8" 
              onClick={copyToClipboard}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      )}
      <pre className="bg-card p-4 overflow-x-auto">
        <code className="text-sm font-mono">{code}</code>
      </pre>
    </div>
  );
}

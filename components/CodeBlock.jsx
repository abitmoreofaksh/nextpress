"use client";
import { Check, Copy } from "lucide-react";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { toast } from "sonner";

export const CodeBlock = ({
  language = "jsx",
  filename,
  code,
  highlightLines = [],
  tabs = [],
  showLines = true,
}) => {
  const [copied, setCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);

  const tabsExist = tabs.length > 0;

  const copyToClipboard = async () => {
    const textToCopy = tabsExist ? tabs[activeTab].code : code;
    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const activeCode = tabsExist ? tabs[activeTab].code : code;
  const activeLanguage = tabsExist
    ? tabs[activeTab].language || language
    : language;
  const activeHighlightLines = tabsExist
    ? tabs[activeTab].highlightLines || []
    : highlightLines;

  return (
    <>
      <div className="bg-neutral-900/80 h-6 max-w-7xl mx-auto rounded-t-lg flex items-center px-4 gap-1 mt-4">
        <div className="rounded-full h-[10px] w-[10px] bg-red-400" />
        <div className="rounded-full h-[10px] w-[10px] bg-yellow-400" />
        <div className="rounded-full h-[10px] w-[10px] bg-green-400" />
        <div />
      </div>
      <div className="relative max-w-7xl mx-auto rounded-b-lg bg-neutral-900 px-4 font-mono text-sm">
        <div className="flex flex-col gap-2">
          {tabsExist && (
            <div className="flex  overflow-x-auto">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-3 !py-2 text-xs transition-colors font-sans ${
                    activeTab === index
                      ? "text-white"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          )}
          {!tabsExist && filename && (
            <div className="flex justify-between items-center py-2">
              <div className="text-xs text-zinc-400">{filename}</div>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 transition-colors font-sans"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          )}
        </div>
        <SyntaxHighlighter
          language={activeLanguage}
          style={atomDark}
          customStyle={{
            margin: 0,
            padding: 0,
            background: "transparent",
            fontSize: "0.875rem", // text-sm equivalent
          }}
          wrapLines={true}
          showLineNumbers={showLines}
          lineProps={(lineNumber) => ({
            style: {
              backgroundColor: activeHighlightLines.includes(lineNumber)
                ? "rgba(255,255,255,0.1)"
                : "transparent",
              display: "block",
              width: "100%",
            },
          })}
          PreTag="div"
        >
          {String(activeCode)}
        </SyntaxHighlighter>
      </div>
    </>
  );
};

'use client';

import { useEffect, useCallback } from 'react';

// Cal.com types
declare global {
  interface Window {
    Cal?: any;
  }
}

interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink?: string;
  gradient?: string;
  toolName?: string;
  toolResults?: Record<string, any>;
}

export default function CTASection({
  title,
  description,
  buttonText,
  buttonLink = '#contact',
  gradient = 'from-secondary-800 to-secondary-900',
  toolName = '',
  toolResults = {}
}: CTASectionProps) {

  // Format results for the notes field (concise for Cal.com)
  const formatResultsForNotes = useCallback(() => {
    if (!toolName) return '';
    
    let notes = `Tool: ${toolName}\n`;
    notes += `Date: ${new Date().toLocaleDateString()}\n\n`;

    Object.entries(toolResults).forEach(([key, value]) => {
      const formattedKey = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/_/g, ' ')
        .replace(/^./, str => str.toUpperCase())
        .trim();
      
      if (Array.isArray(value)) {
        if (value.length <= 5) {
          notes += `${formattedKey}: ${value.join(', ')}\n`;
        } else {
          notes += `${formattedKey}: ${value.slice(0, 5).join(', ')}... (+${value.length - 5} more)\n`;
        }
      } else if (typeof value === 'object' && value !== null) {
        const entries = Object.entries(value);
        entries.slice(0, 4).forEach(([subKey, subValue]) => {
          notes += `${subKey}: ${subValue}\n`;
        });
      } else {
        notes += `${formattedKey}: ${value}\n`;
      }
    });

    // Cal.com notes limit - truncate if needed
    return notes.substring(0, 1000);
  }, [toolName, toolResults]);

  // Store results in localStorage for backup
  useEffect(() => {
    if (toolName && Object.keys(toolResults).length > 0) {
      const dataToStore = {
        toolName,
        toolResults,
        generatedAt: new Date().toISOString()
      };
      localStorage.setItem('fahis_tool_results', JSON.stringify(dataToStore));
    }
  }, [toolName, toolResults]);

  useEffect(() => {
    // Load Cal.com embed script
    (function (C: any, A: string, L: string) {
      const p = function (a: any, ar: any) { a.q.push(ar); };
      const d = C.document;
      C.Cal = C.Cal || function () {
        const cal = C.Cal;
        const ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          const script = d.head.appendChild(d.createElement("script"));
          script.src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api: any = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    // Initialize Cal
    if (window.Cal) {
      window.Cal("init", "15min", { origin: "https://app.cal.com" });
      window.Cal.ns["15min"]("ui", { 
        hideEventTypeDetails: false, 
        layout: "month_view" 
      });
    }
  }, []);

  const hasToolData = toolName && Object.keys(toolResults).length > 0;

  // Handle click to open Cal modal with prefilled notes
  const handleCalClick = useCallback(() => {
    if (window.Cal && hasToolData) {
      window.Cal.ns["15min"]("modal", {
        calLink: "itsfahis/15min",
        config: {
          layout: "month_view",
          notes: formatResultsForNotes()
        }
      });
    }
  }, [formatResultsForNotes, hasToolData]);

  return (
    <div className={`bg-gradient-to-r ${gradient} rounded-2xl p-6 md:p-8 text-white text-center mt-8`}>
      <h3 className="text-xl md:text-2xl font-bold mb-2">{title}</h3>
      <p className="text-primary-300 mb-6 text-sm md:text-base">{description}</p>
      
      {hasToolData ? (
        <button
          onClick={handleCalClick}
          data-cal-namespace="15min"
          className="inline-flex items-center gap-2 bg-primary-400 text-secondary-900 px-6 py-3 rounded-xl font-semibold hover:bg-primary-300 transition-all shadow-lg hover:shadow-xl cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {buttonText}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      ) : (
        <a
          href={buttonLink}
          target="_parent"
          className="inline-flex items-center gap-2 bg-primary-400 text-secondary-900 px-6 py-3 rounded-xl font-semibold hover:bg-primary-300 transition-all shadow-lg hover:shadow-xl"
        >
          {buttonText}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      )}
    </div>
  );
}

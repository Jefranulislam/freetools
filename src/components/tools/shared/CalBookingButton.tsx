'use client';

import { useEffect, useCallback } from 'react';

// Cal.com types
declare global {
  interface Window {
    Cal?: any;
  }
}

interface CalBookingButtonProps {
  toolName: string;
  toolResults: Record<string, any>;
  className?: string;
  children?: React.ReactNode;
}

export default function CalBookingButton({ 
  toolName, 
  toolResults, 
  className = '',
  children 
}: CalBookingButtonProps) {
  
  // Format results for the notes field (keep it concise for Cal.com)
  const formatResultsForNotes = useCallback(() => {
    let notes = `Tool: ${toolName}\n`;
    notes += `Date: ${new Date().toLocaleDateString()}\n\n`;

    // Flatten and format the results concisely
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

    // Cal.com has a notes limit, truncate if needed
    return notes.substring(0, 1000);
  }, [toolName, toolResults]);

  // Store results in localStorage for backup retrieval
  useEffect(() => {
    const dataToStore = {
      toolName,
      toolResults,
      generatedAt: new Date().toISOString()
    };
    localStorage.setItem('fahis_tool_results', JSON.stringify(dataToStore));
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

    // Initialize Cal with prefill
    if (window.Cal) {
      window.Cal("init", "15min", { origin: "https://app.cal.com" });
      window.Cal.ns["15min"]("ui", { 
        hideEventTypeDetails: false, 
        layout: "month_view"
      });
    }
  }, []);

  // Build the Cal.com link with URL parameters for better data passing
  const getCalLinkWithParams = useCallback(() => {
    const notes = encodeURIComponent(formatResultsForNotes());
    return `itsfahis/15min?notes=${notes}`;
  }, [formatResultsForNotes]);

  // Handle click to dynamically set notes
  const handleClick = useCallback(() => {
    if (window.Cal) {
      // Trigger Cal with prefilled data
      window.Cal.ns["15min"]("modal", {
        calLink: "itsfahis/15min",
        config: {
          layout: "month_view",
          notes: formatResultsForNotes()
        }
      });
    }
  }, [formatResultsForNotes]);

  return (
    <button
      onClick={handleClick}
      data-cal-namespace="15min"
      className={className || `
        inline-flex items-center gap-2 px-8 py-4 
        bg-gradient-to-r from-secondary-700 to-secondary-900 
        text-white font-semibold rounded-xl 
        hover:from-secondary-800 hover:to-secondary-950 
        transition-all shadow-lg hover:shadow-xl cursor-pointer
      `}
    >
      {children || (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Book Free Consultation
        </>
      )}
    </button>
  );
}

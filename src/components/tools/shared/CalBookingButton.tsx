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

  // Format results for the notes field
  const formatResultsForNotes = useCallback(() => {
    let notes = `📊 Tool Used: ${toolName}\n\n`;
    notes += `📅 Generated: ${new Date().toLocaleDateString()}\n\n`;
    notes += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    notes += `📋 TOOL RESULTS SUMMARY\n`;
    notes += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    Object.entries(toolResults).forEach(([key, value]) => {
      const formattedKey = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim();
      
      if (Array.isArray(value)) {
        notes += `${formattedKey}:\n`;
        value.forEach((item, index) => {
          if (typeof item === 'object') {
            notes += `  ${index + 1}. ${JSON.stringify(item)}\n`;
          } else {
            notes += `  • ${item}\n`;
          }
        });
        notes += '\n';
      } else if (typeof value === 'object' && value !== null) {
        notes += `${formattedKey}:\n`;
        Object.entries(value).forEach(([subKey, subValue]) => {
          notes += `  • ${subKey}: ${subValue}\n`;
        });
        notes += '\n';
      } else {
        notes += `${formattedKey}: ${value}\n`;
      }
    });

    return notes;
  }, [toolName, toolResults]);

  // Build Cal.com config with prefilled data
  const getCalConfig = useCallback(() => {
    return JSON.stringify({
      layout: "month_view",
      useSlotsViewOnSmallScreen: "true",
      notes: formatResultsForNotes(),
      // These will prefill if you add custom fields on Cal.com:
      // - toolName: Name of the tool used
      // - toolResults: JSON string of results
      metadata: {
        toolName: toolName,
        toolResults: JSON.stringify(toolResults),
        generatedAt: new Date().toISOString()
      }
    });
  }, [toolName, toolResults, formatResultsForNotes]);

  return (
    <button
      data-cal-link="itsfahis/15min"
      data-cal-namespace="15min"
      data-cal-config={getCalConfig()}
      className={className || `
        inline-flex items-center gap-2 px-8 py-4 
        bg-gradient-to-r from-secondary-700 to-secondary-900 
        text-white font-semibold rounded-xl 
        hover:from-secondary-800 hover:to-secondary-950 
        transition-all shadow-lg hover:shadow-xl
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

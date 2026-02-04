'use client';

import { useEffect } from 'react';
import { trackToolEnter } from '@/lib/activityTracker';

// Hook to track when a tool page is visited
export function useTrackToolVisit(toolName: string, toolPath?: string) {
  useEffect(() => {
    const path = toolPath || (typeof window !== 'undefined' ? window.location.pathname : '');
    if (toolName && path) {
      trackToolEnter(toolName, path);
    }
  }, [toolName, toolPath]);
}

export default useTrackToolVisit;

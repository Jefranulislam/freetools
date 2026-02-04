// User Activity Tracker - Stores user behavior and tool results in localStorage

export interface ToolVisit {
  toolName: string;
  toolPath: string;
  visitedAt: string;
  timeSpent?: number; // seconds
  completed: boolean;
  results?: Record<string, any>;
}

export interface UserActivity {
  sessionId: string;
  sessionStarted: string;
  lastActivity: string;
  toolsVisited: ToolVisit[];
  currentTool?: string;
  totalTimeSpent: number; // seconds
}

const STORAGE_KEY = 'fahis_user_activity';
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

// Generate a simple session ID
const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Get or create user activity from localStorage
export const getActivity = (): UserActivity => {
  if (typeof window === 'undefined') {
    return createNewSession();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const activity: UserActivity = JSON.parse(stored);
      
      // Check if session is still valid (within 30 min)
      const lastActivityTime = new Date(activity.lastActivity).getTime();
      if (Date.now() - lastActivityTime > SESSION_TIMEOUT) {
        // Session expired, create new one but keep history
        return createNewSession(activity.toolsVisited);
      }
      
      return activity;
    }
  } catch (e) {
    console.error('Error reading activity:', e);
  }
  
  return createNewSession();
};

// Create a new session
const createNewSession = (previousVisits: ToolVisit[] = []): UserActivity => {
  return {
    sessionId: generateSessionId(),
    sessionStarted: new Date().toISOString(),
    lastActivity: new Date().toISOString(),
    toolsVisited: previousVisits.slice(-10), // Keep last 10 visits
    totalTimeSpent: 0
  };
};

// Save activity to localStorage
export const saveActivity = (activity: UserActivity): void => {
  if (typeof window === 'undefined') return;
  
  try {
    activity.lastActivity = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activity));
  } catch (e) {
    console.error('Error saving activity:', e);
  }
};

// Track when user enters a tool
export const trackToolEnter = (toolName: string, toolPath: string): void => {
  const activity = getActivity();
  activity.currentTool = toolName;
  
  // Check if already visiting this tool
  const existingVisit = activity.toolsVisited.find(
    v => v.toolPath === toolPath && !v.completed
  );
  
  if (!existingVisit) {
    activity.toolsVisited.push({
      toolName,
      toolPath,
      visitedAt: new Date().toISOString(),
      completed: false
    });
  }
  
  saveActivity(activity);
};

// Track when user completes a tool (gets results)
export const trackToolComplete = (
  toolName: string, 
  toolPath: string, 
  results: Record<string, any>
): void => {
  const activity = getActivity();
  
  // Find the current visit
  const visitIndex = activity.toolsVisited.findIndex(
    v => v.toolPath === toolPath && !v.completed
  );
  
  if (visitIndex >= 0) {
    const visit = activity.toolsVisited[visitIndex];
    const startTime = new Date(visit.visitedAt).getTime();
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    
    activity.toolsVisited[visitIndex] = {
      ...visit,
      completed: true,
      timeSpent,
      results
    };
    
    activity.totalTimeSpent += timeSpent;
  } else {
    // Tool wasn't tracked as entered, add it now as completed
    activity.toolsVisited.push({
      toolName,
      toolPath,
      visitedAt: new Date().toISOString(),
      completed: true,
      timeSpent: 0,
      results
    });
  }
  
  saveActivity(activity);
};

// Get summary of activity for Cal.com notes
export const getActivitySummary = (): string => {
  const activity = getActivity();
  
  let summary = `📊 USER ACTIVITY SUMMARY\n`;
  summary += `Session: ${activity.sessionId.slice(0, 15)}...\n`;
  summary += `Started: ${new Date(activity.sessionStarted).toLocaleString()}\n`;
  summary += `Total Time: ${formatTime(activity.totalTimeSpent)}\n\n`;
  
  // List completed tools with results
  const completedTools = activity.toolsVisited.filter(v => v.completed);
  
  if (completedTools.length > 0) {
    summary += `✅ TOOLS COMPLETED (${completedTools.length}):\n`;
    summary += `━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    
    completedTools.forEach((visit, index) => {
      summary += `\n${index + 1}. ${visit.toolName}\n`;
      summary += `   Time: ${formatTime(visit.timeSpent || 0)}\n`;
      
      // Add key results (limit to avoid too long notes)
      if (visit.results) {
        const keyResults = extractKeyResults(visit.results);
        keyResults.forEach(result => {
          summary += `   • ${result}\n`;
        });
      }
    });
  }
  
  // List visited but not completed
  const incompleteTools = activity.toolsVisited.filter(v => !v.completed);
  if (incompleteTools.length > 0) {
    summary += `\n⏳ TOOLS VIEWED: ${incompleteTools.map(v => v.toolName).join(', ')}\n`;
  }
  
  return summary.substring(0, 1500); // Cal.com notes limit
};

// Get activity as structured data for Cal.com
export const getActivityData = (): Record<string, any> => {
  const activity = getActivity();
  const completedTools = activity.toolsVisited.filter(v => v.completed);
  
  return {
    sessionId: activity.sessionId,
    sessionStarted: activity.sessionStarted,
    totalTimeSpent: formatTime(activity.totalTimeSpent),
    toolsCompleted: completedTools.length,
    toolsVisited: activity.toolsVisited.length,
    completedToolsList: completedTools.map(t => t.toolName),
    latestResults: completedTools.length > 0 
      ? completedTools[completedTools.length - 1].results 
      : null
  };
};

// Clear activity (for testing)
export const clearActivity = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
};

// Helper: Format seconds to human readable
const formatTime = (seconds: number): string => {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes < 60) return `${minutes}m ${remainingSeconds}s`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

// Helper: Extract key results from tool results object
const extractKeyResults = (results: Record<string, any>): string[] => {
  const keyResults: string[] = [];
  const priorityKeys = [
    'estimatedCost', 'estimatedCostMin', 'estimatedCostMax',
    'overallScore', 'score', 'totalScore',
    'recommendedPlatform', 'platform',
    'monthlySavings', 'annualSavings', 'roiPercentage',
    'readinessLevel', 'maturityLevel',
    'modules', 'requiredModules'
  ];
  
  for (const key of priorityKeys) {
    if (results[key] !== undefined) {
      const formattedKey = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim();
      
      let value = results[key];
      if (Array.isArray(value)) {
        value = value.slice(0, 3).join(', ') + (value.length > 3 ? '...' : '');
      }
      
      keyResults.push(`${formattedKey}: ${value}`);
      
      if (keyResults.length >= 4) break; // Limit to 4 key results per tool
    }
  }
  
  return keyResults;
};

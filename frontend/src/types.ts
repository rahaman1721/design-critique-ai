// Design Critique AI Types

export type CategoryStatus = 'excellent' | 'good' | 'needs_work' | 'critical';

export interface CritiqueCategory {
  name: string;
  score: number; // 1-10
  status: CategoryStatus;
  issues: string[];
  suggestions: string[];
}

export interface PriorityFix {
  priority: number; // 1-5
  title: string;
  impact: 'high' | 'medium' | 'low';
  description: string;
}

export interface CritiqueHeader {
  overall_score: number; // 1-100
  overall_grade: 'A' | 'B' | 'C' | 'D' | 'F';
  summary: string;
}

export type AppState =
  | { phase: 'idle' }
  | { phase: 'uploading' }
  | { phase: 'analyzing'; tokens: number }
  | { phase: 'streaming'; header: CritiqueHeader; categories: CritiqueCategory[]; fixes: PriorityFix[]; highlights: string[] }
  | { phase: 'done'; header: CritiqueHeader; categories: CritiqueCategory[]; fixes: PriorityFix[]; highlights: string[] }
  | { phase: 'error'; message: string };

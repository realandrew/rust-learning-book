// Section types
export type SectionId = 'overview' | 'visual' | 'interactive' | 'exercises' | 'reference';

export interface Section {
  id: SectionId;
  label: string;
}

// Exercise types
export interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  code?: string;
  hint?: string;
  solution?: string;
}

// Code editor types
export interface CodeExample {
  id: string;
  title: string;
  code: string;
  expectedOutput?: string;
}

// Progress tracking types
export interface ProgressState {
  [key: string]: boolean;
}

// Visual learning types
export interface VisualModule {
  id: string;
  title: string;
  description: string;
  type: 'memory' | 'ownership' | 'lifetimes' | 'types';
}

// Reference types
export interface ReferenceItem {
  id: string;
  title: string;
  category: 'syntax' | 'types' | 'errors' | 'patterns';
  content: string;
  examples?: string[];
}
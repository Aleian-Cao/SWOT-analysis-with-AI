export interface SWOTData {
  strengths: string;
  weaknesses: string;
  opportunities: string;
  threats: string;
}

export interface AnalysisResult {
  markdownText: string;
  sourceUrls: Array<{ title: string; uri: string }>;
}

export enum AppState {
  INPUT = 'INPUT',
  LOADING = 'LOADING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}

import React, { useState } from 'react';
import SWOTForm from './components/SWOTForm';
import AnalysisView from './components/AnalysisView';
import { SWOTData, AnalysisResult, AppState } from './types';
import { analyzeSWOT } from './services/geminiService';
import { BrainCircuit } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INPUT);
  const [swotData, setSwotData] = useState<SWOTData>({
    strengths: '',
    weaknesses: '',
    opportunities: '',
    threats: ''
  });
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleInputChange = (field: keyof SWOTData, value: string) => {
    setSwotData(prev => ({ ...prev, [field]: value }));
  };

  const handleAnalyze = async () => {
    setAppState(AppState.LOADING);
    setErrorMsg(null);
    try {
      const analysis = await analyzeSWOT(swotData);
      setResult(analysis);
      setAppState(AppState.RESULT);
    } catch (error) {
      console.error(error);
      setErrorMsg("Đã có lỗi xảy ra khi kết nối với AI. Vui lòng kiểm tra API Key hoặc thử lại sau.");
      setAppState(AppState.ERROR);
    }
  };

  const handleBack = () => {
    setAppState(AppState.INPUT);
  };

  const handleRetry = () => {
    setAppState(AppState.INPUT);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="bg-blue-600 p-2 rounded-lg mr-3">
                <BrainCircuit className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800">MyPath AI</span>
            </div>
            <div className="hidden md:flex space-x-4 text-sm font-medium text-slate-500">
              <span>SWOT Analysis</span>
              <span>•</span>
              <span>Trend Integration</span>
              <span>•</span>
              <span>Strategic Planning</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-8">
        {appState === AppState.INPUT && (
          <SWOTForm 
            data={swotData} 
            onChange={handleInputChange} 
            onSubmit={handleAnalyze} 
            isAnalyzing={false} 
          />
        )}

        {appState === AppState.LOADING && (
          <SWOTForm 
            data={swotData} 
            onChange={handleInputChange} 
            onSubmit={handleAnalyze} 
            isAnalyzing={true} 
          />
        )}

        {appState === AppState.RESULT && result && (
          <AnalysisView result={result} onBack={handleBack} />
        )}

        {appState === AppState.ERROR && (
          <div className="max-w-2xl mx-auto mt-20 p-8 bg-white rounded-2xl shadow-xl text-center border border-red-100">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Rất tiếc!</h3>
            <p className="text-slate-600 mb-6">{errorMsg}</p>
            <button
              onClick={handleRetry}
              className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Thử lại
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;

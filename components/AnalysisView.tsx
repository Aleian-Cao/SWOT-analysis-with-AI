import React from 'react';
import ReactMarkdown from 'react-markdown';
import { AnalysisResult } from '../types';
import { ArrowLeft, ExternalLink, Download } from 'lucide-react';

interface AnalysisViewProps {
  result: AnalysisResult;
  onBack: () => void;
}

const AnalysisView: React.FC<AnalysisViewProps> = ({ result, onBack }) => {
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 animate-fade-in">
      {/* Navigation and Actions */}
      <div className="flex justify-between items-center mb-8 sticky top-0 bg-[#f8fafc] py-4 z-10 border-b border-gray-200">
        <button
          onClick={onBack}
          className="flex items-center text-slate-600 hover:text-slate-900 transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Quay lại chỉnh sửa
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-all"
        >
          <Download className="w-4 h-4 mr-2" />
          Lưu PDF
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-100">
        <div className="prose prose-slate max-w-none markdown-body">
          <ReactMarkdown>{result.markdownText}</ReactMarkdown>
        </div>
      </div>

      {/* Sources Section */}
      {result.sourceUrls.length > 0 && (
        <div className="mt-8 bg-slate-100 rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
            <span className="bg-green-500 w-2 h-2 rounded-full mr-2"></span>
            Nguồn xu hướng & Tham khảo
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {result.sourceUrls.map((source, index) => (
              <a
                key={index}
                href={source.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start p-3 bg-white rounded-lg hover:shadow-md transition-shadow border border-slate-200 group"
              >
                <ExternalLink className="w-4 h-4 text-slate-400 mt-1 mr-3 flex-shrink-0 group-hover:text-blue-500" />
                <div>
                  <div className="text-sm font-medium text-slate-700 group-hover:text-blue-600 break-all line-clamp-2">
                    {source.title}
                  </div>
                  <div className="text-xs text-slate-400 mt-1 truncate">
                    {source.uri}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisView;

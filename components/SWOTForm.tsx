import React from 'react';
import { SWOTData } from '../types';
import { Target, ShieldAlert, Zap, TrendingUp, Sparkles, HelpCircle } from 'lucide-react';

interface SWOTFormProps {
  data: SWOTData;
  onChange: (field: keyof SWOTData, value: string) => void;
  onSubmit: () => void;
  isAnalyzing: boolean;
}

const SWOTForm: React.FC<SWOTFormProps> = ({ data, onChange, onSubmit, isAnalyzing }) => {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
          Hoạch Định Chiến Lược <span className="text-blue-600">AI & SMART</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-3xl mx-auto">
          Phân tích SWOT chuyên sâu kết hợp với xu hướng thị trường mới nhất. 
          Hệ thống sẽ giúp bạn thiết lập các mục tiêu <strong>SMART</strong> cho 1, 5 và 10 năm tới.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Strengths */}
        <div className="bg-white rounded-xl shadow-sm border-t-4 border-t-blue-500 p-6 hover:shadow-md transition-shadow flex flex-col h-full">
          <div className="flex items-center mb-2 text-blue-700">
            <Zap className="w-6 h-6 mr-2" />
            <h2 className="text-xl font-bold">Điểm Mạnh (Strengths)</h2>
          </div>
          
          <div className="mb-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center mb-2 text-blue-800">
              <HelpCircle className="w-4 h-4 mr-1.5" />
              <p className="text-xs font-bold uppercase tracking-wide">Câu hỏi gợi ý</p>
            </div>
            <ul className="text-sm text-blue-900 space-y-1.5 list-disc list-inside">
              <li>Bạn làm tốt việc gì hơn người khác?</li>
              <li>Bạn sở hữu nguồn lực độc đáo nào (tài chính, quan hệ, bằng cấp)?</li>
              <li>Người khác/Sếp thường khen ngợi bạn về điều gì?</li>
            </ul>
          </div>

          <textarea
            className="w-full flex-grow min-h-[180px] p-4 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none text-slate-700 transition-all placeholder:text-slate-400"
            placeholder="Ví dụ: 5 năm kinh nghiệm quản lý dự án Agile, Tiếng Anh IELTS 8.0, Tư duy phản biện tốt..."
            value={data.strengths}
            onChange={(e) => onChange('strengths', e.target.value)}
          />
        </div>

        {/* Weaknesses */}
        <div className="bg-white rounded-xl shadow-sm border-t-4 border-t-orange-500 p-6 hover:shadow-md transition-shadow flex flex-col h-full">
          <div className="flex items-center mb-2 text-orange-700">
            <ShieldAlert className="w-6 h-6 mr-2" />
            <h2 className="text-xl font-bold">Điểm Yếu (Weaknesses)</h2>
          </div>
          
          <div className="mb-4 bg-orange-50 p-4 rounded-lg border border-orange-100">
            <div className="flex items-center mb-2 text-orange-800">
              <HelpCircle className="w-4 h-4 mr-1.5" />
              <p className="text-xs font-bold uppercase tracking-wide">Câu hỏi gợi ý</p>
            </div>
            <ul className="text-sm text-orange-900 space-y-1.5 list-disc list-inside">
              <li>Bạn thường né tránh hoặc cảm thấy tự ti về công việc gì?</li>
              <li>Bạn đang thiếu những kỹ năng hoặc kiến thức quan trọng nào?</li>
              <li>Thói quen xấu nào đang ảnh hưởng đến hiệu suất của bạn?</li>
            </ul>
          </div>

          <textarea
            className="w-full flex-grow min-h-[180px] p-4 rounded-lg bg-slate-50 border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none resize-none text-slate-700 transition-all placeholder:text-slate-400"
            placeholder="Ví dụ: Dễ mất tập trung, Chưa có kỹ năng lập trình Python, Ngại nói trước đám đông..."
            value={data.weaknesses}
            onChange={(e) => onChange('weaknesses', e.target.value)}
          />
        </div>

        {/* Opportunities */}
        <div className="bg-white rounded-xl shadow-sm border-t-4 border-t-green-500 p-6 hover:shadow-md transition-shadow flex flex-col h-full">
          <div className="flex items-center mb-2 text-green-700">
            <TrendingUp className="w-6 h-6 mr-2" />
            <h2 className="text-xl font-bold">Cơ Hội (Opportunities)</h2>
          </div>
          
          <div className="mb-4 bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center mb-2 text-green-800">
              <HelpCircle className="w-4 h-4 mr-1.5" />
              <p className="text-xs font-bold uppercase tracking-wide">Câu hỏi gợi ý</p>
            </div>
            <ul className="text-sm text-green-900 space-y-1.5 list-disc list-inside">
              <li>Có xu hướng công nghệ hoặc thị trường mới nào bạn có thể học hỏi?</li>
              <li>Có nhu cầu nào của thị trường chưa được đáp ứng tốt?</li>
              <li>Mối quan hệ nào có thể giúp bạn tiến xa hơn?</li>
            </ul>
          </div>

          <textarea
            className="w-full flex-grow min-h-[180px] p-4 rounded-lg bg-slate-50 border border-slate-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none resize-none text-slate-700 transition-all placeholder:text-slate-400"
            placeholder="Ví dụ: AI đang bùng nổ trong Marketing, Công ty đang mở rộng chi nhánh nước ngoài..."
            value={data.opportunities}
            onChange={(e) => onChange('opportunities', e.target.value)}
          />
        </div>

        {/* Threats */}
        <div className="bg-white rounded-xl shadow-sm border-t-4 border-t-red-500 p-6 hover:shadow-md transition-shadow flex flex-col h-full">
          <div className="flex items-center mb-2 text-red-700">
            <Target className="w-6 h-6 mr-2" />
            <h2 className="text-xl font-bold">Thách Thức (Threats)</h2>
          </div>
          
          <div className="mb-4 bg-red-50 p-4 rounded-lg border border-red-100">
            <div className="flex items-center mb-2 text-red-800">
              <HelpCircle className="w-4 h-4 mr-1.5" />
              <p className="text-xs font-bold uppercase tracking-wide">Câu hỏi gợi ý</p>
            </div>
            <ul className="text-sm text-red-900 space-y-1.5 list-disc list-inside">
              <li>Những trở ngại lớn nhất bạn đang đối mặt là gì?</li>
              <li>Đối thủ cạnh tranh/Đồng nghiệp đang làm gì tốt hơn bạn?</li>
              <li>Công nghệ mới có nguy cơ thay thế vị trí của bạn không?</li>
            </ul>
          </div>

          <textarea
            className="w-full flex-grow min-h-[180px] p-4 rounded-lg bg-slate-50 border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none resize-none text-slate-700 transition-all placeholder:text-slate-400"
            placeholder="Ví dụ: GenAI có thể tự động hóa việc viết content, Kinh tế suy thoái giảm ngân sách..."
            value={data.threats}
            onChange={(e) => onChange('threats', e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-center pb-12">
        <button
          onClick={onSubmit}
          disabled={isAnalyzing || (!data.strengths && !data.weaknesses && !data.opportunities && !data.threats)}
          className={`
            group relative flex items-center justify-center py-4 px-12 border border-transparent text-lg font-bold rounded-full text-white 
            transform transition-all duration-200
            ${isAnalyzing 
              ? 'bg-slate-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-105 shadow-xl hover:shadow-blue-500/30'}
          `}
        >
          {isAnalyzing ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang phân tích xu hướng & Lập kế hoạch SMART...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Lập Kế Hoạch Chiến Lược
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SWOTForm;
import { GoogleGenAI } from "@google/genai";
import { SWOTData, AnalysisResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeSWOT = async (data: SWOTData): Promise<AnalysisResult> => {
  const prompt = `
    Bạn là một chuyên gia tư vấn chiến lược cấp cao và nhà tương lai học (Futurist). 
    Dựa trên thông tin SWOT dưới đây, hãy xây dựng một bản kế hoạch phát triển toàn diện.

    DỮ LIỆU ĐẦU VÀO:
    - Điểm mạnh: ${data.strengths}
    - Điểm yếu: ${data.weaknesses}
    - Cơ hội: ${data.opportunities}
    - Thách thức: ${data.threats}

    HÃY THỰC HIỆN 3 PHẦN PHÂN TÍCH SAU:

    PHẦN 1: TÍCH HỢP XU HƯỚNG THỊ TRƯỜNG & CÔNG NGHỆ (Trend Integration)
    - Sử dụng Google Search để tìm kiếm các xu hướng, báo cáo ngành nghề MỚI NHẤT (2024-2025) liên quan trực tiếp đến dữ liệu trên.
    - Liệt kê 3 xu hướng quan trọng nhất. 
    - Với mỗi xu hướng, đề xuất cụ thể hành động để "Tận dụng" (nếu phù hợp với Điểm mạnh/Cơ hội) hoặc "Đối phó" (nếu liên quan đến Điểm yếu/Thách thức).

    PHẦN 2: CHIẾN LƯỢC SWOT TỔNG THỂ
    - Tóm tắt ngắn gọn chiến lược cốt lõi dựa trên việc kết hợp các yếu tố (S-O, W-O, S-T, W-T).

    PHẦN 3: MÔ ĐUN HOẠCH ĐỊNH KẾ HOẠCH PHÁT TRIỂN (SMART Goals)
    Xây dựng lộ trình phát triển chi tiết cho 3 mốc thời gian. Với mỗi mốc, BẮT BUỘC phải thiết lập mục tiêu theo tiêu chí SMART (Cụ thể, Đo lường được, Khả thi, Liên quan, Có thời hạn).

    *   **Ngắn hạn (1 Năm tới):**
        -   *Trọng tâm:* Cải thiện kỹ năng, khắc phục điểm yếu, hành động nhanh.
        -   *Mục tiêu SMART:* [Viết mục tiêu theo cấu trúc SMART]
        -   *Các bước hành động:* [Danh sách đầu dòng chi tiết]

    *   **Trung hạn (5 Năm tới):**
        -   *Trọng tâm:* Mở rộng ảnh hưởng, thăng tiến vị thế, ổn định tài chính.
        -   *Mục tiêu SMART:* [Viết mục tiêu theo cấu trúc SMART]
        -   *Các bước hành động:* [Danh sách đầu dòng chi tiết]

    *   **Dài hạn (10 Năm tới):**
        -   *Trọng tâm:* Di sản, Tự do tài chính, Đỉnh cao sự nghiệp.
        -   *Mục tiêu SMART:* [Viết mục tiêu theo cấu trúc SMART]
        -   *Các bước hành động:* [Danh sách đầu dòng chi tiết]

    YÊU CẦU TRÌNH BÀY:
    - Sử dụng định dạng Markdown chuyên nghiệp.
    - Dùng các biểu tượng (emoji) phù hợp để làm nổi bật các mục.
    - Giọng văn: Khuyến khích, thực tế, chiến lược và sâu sắc.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // Using Pro for complex reasoning and planning
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }], // Enable grounding for trend analysis
      },
    });

    const markdownText = response.text || "Xin lỗi, tôi không thể tạo ra phân tích lúc này. Vui lòng thử lại.";
    
    // Extract grounding sources if available
    const sourceUrls: Array<{ title: string; uri: string }> = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web?.uri) {
          sourceUrls.push({
            title: chunk.web.title || "Nguồn tham khảo",
            uri: chunk.web.uri
          });
        }
      });
    }

    return {
      markdownText,
      sourceUrls
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
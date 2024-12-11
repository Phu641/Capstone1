import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    // Tải script Coze Web SDK
    const script = document.createElement('script');
    script.src =
      'https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/1.0.0-beta.4/libs/oversea/index.js';
    script.async = true;

    // Khởi tạo Coze Web SDK sau khi script được nạp
    script.onload = () => {
      new CozeWebSDK.WebChatClient({
        config: {
          bot_id: '7446396600622039056', // Thay bot_id của bạn tại đây
        },
        componentProps: {
          title: 'CarLink Assistant', // Tiêu đề hiển thị trên chatbot
        },
      });

      // Tùy chỉnh giao diện icon của chatbot
      const style = document.createElement('style');
      style.innerHTML = `
        /* Thay đổi biểu tượng chatbot */
        [class*="coze"] img {
          content: url('https://your-custom-icon-url.png') !important; /* URL icon mới */
          width: 60px !important; /* Điều chỉnh kích thước */
          height: 60px !important;
        }

        /* Thay đổi vị trí của icon trên màn hình */
        [class*="coze"] {
          bottom: 50px !important; /* Điều chỉnh khoảng cách với cạnh dưới */
          right: 50px !important; /* Điều chỉnh khoảng cách với cạnh phải */
        }
      `;
      document.head.appendChild(style);
    };

    document.body.appendChild(script);

    // Cleanup để tránh nạp lại script khi component bị hủy
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // Không render gì trong component vì script tự xử lý
};

export default Chatbot;

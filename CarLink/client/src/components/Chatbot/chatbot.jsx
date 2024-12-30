import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    const scriptId = 'coze-web-sdk-script';

    // Kiểm tra nếu script đã tồn tại trong DOM
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.src =
        'https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/1.1.0-beta.0/libs/oversea/index.js';
      script.async = true;
      script.id = scriptId;

      script.onload = () => {
        // Khởi tạo WebChatClient
        new CozeWebSDK.WebChatClient({
          config: {
            bot_id: '7446396600622039056',
          },
          componentProps: {
            title: 'Coze',
          },
        });
      };

      // Thêm script vào DOM
      document.body.appendChild(script);
    }

    // Cleanup script khi component bị hủy
    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return null; // Không render bất kỳ nội dung nào trong component
};

export default Chatbot;

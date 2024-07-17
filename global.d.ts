interface TelegramWebApp {
    initDataUnsafe?: {
      user?: {
        id: number;
        username: string;
        first_name?: string;
        last_name?: string;
        photo_url?: string;
      };
    };
  }
  
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
  
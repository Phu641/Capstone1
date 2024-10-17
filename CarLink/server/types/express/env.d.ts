declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
        EMAIL_PASSWORD: string;
        EMAIL_USER: string;
        DB_PASS: null
      }
    }
}

export {}
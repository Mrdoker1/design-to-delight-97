/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ELEVENLABS_API_KEY: string;
  // другие переменные окружения...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

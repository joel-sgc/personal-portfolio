// This file can be used to add references for global types like `vite/client`.

// Add global `vite/client` types. For more info, see: https://vitejs.dev/guide/features#client-types
/// <reference types="vite/client" />

interface ViteTypeOptions {}

interface ImportMetaEnv {
  readonly NOTION_API_KEY: string;
  readonly NOTION_DB_ID: string;

  readonly NTFY_TOPIC: string;
  readonly NTFY_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

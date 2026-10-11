// TypeScript environment declarations: extends Astro's generated types and defines ImportMetaEnv for BASE_URL.
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

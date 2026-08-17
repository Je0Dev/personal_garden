export const BASE_URL: string =
  (import.meta as ImportMeta & { env?: Record<string, string> }).env?.BASE_URL ?? '/personal_garden/';
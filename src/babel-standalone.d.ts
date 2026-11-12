declare module '@babel/standalone' {
  export function transform(
    code: string,
    options?: Record<string, unknown>,
  ): { code: string };
  export const presets: Record<string, unknown>;
  export const plugins: Record<string, unknown>;
}

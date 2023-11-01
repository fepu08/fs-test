export function buildErrorMessageFrom(msg: string, additional?: string): string {
  return additional ? `${msg}: ${additional}` : msg;
}

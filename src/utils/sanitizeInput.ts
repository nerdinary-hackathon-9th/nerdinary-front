export function sanitizeInput(value: string): string {
  return value.replace(/<script.*?>.*?<\/script>/gi, '').replace(/<\/?[^>]+(>|$)/g, '');
}

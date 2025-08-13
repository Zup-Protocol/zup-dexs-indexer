export {};

declare global {
  interface String {
    sanitize(): string;
    lowercasedEquals(other: string): boolean;
  }
}

String.prototype.sanitize = function (): string {
  if (!this) return "";

  // Remove null bytes and other control characters that might cause issues
  return this.replace(/[\u0000-\u001F\u007F-\u009F]/g, "").trim();
};

String.prototype.lowercasedEquals = function (other: string): boolean {
  return this.toLowerCase() === other.toLowerCase();
};

export interface Url {
  id: string;
  originalUrl: string;
  shortUrl: string;
  visitCount: number;
  domain: string;
  faviconUrl?: string;
  status: "active" | "inactive"; // Add this line
  createdAt: Date; // Add this line
}

export interface User {
  id?: number;
  username: string;
  tierCode?: string;
  requestCount: number;
  maxRequestsAllowed?: number;
}

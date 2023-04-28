export interface FailureResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  error: string;
  errorCode?: string;
}

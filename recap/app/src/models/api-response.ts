export interface ApiResponse<T> {
  success?: boolean;
  token?: string;
  message?: string;
  error?: string;
  results?: T[];
  page?: number;
  total_pages?: number;
  total_results?: number;
}
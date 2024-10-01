interface PaginatedResponse<T> {
  results: T[];
  count: number;
  previous: string | null;
  next: string | null;
}

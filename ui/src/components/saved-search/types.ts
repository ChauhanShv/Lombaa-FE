export interface SavedSearch {
  search: string;
  filters: Filter[];
  id: string;
}
export interface Filter {
  key: string;
  values: Array<string>;
}

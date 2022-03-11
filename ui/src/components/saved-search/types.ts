export interface SavedSearch {
  search: string;
  filters: Filter[];
}
export interface Filter {
  key: string;
  values: Array<string>;
}

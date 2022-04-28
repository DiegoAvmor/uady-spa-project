export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

export interface Paginated<Model> {
  data: Model[];
  pagination: Pagination;
}

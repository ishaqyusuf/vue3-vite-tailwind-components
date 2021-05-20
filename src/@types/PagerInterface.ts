export default interface PagerInterface {
  path?: string;
  base_url?: string;
  empty?: boolean;
  total?: number;
  from?: number;
  to?: number;
  last_page?: number;
  next_page_url?: string;
  current_page?: number;
}

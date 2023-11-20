export class Pagination<T> {
  content: Array<T> = [];
  totalPages: number = 0;
  totalElements: number = 0;
  numberOfElements: number = 0;
  first: boolean = false;
  last: boolean = false;
}

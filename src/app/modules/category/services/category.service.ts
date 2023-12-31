import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pagination } from 'src/app/core/models/pagination.model';
import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url: string = environment.apiUrl + '/v1/categories';

  constructor(private http: HttpClient) {}

  getAll(page = 0, size = 10, sort = 'id,desc') {
    return this.http.get<Pagination<Category>>(this.url, {
      params: { page, size, sort },
    });
  }

  create(body: Omit<Category, 'id'>) {
    return this.http.post<Category>(this.url, body);
  }

  update(id: number, body: Omit<Category, 'id'>) {
    return this.http.put<Category>(`${this.url}/${id}`, body);
  }

  disable(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}

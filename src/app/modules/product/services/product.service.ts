import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pagination } from 'src/app/core/models/pagination.model';
import { Product, ProductDTO } from '../models/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url: string = environment.apiUrl + '/v1/products';

  constructor(private http: HttpClient) {}

  getAll(page = 0, size = 10, sort = 'id,desc') {
    return this.http.get<Pagination<Product>>(this.url, {
      params: { page, size, sort },
    });
  }

  create(body: ProductDTO) {
    return this.http.post<Product>(this.url, body);
  }

  update(id: number, body: ProductDTO) {
    return this.http.put<Product>(`${this.url}/${id}`, body);
  }

  disable(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}

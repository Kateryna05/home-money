import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Category } from '../models/category.model';
import { BaseApi } from 'src/app/shared/core/base-api';
import { Observable } from 'rxjs';

@Injectable()
export class CategoriesService extends BaseApi {
  constructor(public httClientp: HttpClient) {
    super(httClientp);
  }

  addCategory(category: Category): Observable<Category> {
    return this.post('categories', category);
  }

  getCategories(): Observable<Category[]> {
    return this.get('categories');
  }

  updateCategory(category: Category): Observable<Category> {
    return this.put('categories/${category.id}', category);
  }
}

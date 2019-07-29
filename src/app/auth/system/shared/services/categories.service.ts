import { BaseApi } from 'src/app/shared/core/base-api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';

@Injectable()

export class CategoriesService extends BaseApi{
    constructor (public httpCLient: HttpClient){
        super(httpCLient);
    }

    addCategory(category: Category): Observable<Category>{
        return this.post('categories', category);
    }
}
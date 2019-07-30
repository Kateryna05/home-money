import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Bill } from '../models/bill.model';
import { BaseApi } from 'src/app/shared/core/base-api';


@Injectable()


export class BillService extends BaseApi{
    constructor (public httpClient:HttpClient) { super(httpClient) }

    getBill(): Observable<Bill>{
        return this.get('bill') ;
        
    }

    updateBill(bill: Bill): Observable<Bill>{
        return this.put('bill', bill);
    }



    getCurrency(base: string = 'RUB'): Observable<any>{
        return this.httpClient.get(`https://api.exchangeratesapi.io/latest?base=${base}`)

    }
    
} 
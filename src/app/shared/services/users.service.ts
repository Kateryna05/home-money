import { Injectable } from '@angular/core';


import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable()
export class UsersService {
  constructor(private http: HttpClient ) {}

  getUserByEmail(email: string): Observable<any> {
    return this.http.get('http://localhost:3000/users?email=${email}')
      .pipe(map((response: Response) => response.json()))
    
  }
}

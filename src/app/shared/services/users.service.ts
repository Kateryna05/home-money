import { Injectable } from '@angular/core';


import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators'


@Injectable()
export class UsersService {
  constructor(private httpClient: HttpClient ) {}

  getUserByEmail(email: string): Observable<User> {
    return this.httpClient.get(`http://localhost:3000/users?email=${email}`)
      .pipe(map((user: User[]) => user[0] ? user[0] : undefined));
  }

}

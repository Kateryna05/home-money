import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable()

export class UsersService {
    constructor (private http: HttpClient){}
    
    getUserByEmail(_email:string) : Observable <Promise <any>> {
        return this.http.get('http://localhost:3000/users?email=${email}')
            .pipe(map((response: Response) => response.json()));
    }
}
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Data, User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private http = inject(HttpClient);
  private baseUrl = 'https://reqres.in/api/users';

  public getUserById(id: number): Observable<Data> {
    return this.http.get<User>(`${this.baseUrl}/${id}`)
      .pipe(
        map( resp => resp.data),
        tap(console.log)
      )
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserIn, UserOut } from '../models/User';
import { ResponseMsg } from '../models/Response';
import { isEmailExistErrorMsg } from '../utils/Utils'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  endpoint: string = 'http://localhost:4000/users'

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserIn[]>{
    return this.http.get<UserIn[]>(this.endpoint)
      .pipe(catchError(this.handleError))
  }

  getUserById(id: number): Observable<UserIn> {
    const url = `${this.endpoint}/${id}`
    return this.http.get<UserIn>(url)
      .pipe(catchError(this.handleError))
  }

  createUser(user: UserOut) {
    return this.http.post<ResponseMsg>(this.endpoint, user)
      .pipe(catchError(this.handleError))
  }

  updateUser(id: number, user: UserOut): Observable<UserOut> {
    const url = `${this.endpoint}/${id}`
    return this.http.put<UserOut>(url, user)
      .pipe(catchError(this.handleError))
  }

  deleteUserById(id: number) {
    const url = `${this.endpoint}/${id}`
    return this.http.delete(url)
      .pipe(catchError(this.handleError))
  }






  handleError(err: HttpErrorResponse) {
    let msg = ''
    if (err.error instanceof ErrorEvent || isEmailExistErrorMsg(err.error.message)) {
      // Client-side error
      msg = err.error.message
    } else {
      // Server-side
      console.log(err);
      
      msg = `Error Code: ${err.status}\nMessage: ${err.message}`
    }

    return throwError(msg)
  }
}

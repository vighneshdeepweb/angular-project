import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../Models/User';
import { JsonResponse } from '../Models/JsonResponse';
import { UserFilter } from '../Models/UserFilter';
import { Exam } from '../Models/Exam';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions: any;
  apiUrl: string;
  authKey: string;

  constructor(private http: HttpClient, public commonService: CommonService) {
    this.apiUrl = commonService.baseUrl + "user/";
    this.authKey = commonService.authKey;
    
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authKey}`,
      })
    };
  }
  getLogin(user: User) {
    return this.http.post<User>(this.apiUrl + 'authenticateUser', user, this.httpOptions);
  }

  registerUser(user: User) {
    return this.http.post<JsonResponse>(this.apiUrl + 'registeruser', user);
  }

  searchUser(filter: UserFilter) {
    return this.http.post<UserFilter>(this.apiUrl + 'searchUser', filter, this.httpOptions);
  }
  deleteUser(id: number) {
    return this.http.delete(this.apiUrl + 'deleteuser/' + id, this.httpOptions);
  }
  getUserById(userid: number) {
    return this.http.get<User>(this.apiUrl + 'getuserbyid/' + userid, this.httpOptions);
  }
  updateUser(user: User) {
    return this.http.put<User>(this.apiUrl + 'updateuser/' + user.UserId, user, this.httpOptions);
  }
  forgotPassword(email: string) {
    return this.http.get<User>(this.apiUrl + 'forgotpassword/' + email, this.httpOptions);
  }
}

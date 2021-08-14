import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private subject = new Subject<any>();
  authKey: string;
  baseUrl: string;
  errorMsg: string;
  successMsg: string;
  userId: number;
  userdetail: any;
  constructor(

    public cookieService: CookieService
  ) {
    this.authKey = this.cookieService.getCookie('authKey');
    this.baseUrl = 'http://localhost:3000/';
    //     this.baseUrl = 'http://techtests.com/api/y';

    this.errorMsg = '';
    this.successMsg = '';
    this.userId = Number(this.cookieService.getCookie('uid'));
    if (this.cookieService.getCookie("userDetail") != "") {
      this.userdetail = JSON.parse(this.cookieService.getCookie("userDetail"));
    }
  }


  updateFilter(data: any) {
    this.subject.next({ filter: data });
  }
  getFilter(): Observable<any> {
    return this.subject.asObservable();
  }

  removeItemFromArray(array, key) {
    array.forEach((item, index) => {
      if (item === key) array.splice(index, 1);
    });
  }

}

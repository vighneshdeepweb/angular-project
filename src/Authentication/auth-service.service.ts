import { Injectable } from '@angular/core';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { CommonService } from '../Services/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(public jwtHelper: JwtHelperService, public commonService: CommonService) { }
  public isAuthenticated(): boolean {
    const token = this.commonService.authKey; //localStorage.getItem('authKey');
    return !this.jwtHelper.isTokenExpired(token);
  }
}

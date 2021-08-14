import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../../../Services/common.service';
import { User } from '../../../../Models/User';
import { CookieService } from 'src/Services/cookie.service';
@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  panelOpenState = false;
  user: User;

  constructor(public router: Router, public commonService: CommonService, public cookieService: CookieService) {
    this.user = this.commonService.userdetail;
  }
  userName: string;
  ngOnInit() {

  }
  logout() {
    this.cookieService.deleteCookie('authKey');
    this.cookieService.deleteCookie('uid');
    this.cookieService.deleteCookie('userDetail');
    if (this.commonService.userdetail.RoleId == 1) {
      // location.href = "admin";
      this.router.navigate(['admin']);
    }
    else if (this.commonService.userdetail.RoleId == 2) {
      //location.href = "/";
      this.router.navigate(['/']);
    }
  } 
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../../Models/User';
import { UserService } from '../../../../Services/user.service';
import { CommonService } from '../../../../Services/common.service';
import { interval, Subscription } from 'rxjs';
import { CookieService } from 'src/Services/cookie.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model = new User(0, 1, '', '', '', '', '', '', '', '', true, null, '', '', '', '', '', '', '');
  returnUrl: string;
  result: any;
  //common = global
  subscription: Subscription;

  constructor(private router: Router, private cookieService: CookieService, private route: ActivatedRoute, public userService: UserService, public commonService: CommonService) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    const source = interval(10000);
    this.subscription = source.subscribe(val => this.clearMsg());
  }
  clearMsg(): void {
    this.commonService.errorMsg = '';
    this.commonService.successMsg = '';
  }
  onSubmit() {

    this.userService.getLogin(this.model).subscribe((data: any) => {

      if (data.status_code == "200") {
        this.cookieService.setCookie('authKey', data.auth_key, 1);
        this.cookieService.setCookie("uid", data.id, 1);
        this.cookieService.setCookie("userDetail", JSON.stringify(data.data), 1);

        this.commonService.authKey = data.auth_key;
        this.commonService.userdetail = data.data;
        this.commonService.userId = data.id;

        if (this.returnUrl == '/') {

          // location.href = "admin/dashboard";

          this.router.navigate(['admin/dashboard']);
        }
        else {
          let url = this.returnUrl;
          // location.href = url;
          this.router.navigate(['/' + this.returnUrl + '']);
        }
      }

      else {
        this.commonService.errorMsg = data.message;
      }
    },
      error => {
        this.commonService.errorMsg = error.error

      }
    )
  }
}

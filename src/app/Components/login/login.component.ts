import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../Models/User';
import { UserService } from '../../../Services/user.service';
import { JsonResponse } from 'src/Models/JsonResponse';
import { interval, Subscription } from 'rxjs';
import { CommonService } from '../../../Services/common.service';
import { CookieService } from 'src/Services/cookie.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  model = new User(0, 2, '', '', '', '', '', '', '', '', true, null, '', '', '', '', '', '', '');
  returnUrl: string;
  result: any;
  //common = global
  subscription: Subscription;
  constructor(private router: Router, private route: ActivatedRoute, public userService: UserService, public commonService: CommonService, private cookieService: CookieService) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
          //this.router.navigate(['dashboard']);
          // location.href = "assignedexam";
          this.router.navigate(['/assignedexam']);
        }
        else {
          //location.href = this.returnUrl;
          this.router.navigate(['/' + this.returnUrl]);
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

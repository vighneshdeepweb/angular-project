import { Component, OnInit } from '@angular/core';
import { User } from '../../../Models/User';
import { CommonService } from '../../../Services/common.service';
import { UserService } from '../../../Services/user.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(public commonService: CommonService, public userService: UserService) { }
  model = new User(0, 2, '', '', '', '', '', '', '', '', true, null, '', '', '', '', '', '', '');
  ngOnInit() {
  }

  onSubmit() {

    this.userService.forgotPassword(this.model.Email).subscribe((data: any) => {
      if (data.status_code == "200") {
        this.commonService.successMsg = data.message;
      }
    },
      error => {
        this.commonService.errorMsg = error.error

      }
    )
  }

}

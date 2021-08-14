import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../Services/user.service';
import { ExamService } from '../../../../Services/exam.service';
import { CommonService } from '../../../../Services/common.service';
import { UserFilter } from '../../../../Models/UserFilter';
import { Subscription } from 'rxjs';
import { Assignexam } from '../../../../Models/AssignExam';
import { Router } from '@angular/router';
import { CookieService } from 'src/Services/cookie.service';


@Component({
  selector: 'app-assign-exam',
  templateUrl: './assign-exam.component.html',
  styleUrls: ['./assign-exam.component.css']
})
export class AssignExamComponent implements OnInit {
  userselectedItems;
  examselectedItems;
  pageEvent;
  userdropdownSettings = {};
  users: any = [];

  examdropdownSettings = {};
  exams: any = [];

  selectedUsers = [];
  selectedExams = [];

  filter = new UserFilter(1, 10, 0, 0, null, "", 0, 0, 0, 0, 0, '');
  subscription: Subscription;

  invalidusers = false;
  invalidexams = false;

  

  model: Assignexam[] = [];

  constructor(public userService: UserService, public commonService: CommonService, public examService: ExamService, public cookieService: CookieService, private router: Router) {
    //this.userselectedItems = [{ UserId: 9, item_text: 'Suraj Singh',disabled: true }];
  }
  ngOnInit() {
    this.userdropdownSettings = {
      singleSelection: false,
      idField: 'UserId',
      textField: 'NameWithEmail',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableCheckAll: true,
      allowSearchFilter: true
      
    };
    this.examdropdownSettings = {
      singleSelection: true,
      idField: 'ExamId',
      textField: 'Title',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableCheckAll: true,
      allowSearchFilter: true
    };
  }
  getusersbyfilter(data) {
    this.users = data[0];
    this.commonService.updateFilter(this.filter);
  }
  getexamsbyfilter(data) {
    this.exams = data[0];
    this.commonService.updateFilter(this.filter);
  }

  onUserItemSelect(item: any) {
    this.selectedUsers.push(item.UserId);
    this.invalidusers = false;
  }
  onUserItemDeSelect(item: any) {
    this.commonService.removeItemFromArray(this.selectedUsers, item.UserId);
  }
  onUserSelectAll(items: any) {
    items.forEach(element => {
      this.selectedUsers.push(element.UserId);
      this.selectedUsers = this.removeDuplicateValue(this.selectedUsers);
    });
    this.invalidusers = false;
  }
  onUserDeSelectAll(items: any) {
    this.selectedUsers = [];
  }


  onExamItemSelect(item: any) {
    this.selectedExams = [];
    this.selectedExams.push(item.ExamId);
    this.invalidexams = false;
  }
  onExamItemDeSelect(item: any) {
    this.commonService.removeItemFromArray(this.selectedExams, item.ExamId);
  }
  onExamSelectAll(items: any) {
    items.forEach(element => {
      this.selectedExams.push(element.ExamId);
      this.selectedExams = this.removeDuplicateValue(this.selectedExams);
    });
    this.invalidexams = false;
  }
  onExamDeSelectAll(items: any) {
    this.selectedExams = [];
  }
  removeDuplicateValue(arr) {
    var tmp = [];
    for (var i = 0; i < arr.length; i++) {
      if (tmp.indexOf(arr[i]) == -1) {
        tmp.push(arr[i]);
      }
    }
    return tmp;
  }
  onSubmit(data) {

    if (this.selectedUsers.length == 0 && this.selectedExams.length == 0) {
      this.invalidusers = true;
      this.invalidexams = true;
      return false;
    }
    else if (this.selectedUsers.length == 0) {
      this.invalidusers = true;
      return false;
    }
    else if (this.selectedExams.length == 0) {
      this.invalidexams = true;
      return false;
    }
    else {
      this.invalidexams = false;
      this.invalidusers = false;
      const empId = Number(this.cookieService.getCookie("uid"));
      let examid = this.selectedExams.join(',').toString();
      console.log("examid", examid);

      // this.selectedExams.forEach(examId => {
      //   examid = examId;
      // });
      let userids = this.selectedUsers.join(',').toString();
      console.log("userids", userids);
      let assignExam = new Assignexam(data.ExamDate, Number(examid), userids);

      // this.selectedUsers.forEach(userId => {

      //   let assignExam = new Assignexam(0, userId, examId, 0, data.ExamDate, empId, new Date());
      //   let assignExam = new Assignexam(data.ExamDate,);
      //   this.model.push(assignExam);


      // });
      this.examService.assignExamToUser(assignExam).subscribe((data: any) => {
        if (data.status_code == "200") {
          this.commonService.successMsg = data.message;
          setTimeout(() => {
            this.router.navigate(["admin/assignexamlist"]);
          }, 300);
        }
        else {
          this.commonService.errorMsg = data.message;
        }
      }, error => {
        this.commonService.errorMsg = error.error;
      }
      )
    }

  }

}

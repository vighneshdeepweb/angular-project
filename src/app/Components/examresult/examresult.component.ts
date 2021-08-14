import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../../Services/exam.service';
import { ResultViewModel } from '../../../Models/ResultViewModel';
import { User } from '../../../Models/User';
import { CommonService } from '../../../Services/common.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-examresult',
  templateUrl: './examresult.component.html',
  styleUrls: ['./examresult.component.css']
})
export class ExamresultComponent implements OnInit {

  user: User;
  examid: number;
  examgroupid: number;
  constructor(public commonService: CommonService, public router: Router, public examService: ExamService, private route: ActivatedRoute) {
    this.user = commonService.userdetail;
    this.examid = this.route.snapshot.params.examid;
    this.examgroupid = this.route.snapshot.params.examgroupid;
  }

  ngOnInit() {
    this.GetUserResult();

  }
  result: ResultViewModel;
  GetUserResult() {
    this.examService.GetUserResult(this.examid, this.commonService.userId, this.examgroupid).subscribe(data => {
      this.result = data[0];
    }, error => {
      if (error.status == '401') {
        this.commonService.errorMsg = "Unauthorize access";
        this.router.navigate(['error']);
      }
    });
  }
}

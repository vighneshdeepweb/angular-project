import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ExamService } from '../../../../Services/exam.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { CommonService } from '../../../../Services/common.service';
import { Router } from '@angular/router';
import { ExamFilter } from '../../../../Models/ExamFilter';
import { PageEvent } from '@angular/material/paginator';
import { User } from '../../../../Models/User';
import { AttemptedExams } from '../../../../Models/AttemptedExams';
import { ConfirmationDialogService } from '../../../../Services/confirmation-dialog.service';

@Component({
  selector: 'app-assignexam-list',
  templateUrl: './assignexam-list.component.html',
  styleUrls: ['./assignexam-list.component.css']
})
export class AssignexamListComponent implements OnInit {
  @Output() emitFilterteredExams = new EventEmitter();
  assignedExams: any = [];
  user: User;
  pageEvent;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ["ExamName", "Category", "Skill", "Duration", "TotalMarks", "TotalUsers", 'Date', 'Action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  filter = new ExamFilter(1, 10, 0, 0, null, "", 0, "", 0);
  constructor(private datePipe: DatePipe, public commonService: CommonService, public examService: ExamService, public router: Router, private confirmationDialogService: ConfirmationDialogService) {
    this.user = commonService.userdetail;
  }

  ngOnInit() {
    this.GetAllAssignedExams();
  }

  GetAllAssignedExams() {

    if (this.user.RoleId != 1) {
      this.filter.userid = this.user.UserId;
      this.filter.date = this.datePipe.transform(new Date(), "yyyy-MM-dd")
    }

    this.examService.GetAssignExamList(this.filter).subscribe(data => {
      if (data[0].length == 0) {
        this.assignedExams = null;
        this.filter.totalcount = 0;
        this.dataSource = new MatTableDataSource();
      }
      else {
        this.assignedExams = data[0];
        this.filter.totalcount = this.assignedExams[0].TotalCount
        this.dataSource = new MatTableDataSource(this.assignedExams);
      }

    },
      error => {
        if (error.status == '401') {
          this.commonService.errorMsg = "Unauthorize access";
          this.router.navigate(['error']);
        }
      }
    )
  }

  public getServerData(event?: PageEvent) {
    this.filter.pagesize = event.pageSize;
    this.filter.pageno = event.pageIndex + 1
    this.GetAllAssignedExams();

  }

  assignNewExam() {
    this.router.navigate(["/admin/assignexam"]);
  }

  startExam(data: any) {

    window.open('takeexam/' + data.ExamId + '/' + data.ExamGroupId, '_blank', 'fullscreen=yes,resizable=No,scrollbars=No');
    //let attemptedExam = new AttemptedExams(0, data.ExamId, this.commonService.userId, 0, 0, 0, 0, 0, false, new Date(), 2);
    // this.examService.SaveAttemptedExams(attemptedExam).subscribe((result: any) => {
    //   if (result.status_code == "200") {
    //     window.open('takeexam/' + data.ExamId, '_blank', 'fullscreen=yes,resizable=No,scrollbars=No');
    //   }
    //   else {
    //     this.commonService.errorMsg = result.message;
    //   }

    // });


  }

  deleteAssignExam(data: any) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.examService.DeleteAssignedExams(data.ExamGroupId).subscribe((data: any) => {
        if (data.status_code == "200") {

          setTimeout(() => {
            this.GetAllAssignedExams();
          }, 300);
          this.commonService.successMsg = data.message;
        }
        else {
          this.commonService.errorMsg = data.message;
        }
      },
        error => {
          this.commonService.errorMsg = error.error;
        });
    }
  }

  showPopup(exam) {
    //console.log(exam);
    let examId = "13";
    this.emitFilterteredExams.emit(examId);
    this.confirmationDialogService.OpenDialog(examId);
  }

  viewResult(data: any) {
    window.open('result/' + data.ExamId + '/' + data.ExamGroupId, '_blank', 'fullscreen=yes,resizable=No,scrollbars=No');
  }

  restartExam(data: any) {
    window.open('takeexam/' + data.ExamId + '/' + data.ExamGroupId, '_blank', 'fullscreen=yes,resizable=No,scrollbars=No');
  }

}

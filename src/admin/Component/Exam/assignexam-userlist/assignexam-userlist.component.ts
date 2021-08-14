import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ExamService } from '../../../../Services/exam.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { CommonService } from '../../../../Services/common.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-assignexam-userlist',
  templateUrl: './assignexam-userlist.component.html',
  styleUrls: ['./assignexam-userlist.component.css']
})
export class AssignexamUserlistComponent implements OnInit {

  @Input() examId: string;

  examUserList: any = [];
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ["FirstName", "LastName", "UniversityName", "Date"];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(public examService: ExamService, public commonService: CommonService, private activeModal: NgbActiveModal) {
    console.log("examid", this.examId);
    this.GetAllAssignedExams();
    
  }
  ngOnInit() {

  }
  GetAllAssignedExams() {
    
    this.examService.GetAssignExamUserList(this.examId).subscribe(data => {
      this.examUserList = data;
      this.dataSource = new MatTableDataSource(this.examUserList);
    },
      error => {
        if (error.status == '401') {
          this.commonService.errorMsg = "Unauthorize access";
        }
      }
    )
  }
}

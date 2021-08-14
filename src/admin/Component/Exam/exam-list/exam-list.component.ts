import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ExamService } from '../../../../Services/exam.service';
import { Exam } from '../../../../Models/Exam';
import { Router } from '@angular/router';
import { CommonService } from '../../../../Services/common.service';
import { ExamFilter } from 'src/Models/ExamFilter';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {
  pageEvent;
  exams: any = [];
  displayedColumns: string[] = ['Title', 'Category', 'Skill', 'Duration', 'TotalMarks', 'PassMarks', 'Active', 'Action'];
  dataSource = new MatTableDataSource();
  filter = new ExamFilter(1, 10, 0, 0, 0, "", 0, "", 0);
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(public commonService: CommonService, public examService: ExamService, public router: Router) { }

  ngOnInit() {
    this.getAllExams();
  }

  addNewExam() {
    localStorage.removeItem("examid");
    this.router.navigate(["admin/addexam"]);
  }
  public getServerData(event?: PageEvent) {
    this.filter.pagesize = event.pageSize;
    this.filter.pageno = event.pageIndex + 1
    this.getAllExams();

  }
  getAllExams() {
    this.examService.getExamList(this.filter).subscribe(result => {
      this.exams = result[0];
      this.filter.totalcount = this.exams[0].TotalCount
      this.dataSource = new MatTableDataSource(this.exams);
    },
      error => {
        if (error.status == '401') {
          this.commonService.errorMsg = "Unauthorize access";
          this.router.navigate(['error']);
        }
      }
    )
  }

  editExam(exam: Exam) {
    localStorage.setItem("examid", exam.ExamId.toString());
    this.router.navigate(["admin/addexam"]);
  }
  deleteExam(exam: Exam) {
    if (confirm('Are you sure .You want to delete this record?')) {
      this.examService.deleteExam(exam.ExamId).subscribe((data: any) => {
        if (data.status_code == "200") {
          this.exams = this.exams.filter(u => u !== exam);
          this.dataSource = new MatTableDataSource<Exam>(this.exams);
          this.dataSource.paginator = this.paginator;
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

}

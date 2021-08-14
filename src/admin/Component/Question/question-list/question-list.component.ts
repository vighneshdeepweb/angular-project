import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatTableDataSource,MatSort } from '@angular/material';
import { QuestionService } from '../../../../Services/question.service';
import { Question } from '../../../../Models/Question';
import { Router } from '@angular/router';
import { CommonService } from '../../../../Services/common.service';
import { QuestionFilter } from '../../../../Models/QuestionFilters';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  pageEvent;
  questions: any = [];
  subscription: Subscription;
  filter = new QuestionFilter(1, 10, 0, 0, "", "", "");
  displayedColumns: string[] = ['Category', 'Skill', 'QuestionText', 'Marks', 'QuestionType', 'Date', 'Action'];
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource = new MatTableDataSource();
  constructor(public commonService: CommonService,public queService: QuestionService, public router: Router) {
    this.subscription = this.queService.getFilter().subscribe((result: any) => {
      this.filter = result.filter;
    });
  }

  ngOnInit() {
    this.getAllQuestions();
  }

  public getServerData(event?: PageEvent) {
    this.filter.pagesize = event.pageSize;
    this.filter.pageno = event.pageIndex + 1
    this.getAllQuestions();

  }
  getquestionsbyfilter(data) {
    this.questions = data[0];
    this.filter.totalcount = this.questions.length;
    this.queService.updateFilter(this.filter);
    this.dataSource = new MatTableDataSource(this.questions);
    
  }

  getAllQuestions() {
    this.queService.getQuestionByFilters(this.filter).subscribe(result => {
      this.questions = result[0];
      this.filter.totalcount = this.questions[0].TotalCount;
      this.dataSource = new MatTableDataSource(this.questions);
      this.queService.updateFilter(this.filter);
      
      //this.dataSource.paginator = this.paginator;
    },
      error => {
        if (error.status == '401') {
          this.commonService.errorMsg = "Unauthorize access";
          this.router.navigate(['error']);
        }
      }
    )
  }
  addNewQuestion() {
    localStorage.removeItem("queid");
    this.router.navigate(["admin/addquestion"]);
  }
  editQuestion(question: Question) {
    localStorage.setItem("queid", question.QuestionId.toString());
    this.router.navigate(["admin/addquestion"]);
  }
  deleteQuestion(que: Question) {
    if (confirm('Are you sure .You want to delete this record?')) {
      this.queService.deleteQuestion(que.QuestionId).subscribe((data: any) => {

        if (data.status_code == "200") {
          this.questions = this.questions.filter(u => u !== que);
          this.dataSource = new MatTableDataSource<Question>(this.questions);
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

  onRowClicked(row) {
    //console.log('Row clicked: ', row);
  }

}

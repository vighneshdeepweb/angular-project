import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { CommonService } from '../../../../Services/common.service';
import { ExamService } from '../../../../Services/exam.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { ExcelExportService } from '../../../../Services/excel-export.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-attempted-exam',
  templateUrl: './attempted-exam.component.html',
  styleUrls: ['./attempted-exam.component.css']
})
export class AttemptedExamComponent implements OnInit {

  attemptedExams: any = [];
  pageEvent;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ["ExamName", "TotalMarks", "TotalUsers", "AttemptedUsers", 'Date', 'Action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(public commonService: CommonService, public examService: ExamService, public router: Router, public exportService: ExcelExportService) { }

  ngOnInit() {
    this.GetAllAttemptedExamsList();
  }
  GetAllAttemptedExamsList() {
    this.examService.GetAttemptedExamList().subscribe(data => {
      if (data[0].length == 0) {
        this.attemptedExams = null;
        this.dataSource = new MatTableDataSource();
      }
      else {
        this.attemptedExams = data[0];
        console.log(this.attemptedExams);
        this.dataSource = new MatTableDataSource(this.attemptedExams);
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
  exportdata(element: any): void {
    console.log(element);
    let fileName = "data.csv";
    this.examService.DownloadResult(element.ExamGroupId).subscribe((data) => {
      console.log("downloaddata", data);
      let file = new Blob();
      file = new Blob([data], { type: 'text/csv' });
      saveAs(file, fileName);
    });


    //this.exportService.exportAsExcelFile(this.attemptedExams, 'sample');
    // var FileSaver = require('file-saver');
    // var blob = new Blob(["Hello, world!"], { type: "text/plain;charset=utf-8" });
    // FileSaver.saveAs(blob, "hello world.txt");
  }

}

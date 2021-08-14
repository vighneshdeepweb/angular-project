import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ExamService } from '../../../Services/exam.service';
import { CommonService } from '../../../Services/common.service';
import { Router } from '@angular/router';
import { ExamFilter } from 'src/Models/ExamFilter';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-assignedexamlist',
  templateUrl: './assignedexamlist.component.html',
  styleUrls: ['./assignedexamlist.component.css']
})
export class AssignedexamlistComponent implements OnInit {



  constructor(public commonService: CommonService, public examService: ExamService, public router: Router) { }

  ngOnInit() {

  }
}

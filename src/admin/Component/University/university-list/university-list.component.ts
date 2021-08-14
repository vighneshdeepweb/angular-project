import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatFormFieldModule } from '@angular/material';
import { UniversityService } from '../../../../Services/university.service';
import { University } from '../../../../Models/University';
import { Router } from '@angular/router';
import { CommonService } from '../../../../Services/common.service';

@Component({
  selector: 'app-university-list',
  templateUrl: './university-list.component.html',
  styleUrls: ['./university-list.component.css']
})
export class UniversityListComponent implements OnInit {

  universities: any = [];
  displayedColumns: string[] = ['UniversityName', 'CityName', 'StateName', 'CountryName', 'Active', 'Date', 'Action'];
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource = new MatTableDataSource();

  constructor(public commonService: CommonService, public universityService: UniversityService, public router: Router) { }

  ngOnInit() {
    this.getAllUniversity();
  }
  getAllUniversity() {

    this.universityService.getAllUniversity(-1).subscribe(data => {
      this.universities = data;
      this.dataSource = new MatTableDataSource(this.universities);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
      error => {
        if (error.status == '401') {
          this.commonService.errorMsg = "Unauthorize access";
          this.router.navigate(['error']);
        }
      }
    )
  }
  addNewUniversity() {
    localStorage.removeItem("universityid");
    this.router.navigate(["admin/adduniversity"]);
  }
  editUniversity(university: University) {
    localStorage.setItem("universityid", university.UniversityId.toString());
    this.router.navigate(["admin/adduniversity"]);
  }
  deleteUniversity(university: University) {
    if (confirm('Are you sure .You want to delete this record?')) {
      this.universityService.deleteUniversity(university.UniversityId).subscribe((data: any) => {
        if (data.status_code == "200") {
          this.universities = this.universities.filter(u => u !== university);
          this.dataSource = new MatTableDataSource<University>(this.universities);
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

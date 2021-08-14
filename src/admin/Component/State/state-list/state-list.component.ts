import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatFormFieldModule } from '@angular/material';
import { StateService } from '../../../../Services/state.service';
import { State } from '../../../../Models/State';
import { Router } from '@angular/router';
import { CommonService } from '../../../../Services/common.service';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.css']
})
export class StateListComponent implements OnInit {
  states: any = [];
  displayedColumns: string[] = ['StateName', 'CountryName', 'Active', 'Date', 'Action'];
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource = new MatTableDataSource();
  constructor(public commonService: CommonService,public stateService: StateService, public router: Router) {

    this.getAllStates();
   }

  ngOnInit() {
    
  }
  getAllStates() {

    this.stateService.getAllState(-1).subscribe(data => {
      this.states = data;
      this.dataSource = new MatTableDataSource(this.states);
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
  addNewState() {
    localStorage.removeItem("statid");
    this.router.navigate(["admin/addstate"]);
  }
  editState(stat: State) {
    localStorage.setItem("statid", stat.StateId.toString());
    this.router.navigate(["admin/addstate"]);
  }
  deleteState(stat: State) {
    if (confirm('Are you sure .You want to delete this record?')) {
      this.stateService.deleteState(stat.StateId).subscribe((data: any) => {
        if (data.status_code == "200") {
          this.states = this.states.filter(u => u !== stat);
          this.dataSource = new MatTableDataSource<State>(this.states);
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

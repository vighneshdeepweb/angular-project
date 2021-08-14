import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatFormFieldModule } from '@angular/material';
import { UserService } from '../../../../Services/user.service';
import { User } from '../../../../Models/User';
import { Router } from '@angular/router';
import { CommonService } from '../../../../Services/common.service';
import { UserFilter } from 'src/Models/UserFilter';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  pageEvent;
  users: any = [];
  filter = new UserFilter(1, 10, 0, 0, null, "", 0, 0, 0, 0, 0, '');
  displayedColumns: string[] = ['Name', 'Email', 'UniversityName', 'CityName', 'StateName', 'CountryName', 'Date','Action'];
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource = new MatTableDataSource();
  constructor(public commonService: CommonService, public userService: UserService, public router: Router) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.searchUser(this.filter).subscribe(result => {
      this.users = result[0];
      this.filter.totalcount = this.users[0].TotalCount
      this.dataSource = new MatTableDataSource(this.users);
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
  deleteUser(user: User){
    if (confirm('Are you sure you want to delete this record?')) {
      this.userService.deleteUser(user.UserId).subscribe((data: any) => {
        if (data.status_code == "200") {
          this.users = this.users.filter(u => u !== user);
          this.dataSource = new MatTableDataSource<User>(this.users);
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
  editUser(user: User) {
    localStorage.setItem("userid", user.UserId.toString());
    this.router.navigate(["admin/adduser"]);
  }
  public getServerData(event?: PageEvent) {
    this.filter.pagesize = event.pageSize;
    this.filter.pageno = event.pageIndex + 1
    this.getAllUsers();

  }

}

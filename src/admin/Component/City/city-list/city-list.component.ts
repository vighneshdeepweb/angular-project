import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatFormFieldModule } from '@angular/material';
import { CityService } from '../../../../Services/city.service';
import { City } from '../../../../Models/City';
import { Router } from '@angular/router';
import { CommonService } from '../../../../Services/common.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {

  cities: any = [];
  displayedColumns: string[] = ['CityName', 'StateName', 'CountryName', 'Active', 'Date', 'Action'];
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource = new MatTableDataSource();
  constructor(public commonService: CommonService, public cityService: CityService, public router: Router) { }

  ngOnInit() {
    this.getAllCities();
  }
  getAllCities() {

    this.cityService.getAllCity(-1).subscribe(data => {
      this.cities = data;
      this.dataSource = new MatTableDataSource(this.cities);
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
  addNewCity() {
    localStorage.removeItem("cityid");
    this.router.navigate(["admin/addcity"]);
  }
  editCity(city: City) {
    localStorage.setItem("cityid", city.CityId.toString());
    this.router.navigate(["admin/addcity"]);
  }
  deleteCity(city: City) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.cityService.deleteCity(city.CityId).subscribe((data: any) => {
        if (data.status_code == "200") {
          this.cities = this.cities.filter(u => u !== city);
          this.dataSource = new MatTableDataSource<City>(this.cities);
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

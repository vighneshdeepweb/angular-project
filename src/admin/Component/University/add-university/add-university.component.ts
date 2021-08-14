import { Component, OnInit } from '@angular/core';
import { UniversityService } from '../../../../Services/university.service';
import { CityService } from '../../../../Services/city.service';
import { StateService } from '../../../../Services/state.service';
import { CountryService } from '../../../../Services/country.service';
import { University } from 'src/Models/University';
import { CommonService } from '../../../../Services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-university',
  templateUrl: './add-university.component.html',
  styleUrls: ['./add-university.component.css']
})
export class AddUniversityComponent implements OnInit {

  countries: any = [];
  states: any = [];
  cities: any = [];
  model = new University(0, "", "", "", "", true, 0, null, 0, null);
  constructor(public commonService: CommonService, public countryService: CountryService, public stateService: StateService, public cityService: CityService, public universityService: UniversityService, public router: Router) { }

  ngOnInit() {
    this.bindCountry();
    const universityid = localStorage.getItem('universityid');
    if (universityid) {
      this.universityService.getUniversityById(Number(universityid)).subscribe((data: any) => {
        this.model = data;
        this.bindState(this.model.CountryId);
        this.bindCity(this.model.StateId);
      });
    }
  }
  bindCountry() {
    this.countryService.getCountryList().subscribe(data => {
      this.countries = data;
    },
      error => {
        this.commonService.errorMsg = error.error;
      }
    )
  }
  bindState(countryid) {
    this.stateService.getStateByCountryId(countryid).subscribe(data => {
      this.states = data;
    },
      error => {
        this.commonService.errorMsg = error.error;
      }
    )
  }
  bindCity(stateid) {
    this.cityService.getCityByStateId(stateid).subscribe(data => {
      this.cities = data;
    },
      error => {
        this.commonService.errorMsg = error.error;
      }
    )
  }

  onSubmit() {
    const empid = localStorage.getItem('uid');
    const universityid = localStorage.getItem('universityid');
    if (universityid) {
      this.model.ModifiedDate = new Date();
      this.model.ModifiedBy = Number(empid);
      this.universityService.updateUniversity(this.model).subscribe((data: any) => {
        if (data.status_code == "200") {
          this.commonService.successMsg = data.message;
          setTimeout(() => {
            this.router.navigate(["admin/university"]);
          }, 300);
        }
        else {
          this.commonService.errorMsg = data.message;
        }

      },
        error => {
          this.commonService.errorMsg = error.error;
        }
      )
    }
    else {
      this.model.CreatedDate = new Date();
      this.model.CreatedBy = Number(empid);
      this.universityService.saveUniversity(this.model).subscribe((data: any) => {
        if (data.status_code == "200") {
          this.commonService.successMsg = data.message;
          setTimeout(() => {
            this.router.navigate(["admin/university"]);
          }, 300);
        }
        else {
          this.commonService.errorMsg = data.message;
        }

      },
        error => {
          this.commonService.errorMsg = error.error;

        }
      )
    }
  }

}

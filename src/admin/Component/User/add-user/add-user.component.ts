import { Component, OnInit } from '@angular/core';
import { CityService } from '../../../../Services/city.service';
import { StateService } from '../../../../Services/state.service';
import { CountryService } from '../../../../Services/country.service';
import { CommonService } from '../../../../Services/common.service';
import { UniversityService } from '../../../../Services/university.service';
import { Router } from '@angular/router';
import { User } from '../../../../Models/User';
import { UserService } from '../../../../Services/user.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  countries: any = [];
  states: any = [];
  cities: any = [];
  universities: any = [];
  model = new User(0, 2, '', '', '', '', '', '', '', '', true, null,'','','','','','','');
  constructor(public commonService: CommonService, public countryService: CountryService, public stateService: StateService, public cityService: CityService, public router: Router, public userService: UserService,public universityService: UniversityService) { }

  ngOnInit() {
    this.bindCountry();
    const userid = localStorage.getItem('userid');
    if (userid) {
      this.userService.getUserById(Number(userid)).subscribe((data: any) => {
        this.model = data;
        this.bindState(this.model.CountryId);
        this.bindCity(this.model.StateId);
        this.bindUniversity(this.model.CityId);
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
  bindUniversity(cityid) {
    this.universityService.getUniversityByCityId(cityid).subscribe(data => {
      this.universities = data;
    },
      error => {
        this.commonService.errorMsg = error.error;
      }
    )
  }
  onSubmit() {
    const empid = localStorage.getItem('uid');
    const userid = localStorage.getItem('userid');
    if (userid) {
      // this.model.ModifiedDate = new Date();
      // this.model.ModifiedBy = Number(empid);
      this.userService.updateUser(this.model).subscribe((data: any) => {
        if (data.status_code == "200") {
          this.commonService.successMsg = data.message;
          setTimeout(() => {
            this.router.navigate(["admin/user"]);
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

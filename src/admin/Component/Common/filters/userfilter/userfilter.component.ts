import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserFilter } from '../../../../../Models/UserFilter';
import { CommonService } from '../../../../../Services/common.service';
import { CountryService } from '../../../../../Services/country.service';
import { StateService } from '../../../../../Services/state.service';
import { CityService } from '../../../../../Services/city.service';
import { UniversityService } from '../../../../../Services/university.service';
import { UserService } from '../../../../../Services/user.service';

@Component({
  selector: 'app-userfilter',
  templateUrl: './userfilter.component.html',
  styleUrls: ['./userfilter.component.css']
})
export class UserfilterComponent implements OnInit {
  countries: any = [];
  states: any = [];
  cities: any = [];
  universities: any = [];
  model: any;
  @Output() emitFilterteredUsers = new EventEmitter();
  constructor(public commonService: CommonService, public countryService: CountryService, public stateService: StateService, public cityService: CityService, public universityService: UniversityService, public userService: UserService) {
    this.model = new UserFilter(1, 10, 0, 0, null, "", 0, 0, 0, 0, 0, '');
  }

  ngOnInit() {
    this.bindCountry();
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

  searchUser() {
    if (this.model.date != "") {
      this.model.date = this.model.date.getMonth() + 1 + "/" + ("0" + this.model.date.getDate()).slice(-2) + "/" + this.model.date.getFullYear();
    }
    else {
      this.model.date = "";
    }

    this.userService.searchUser(this.model).subscribe((data: any) => {
      this.emitFilterteredUsers.emit(data);
      this.commonService.updateFilter(this.model);
    },
      error => {
        this.commonService.errorMsg = error.error;
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { CityService } from '../../../../Services/city.service';
import { StateService } from '../../../../Services/state.service';
import { CountryService } from '../../../../Services/country.service';
import { City } from 'src/Models/City';
import { CommonService } from '../../../../Services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {

  countries: any = [];
  states: any = [];
  model = new City(0, "", "", "", true, 0, null, 0, null);
  constructor(public commonService: CommonService, public countryService: CountryService, public stateService: StateService, public cityService: CityService, public router: Router) { }

  ngOnInit() {
    this.bindCountry();
    const cityid = localStorage.getItem('cityid');
    if (cityid) {
      this.cityService.getCityById(Number(cityid)).subscribe((data: any) => {
        this.model = data;
        this.bindState(this.model.CountryId);
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
  onSubmit() {
    const empid = localStorage.getItem('uid');
    const cityid = localStorage.getItem('cityid');
    if (cityid) {
      this.model.ModifiedDate = new Date();
      this.model.ModifiedBy = Number(empid);
      this.cityService.updateCity(this.model).subscribe((data: any) => {
        if (data.status_code == "200") {
          this.commonService.successMsg = data.message;
          setTimeout(() => {
            this.router.navigate(["admin/city"]);
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
      this.cityService.saveCity(this.model).subscribe((data: any) => {
        if (data.status_code == "200") {
          this.commonService.successMsg = data.message;
          setTimeout(() => {
            this.router.navigate(["admin/city"]);
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

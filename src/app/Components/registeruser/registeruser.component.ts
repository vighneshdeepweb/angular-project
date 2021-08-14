import { Component, OnInit } from '@angular/core';
import { User } from '../../../Models/User';
import { UserService } from '../../../Services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CountryService } from '../../../Services/country.service';
import { StateService } from '../../../Services/state.service';
import { CityService } from '../../../Services/city.service';
import { CommonService } from '../../../Services/common.service';
import { UniversityService } from '../../../Services/university.service';
import { CategoryService } from '../../../Services/category.service';

@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.css']
})
export class RegisteruserComponent implements OnInit {
  InterestedSkills;
  model = new User(0, 2, '', '', '', '', '', '', '', '', true, null, '', '', '', '', '', '', '');
  countries: any = [];
  states: any = [];
  cities: any = [];
  universities: any = [];
  categories: any = [];
  catdropdownSettings = {};
  categoryids = [];
  invalidcategories = false;
  constructor(public commonService: CommonService, private router: Router, private route: ActivatedRoute, public userService: UserService, public countryService: CountryService, public stateService: StateService, public cityService: CityService, public universityService: UniversityService, private categoryService: CategoryService) {
    this.bindCategories();
  }

  ngOnInit() {
    this.catdropdownSettings = {
      singleSelection: false,
      idField: 'CategoryId',
      textField: 'CategoryName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableCheckAll: false,
      allowSearchFilter: true
    };
    this.bindCountry();


  }
  onSubmit() {

    this.model.InterestedSkills = this.categoryids.join(',').toString();
    if (this.model.InterestedSkills == "") {
      this.invalidcategories = true;
      return false;
    }
    else {
      this.invalidcategories = false;
    }
    this.model.CreatedDate = new Date();
    this.userService.registerUser(this.model).subscribe((data: any) => {
      if (data.status_code == "200") {
        this.commonService.successMsg = data.message;
        this.router.navigate(["login"]);
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
  bindCategories() {
    this.categoryService.getAllCategory(1).subscribe(data => {
      this.categories = data;
    },
      error => {
        this.commonService.errorMsg = error.error;
      })
  }
  //#region Category Multi Select
  onCatItemSelect(item: any) {
    this.categoryids.push(item.CategoryId);
    this.categoryids = this.removeDuplicateValue(this.categoryids);
    this.invalidcategories = false;
  }
  onCatItemDeSelect(item: any) {
    this.removeCategoryId(item.CategoryId);
    this.categoryids = this.removeDuplicateValue(this.categoryids);
  }
  removeCategoryId(categoryid) {
    this.categoryids.forEach((item, index) => {
      if (item === categoryid) this.categoryids.splice(index, 1);
    });
  }
  removeDuplicateValue(arr) {
    var tmp = [];
    for (var i = 0; i < arr.length; i++) {
      if (tmp.indexOf(arr[i]) == -1) {
        tmp.push(arr[i]);
      }
    }
    return tmp;
  }
  //#endregion
}

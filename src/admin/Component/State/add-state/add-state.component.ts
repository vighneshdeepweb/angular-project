import { Component, OnInit, HostListener,Input,Output ,EventEmitter } from '@angular/core';
import { CountryService } from '../../../../Services/country.service';
import { StateService } from '../../../../Services/state.service';
import { State } from 'src/Models/State';
import { CommonService } from '../../../../Services/common.service';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-add-state',
  templateUrl: './add-state.component.html',
  styleUrls: ['./add-state.component.css']
})
export class AddStateComponent implements OnInit {
  countries: any = [];
  model = new State(0, "", "", true, 0, null, 0, null);
  constructor(public commonService: CommonService, public countryService: CountryService, public stateService: StateService, public router: Router) { }
  ngOnInit() {

    this.bindCountry();
    const statid = localStorage.getItem('statid');
    if (statid) {
      this.stateService.getStateById(Number(statid)).subscribe((data: any) => {
        this.model = data;
      });
    }
  }
  
  bindCountry() {
    this.countryService.getCountryList().subscribe(data => {
      this.countries = data;
    },
      error => {
        console.log(error.error);
      }
    )

  }

  onSubmit(event?) {
    const empid = localStorage.getItem('uid');
    const statid = localStorage.getItem('statid');
    if (statid) {
      this.model.ModifiedDate = new Date();
      this.model.ModifiedBy = Number(empid);
      this.stateService.updateState(this.model).subscribe((data: any) => {
        if (data.status_code == "200") {
          this.commonService.successMsg = data.message;
          setTimeout(() => {
            this.router.navigate(["admin/state"]);
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
      this.stateService.saveState(this.model).subscribe((data: any) => {
        if (data.status_code == "200") {
          this.commonService.successMsg = data.message;
          setTimeout(() => {
            this.router.navigate(["admin/state"]);
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

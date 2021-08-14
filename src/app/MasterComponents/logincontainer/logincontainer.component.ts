import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { CommonService } from '../../../Services/common.service';

@Component({
  selector: 'app-logincontainer',
  templateUrl: './logincontainer.component.html',
  styleUrls: ['./logincontainer.component.css']
})
export class LogincontainerComponent implements OnInit {
  subscription: Subscription;
  constructor(public commonService:CommonService) { }

  ngOnInit() {
    const source = interval(10000);
    this.subscription = source.subscribe(val => this.clearMsg());
  }
  clearMsg(): void {
    this.commonService.errorMsg = '';
    this.commonService.successMsg = '';
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../Services/common.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {
  subscription: Subscription;
  constructor(public commonService: CommonService) { }

  ngOnInit() {
    const source = interval(15000);
    this.subscription = source.subscribe(val => this.clearMsg());
  }
  clearMsg(): void {
    this.commonService.errorMsg = '';
    this.commonService.successMsg = '';
  }
}

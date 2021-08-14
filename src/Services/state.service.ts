import { Injectable } from '@angular/core';
import { State } from '../Models/State';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  httpOptions: any;
  apiUrl: string;
  authKey: string;
  constructor(private http: HttpClient,public commonService:CommonService) {
    this.apiUrl = commonService.baseUrl + 'state/';
    this.authKey = commonService.authKey;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authKey}`,
      })
    };
  }
  getAllState(status?: number) {
    return this.http.get<State>(this.apiUrl + "getstatelist?status=" + status + "", this.httpOptions);
  }
  saveState(stat: State) {
    return this.http.post<State>(this.apiUrl + 'createstate', stat, this.httpOptions);
  }
  deleteState(id: number) {
    return this.http.delete(this.apiUrl + 'deletestate/' + id, this.httpOptions);
  }
  getStateById(id: number) {
    return this.http.get<State>(this.apiUrl + 'getstatebyid/' + id, this.httpOptions);
  }
  getStateByCountryId(countryid: number) {
    return this.http.get<State>(this.apiUrl + 'getstatebycountryid/' + countryid, this.httpOptions);
  }
  updateState(stat: State) {
    return this.http.put<State>(this.apiUrl + 'updatestate/' + stat.StateId, stat, this.httpOptions);
  }
}

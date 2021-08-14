import { Injectable } from '@angular/core';
import { Country } from '../Models/Country';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  httpOptions: any;
  apiUrl: string;
  constructor(private http: HttpClient,public commonService:CommonService) {
    this.apiUrl = commonService.baseUrl + 'country/';
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }
  getCountryList() {
    return this.http.get<Country>(this.apiUrl + 'getcountrylist', this.httpOptions);
  }
}

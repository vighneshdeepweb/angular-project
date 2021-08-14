import { Injectable } from '@angular/core';
import { City } from '../Models/City';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  httpOptions: any;
  apiUrl: string;
  authKey: string;
  constructor(private http: HttpClient,public commonService:CommonService) {
    this.apiUrl = commonService.baseUrl + 'city/';
    this.authKey = commonService.authKey;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authKey}`,
      })
    };
  }

  getAllCity(status?: number) {
    return this.http.get<City>(this.apiUrl + "getcitylist?status=" + status + "", this.httpOptions);
  }
  saveCity(city: City) {
    return this.http.post<City>(this.apiUrl + 'createcity', city, this.httpOptions);
  }
  deleteCity(id: number) {
    return this.http.delete(this.apiUrl + 'deletecity/' + id, this.httpOptions);
  }
  getCityById(id: number) {
    return this.http.get<City>(this.apiUrl + 'getcitybyid/' + id, this.httpOptions);
  }
  updateCity(city: City) {
    return this.http.put<City>(this.apiUrl + 'updatecity/' + city.CityId, city, this.httpOptions);
  }
  getCityByStateId(stateid: number) {
    return this.http.get<City>(this.apiUrl + 'getcitybystateid/' + stateid, this.httpOptions);
  }

}

import { Injectable } from '@angular/core';
import { University } from '../Models/University';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  httpOptions: any;
  apiUrl: string;
  authKey: string;

  constructor(private http: HttpClient, public commonService: CommonService) {
    this.apiUrl = commonService.baseUrl + 'university/';
    this.authKey = commonService.authKey;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authKey}`,
      })
    };
  }

  getAllUniversity(status?: number) {
    return this.http.get<University>(this.apiUrl + "getuniversitylist?status=" + status + "", this.httpOptions);
  }
  saveUniversity(university: University) {
    return this.http.post<University>(this.apiUrl + 'createuniversity', university, this.httpOptions);
  }
  deleteUniversity(id: number) {
    return this.http.delete(this.apiUrl + 'deleteuniversity/' + id, this.httpOptions);
  }
  getUniversityById(id: number) {
    return this.http.get<University>(this.apiUrl + 'getuniversitybyid/' + id, this.httpOptions);
  }
  updateUniversity(university: University) {
    return this.http.put<University>(this.apiUrl + 'updateuniversity/' + university.UniversityId, university, this.httpOptions);
  }
  getUniversityByCityId(cityid: number) {
    return this.http.get<University>(this.apiUrl + 'getuniversitybycityid/' + cityid, this.httpOptions);
  }

}

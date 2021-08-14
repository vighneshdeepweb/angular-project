import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Category } from '../Models/Category';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  httpOptions: any;
  apiUrl: string;
  authKey: string;
  constructor(private http: HttpClient, public commonService: CommonService) {
    this.apiUrl = this.commonService.baseUrl + 'category/';
    this.authKey = this.commonService.authKey;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authKey}`,
      })
    };
  }
  getAllCategory(status?: number) {
    return this.http.get<Category>(this.apiUrl + "getcategorylist?status=" + status + "", this.httpOptions);
  }
  getCategoryWithQueCount() {
    return this.http.get<Category>(this.apiUrl + "getcategorywithquecount", this.httpOptions);
  }
  saveCategory(cat: Category) {
    return this.http.post<Category>(this.apiUrl + 'createcategory', cat, this.httpOptions);
  }
  deleteCategory(id: number) {
    return this.http.delete(this.apiUrl + id + '/deletecategory', this.httpOptions);
  }
  getCategoryById(id: number) {
    return this.http.get<Category>(this.apiUrl + id + '/getcategorybyid', this.httpOptions);
  }
  updateCategory(cat: Category) {
    return this.http.put<Category>(this.apiUrl + cat.CategoryId + '/updatecategory', cat, this.httpOptions);
  }
}

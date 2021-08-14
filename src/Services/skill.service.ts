import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Skill } from '../Models/Skill';
import { Skill_Category_ViewModel } from '../Models/Skill_Category_ViewModel';
import { skill_category_mapping } from '../Models/skill_category_mapping';

import { CommonService } from './common.service';
import { JsonResponse } from 'src/Models/JsonResponse';
@Injectable({
  providedIn: 'root'
})
export class SkillService {
  httpOptions: any;
  apiUrl: string;
  authKey: string;
  constructor(private http: HttpClient, public commonService: CommonService) {
    this.apiUrl = commonService.baseUrl + 'skill/';
    this.authKey = commonService.authKey;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authKey}`,
      })
    };
  }
  getAllSkill(status?: number) {
    return this.http.get<Skill>(this.apiUrl + "getskilllist?status=" + status + "", this.httpOptions);
  }
  saveSkill(skil: Skill_Category_ViewModel) {
    return this.http.post<Skill>(this.apiUrl + 'createskill', skil, this.httpOptions);
  }
  deleteSkill(skillid: number, categoryid: number) {
    return this.http.delete(this.apiUrl + 'deleteskill?skillid=' + skillid + '&categoryid=' + categoryid + '', this.httpOptions);
  }
  getSkillById(id: number) {
    return this.http.get<Skill>(this.apiUrl + id + '/getskillbyid', this.httpOptions);
  }
  getSkillByName(name: string) {
    return this.http.get<Skill>(this.apiUrl + 'getskillbyname?name=' + name + '', this.httpOptions);
  }
  updateSkill(skil: Skill_Category_ViewModel) {
    return this.http.post<JsonResponse>(this.apiUrl + 'updateskill', skil, this.httpOptions);
  }

  getSkillsByCategoryId(categoryId, skillid) {
    return this.http.get(this.apiUrl + 'getskillsbycategoryid?categoryid=' + categoryId + '&skillid=' + skillid + '', this.httpOptions);
  }
  getSkillsByCategoryIds(categoryIds) {
    return this.http.get(this.apiUrl + 'getskillsbycategoryids?categoryid=' + categoryIds + '', this.httpOptions);
  }
  saveSkillCategoryMapping(skillcatmapping: skill_category_mapping) {
    return this.http.post<skill_category_mapping>(this.apiUrl + 'saveskillcategorymapping', skillcatmapping, this.httpOptions);
  }

}

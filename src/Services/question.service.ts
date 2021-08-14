import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Question } from '../Models/Question';
import { CommonService } from './common.service';
import { QuestionFilter } from '../Models/QuestionFilters';
import { Observable, Subject } from 'rxjs';
import { DifficultyLevel } from '../Models/DifficultyLevel';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  httpOptions: any;
  apiUrl: string;
  authKey: string;

  private subject = new Subject<any>();
  constructor(private http: HttpClient, public commonService: CommonService) {
    this.apiUrl = commonService.baseUrl + "question/";
    this.authKey = commonService.authKey;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authKey}`,
      })
    };
  }
  getAllQuestions(pageno: number, pagesize: number) {
    return this.http.get<Question>(this.apiUrl + "getquestionlist?pageno=" + pageno + "&pagesize=" + pagesize + "", this.httpOptions);
  }
  saveQuestion(que: Question) {
    return this.http.post<Question>(this.apiUrl + 'createquestion', que, this.httpOptions);
  }
  deleteQuestion(id: number) {
    return this.http.delete(this.apiUrl + 'deletequestion/' + id, this.httpOptions);
  }
  getQuestionById(id: number) {
    return this.http.get<Question>(this.apiUrl + 'getquestionbyid/' + id, this.httpOptions);
  }
  updateQuestion(que: Question) {
    return this.http.put<Question>(this.apiUrl + 'updatequestion/' + que.QuestionId, que, this.httpOptions);
  }
  getQuestionByFilters(filter: QuestionFilter) {
    return this.http.post<QuestionFilter>(this.apiUrl + 'getquestionsbyfilter', filter, this.httpOptions);
  }

  getQuestionsByCategoryIdAndSkillId(param: string[]) {
    return this.http.post<string>(this.apiUrl + 'getquestionsbycategoryandskill', param, this.httpOptions);
  }

  getQuestionsByExamId(examid: number, userid: number, examgroupid: number) {
    return this.http.get<Question>(this.apiUrl + 'getquestionsbyexamid?examid=' + examid + '&userid=' + userid + '&examgroupid=' + examgroupid + '', this.httpOptions);
  }

  getDifficultyLevel() {
    return this.http.get<DifficultyLevel>(this.apiUrl + "getdifficultylevellist", this.httpOptions);
  }

  updateFilter(data: any) {
    this.subject.next({ filter: data });
  }
  getFilter(): Observable<any> {
    return this.subject.asObservable();
  }


}

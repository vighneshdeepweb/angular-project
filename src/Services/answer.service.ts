import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Answer } from '../Models/Answer';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  httpOptions: any;
  apiUrl: string;
  constructor(public commonService: CommonService,private http: HttpClient) {
    this.apiUrl = commonService.baseUrl + "answer/";
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
  }
  getAllAnswers() {
    return this.http.get<Answer>(this.apiUrl + "getanswerlist", this.httpOptions);
  }
  getAnswersByQuestionId(questionId) {
    return this.http.get<Answer>(this.apiUrl + "getanswersbyquestionid/" + questionId, this.httpOptions);
  }
  saveAnswer(ans: Answer[]) {
    return this.http.post<Answer>(this.apiUrl + 'createanswer', ans, this.httpOptions);
  }
  deleteAnswer(id: number) {
    return this.http.delete(this.apiUrl + 'deleteanswer/' + id, this.httpOptions);
  }
  getAnswerById(id: number) {
    return this.http.get<Answer>(this.apiUrl + 'getanswerbyid/' + id, this.httpOptions);
  }
  updateAnswer(que: Answer) {
    return this.http.put<Answer>(this.apiUrl + 'updateanswer/' + que.AnswerId, que, this.httpOptions);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Exam } from '../Models/Exam';
import { Assignexam } from '../Models/AssignExam';
import { CommonService } from './common.service';
import { ExamFilter } from '../Models/ExamFilter';
import { UserAnswer } from '../Models/UserAnswer';
import { JsonResponse } from '../Models/JsonResponse';
import { AttemptedExams } from '../Models/AttemptedExams';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  httpOptions: any;
  apiUrl: string;
  assignUrl: string;
  authKey: string;
  constructor(private http: HttpClient, public commonService: CommonService) {
    this.apiUrl = commonService.baseUrl + "exam/";
    this.authKey = commonService.authKey;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authKey}`,
      })
    };
  }

  getAllExams(status?: number) {
    return this.http.get<Exam>(this.apiUrl + "getexamlist?status=" + status + "", this.httpOptions);
  }
  saveExam(exam: Exam) {
    return this.http.post<Exam>(this.apiUrl + 'createexam', exam, this.httpOptions);
  }
  deleteExam(id: number) {
    return this.http.delete(this.apiUrl + 'deleteexam/' + id, this.httpOptions);
  }
  getExamById(id: number) {
    return this.http.get<Exam>(this.apiUrl + 'getexambyid/' + id, this.httpOptions);
  }
  getExamByExamIdAndUserId(examId: number, userId: number, examGroupId: number) {
    return this.http.get<Exam>(this.apiUrl + 'getexambyexamidanduserid?examid=' + examId + '&userid=' + userId + '&examgroupid=' + examGroupId + '', this.httpOptions);
  }
  updateExam(exam: Exam) {
    return this.http.put<Exam>(this.apiUrl + 'updateexam/' + exam.ExamId, exam, this.httpOptions);
  }

  getExamList(filter: ExamFilter) {
    return this.http.post<ExamFilter>(this.apiUrl + 'getexamlist', filter, this.httpOptions);
  }

  assignExamToUser(assignexam: Assignexam) {
    return this.http.post<Assignexam>(this.apiUrl + 'assignexamtouser', assignexam, this.httpOptions);
  }
  GetAssignExamList(filter: ExamFilter) {
    return this.http.post<ExamFilter>(this.apiUrl + 'getassignexamlist', filter, this.httpOptions);
  }

  SaveUserAnswers(userAnswer: UserAnswer) {
    return this.http.post<JsonResponse>(this.apiUrl + 'saveuseranswer', userAnswer, this.httpOptions);
  }
  DeleteUserAnswers(examId, userId) {
    return this.http.get<JsonResponse>(this.apiUrl + 'deleteuseranswer?examid=' + examId + '&userid=' + userId + '', this.httpOptions);
  }
  DeleteAssignedExams(examgroupId) {
    return this.http.get<JsonResponse>(this.apiUrl + 'deleteassignexam?examgroupid=' + examgroupId + '', this.httpOptions);
  }

  UpdateUserAnswers(userAnswer: UserAnswer) {
    return this.http.post<JsonResponse>(this.apiUrl + 'updateuseranswer', userAnswer, this.httpOptions);
  }

  SaveAttemptedExams(attemptedExam: AttemptedExams) {
    return this.http.post<JsonResponse>(this.apiUrl + 'saveuserattemptedexam', attemptedExam, this.httpOptions);
  }

  CheckExistingUserAnswer(userAnswer: UserAnswer) {
    return this.http.post(this.apiUrl + 'getexistinguseranswer', userAnswer, this.httpOptions);
  }

  GetUserResult(examId, userId, examgroupid) {
    return this.http.get(this.apiUrl + 'getuserresult?examid=' + examId + '&userid=' + userId + '&examgroupid=' + examgroupid + '', this.httpOptions);
  }
  GetExamMarks(examId) {
    return this.http.get(this.apiUrl + 'getexammarks/' + examId, this.httpOptions);
  }
  GetAssignExamUserList(examId) {
    return this.http.get(this.apiUrl + 'getassignexamuserlist?examid=' + examId, this.httpOptions);
  }
  GetAttemptedExamList() {
    return this.http.get(this.apiUrl + 'getattemptedexamlist', this.httpOptions);
  }
  GetQuestionCount(categoryId: string) {
    return this.http.get(this.apiUrl + 'getquestioncount?categoryid=' + categoryId + '', this.httpOptions);
  }
  DownloadResult(examGroupId: number) {
    return this.http.get(this.apiUrl + 'downloadresult?examgroupid=' + examGroupId + '', this.httpOptions);
  }
}

import { Component, OnInit } from '@angular/core';
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { QuestionService } from '../../../Services/question.service';
import { CommonService } from '../../../Services/common.service';
import { Question } from '../../../Models/Question';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAnswer } from '../../../Models/UserAnswer';
import { ExamService } from '../../../Services/exam.service';
import { QuestionType } from '../../../Enums/Questiontype';
import { AttemptedExams } from '../../../Models/AttemptedExams';
import { Exam } from '../../../Models/Exam';
import { User } from '../../../Models/User';
import { ConfirmationDialogService } from '../../../Services/confirmation-dialog.service';
import { ExamStatus } from '../../../Enums/ExamStatus';


@Component({
  selector: 'app-examscreen',
  templateUrl: './examscreen.component.html',
  styleUrls: ['./examscreen.component.css']
})
export class ExamscreenComponent implements OnInit {

  /***********************************Declare Variables***************************************/
  questionList: Question[] = [];
  currentIndex: number = 0;
  examid: number;
  examgroupid: number;
  answeredCount: number = 0;
  notansweredCount: number = 0;
  exam: Exam;
  duration: number = 0;
  user: User;
  timerValue: string;
  e = <KeyboardEvent>event;
  /***********************************Variables END***************************************/

  /***********************************Constructor***************************************/

  constructor(public commonService: CommonService, private router: Router, private route: ActivatedRoute, public queService: QuestionService, public examService: ExamService, private confirmationDialogService: ConfirmationDialogService) {
    this.examid = this.route.snapshot.params.examid;
    this.examgroupid = this.route.snapshot.params.examgroupid;
    this.getExamByExamId(this.examid, this.examgroupid);
    this.user = commonService.userdetail;
  }
  /***********************************Constructor END***************************************/

  /***********************************NgOnInit***************************************/
  ngOnInit() {
    setInterval(() => {
      var doc = document.getElementsByClassName('timer');
      if (doc.item(0) != null) {
        this.timerValue = document.getElementsByClassName('timer').item(0).querySelector("span").innerText;
      }
    }, 1000);
  }
  /***********************************NgOnInit***************************************/



  /*******************************************Next and Previous Button Events*******************************************/
  nextQuestion() {
    this.saveUserAnswer();
    this.setAttemptedAndNotAttemptedCount();
    this.currentIndex = this.currentIndex + 1;
  }
  previousQuestion() {
    this.saveUserAnswer();
    this.setAttemptedAndNotAttemptedCount();
    this.currentIndex = this.currentIndex - 1;
  }
  /*******************************************Next and Previous END*******************************************/


  /*******************************************Answer Selected Event******************************************/
  singleSelect(ansArray, selectedVal, index) {
    ansArray.forEach(element => {
      element.IsSelected = false;
    });
    ansArray[index].IsSelected = true;
  }
  multiSelect(event) {
  }
  /*******************************************Answer Selected Event******************************************/


  /*******************************************End Exam Event*******************************************/
  endExam() {
    this.saveUserAnswer();
    this.setAttemptedAndNotAttemptedCount();
    this.confirmationDialogService.confirm('Please confirm..', 'Are you sure. you want to end exam ... ?')
      .then((confirmed) => {
        if (confirmed) {
          if (this.notansweredCount > 0) {
            this.confirmationDialogService.confirm("Please confirm..", 'You have not attempted all questions.Want to continue ?').then((confirmed) => {
              if (confirmed) {
                //this.router.navigate(['result', this.exam.ExamId]);
                location.href = "/result/" + this.examid + "/" + this.examgroupid;
              }

            });
          }
          else {
            location.href = "/result/" + this.examid + "/" + this.examgroupid;
            //this.router.navigate(['result', this.exam.ExamId, this.commonService.userId]);
          }

        }
        else {
          console.log("NO");
        }
      });
  }
  /*******************************************End Exam Event END*******************************************/

  /*******************************************Time End Event*******************************************/
  countDownEvent(e: CountdownEvent) {
    if (this.duration != 0) {
      if (e.action == "done") {

        alert("Your exam time finish.");
        this.saveUserAnswer();
        this.setAttemptedAndNotAttemptedCount();
        // this.router.navigate(['result', this.exam.ExamId]);
        location.href = "/result/" + this.examid + "/" + this.examgroupid;
        // this.confirmationDialogService.messagebox("End Exam", "Your exam time finish.").then((confirmed) => {
        //    this.saveUserAnswer();
        //    this.setAttemptedAndNotAttemptedCount();
        //   this.router.navigate(['result', this.exam.ExamId, this.commonService.userId]);
        // });
      }
    }
  }
  /*******************************************Time End Event END*******************************************/

  /*******************************************API Call Methods*******************************************/

  async saveUserAnswer() {
    let userAnswerList: UserAnswer;
    let currentQuestion = this.questionList[this.currentIndex];
    if (currentQuestion != null && currentQuestion != undefined) {
      let selectedAnswer = '';
      if (currentQuestion.QuestionType == QuestionType.SingleAnswer) {
        const answers = currentQuestion.AnswerList.find(x => x.IsSelected == true);
        if (answers != null && answers != undefined) {
          selectedAnswer = answers.AnswerId.toString();
        }

      }
      else if (currentQuestion.QuestionType == QuestionType.MultiAnswer) {
        const answers = currentQuestion.AnswerList.filter(x => x.IsSelected == true);
        if (answers.length > 0) {
          selectedAnswer = answers.sort(a => a.AnswerId).map(a => a.AnswerId).toString();
        }
      }

      if (selectedAnswer != '') {
        let userAnswer: UserAnswer = new UserAnswer(0, this.commonService.userId, this.examid, currentQuestion.QuestionId, Number(currentQuestion.SkillId), currentQuestion.Marks, selectedAnswer, new Date(), this.timerValue, this.examgroupid);
        let isAnsExists = false;
        await this.examService.CheckExistingUserAnswer(userAnswer).toPromise().then((data: any) => {
          if (data.length > 0)
            isAnsExists = true;
        });
        if (isAnsExists) {
          this.examService.UpdateUserAnswers(userAnswer).subscribe((data: any) => {
            if (data.status_code == "200") {
            }
            else {
              this.commonService.errorMsg = data.message;
            }
          });
        }
        else {
          this.examService.SaveUserAnswers(userAnswer).subscribe((data: any) => {
            if (data.status_code == "200") {
            }
            else {
              this.commonService.errorMsg = data.message;
            }
          });
        }
      }
      else {
        // this.examService.DeleteUserAnswers(this.examid, this.commonService.userId).subscribe((data: any) => {
        //   console.log("deletecall")
        //   if (data.status_code == "200") {
        //   }
        //   else {
        //     this.commonService.errorMsg = data.message;
        //   }
        // });
      }

    }
  }
  setAttemptedAndNotAttemptedCount() {
    let ansArray = this.questionList[this.currentIndex].AnswerList;
    if (ansArray.filter(a => a.IsSelected == true).length > 0) {
      this.questionList[this.currentIndex].IsAttempted = true;
    }
    else {
      this.questionList[this.currentIndex].IsAttempted = false;
    }
    this.answeredCount = this.questionList.filter(x => x.IsAttempted == true).length;
    this.notansweredCount = this.questionList.filter(x => x.IsAttempted == false || x.IsAttempted == undefined).length;

  }
  async getQuestionByExamId(examId, examGroupId) {
    // this.queService.getQuestionsByExamId(examId, this.user.UserId).subscribe((data: any) => {
    //   this.questionList = data as Question[];
    //   console.log(this.questionList);
    //   this.notansweredCount = this.questionList.filter(x => x.IsAttempted == false || x.IsAttempted == undefined).length;

    // }, error => {
    //   this.commonService.errorMsg = error.error;
    // });
    await this.queService.getQuestionsByExamId(examId, this.user.UserId, examGroupId).toPromise().then((data: any) => {
      this.questionList = data as Question[];
      this.notansweredCount = this.questionList.filter(x => x.IsAttempted == false || x.IsAttempted == undefined).length;

    }, error => {
      this.commonService.errorMsg = error.error;
    });
  }
  async getExamByExamId(examId, examGroupId) {
    await this.examService.getExamByExamIdAndUserId(examId, this.commonService.userId, examGroupId).toPromise().then((data: any) => {
      this.exam = <Exam>JSON.parse(JSON.stringify(data));
      if (this.exam[0] != undefined) {

        if (this.exam[0].Status == ExamStatus.Finish) {
          this.commonService.errorMsg = "You have already submitted this exam.";
        }
        else if (this.exam[0].Status == ExamStatus.Running) {
          var hms = this.exam[0].RemainingTime;   // your input string
          if (hms != "" && hms != undefined) {
            var a = hms.split(':'); // split it at the colons
            // minutes are worth 60 seconds. Hours are worth 60 minutes.
            var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
            this.duration = seconds;
          }
          else {
            this.duration = this.exam[0].Duration * 60;
          }
          this.getQuestionByExamId(this.exam[0].ExamId, examGroupId);
        }
        else {
          this.duration = this.exam[0].Duration * 60;
          this.getQuestionByExamId(this.exam[0].ExamId, examGroupId);

          // let attemptedExam = new AttemptedExams(0, this.exam[0].ExamId, this.commonService.userId, 0, 0, 0, 0, 0, false, new Date(), 2);
          // this.examService.SaveAttemptedExams(attemptedExam).subscribe((result: any) => {
          //   if (result.status_code == "200") {
          //   }
          //   else {
          //     this.commonService.errorMsg = result.message;
          //   }
          // });

        }
      }
      else {
        this.commonService.errorMsg = "Unauthorize access";
        this.router.navigate(['error']);
      }
    });
  }
  /*******************************************API Call Methods*******************************************/
}

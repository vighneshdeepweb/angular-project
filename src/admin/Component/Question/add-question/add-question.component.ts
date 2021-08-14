import { Component, OnInit } from '@angular/core';
import { Question } from '../../../../Models/Question';
import { CategoryService } from '../../../../Services/category.service';
import { SkillService } from '../../../../Services/skill.service';
import { QuestionService } from '../../../../Services/question.service';
import { CommonService } from '../../../../Services/common.service';
import { Router } from '@angular/router';
import { Answer } from '../../../../Models/Answer';
import { AnswerService } from '../../../../Services/answer.service';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  private AnsArray: Array<Answer> = [];
  totalOptions = new Array();
  optionsArr = new Array();
  categories: any = [];
  difficultylevels: any = [];
  skills: any = [];
  ansModel: Answer;
  model = new Question(0, "", "", "", 0, "", "", false, true, null, null, null, null, 0, this.AnsArray, '', false, "");
  constructor(public commonService: CommonService, private categoryService: CategoryService, private skillService: SkillService, private questionService: QuestionService, private router: Router, private answerService: AnswerService) {
    const quesId = localStorage.getItem('queid');
    if (quesId) {
      this.questionService.getQuestionById(Number(quesId)).subscribe((data: any) => {
        this.model = data;
        console.log("questionlog", this.model);
        this.bindSkills(this.model.CategoryId);
        this.answerService.getAnswersByQuestionId(this.model.QuestionId).subscribe((data: any) => {
          this.model.AnswerList = [];
          for (var i = 0; i < data.length; i++) {
            this.model.AnswerList[i] = Object.assign({}, data[i]);
            if (this.model.AnswerList[i].IsRightAnswer == true) {
              this.model.RightAnsIndex = i;
            }
          }

        });

      });
    }
    for (var i = 2; i <= 10; i++) {
      this.totalOptions.push(i);
    }
    this.bindCategories();
    this.bindDifficultyLevel();
  }
  ngOnInit() { }
  onSubmit() {

    const empid = localStorage.getItem('uid');
    const questionid = localStorage.getItem('queid');
    if (questionid) {
      this.model.ModifiedDate = new Date();
      this.model.ModifiedBy = Number(empid);
      console.log(this.model);

      this.questionService.updateQuestion(this.model).subscribe((data: any) => {
        if (data.status_code == "200") {

          // this.common.successMsg = "Question updated successfully.";
          // this.router.navigate(["admin/question"]);
          if (this.model.QuestionType == "SingleAnswer") {
            let selectedAnswerIndx = this.model.RightAnsIndex;
            for (var i = 0; i < this.model.AnswerList.length; i++) {
              this.model.AnswerList[i].QuestionId = Number(questionid);
              if (i == selectedAnswerIndx) {
                this.model.AnswerList[i].IsRightAnswer = true;
              }
            }
          }
          else if (this.model.QuestionType == "MultiAnswer") {
            this.model.AnswerList.forEach(a => a.QuestionId = Number(questionid));
          }
          this.answerService.saveAnswer(this.model.AnswerList).subscribe((data: any) => {
            if (data.status_code == "200") {
              this.commonService.successMsg = "Question updated successfully.";
              setTimeout(() => {
                this.router.navigate(["admin/question"]);
              }, 300);
            }
          });
        }
        else {
          this.commonService.errorMsg = data.message;
        }

      },
        error => {
          this.commonService.errorMsg = error.error;
        }
      )
    }
    else {
      this.model.CreatedDate = new Date();
      this.model.CreatedBy = Number(empid);
      this.questionService.saveQuestion(this.model).subscribe((data: any) => {
        if (data.status_code == "200") {

          //this.model.AnswerList.forEach(a => a.QuestionId = data.id);
          if (this.model.QuestionType == "SingleAnswer") {
            let selectedAnswerIndx = this.model.RightAnsIndex;
            for (var i = 0; i < this.model.AnswerList.length; i++) {
              this.model.AnswerList[i].QuestionId = data.id;
              if (i == selectedAnswerIndx) {
                this.model.AnswerList[i].IsRightAnswer = true;
              }
            }
          }
          else if (this.model.QuestionType == "MultiAnswer") {
            this.model.AnswerList.forEach(a => a.QuestionId = data.id);
          }
          this.answerService.saveAnswer(this.model.AnswerList).subscribe((data: any) => {
            if (data.status_code == "200") {
              this.commonService.successMsg = "Question created successfully.";
              setTimeout(() => {
                this.router.navigate(["admin/question"]);
              }, 300);
            }
          });


        }
        else {
          this.commonService.errorMsg = data.message;
        }

      },
        error => {
          this.commonService.errorMsg = error.error;

        }
      )
    }
  }
  bindCategories() {
    this.categoryService.getAllCategory(1).subscribe(data => {
      this.categories = data;
    },
      error => {
        this.commonService.errorMsg = error.error;
      })
  }
  bindDifficultyLevel() {
    this.questionService.getDifficultyLevel().subscribe(data => {
      this.difficultylevels = data;
    },
      error => {
        this.commonService.errorMsg = error.error;
      })
  }
  bindSkills(categoryid) {
    this.skillService.getSkillsByCategoryId(categoryid, 0).subscribe(data => {
      this.skills = data;
    },
      error => {
        this.commonService.errorMsg = error.error;
      })
  }
  addOptions(no) {
    this.model.AnswerList = [];
    this.ansModel = new Answer(0, 0, "", false, false);
    for (var i = 0; i < no; i++) {
      this.model.AnswerList[i] = Object.assign({}, this.ansModel);
    }
  }
  questionTypeChange() {
    this.model.AnswerList = [];
    this.model.TotalOptions = "";
  }
  onChange(data) {
    this.model.AnswerList.forEach(a => a.IsRightAnswer = false);
  }
}

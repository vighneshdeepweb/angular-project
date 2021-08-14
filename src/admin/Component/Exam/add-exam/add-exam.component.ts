import { Component, OnInit, ViewChild } from '@angular/core';
import { Exam } from '../../../../Models/Exam';
import { CategoryService } from '../../../../Services/category.service';
import { SkillService } from '../../../../Services/skill.service';
import { ExamService } from '../../../../Services/exam.service';
import { CommonService } from '../../../../Services/common.service';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { QuestionService } from '../../../../Services/question.service';
import { Question } from 'src/Models/Question';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css']
})
export class AddExamComponent implements OnInit {

  model = new Exam(0, "", "", "", "", "", 0, 0, 0, false, 0, null, 0, null, '', '', 0, 0, 0);

  displayedColumns: string[] = ['Select', 'Sr.No', 'CategoryName', 'SkillName', 'QuestionText', 'QuestionType'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  categories: any = [];
  skills: any = [];
  questions: any = [];
  difficultylevels: any = [];

  catdropdownSettings = {};
  skildropdownSettings = {};

  categoryselectedItems = [];
  skillselectedItems = [];

  categoryids = [];
  skillids = [];
  selectedquestions = [];

  invalidPassMarks = false;
  invalidcategories = false;
  invalidskills = false;
  invalidquestions = false;
  invalidtotalmarks = false;
  totalQuestionCount: number = 0;

  public fieldArray: Array<any> = [];
  private newAttribute: any = {};

  dataSource = new MatTableDataSource();
  constructor(public commonService: CommonService, private categoryService: CategoryService, private skillService: SkillService, private examService: ExamService, private queService: QuestionService, private router: Router) {
    this.bindCategories();
    this.bindDifficultyLevel();
    const exmId = localStorage.getItem('examid');
    if (exmId) {
      this.examService.getExamById(Number(exmId)).subscribe((data: any) => {
        this.model = data;
        let catselected = [];
        for (let cat of this.categories) {
          if (this.model.CategoryId.split(',').indexOf(cat.CategoryId.toString()) > -1) {
            catselected.push(cat);
            this.categoryids.push(cat.CategoryId);
          }
        }
        this.categoryselectedItems = catselected;
        this.bindSkills(this.model.CategoryId);

        this.examService.GetExamMarks(exmId).subscribe((data: any) => {
          data.forEach(element => {
            this.fieldArray.push({ Type: element.MarksNo, No: element.MarksCount })
          });
        });
        //this.getQuestions(this.model.CategoryId, this.model.SkillId);
      });
    }
    else {
      this.fieldArray.push({ Type: '', No: '' });
    }
  }
  ngOnInit() {
    this.catdropdownSettings = {
      singleSelection: false,
      idField: 'CategoryId',
      textField: 'CategoryName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableCheckAll: false,
      allowSearchFilter: true
    };
    this.skildropdownSettings = {
      singleSelection: false,
      idField: 'SkillId',
      textField: 'SkillName',
      selectAllText: 'Select All',
      enableCheckAll: true,
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };
  }
  bindCategories() {
    this.categoryService.getCategoryWithQueCount().subscribe(data => {
      this.categories = data;
    },
      error => {
        console.log(error.error);
      })
  }
  bindSkills(categoryid) {
    if (categoryid == undefined || categoryid == "") {
      this.skills = [];
      this.skillselectedItems = [];
    }
    else {
      this.skillService.getSkillsByCategoryIds(categoryid).subscribe(data => {
        this.skills = data;
        this.skillids = [];
        //if (this.model.SkillId != "") {
        let skilselected = [];
        for (let skil of this.skills) {
          if (this.model.SkillId.split(',').indexOf(skil.SkillId.toString()) > -1) {
            skilselected.push(skil);
            this.skillids.push(skil.SkillId);
            this.skillids = this.removeDuplicateValue(this.skillids);
          }
        }

        this.skillselectedItems = skilselected;
        //}

      },
        error => {
          console.log(error.error);
        })
    }
  }
  bindDifficultyLevel() {
    this.queService.getDifficultyLevel().subscribe(data => {
      this.difficultylevels = data;
    },
      error => {
        this.commonService.errorMsg = error.error;
        window.scrollTo(0, 0);
      })
  }
  async onSubmit() {
    const empid = localStorage.getItem('uid');
    const examid = localStorage.getItem('examid');
    this.model.CategoryId = this.categoryids.join(',').toString();
    this.model.SkillId = this.skillids.join(',').toString();
    this.model.QuestionIds = this.selectedquestions.join(',').toString();
    let marksInclude = "";
    let marksCount = "";
    let totalMarks = 0;
    let totalQues = 0;
    this.fieldArray.forEach(element => {
      totalMarks = totalMarks + (element.Type * element.No);
      marksInclude = marksInclude + element.Type + ",";
      marksCount = marksCount + element.No + ",";
      totalQues = element.No;
    });
    this.model.MarksInclude = marksInclude.replace(/,\s*$/, "");
    this.model.MarksCount = marksCount.replace(/,\s*$/, "");
    if (this.model.PassMarks > this.model.TotalMarks) {
      this.invalidPassMarks = true;
      return false;
    }
    else {
      this.invalidPassMarks = false;
    }
    if (totalMarks != this.model.TotalMarks) {
      this.invalidtotalmarks = true;
      //this.commonService.errorMsg = "Invalid total marks.";
      return false;
    }
    else {
      this.invalidtotalmarks = false;
    }
    var promise = await this.examService.GetQuestionCount(this.model.CategoryId).toPromise();
    this.totalQuestionCount = promise[0].TotalCount;
    if (totalQues > this.totalQuestionCount) {
      this.commonService.errorMsg = "You have entered " + totalQues + " questions, but we have only" + " " + this.totalQuestionCount + " questions in question bank.";
      window.scrollTo(0, 0);
      return false;
    }

    if (this.model.CategoryId == "") {
      this.invalidcategories = true;
      return false;
    }
    else {
      this.invalidcategories = false;
    }
    if (this.model.SkillId == "") {
      this.invalidskills = true;
      return false;
    }
    else {
      this.invalidskills = false;
    }


    // if (this.model.QuestionIds == "") {
    //   this.invalidquestions = true;
    //   return false;
    // }
    if (examid) {
      this.model.ModifiedDate = new Date();
      this.model.ModifiedBy = Number(empid);
      this.examService.updateExam(this.model).subscribe((data: any) => {
        if (data.status_code == "200") {
          this.commonService.successMsg = "Exam updated successfully.";
          setTimeout(() => {
            this.router.navigate(["admin/exam"]);
          }, 300);
        }
        else {
          this.commonService.errorMsg = data.message;
          window.scrollTo(0, 0);
        }

      },
        error => {
          this.commonService.errorMsg = error.error;
          window.scrollTo(0, 0);
        }
      )
    }
    else {
      this.model.CreatedDate = new Date();
      this.model.CreatedBy = Number(empid);
      this.examService.saveExam(this.model).subscribe((data: any) => {
        if (data.status_code == "200") {
          this.commonService.successMsg = data.message;
          setTimeout(() => {
            this.router.navigate(["admin/exam"]);
          }, 300);
        }
        else {
          this.commonService.errorMsg = data.message;
          window.scrollTo(0, 0);
        }
      },
        error => {
          this.commonService.errorMsg = error.error;
          window.scrollTo(0, 0);
        }
      );
    }
  }
  getQuestions(categoryids, skillids) {
    let param = [];

    if (categoryids == "" || skillids == "") {
      this.dataSource = new MatTableDataSource();

    }
    else {
      param.push({ categoryids: categoryids, skillids: skillids });
      this.queService.getQuestionsByCategoryIdAndSkillId(param).subscribe(data => {
        this.questions = data;
        this.dataSource = new MatTableDataSource(this.questions);
        // for (let que of this.questions) {
        //   if (this.model.QuestionIds.split(',').indexOf(que.QuestionId.toString()) > -1) {
        //     // this.dataSource['checked'] = true;
        //     this.dataSource
        //   }
        // }
        for (let i = 0; i < this.questions.length; i++) {
          if (this.model.QuestionIds.split(',').indexOf(this.questions[i].QuestionId.toString()) > -1) {
            this.dataSource.data[i]['IsSelected'] = true;
            this.selectedquestions.push(this.questions[i].QuestionId);
            this.removeDuplicateValue(this.selectedquestions);
          }
        }
        this.dataSource.paginator = this.paginator;
      },
        error => {
          console.log(error.error);
        })
    }
  }
  //#region Category Multi Select
  onCatItemSelect(item: any) {
    this.categoryids.push(item.CategoryId);
    var queCount = Number(item.CategoryName.match(/\(([^)]+)\)/)[1]);
    this.totalQuestionCount += queCount;
    this.categoryids = this.removeDuplicateValue(this.categoryids);
    let catids = this.categoryids.join(',').toString();
    this.invalidcategories = false;
    this.bindSkills(catids);

  }
  onCatItemDeSelect(item: any) {
    this.removeCategoryId(item.CategoryId);
    var queCount = Number(item.CategoryName.match(/\(([^)]+)\)/)[1]);
    this.totalQuestionCount -= queCount;
    this.categoryids = this.removeDuplicateValue(this.categoryids);
    let catids = this.categoryids.join(',').toString();
    this.bindSkills(catids);
  }
  removeCategoryId(categoryid) {
    this.categoryids.forEach((item, index) => {
      if (item === categoryid) this.categoryids.splice(index, 1);
    });
  }
  //#endregion
  //#region Skill Multiselect
  onSkillItemSelect(item: any) {
    this.skillids.push(item.SkillId);
    this.skillids = this.removeDuplicateValue(this.skillids);
    this.invalidskills = false;
    //let skilids = this.skillids.join(',').toString();
    //let catids = this.categoryids.join(',').toString();
    //this.getQuestions(catids, skilids);

  }
  onSkillSelectAll(items: any) {
    items.forEach(element => {
      this.skillids.push(element.SkillId);
      this.skillids = this.removeDuplicateValue(this.skillids);
    });
    this.invalidskills = false;
  }
  onSkillItemDeSelect(item: any) {
    this.removeSkillId(item.SkillId)
    this.skillids = this.removeDuplicateValue(this.skillids)
    //let skilids = this.skillids.join(',').toString();
    //let catids = this.categoryids.join(',').toString();
    //this.getQuestions(catids, skilids);
  }
  removeSkillId(skillid) {
    this.skillids.forEach((item, index) => {
      if (item === skillid) this.skillids.splice(index, 1);
    });
  }
  removeDuplicateValue(arr) {
    var tmp = [];
    for (var i = 0; i < arr.length; i++) {
      if (tmp.indexOf(arr[i]) == -1) {
        tmp.push(arr[i]);
      }
    }
    return tmp;
  }
  //#endregion

  validatePassMakrs(val) {
    if (val > this.model.TotalMarks) {
      this.invalidPassMarks = true;
    }
    else {
      this.invalidPassMarks = false;
    }
  }

  selectQuestion(event, val) {
    if (event.target.checked == true) {
      this.selectedquestions.push(val);
    }
    else {
      this.selectedquestions.forEach((item, index) => {
        if (item === val) this.selectedquestions.splice(index, 1);
      });
    }
    this.removeDuplicateValue(this.selectedquestions);
  }

  addNewRow(index) {
    if (this.model.TotalMarks == 0 || this.model.TotalMarks == undefined) {
      this.commonService.errorMsg = "Please enter total marks first.";
      window.scrollTo(0, 0);
      return false;
    }
    let count = this.fieldArray.filter(a => (a.Type == "" || a.Type == undefined) || (a.No == "" || a.No == undefined)).length;
    if (count > 0) {
      this.commonService.errorMsg = "Please fill the data.";
      window.scrollTo(0, 0);
      return false;
    }
    let total = 0;
    this.fieldArray.forEach(element => {
      total = total + (element.Type * element.No);
    });

    if (total > this.model.TotalMarks) {
      this.commonService.errorMsg = "Selected marks should be equal to total marks.";
      window.scrollTo(0, 0);
      return false;
    }
    this.fieldArray.push({ Type: '', No: '' });
  }

  deleteRow(index) {
    if (this.fieldArray.length != 1) {
      this.fieldArray.splice(index, 1);
    }
  }
  checkSelectedValue(value, index) {
    if (this.fieldArray.filter(a => a.Type == value).length > 1) {
      //this.fieldArray.splice(index, 1);
      this.commonService.errorMsg = "You have already selected this question mark.Please select another question mark.";
      this.fieldArray[index].Type = '';
      window.scrollTo(0, 0);
    }
  }

}

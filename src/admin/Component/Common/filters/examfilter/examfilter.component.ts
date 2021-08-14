import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SkillService } from '../../../../../Services/skill.service';
import { CategoryService } from '../../../../../Services/category.service';
import { ExamFilter } from '../../../../../Models/ExamFilter';
import { ExamService } from '../../../../../Services/exam.service';
import { CommonService } from '../../../../../Services/common.service';
@Component({
  selector: 'app-examfilter',
  templateUrl: './examfilter.component.html',
  styleUrls: ['./examfilter.component.css']
})
export class ExamfilterComponent implements OnInit {
  categories: any = [];
  skills: any = [];
  model: any;
  @Output() emitFilterteredExams = new EventEmitter();
  constructor(public commonService: CommonService, private categoryService: CategoryService, private skillService: SkillService, private examService: ExamService) {
    this.model = new ExamFilter(0, 0, 0, 0, 1, "", 0, "", 0);
  }

  ngOnInit() {
    this.bindCategories();
  }

  bindCategories() {
    this.categoryService.getAllCategory(1).subscribe(data => {
      this.categories = data;
    },
      error => {
        console.log(error.error);
      })
  }
  bindSkills(categoryid) {
    this.skillService.getSkillsByCategoryId(categoryid,0).subscribe(data => {
      this.skills = data;
    },
      error => {
        console.log(error.error);
      })
  }

  searchExam() {

    if (this.model.date != "" && this.model.date != '' && this.model.date != null) {
      this.model.date = ('0' + (this.model.date.getMonth() + 1)).slice(-2) + "/" + ("0" + this.model.date.getDate()).slice(-2) + "/" + this.model.date.getFullYear();
    }
    else {
      this.model.date = "";
    }
    if (this.model.categoryid == null) {
      this.model.categoryid = 0
    }
    if (this.model.skillid == null) {
      this.model.skillid = 0
    }
    if (this.model.title == null) {
      this.model.title = ""
    }
    this.examService.getExamList(this.model).subscribe((data: any) => {
     
      this.emitFilterteredExams.emit(data);
      this.commonService.updateFilter(this.model);
    },
      error => {
        this.commonService.errorMsg = error.error;
      }
    )
  }

}

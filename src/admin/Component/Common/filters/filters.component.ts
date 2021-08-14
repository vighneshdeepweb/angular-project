import { Component, OnInit, Input, Output, EventEmitter, Pipe, PipeTransform } from '@angular/core';
import { SkillService } from '../../../../Services/skill.service';
import { CategoryService } from '../../../../Services/category.service';
import { QuestionService } from '../../../../Services/question.service';
import { QuestionFilter } from '../../../../Models/QuestionFilters';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  categories: any = [];
  skills: any = [];
  model: any;
  subscription: Subscription;
  @Output() emitFilterteredQuestion = new EventEmitter();

  constructor(private categoryService: CategoryService, private skillService: SkillService, private questionService: QuestionService) {
    this.model = new QuestionFilter(1, 10, 0, 0, "", "", "");
    this.subscription = this.questionService.getFilter().subscribe((result: any) => {
      this.model = result.filter;
    });
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
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
    console.log(categoryid);
    this.skillService.getSkillsByCategoryId(categoryid,0).subscribe(data => {
      this.skills = data;
    },
      error => {
        console.log(error.error);
      })
  }

  searchQuestion() {
    
    if (this.model.date != "") {
      this.model.date = ('0' + (this.model.date.getMonth()+1)).slice(-2) + "/" + ("0" + this.model.date.getDate()).slice(-2) + "/" + this.model.date.getFullYear();
    }
    else {
      this.model.date = "";
    }
    this.questionService.getQuestionByFilters(this.model).subscribe((data: any) => {
      this.emitFilterteredQuestion.emit(data);
      this.questionService.updateFilter(this.model);
    },
      error => {
        //this.common.errorMsg = error.error;
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { Skill } from '../../../../Models/Skill';
import { SkillService } from '../../../../Services/skill.service';
import { CategoryService } from '../../../../Services/category.service';
import { CommonService } from '../../../../Services/common.service';
import { Router } from '@angular/router';
import { skill_category_mapping } from 'src/Models/skill_category_mapping';
import { Skill_Category_ViewModel } from '../../../../Models/Skill_Category_ViewModel';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.css']
})
export class AddSkillComponent implements OnInit {
  model: Skill_Category_ViewModel;
  categories: any = [];
  skillcategorymappingModel: skill_category_mapping;
  constructor(public commonService: CommonService, public subjectService: SkillService, private categoryService: CategoryService, public router: Router) {
    //this.model = new Skill(0, "", "", "", "", true, null, null, null, null);
    this.model = new Skill_Category_ViewModel(0, "", "", "", "", true, null, null, null, null);
  }


  ngOnInit() {
    const skilid = localStorage.getItem('skilid');
    const categoryid = localStorage.getItem('catid');
    if (skilid) {
      this.subjectService.getSkillsByCategoryId(Number(categoryid), Number(skilid)).subscribe((data: any) => {
        this.model = data[0];
        console.log(this.model);
      });
    }
    this.bindCategories();
  }
  bindCategories() {
    this.categoryService.getAllCategory(1).subscribe(data => {
      this.categories = data;
    },
      error => {
        this.commonService.errorMsg = error.error;
        window.scrollTo(0, 0);
      })
  }
  onSubmit() {
    const empid = localStorage.getItem('uid');
    const skilid = localStorage.getItem('skilid');
    if (skilid) {
      this.model.ModifiedDate = new Date();
      this.model.ModifiedBy = Number(empid);

    
      this.subjectService.updateSkill(this.model).subscribe((data: any) => {
        if (data.status_code == "200") {
          this.commonService.successMsg = data.message;
          window.scrollTo(0, 0);
          setTimeout(() => {
            this.router.navigate(["admin/skill"]);
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
      this.subjectService.getSkillByName(this.model.SkillName).subscribe((data: any) => {
        if (data != null && data.length > 0) {
          this.subjectService.getSkillsByCategoryId(Number(this.model.CategoryId), data[0].SkillId).subscribe((catdata: any) => {
            if (catdata.length > 0) {
              this.commonService.errorMsg = "This skill name is already exists.";
              window.scrollTo(0, 0);
            }
            else {
              this.skillcategorymappingModel = new skill_category_mapping(0, data[0].SkillId, Number(this.model.CategoryId), true, this.model.CreatedBy, this.model.CreatedDate, null, null);
              this.subjectService.saveSkillCategoryMapping(this.skillcategorymappingModel).subscribe((data: any) => {
                if (data.status_code == "200") {
                  this.commonService.successMsg = data.message;
                  window.scrollTo(0, 0);
                  setTimeout(() => {
                    this.router.navigate(["admin/skill"]);
                  }, 300);
                }
                else {
                  this.commonService.errorMsg = data.message;
                  window.scrollTo(0, 0);
                }
              });
            }
          });
        }
        else {
          this.subjectService.saveSkill(this.model).subscribe((data: any) => {
            if (data.status_code == "200") {
              this.skillcategorymappingModel = new skill_category_mapping(0, data.id, Number(this.model.CategoryId), true, this.model.CreatedBy, this.model.CreatedDate, null, null);
              this.subjectService.saveSkillCategoryMapping(this.skillcategorymappingModel).subscribe((data: any) => {
              });
              this.commonService.successMsg = data.message;
              window.scrollTo(0, 0);
              setTimeout(() => {
                this.router.navigate(["admin/skill"]);
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
      });
    }
  }

}

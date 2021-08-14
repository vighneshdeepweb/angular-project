import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../Models/Category';
import { CategoryService } from '../../../../Services/category.service';
import { CommonService } from '../../../../Services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  model: any;
  constructor(public categoryService: CategoryService, public router: Router, public commonService: CommonService) {
    this.model = new Category(0, "", "", true, null, null, null, null);
  }

  ngOnInit() {

    const catid = localStorage.getItem('catid');
    if (catid) {
      this.categoryService.getCategoryById(Number(catid)).subscribe((data: any) => {
        this.model = data;
      });
    }
  }
  onSubmit() {
    const empid = localStorage.getItem('uid');
    const catid = localStorage.getItem('catid');
    if (catid) {
      this.model.ModifiedDate = new Date();
      this.model.ModifiedBy = Number(empid);
      this.categoryService.updateCategory(this.model).subscribe((data: any) => {
        if (data.status_code == "200") {
          this.commonService.successMsg = data.message;
          setTimeout(() => {
            this.router.navigate(["admin/category"]);
          }, 300);
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
      this.categoryService.saveCategory(this.model).subscribe((data: any) => {
        if (data.status_code == "200") {
          this.commonService.successMsg = data.message;
          setTimeout(() => {
            this.router.navigate(["admin/category"]);
          }, 300);
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

}

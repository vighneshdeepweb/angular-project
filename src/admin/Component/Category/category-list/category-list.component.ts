import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatFormFieldModule } from '@angular/material';
import { CategoryService } from '../../../../Services/category.service';
import { Category } from '../../../../Models/Category';
import { Router } from '@angular/router';
import { CommonService } from '../../../../Services/common.service';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: any = [];
  displayedColumns: string[] = ['CategoryName', 'Description', 'Active', 'Date', 'Action'];
  applyFilter(filterValue: string) {
    console.log("filter", filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource = new MatTableDataSource();
  constructor(public categoryService: CategoryService, public router: Router, public commonService: CommonService) { }

  ngOnInit() {
    this.getAllCategory();
  }

  getAllCategory() {

    this.categoryService.getAllCategory(-1).subscribe(data => {
      this.categories = data;
      this.dataSource = new MatTableDataSource(this.categories);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
      error => {
        if (error.status == '401') {
          this.commonService.errorMsg = "Unauthorize access";
          this.router.navigate(['error']);
        }
      }
    )
  }
  addNewCategory() {
    localStorage.removeItem("catid");
    this.router.navigate(["admin/addCategory"]);
  }
  editCategory(category: Category) {
    localStorage.setItem("catid", category.CategoryId.toString());
    this.router.navigate(["admin/addCategory"]);
  }
  deleteCategory(cat: Category) {
    if (confirm('Are you sure .You want to delete this record?')) {
      this.categoryService.deleteCategory(cat.CategoryId).subscribe((data: any) => {

        if (data.status_code == "200") {

          this.categories = this.categories.filter(u => u !== cat);
          this.dataSource = new MatTableDataSource<Category>(this.categories);
          this.dataSource.paginator = this.paginator;
          this.commonService.successMsg = data.message;
        }
        else {
          this.commonService.errorMsg = data.message;
        }
      },
        error => {
          this.commonService.errorMsg = error.error;
        });
    }
  }
}

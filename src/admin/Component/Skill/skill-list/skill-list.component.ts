import { Component, OnInit, ViewChild } from '@angular/core';
import { SkillService } from '../../../../Services/skill.service';
import { Skill } from '../../../../Models/Skill';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CommonService } from '../../../../Services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})
export class SkillListComponent implements OnInit {

  skills: any = [];
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ["SkillName", "CategoryName", 'Description', 'Active', 'Date', 'Action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(public commonService: CommonService, private skillService: SkillService, public router: Router) {
    this.getAllSkills();

  }

  ngOnInit() {

  }

  getAllSkills() {
    this.skillService.getAllSkill(-1).subscribe(data => {
      this.skills = data;
      this.dataSource = new MatTableDataSource(this.skills);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
      error => {
        if (error.status == '401') {
          this.commonService.errorMsg = "Unauthorize access";
          window.scrollTo(0, 0);
          this.router.navigate(['error']);
        }
      }
    )
  }
  addNewSkill() {
    localStorage.removeItem("skilid");
    this.router.navigate(["admin/addskill"]);
  }
  editSkill(skil: Skill) {
    localStorage.setItem("skilid", skil.SkillId.toString());
    localStorage.setItem("catid", skil.CategoryId.toString());
    this.router.navigate(["admin/addskill"]);
  }
  deleteSkill(skil: Skill) {
    if (confirm('Are you sure .You want to delete this record?')) {
      this.skillService.deleteSkill(skil.SkillId, Number(skil.CategoryId)).subscribe((data: any) => {
        if (data.status_code == "200") {
          this.skills = this.skills.filter(u => u !== skil);
          this.dataSource = new MatTableDataSource<Skill>(this.skills);
          this.dataSource.paginator = this.paginator;
          this.commonService.successMsg = data.message;
          window.scrollTo(0, 0);
        }
        else {
          this.commonService.errorMsg = data.message;
          window.scrollTo(0, 0);
        }
      },
        error => {
          this.commonService.errorMsg = error.error;
          window.scrollTo(0, 0);
        });
    }
  }

}

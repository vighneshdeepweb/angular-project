import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AppRoutingModule } from './admin-routing.module';


import { LoginComponent } from './Component/Common/login/login.component';
import { LogincontainerComponent } from './MasterComponent/logincontainer/logincontainer.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule, MatPaginatorModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatSortModule, MatCheckboxModule } from '@angular/material';
import { MainContainerComponent } from './MasterComponent/main-container/main-container.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { HeaderComponent } from './Component/Common/header/header.component';
import { SidemenuComponent } from './Component/Common/sidemenu/sidemenu.component';
import { FooterComponent } from './Component/Common/footer/footer.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { CategoryListComponent } from './Component/Category/category-list/category-list.component';
import { AddCategoryComponent } from './Component/Category/add-category/add-category.component';
import { AddSkillComponent } from './Component/Skill/add-skill/add-skill.component';
import { SkillListComponent } from './Component/Skill/skill-list/skill-list.component';
import { AddQuestionComponent } from './Component/Question/add-question/add-question.component';
import { QuestionListComponent } from './Component/Question/question-list/question-list.component';
import { FiltersComponent } from './Component/Common/filters/filters.component';
import { AddExamComponent } from './Component/Exam/add-exam/add-exam.component';
import { ExamListComponent } from './Component/Exam/exam-list/exam-list.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ErrorPageComponent } from './Component/Common/error-page/error-page.component';
import { AddStateComponent } from './Component/State/add-state/add-state.component';
import { StateListComponent } from './Component/State/state-list/state-list.component';
import { AddCityComponent } from './Component/City/add-city/add-city.component';
import { CityListComponent } from './Component/City/city-list/city-list.component';
import { UserListComponent } from './Component/User/user-list/user-list.component';
import { AssignExamComponent } from './Component/Exam/assign-exam/assign-exam.component';
import { UserfilterComponent } from './Component/Common/filters/userfilter/userfilter.component';
import { AddUniversityComponent } from './Component/University/add-university/add-university.component';
import { UniversityListComponent } from './Component/University/university-list/university-list.component';
import { ExamfilterComponent } from './Component/Common/filters/examfilter/examfilter.component';
import { AddUserComponent } from './Component/User/add-user/add-user.component';
import { AssignexamUserlistComponent } from './Component/Exam/assignexam-userlist/assignexam-userlist.component';
import { CookieService } from 'src/Services/cookie.service';
import { AttemptedExamComponent } from './Component/Exam/attempted-exam/attempted-exam.component';

// import { AssignexamListComponent } from './Component/Exam/assignexam-list/assignexam-list.component';


@NgModule({
  declarations: [
    LoginComponent,
    LoginComponent,
    LogincontainerComponent,
    MainContainerComponent,
    HeaderComponent,
    SidemenuComponent,
    FooterComponent,
    DashboardComponent,
    CategoryListComponent,
    AddCategoryComponent,
    AddSkillComponent,
    SkillListComponent,
    AddQuestionComponent,
    QuestionListComponent,
    FiltersComponent,
    AddExamComponent,
    ExamListComponent,
    ErrorPageComponent,
    AddStateComponent,
    StateListComponent,
    AddCityComponent,
    CityListComponent,
    UserListComponent,
    AssignExamComponent,
    UserfilterComponent,
    AddUniversityComponent,
    UniversityListComponent,
    ExamfilterComponent,
    AddUserComponent,
    AssignexamUserlistComponent,
    AttemptedExamComponent

    //AssignexamListComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatIconModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [CookieService,DatePipe]
})
export class AdminModule { }

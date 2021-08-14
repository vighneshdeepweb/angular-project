import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Component/Common/login/login.component';
import { MainContainerComponent } from '../admin/MasterComponent/main-container/main-container.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { CategoryListComponent } from './Component/Category/category-list/category-list.component';
import { AddCategoryComponent } from './Component/Category/add-category/add-category.component';
import { AddSkillComponent } from './Component/Skill/add-skill/add-skill.component';
import { SkillListComponent } from './Component/Skill/skill-list/skill-list.component';
import { AddQuestionComponent } from './Component/Question/add-question/add-question.component';
import { QuestionListComponent } from './Component/Question/question-list/question-list.component';
import { ExamListComponent } from './Component/Exam/exam-list/exam-list.component';
import { AddExamComponent } from './Component/Exam/add-exam/add-exam.component';
import { ErrorPageComponent } from './Component/Common/error-page/error-page.component';
import { AuthGuardService as AuthGuard } from '../Authentication/auth-guard.service';
import { JwtModule } from '@auth0/angular-jwt';
import { CommonService } from '../Services/common.service';
import { AddStateComponent } from './Component/State/add-state/add-state.component';
import { StateListComponent } from './Component/State/state-list/state-list.component';
import { AddCityComponent } from './Component/City/add-city/add-city.component';
import { CityListComponent } from './Component/City/city-list/city-list.component';
import { UserListComponent } from './Component/User/user-list/user-list.component';
import { AddUserComponent } from './Component/User/add-user/add-user.component';
import { AddUniversityComponent } from './Component/University/add-university/add-university.component';
import { UniversityListComponent } from './Component/University/university-list/university-list.component';

import { AssignExamComponent } from './Component/Exam/assign-exam/assign-exam.component';
import { AssignexamListComponent } from './Component/Exam/assignexam-list/assignexam-list.component';
import { AttemptedExamComponent } from './Component/Exam/attempted-exam/attempted-exam.component';

export function tokenGetter() {
    let commonService: CommonService;
    return commonService.authKey;
}

const adminroutes: Routes = [
    {
        path: 'admin',
        component: LoginComponent,
    },

    {
        path: 'admin/login',
        component: LoginComponent,
    },
    {
        path: 'admin/dashboard',
        component: MainContainerComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: DashboardComponent,
            }
        ]
    },
    {
        path: 'admin/category',
        canActivate: [AuthGuard],
        component: MainContainerComponent,
        children: [
            {
                path: '',
                component: CategoryListComponent,
            }
        ]
    },
    {
        path: 'admin/addCategory',
        canActivate: [AuthGuard],
        component: MainContainerComponent,
        children: [
            {
                path: '',
                component: AddCategoryComponent,
            }
        ]
    },
    {
        path: 'admin/skill',
        canActivate: [AuthGuard],
        component: MainContainerComponent,
        children: [
            {
                path: '',
                component: SkillListComponent,
            }
        ]
    },
    {
        path: 'admin/addskill',
        canActivate: [AuthGuard],
        component: MainContainerComponent,
        children: [
            {
                path: '',
                component: AddSkillComponent,
            }
        ]
    },
    {
        path: 'admin/question',
        canActivate: [AuthGuard],
        component: MainContainerComponent,
        children: [
            {
                path: '',
                component: QuestionListComponent,
            }
        ]
    },
    {
        path: 'admin/addquestion',
        canActivate: [AuthGuard],
        component: MainContainerComponent,
        children: [
            {
                path: '',
                component: AddQuestionComponent,
            }
        ]
    },
    {
        path: 'admin/exam',
        canActivate: [AuthGuard],
        component: MainContainerComponent,
        children: [
            {
                path: '',
                component: ExamListComponent,
            }
        ]
    },
    {
        path: 'admin/addexam',
        canActivate: [AuthGuard],
        component: MainContainerComponent,
        children: [
            {
                path: '',
                component: AddExamComponent,
            }
        ]
    },
    {
        path: 'admin/assignexam',
        canActivate: [AuthGuard],
        component: MainContainerComponent,
        children: [
            {
                path: '',
                component: AssignExamComponent,
            }
        ]
    },
    {
        path: 'admin/assignexamlist',
        canActivate: [AuthGuard],
        component: MainContainerComponent,
        children: [
            {
                path: '',
                component: AssignexamListComponent,
            }
        ]
    },
    {
        path: 'admin/attemptedexamlist',
        canActivate: [AuthGuard],
        component: MainContainerComponent,
        children: [
            {
                path: '',
                component: AttemptedExamComponent,
            }
        ]
    },
    {
        path: 'admin/addstate',
        canActivate: [AuthGuard],
        component: MainContainerComponent,
        children: [
            {
                path: '',
                component: AddStateComponent,
            }
        ]
    },
    {
        path: 'admin/state',
        canActivate: [AuthGuard],
        component: MainContainerComponent,
        children: [
            {
                path: '',
                component: StateListComponent,
            }
        ]
    },
    {
        path: 'admin/addcity',
        canActivate: [AuthGuard],
        component: MainContainerComponent,
        children: [
            {
                path: '',
                component: AddCityComponent,
            }
        ]
    },
    {
        path: 'admin/city',
        canActivate: [AuthGuard],
        component: MainContainerComponent,
        children: [
            {
                path: '',
                component: CityListComponent,
            }
        ]
    },
    {
        path: 'admin/university',
        canActivate: [AuthGuard],
        component: MainContainerComponent,
        children: [
            {
                path: '',
                component: UniversityListComponent,
            }
        ]
    },
    {
        path: 'admin/adduniversity',
        canActivate: [AuthGuard],
        component: MainContainerComponent,
        children: [
            {
                path: '',
                component: AddUniversityComponent,
            }
        ]
    },
    {
        path: 'admin/user',
        canActivate: [AuthGuard],
        component: MainContainerComponent,
        children: [
            {
                path: '',
                component: UserListComponent,
            }
        ]
    },
    {
        path: 'admin/adduser',
        canActivate: [AuthGuard],
        component: MainContainerComponent,
        children: [
            {
                path: '',
                component: AddUserComponent,
            }
        ]
    },
    {
        path: 'error',
        component: ErrorPageComponent,
        pathMatch: 'full'

    },
    { path: '**', component: ErrorPageComponent },

];

@NgModule({
    imports: [
        RouterModule.forRoot(adminroutes),
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
            }
        })
    ],
    exports: [RouterModule]

})
export class AppRoutingModule {
}

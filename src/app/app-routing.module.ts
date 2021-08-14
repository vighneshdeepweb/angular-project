import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisteruserComponent } from './Components/registeruser/registeruser.component';
import { LogincontainerComponent } from './MasterComponents/logincontainer/logincontainer.component';
import { ForgotpasswordComponent } from './Components/forgotpassword/forgotpassword.component';
import { MainContainerComponent } from '../admin/MasterComponent/main-container/main-container.component';
import { AuthGuardService as AuthGuard } from '../Authentication/auth-guard.service';
import { JwtModule } from '@auth0/angular-jwt';
import { CommonService } from '../Services/common.service';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AssignedexamlistComponent } from './Components/assignedexamlist/assignedexamlist.component';
import { ExamscreenComponent } from './Components/examscreen/examscreen.component';
import { ExamresultComponent } from './Components/examresult/examresult.component';

export function tokenGetter() {
  let commonService: CommonService;
  return commonService.authKey;
}

const routes: Routes = [


  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LogincontainerComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      }
    ]
  },
  {
    path: 'registeruser',
    component: LogincontainerComponent,
    children: [
      {
        path: '',
        component: RegisteruserComponent,
      }
    ]

  },
  {
    path: 'forgotpassword',
    component: LogincontainerComponent,
    children: [
      {
        path: '',
        component: ForgotpasswordComponent,
      }
    ]

  },
  {
    path: 'dashboard',
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
    path: 'assignedexam',
    component: MainContainerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: AssignedexamlistComponent,
      }
    ]
  },
  {
    path: 'takeexam/:examid/:examgroupid',
    //component: MainContainerComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ExamscreenComponent,
      }
    ]
  },
  {
    path: 'result/:examid/:examgroupid',
    //component: MainContainerComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ExamresultComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  JwtModule.forRoot({
    config: {
      tokenGetter: tokenGetter,
    }
  })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CountdownModule, CountdownGlobalConfig, CountdownConfig } from 'ngx-countdown';
import { AdminModule } from '../admin/admin.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatSelectModule, MatCheckboxModule, MatRadioModule, MatListModule } from '@angular/material';
import { RegisteruserComponent } from './Components/registeruser/registeruser.component';
import { LogincontainerComponent } from './MasterComponents/logincontainer/logincontainer.component';
import { ForgotpasswordComponent } from './Components/forgotpassword/forgotpassword.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AssignedexamlistComponent } from './Components/assignedexamlist/assignedexamlist.component';
import { AssignexamListComponent } from '../admin/Component/Exam/assignexam-list/assignexam-list.component';
import { ExamscreenComponent } from './Components/examscreen/examscreen.component';
import { ExamresultComponent } from './Components/examresult/examresult.component';
import { ConfirmationDialogComponent } from './Components/Shared/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from '../Services/confirmation-dialog.service';
import { AssignexamUserlistComponent } from '../admin/Component/Exam/assignexam-userlist/assignexam-userlist.component';
//import { HeaderComponent } from '../admin/Component/Common/header/header.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NoRightClickDirective } from './no-right-click.directive';

export function countdownConfigFactory(): CountdownConfig {
  return {};
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisteruserComponent,
    LogincontainerComponent,
    ForgotpasswordComponent,
    DashboardComponent,
    AssignedexamlistComponent,
    AssignexamListComponent,
    ExamscreenComponent,
    ExamresultComponent,
    ConfirmationDialogComponent,
    NoRightClickDirective
    //HeaderComponent
  ],
  imports: [
    CountdownModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatListModule,
    AdminModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports: [],
  providers: [{ provide: CountdownGlobalConfig, useFactory: countdownConfigFactory }, ConfirmationDialogService, AssignexamUserlistComponent],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent, AssignexamUserlistComponent],
})
export class AppModule { }

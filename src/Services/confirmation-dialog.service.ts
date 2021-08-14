import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from '../app/Components/Shared/confirmation-dialog/confirmation-dialog.component';
import { AssignexamUserlistComponent } from '../admin/Component/Exam/assignexam-userlist/assignexam-userlist.component';

@Injectable({
  providedIn: 'root'
})

export class ConfirmationDialogService {

  constructor(private modalService: NgbModal) { }
  public confirm(
    title: string,
    message: string,
    btnOkText: string = 'Yes',
    btnCancelText: string = 'No',
    dialogSize: 'sm' | 'md' = 'md'): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }
  public messagebox(
    title: string,
    message: string,
    btnOkText: string = 'Ok',
    //btnCancelText: string = 'No',
    dialogSize: 'sm' | 'md' = 'md'): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;

    //modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }

  public OpenDialog(
    examId: string,
    dialogSize: 'sm' | 'md' = 'md'): Promise<boolean> {
    const modalRef = this.modalService.open(AssignexamUserlistComponent, { size: dialogSize });
    modalRef.componentInstance.examId = examId;
    return modalRef.result;
  }

}

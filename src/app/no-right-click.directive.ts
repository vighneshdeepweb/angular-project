import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoRightClick]'
})
export class NoRightClickDirective {
  @HostListener('contextmenu', ['$event'])
  @HostListener('document:keydown', ['$event'])
  onRightClick(event) {
    event.preventDefault();
  }
  keyEvent(event: KeyboardEvent) {
    console.log(event);
    if (event.keyCode == 123 || event.keyCode == 17 || event.keyCode == 116) {
      event.preventDefault();
    }
  }
  constructor() { }
}

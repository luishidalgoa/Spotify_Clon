import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDinamicComponent]',
  standalone: true
})
export class DinamicComponentDirective {

  constructor(public viewContainerRef:ViewContainerRef, private template: TemplateRef<any>) { }

}

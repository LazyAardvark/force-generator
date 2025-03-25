import { Directive, Input, Signal, TemplateRef, ViewContainerRef } from '@angular/core';
import { LoadComponent } from '../components/layout/load/load.component';

@Directive({
  selector: '[fgLoader]',
  standalone: true
})
export class LoaderDirective {

  @Input({ required: true })
   set fgLoader(loaded : Signal<boolean>) {
    this.showLoader(loaded());
   }; 
  
  constructor(public viewContainerRef: ViewContainerRef, private templateRef:TemplateRef<any>) {}

  private showLoader(condition : boolean) {
    if (condition) {
      this.viewContainerRef.clear();
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else if (!condition) {
      this.viewContainerRef.clear();
      this.viewContainerRef.createComponent(LoadComponent);
    }
  }
}
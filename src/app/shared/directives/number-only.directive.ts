import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[fgNumberOnly]'
})
export class NumberOnlyDirective {

  constructor(private elRef: ElementRef) { }

  @HostListener('input', ['event']) onInputChange(event: Event){
    const initVal = this.elRef.nativeElement.value;
    this.elRef.nativeElement.value = initVal.replace(/[^0-9]*/g, '');
    if(initVal !== this.elRef.nativeElement.value){
      event.stopPropagation();
    }
  }

}

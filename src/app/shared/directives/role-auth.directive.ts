import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';

@Directive({
  selector: '[fgRoleAuth]'
})
export class RoleAuthDirective {
  
  @Input({ required: true })
     set fgRoleAuth(role : string) {
      this.check(role);
     }; 
  private authService: AuthService = inject(AuthService);
  private templateRef = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);
  
  private check(role: string) {
    if (this.authService.hasRole(role) ) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}

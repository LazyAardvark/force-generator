import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { FeatureFlagService } from '../../core/services/feature-flag/feature-flag.service';
import { AuthService } from '../../core/services/auth/auth.service';

@Directive({
  selector: '[fgRoleAuth]'
})
export class RoleAuthDirective {
  
  @Input() roll !: string;
  private authService: AuthService = inject(AuthService);
  private templateRef = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);
  
  ngOnInit() {
    if (this.authService.hasRole(this.roll) ) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}

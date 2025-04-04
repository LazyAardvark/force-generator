import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { FeatureFlagService } from '../../core/services/feature-flag/feature-flag.service';

@Directive({
  selector: '[fgFeatureFlag]'
})
export class FeatureFlagDirective {
  @Input({ required: true })
     set fgFeatureFlag(featureName : string) {
      this.check(featureName);
     }; 
  private featureFlagsService: FeatureFlagService = inject(FeatureFlagService);
  constructor(public viewContainerRef: ViewContainerRef, private templateRef:TemplateRef<any>) {}

  
  private check(featureName: string) {
    if (this.featureFlagsService.isFeatureEnabled(featureName)) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}

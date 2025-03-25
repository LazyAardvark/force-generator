import { Directive, inject, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { FeatureFlagService } from '../../core/services/feature-flag/feature-flag.service';

@Directive({
  selector: '[fgFeatureFlag]'
})
export class FeatureFlagDirective implements OnInit{
  @Input() featureName !: string;
  private featureFlagsService: FeatureFlagService = inject(FeatureFlagService);
  private templateRef = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);
  
  ngOnInit() {
    if (this.featureFlagsService.isFeatureEnabled(this.featureName)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}

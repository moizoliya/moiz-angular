import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { SampleComponent } from './sample.component';
import { SampleDirective } from './sample.directive';
import { SamplePipe } from './sample.pipe';

import { RestService } from './rest.service';

export * from './sample.component';
export * from './sample.directive';
export * from './sample.pipe';
export * from './rest.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [
    SampleComponent,
    SampleDirective,
    SamplePipe
  ],
  exports: [
    SampleComponent,
    SampleDirective,
    SamplePipe
  ]
})
export class MoizAngularModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MoizAngularModule,
      providers: [RestService]
    };
  }
}

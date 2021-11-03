import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoseDetectionComponent } from './pose-detection/pose-detection.component';
import { ToxicityComponent } from './toxicity/toxicity.component';

const routes: Routes = [
  {
    path: 'toxicity',
    component: ToxicityComponent,
    loadChildren:() => import('./toxicity/toxicity.module').then(m => m.ToxicityModule)
  },
  {
    path: 'pose-detection',
    component: PoseDetectionComponent,
    loadChildren:() => import('./pose-detection/pose-detection.module').then(m => m.PoseDetectionModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

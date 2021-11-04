import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoseDetectionComponent } from './pose-detection/pose-detection.component';
import { TopComponent } from './top/top.component';
import { ToxicityComponent } from './toxicity/toxicity.component';

const routes: Routes = [
  {
    path: 'top',
    component: TopComponent,
    loadChildren:() => import('./top/top.module').then(m => m.TopModule)
  },
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

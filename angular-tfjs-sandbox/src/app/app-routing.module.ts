import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToxicityComponent } from './toxicity/toxicity.component';

const routes: Routes = [
  {
    path: 'toxicity',
    component: ToxicityComponent,
    loadChildren:() => import('./toxicity/toxicity.module').then(m => m.ToxicityModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

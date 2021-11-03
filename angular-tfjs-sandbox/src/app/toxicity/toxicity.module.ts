import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToxicityComponent } from './toxicity.component';
import { ToxicityPipe } from './toxicity.pipe';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ToxicityComponent,
    ToxicityPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class ToxicityModule { }

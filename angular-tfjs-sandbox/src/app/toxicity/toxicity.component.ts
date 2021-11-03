import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toxicity',
  templateUrl: './toxicity.component.html',
  styleUrls: ['./toxicity.component.scss']
})
export class ToxicityComponent implements OnInit {
  toxicity_text = 'toxicity text';

  constructor() { }

  ngOnInit(): void {
  }


}

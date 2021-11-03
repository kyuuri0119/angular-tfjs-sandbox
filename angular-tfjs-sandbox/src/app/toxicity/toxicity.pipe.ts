import { Pipe, PipeTransform } from '@angular/core';
import { ToxicityService } from './toxicity.service';

@Pipe({
  name: 'toxicity'
})
export class ToxicityPipe implements PipeTransform {

  constructor(private toxicityService: ToxicityService){}

  transform(value: string){
    return this.toxicityService.clissify(value);
  }

}

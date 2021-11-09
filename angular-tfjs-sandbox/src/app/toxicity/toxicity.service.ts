import { Injectable } from '@angular/core';

import '@tensorflow/tfjs';
import * as toxicity from '@tensorflow-models/toxicity';

@Injectable({
  providedIn: 'root',
})
export class ToxicityService {
  constructor() {}

  async clissify(text: string): Promise<any> {
    const model = await toxicity.load(0.8, []);
    const predictions = await model.classify(text);
    return predictions.map((prediction) => ({
      label: prediction.label,
      match: prediction.results.some((r) => r.match),
    }));
    console.log(predictions);
    // return predictions
  }
}

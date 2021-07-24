import * as faker from 'faker';
import { Injectable } from '@angular/core';
import { AdComponent } from '../components/ad/ad.component';
import { AdItem } from '../types/Ad';

@Injectable({
  providedIn: 'root',
})
export class AdService {
  ads = Array(3)
    .fill(0)
    .map(
      () =>
        new AdItem(AdComponent, {
          id: faker.datatype.uuid(),
          text: faker.lorem.paragraph(1),
          picture: faker.image.business(),
          component: AdComponent,
        })
    );

  getAll(): AdItem[] {
    return this.ads;
  }
}

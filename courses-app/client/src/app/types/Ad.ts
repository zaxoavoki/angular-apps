import { Type } from "@angular/core";

export interface Ad {
  id: string;
  text: string;
  picture: string;
}

export class AdItem {
  constructor(public component: Type<any>, public data: any) {}
}
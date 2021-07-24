import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AdDirective } from '../../directives/ad.directive';
import { Ad, AdItem } from '../../types/Ad';
import { AdComponent } from '../ad/ad.component';


@Component({
  selector: 'app-ad-banner',
  templateUrl: './ad-banner.component.html',
  styleUrls: [],
})
export class AdBannerComponent implements OnInit, OnDestroy {
  @Input() ads: AdItem[] = [];
  @ViewChild(AdDirective, { static: true }) adHost!: AdDirective;

  currentIdx = -1;
  interval: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    this.loadComponent();
    this.getAds();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    this.currentIdx = (this.currentIdx + 1) % this.ads.length;
    const adItem = this.ads[this.currentIdx];

    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(adItem.component);

    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef =
      viewContainerRef.createComponent<AdComponent>(componentFactory);
    componentRef.instance.data = adItem.data;
  }

  getAds() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 5000);
  }
}

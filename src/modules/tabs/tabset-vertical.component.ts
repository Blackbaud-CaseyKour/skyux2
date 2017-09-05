import {
  AfterContentInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  QueryList,
  ViewChild
} from '@angular/core';

import { SkyTabComponent } from './tab.component';
import { SkyTabsetAdapterService } from './tabset-adapter.service';
import { SkyTabsetService } from './tabset.service';

@Component({
  selector: 'sky-tabset-vertical',
  styleUrls: ['./tabset-vertical.component.scss'],
  templateUrl: './tabset-vertical.component.html'
})
export class SkyTabsetVerticalComponent implements AfterContentInit, OnDestroy {

  @Input()
  public tabs: QueryList<SkyTabComponent>;

  @ViewChild('verticalTabContent')
  public content: ElementRef;

  constructor(private tabsetService: SkyTabsetService) {}

  public selectTab(newTab: SkyTabComponent) {
    this.tabsetService.activateTab(newTab);
  }

  public ngAfterContentInit() {
    this.tabsetService.activeIndex.subscribe((newActiveIndex) => this.moveActiveTabContent());
  }

  public ngOnDestroy() {
    this.tabsetService.destroy();
  }

  public tabGroups() {
    return this.tabs.filter(tab => tab.isGroup());
  }

  public subTabs(item: SkyTabComponent) {
    if (item && item.tabs) {
      return item.tabs.toArray().slice(1, item.tabs.length);
    } else {
      return undefined;
    }
  }

  private moveActiveTabContent() {
    // add active tab content to side div
    let activeContent = this.tabsetService.activeTabContent();
    if (activeContent) {
      this.content.nativeElement.appendChild(activeContent.nativeElement);
    }
  }
}

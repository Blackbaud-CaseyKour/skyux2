import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ChangeDetectorRef,
  SimpleChanges,
  OnChanges,
  ViewChildren,
  ViewChild
} from '@angular/core';

import { SkyTabComponent } from './tab.component';
import { SkyTabsetAdapterService } from './tabset-adapter.service';
import { SkyTabsetService } from './tabset.service';

@Component({
  selector: 'sky-tabset',
  styleUrls: ['./tabset.component.scss'],
  templateUrl: './tabset.component.html',
  providers: [SkyTabsetAdapterService, SkyTabsetService]
})
export class SkyTabsetComponent
  implements AfterContentInit, AfterViewInit, DoCheck, OnDestroy, OnChanges {
  @Input()
  public tabStyle = 'tabs';

  @Input()
  public active: number | string;

  @Output()
  public newTab = new EventEmitter<any>();

  @Output()
  public openTab = new EventEmitter<any>();

  @Output()
  public activeChange = new EventEmitter<any>();

  @Input()
  public orientation: string = 'horizontal';

  @Input()
  public isGroup: boolean = false;

  public tabDisplayMode = 'tabs';

  @ContentChildren(SkyTabComponent)
  public tabs: QueryList<SkyTabComponent>;

  @ViewChild('verticalTabContent')
  public content: ElementRef;

  constructor(
    private tabsetService: SkyTabsetService,
    private adapterService: SkyTabsetAdapterService,
    private elRef: ElementRef,
    private changeRef: ChangeDetectorRef
  ) {
  }

  public tabCloseClick(tab: SkyTabComponent) {
    tab.close.emit(undefined);
  }

  public newTabClick() {
    this.newTab.emit(undefined);
  }

  public openTabClick() {
    this.openTab.emit(undefined);
  }

  public windowResize() {
    this.adapterService.detectOverflow();
  }

  public selectTab(newTab: SkyTabComponent) {
    console.warn('activating tab');
    this.tabsetService.activateTab(newTab);
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['active'] && changes['active'].currentValue !== changes['active'].previousValue) {
      this.tabsetService.activateTabIndex(this.active);
    }
  }

  public ngAfterContentInit() {
    if (this.active || this.active === 0) {
      this.tabsetService.activateTabIndex(this.active);
    }
    this.tabsetService.activeIndex.subscribe((newActiveIndex) => {
        // HACK: Not selecting the active tab in a timeout causes an error.
        // https://github.com/angular/angular/issues/6005
        setTimeout(() => {
          if (newActiveIndex !== this.active) {
            this.active = newActiveIndex;
            this.activeChange.emit(newActiveIndex);
          }
        });

        this.moveActiveTabContent();
    });
  }

  public ngAfterViewInit() {
    this.adapterService.init(this.elRef);

    this.adapterService.overflowChange.subscribe((currentOverflow: boolean) => {
      this.updateDisplayMode(currentOverflow);
    });

    setTimeout(() => {
      this.adapterService.detectOverflow();
      this.updateDisplayMode(this.adapterService.currentOverflow);
      this.changeRef.detectChanges();
    }, 0);
  }

  public ngDoCheck() {
    this.adapterService.detectOverflow();
  }

  public ngOnDestroy() {
    this.tabsetService.destroy();
  }

  public isVertical() {
    return this.orientation === 'vertical';
  }

  public nonGroupTabs() {
    let groups = this.tabs.filter(tab => tab.isGroup());

    if (groups && groups.length > 0) {
      let subTabs: SkyTabComponent[] =
        groups
          .map(tab => tab.tabs.toArray())
          .reduce((prev, current) => prev.concat(current))
          .filter(tab => !tab.isGroup());

      return subTabs;
    } else {
      return undefined;
    }
  }

  public tabGroups() {
    let groups = this.tabs.filter(tab => tab.isGroup());
    return groups;
  }

  public subTabs(item: SkyTabComponent) {
    if (item && item.tabs) {
      return item.tabs.toArray().slice(1, item.tabs.length);
    } else {
      return undefined;
    }
  }

  public getClasses() {
    const tabSetModeClass = `sky-tabset-mode-${this.tabDisplayMode}`;
    const tabStyleClass = `sky-tabset-style-${this.tabStyle}`;

    return {
      tabSetModeClass: true,
      tabStyleClass: true,
      'sky-tabset': !this.isVertical(),
      'sky-tabset-vertical': this.isVertical()
    };
  }

  private updateDisplayMode(currentOverflow: boolean) {
    this.tabDisplayMode = currentOverflow ? 'dropdown' : 'tabs';
  }

  private moveActiveTabContent() {
    if (this.isVertical()) {
      // add active tab content to side div
      let activeContent = this.tabsetService.activeTabContent();
      if (activeContent) {
        this.content.nativeElement.appendChild(activeContent.nativeElement);
      }
    }
  }
}

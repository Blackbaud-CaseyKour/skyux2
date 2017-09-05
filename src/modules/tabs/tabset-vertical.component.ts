import {
  AfterContentInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  QueryList,
  ViewChild,
  ChangeDetectorRef,
  OnInit
} from '@angular/core';

import {
  style,
  trigger,
  transition,
  animate
} from '@angular/animations';

import { Subscription } from 'rxjs/Subscription';

import { SkyResourcesService } from './../resources/resources.service';
import { SkyTabComponent } from './tab.component';
import { SkyTabsetService } from './tabset.service';
import { SkyMediaQueryService } from './../media-queries/media-query.service';
import { SkyMediaBreakpoints } from '../media-queries/media-breakpoints';

@Component({
  selector: 'sky-tabset-vertical',
  styleUrls: ['./tabset-vertical.component.scss'],
  templateUrl: './tabset-vertical.component.html',
  animations: [
    trigger(
      'tabGroupEnter', [
        transition(':enter', [
          style({transform: 'translate(-100%)'}),
          animate('350ms')
        ])
      ]
    ),
    trigger(
      'contentEnter', [
        transition(':enter', [
          style({transform: 'translate(100%)'}),
          animate('350ms')
        ])
      ]
    )
  ]
})
export class SkyTabsetVerticalComponent implements OnInit, AfterContentInit, OnDestroy {

  @Input()
  public tabs: QueryList<SkyTabComponent>;

  @Input()
  public set showTabsText(value: string) {
    this._showTabsText = value;
  }

  public get showTabsText() {
    return this._showTabsText
      ? this._showTabsText : this.resources.getString('vertical_tabs_show_tabs_text');
  }

  @ViewChild('verticalTabContent')
  public content: ElementRef;

  private _tabsVisible: boolean;
  private _wideScreen: boolean;
  private _mediaSubscription: Subscription;
  private _previousTabsVisible: boolean;
  private _showTabsText: string;

  constructor(
    private tabsetService: SkyTabsetService,
    private resources: SkyResourcesService,
    private mediaQueryService: SkyMediaQueryService,
    private changeRef: ChangeDetectorRef) {}

  public ngOnInit() {
    this._wideScreen = !this.isMobile();

    // subscribe to window size changes
    this._mediaSubscription = this.mediaQueryService.subscribe(
      (args: SkyMediaBreakpoints) => {
        this.changeRef.detectChanges();
      }
    );
  }

  public selectTab(newTab: SkyTabComponent) {
    this.tabsetService.activateTab(newTab);
  }

  public ngAfterContentInit() {
    this.tabsetService.activeIndex.subscribe((newActiveIndex) => {
      if (this.isMobile()) {
        this._tabsVisible = false;
        this.changeRef.detectChanges();
      }

      this.moveActiveTabContent();
    });
  }

  public ngOnDestroy() {
    this.tabsetService.destroy();
    this._mediaSubscription.unsubscribe();
  }

  public tabGroups() {
    return this.tabs.filter(tab => tab.isGroup());
  }

  public contentVisible(): boolean {
    return !this.isMobile() || !this._tabsVisible;
  }

  public isMobile(): boolean {
    return this.mediaQueryService.current === SkyMediaBreakpoints.xs;
  }

  public showTabs() {
    this._tabsVisible = true;
  }

  public subTabs(item: SkyTabComponent) {
    if (item && item.tabs) {
      return item.tabs.toArray().slice(1, item.tabs.length);
    } else {
      return undefined;
    }
  }

  public tabsVisible(): boolean {
    const isMobile = this.isMobile();
    const switchingToWidescreen = !isMobile && !this._wideScreen;
    const switchingToMobile = isMobile && this._wideScreen;

    // hide tabs when switching from widescreen to mobile
    if (switchingToWidescreen) {
      this._wideScreen = true;
      this.changeRef.detectChanges();
      this.moveActiveTabContent();

    } else if (switchingToMobile) {
      this._tabsVisible = false;
      this._wideScreen = false;
    }

    const visible = !this.isMobile() || this._tabsVisible;

    if (!visible && this._previousTabsVisible) {
      this.tabsetService.tabsHidden();
    } else if (visible && !this._previousTabsVisible) {
      this.tabsetService.tabsShown();
    }

    this._previousTabsVisible = visible;

    return visible;
  }

  private moveActiveTabContent() {
    // add active tab content to side div
    let activeContent = this.tabsetService.activeTabContent();
    if (activeContent) {
      this.content.nativeElement.appendChild(activeContent.nativeElement);
    }
  }
}

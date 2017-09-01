import {
  Component,
  Input,
  QueryList,
  ContentChildren,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';

import {
  style,
  trigger,
  transition,
  animate
} from '@angular/animations';

import { Subject } from 'rxjs/Subject';
import { SkyTabComponent } from './tab.component';
import { SkyTabsetService } from './tabset.service';

@Component({
  selector: 'sky-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
  animations: [
    trigger(
      'tabSlide', [
        transition(':enter', [
          style({
            height: '0',
            visibility: 'hidden'
          }),
          animate('150ms ease-in', style({
            height: '*',
            visibility: 'visible'
          }))
        ]),
        transition(':leave', [
          style({
            height: '*',
            visibility: 'visible'
          }),
          animate('150ms ease-in', style({
            height: '0',
            visibility: 'hidden'
          }))
        ])
      ])
    ]
})
export class SkyTabGroupComponent implements AfterViewInit, OnDestroy {

  @Input()
  public groupHeading: string;

  @Input()
  public disabled: boolean;

  @Input()
  public subTabs: SkyTabComponent[];

  @Output()
  public tabClick = new EventEmitter<SkyTabComponent>();

  private _open: boolean = false;
  private _openBeforeTabsHidden: boolean = false;
  private _ngUnsubscribe = new Subject();

  public get open(): boolean {
    return !this.disabled && this._open;
  }

  @Input()
  public set open(value: boolean) {
    this._open = value;
  }

  constructor(private tabService: SkyTabsetService) {}

  public ngAfterViewInit() {
    this.tabService.hidingTabs
      .takeUntil(this._ngUnsubscribe)
      .subscribe(this.tabsHidden);

    this.tabService.showingTabs
      .takeUntil(this._ngUnsubscribe)
      .subscribe(this.tabsShown);
  }

  public ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  public toggleMenuOpen() {
    if (!this.disabled) {
      this.open = !this.open;
    }
  }

  public subMenuOpen(): boolean {
    return this.subTabs && (this.subTabs.find(t => t.active) !== undefined);
  }

  public tabsHidden = () => {
    // this fixes an animation bug with ngIf when the parent component goes from visible to hidden
    this._openBeforeTabsHidden = this.open;
    this.open = false;
  }

  public tabsShown = () => {
    this.open = this._openBeforeTabsHidden;
  }

  public tabIndex(): number {
    return this.disabled ? -1 : 0;
  }

  public selectTab(tab: SkyTabComponent) {
    if (!tab.disabled) {
      this.tabClick.emit(tab);
    }
  }
}

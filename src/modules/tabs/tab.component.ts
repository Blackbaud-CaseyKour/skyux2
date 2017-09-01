import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  AfterViewInit,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
  ContentChildren,
  QueryList,
  ViewChild,
  ElementRef
} from '@angular/core';

import { SkyTabsetService } from './tabset.service';

@Component({
  selector: 'sky-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['tab.component.scss']
})
export class SkyTabComponent implements OnDestroy, AfterViewInit, OnChanges {
  @Input()
  public tabHeading: string;

  @Input()
  public tabHeaderCount: string;

  @Input()
  public disabled: boolean;

  @Input()
  public tabIndex: string | number;

  @Input()
  public active: boolean;

  @Input()
  public orientation: string = 'horizontal';

  @ContentChildren(SkyTabComponent)
  public tabs: QueryList<SkyTabComponent>;

  @ViewChild('tabContentWrapper')
  public tabContent: ElementRef;

  public get allowClose(): boolean {
    return this.close.observers.length > 0;
  }

  @Output()
  public close = new EventEmitter<any>();

  constructor(private tabsetService: SkyTabsetService, private ref: ChangeDetectorRef) {}

  public ngAfterViewInit() {
    setTimeout(() => {
      this.tabsetService.addTab(this);

      this.tabsetService.activeIndex.subscribe((activeIndex: any) => {
        this.active = this.tabIndex === activeIndex;
        this.ref.markForCheck();
      });

      if (this.active) {
        this.tabsetService.activateTab(this);
      }
    });

  }

  public ngOnChanges(changes: SimpleChanges) {
    /* istanbul ignore else */
    /* sanity check */
    if (changes) {
      let activeChange = changes['active'];
      if (activeChange
        && this.tabIndex !== undefined
        && activeChange.previousValue !== activeChange.currentValue
        && this.active) {
        this.tabsetService.activateTab(this);
      }
    }
  }

  public ngOnDestroy() {
    this.tabsetService.destroyTab(this);
  }

  public isGroup(): boolean {
    return this.tabs.length > 1;
  }
}

import {
  Component,
  Input,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  AfterViewInit
} from '@angular/core';

import { SkyTabsetService } from './tabset.service';

@Component({
  selector: 'sky-tab-vertical-button',
  templateUrl: './tab-vertical-button.component.html',
  styleUrls: ['./tab-vertical-button.component.scss']
})
export class SkyTabVerticalButtonComponent implements AfterViewInit {

  @Input()
  public tabHeading: string;

  @Input()
  public tabHeaderCount: string;

  @Input()
  public tabIndex: number;

  @Input()
  public disabled: boolean;

  @Output()
  public tabClick = new EventEmitter<any>();

  public active: boolean;
  public outline: boolean;

  constructor(private tabsetService: SkyTabsetService, private ref: ChangeDetectorRef) {}

  public ngAfterViewInit() {
    setTimeout(() => {
      this.tabsetService.activeIndex.subscribe((activeIndex: any) => {
        this.active = this.tabIndex === activeIndex;
        this.ref.markForCheck();

        if (!this.active) {
          this.outline = false;
        }
      });
    });
  }

  public tabMouseClick() {
    this.outline = false;
    this.tabClicked();
  }

  public tabClicked() {
    this.tabClick.emit(this);
  }

  public tabPress(event: KeyboardEvent) {
    // tabbed
    if (event.which === 9) {
      this.outline = true;
    }
  }
}

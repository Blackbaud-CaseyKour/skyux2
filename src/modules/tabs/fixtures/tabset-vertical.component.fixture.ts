import { Component, ViewChild } from '@angular/core';
import { SkyTabComponent } from './../tab.component';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './tabset-vertical.component.fixture.html'
})
export class TabsetVerticalTestComponent {
  public group1Disabled: boolean = false;
  public group2Disabled: boolean = false;
  public group3Disabled: boolean = true;

  @ViewChild(SkyTabComponent)
  public verticalTabs: SkyTabComponent;
}

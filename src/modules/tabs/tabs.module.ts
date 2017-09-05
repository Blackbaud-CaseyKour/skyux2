import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SkyDropdownModule } from '../dropdown';

import { SkyTabButtonComponent } from './tab-button.component';
import { SkyTabDropdownComponent } from './tab-dropdown.component';
import { SkyTabComponent } from './tab.component';
import { SkyTabsetComponent } from './tabset.component';
import { SkyTabsetNavButtonComponent } from './tabset-nav-button.component';
import { SkyTabGroupComponent } from './tab-group.component';

import { SkyResourcesModule } from '../resources';
import { SkyChevronModule } from './../chevron/chevron.module';
import { SkyTabVerticalButtonComponent } from './tab-vertical-button.component';
import { SkyTabsetVerticalComponent } from './tabset-vertical.component';

@NgModule({
  declarations: [
    SkyTabButtonComponent,
    SkyTabComponent,
    SkyTabDropdownComponent,
    SkyTabsetComponent,
    SkyTabsetNavButtonComponent,
    SkyTabGroupComponent,
    SkyTabVerticalButtonComponent,
    SkyTabsetVerticalComponent
  ],
  imports: [
    CommonModule,
    SkyDropdownModule,
    SkyResourcesModule,
    SkyChevronModule,
    BrowserAnimationsModule
  ],
  exports: [
    SkyTabComponent,
    SkyTabsetComponent,
    SkyTabsetNavButtonComponent
  ]
})
export class SkyTabsModule { }

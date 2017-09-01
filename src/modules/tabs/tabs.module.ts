import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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

@NgModule({
  declarations: [
    SkyTabButtonComponent,
    SkyTabComponent,
    SkyTabDropdownComponent,
    SkyTabsetComponent,
    SkyTabsetNavButtonComponent,
    SkyTabGroupComponent,
    SkyTabVerticalButtonComponent
  ],
  imports: [
    CommonModule,
    SkyDropdownModule,
    SkyResourcesModule,
    SkyChevronModule
  ],
  exports: [
    SkyTabComponent,
    SkyTabsetComponent,
    SkyTabsetNavButtonComponent
  ]
})
export class SkyTabsModule { }

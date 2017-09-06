import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SkyTabsFixturesModule } from './fixtures/tabs-fixtures.module';
import { SkyTabsetComponent } from './tabset.component';
import { SkyVerticalTabsetComponent } from '../vertical-tabset/vertical-tabset.component';
import { TabsetVerticalTestComponent } from './fixtures/tabset-vertical.component.fixture';
import { SkyTabsetService } from './tabset.service';
import { SkyTabsetAdapterService } from './tabset-adapter.service';

import { MockSkyMediaQueryService } from './../testing/mocks/mock-media-query.service';
import { SkyMediaQueryService, SkyMediaBreakpoints } from '../media-queries';

let mockQueryService = new MockSkyMediaQueryService();
let tabService = new SkyTabsetService();

describe('Vertical tabset component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyTabsFixturesModule
      ],
      providers: [
        { provide: SkyMediaQueryService, useValue: mockQueryService}
      ]
    });
  });

  function createTestComponent() {
    return TestBed
    .overrideComponent(SkyTabsetComponent, {
      set: {
        providers: [
          SkyTabsetAdapterService,
          { provide: SkyTabsetService, useValue: tabService }
        ]
      }
    })
    .createComponent(TabsetVerticalTestComponent);
  }

  it('first tab in open group should be selected', fakeAsync(() => {
    mockQueryService.current = SkyMediaBreakpoints.lg;
    let fixture = createTestComponent();
    let el = fixture.nativeElement as HTMLElement;

    fixture.detectChanges();
    tick();

    // check open tab content
    const content = el.querySelector('.sky-tabset-vertical-content');
    expect(content.textContent.trim()).toBe('Group 1 Tab 1 Content');

    // check open group
    const openGroup = el.querySelectorAll('.sky-tab-group-header-sub-open');
    expect(openGroup.length).toBe(1);
    expect(openGroup[0].textContent.trim()).toBe('Group 1');
  }));

  // it('open second tab in second group', fakeAsync(() => {
  //   mockQueryService.current = SkyMediaBreakpoints.lg;
  //   let fixture = createTestComponent();
  //   fixture.detectChanges();
  //   let el = fixture.nativeElement;

  //   // open second group
  //   const group = el.querySelectorAll('.sky-tab-group-header');
  //   group[1].click();

  //   fixture.detectChanges();

  //   console.warn(el);

  //   // check second group open
  //   const openedGroups = el.querySelectorAll('.sky-chevron-up');
  //   expect(openedGroups.length).toBe(2);

  //   // click second tab in second group
  //   const tabs = el.querySelectorAll('.sky-tab');
  //   tabs[3].click();

  //   fixture.detectChanges();

  //   // check open tab
  //   console.warn(el);
  //   expect(true).toBe(false);
  //   const visibleTab = el.querySelectorAll('.sky-vertical-tab-visible');
  //   expect(visibleTab.length).toBe(1);
  //   expect(visibleTab[0].textContent.trim()).toBe('Group 2 Tab 2 content');

  //   // check open group
  //   const openGroup = el.querySelectorAll('.sky-tab-group-header-sub-open');
  //   expect(openGroup.length).toBe(1);
  //   expect(openGroup[0].textContent.trim()).toBe('Group 2');
  // }));

  // it('check closing of group', fakeAsync(() => {
  //   mockQueryService.current = SkyMediaBreakpoints.lg;
  //   let fixture = createTestComponent();
  //   let el = fixture.nativeElement;

  //   fixture.detectChanges();

  //   // close first group
  //   const group = el.querySelectorAll('.sky-tab-group-header');
  //   group[0].click();

  //   fixture.detectChanges();

  //   // check group is closed
  //   const openedGroups = el.querySelectorAll('.sky-chevron-up');
  //   expect(openedGroups.length).toBe(0);
  // }));

  // it('disabled group should not open when clicked', fakeAsync(() => {
  //   mockQueryService.current = SkyMediaBreakpoints.lg;
  //   let fixture = createTestComponent();
  //   let el = fixture.nativeElement;

  //   fixture.detectChanges();

  //   // click disabled group
  //   const group = el.querySelectorAll('.sky-tab-group-header');
  //   group[2].click();

  //   fixture.detectChanges();

  //   // check group is still closed (only first group still open)
  //   const openedGroups = el.querySelectorAll('.sky-chevron-up');
  //   expect(openedGroups.length).toBe(1);
  // }));

  // it('mobile button should not be visible on wide screen', () => {
  //   mockQueryService.current = SkyMediaBreakpoints.lg;
  //   let fixture = createTestComponent();
  //   let el = fixture.nativeElement;

  //   fixture.detectChanges();

  //   // check show tabs button is not visible
  //   const showTabsButton = el.querySelectorAll('.sky-vertical-tabset-show-tabs');
  //   expect(showTabsButton.length).toBe(0);
  // }));

  // it('mobile button should be visible on small screen', fakeAsync(() => {
  //   mockQueryService.current = SkyMediaBreakpoints.xs;
  //   let fixture = createTestComponent();
  //   let el = fixture.nativeElement;

  //   fixture.detectChanges();

  //   // check show tabs button is visible
  //   const showTabsButton = el.querySelectorAll('.sky-vertical-tabset-show-tabs');
  //   expect(showTabsButton.length).toBe(1);
  //   expect(showTabsButton[0].textContent.trim()).toBe('Tab list');

  //   // check content is visible
  //   console.warn(el);
  //   expect(true).toBe(false);

  //   const content = el.querySelector('.sky-tabset-vertical-content .sky-vertical-tab-visible');
  //   expect(content.textContent.trim()).toBe('Group 1 Tab 1 content');

  //   // check tabs are not visible
  //   const tabs = el.querySelectorAll('.sky-tabset-vertical-buttons');
  //   expect(tabs.length).toBe(0);
  // }));

  // it('show tabs button should show tabs on mobile', fakeAsync(() => {
  //   mockQueryService.current = SkyMediaBreakpoints.xs;
  //   let fixture = createTestComponent();
  //   let el = fixture.nativeElement;

  //   fixture.detectChanges();

  //   // check tabs are not visible
  //   const tabs = el.querySelectorAll('.sky-tabset-vertical-buttons');
  //   expect(tabs.length).toBe(0);

  //   // check content is visible
  //   console.warn(el);
  //   expect(true).toBe(false);

  //   const content = el.querySelector('.sky-tabset-vertical-content .sky-vertical-tab-visible');
  //   expect(content.textContent.trim()).toBe('Group 1 Tab 1 content');

  //   // click show tabs
  //   const showTabsButton = el.querySelector('.sky-vertical-tabset-show-tabs');
  //   showTabsButton.click();

  //   fixture.detectChanges();

  //   // check tabs are visible
  //   const tabsUpdated = el.querySelectorAll('.sky-tabset-vertical-buttons');
  //   expect(tabsUpdated.length).toBe(1);

  //   // check content is not visible
  //   const contentUpdated = el.querySelectorAll('.sky-vertical-tab-visible');
  //   expect(contentUpdated.length).toBe(0);
  // }));

  // it('clicking a tab in mobile should show content and hides tabs', fakeAsync(() => {
  //   mockQueryService.current = SkyMediaBreakpoints.xs;
  //   let fixture = createTestComponent();
  //   let el = fixture.nativeElement;

  //   fixture.detectChanges();

  //   // click show tabs
  //   const showTabsButton = el.querySelector('.sky-vertical-tabset-show-tabs');
  //   showTabsButton.click();

  //   fixture.detectChanges();

  //   // click second tab in first group
  //   const allTabs = el.querySelectorAll('.sky-tab');
  //   allTabs[1].click();

  //   fixture.detectChanges();

  //   // check tabs are not visible
  //   const tabs = el.querySelectorAll('.sky-tabset-vertical-buttons');
  //   expect(tabs.length).toBe(0);

  //   // check content is visible
  //   const content = el.querySelector('.sky-tabset-vertical-content .sky-vertical-tab-visible');
  //   expect(content.textContent.trim()).toBe('Group 1 Tab 2 content');
  // }));

  // it('should hide tabs when switching from widescreen to mobile', fakeAsync(() => {
  //   mockQueryService.current = SkyMediaBreakpoints.lg;
  //   let fixture = createTestComponent();
  //   let el = fixture.nativeElement;

  //   fixture.detectChanges();

  //   // switch to mobile
  //   mockQueryService.fire(SkyMediaBreakpoints.xs);

  //   fixture.detectChanges();

  //   // check tabs are not visible
  //   const tabs = el.querySelectorAll('.sky-tabset-vertical-buttons');
  //   expect(tabs.length).toBe(0);

  //   // check content is visible
  //   const content = el.querySelector('.sky-tabset-vertical-content .sky-vertical-tab-visible');
  //   expect(content.textContent.trim()).toBe('Group 1 Tab 1 content');

  //   // check show tabs button is visible
  //   const showTabsButton = el.querySelector('.sky-vertical-tabset-show-tabs');
  //   showTabsButton.click();
  // }));

  // tslint:disable-next-line:max-line-length
  // it('should show tabs and hide tab list button when switching from mobile to widescreen', fakeAsync(() => {
  //   mockQueryService.current = SkyMediaBreakpoints.xs;
  //   let fixture = createTestComponent();
  //   let el = fixture.nativeElement;

  //   fixture.detectChanges();

  //   // switch to widescreen
  //   mockQueryService.fire(SkyMediaBreakpoints.lg);

  //   fixture.detectChanges();

  //   // check tabs are visible
  //   const tabs = el.querySelectorAll('.sky-tabset-vertical-buttons');
  //   expect(tabs.length).toBe(1);

  //   // check content is visible
  //   const content = el.querySelector('.sky-tabset-vertical-content .sky-vertical-tab-visible');
  //   expect(content.textContent.trim()).toBe('Group 1 Tab 1 content');

  //   // check show tabs button is not visible
  //   const showTabsButton = el.querySelectorAll('.sky-vertical-tabset-show-tabs');
  //   expect(showTabsButton.length).toBe(0);
  // }));

  // it('should deactivate active tab when another tab is clicked', fakeAsync(() => {
  //   mockQueryService.current = SkyMediaBreakpoints.lg;
  //   let fixture = createTestComponent();
  //   fixture.detectChanges();
  //   let el = fixture.nativeElement;

  //   // click first tab in first group
  //   let tabs = el.querySelectorAll('.sky-tab');
  //   tabs[0].click();

  //   fixture.detectChanges();

  //   // check open tab
  //   let visibleTabs = el.querySelectorAll('.sky-vertical-tab-visible');
  //   expect(visibleTabs.length).toBe(1);
  //   expect(visibleTabs[0].textContent.trim()).toBe('Group 1 Tab 1 content');

  //   // check open group
  //   let openGroups = el.querySelectorAll('.sky-tab-group-header-sub-open');
  //   expect(openGroups.length).toBe(1);
  //   expect(openGroups[0].textContent.trim()).toBe('Group 1');

  //   // click second tab in first group
  //   tabs = el.querySelectorAll('.sky-tab');
  //   tabs[1].click();

  //   fixture.detectChanges();

  //   // check open tab
  //   visibleTabs = el.querySelectorAll('.sky-vertical-tab-visible');
  //   expect(visibleTabs.length).toBe(1);
  //   expect(visibleTabs[0].textContent.trim()).toBe('Group 1 Tab 2 content');

  //   // check open group
  //   openGroups = el.querySelectorAll('.sky-tab-group-header-sub-open');
  //   expect(openGroups.length).toBe(1);
  //   expect(openGroups[0].textContent.trim()).toBe('Group 1');
  // }));

  // it('tabbing to first tab adds highlight class', fakeAsync(() => {
  //   mockQueryService.current = SkyMediaBreakpoints.lg;
  //   let fixture = createTestComponent();
  //   fixture.detectChanges();
  //   let firstTab = fixture.componentInstance.verticalTabs;

  //   // check first tab is not highlighted
  //   expect(firstTab.outline).toBe(false);

  //   // hit a different keystroke
  //   firstTab.tabPress({ which: 10 } as any);

  //   // check tab is not highlighted
  //   expect(firstTab.outline).toBe(false);

  //   // tab to first tab
  //   firstTab.tabPress({ which: 9 } as any);

  //   // check tab is not highlighted
  //   expect(firstTab.outline).toBe(true);
  // }));
});

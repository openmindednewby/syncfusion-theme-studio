import { useEffect } from 'react';

import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
  AccordionComponent,
  AccordionItemDirective,
  AccordionItemsDirective,
  ToolbarComponent,
  ItemsDirective,
  ItemDirective,
  BreadcrumbComponent,
  BreadcrumbItemDirective,
  BreadcrumbItemsDirective,
  MenuComponent,
  MenuItemsDirective,
  MenuItemDirective,
} from '@syncfusion/ej2-react-navigations';

import { FM } from '@/localization/helpers';
import { loadSyncfusionCss } from '@/utils';

const Tab1Content = (): JSX.Element => (
  <div className="p-4">
    <p className="text-text-primary">This is the content for Tab 1. Tabs help organize content.</p>
  </div>
);

const Tab2Content = (): JSX.Element => (
  <div className="p-4">
    <p className="text-text-primary">This is the content for Tab 2. Each tab can have unique content.</p>
  </div>
);

const Tab3Content = (): JSX.Element => (
  <div className="p-4">
    <p className="text-text-primary">This is the content for Tab 3. Switch between tabs to navigate.</p>
  </div>
);

export const NavigationsSection = (): JSX.Element => {
  // Load navigations CSS on mount
  useEffect(() => {
    loadSyncfusionCss('navigations').catch(() => {});
  }, []);

  return (
    <section className="space-y-8">
    <h3 className="text-xl font-semibold text-text-primary">{FM('components.navigations')}</h3>

    {/* Tabs */}
    <div className="space-y-4">
      <h4 className="font-medium text-text-secondary">{FM('components.tabs')}</h4>
      <TabComponent>
        <TabItemsDirective>
          <TabItemDirective content={Tab1Content} header={{ text: 'Home' }} />
          <TabItemDirective content={Tab2Content} header={{ text: 'Profile' }} />
          <TabItemDirective content={Tab3Content} header={{ text: 'Settings' }} />
        </TabItemsDirective>
      </TabComponent>
    </div>

    {/* Accordion */}
    <div className="space-y-4">
      <h4 className="font-medium text-text-secondary">{FM('components.accordion')}</h4>
      <AccordionComponent>
        <AccordionItemsDirective>
          <AccordionItemDirective
            content="Accordions are useful for organizing content into collapsible sections. They save screen space while keeping content accessible."
            header="What is an Accordion?"
          />
          <AccordionItemDirective
            content="Click on any accordion header to expand or collapse its content. Only one section can be open at a time by default."
            header="How to use it?"
          />
          <AccordionItemDirective
            content="Accordions can be customized with different expand modes, icons, and animations to match your application's design."
            header="Customization options"
          />
        </AccordionItemsDirective>
      </AccordionComponent>
    </div>

    {/* Toolbar */}
    <div className="space-y-4">
      <h4 className="font-medium text-text-secondary">{FM('components.toolbar')}</h4>
      <ToolbarComponent>
        <ItemsDirective>
          <ItemDirective prefixIcon="e-icons e-cut" text="Cut" tooltipText="Cut" />
          <ItemDirective prefixIcon="e-icons e-copy" text="Copy" tooltipText="Copy" />
          <ItemDirective prefixIcon="e-icons e-paste" text="Paste" tooltipText="Paste" />
          <ItemDirective type="Separator" />
          <ItemDirective prefixIcon="e-icons e-bold" tooltipText="Bold" />
          <ItemDirective prefixIcon="e-icons e-italic" tooltipText="Italic" />
          <ItemDirective prefixIcon="e-icons e-underline" tooltipText="Underline" />
        </ItemsDirective>
      </ToolbarComponent>
    </div>

    {/* Breadcrumb */}
    <div className="space-y-4">
      <h4 className="font-medium text-text-secondary">{FM('components.breadcrumb')}</h4>
      <BreadcrumbComponent enableNavigation={false}>
        <BreadcrumbItemsDirective>
          <BreadcrumbItemDirective iconCss="e-icons e-home" text="Home" url="/" />
          <BreadcrumbItemDirective text="Products" url="/products" />
          <BreadcrumbItemDirective text="Components" url="/components" />
          <BreadcrumbItemDirective text="Navigation" />
        </BreadcrumbItemsDirective>
      </BreadcrumbComponent>
    </div>

    {/* Menu */}
    <div className="space-y-4">
      <h4 className="font-medium text-text-secondary">{FM('components.menu')}</h4>
      <MenuComponent>
        <MenuItemsDirective>
          <MenuItemDirective text="File">
            <MenuItemsDirective>
              <MenuItemDirective text="New" />
              <MenuItemDirective text="Open" />
              <MenuItemDirective separator />
              <MenuItemDirective text="Save" />
              <MenuItemDirective text="Save As" />
            </MenuItemsDirective>
          </MenuItemDirective>
          <MenuItemDirective text="Edit">
            <MenuItemsDirective>
              <MenuItemDirective text="Undo" />
              <MenuItemDirective text="Redo" />
              <MenuItemDirective separator />
              <MenuItemDirective text="Cut" />
              <MenuItemDirective text="Copy" />
              <MenuItemDirective text="Paste" />
            </MenuItemsDirective>
          </MenuItemDirective>
          <MenuItemDirective text="View">
            <MenuItemsDirective>
              <MenuItemDirective text="Zoom In" />
              <MenuItemDirective text="Zoom Out" />
              <MenuItemDirective text="Full Screen" />
            </MenuItemsDirective>
          </MenuItemDirective>
          <MenuItemDirective text="Help" />
        </MenuItemsDirective>
      </MenuComponent>
    </div>
    </section>
  );
};

/**
 * Dedicated page for the Syncfusion DataGrid interactive playground.
 * Renders the same InteractivePlaygroundSection used on the grid showcase,
 * but as its own full page for a focused playground experience.
 */
import { ComponentTestIds } from '@/shared/testIds.components';

import { InteractivePlaygroundSection } from '../SyncfusionGridShowcase/sections';

const SyncfusionGridPlayground = (): JSX.Element => (
  <div className="space-y-8" data-testid={ComponentTestIds.SYNCFUSION_GRID_PLAYGROUND}>
    <InteractivePlaygroundSection />
  </div>
);

export default SyncfusionGridPlayground;

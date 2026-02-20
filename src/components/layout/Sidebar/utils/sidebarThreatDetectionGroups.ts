/**
 * SubNavGroup children for the "Components" expandable sidebar group.
 * Each component type maps to a SubNavGroup with Native/Syncfusion children,
 * mirroring the features/components/pages directory structure.
 */
import { RoutePath } from '@/app/routePaths';
import { TestIds } from '@/shared/testIds';
import { ComponentTestIds } from '@/shared/testIds.components';

import type { NavChild } from '../components/NavExpandableItem';

export const THREAT_DETECTION_CHILDREN: NavChild[] = [
  {
    labelKey: 'menu.threatDetectionOverview', testId: ComponentTestIds.NAV_THREAT_DETECTION_GROUP,
    expandTestId: ComponentTestIds.NAV_THREAT_DETECTION_GROUP_EXPAND, items: [
      { path: RoutePath.ThreatDetectionSample, labelKey: 'menu.threatDetectionSample', testId: TestIds.NAV_COMPONENTS_NATIVE },
    ],
  },
];

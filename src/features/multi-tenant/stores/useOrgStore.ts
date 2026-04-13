import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { DEFAULT_ORG_ID, ORG_STORE_KEY, ORG_STORE_NAME } from '../constants';

import type { Organization } from '../types';

interface OrgState {
  activeOrgId: number;
  activeOrg: Organization | null;
  setActiveOrg: (org: Organization) => void;
}

export const useOrgStore = create<OrgState>()(
  devtools(
    persist(
      (set) => ({
        activeOrgId: DEFAULT_ORG_ID,
        activeOrg: null,

        setActiveOrg: (org: Organization) =>
          set(
            { activeOrgId: org.id, activeOrg: org },
            false,
            'setActiveOrg',
          ),
      }),
      {
        name: ORG_STORE_KEY,
        partialize: (state) => ({
          activeOrgId: state.activeOrgId,
          activeOrg: state.activeOrg,
        }),
      },
    ),
    { name: ORG_STORE_NAME },
  ),
);

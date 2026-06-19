import type { App } from 'vue'

import VButton from './components/VButton.vue'
import VIconButton from './components/VIconButton.vue'
import VInput from './components/VInput.vue'
import VCard from './components/VCard.vue'
import VChip from './components/VChip.vue'
import VBadge from './components/VBadge.vue'
import VTabs from './components/VTabs.vue'
import VDivider from './components/VDivider.vue'
import VTitle from './components/VTitle.vue'
import VText from './components/VText.vue'
import VLink from './components/VLink.vue'
import VAlert from './components/VAlert.vue'
import VSkeleton from './components/VSkeleton.vue'
// — Vague 2 : formulaires —
import VCheckbox from './components/VCheckbox.vue'
import VRadioGroup from './components/VRadioGroup.vue'
import VSwitch from './components/VSwitch.vue'
import VTextarea from './components/VTextarea.vue'
import VSelect from './components/VSelect.vue'
import VAutoComplete from './components/VAutoComplete.vue'
import VCalendar from './components/VCalendar.vue'
// — Vague 3 : navigation & surfaces —
import VOverlay from './components/VOverlay.vue'
import VDialog from './components/VDialog.vue'
import VDrawer from './components/VDrawer.vue'
import VTooltip from './components/VTooltip.vue'
import VPopover from './components/VPopover.vue'
import VMenu from './components/VMenu.vue'
import VNavbar from './components/VNavbar.vue'
import VSidebar from './components/VSidebar.vue'
import VToolbar from './components/VToolbar.vue'
import VBreadcrumbs from './components/VBreadcrumbs.vue'
import VFab from './components/VFab.vue'
// — Vague 4 : données & affichage —
import VDataTable from './components/VDataTable.vue'
import VList from './components/VList.vue'
import VTreeview from './components/VTreeview.vue'
import VGrid from './components/VGrid.vue'
import VTimeline from './components/VTimeline.vue'
import VSteps from './components/VSteps.vue'
import VProgress from './components/VProgress.vue'
import VLineChart from './components/VLineChart.vue'
import VCarousel from './components/VCarousel.vue'
import VAvatar from './components/VAvatar.vue'
import VBanner from './components/VBanner.vue'
import VEmptyState from './components/VEmptyState.vue'
import VExpansionPanel from './components/VExpansionPanel.vue'
// — Vague 5 : auth & layouts —
import VAppShell from './components/VAppShell.vue'
import VAuthLayout from './components/VAuthLayout.vue'
import VAuthCard from './components/VAuthCard.vue'
import VFooter from './components/VFooter.vue'
import VLoginForm from './components/VLoginForm.vue'
import VRegisterForm from './components/VRegisterForm.vue'
import VForgotPasswordForm from './components/VForgotPasswordForm.vue'
import VResetPasswordForm from './components/VResetPasswordForm.vue'
import VLogout from './components/VLogout.vue'

export {
  VButton,
  VIconButton,
  VInput,
  VCard,
  VChip,
  VBadge,
  VTabs,
  VDivider,
  VTitle,
  VText,
  VLink,
  VAlert,
  VSkeleton,
  VCheckbox,
  VRadioGroup,
  VSwitch,
  VTextarea,
  VSelect,
  VAutoComplete,
  VCalendar,
  VOverlay,
  VDialog,
  VDrawer,
  VTooltip,
  VPopover,
  VMenu,
  VNavbar,
  VSidebar,
  VToolbar,
  VBreadcrumbs,
  VFab,
  VDataTable,
  VList,
  VTreeview,
  VGrid,
  VTimeline,
  VSteps,
  VProgress,
  VLineChart,
  VCarousel,
  VAvatar,
  VBanner,
  VEmptyState,
  VExpansionPanel,
  VAppShell,
  VAuthLayout,
  VAuthCard,
  VFooter,
  VLoginForm,
  VRegisterForm,
  VForgotPasswordForm,
  VResetPasswordForm,
  VLogout,
}

// — Validation —
export { useForm } from './composables/useForm'
export { useClickOutside } from './composables/useClickOutside'
export {
  required,
  email,
  minLength,
  maxLength,
  pattern,
  sameAs,
  min,
  max,
} from './validators'
export type { ValidationRule } from './validators'

export type { StatusKind, AlertKind, ButtonVariant, Size, SelectOption } from './types'
export type { TabItem } from './components/VTabs.vue'
export type { MenuItem } from './components/VMenu.vue'
export type { NavItem, NavSection } from './components/VSidebar.vue'
export type { Crumb } from './components/VBreadcrumbs.vue'
export type { Column } from './components/VDataTable.vue'
export type { ListItem } from './components/VList.vue'
export type { TreeNode } from './components/VTreeview.vue'
export type { TimelineItem } from './components/VTimeline.vue'
export type { Step } from './components/VSteps.vue'
export type { FooterColumn } from './components/VFooter.vue'

const components = {
  VButton,
  VIconButton,
  VInput,
  VCard,
  VChip,
  VBadge,
  VTabs,
  VDivider,
  VTitle,
  VText,
  VLink,
  VAlert,
  VSkeleton,
  VCheckbox,
  VRadioGroup,
  VSwitch,
  VTextarea,
  VSelect,
  VAutoComplete,
  VCalendar,
  VOverlay,
  VDialog,
  VDrawer,
  VTooltip,
  VPopover,
  VMenu,
  VNavbar,
  VSidebar,
  VToolbar,
  VBreadcrumbs,
  VFab,
  VDataTable,
  VList,
  VTreeview,
  VGrid,
  VTimeline,
  VSteps,
  VProgress,
  VLineChart,
  VCarousel,
  VAvatar,
  VBanner,
  VEmptyState,
  VExpansionPanel,
  VAppShell,
  VAuthLayout,
  VAuthCard,
  VFooter,
  VLoginForm,
  VRegisterForm,
  VForgotPasswordForm,
  VResetPasswordForm,
  VLogout,
}

/**
 * Plugin Vue : enregistre tous les composants globalement.
 * `app.use(Verdex)` — sinon importer les composants à la carte.
 */
export const Verdex = {
  install(app: App) {
    for (const [name, comp] of Object.entries(components)) {
      app.component(name, comp)
    }
  },
}

export default Verdex

/** Statuts partagés du design system Verdex. */
export type StatusKind = 'neutral' | 'ok' | 'warn' | 'err' | 'info'

/** Tonalités d'alerte. */
export type AlertKind = 'info' | 'success' | 'warn' | 'err'

/** Variantes de bouton. */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost'

/** Tailles de contrôle. */
export type Size = 'sm' | 'md'

/** Option d'un select / radio / autocomplete. */
export interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
}

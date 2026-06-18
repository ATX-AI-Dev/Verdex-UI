/**
 * Règles de validation réutilisables pour `useForm`.
 * Une règle retourne `true` si valide, sinon le message d'erreur (string).
 */
export type ValidationRule<T = unknown> = (value: T) => true | string

const isEmpty = (v: unknown): boolean =>
  v == null || v === '' || (Array.isArray(v) && v.length === 0)

/** Champ obligatoire. */
export const required =
  (msg = 'Ce champ est requis.'): ValidationRule =>
  (v) =>
    !isEmpty(v) || msg

/** Format email. Les valeurs vides passent (combiner avec `required`). */
export const email =
  (msg = 'Adresse email invalide.'): ValidationRule =>
  (v) =>
    isEmpty(v) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v)) || msg

/** Longueur minimale. */
export const minLength =
  (n: number, msg?: string): ValidationRule =>
  (v) =>
    isEmpty(v) || String(v).length >= n || (msg ?? `Au moins ${n} caractères.`)

/** Longueur maximale. */
export const maxLength =
  (n: number, msg?: string): ValidationRule =>
  (v) =>
    isEmpty(v) || String(v).length <= n || (msg ?? `Au plus ${n} caractères.`)

/** Expression régulière. */
export const pattern =
  (re: RegExp, msg = 'Format invalide.'): ValidationRule =>
  (v) =>
    isEmpty(v) || re.test(String(v)) || msg

/** Valeur identique à une autre (ex. confirmation de mot de passe). */
export const sameAs =
  (getOther: () => unknown, msg = 'Les valeurs ne correspondent pas.'): ValidationRule =>
  (v) =>
    v === getOther() || msg

/** Valeur numérique minimale. */
export const min =
  (n: number, msg?: string): ValidationRule =>
  (v) =>
    isEmpty(v) || Number(v) >= n || (msg ?? `Doit être ≥ ${n}.`)

/** Valeur numérique maximale. */
export const max =
  (n: number, msg?: string): ValidationRule =>
  (v) =>
    isEmpty(v) || Number(v) <= n || (msg ?? `Doit être ≤ ${n}.`)

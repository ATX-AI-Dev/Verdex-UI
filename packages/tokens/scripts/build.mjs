// Build @verdex/tokens : copie les CSS source vers dist/.
// CSS pur, aucune transformation nécessaire — les @import relatifs
// (./tokens.css, ...) restent valides dans dist/.
import { cp, mkdir, rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const src = join(root, 'src')
const dist = join(root, 'dist')

await rm(dist, { recursive: true, force: true })
await mkdir(dist, { recursive: true })
await cp(src, dist, { recursive: true })

console.log('@verdex/tokens → dist/ OK')

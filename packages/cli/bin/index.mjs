#!/usr/bin/env node
// ============================================================
// Verdex CLI — `verdex init`
// Choisit le framework cible dans le terminal puis affiche
// (et prépare) l'installation du design system Verdex.
//
// Usage :
//   verdex init                         (interactif)
//   verdex init --framework vue --yes   (non interactif, CI)
//   verdex init -f vanilla --pm npm
// ============================================================
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'

import * as p from '@clack/prompts'
import pc from 'picocolors'

const FONTS_LINK =
  '<link href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />'

const FRAMEWORKS = {
  vanilla: {
    label: 'Vanilla HTML/CSS',
    packages: ['@verdex/tokens'],
    snippet: [
      'Dans votre HTML :',
      '  <html data-theme="dark">',
      `  <head>`,
      `    ${FONTS_LINK}`,
      '    <link rel="stylesheet" href="node_modules/@verdex/tokens/dist/index.css" />',
      '  </head>',
      '',
      'Puis utilisez les classes : <button class="vx-btn vx-btn--primary">Go</button>',
    ],
  },
  vue: {
    label: 'Vue 3',
    packages: ['@verdex/tokens', '@verdex/vue', 'vue'],
    snippet: [
      "Dans main.ts :",
      "  import '@verdex/tokens'",
      "  import '@verdex/vue/style.css'",
      "  import { Verdex } from '@verdex/vue'",
      '  createApp(App).use(Verdex).mount(\'#app\')',
      '',
      'Posez le thème : <html data-theme="dark">',
    ],
  },
  nuxt: {
    label: 'Nuxt 3',
    packages: ['@verdex/tokens', '@verdex/vue'],
    snippet: [
      'nuxt.config.ts :',
      "  css: ['@verdex/tokens', '@verdex/vue/style.css']",
      '',
      'plugins/verdex.ts :',
      "  import { Verdex } from '@verdex/vue'",
      '  export default defineNuxtPlugin((nuxt) => nuxt.vueApp.use(Verdex))',
    ],
  },
}

function parseArgs(argv) {
  const args = { _: [] }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--yes' || a === '-y') args.yes = true
    else if (a === '--framework' || a === '-f') args.framework = argv[++i]
    else if (a === '--pm') args.pm = argv[++i]
    else args._.push(a)
  }
  return args
}

function detectPM(cwd) {
  if (existsSync(join(cwd, 'pnpm-lock.yaml'))) return 'pnpm'
  if (existsSync(join(cwd, 'yarn.lock'))) return 'yarn'
  if (existsSync(join(cwd, 'bun.lockb'))) return 'bun'
  return 'npm'
}

function installCmd(pm, pkgs) {
  const add = pm === 'npm' ? 'install' : 'add'
  return `${pm} ${add} ${pkgs.join(' ')}`
}

/** Injecte le <link> fonts dans index.html s'il existe et ne l'a pas déjà. */
function injectFonts(cwd) {
  const file = join(cwd, 'index.html')
  if (!existsSync(file)) return null
  const html = readFileSync(file, 'utf8')
  if (html.includes('Space+Grotesk')) return 'present'
  if (!html.includes('</head>')) return null
  writeFileSync(file, html.replace('</head>', `  ${FONTS_LINK}\n  </head>`))
  return 'injected'
}

async function init(args) {
  p.intro(pc.bgGreen(pc.black(' Verdex UI ')))

  let framework = args.framework
  if (!framework) {
    if (args.yes) framework = 'vanilla'
    else {
      const choice = await p.select({
        message: 'Quel framework utilisez-vous ?',
        options: Object.entries(FRAMEWORKS).map(([value, f]) => ({ value, label: f.label })),
        initialValue: 'vue',
      })
      if (p.isCancel(choice)) return p.cancel('Annulé.')
      framework = choice
    }
  }

  const fw = FRAMEWORKS[framework]
  if (!fw) {
    p.cancel(`Framework inconnu : ${framework} (vanilla | vue | nuxt)`)
    process.exitCode = 1
    return
  }

  const cwd = process.cwd()
  const pm = args.pm || detectPM(cwd)
  const cmd = installCmd(pm, fw.packages)

  p.note(cmd, pc.green('1. Installer les paquets'))

  // Injection des fonts pour les projets avec un index.html
  if (framework !== 'nuxt') {
    const res = injectFonts(cwd)
    if (res === 'injected') p.log.success('Police Space Grotesk/Mono ajoutée à index.html')
    else if (res === 'present') p.log.info('index.html contient déjà les fonts Verdex')
  }

  p.note(fw.snippet.join('\n'), pc.green('2. Configurer'))

  p.outro(
    `${pc.green('✔')} Prêt pour ${pc.bold(fw.label)}. Thème par défaut : ${pc.dim('data-theme="dark"')}`,
  )
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const cmd = args._[0] || 'init'
  if (cmd === 'init') {
    await init(args)
  } else if (cmd === '--help' || cmd === '-h' || cmd === 'help') {
    console.log(`
${pc.bold('verdex')} — design system Verdex

Usage :
  verdex init [options]

Options :
  -f, --framework <vanilla|vue|nuxt>   Cible (sinon demandé)
  -y, --yes                            Non interactif (défaut: vanilla)
  --pm <npm|pnpm|yarn|bun>             Gestionnaire (sinon détecté)
`)
  } else {
    console.error(pc.red(`Commande inconnue : ${cmd}`))
    process.exitCode = 1
  }
}

main()

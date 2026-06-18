<script setup lang="ts">
import { ref } from 'vue'
import {
  VCard,
  VTabs,
  VAuthLayout,
  VLoginForm,
  VRegisterForm,
  VForgotPasswordForm,
  VResetPasswordForm,
  VLogout,
  VFooter,
  VButton,
  VLink,
  VText,
  VSidebar,
  VNavbar,
  VAppShell,
  type TabItem,
  type NavSection,
  type FooterColumn,
} from '@verdex/vue'

const screens: TabItem[] = [
  { id: 'login', label: 'Connexion' },
  { id: 'register', label: 'Inscription' },
  { id: 'forgot', label: 'Oublié' },
  { id: 'reset', label: 'Réinit.' },
  { id: 'logout', label: 'Déconnexion' },
]
const screen = ref('login')
const lastSubmit = ref('—')
const sent = ref(false)

function onLogin(v: { email: string; password: string; remember: boolean }) {
  lastSubmit.value = `login: ${v.email} (remember=${v.remember})`
}
function onRegister(v: { name: string; email: string }) {
  lastSubmit.value = `register: ${v.name} / ${v.email}`
}
function onForgot(v: { email: string }) {
  lastSubmit.value = `forgot: ${v.email}`
  sent.value = true
}
function onReset() {
  lastSubmit.value = 'reset: mot de passe changé'
}

const footerCols: FooterColumn[] = [
  { title: 'Produit', links: [{ label: 'Composants', href: '#' }, { label: 'Tarifs', href: '#' }] },
  { title: 'Ressources', links: [{ label: 'Docs', href: '#' }, { label: 'GitHub', href: '#' }] },
]

const sections: NavSection[] = [
  { label: 'Pilotage', items: [{ id: 'o', label: 'Aperçu', icon: '◫' }, { id: 'p', label: 'Projets', icon: '◇' }] },
]
const active = ref('o')
</script>

<template>
  <div class="stack">
    <VCard tag="Pages d'authentification">
      <div class="stack">
        <VTabs v-model="screen" :items="screens" />
        <div class="auth-frame">
          <VAuthLayout brand="Verdex" tagline="Cockpit unifié">
            <VLoginForm v-if="screen === 'login'" :error="''" @submit="onLogin">
              <template #forgot><VLink href="#" muted>Mot de passe oublié ?</VLink></template>
              <template #oauth><VButton block>GitHub</VButton></template>
              <template #footer>Pas de compte ? <VLink href="#">Créer un compte</VLink></template>
            </VLoginForm>

            <VRegisterForm v-else-if="screen === 'register'" @submit="onRegister">
              <template #footer>Déjà inscrit ? <VLink href="#">Se connecter</VLink></template>
            </VRegisterForm>

            <VForgotPasswordForm v-else-if="screen === 'forgot'" :sent="sent" @submit="onForgot">
              <template #footer><VLink href="#">Retour à la connexion</VLink></template>
            </VForgotPasswordForm>

            <VResetPasswordForm v-else-if="screen === 'reset'" @submit="onReset" />

            <div v-else class="logout-wrap">
              <VLogout @confirm="lastSubmit = 'logout: confirmé'" @cancel="lastSubmit = 'logout: annulé'" />
            </div>
          </VAuthLayout>
        </div>
        <VText mono size="sm" muted>submit → {{ lastSubmit }}</VText>
      </div>
    </VCard>

    <VCard tag="App shell (layout)">
      <div class="shell-frame">
        <VAppShell>
          <template #sidebar>
            <VSidebar v-model="active" :sections="sections">
              <template #brand><span class="glyph">V</span> Verdex</template>
            </VSidebar>
          </template>
          <template #header>
            <VNavbar :sticky="false">
              <VText mono size="sm" muted>/ {{ active === 'o' ? 'Aperçu' : 'Projets' }}</VText>
            </VNavbar>
          </template>
          <div class="shell-content">
            <VText muted>Zone de contenu — section « {{ active }} ».</VText>
          </div>
        </VAppShell>
      </div>
    </VCard>

    <VCard tag="Footer">
      <VFooter :columns="footerCols" copyright="© 2026 Verdex. MIT.">
        <template #brand><span class="glyph">V</span> Verdex</template>
        <VButton size="sm" variant="ghost">Statut</VButton>
      </VFooter>
    </VCard>
  </div>
</template>

<style scoped>
.stack { display: flex; flex-direction: column; gap: 20px; }
.auth-frame {
  border: 1.5px dashed var(--vx-line);
  border-radius: var(--vx-radius);
  padding: 24px;
}
.logout-wrap { display: grid; place-items: center; }
.shell-frame {
  height: 280px;
  border: 1.5px solid var(--vx-line);
  border-radius: var(--vx-radius);
  overflow: hidden;
}
.shell-content { padding: 22px; }
.glyph {
  display: inline-grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 7px;
  background: var(--vx-accent);
  color: var(--vx-accent-ink);
  font-family: var(--vx-font-mono);
  font-weight: 700;
  font-size: 13px;
}
</style>

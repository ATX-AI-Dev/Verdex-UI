# sync-upstream.ps1
#
# Synchronise le suivi de l'upstream Verdex-Workspace/Verdex-UI dans la branche
# dediee `upstream-track` -- sans jamais toucher main ni les branches de travail.
# Lance par le Planificateur de taches Windows une fois par jour.
#
# Remotes:
#   origin   -> https://github.com/ATX-AI-Dev/Verdex-UI  (fork actif, lecture/ecriture)
#   upstream -> https://github.com/Verdex-Workspace/Verdex-UI  (reference, lecture seule)
#
# IMPORTANT : Ce script ne fusionne plus automatiquement les changements upstream
# dans main -- Ludo gere manuellement la reconciliation depuis `upstream-track`.

$ErrorActionPreference = "Stop"

$RepoPath  = "C:\Users\Ludo\Projects\claude-antigravity-orchestration\Ressources\Verdex-UI"
$LogFile   = "$RepoPath\sync.log"
$Timestamp = (Get-Date -Format "yyyy-MM-dd HH:mm:ss")

try {
    Set-Location $RepoPath

    # Recupere les nouveaux commits upstream sans modifier la branche courante
    git fetch upstream

    # Met a jour la branche de suivi locale (creation si absent)
    $exists = git branch --list upstream-track
    if (-not $exists) {
        git branch upstream-track upstream/main
        Add-Content $LogFile "[$Timestamp] INFO : branche upstream-track creee depuis upstream/main"
    } else {
        # Fast-forward uniquement -- echoue si divergence (protege le travail local)
        git fetch upstream main:upstream-track 2>&1 | Out-Null
    }

    $upstreamHash = git rev-parse upstream/main
    $trackHash    = git rev-parse upstream-track

    Add-Content $LogFile "[$Timestamp] OK : upstream/main = $upstreamHash | upstream-track = $trackHash"

} catch {
    Add-Content $LogFile "[$Timestamp] ERREUR : $_"
    exit 1
}

# Git & Verziókezelés

## Rövid összefoglaló

A Git egy elosztott verziókezelő rendszer, amely lehetővé teszi a kód változásainak nyomon követését, együttműködést és párhuzamos fejlesztést. Központi fogalmak: repo, commit, branch, merge vs rebase, pull request és release flow. Modern workflow-k közé tartozik a GitFlow és trunk-based fejlesztés. A Git erőssége a branching, distributed nature és a history kezelés rugalmassága. Fő buktatók: force push használata, branch divergence és merge conflict-ok helytelen kezelése.

## Fogalmak

### Repo (Repository) {#repo-repository}
Projekt összes fájljának és azok teljes történetének tároló egysége. Tartalmazza a working directory, staging area és Git directory részeket.

**Példa:**
```bash
# Repository inicializálás
git init my-project
cd my-project

# Repository klónozás
git clone https://github.com/username/repository.git
git clone git@github.com:username/repository.git  # SSH

# Repository állapot ellenőrzése
git status
# On branch main
# Your branch is up to date with 'origin/main'
# nothing to commit, working tree clean

# Repository információk
git remote -v
# origin  https://github.com/username/repo.git (fetch)
# origin  https://github.com/username/repo.git (push)

git log --oneline -5
# a1b2c3d (HEAD -> main, origin/main) Add user authentication
# e4f5g6h Fix login bug  
# i7j8k9l Initial project setup
```

Magyarázat: A repository a Git alapegysége, amely tartalmazza a project teljes verzióhistóriáját és konfigurációját.

### Commit {#commit}
Egyedi pillanatfelvétel a projekt állapotáról. Minden commit egyedi hash-sel rendelkezik és tartalma változtathatatlan.

**Példa:**
```bash
# Working directory changes
echo "console.log('Hello Git');" > app.js
echo "# My Project" > README.md

# Staging area-hoz adás
git add app.js
git add README.md
# vagy
git add .  # minden változás

# Commit létrehozás
git commit -m "feat: add initial application setup"
# [main a1b2c3d] feat: add initial application setup
# 2 files changed, 2 insertions(+)
# create mode 100644 app.js
# create mode 100644 README.md

# Részletes commit információ
git show a1b2c3d
# commit a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0
# Author: Developer <dev@example.com>
# Date:   Wed Sep 27 10:30:45 2023 +0200
# 
#     feat: add initial application setup
# 
# diff --git a/app.js b/app.js
# new file mode 100644
# index 0000000..c9cd42f
# --- /dev/null
# +++ b/app.js
# @@ -0,0 +1 @@
# +console.log('Hello Git');

# Commit módosítás (még nincs push-olva)
git commit --amend -m "feat: add initial application with logging"
```

Magyarázat: Commit a projekt adott pillanatának mentése, egyedi hash-sel és metaadatokkal.

### Branch {#branch}
Fejlesztési ág, amely lehetővé teszi a párhuzamos munkát ugyanazon projekten belül. Lightweight pointerek a commit-okra.

**Példa:**
```bash
# Branch-ek listázása
git branch
# * main
#   feature/user-auth
#   bugfix/login-error

git branch -r  # remote branch-ek
# origin/main
# origin/feature/user-auth

git branch -a  # összes branch
# * main
#   feature/user-auth
#   bugfix/login-error
#   remotes/origin/main
#   remotes/origin/feature/user-auth

# Új branch létrehozás
git branch feature/payment-system
git checkout feature/payment-system
# vagy egyben
git checkout -b feature/payment-system
# vagy modern Git-ben
git switch -c feature/payment-system

# Branch váltás
git checkout main
git switch main  # újabb szintaxis

# Branch törlés
git branch -d feature/completed-feature    # safe delete
git branch -D feature/experimental        # force delete

# Remote branch törlés
git push origin --delete feature/old-feature
```

Magyarázat: Branch-ek lehetővé teszik a feature-ök párhuzamos fejlesztését anélkül, hogy befolyásolnák a main kódbázist.

### Merge vs Rebase {#merge-vs-rebase}
Két különböző módszer a branch-ek egyesítésére. Merge megőrzi a history-t, rebase lineáris történetet hoz létre.

**Merge példa:**
```bash
# Feature branch merge-ölése main-be
git checkout main
git pull origin main  # main frissítése

git merge feature/user-authentication
# Merge made by the 'recursive' strategy.
#  src/auth/login.js     | 25 +++++++++++++++++++++++++
#  src/auth/register.js  | 30 ++++++++++++++++++++++++++++++
#  tests/auth.test.js    | 15 +++++++++++++++
#  3 files changed, 70 insertions(+)

# No-fast-forward merge (explicit merge commit)
git merge --no-ff feature/user-authentication
# Explicitly creates a merge commit even if fast-forward is possible

# Merge conflict example
git merge feature/conflicting-branch
# Auto-merging src/config.js
# CONFLICT (content): Merge conflict in src/config.js
# Automatic merge failed; fix conflicts and then commit the result.

# Conflict resolution
# Edit conflicted files, remove markers:
# <<<<<<< HEAD
# const API_URL = 'https://api.prod.com';
# =======
# const API_URL = 'https://api.dev.com';
# >>>>>>> feature/conflicting-branch

# After manual editing:
git add src/config.js
git commit -m "resolve: merge conflict in API URL configuration"
```

**Rebase példa:**
```bash
# Feature branch rebase-elése main-re
git checkout feature/user-profile
git rebase main
# First, rewinding head to replay your work on top of it...
# Applying: add user profile component
# Applying: add profile validation
# Applying: add profile tests

# Interactive rebase - commit history szerkesztése  
git rebase -i HEAD~3
# Opens editor with:
# pick a1b2c3d add user profile component
# pick e4f5g6h add profile validation  
# pick i7j8k9l add profile tests
#
# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# d, drop = remove commit

# Squash commits example:
# pick a1b2c3d add user profile component
# squash e4f5g6h add profile validation
# squash i7j8k9l add profile tests
# Results in single commit with all changes

# Rebase conflict resolution
git rebase main
# CONFLICT (content): Merge conflict in src/profile.js
# error: could not apply e4f5g6h... add profile validation
# 
# Resolve all conflicts manually, mark them as resolved with
# "git add/rm <conflicted_files>", then run "git rebase --continue"

# After resolving conflicts:
git add src/profile.js
git rebase --continue

# Abort rebase if needed
git rebase --abort
```

Magyarázat: Merge megőrzi a branch history-t, rebase lineáris történetet hoz létre a commit-ok újrajátszásával.

### Pull Request / Code Review {#pull-request-code-review}
Mechanizmus a kód változások review-jához és merge-öléséhez távoli repository-ban (GitHub, GitLab, BitBucket).

**Példa workflow:**
```bash
# 1. Feature branch létrehozás
git checkout main
git pull origin main
git checkout -b feature/JIRA-123-user-notifications

# 2. Fejlesztés és commit-ok
git add src/notifications/
git commit -m "feat(notifications): add email notification service"

git add tests/notifications/
git commit -m "test(notifications): add unit tests for email service"

git add docs/notifications.md
git commit -m "docs(notifications): add notification configuration guide"

# 3. Branch push-olás
git push origin feature/JIRA-123-user-notifications

# 4. Pull Request létrehozás GitHub-on
# - Navigate to repository
# - Click "Compare & pull request" button
# - Fill PR template:

# Pull Request Title: [JIRA-123] Add user email notifications
#
# ## Description
# Implements email notification system for user events:
# - User registration confirmation
# - Password reset emails  
# - Weekly digest notifications
#
# ## Changes
# - Add EmailService class with SMTP integration
# - Add notification templates (HTML/text)
# - Add configuration for different email providers
# - Add comprehensive unit tests
#
# ## Testing
# - [x] Unit tests added and passing
# - [x] Integration tests with test SMTP server
# - [x] Manual testing with Gmail SMTP
#
# ## Screenshots
# [Attach relevant screenshots]
#
# Closes #123

# 5. Code Review Process
# Reviewers add comments like:
# - "Consider using dependency injection for EmailService"
# - "Add input validation for email addresses"
# - "LGTM, great test coverage!"

# 6. Address Review Comments
git add src/notifications/EmailService.js
git commit -m "refactor(notifications): use dependency injection for EmailService"

git push origin feature/JIRA-123-user-notifications
# PR automatically updates with new commits

# 7. Merge after approval
# - Squash and merge (creates single commit)
# - Regular merge (preserves branch history)
# - Rebase and merge (linear history)
```

Magyarázat: Pull Request biztosítja a code quality-t, knowledge sharing-et és collaborative development-et.

### Tagging {#tagging}
Specifikus commit-ok megjelölése verzió számaokkal vagy mérföldkövekkel. Immutable referencia pontok.

**Példa:**
```bash
# Lightweight tag létrehozás
git tag v1.0.0
git tag v1.0.1 a1b2c3d  # specific commit

# Annotated tag (recommended for releases)
git tag -a v1.1.0 -m "Version 1.1.0 - Add user authentication"
git tag -a v1.1.0 -m "Version 1.1.0

Features:
- User registration and login
- Email verification
- Password reset functionality

Bug fixes:
- Fix memory leak in session management
- Resolve CORS issue in API calls"

# Tag-ek listázása
git tag
# v1.0.0
# v1.0.1  
# v1.1.0

git tag -l "v1.*"  # pattern matching
# v1.0.0
# v1.0.1
# v1.1.0

# Tag információk megtekintése
git show v1.1.0
# tag v1.1.0
# Tagger: Developer <dev@example.com>
# Date:   Wed Sep 27 14:30:45 2023 +0200
#
# Version 1.1.0 - Add user authentication
# ...

# Tag push-olás
git push origin v1.1.0
git push origin --tags  # összes tag

# Tag törlés
git tag -d v1.0.1        # local
git push origin --delete tag v1.0.1  # remote

# Checkout to tag (detached HEAD)
git checkout v1.1.0
```

Magyarázat: Tag-ek segítik a verzió kezelést és a release pontok megjelölését.

### Release flow {#release-flow}
Strukturált megközelítés a szoftver kiadásához, amely magában foglalja a development, testing és production release-t.

**Példa GitFlow release:**
```bash
# 1. Release branch létrehozás develop-ból
git checkout develop
git pull origin develop
git checkout -b release/v2.0.0

# 2. Version bumping és release készítés
echo '{"version": "2.0.0"}' > package.json
git add package.json
git commit -m "bump: version to 2.0.0"

# Last minute bug fixes in release branch
git add src/bugfix.js
git commit -m "fix: resolve critical login issue before release"

# 3. Release testing
npm run test:integration
npm run test:e2e
npm run security:scan

# 4. Merge release branch to main
git checkout main
git pull origin main
git merge --no-ff release/v2.0.0
git push origin main

# 5. Tag the release
git tag -a v2.0.0 -m "Release version 2.0.0

Features:
- Advanced user profile management
- Real-time notifications
- Enhanced security features

Bug Fixes:
- Fixed login session timeout
- Resolved mobile UI issues
- Fixed data export functionality

Breaking Changes:
- API endpoint /users changed to /api/v2/users
- Authentication token format updated"

git push origin v2.0.0

# 6. Merge back to develop
git checkout develop
git merge --no-ff release/v2.0.0
git push origin develop

# 7. Delete release branch
git branch -d release/v2.0.0
git push origin --delete release/v2.0.0
```

**Trunk-based release:**
```bash
# 1. Feature development direct to main
git checkout main
git pull origin main
git checkout -b feature/quick-feature

# Small, quick changes
git add src/feature.js
git commit -m "feat: add quick feature implementation"
git push origin feature/quick-feature

# 2. Quick PR and merge
# Create PR -> Review -> Merge to main

# 3. Release from main with tags
git checkout main
git pull origin main
git tag -a v2.0.1 -m "Release v2.0.1: Quick feature addition"
git push origin v2.0.1

# 4. Deploy from tag
# CI/CD pipeline triggers deployment on tag creation
```

Magyarázat: Release flow biztosítja a controlled deployment-et és a verzió history nyomon követését.

### GitFlow / Trunk-based {#gitflow-trunk-based}
Két főbb branching stratégia. GitFlow komplex projektekhez, trunk-based gyors fejlesztéshez.

**GitFlow modell:**
```bash
# Branch structure:
# main (production ready)
# develop (integration branch)  
# feature/* (new features)
# release/* (release preparation)
# hotfix/* (critical production fixes)

# Feature development
git checkout develop
git checkout -b feature/user-dashboard

# Development work...
git add .
git commit -m "feat: implement user dashboard layout"
git push origin feature/user-dashboard

# Feature completion - merge to develop
git checkout develop
git merge --no-ff feature/user-dashboard
git push origin develop
git branch -d feature/user-dashboard

# Hotfix workflow
git checkout main
git checkout -b hotfix/security-vulnerability

# Critical fix
git add src/security/auth.js  
git commit -m "fix: resolve SQL injection vulnerability"

# Merge to main and develop
git checkout main
git merge --no-ff hotfix/security-vulnerability
git tag -a v1.0.1 -m "Hotfix v1.0.1: Security vulnerability fix"
git push origin main v1.0.1

git checkout develop
git merge --no-ff hotfix/security-vulnerability
git push origin develop

git branch -d hotfix/security-vulnerability
```

**Trunk-based modell:**
```bash
# Single main branch approach
# Short-lived feature branches (max 1-2 days)
# Frequent integration to main

# Feature development
git checkout main
git pull origin main
git checkout -b feature/small-improvement

# Quick development (< 2 days)
git add src/improvement.js
git commit -m "feat: add small user experience improvement"
git push origin feature/small-improvement

# Quick PR merge
# PR created -> Review -> Merge -> Delete branch

# Feature flags for incomplete features
const featureFlag = {
  newDashboard: process.env.FEATURE_NEW_DASHBOARD === 'true'
};

if (featureFlag.newDashboard) {
  // New dashboard code
} else {
  // Old dashboard code  
}

# Release directly from main
git checkout main
git pull origin main
git tag -a v1.2.3 -m "Release v1.2.3"
git push origin v1.2.3
```

Magyarázat: GitFlow structured projektekhez, trunk-based continuous deployment-hez alkalmas.

## Kódrészletek és workflow-k

### Alapvető Git workflow
```bash
# Daily development cycle
git status                          # munkaterület állapot
git pull origin main               # frissítések lehúzása

# Változások staging-elése
git add src/components/Header.js   # specifikus fájl
git add src/components/           # könyvtár
git add .                        # minden változás
git add -A                       # minden változás + törlések

# Commit létrehozás
git commit -m "feat: add responsive header component"
git commit -am "fix: resolve mobile menu toggle issue"  # add + commit

# Push remote repository-ba
git push origin feature/responsive-header
git push origin main

# Történet megtekintése
git log --oneline -10
git log --graph --oneline --all
git log --since="1 week ago" --author="John"
```

### Advanced Git parancsok
```bash
# Stash - ideiglenes mentés
git stash                        # aktuális változások mentése
git stash push -m "WIP: user profile work"
git stash list                   # stash-ek listázása
git stash apply stash@{1}        # konkrét stash visszaállítás
git stash pop                    # legutolsó stash + törlés
git stash drop stash@{0}         # stash törlés
git stash clear                  # összes stash törlés

# Reset és Revert
git reset HEAD~1                 # soft reset - változások megmaradnak
git reset --mixed HEAD~1         # staging area tisztítás
git reset --hard HEAD~1          # mindent visszavon (VESZÉLYES!)
git revert HEAD                  # új commit-tal visszavon
git revert a1b2c3d..e4f5g6h     # commit range visszavonás

# Cherry-pick - commit átvitel
git cherry-pick a1b2c3d          # konkrét commit átvitele
git cherry-pick feature-branch   # branch utolsó commit-ja

# Reflog - "Git safety net"  
git reflog                       # helyi referencia history
git reset --hard HEAD@{2}       # reflog alapján visszaállítás

# Bisect - hiba keresés
git bisect start
git bisect bad HEAD              # jelenlegi verzió hibás
git bisect good v1.0.0           # v1.0.0 még jó volt
# Git automatically checks out middle commit
# Test and mark good/bad until bug is found
git bisect reset                 # bisect befejezés
```

### Branching strategies
```bash
# Feature branch workflow
git checkout main
git pull origin main
git checkout -b feature/PROJ-123-user-settings

# Work on feature...
git add src/settings/
git commit -m "feat: add user settings page"
git commit -m "feat: add settings validation"  
git commit -m "test: add settings component tests"

# Sync with main before PR
git checkout main
git pull origin main
git checkout feature/PROJ-123-user-settings
git merge main                   # or git rebase main

git push origin feature/PROJ-123-user-settings

# After PR approval and merge
git checkout main
git pull origin main
git branch -d feature/PROJ-123-user-settings
```

### Conflict resolution
```bash
# Merge conflict situation
git merge feature/conflicting-branch
# Auto-merging src/config.js
# CONFLICT (content): Merge conflict in src/config.js
# Automatic merge failed; fix conflicts and then commit the result.

# Check conflict status
git status
# On branch main
# You have unmerged paths.
#   (fix conflicts and run "git commit")
#   (use "git merge --abort" to abort the merge)
#
# Unmerged paths:
#   (use "git add <file>..." to mark resolution)
#         both modified:   src/config.js

# Conflict markers in file:
# <<<<<<< HEAD
# const API_URL = 'https://api.production.com';
# const DEBUG_MODE = false;
# =======
# const API_URL = 'https://api.staging.com';  
# const DEBUG_MODE = true;
# >>>>>>> feature/conflicting-branch

# After manual resolution:
git add src/config.js
git commit -m "resolve: merge conflict in API configuration"

# Alternative: merge tool
git mergetool
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd 'code --wait $MERGED'
```

### Git hooks implementation
```bash
# Pre-commit hook (.git/hooks/pre-commit)
#!/bin/sh
echo "Running pre-commit checks..."

# Run linting
npm run lint
if [ $? -ne 0 ]; then
  echo "❌ Linting failed. Please fix errors before committing."
  exit 1
fi

# Run tests  
npm run test:unit
if [ $? -ne 0 ]; then
  echo "❌ Unit tests failed. Please fix failing tests."
  exit 1
fi

# Check commit message format
commit_msg_file=$1
commit_msg=$(cat $commit_msg_file)
commit_regex='^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .{1,72}'

if ! echo "$commit_msg" | grep -qE "$commit_regex"; then
  echo "❌ Invalid commit message format!"
  echo "Format: type(scope): description"
  echo "Example: feat(auth): add OAuth2 integration"
  exit 1
fi

echo "✅ Pre-commit checks passed!"

# Commit-msg hook (.git/hooks/commit-msg) 
#!/bin/sh
commit_regex='^(feat|fix|docs|style|refactor|perf|test|chore)(\(.+\))?: .{1,50}'

if ! head -n1 $1 | grep -qE "$commit_regex"; then
    echo "❌ Invalid commit message format!"
    echo ""  
    echo "Allowed types: feat, fix, docs, style, refactor, perf, test, chore"
    echo "Format: type(scope): description"
    echo ""
    echo "Examples:"
    echo "feat(auth): add OAuth2 integration"
    echo "fix(ui): resolve mobile menu alignment issue"
    echo "docs(api): update authentication endpoints"
    exit 1
fi
```

## Gyakori hibák

### Force Push használata
Soha ne használj force push shared branch-eknél, mert felülírja mások munkáját.

**Hibás példa:**
```bash
# HIBÁS - force push shared branch-en
git checkout main
git reset --hard HEAD~3    # 3 commit törlése
git push --force origin main    # ❌ VESZÉLYES!
# Mások munkája elvész!

# HIBÁS - force push PR branch többszörös collaboration esetén  
git checkout feature/shared-feature
git rebase -i HEAD~5       # history átírás
git push --force origin feature/shared-feature    # ❌ Társak munkája elvész
```

**Helyes megoldás:**
```bash
# HELYES - revert használata shared branch-en
git revert HEAD~2..HEAD    # utolsó 2 commit visszavonása új commit-tal
git push origin main       # ✅ Biztonságos

# HELYES - force-with-lease használata (safer force push)
git push --force-with-lease origin feature/my-feature
# Only force pushes if no one else has pushed to the branch

# HELYES - új branch létrehozás problémás helyett
git checkout -b feature/fixed-implementation
git push origin feature/fixed-implementation
# Create new PR, abandon old problematic branch
```

### Branch Divergence
Amikor helyi és távoli branch-ek különböző irányba fejlődnek.

**Hibás kezelés:**
```bash
# HIBÁS - pull merge minden alkalommal
git pull origin feature/my-branch    # Creates unnecessary merge commits
# * a1b2c3d (HEAD -> feature/my-branch) Merge remote-tracking branch
# * e4f5g6h My local commit
# |\
# | * i7j8k9l Remote commit from colleague
# |/
# * l0m1n2o Previous common commit
# Ugly merge history!
```

**Helyes megoldás:**
```bash
# HELYES - rebase pull használata
git pull --rebase origin feature/my-branch
# * e4f5g6h (HEAD -> feature/my-branch) My local commit  
# * i7j8k9l Remote commit from colleague
# * l0m1n2o Previous common commit
# Clean linear history

# HELYES - explicit rebase workflow
git fetch origin
git rebase origin/feature/my-branch
# Resolve conflicts if any
git push origin feature/my-branch

# Configure automatic rebase pull
git config pull.rebase true
git config --global pull.rebase true
```

### Merge Conflict helytelen kezelése
Conflict resolution során figyelmetlenség vagy rossz eszközök használata.

**Hibás conflict resolution:**
```bash
# HIBÁS - conflict markerek hagyása a kódban
git merge feature/conflicting
# After editing file:
const config = {
<<<<<<< HEAD
  apiUrl: 'https://prod.api.com',
  timeout: 5000
=======  
  apiUrl: 'https://dev.api.com',
  timeout: 10000
>>>>>>> feature/conflicting
};

git add src/config.js           # ❌ Conflict markerek maradtak!
git commit -m "resolve conflict"  # Broken code committed
```

**Helyes conflict resolution:**
```bash
# HELYES - gondos conflict resolution
git merge feature/conflicting
# Auto-merging src/config.js  
# CONFLICT (content): Merge conflict in src/config.js

# Proper conflict resolution:
const config = {
  apiUrl: process.env.NODE_ENV === 'production' 
    ? 'https://prod.api.com' 
    : 'https://dev.api.com',
  timeout: process.env.NODE_ENV === 'production' ? 5000 : 10000
};

# Test the resolution
npm run test
npm run build

git add src/config.js
git commit -m "resolve: merge conflict in config with environment-based values"

# Use merge tools for complex conflicts
git mergetool
git config --global merge.tool vscode
```

### Érzékeny adatok véletlenül commit-olása
API kulcsok, jelszavak vagy personal information véletlenül a repository-ba kerül.

**Hibás helyzet:**
```bash
# HIBÁS - sensitive data committed
echo "API_KEY=sk-1234567890abcdef" > .env
echo "DATABASE_PASSWORD=supersecret123" >> .env
git add .
git commit -m "feat: add environment configuration"    # ❌ Secrets committed!
git push origin main    # ❌ Secrets now in remote repo!
```

**Javítás és megelőzés:**
```bash
# IMMEDIATE ACTION - remove from history
git rm .env
git commit -m "remove: accidentally committed secrets"

# Remove from entire history (if not yet public)
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch .env' \
  --prune-empty --tag-name-filter cat -- --all

# Force push to update remote (only if safe!)
git push --force-with-lease origin main

# PREVENTION - proper .gitignore
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore  
echo "config/secrets.json" >> .gitignore
echo "*.key" >> .gitignore
echo "*.pem" >> .gitignore

git add .gitignore
git commit -m "add: gitignore for sensitive files"

# Use environment variables
# .env.example (safe to commit)
API_KEY=your_api_key_here
DATABASE_PASSWORD=your_password_here

## Interjúkérdések

- **Mi a különbség a merge és rebase között?** — *Merge megőrzi a branch history-t és merge commit-ot hoz létre, rebase lineáris történetet hoz létre a commit-ok újrajátszásával.*

- **Mire való a cherry-pick?** — *Specifikus commit átvitelére egyik branch-ből egy másikba, anélkül hogy az egész branch-et merge-ölnénk.*

- **Mi a különbség a git reset és git revert között?** — *Reset átírja a history-t (veszélyes), revert új commit-tal vonja vissza a változásokat (biztonságos).*

- **Hogyan oldanál meg egy merge conflict-ot?** — *Conflict markerek alapján manuálisan szerkesztem a fájlt, git add után commit-olom, vagy merge tool-t használok.*

- **Mi a git stash és mikor használnád?** — *Ideiglenes munka mentése amikor branch-et kell váltani, de még nem akarok commit-olni.*

- **Hogyan működik a GitFlow model?** — *Main, develop, feature, release, hotfix branch-ek strukturált használata. Komplex projektekhez alkalmas.*

- **Mi a force push és miért veszélyes?** — *Felülírja a remote history-t, másoknak elveszhetnek a commit-jaik. Shared branch-eknél kerülendő.*

- **Hogyan synchronized egy fork-ot az upstream repository-val?** — *Upstream remote hozzáadása, fetch upstream, merge upstream/main.*

- **Mi a conventional commits?** — *Standardizált commit message formátum: type(scope): description. Segíti az automatizált tooling-ot.*

- **Mire való a git bisect?** — *Binary search alapú hibakeresés a commit history-ban, gyorsan megtalálja a problémát okozó commit-ot.*

- **Mi a különbség lightweight és annotated tag között?** — *Lightweight: egyszerű pointer. Annotated: teljes objektum metadata-val, aláírással.*

- **Hogyan távolítanál el sensitive data-t a Git history-ból?** — *Git filter-branch vagy BFG repo cleaner használatával, majd force push.*

## Gyakorlati feladat

Implementálj egy komplett Git workflow-t egy csapat projekthez:

**Követelmények:**
1. **Repository setup**: GitFlow modell implementálása
2. **Branch strategy**: feature, develop, main, release, hotfix branch-ek
3. **Commit conventions**: Conventional Commits standard követése
4. **PR process**: Template, review checklist, merge stratégia
5. **Git hooks**: Pre-commit linting és testing
6. **Release management**: Semantic versioning, changelog generálás
7. **CI/CD integráció**: GitHub Actions workflow automatizálás

**Feladatok:**
- Hozz létre repository-t GitFlow struktúrával
- Állíts be branch protection rule-okat
- Implementálj pre-commit hook-ot ESLint + Prettier-rel
- Írj GitHub Actions workflow-t testing és deployment-hez
- Készíts release process dokumentációt
- Demonstráld a hotfix workflow-t

*Kapcsolódó gyakorlati feladat: [Git workflow gyakorlat](/exercises/git/01-git-workflow)*

## Kapcsolódó témák

- [DevOps](/theory/devops) – CI/CD, deployment automatizálás
- [Tesztelés](/theory/testing) – Git hooks, automated testing
- [Szoftver Architektúra](/theory/arch) – Code review, collaboration patterns
- [Frontend](/theory/frontend) – Modern build tools, version management
- [Soft Skills](/theory/softskills) – Team collaboration, code review culture

## További olvasmányok

- [Pro Git Book](https://git-scm.com/book) – Comprehensive Git documentation
- [Atlassian Git Tutorials](https://www.atlassian.com/git) – Interactive Git learning
- [GitHub Flow Guide](https://docs.github.com/en/get-started/quickstart/github-flow) – GitHub workflow best practices
- [Conventional Commits](https://www.conventionalcommits.org/) – Commit message standard
- [Git Flow vs GitHub Flow](https://lucamezzalira.com/2014/03/10/git-flow-vs-github-flow/) – Branching strategy comparison
- [Oh Shit, Git!?!](https://ohshitgit.com/) – Common Git problems and solutions

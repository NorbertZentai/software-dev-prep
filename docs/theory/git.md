# Git Verziókezelés

## Bevezetés

A Git egy elosztott verziókezelő rendszer, amelyet Linus Torvalds fejlesztett ki a Linux kernel kezelésére. Ma már a szoftverfejlesztés egyik alapvető eszköze.

## Git alapok

### Repository inicializálása

```bash
# Új git repository létrehozása
git init

# Meglévő repository klónozása
git clone https://github.com/user/repo.git

# Repository állapotának ellenőrzése
git status

# Változások megtekintése
git diff
git diff --staged
```

### Alapvető git workflow

```bash
# 1. Fájlok hozzáadása a staging area-hoz
git add file.txt
git add .              # Minden változás hozzáadása
git add *.java         # Csak .java fájlok

# 2. Commit létrehozása
git commit -m "Add user authentication feature"
git commit -am "Quick commit with add and message"

# 3. Változások feltöltése
git push origin main
git push origin feature-branch
```

### Branch-ek kezelése

```bash
# Branch-ek listázása
git branch
git branch -r          # Remote branch-ek
git branch -a          # Összes branch

# Új branch létrehozása
git branch feature/user-auth
git checkout -b feature/user-auth    # Létrehozás és váltás egyben
git switch -c feature/user-auth      # Modern Git verzió

# Branch váltás
git checkout main
git switch main        # Modern parancs

# Branch törlése
git branch -d feature/user-auth      # Safe delete
git branch -D feature/user-auth      # Force delete
```

### Merge és Rebase

```bash
# Merge - branch-ek egyesítése
git checkout main
git merge feature/user-auth

# Fast-forward merge elkerülése
git merge --no-ff feature/user-auth

# Rebase - commit history átírása
git checkout feature/user-auth
git rebase main

# Interaktív rebase
git rebase -i HEAD~3   # Utolsó 3 commit módosítása
```

## Haladó Git parancsok

### Git Log és History

```bash
# Commit history megtekintése
git log
git log --oneline
git log --graph --oneline --all
git log -p             # Patch formátumban
git log --since="2 weeks ago"
git log --author="John Doe"

# Fájl történetének követése
git log -p filename.txt
git blame filename.txt

# Commit keresése
git log --grep="fix bug"
git log -S "function name"    # Kód keresése
```

### Stash - Ideiglenes mentés

```bash
# Változások ideiglenes mentése
git stash
git stash push -m "Work in progress on feature X"

# Stash-ek listázása
git stash list

# Stash visszaállítása
git stash pop          # Legutolsó stash visszaállítása és törlése
git stash apply        # Visszaállítás törlés nélkül
git stash apply stash@{1}

# Stash törlése
git stash drop stash@{0}
git stash clear        # Összes stash törlése
```

### Reset és Revert

```bash
# Reset - commit history módosítása
git reset HEAD~1       # Soft reset - változások megmaradnak
git reset --hard HEAD~1    # Hard reset - változások elvesznek
git reset --mixed HEAD~1   # Mixed reset (default)

# Revert - új commit-tal visszavonás
git revert HEAD
git revert abc123def   # Adott commit visszavonása
```

### Tag-ek kezelése

```bash
# Tag létrehozása
git tag v1.0.0
git tag -a v1.0.0 -m "Version 1.0.0 release"

# Tag-ek listázása
git tag
git tag -l "v1.*"

# Tag feltöltése
git push origin v1.0.0
git push origin --tags
```

## Remote Repository kezelés

### Remote-ok kezelése

```bash
# Remote-ok listázása
git remote -v

# Remote hozzáadása
git remote add upstream https://github.com/original/repo.git

# Remote frissítése
git fetch origin
git fetch --all

# Remote branch-ek szinkronizálása
git pull origin main
git pull --rebase origin main
```

### Fork workflow

```bash
# 1. Fork létrehozása GitHub-on
# 2. Fork klónozása
git clone https://github.com/yourusername/repo.git

# 3. Upstream remote hozzáadása
git remote add upstream https://github.com/original/repo.git

# 4. Frissítés az eredeti repository-ból
git fetch upstream
git checkout main
git merge upstream/main

# 5. Feature branch létrehozása
git checkout -b feature/awesome-feature

# 6. Változások push-olása
git push origin feature/awesome-feature

# 7. Pull Request létrehozása GitHub-on
```

## Git Flow

### Feature Development Workflow

```bash
# 1. Main branch frissítése
git checkout main
git pull origin main

# 2. Feature branch létrehozása
git checkout -b feature/JIRA-123-user-registration

# 3. Fejlesztés és commit-ok
git add .
git commit -m "feat: add user registration form"
git commit -m "feat: add email validation"
git commit -m "test: add unit tests for registration"

# 4. Push és Pull Request
git push origin feature/JIRA-123-user-registration
```

### Hotfix Workflow

```bash
# 1. Hotfix branch létrehozása production-ból
git checkout production
git checkout -b hotfix/critical-security-fix

# 2. Gyors javítás
git add .
git commit -m "fix: resolve SQL injection vulnerability"

# 3. Merge production-ba és main-be
git checkout production
git merge hotfix/critical-security-fix
git push origin production

git checkout main
git merge hotfix/critical-security-fix
git push origin main

# 4. Tag létrehozása
git tag v1.0.1
git push origin v1.0.1
```

## Conflict Resolution

### Merge conflict feloldása

```bash
# Conflict esetén
git status    # Konfliktusban lévő fájlok listázása

# Fájl szerkesztése - conflict markerek:
# <<<<<<< HEAD
# Saját változtatásaid
# =======
# Bejövő változtatások
# >>>>>>> branch-name

# Conflict feloldása után
git add resolved-file.txt
git commit -m "resolve merge conflict in user authentication"
```

### Merge tools használata

```bash
# Merge tool konfigurálása
git config --global merge.tool vimdiff
git config --global merge.tool vscode

# Merge tool indítása conflict esetén
git mergetool
```

## Git Best Practices

### Commit Messages

```bash
# Jó commit message struktúra:
# <type>(<scope>): <subject>
#
# <body>
#
# <footer>

# Példák:
git commit -m "feat(auth): add OAuth2 integration with Google"
git commit -m "fix(api): resolve null pointer exception in user service"
git commit -m "docs(readme): update installation instructions"
git commit -m "test(unit): add tests for user validation functions"
git commit -m "refactor(database): optimize user query performance"

# Conventional Commits típusok:
# feat: új feature
# fix: bug javítás
# docs: dokumentáció
# style: formázás, white-space, stb.
# refactor: kód átszervezés
# test: tesztek hozzáadása
# chore: build, dependency updates
```

### Branch naming conventions

```bash
# Feature branches
git checkout -b feature/user-authentication
git checkout -b feature/JIRA-123-payment-integration

# Bug fix branches
git checkout -b bugfix/login-error-handling
git checkout -b hotfix/critical-security-patch

# Release branches
git checkout -b release/v1.2.0

# Experimental branches
git checkout -b experiment/new-ui-framework
```

### .gitignore fájl

```bash
# Java projekt .gitignore
*.class
*.jar
*.war
*.ear
target/
.mvn/
.idea/
*.iml
.vscode/
.DS_Store

# Node.js projekt
node_modules/
npm-debug.log
.env
dist/
build/

# Python projekt
__pycache__/
*.py[cod]
*.egg-info/
venv/
.env
```

## Git Hooks

### Pre-commit hook

```bash
#!/bin/sh
# .git/hooks/pre-commit

# Futtat lint check-et commit előtt
npm run lint
if [ $? -ne 0 ]; then
  echo "Lint check failed. Aborting commit."
  exit 1
fi

# Futtat unit test-eket
npm test
if [ $? -ne 0 ]; then
  echo "Tests failed. Aborting commit."
  exit 1
fi

echo "Pre-commit checks passed."
```

### Commit-msg hook

```bash
#!/bin/sh
# .git/hooks/commit-msg

# Ellenőrzi a commit message formátumot
commit_regex='^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .{1,50}'

if ! grep -qE "$commit_regex" "$1"; then
    echo "Invalid commit message format!"
    echo "Format: type(scope): description"
    echo "Example: feat(auth): add OAuth2 integration"
    exit 1
fi
```

## GitHub/GitLab integráció

### Pull Request template

```markdown
<!-- .github/pull_request_template.md -->
## Description
Brief description of changes

## Type of change
- [ ] Bug fix
- [ ] New feature  
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No merge conflicts
```

### GitHub Actions workflow

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Java
      uses: actions/setup-java@v2
      with:
        java-version: '11'
        distribution: 'adopt'
        
    - name: Run tests
      run: ./mvnw test
      
    - name: Generate test report
      run: ./mvnw jacoco:report
      
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v1
```

## Git aliasok

```bash
# Hasznos aliasok beállítása
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'

# Fejlett aliasok
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
git config --global alias.contributors 'shortlog --summary --numbered'
```

## Troubleshooting

### Gyakori problémák és megoldások

```bash
# "Detached HEAD" állapot
git checkout main    # Visszatérés main branch-re

# Véletlenül rossz branch-be commit-oltál
git checkout correct-branch
git cherry-pick abc123def    # Commit áthelyezése

# Nagy fájl eltávolítása a history-ból
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch large-file.zip' --prune-empty --tag-name-filter cat -- --all

# Érzékeny adatok eltávolítása
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch secrets.txt' --prune-empty --tag-name-filter cat -- --all

# Repository tisztítása
git gc --aggressive --prune=now
```

### Git configuration

```bash
# User beállítások
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Editor beállítása
git config --global core.editor "code --wait"
git config --global core.editor "vim"

# Line ending kezelés
git config --global core.autocrlf true    # Windows
git config --global core.autocrlf input   # macOS/Linux

# Push behavior
git config --global push.default simple
git config --global push.followTags true
```

## Együttműködési stratégiák

### Centralized Workflow
- Egyetlen központi repository
- Mindenki a main branch-be push-ol
- Egyszerű, kis csapatokhoz

### Feature Branch Workflow
- Feature-ök külön branch-ekben
- Pull Request review
- Merge main-be

### Gitflow Workflow
- Strukturált branch modell
- main, develop, feature, release, hotfix branch-ek
- Nagy, komplex projektekhez

### Forking Workflow
- Mindenki saját fork-ot készít
- Pull Request-ek a main repository-ba
- Nyílt forráskódú projektekhez

## Következő lépések

1. Gyakorold a basic git parancsokat
2. Tanulj meg branch-eket kezelni
3. Próbáld ki a különböző merge stratégiákat
4. Állíts be git hook-okat
5. Integráld a git-et a fejlesztői workflow-dba
6. Tanulj meg GitHub/GitLab feature-öket használni
---
render_with_liquid: false
---

# Git & Version Control

## Brief Summary

Git is a distributed version control system that fundamentally changed how developers collaborate and manage code. Unlike centralized systems, every Git repository contains the complete history, enabling offline work and robust branching strategies. Git's powerful features include atomic commits, efficient merging, distributed workflows, and comprehensive history tracking. Modern software development relies heavily on Git workflows like GitFlow, feature branches, and continuous integration patterns.

<!-- Reading Progress Bar -->
<div id="read-progress"></div>

<!-- Tag Filter -->
<div class="tag-filter-container">
  <h3>🏷️ Filter by topics</h3>
  <div class="tag-filter-chips">
    <button class="filter-chip active" data-filter="all">All</button>
    <button class="filter-chip" data-filter="junior">Junior</button>
    <button class="filter-chip" data-filter="medior">Medior</button>
    <button class="filter-chip" data-filter="senior">Senior</button>
    <button class="filter-chip" data-filter="workflow">Workflow</button>
    <button class="filter-chip" data-filter="branching">Branching</button>
    <button class="filter-chip" data-filter="collaboration">Collaboration</button>
    <button class="filter-chip" data-filter="advanced">Advanced</button>
  </div>
</div>

## Concepts

### Repository {#repo-repository}

<div class="concept-section definition">

📋 **Concept Definition**  
**Distributed Version Control System (DVCS)** storing complete project history locally. **Structure**: Working Directory (current files), Staging Area/Index (prepared changes), Local Repository (.git directory with commits), Remote Repository (GitHub, GitLab, Bitbucket). **Core objects**: Blob (file content), Tree (directory structure), Commit (snapshot with metadata), Tag (named reference). **Distributed nature**: every clone contains full history, enabling offline work, fast operations, redundancy. Git uses SHA-1 hashes for integrity, content-addressable storage.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Complete history**: every change is tracked with metadata
- **Distributed nature**: each clone is a full backup
- **Branching capabilities**: enables parallel development
- **Collaboration foundation**: enables team coordination and code sharing

</div>

<div class="runnable-model">

**Runnable mental model**
```bash
# Initialize new repository
git init my-project
cd my-project

# Repository structure created
.git/
├── HEAD                    # Points to current branch
├── config                  # Repository configuration
├── description            # Repository description
├── hooks/                 # Git hooks (scripts)
├── info/                  # Additional repo info
├── objects/               # Git objects (commits, trees, blobs)
├── refs/                  # References (branches, tags)
│   ├── heads/            # Local branches
│   ├── remotes/          # Remote tracking branches
│   └── tags/             # Tags
└── logs/                  # Reference logs

# Check repository status
git status
# On branch main
# No commits yet
# nothing to commit (create/copy files and use "git add" to track)

# Repository information
git config --list --local  # Local repository settings
git remote -v              # Remote repositories
git branch -a              # All branches (local and remote)

# Clone existing repository
git clone https://github.com/user/repo.git
git clone git@github.com:user/repo.git          # SSH
git clone https://github.com/user/repo.git local-name  # Custom name

# Bare repository (no working directory)
git clone --bare https://github.com/user/repo.git
# Used for servers, backup, and CI/CD systems
```
*Notice: `.git` directory contains the entire repository history and metadata. Working directory is just a checkout of one commit.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Common myths / misconceptions</strong></summary>

<div>

- "Git only works with code" → Git can version any text-based files
- "Deleting .git folder just removes Git" → It removes ALL history permanently
- "Git repositories must be on GitHub" → Git works with any hosting or locally

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Where you fail in interviews</strong></summary>

<div>

- Can't explain the difference between Git and GitHub
- Don't understand what makes Git "distributed"
- Can't describe repository structure and Git objects

</div>
</details>

</div>

<div class="tags">
<span class="tag">git</span>
<span class="tag">repository</span>
<span class="tag">junior</span>
<span class="tag">fundamentals</span>
</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Working Directory` · `Commits` · `Git Diff` · `Atomic Commits` · `File Operations`

</div>

### .gitignore {#gitignore}

<div class="concept-section definition">

📋 **Concept Definition**  
**Pattern-based file exclusion system** specifying which files Git should ignore. **Syntax**: wildcards (* for multiple chars, ? for single), directory patterns (trailing /), negation (! to whitelist), comments (#). **Common patterns**: build outputs (target/, dist/, *.class), dependencies (node_modules/, vendor/), IDE files (.idea/, *.iml, .vscode/), OS files (.DS_Store, Thumbs.db), secrets (.env, *.key). **Scope**: project root .gitignore (committed), global ~/.gitignore_global (user-wide), .git/info/exclude (local only). Templates: github.com/github/gitignore.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Security**: prevents API keys, passwords from being committed
- **Performance**: excludes large build files and dependencies
- **Clean repository**: only relevant files are tracked
- **Team consistency**: everyone ignores the same files

</div>

<div class="runnable-model">

**Runnable mental model**
```bash
# Create .gitignore in project root
touch .gitignore

# Basic Node.js .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production builds
dist/
build/
*.tgz

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock
EOF

# Java .gitignore patterns
cat >> .gitignore << 'EOF'
# Compiled class files
*.class

# Log files
*.log

# Package files
*.jar
*.war
*.nar
*.ear
*.zip
*.tar.gz
*.rar

# Maven
target/
pom.xml.tag
pom.xml.releaseBackup
pom.xml.versionsBackup
pom.xml.next
release.properties
dependency-reduced-pom.xml
buildNumber.properties
.mvn/timing.properties

# Gradle
.gradle
build/
gradle-app.setting
!gradle-wrapper.jar
!gradle-wrapper.properties

# IntelliJ IDEA
.idea/
*.iws
*.iml
*.ipr
out/

# Eclipse
.project
.classpath
.settings/
bin/
EOF

# Check what's ignored
git status --ignored              # Show ignored files
git check-ignore -v file.txt      # Check if specific file is ignored
git ls-files --ignored --exclude-standard  # List all ignored files

# Global .gitignore for all repositories
git config --global core.excludesfile ~/.gitignore_global

# Create global gitignore
cat > ~/.gitignore_global << 'EOF'
# IDE files
.vscode/
.idea/

# OS files
.DS_Store
Thumbs.db

# Temporary files
*.tmp
*.temp
*.swp
*.swo
*~
EOF

# Already committed files - remove from tracking
git rm --cached file.txt          # Remove from Git but keep in filesystem
git rm -r --cached node_modules/  # Remove directory from tracking

# Force add ignored file (rare use case)
git add -f important-ignored-file.txt

# Test .gitignore patterns
echo "node_modules/" | git check-ignore --stdin
echo "src/main.js" | git check-ignore --stdin
```
*Notice: .gitignore only affects untracked files. Use `git rm --cached` to untrack already committed files.*

</div>

<div class="concept-section best-practices">

<details>
<summary>✅ <strong>.gitignore best practices</strong></summary>

<div>

- **Language-specific**: use templates for your tech stack
- **Global patterns**: OS and IDE files in global gitignore
- **Security first**: never commit secrets, even temporarily
- **Comments**: document why certain patterns are ignored

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Repository Security` · `File Management` · `Team Collaboration` · `Build Artifacts`

</div>

### Commit {#commit}

<div class="concept-section definition">

📋 **Concept Definition**  
**Immutable snapshot of repository state** with metadata. **Components**: Tree object (file/directory structure), parent commit(s) (history chain), author info (name, email, timestamp), committer info (can differ from author), commit message (subject + body). **Best practices**: Conventional Commits (feat:, fix:, docs:), atomic commits (single logical change), imperative mood ("Add feature" not "Added"), explain why not what. **Amending**: git commit --amend modifies last commit (avoid on pushed commits). SHA-1 hash uniquely identifies each commit.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **History tracking**: creates permanent record of changes
- **Collaboration**: enables sharing and merging changes
- **Rollback capability**: can return to any previous state
- **Documentation**: commit messages explain development decisions

</div>

<div class="runnable-model">

**Runnable mental model**
```bash
# Basic commit workflow
git add file1.txt file2.txt      # Stage specific files
git commit -m "Add user authentication feature"

# Commit all tracked files (skip staging)
git commit -am "Fix login validation bug"

# Interactive commit with editor
git commit
# Opens editor for detailed commit message:
# Add user authentication feature
# 
# - Implement login/logout functionality
# - Add password hashing with bcrypt
# - Create user session management
# - Add login form validation
#
# Resolves: #123
# Related: #124, #125

# Amend last commit (change message or add files)
git add forgotten-file.txt
git commit --amend -m "Add user authentication feature with validation"

# Commit with specific author
git commit -m "Fix bug" --author="John Doe <john@example.com>"

# Empty commit (useful for triggering CI/CD)
git commit --allow-empty -m "Trigger deployment"

# Commit message conventions (Conventional Commits)
git commit -m "feat: add user authentication system"
git commit -m "fix: resolve login validation error"
git commit -m "docs: update API documentation"
git commit -m "style: format code with prettier"
git commit -m "refactor: extract authentication logic"
git commit -m "test: add unit tests for user service"
git commit -m "chore: update dependencies"

# Breaking change
git commit -m "feat!: change authentication API

BREAKING CHANGE: authentication endpoint now requires JWT token"

# Multiple line commit message
git commit -m "feat: implement user authentication

- Add login and logout endpoints
- Implement JWT token generation
- Add middleware for protected routes
- Create user registration flow

Closes #123
Co-authored-by: Jane Smith <jane@example.com>"

# View commit history
git log                           # Full commit history
git log --oneline                 # Condensed history
git log --graph --oneline         # Visual branch history
git log -p                        # Show diffs
git log --stat                    # Show file change statistics
git log --since="2 weeks ago"     # Time-based filtering
git log --author="John Doe"       # Author filtering
git log --grep="fix"              # Message filtering

# Show specific commit
git show HEAD                     # Show last commit
git show abc123                   # Show specific commit
git show HEAD~3                   # Show 3 commits ago

# Commit ranges
git log main..feature-branch      # Commits in feature-branch not in main
git log --left-right main...feature-branch  # Show commits from both sides

# Pretty formatting
git log --pretty=format:"%h %an %ar %s"
# abc123 John Doe 2 hours ago Add user authentication

# Custom format
git log --pretty=format:"%C(yellow)%h %C(red)%d %C(reset)%s %C(green)(%cr) %C(blue)<%an>"
```
*Notice: Good commits are atomic (one logical change), well-described, and follow team conventions.*

</div>

<div class="concept-section best-practices">

<details>
<summary>✅ <strong>Commit message best practices</strong></summary>

<div>

- **Imperative mood**: "Add feature" not "Added feature"
- **50/72 rule**: 50 char subject, 72 char body lines
- **Explain why**: not just what changed
- **Reference issues**: include ticket numbers

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Git History` · `Staging Area` · `Branches` · `Collaboration` · `Code Review`

</div>

### Branch {#branch}

<div class="concept-section definition">

📋 **Concept Definition**  
**Lightweight movable pointer to commit** enabling parallel development. **Types**: local branches (git branch), remote-tracking branches (origin/main), tracking branches (local linked to remote). **Common workflows**: Git Flow (main, develop, feature/*, release/*, hotfix/*), GitHub Flow (main + feature branches), Trunk-Based Development (short-lived branches). **Operations**: git branch (create), git checkout/switch (move HEAD), git branch -d (delete). **HEAD**: special pointer to current branch. Branches are cheap (just 41 bytes), making liberal branching practical.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Parallel development**: multiple features developed simultaneously
- **Risk isolation**: experiments don't break main codebase
- **Collaboration**: team members work independently
- **Release management**: maintain stable main branch

</div>

<div class="runnable-model">

**Runnable mental model**
```bash
# Branch operations
git branch                        # List local branches
git branch -r                     # List remote branches
git branch -a                     # List all branches
git branch -v                     # Show last commit on each branch

# Create branch
git branch feature/user-auth      # Create branch (don't switch)
git checkout -b feature/user-auth # Create and switch
git switch -c feature/user-auth   # Newer syntax

# Switch branches
git checkout main                 # Switch to main
git switch main                   # Newer syntax
git checkout -                    # Switch to previous branch

# Branch from specific commit
git checkout -b hotfix/bug-fix abc123
git checkout -b release/v1.2.0 main

# Rename branch
git branch -m old-name new-name   # Rename branch
git branch -m new-name            # Rename current branch

# Delete branch
git branch -d feature/completed   # Safe delete (merged only)
git branch -D feature/experimental # Force delete
git push origin --delete feature/user-auth  # Delete remote branch

# Track remote branch
git checkout -b local-name origin/remote-name
git branch --set-upstream-to=origin/main main

# Branch information
git show-branch                   # Show branch relationships
git branch --merged main          # Show branches merged into main
git branch --no-merged main       # Show unmerged branches

# Working with remote branches
git fetch origin                  # Update remote tracking branches
git checkout -b local-feature origin/feature  # Create local branch from remote
git push -u origin feature-branch # Push and set upstream

# Branch comparison
git diff main..feature-branch     # Compare branches
git log main..feature-branch      # Commits in feature not in main
git cherry -v main feature-branch # Show commits to be merged

# Stash before switching (if uncommitted changes)
git stash                         # Save work temporarily
git checkout other-branch         
git checkout original-branch
git stash pop                     # Restore work

# Branch naming conventions
git checkout -b feature/JIRA-123-user-authentication
git checkout -b bugfix/login-validation-error
git checkout -b hotfix/security-patch
git checkout -b release/v2.1.0
git checkout -b experiment/new-architecture

# Orphan branch (no history)
git checkout --orphan gh-pages    # Useful for GitHub Pages
git rm -rf .                      # Remove all files
echo "Hello GitHub Pages" > index.html
git add index.html
git commit -m "Initial GitHub Pages commit"
```
*Notice: Branches are lightweight in Git - they're just pointers to commits. Creating branches is fast and cheap.*

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Merging` · `Rebasing` · `Git Flow` · `Feature Development` · `Release Management`

</div>

### Merge vs Rebase {#merge-vs-rebase}

<div class="concept-section definition">

📋 **Concept Definition**  
**Two strategies for integrating changes**: **Merge** creates new commit with two parents, preserving complete history (three-way merge, fast-forward merge). **Rebase** replays commits onto new base, rewriting history for linear sequence. **Golden rule**: never rebase public/shared branches (causes divergent histories). **Merge strategies**: recursive (default), ours/theirs, octopus (multiple branches). **Interactive rebase** (git rebase -i): squash commits, reorder, edit messages, split commits. **Use merge**: public branches, preserving context. **Use rebase**: cleaning local history before pushing.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **History clarity**: rebase creates linear history, merge preserves context
- **Collaboration**: merge is safer for shared branches, rebase for local work
- **Conflict resolution**: different strategies for different scenarios
- **Team workflow**: choice affects entire team's Git history

</div>

<div class="runnable-model">

**Runnable mental model**
```bash
# MERGE - Combines branches preserving history
git checkout main
git merge feature/user-auth

# Creates merge commit:
#   * abc123 (HEAD -> main) Merge branch 'feature/user-auth'
#   |\
#   | * def456 (feature/user-auth) Add authentication
#   | * ghi789 Add login form
#   * | jkl012 Update documentation
#   |/
#   * mno345 Initial commit

# Fast-forward merge (when no divergent commits)
git merge feature/simple-fix     # No merge commit created
#   * abc123 (HEAD -> main, feature/simple-fix) Fix typo
#   * def456 Previous commit

# No fast-forward merge (force merge commit)
git merge --no-ff feature/user-auth
# Always creates merge commit even if fast-forward possible

# REBASE - Replays commits on new base
git checkout feature/user-auth
git rebase main

# Result: linear history
#   * abc123 (HEAD -> feature/user-auth) Add authentication
#   * def456 Add login form
#   * ghi789 (main) Update documentation
#   * jkl012 Initial commit

# Interactive rebase (rewrite history)
git rebase -i HEAD~3
# Opens editor:
# pick abc123 Add authentication
# squash def456 Add login form  <- Will combine with previous
# reword ghi789 Add validation  <- Will edit commit message

# Rebase with conflicts
git rebase main
# CONFLICT (content): Merge conflict in file.txt
# Automatic merge failed; fix conflicts and then use "git rebase --continue"

# Resolve conflicts
# Edit conflicted files
git add file.txt
git rebase --continue

# Abort rebase if needed
git rebase --abort

# Golden rule: Never rebase shared branches!
# ❌ DON'T DO THIS if others have the branch:
git checkout main
git rebase feature/shared-branch

# ✅ DO THIS instead:
git checkout main
git merge feature/shared-branch

# Workflow comparison:

# MERGE WORKFLOW (preserves context)
git checkout main
git pull origin main
git checkout feature/user-auth
git merge main                    # Update feature branch
git checkout main
git merge feature/user-auth       # Merge feature

# REBASE WORKFLOW (clean history)
git checkout feature/user-auth
git rebase main                   # Replay commits on latest main
git checkout main
git merge feature/user-auth       # Fast-forward merge

# Merge strategies
git merge -X ours feature-branch      # Prefer current branch changes
git merge -X theirs feature-branch    # Prefer incoming branch changes
git merge --strategy-option=ignore-space-change feature-branch

# Squash merge (all commits become one)
git merge --squash feature/many-commits
git commit -m "Add complete user authentication system"
```
*Notice: Use merge for collaboration and preserving context. Use rebase for clean history and local work.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Common myths / misconceptions</strong></summary>

<div>

- "Rebase is always better" → Not for shared branches or when context matters
- "Merge creates messy history" → Merge commits provide valuable context
- "You must choose one strategy" → Both have their place in workflows

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Git History` · `Conflict Resolution` · `Team Workflows` · `Branch Management` · `Code Integration`

</div>

### Pull Request / Merge Request {#pull-request}

<div class="concept-section definition">

📋 **Concept Definition**  
**Platform-specific feature** (GitHub, GitLab, Bitbucket) for proposing and reviewing code changes before merging. **Workflow**: create feature branch, push to remote, open PR with description, CI/CD runs (tests, linting), reviewers comment/approve/request changes, address feedback, merge when approved. **Review practices**: line-by-line comments, suggestion feature, resolve conversations, required approvals, CODEOWNERS file. **Merge strategies**: merge commit, squash and merge (single commit), rebase and merge (linear history). **Draft PRs**: work-in-progress visibility.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Code review**: catches bugs and improves code quality
- **Knowledge sharing**: team learns from each other's code
- **Documentation**: creates record of why changes were made
- **Quality gates**: automated testing before merging

</div>

<div class="runnable-model">

**Runnable mental model**
```bash
# Typical PR workflow

# 1. Create feature branch
git checkout -b feature/user-authentication
git push -u origin feature/user-authentication

# 2. Make changes and commits
git add .
git commit -m "feat: implement JWT authentication"
git push origin feature/user-authentication

# 3. Create PR via web interface or CLI
# GitHub CLI (gh)
gh pr create --title "Add user authentication" \
             --body "Implements JWT-based authentication system with login/logout endpoints" \
             --reviewer john-doe,jane-smith \
             --assignee myself \
             --label enhancement,security

# 4. Address review feedback
git add .
git commit -m "fix: address security review comments"
git push origin feature/user-authentication

# 5. Squash commits before merge (optional)
git rebase -i HEAD~3
# Interactive rebase to clean up commits

# 6. Merge via GitHub interface or command line
gh pr merge --squash --delete-branch

# Working with draft PRs
gh pr create --draft --title "WIP: User authentication"
gh pr ready                       # Mark draft as ready for review

# PR management
gh pr list                        # List all PRs
gh pr view 123                    # View specific PR
gh pr checkout 123                # Checkout PR branch locally
gh pr review 123 --approve        # Approve PR
gh pr review 123 --request-changes # Request changes
gh pr review 123 --comment "LGTM!" # Add comment

# Update PR branch with main
git checkout feature/user-authentication
git pull origin main              # or git rebase origin/main
git push origin feature/user-authentication

# Force push after rebase (be careful!)
git push --force-with-lease origin feature/user-authentication

# Convert commits to PR template
git log --oneline main..HEAD     # See commits to be included
# abc123 feat: add JWT authentication
# def456 feat: add login endpoint
# ghi789 test: add authentication tests

# PR description template
cat > .github/pull_request_template.md << 'EOF'
## What does this PR do?
Brief description of changes

## Type of change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## How has this been tested?
- [ ] Unit tests
- [ ] Integration tests
- [ ] Manual testing

## Checklist:
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes

## Screenshots (if applicable):

## Related Issues:
Closes #123
Related to #124
EOF

# Auto-linking issues
git commit -m "fix: resolve login bug

Closes #123
Fixes #124  
Resolves #125"

# Co-authored commits
git commit -m "feat: add authentication

Co-authored-by: John Doe <john@example.com>
Co-authored-by: Jane Smith <jane@example.com>"

# Protected branch rules (set via GitHub interface)
# - Require pull request reviews before merging
# - Require status checks to pass before merging
# - Require branches to be up to date before merging
# - Require linear history
# - Include administrators
```
*Notice: PRs are essential for code quality and team collaboration. Never push directly to main/production branches.*

</div>

<div class="concept-section best-practices">

<details>
<summary>✅ <strong>PR best practices</strong></summary>

<div>

- **Small PRs**: easier to review and merge
- **Clear descriptions**: explain what and why
- **Self-review**: check your own PR first
- **Link issues**: reference related tickets
- **Tests included**: prove your changes work

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Code Review` · `Branch Protection` · `CI/CD` · `Team Collaboration` · `Quality Gates`

</div>

### GitFlow Workflow {#gitflow}

<div class="concept-section definition">

📋 **Concept Definition**  
**Branching model** (Vincent Driessen) for release management with defined branch types and merge rules. **Branches**: main/master (production-ready), develop (integration branch), feature/* (new features from develop), release/* (release preparation, version bump), hotfix/* (emergency production fixes from main). **Flow**: feature branches merge to develop → release branch created from develop → release testing → merge to main AND develop → tag version. **Alternatives**: GitHub Flow (simpler, main + features), Trunk-Based Development (very short-lived branches), GitLab Flow (environment branches).

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Release management**: structured approach to versioning
- **Hotfix capability**: emergency fixes without disrupting development
- **Parallel development**: multiple features and releases
- **Production stability**: main branch always deployable

</div>

<div class="runnable-model">

**Runnable mental model**
```bash
# Initialize GitFlow in repository
git flow init
# Prompts for branch naming conventions:
# main branch: main
# develop branch: develop
# feature prefix: feature/
# release prefix: release/
# hotfix prefix: hotfix/
# support prefix: support/

# FEATURE DEVELOPMENT
# Start new feature
git flow feature start user-authentication
# Creates: feature/user-authentication from develop

# Work on feature
git add .
git commit -m "feat: implement JWT authentication"
git push origin feature/user-authentication

# Finish feature
git flow feature finish user-authentication
# Merges into develop and deletes feature branch

# Publish feature for collaboration
git flow feature publish user-authentication
git flow feature pull origin user-authentication

# RELEASE MANAGEMENT
# Start release
git flow release start v1.2.0
# Creates: release/v1.2.0 from develop

# Prepare release (version bumps, changelog, etc.)
echo "1.2.0" > VERSION
git add VERSION
git commit -m "chore: bump version to 1.2.0"

# Finish release
git flow release finish v1.2.0
# 1. Merges release/v1.2.0 into main
# 2. Tags main with v1.2.0
# 3. Merges release/v1.2.0 into develop
# 4. Deletes release/v1.2.0 branch

# HOTFIX (emergency production fix)
# Start hotfix
git flow hotfix start critical-security-fix
# Creates: hotfix/critical-security-fix from main

# Fix the issue
git add .
git commit -m "fix: resolve critical security vulnerability"

# Finish hotfix
git flow hotfix finish critical-security-fix
# 1. Merges into main
# 2. Tags main with new version
# 3. Merges into develop
# 4. Deletes hotfix branch

# MANUAL GITFLOW (without git-flow tools)

# Feature workflow
git checkout develop
git checkout -b feature/user-auth
# ... work on feature ...
git checkout develop
git merge --no-ff feature/user-auth
git branch -d feature/user-auth

# Release workflow
git checkout develop
git checkout -b release/v1.2.0
# ... prepare release ...
git checkout main
git merge --no-ff release/v1.2.0
git tag -a v1.2.0 -m "Release version 1.2.0"
git checkout develop
git merge --no-ff release/v1.2.0
git branch -d release/v1.2.0

# Hotfix workflow
git checkout main
git checkout -b hotfix/security-fix
# ... fix issue ...
git checkout main
git merge --no-ff hotfix/security-fix
git tag -a v1.2.1 -m "Hotfix version 1.2.1"
git checkout develop
git merge --no-ff hotfix/security-fix
git branch -d hotfix/security-fix

# Alternative workflows:

# GITHUB FLOW (simpler)
git checkout main
git checkout -b feature/user-auth
# ... work and push ...
# Create PR to main
# Merge PR and deploy

# GITLAB FLOW (environment branches)
git checkout main                 # Production
git checkout -b pre-production    # Staging
git checkout -b feature/user-auth
# Merge to pre-production first, test, then to main

# Branch protection and automation
# .github/workflows/gitflow.yml
cat > .github/workflows/gitflow.yml << 'EOF'
name: GitFlow Automation

on:
  push:
    branches: [ develop, main ]
    tags: [ 'v*' ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: npm test

  deploy-staging:
    if: github.ref == 'refs/heads/develop'
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to staging
        run: echo "Deploying to staging..."

  deploy-production:
    if: github.ref == 'refs/heads/main'
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: echo "Deploying to production..."
EOF

# Semantic versioning with GitFlow
# major.minor.patch (1.2.3)
git tag -a v1.0.0 -m "Initial release"    # First release
git tag -a v1.1.0 -m "Feature release"    # New features
git tag -a v1.1.1 -m "Bugfix release"     # Bug fixes
git tag -a v2.0.0 -m "Breaking changes"   # Breaking changes

# List tags
git tag -l                        # All tags
git tag -l "v1.*"                 # Pattern matching

# Push tags
git push origin v1.2.0            # Single tag
git push origin --tags            # All tags
```
*Notice: GitFlow is heavy for small teams. Consider GitHub Flow or GitLab Flow for simpler projects.*

</div>

<div class="concept-section when-to-use">

<details>
<summary>🎯 <strong>When to use different workflows</strong></summary>

<div>

- **GitFlow**: Large teams, scheduled releases, complex products
- **GitHub Flow**: Continuous deployment, small teams, web applications
- **GitLab Flow**: Environment-based deployments, staged releases

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Release Management` · `Continuous Integration` · `Branch Protection` · `Version Control` · `Team Coordination`

</div>

### Advanced Git Techniques {#advanced-techniques}

<div class="concept-section definition">

📋 **Concept Definition**  
**Sophisticated Git operations** beyond basic workflow: **Cherry-pick** (apply specific commit to another branch), **Bisect** (binary search for bug-introducing commit), **Reflog** (recover lost commits, undo mistakes), **Stash** (temporarily shelve changes), **Submodules/Subtrees** (nested repositories), **Worktrees** (multiple working directories), **Filter-branch/filter-repo** (rewrite history at scale), **Sparse checkout** (partial repository checkout). **Debugging**: git blame (line-by-line authorship), git log --graph (visualize history), git diff --stat (summary statistics).

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Problem solving**: handle complex scenarios efficiently
- **History manipulation**: clean up messy commit history
- **Debugging**: track down when and why bugs were introduced
- **Performance**: optimize repository size and speed

</div>

<div class="runnable-model">

**Runnable mental model**
```bash
# INTERACTIVE REBASE (history rewriting)
git rebase -i HEAD~5
# Opens editor with commits:
# pick abc123 Add authentication
# pick def456 Fix typo
# pick ghi789 Add tests
# pick jkl012 Another typo fix
# pick mno345 Update docs

# Interactive rebase commands:
# pick (p) = use commit as-is
# reword (r) = edit commit message
# edit (e) = stop for amending
# squash (s) = combine with previous commit
# fixup (f) = like squash but discard message
# drop (d) = remove commit
# exec (x) = run shell command

# Example cleanup:
# pick abc123 Add authentication
# reword def456 Fix typo -> "fix: correct spelling errors"
# squash ghi789 Add tests
# drop jkl012 Another typo fix
# pick mno345 Update docs

# CHERRY-PICK (selective commit copying)
git cherry-pick abc123              # Apply specific commit
git cherry-pick def456..ghi789      # Range of commits
git cherry-pick -n abc123           # Apply without committing
git cherry-pick --continue          # Continue after conflict resolution
git cherry-pick --abort             # Cancel cherry-pick

# Multiple cherry-picks
git checkout hotfix-branch
git cherry-pick feature-branch~3    # 3rd commit from feature
git cherry-pick feature-branch~1    # 1st commit from feature

# BISECT (binary search for bugs)
git bisect start
git bisect bad                      # Current commit is bad
git bisect good v1.2.0             # Known good version

# Git automatically checks out middle commit
# Test your application...
git bisect good                     # If test passes
git bisect bad                      # If test fails

# Automate bisect with script
cat > test-script.sh << 'EOF'
#!/bin/bash
# Exit 0 for good, 1 for bad
npm test | grep -q "0 failing" && exit 0 || exit 1
EOF
chmod +x test-script.sh
git bisect run ./test-script.sh

# Reset bisect
git bisect reset

# STASH (temporary storage)
git stash                          # Save current changes
git stash push -m "WIP: user auth" # Stash with message
git stash -u                       # Include untracked files
git stash -p                       # Interactive stashing

# Stash management
git stash list
# stash@{0}: WIP on main: abc123 Add authentication
# stash@{1}: On feature: def456 Fix validation

git stash show stash@{0}           # Show stash contents
git stash show -p stash@{0}        # Show diff

git stash apply                    # Apply latest stash (keep in stack)
git stash apply stash@{1}          # Apply specific stash
git stash pop                      # Apply and remove from stack
git stash drop stash@{0}           # Delete specific stash
git stash clear                    # Delete all stashes

# Stash branching
git stash branch feature/stashed-work stash@{0}
# Creates branch from stash base and applies stash

# REFLOG (recovery tool)
git reflog                         # Show reference history
# abc123 HEAD@{0}: commit: Add authentication
# def456 HEAD@{1}: checkout: moving from feature to main
# ghi789 HEAD@{2}: commit: Fix validation

# Recover "lost" commits
git checkout HEAD@{2}              # Go to previous state
git checkout -b recovery-branch    # Create branch from recovered state
git cherry-pick abc123             # Recover specific commit

# Reflog for specific branch
git reflog feature/user-auth
git reflog --since="2 days ago"

# WORKTREE (multiple working directories)
git worktree list                  # Show all worktrees
git worktree add ../project-v2 feature/v2-rewrite
git worktree add ../hotfix hotfix/security-fix

# Work in different directories simultaneously
cd ../project-v2                   # Work on v2 rewrite
cd ../hotfix                       # Work on hotfix
cd ../project                      # Main development

git worktree remove ../project-v2  # Remove worktree
git worktree prune                 # Clean up removed worktrees

# SUBMODULES (nested repositories)
git submodule add https://github.com/vendor/library.git lib/vendor
git submodule init
git submodule update

# Clone with submodules
git clone --recursive https://github.com/user/project.git

# Update submodules
git submodule update --remote      # Update to latest
git submodule foreach git pull origin main  # Update all submodules

# Remove submodule
git submodule deinit lib/vendor
git rm lib/vendor
rm -rf .git/modules/lib/vendor

# HOOKS (automation)
# Pre-commit hook example
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
# Run tests before commit
npm test
if [ $? -ne 0 ]; then
    echo "Tests failed. Commit aborted."
    exit 1
fi

# Check code style
npm run lint
if [ $? -ne 0 ]; then
    echo "Linting failed. Commit aborted."
    exit 1
fi
EOF
chmod +x .git/hooks/pre-commit

# Commit message hook
cat > .git/hooks/commit-msg << 'EOF'
#!/bin/bash
# Validate commit message format
commit_regex='^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .{1,50}'
if ! grep -qE "$commit_regex" "$1"; then
    echo "Invalid commit message format!"
    echo "Format: type(scope): description"
    echo "Example: feat(auth): add user login"
    exit 1
fi
EOF
chmod +x .git/hooks/commit-msg

# ADVANCED DIFF AND LOG
# Custom diff tools
git config --global diff.tool vimdiff
git difftool HEAD~1 HEAD

# Advanced log formatting
git log --graph --pretty=format:'%C(yellow)%h%C(reset) %C(blue)%an%C(reset) %C(green)%ar%C(reset) %s %C(yellow)%d%C(reset)'

# Find commits that introduced/removed text
git log -S "function_name"        # Search for when text was added/removed
git log -G "regex_pattern"        # Search with regex
git log -L 1,10:filename.js       # Track line history

# Blame with more context
git blame -w -C -C -C filename.js # Ignore whitespace, detect copies/moves

# ALIASES (productivity shortcuts)
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'

# Complex aliases
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
git config --global alias.wip "commit -am 'WIP'"
git config --global alias.unwip "reset HEAD~1"

# PERFORMANCE OPTIMIZATION
# Repository size analysis
git count-objects -vH             # Show repository size
git gc --aggressive --prune=now   # Garbage collection
git fsck --full                   # File system check

# Large file handling
git filter-branch --tree-filter 'rm -rf large-directory' HEAD
# Or use BFG Repo-Cleaner for better performance
# java -jar bfg.jar --delete-files "*.large" my-repo.git

# Shallow clone for CI/CD
git clone --depth 1 https://github.com/user/repo.git
git fetch --unshallow             # Convert to full clone later
```
*Notice: Advanced techniques are powerful but potentially destructive. Always backup before using rebase, filter-branch, or history rewriting.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Common myths / misconceptions</strong></summary>

<div>

- "Interactive rebase is dangerous" → Safe when used on local branches before sharing
- "Cherry-pick creates duplicate commits" → Creates new commits with same changes
- "Reflog saves everything forever" → Reflog entries expire (default 90 days)

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Git Internals` · `History Manipulation` · `Debugging Tools` · `Repository Optimization` · `Workflow Automation`

</div>

### Git Tags (Annotated vs Lightweight) {#git-tags}

<div class="concept-section definition">

📋 **Concept Definition**  
**Named reference to specific commit** marking important points (releases, milestones). **Types**: Lightweight tag (simple pointer, like branch that doesn't move: git tag v1.0.0), Annotated tag (full Git object with tagger name, email, date, message, GPG signature: git tag -a v1.0.0 -m "Release v1.0.0"). **Semantic Versioning**: MAJOR.MINOR.PATCH (v2.1.3), breaking.feature.bugfix. **Operations**: git tag (list), git tag -d (delete local), git push --tags (push all tags), git push origin :refs/tags/v1.0 (delete remote). Best practice: use annotated tags for releases.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Release management**: precisely identifiable versions
- **Rollback capability**: quick return to stable versions
- **Deployment tracking**: what's in production
- **Communication**: clear version references for stakeholders

</div>

<div class="runnable-model">

**Runnable mental model**
```bash
# LIGHTWEIGHT TAG - simple pointer
git tag v1.0.0
git tag bugfix-patch

# Lightweight tag information
git show v1.0.0
# commit a1b2c3d4e5f6... (tag: v1.0.0)
# Author: Developer <dev@example.com>
# Date: Wed Oct 25 10:30:00 2023 +0200
# Just shows the commit, no tag metadata

# ANNOTATED TAG - full metadata object
git tag -a v1.1.0 -m "Release version 1.1.0

🎯 New Features:
- User authentication system
- Profile management interface
- Real-time notifications

🐛 Bug Fixes:
- Login session timeout resolved
- Profile image upload fix
- Email validation improvements

📈 Performance:
- 40% faster page load times
- Optimized database queries
- Reduced memory usage

⚠️ Breaking Changes:
- API endpoint /users moved to /api/v1/users
- Authentication token format changed
- Legacy browser support dropped (IE11)

👥 Contributors: @alice, @bob, @charlie
📅 Release Date: 2023-10-25
🔗 Changelog: https://github.com/project/releases/v1.1.0"

# Annotated tag information
git show v1.1.0
# tag v1.1.0
# Tagger: Release Manager <release@company.com>
# Date: Wed Oct 25 14:30:00 2023 +0200
# 
# Release version 1.1.0
# [full message content]
# 
# commit a1b2c3d4e5f6...
# [commit details]

# List tags
git tag
# v1.0.0
# v1.1.0
# bugfix-patch

# Pattern-based tag listing
git tag -l "v1.*"
# v1.0.0
# v1.1.0

git tag -l "*patch*"
# bugfix-patch

# Tags with descriptions
git tag -n5
# v1.0.0          Initial release version
# v1.1.0          Release version 1.1.0
#                 
#                 🎯 New Features:
#                 - User authentication system
# bugfix-patch    Critical security fix

# Tag specific commit (retroactive)
git log --oneline
# a1b2c3d Latest commit
# e4f5g6h Previous commit
# i7j8k9l Bug fix commit
# l0m1n2o Initial commit

git tag -a v1.0.1 i7j8k9l -m "Retroactive tag for bug fix release"

# Tag checkout (detached HEAD)
git checkout v1.1.0
# Note: switching to 'v1.1.0'.
# You are in 'detached HEAD' state...

# Create branch from tag
git checkout -b hotfix/v1.1.1 v1.1.0
echo "Critical fix" > hotfix.txt
git add hotfix.txt
git commit -m "fix: critical security vulnerability"
git tag -a v1.1.1 -m "Hotfix release v1.1.1 - Security patch"

# Tag push (explicit required!)
git push origin v1.1.0          # Single tag
git push origin --tags          # All tags
git push --follow-tags          # Tags associated with commits being pushed

# Tag deletion
git tag -d v1.0.0               # Delete local tag
git push origin --delete tag v1.0.0  # Delete remote tag

# Tag verification (signed tags)
git tag -a -s v2.0.0 -m "Signed release v2.0.0"
# Creates GPG-signed tag

git tag -v v2.0.0               # Verify signature
# object a1b2c3d4e5f6...
# type commit
# tag v2.0.0
# tagger Release Manager <release@company.com> 1635163800 +0200
# 
# Signed release v2.0.0
# gpg: Signature made Wed 25 Oct 2023 14:30:00 CET
# gpg: Good signature from "Release Manager <release@company.com>"

# Semantic versioning tag workflow
echo "
Semantic Versioning Pattern:
MAJOR.MINOR.PATCH[-PRERELEASE][+BUILD]

Examples:
v1.0.0          # Initial release
v1.1.0          # New features (backward compatible)
v1.1.1          # Bug fixes
v2.0.0          # Breaking changes
v2.0.0-alpha.1  # Pre-release
v2.0.0-beta.2   # Beta release  
v2.0.0-rc.1     # Release candidate
v1.0.0+20231025 # Build metadata
"

# Automated version bumping
#!/bin/bash
# version-bump.sh
VERSION_TYPE=${1:-patch}  # major, minor, patch

# Get current version
CURRENT_VERSION=$(git describe --tags --abbrev=0)
echo "Current version: $CURRENT_VERSION"

# Calculate new version (simplified)
case $VERSION_TYPE in
  "major")
    NEW_VERSION="v2.0.0"  # Logic to increment major
    ;;
  "minor")
    NEW_VERSION="v1.2.0"  # Logic to increment minor
    ;;
  "patch")
    NEW_VERSION="v1.1.1"  # Logic to increment patch
    ;;
esac

# Create annotated tag
git tag -a $NEW_VERSION -m "Release $NEW_VERSION"
git push origin $NEW_VERSION

# Release workflow integration
git flow release start v1.2.0
git flow release finish v1.2.0    # Creates tag automatically

# Find commits between tags
git log v1.0.0..v1.1.0 --oneline  # Changes in v1.1.0
git diff v1.0.0 v1.1.0            # Full diff between versions

# Describe current position relative to tags
git describe                       # Closest tag + commits since
# v1.1.0-5-ga1b2c3d (5 commits since v1.1.0)

git describe --always              # Always show something
git describe --dirty               # Add -dirty if working directory modified
```
*Notice: Use annotated tags for releases (they contain metadata), lightweight tags for temporary bookmarks.*

</div>

<div class="concept-section best-practices">

<details>
<summary>✅ <strong>Tagging best practices</strong></summary>

<div>

- **Semantic versioning**: follow MAJOR.MINOR.PATCH pattern
- **Annotated tags for releases**: include changelog and metadata
- **Consistent naming**: use v prefix (v1.0.0)
- **Sign important tags**: use GPG for security-critical releases

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Release Management` · `Version Control` · `Deployment` · `Semantic Versioning` · `Change Documentation`

</div>

### Git Security {#git-security}

<div class="concept-section definition">

📋 **Concept Definition**  
**Authentication and verification mechanisms**: **SSH keys** (asymmetric encryption for secure git push/pull, ed25519 recommended), **GPG commit signing** (verify commit authenticity: git commit -S, GitHub "Verified" badge), **Personal Access Tokens** (HTTPS authentication alternative to passwords), **Protected branches** (require PR reviews, status checks, force push prevention). **Security practices**: rotate credentials, .gitignore for secrets, git-secrets tool (prevent credential commits), use credential managers (git-credential-manager). **Two-factor authentication** (2FA) for platform accounts mandatory for security.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Code integrity**: ensure commits haven't been tampered with
- **Identity verification**: prove who made which changes
- **Access control**: protect sensitive repositories
- **Audit trails**: track all changes for compliance

</div>

<div class="runnable-model">

**Runnable mental model**
```bash
# SSH KEY SETUP (secure authentication)
ssh-keygen -t ed25519 -C "your.email@example.com"
# Generates secure SSH key pair

# Add to SSH agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Test SSH connection
ssh -T git@github.com
# Hi username! You've successfully authenticated...

# GPG COMMIT SIGNING (integrity verification)
# Generate GPG key
gpg --full-generate-key
# Choose RSA and RSA, 4096 bits, no expiration

# List GPG keys
gpg --list-secret-keys --keyid-format LONG
# sec   rsa4096/ABC123DEF456 2023-01-01 [SC]
#       ABC123DEF456GHI789JKL012MNO345PQR678
# uid                 Your Name <your.email@example.com>

# Configure Git to use GPG
git config --global user.signingkey ABC123DEF456
git config --global commit.gpgsign true
git config --global gpg.program gpg

# Sign commits
git commit -S -m "feat: add secure authentication"
# Creates GPG-signed commit

# Verify signed commits
git log --show-signature
# commit abc123... (origin/main)
# gpg: Signature made Mon 01 Jan 2023 12:00:00 PM UTC
# gpg: Good signature from "Your Name <your.email@example.com>"

# Sign tags
git tag -s v1.0.0 -m "Signed release v1.0.0"

# SECURE REPOSITORY PRACTICES
# .gitignore security patterns
cat >> .gitignore << 'EOF'
# Security files - NEVER commit these!
*.key
*.pem
*.p12
*.crt
*.csr
.env
.env.*
config/secrets.yml
config/database.yml
aws-credentials
gcp-service-account.json
azure-credentials
ssh_config
.ssh/
*.log

# IDE security
.vscode/settings.json
.idea/workspace.xml

# System files
.DS_Store
Thumbs.db
EOF

# Remove accidentally committed secrets
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch config/secrets.yml' \
  --prune-empty --tag-name-filter cat -- --all

# Or use BFG Repo-Cleaner (recommended)
java -jar bfg.jar --delete-files "secrets.yml" --delete-files "*.key"
git reflog expire --expire=now --all && git gc --prune=now --aggressive

# ACCESS CONTROL SETUP
# Organization-level security
echo "
GitHub Organization Security:
1. Enable two-factor authentication for all members
2. Set branch protection rules:
   - Require pull request reviews
   - Require status checks
   - Require signed commits
   - Restrict who can push to main
3. Enable dependency vulnerability alerts
4. Use secret scanning
5. Configure allowed/blocked third-party applications
"

# Repository-level protection
gh api repos/:owner/:repo/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["ci/tests","security/scan"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":2,"dismiss_stale_reviews":true}' \
  --field restrictions=null

# CREDENTIAL MANAGEMENT
# GitHub Personal Access Tokens
# Create token with minimal required scopes:
# - repo (for private repos)
# - public_repo (for public repos only)
# - workflow (for GitHub Actions)

# Store credentials securely
git config --global credential.helper store
# Better: use OS-specific credential managers
git config --global credential.helper osxkeychain  # macOS
git config --global credential.helper manager      # Windows

# Rotate credentials regularly
git remote set-url origin https://token@github.com/user/repo.git
# Replace 'token' with new personal access token

# AUDIT AND MONITORING
# Enable Git hooks for security
cat > .git/hooks/pre-receive << 'EOF'
#!/bin/bash
# Block commits with secrets
while read oldrev newrev refname; do
    git diff $oldrev $newrev --name-only | while read file; do
        # Check for potential secrets
        if git show $newrev:$file | grep -E "(password|secret|key|token)" >/dev/null; then
            echo "Potential secret detected in $file"
            echo "Commit rejected for security reasons"
            exit 1
        fi
    done
done
EOF

# Commit message security scan
cat > .git/hooks/commit-msg << 'EOF'
#!/bin/bash
# Block sensitive information in commit messages
if grep -E "(password|secret|key|token|credential)" "$1" >/dev/null; then
    echo "❌ Commit message contains sensitive information!"
    echo "Please remove secrets from commit message"
    exit 1
fi
EOF

# Security audit commands
git log --grep="password\|secret\|key" --oneline  # Find potential secret commits
git log --all --full-history -- "*secret*"       # Find deleted secret files
git rev-list --objects --all | grep -E "\.(key|pem|crt)$"  # Find committed certificates

# SIGNED COMMITS WORKFLOW
# Automatic signing setup
cat >> ~/.gitconfig << 'EOF'
[commit]
    gpgsign = true
[tag]
    gpgsign = true
[user]
    signingkey = ABC123DEF456
EOF

# Verify repository integrity
git fsck --full                   # Check repository integrity
git gc --aggressive               # Optimize and clean
git log --show-signature --oneline # Verify all signed commits

# Team GPG key sharing
git config --global gpg.program gpg
gpg --export -a "Your Name" > team-public-key.asc
# Share public key with team for verification

# SECURITY INCIDENT RESPONSE
# If secrets are accidentally committed:
echo "
IMMEDIATE ACTIONS:
1. Rotate the compromised credentials immediately
2. Remove secrets from Git history (BFG or filter-branch)
3. Force push cleaned history (coordinate with team)
4. Update all deployment configurations
5. Audit access logs for potential misuse
6. Document incident and update security procedures
"

# Emergency repository lock
gh repo edit owner/repo --visibility private
gh api repos/owner/repo --method PATCH --field archived=true

# Security automation with GitHub Actions
cat > .github/workflows/security.yml << 'EOF'
name: Security Scan

on: [push, pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run security scan
        uses: securecodewarrior/github-action-add-sarif@v1
        with:
          sarif-file: security-scan-results.sarif
      - name: Check for secrets
        uses: trufflesecurity/trufflehog@main
        with:
          base: main
          head: HEAD
EOF
```
*Notice: Security is ongoing - rotate credentials regularly, audit access, and never commit secrets even temporarily.*

</div>

<div class="concept-section pitfalls">

<details>
<summary>⚠️ <strong>Security pitfalls</strong></summary>

<div>

- **Committing secrets**: Even if deleted later, secrets remain in Git history
- **Unsigned commits**: No way to verify commit authenticity
- **Weak SSH keys**: Old RSA keys can be compromised
- **Public repositories**: Accidentally making private repos public

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Repository Access` · `Credential Management` · `Code Integrity` · `Compliance` · `Incident Response`

</div>

### Git Performance {#git-performance}

<div class="concept-section definition">

📋 **Concept Definition**  
**Repository optimization techniques**: **Shallow clone** (git clone --depth 1: recent history only, faster CI/CD), **Partial clone** (git clone --filter=blob:none: download blobs on-demand), **Sparse checkout** (checkout subset of files), **Git LFS** (Large File Storage for binary files: pointers instead of full files), **Garbage collection** (git gc: compress objects, remove unreachable), **Reflog expiry** (clean old references), **Repack** (optimize pack files). **Large repo strategies**: monorepo tools (Git submodules, git-subtree, Bazel), history squashing for old branches.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Developer productivity**: faster operations = less waiting
- **CI/CD efficiency**: quicker builds and deployments  
- **Storage costs**: smaller repositories save money
- **Network usage**: faster clones and pulls

</div>

<div class="runnable-model">

**Runnable mental model**
```bash
# REPOSITORY SIZE ANALYSIS
git count-objects -vH
# count 1250
# size 15.23 MiB
# in-pack 980
# packs 1
# size-pack 12.45 MiB
# prune-packable 0
# garbage 0
# size-garbage 0 bytes

# Find large files in repository
git rev-list --objects --all | \
  git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | \
  awk '/^blob/ {print substr($0,6)}' | \
  sort --numeric-sort --key=2 | \
  tail -20

# Find large files by path
git ls-tree -r -t -l --full-name HEAD | sort -n -k 4 | tail -20

# GARBAGE COLLECTION OPTIMIZATION
git gc                           # Basic garbage collection
git gc --aggressive             # More thorough (slower)
git gc --prune=now             # Remove unreachable objects immediately

# Automatic gc configuration
git config gc.auto 6700         # Auto-gc after 6700 loose objects
git config gc.autopacklimit 50  # Auto-gc after 50 pack files
git config gc.autodetach true   # Run gc in background

# PACK FILE OPTIMIZATION
git repack -ad                  # Repack all objects
git repack -A                   # Repack, keep unreachable objects
git prune                       # Remove unreachable objects

# Delta compression tuning
git config pack.window 50       # Consider 50 objects for delta compression
git config pack.depth 50        # Maximum delta depth
git config pack.threads 0       # Use all CPU cores

# CLONE OPTIMIZATION
# Shallow clone (faster for CI/CD)
git clone --depth 1 https://github.com/user/repo.git
git clone --depth 50 --branch main https://github.com/user/repo.git

# Partial clone (Git 2.19+)
git clone --filter=blob:none https://github.com/user/large-repo.git
git clone --filter=blob:limit=1m https://github.com/user/repo.git  # Files under 1MB

# Sparse checkout (only specific directories)
git clone --no-checkout https://github.com/user/monorepo.git
cd monorepo
git sparse-checkout init --cone
git sparse-checkout set frontend/src backend/api
git checkout main

# FETCH OPTIMIZATION
# Fetch only specific branch
git fetch origin main:main       # Fetch main without checking out

# Parallel fetch configuration
git config fetch.parallel 8      # Use 8 parallel connections

# Maintenance scheduling
git maintenance start            # Enable background maintenance
git config maintenance.auto true

# LARGE FILE HANDLING
# Git LFS (Large File Storage) setup
git lfs install
git lfs track "*.zip"
git lfs track "*.pdf"
git lfs track "assets/videos/*"

echo "*.zip filter=lfs diff=lfs merge=lfs -text" >> .gitattributes
git add .gitattributes
git commit -m "chore: enable LFS for large files"

# Migrate existing large files to LFS
git lfs migrate import --include="*.zip,*.pdf" --everything

# LFS performance tuning
git config lfs.concurrenttransfers 8    # Parallel transfers
git config lfs.dialtimeout 30           # Connection timeout
git config lfs.activitytimeout 60       # Activity timeout

# NETWORK OPTIMIZATION
# Use delta compression for push/pull
git config core.preloadindex true       # Preload index in parallel
git config core.untrackedCache true     # Cache untracked file status

# Protocol optimization
git config protocol.version 2           # Use Git protocol v2 (faster)

# SSH multiplexing for multiple connections
cat >> ~/.ssh/config << 'EOF'
Host github.com
    ControlMaster auto
    ControlPath ~/.ssh/sockets/%r@%h-%p
    ControlPersist 600
EOF

# WORKING DIRECTORY OPTIMIZATION
# Enable file system monitor (fsmonitor)
git config core.fsmonitor true          # Requires fsmonitor hook
git config core.untrackedCache true     # Cache untracked files
git config core.preloadindex true       # Parallel index loading

# Split index for large repositories
git config core.splitIndex true

# SUBMODULE OPTIMIZATION
# Parallel submodule operations
git config submodule.fetchJobs 8        # Parallel submodule fetch
git clone --recursive --jobs 8 https://github.com/user/repo-with-submodules.git

# Shallow submodules
git config submodule.recurse false
git submodule update --init --depth 1

# PERFORMANCE MONITORING
# Measure Git operations
time git status
time git log --oneline -100
time git diff HEAD~10

# Git performance trace
GIT_TRACE_PERFORMANCE=1 git status
# 12:34:56.789 performance: 0.123 s: git command: git
# 12:34:56.890 performance: 0.234 s: preload_index

# Detailed tracing
GIT_TRACE=1 git clone https://github.com/user/repo.git
GIT_TRACE_PACKET=1 git fetch origin     # Network packet trace

# PERFORMANCE BENCHMARKS
# Create performance test script
cat > git-perf-test.sh << 'EOF'
#!/bin/bash
echo "=== Git Performance Test ==="

echo "Repository size:"
git count-objects -vH

echo -e "\nStatus performance:"
time git status >/dev/null 2>&1

echo -e "\nLog performance (1000 commits):"
time git log --oneline -1000 >/dev/null 2>&1

echo -e "\nDiff performance:"
time git diff HEAD~10 >/dev/null 2>&1

echo -e "\nBlame performance:"
time git blame README.md >/dev/null 2>&1

echo -e "\nBranch listing:"
time git branch -a >/dev/null 2>&1
EOF
chmod +x git-perf-test.sh

# CONFIGURATION OPTIMIZATION
# Performance-focused Git config
git config --global core.precomposeunicode false  # macOS performance
git config --global core.trustctime false         # Windows performance  
git config --global help.autocorrect 1             # Faster typo correction
git config --global status.submodulesummary 0      # Disable submodule status

# Global .gitignore performance
git config --global core.excludesfile ~/.gitignore_global
cat > ~/.gitignore_global << 'EOF'
# IDE files
.vscode/
.idea/
*.swp

# OS files  
.DS_Store
Thumbs.db

# Temporary files
*.tmp
*~
EOF

# CLEANUP AND MAINTENANCE
# Complete repository cleanup
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git repack -Ad
git prune

# Automated maintenance script
cat > git-maintenance.sh << 'EOF'
#!/bin/bash
echo "Running Git maintenance..."

# Cleanup reflog
git reflog expire --expire-unreachable=now --all

# Garbage collection
git gc --auto

# Repack if needed
PACKCOUNT=$(ls -1 .git/objects/pack/*.pack 2>/dev/null | wc -l)
if [ $PACKCOUNT -gt 10 ]; then
    echo "Repacking $PACKCOUNT pack files..."
    git repack -ad
fi

echo "Maintenance complete!"
EOF
chmod +x git-maintenance.sh

# Schedule with cron (daily at 2 AM)
echo "0 2 * * * cd /path/to/repo && ./git-maintenance.sh" | crontab -
```
*Notice: Performance optimizations can be repository-specific. Test changes in non-production environments first.*

</div>

<div class="concept-section interview">

<details>
<summary>💼 <strong>Interview questions</strong></summary>

<div>

**Q: How would you optimize a very large Git repository?**
> Use shallow clones, Git LFS for large files, sparse checkout for partial downloads, and regular garbage collection.

**Q: What's the difference between git gc and git prune?**
> gc does garbage collection including packing and pruning. prune only removes unreachable objects.

**Q: How do you handle binary files in Git repositories?**
> Use Git LFS for large binaries, .gitignore for build artifacts, and consider separate artifact storage for deployables.

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Repository Management` · `CI/CD Optimization` · `Storage Efficiency` · `Network Performance` · `Developer Experience`

</div>

### Git Best Practices Summary {#best-practices-summary}

<div class="concept-section definition">

📋 **Concept Definition**  
**Team conventions and workflows**: **Commit message standards** (Conventional Commits: type(scope): description), **Branch naming** (feature/USER-123-add-login, bugfix/fix-memory-leak), **Never force push** to shared branches, **Pull before push** (avoid conflicts), **Delete merged branches** (keep repo clean), **Protect main/master** (require PR + approvals), **Sign commits** (GPG verification), **Small focused commits** (atomic changes), **Keep history clean** (interactive rebase before PR). **Documentation**: README.md, CONTRIBUTING.md, CODEOWNERS file.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Team coordination**: consistent workflows reduce friction
- **Code quality**: structured processes catch issues early
- **Release reliability**: predictable deployment processes
- **Knowledge preservation**: clear history aids future development

</div>

<div class="concept-section checklist">

<details>
<summary>✅ <strong>Git workflow checklist</strong></summary>

<div>

**Daily Workflow:**
- [ ] Pull latest changes before starting work: `git pull origin main`
- [ ] Create feature branch with descriptive name: `git checkout -b feature/PROJ-123-user-auth`
- [ ] Make atomic commits with clear messages: `git commit -m "feat: add login validation"`
- [ ] Push regularly to backup work: `git push origin feature/PROJ-123-user-auth`
- [ ] Create PR when feature is complete
- [ ] Delete merged branches: `git branch -d feature/completed`

**Commit Quality:**
- [ ] One logical change per commit
- [ ] Follow conventional commit format: `type(scope): description`
- [ ] Include "why" in commit body, not just "what"
- [ ] Test before committing
- [ ] Review your own changes: `git diff --cached`

**Branch Management:**
- [ ] Use descriptive branch names with ticket numbers
- [ ] Keep branches short-lived (max 1-2 weeks)
- [ ] Rebase feature branches on main before merging
- [ ] Use merge commits for features to preserve context
- [ ] Protect main branch with required reviews

**Security:**
- [ ] Never commit secrets or credentials
- [ ] Use .gitignore for sensitive files
- [ ] Sign commits for critical projects
- [ ] Use SSH keys instead of passwords
- [ ] Regularly rotate access credentials

**Performance:**
- [ ] Use Git LFS for large binary files
- [ ] Run `git gc` periodically
- [ ] Keep repository size manageable
- [ ] Use shallow clones for CI/CD
- [ ] Clean up old branches regularly

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Version Control` · `Team Collaboration` · `Code Quality` · `Release Management` · `Professional Development`

</div>

## Concepts

**Repository**: Központi tárolóhely a projekt fájljainak és történetének. Tartalmazza a `.git` mappát, amely a teljes verzió információt tárolja.

**Clone vs Fork**: Clone: helyi másolat készítése. Fork: saját másolat készítése a szerverén, általában nyílt forráskódú projektekhez hozzájáruláshoz.

**Staging Area**: Átmeneti terület a working directory és a repository között, ahol kiválaszthatod mely változások kerüljenek a következő commit-ba.

**Commit**: Pillanatkép a projekt állapotáról, egyedi azonosítóval (hash) és leírással. Atomikus változtatásokat tartalmazzon.

**Branch**: Párhuzamos fejlesztési ág, lehetővé teszi egyszerre több feature kifejlesztését anélkül, hogy befolyásolnák egymást.

**Merge vs Rebase**: Merge: branch-ek egyesítése, megőrzi a történetet. Rebase: commit-ok újrajátszása új base-re, lineáris történetet hoz létre.

**Pull Request**: Formális módja a változások áttekintésének és beolvasztásának. Lehetővé teszi a kód review-t és tesztelést merge előtt.

**GitFlow**: Branching stratégia strukturált release management-tel. Használja a main, develop, feature, release és hotfix branch-eket.

**Advanced Techniques**: Fejlett Git funkciók mint interactive rebase, cherry-pick, bisect, stash, és reflog a komplex problémák megoldásához.

**Git Tags**: Verziók jelölésére szolgálnak. Lightweight tag egyszerű pointer, annotated tag teljes metaadatot tartalmaz.

**Git Security**: SSH kulcsok, GPG aláírás, access control és credential management a biztonságos verziókezeléshez.

**Git Performance**: Repository optimalizálás garbage collection-nel, LFS használata nagy fájlokhoz, shallow clone-ok és konfigurációs finomhangolás.

</div>

### Clone vs Fork {#clone-vs-fork}

<div class="concept-section definition">

📋 **Concept Definition**  
**Clone**: creates local copy of repository (git clone <url>), maintains link to origin, pull/push directly if permissions allow. **Fork**: server-side copy under your account (GitHub/GitLab feature), independent remote repository, pull from upstream, push to your fork. **Open-source workflow**: fork upstream repo → clone your fork → add upstream remote (git remote add upstream <original-url>) → create feature branch → push to fork → open PR to upstream. **Sync fork**: git fetch upstream, git merge upstream/main. Fork preserves connection to original for PR workflow.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Clone**: creates local copy for development
- **Fork**: creates your own remote copy for independent development
- **Contribution workflow**: fork → clone → develop → pull request
- **Permissions**: fork when you can't push to original repository

</div>

<div class="runnable-model">

**Runnable mental model**
```bash
# CLONE - Direct copy for development
git clone https://github.com/user/project.git
cd project

# You can:
git pull origin main              # ✅ Get updates
git push origin feature-branch   # ❌ Need write permission

# Configure upstream for original repository
git remote add upstream https://github.com/original-user/project.git
git remote -v
# origin    https://github.com/user/project.git (fetch)
# origin    https://github.com/user/project.git (push)
# upstream  https://github.com/original-user/project.git (fetch)
# upstream  https://github.com/original-user/project.git (push)

# FORK workflow (on GitHub, GitLab, etc.)
# 1. Click "Fork" button on repository page
# 2. Clone YOUR fork
git clone https://github.com/YOUR-USERNAME/project.git
cd project

# 3. Add original as upstream
git remote add upstream https://github.com/ORIGINAL-USER/project.git

# 4. Keep your fork updated
git fetch upstream
git checkout main
git merge upstream/main
git push origin main

# 5. Develop on feature branch
git checkout -b feature/awesome-feature
# ... make changes ...
git add .
git commit -m "Add awesome feature"
git push origin feature/awesome-feature

# 6. Create Pull Request on GitHub
# From: YOUR-USERNAME:feature/awesome-feature
# To: ORIGINAL-USER:main

# Alternative: using GitHub CLI
gh repo fork ORIGINAL-USER/project --clone
cd project
gh pr create --title "Add awesome feature" --body "Description of changes"
```
*Notice: Fork creates server-side copy with your ownership. Clone creates local copy for development.*

</div>

<div class="concept-section best-practices">

<details>
<summary>✅ <strong>Fork workflow best practices</strong></summary>

<div>

- **Keep fork updated**: regularly sync with upstream
- **Feature branches**: never work directly on main
- **Atomic PRs**: one feature per pull request
- **Descriptive commits**: clear commit messages for reviewers

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Remote Repositories` · `Pull Requests` · `Collaboration` · `Open Source Contribution`

</div>

### Staging Area (Index) {#staging-area}

<div class="concept-section definition">

📋 **Concept Definition**  
**Index/staging area** between working directory and repository: intermediate layer for preparing commits. **Operations**: git add (stage changes), git add -p (interactive patch mode, stage hunks), git reset HEAD (unstage), git diff (working vs staged), git diff --staged (staged vs last commit). **Partial staging**: stage specific lines/hunks from files. **Use cases**: create atomic commits from multiple file changes, review changes before commit, split work-in-progress into logical commits. **Three states**: modified (working directory), staged (index), committed (repository).

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Selective commits**: choose exactly what to include in each commit
- **Atomic commits**: group related changes together
- **Review before commit**: inspect changes before making them permanent
- **Partial file staging**: stage only parts of a file

</div>

<div class="runnable-model">

**Runnable mental model**
```bash
# Working Directory → Staging Area → Repository

# Check current status
git status
# On branch main
# Changes not staged for commit:
#   modified:   file1.txt
#   modified:   file2.txt
# Untracked files:
#   file3.txt

# Add files to staging area
git add file1.txt           # Stage specific file
git add .                   # Stage all changes
git add *.js                # Stage all JavaScript files
git add src/                # Stage entire directory

# Interactive staging
git add -i                  # Interactive mode
git add -p                  # Patch mode (stage parts of files)

# Example of patch mode
git add -p file1.txt
# Stage this hunk [y,n,q,a,d,/,e,?]?
# y - yes, stage this hunk
# n - no, don't stage this hunk
# s - split into smaller hunks
# e - manually edit the hunk

# View staged changes
git diff --staged           # See what's staged
git diff --cached           # Same as --staged
git diff                    # See unstaged changes
git diff HEAD               # See all changes (staged + unstaged)

# Unstage files
git reset HEAD file1.txt    # Unstage specific file
git reset HEAD              # Unstage everything
git restore --staged file1.txt  # Newer syntax

# Staging area operations
git status --porcelain      # Machine-readable status
#  M file1.txt              # Modified and staged
# M  file2.txt              # Modified but not staged
# ?? file3.txt              # Untracked

# Advanced staging scenarios
# Stage only part of a file
git add -p config.js
# Split large files into logical chunks

# Stage new files interactively
git add -i
# 1: status       2: update       3: revert       4: add untracked
# 5: patch        6: diff         7: quit         8: help

# Remove files from staging and working directory
git rm file.txt
git status
# Changes to be committed:
#   deleted:    file.txt

# Remove from staging but keep in working directory
git rm --cached file.txt    # Useful for .gitignore additions

# Rename/move files
git mv oldname.txt newname.txt
# Equivalent to:
# mv oldname.txt newname.txt
# git rm oldname.txt
# git add newname.txt
```
*Notice: Staging area allows precise control over what goes into each commit, enabling clean and logical history.*

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Working Directory` · `Commits` · `Git Diff` · `Atomic Commits` · `File Operations`

</div>

```bash
# Initialize repository
git init

# Add files to staging area
git add file.txt
git add .  # Add all files

# Commit changes
git commit -m "Add initial files"

# Check status
git status

# View history
git log --oneline
```

### Branching {#branching}

Branches allow parallel development without affecting the main codebase.

```bash
# Create and switch to new branch
git checkout -b feature/user-authentication

# Or with newer syntax
git switch -c feature/user-authentication

# List branches
git branch

# Switch branches
git checkout main
git switch main

# Delete branch
git branch -d feature/user-authentication
```

### Merging {#merging}

Integrate changes from one branch into another.

```bash
# Merge feature branch into main
git checkout main
git merge feature/user-authentication

# Merge with no fast-forward (creates merge commit)
git merge --no-ff feature/user-authentication
```

### Remote Repositories {#remote-repositories}

```bash
# Clone repository
git clone https://github.com/user/repo.git

# Add remote
git remote add origin https://github.com/user/repo.git

# Push changes
git push origin main

# Pull changes
git pull origin main

# Fetch changes (without merging)
git fetch origin
```

## Common Workflows

### Feature Branch Workflow
1. Create feature branch from main
2. Develop feature
3. Push feature branch
4. Create pull request
5. Review and merge
6. Delete feature branch

### Gitflow Workflow
- **main**: Production-ready code
- **develop**: Integration branch
- **feature/**: New features
- **release/**: Release preparation
- **hotfix/**: Critical fixes

## Best Practices

1. **Write meaningful commit messages**: Use imperative mood
2. **Make atomic commits**: One logical change per commit
3. **Use branches**: Keep main branch stable
4. **Review before merging**: Use pull requests
5. **Keep history clean**: Use rebase when appropriate
6. **Ignore unnecessary files**: Use .gitignore
7. **Backup important work**: Push regularly

## Useful Commands

```bash
# Undo changes
git checkout -- file.txt  # Discard working directory changes
git reset HEAD file.txt    # Unstage file
git reset --soft HEAD~1    # Undo last commit, keep changes
git reset --hard HEAD~1    # Undo last commit, discard changes

# View differences
git diff                   # Working directory vs staging
git diff --staged          # Staging vs last commit
git diff HEAD~1 HEAD       # Compare commits

# Stash changes
git stash                  # Save work temporarily
git stash pop              # Restore stashed work
git stash list             # List stashes

# Rebase (rewrite history)
git rebase main            # Rebase current branch onto main
git rebase -i HEAD~3       # Interactive rebase for last 3 commits
```

## Advanced Git Concepts

### GitFlow Workflow {#gitflow-workflow}
<!-- tags: workflow, branching, collaboration, medior -->

<div class="concept-section definition">

📋 **Concept Definition**  
*GitFlow is a branching model that defines specific branch types and their purposes. **Main branches**: `main` (production-ready code) and `develop` (integration branch). **Supporting branches**: `feature/*` (new features), `release/*` (release preparation), and `hotfix/*` (critical production fixes). Features branch from develop and merge back, releases prepare develop for production, and hotfixes address urgent production issues.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Clear structure**: defined roles for different branch types
- **Parallel development**: multiple features can be developed simultaneously
- **Release management**: structured approach to preparing releases
- **Emergency fixes**: hotfix branches allow quick production fixes

</div>

<div class="runnable-model" data-filter="workflow collaboration">

**Runnable mental model**
```bash
# Initialize GitFlow
git flow init

# Start new feature
git flow feature start user-authentication
# Creates: feature/user-authentication from develop

# Finish feature (merges back to develop)
git flow feature finish user-authentication

# Start release
git flow release start 1.2.0
# Creates: release/1.2.0 from develop

# Finish release (merges to main and develop, creates tag)
git flow release finish 1.2.0

# Emergency hotfix
git flow hotfix start critical-bug
# Creates: hotfix/critical-bug from main

# Finish hotfix (merges to main and develop)
git flow hotfix finish critical-bug

# Manual GitFlow (without git-flow tool)
# Feature development
git checkout develop
git checkout -b feature/user-auth
# ... develop feature ...
git checkout develop
git merge --no-ff feature/user-auth
git branch -d feature/user-auth

# Release process
git checkout develop
git checkout -b release/1.2.0
# ... bug fixes, version bumps ...
git checkout main
git merge --no-ff release/1.2.0
git tag -a v1.2.0 -m "Release version 1.2.0"
git checkout develop
git merge --no-ff release/1.2.0
git branch -d release/1.2.0
```
*Notice: GitFlow provides structure but can be complex for small teams. Consider simpler workflows for rapid development.*

</div>

### Merge vs Rebase {#merge-vs-rebase}
<!-- tags: merging, rebase, history, medior -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Merge combines changes from two branches by creating a merge commit that has two parent commits, preserving the complete history and branch structure. Rebase replays commits from one branch onto another, rewriting history to create a linear progression. **Merge preserves context** (when branches diverged), while **rebase creates cleaner history** but loses branching information.*

</div>

<div class="runnable-model" data-filter="merging collaboration">

**Runnable mental model**
```bash
# MERGE: Preserves branch history
git checkout main
git merge feature/user-auth
# Creates merge commit with two parents
# History shows when branches diverged and merged

# Merge commit message:
# "Merge branch 'feature/user-auth' into main"

# REBASE: Linear history
git checkout feature/user-auth
git rebase main
# Replays feature commits on top of main
# Creates linear history, no merge commit

# Before rebase:
# main:    A---B---C
# feature:   \-D---E
#
# After rebase:
# main:    A---B---C
# feature:         \-D'--E'  (D' and E' are new commits)

# Interactive rebase (rewrite history)
git rebase -i HEAD~3
# Opens editor with options:
# pick abc1234 Add user model
# squash def5678 Fix typo in user model
# reword ghi9012 Add user validation
#
# Options:
# pick = use commit as-is
# reword = change commit message
# edit = pause to amend commit
# squash = combine with previous commit
# drop = remove commit

# Golden rule of rebasing:
# ⚠️ NEVER rebase commits that have been pushed to shared repositories
# Only rebase local commits or feature branches that only you work on

# Safe rebase workflow:
git checkout feature/my-feature
git fetch origin
git rebase origin/main
# Now feature branch is up-to-date with main
git push origin feature/my-feature --force-with-lease
```
*Notice: Use merge for collaboration (preserves context), rebase for clean local history.*

</div>

### Conflict Resolution {#conflict-resolution}
<!-- tags: conflicts, merging, collaboration, medior -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Merge conflicts occur when Git cannot automatically combine changes from different branches because they modify the same lines of code. Conflicts must be manually resolved by choosing which changes to keep, combining changes, or writing new code. Git marks conflict areas with conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) in files.*

</div>

<div class="runnable-model" data-filter="conflicts collaboration">

**Runnable mental model**
```bash
# Conflict scenario
git checkout main
git merge feature/user-auth
# Auto-merging src/user.js
# CONFLICT (content): Merge conflict in src/user.js
# Automatic merge failed; fix conflicts and then commit the result.

# Check conflict status
git status
# You have unmerged paths.
#   (fix conflicts and run "git commit")
#   (use "git merge --abort" to abort the merge)
#
# Unmerged paths:
#   (use "git add <file>..." to mark resolution)
#         both modified:   src/user.js

# View conflict in file (src/user.js):
# function validateUser(user) {
# <<<<<<< HEAD
#   return user.email && user.password.length >= 8;
# =======
#   return user.email && user.password && user.name;
# >>>>>>> feature/user-auth
# }

# Conflict markers explained:
# <<<<<<< HEAD: Changes from current branch (main)
# =======: Separator
# >>>>>>> feature/user-auth: Changes from merging branch

# Resolution strategies:

# 1. Manual editing (most common)
# Edit src/user.js to resolve conflict:
# function validateUser(user) {
#   return user.email && user.password && user.name && user.password.length >= 8;
# }

# 2. Take theirs (accept incoming changes)
git checkout --theirs src/user.js
git add src/user.js

# 3. Take ours (keep current changes)
git checkout --ours src/user.js
git add src/user.js

# 4. Use merge tool
git mergetool
# Opens configured merge tool (e.g., VS Code, vim, meld)

# After resolving conflicts:
git add src/user.js
git commit
# Git creates merge commit with default message

# Abort merge if needed
git merge --abort
# Returns to state before merge attempt

# Advanced conflict resolution tools:

# 1. Rerere (reuse recorded resolution)
git config rerere.enabled true
# Git remembers how you resolved conflicts
# Automatically applies same resolution for identical conflicts

# 2. Three-way diff view
git show :1:src/user.js  # Common ancestor
git show :2:src/user.js  # Current branch (ours)
git show :3:src/user.js  # Merging branch (theirs)

# 3. Blame to understand context
git blame src/user.js
# See who made conflicting changes and when

# Prevention strategies:
# - Merge/rebase frequently to avoid large conflicts
# - Use smaller, focused commits
# - Communicate with team about overlapping work
# - Use feature flags instead of long-lived branches
```
*Notice: Good conflict resolution requires understanding the intent behind conflicting changes, not just the syntax.*

</div>

### Reflog and Recovery {#reflog-recovery}
<!-- tags: reflog, recovery, history, advanced -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Reflog (reference log) records all changes to repository references (HEAD, branch tips) over time, even for operations that rewrite history. It acts as a safety net for recovering lost commits, undoing destructive operations, and understanding repository history. Each repository has its own reflog, stored locally and not shared with remotes.*

</div>

<div class="runnable-model" data-filter="recovery advanced">

**Runnable mental model**
```bash
# View reflog (recent HEAD movements)
git reflog
# 9c4f2a1 (HEAD -> main) HEAD@{0}: commit: Add user authentication
# 7e3f1b8 HEAD@{1}: merge: Merge branch 'feature/login'
# 4d8c2e5 HEAD@{2}: checkout: moving from feature/login to main
# 2a7f9c3 HEAD@{3}: commit: Implement login form

# View specific branch reflog
git reflog show main
git reflog show feature/login

# Recovery scenarios:

# 1. Undo destructive reset
git reset --hard HEAD~3  # Accidentally deleted 3 commits
# Oh no! I need those commits back!

git reflog
# 4d8c2e5 HEAD@{0}: reset: moving to HEAD~3  (current position)
# 9c4f2a1 HEAD@{1}: commit: Add user authentication  (lost commit)

# Recover lost commits
git reset --hard HEAD@{1}
# or
git reset --hard 9c4f2a1

# 2. Recover deleted branch
git branch -D feature/important-feature  # Accidentally deleted branch
# Branch is gone, but commits are in reflog

git reflog | grep "important-feature"
# 3e8f2c1 HEAD@{15}: checkout: moving from main to feature/important-feature
# 7d9a4b2 HEAD@{12}: commit: Complete important feature

# Recreate branch
git branch feature/important-feature 7d9a4b2

# 3. Find lost commits after force push
# Someone force-pushed over your work on shared branch
git fetch origin
git reflog show origin/main
# 2f7c8e1 origin/main@{0}: fetch: forced-update  (force push)
# 9c4f2a1 origin/main@{1}: fetch: fast-forward   (your lost work)

# Create branch from lost work
git branch recover-lost-work origin/main@{1}

# 4. Time-based recovery
git show HEAD@{yesterday}
git show HEAD@{2.days.ago}
git show 'HEAD@{2025-10-07 14:30:00}'

# Reset to specific time
git reset --hard 'HEAD@{yesterday}'

# 5. Find unreachable commits (garbage collection survivors)
git fsck --lost-found
# dangling commit 3e8f2c1a...
# dangling commit 7d9a4b2f...

git show 3e8f2c1a  # Check if this is what you need
git branch recovered-commit 3e8f2c1a

# Reflog expiration (automatic cleanup)
git config --get gc.reflogExpire        # Default: 90 days
git config --get gc.reflogExpireUnreachable  # Default: 30 days

# Extend reflog retention
git config gc.reflogExpire "1 year"
git config gc.reflogExpireUnreachable "6 months"

# Manual cleanup
git reflog expire --expire=now --all
git gc --prune=now

# Useful reflog shortcuts:
git reset --hard @{1}     # Same as HEAD@{1}
git diff @{yesterday}     # Compare with yesterday's HEAD
git show @{2.weeks.ago}   # Show state 2 weeks ago
```
*Notice: Reflog is local only and has expiration dates. It's a safety net, not a backup strategy.*

</div>

### Collaboration Patterns {#collaboration-patterns}
<!-- tags: collaboration, pull-request, code-review, team -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Modern Git collaboration relies on **pull request/merge request workflows** that combine code review, testing, and integration. Key patterns include **feature branches** (one feature per branch), **fork and pull** (external contributors), **shared repository** (team members), and **protected branches** (enforce review and testing). These patterns ensure code quality and knowledge sharing.*

</div>

<div class="runnable-model" data-filter="collaboration team">

**Runnable mental model**
```bash
# Feature Branch Workflow (team collaboration)

# 1. Start from latest main
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/user-profile-page

# 3. Develop feature (make atomic commits)
git add src/profile.js
git commit -m "Add user profile component

- Display user information
- Handle loading states
- Add edit functionality"

git add tests/profile.test.js
git commit -m "Add tests for user profile component"

# 4. Keep feature branch updated (rebase workflow)
git fetch origin
git rebase origin/main

# Resolve conflicts if any, then continue
git rebase --continue

# 5. Push feature branch
git push origin feature/user-profile-page

# 6. Create Pull Request via GitHub/GitLab web interface
# Include:
# - Clear title and description
# - Link to issue/ticket
# - Screenshots if UI changes
# - Testing instructions

# 7. Address review feedback
# Make changes based on code review
git add src/profile.js
git commit -m "Address review feedback

- Extract validation logic to separate function
- Add error handling for API calls
- Update JSDoc comments"

git push origin feature/user-profile-page

# 8. Squash and merge (optional, clean history)
# Can be done via web interface or locally:
git checkout main
git pull origin main
git merge --squash feature/user-profile-page
git commit -m "Add user profile page

- User profile component with edit functionality
- Comprehensive test coverage
- Responsive design for mobile devices

Closes #123"

# 9. Clean up
git push origin main
git branch -d feature/user-profile-page
git push origin --delete feature/user-profile-page

# Fork and Pull Model (open source)

# 1. Fork repository on GitHub
# 2. Clone your fork
git clone https://github.com/yourusername/original-repo.git
cd original-repo

# 3. Add upstream remote
git remote add upstream https://github.com/originalowner/original-repo.git

# 4. Create feature branch
git checkout -b fix/typo-in-readme

# 5. Make changes and commit
git commit -m "Fix typo in README.md"

# 6. Push to your fork
git push origin fix/typo-in-readme

# 7. Create pull request from your fork to original repo

# 8. Keep fork updated
git fetch upstream
git checkout main
git merge upstream/main
git push origin main

# Protected Branch Strategy

# Repository settings (done by admin):
# - Require pull request reviews
# - Require status checks (CI/CD)
# - Require up-to-date branches
# - Include administrators in restrictions

# Example branch protection rules:
# main branch:
# ✓ Require pull request reviews before merging
# ✓ Require status checks to pass before merging
# ✓ Require branches to be up to date before merging
# ✓ Include administrators
# ✓ Restrict pushes that create files larger than 100MB

# Collaborative Conflict Resolution

# When multiple people work on same files:
# 1. Communication is key
git log --oneline --graph --decorate --all
# See what others are working on

# 2. Frequent integration
git fetch origin
git rebase origin/main  # Keep feature branch updated

# 3. Atomic commits with clear messages
git commit -m "Add user validation

- Email format validation
- Password strength requirements
- Error message localization

Co-authored-by: Jane Doe <jane@example.com>"

# 4. Use conventional commits for consistency
git commit -m "feat: add user authentication

- implement JWT token handling
- add login/logout functionality
- integrate with OAuth providers

BREAKING CHANGE: authentication now required for all API endpoints"

# Advanced collaboration commands:

# Blame with line history
git blame -L 1,10 src/user.js
# See who changed lines 1-10 and when

# Find when bug was introduced
git bisect start
git bisect bad            # Current commit has bug
git bisect good v1.2.0    # Known good version
# Git will check out commit, test and mark good/bad
git bisect good  # if test passes
git bisect bad   # if test fails
# Continue until Git finds the offending commit
git bisect reset

# Cherry-pick commits between branches
git cherry-pick abc1234   # Apply commit abc1234 to current branch
git cherry-pick -x abc1234  # Include source commit reference

# Create patch files for collaboration
git format-patch main..feature/user-auth
# Creates .patch files for each commit
# Send via email or apply with:
git apply 0001-add-user-authentication.patch
```
*Notice: Successful collaboration requires clear communication, consistent workflows, and automated quality checks.*

</div>

### Git Hooks and Automation {#git-hooks}
<!-- tags: hooks, automation, quality, workflow -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Git hooks are scripts that run automatically at specific points in the Git workflow. **Client-side hooks** (pre-commit, commit-msg, post-commit, pre-push) run on developer machines, while **server-side hooks** (pre-receive, post-receive) run on Git servers. Hooks enable automation of code quality checks, testing, deployment, and notification systems.*

</div>

<div class="runnable-model" data-filter="automation workflow">

**Runnable mental model**
```bash
# Git hooks location
ls -la .git/hooks/
# pre-commit.sample
# commit-msg.sample
# post-commit.sample
# pre-push.sample
# ... (sample files, rename to activate)

# 1. Pre-commit hook (code quality)
# File: .git/hooks/pre-commit (make executable)
#!/bin/bash

echo "Running pre-commit checks..."

# Check for JavaScript linting errors
npm run lint
if [ $? -ne 0 ]; then
    echo "❌ Linting failed. Fix errors before committing."
    exit 1
fi

# Run unit tests
npm test
if [ $? -ne 0 ]; then
    echo "❌ Tests failed. Fix tests before committing."
    exit 1
fi

# Check for debugging statements
if grep -r "console.log\|debugger" src/; then
    echo "❌ Remove debugging statements before committing."
    exit 1
fi

# Check for large files
find . -size +50M -type f -not -path "./.git/*" | head -1 | grep -q .
if [ $? -eq 0 ]; then
    echo "❌ Large files detected. Use Git LFS for files >50MB."
    exit 1
fi

echo "✅ Pre-commit checks passed!"
exit 0

# Make hook executable
chmod +x .git/hooks/pre-commit

# 2. Commit message hook (conventional commits)
# File: .git/hooks/commit-msg
#!/bin/bash

commit_regex='^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .{1,50}'

if ! grep -qE "$commit_regex" "$1"; then
    echo "❌ Invalid commit message format!"
    echo "Format: type(scope): description"
    echo "Types: feat, fix, docs, style, refactor, test, chore"
    echo "Example: feat(auth): add user authentication"
    exit 1
fi

echo "✅ Commit message format is valid!"
exit 0

# 3. Pre-push hook (prevent force push to main)
# File: .git/hooks/pre-push
#!/bin/bash

protected_branch='main'
current_branch=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')

if [ $protected_branch = $current_branch ]; then
    echo "❌ Direct push to main branch is not allowed!"
    echo "Use pull request workflow instead."
    exit 1
fi

# Check for force push
while read local_ref local_sha remote_ref remote_sha; do
    if [ "$local_sha" = "0000000000000000000000000000000000000000" ]; then
        # Branch deletion, allow
        continue
    fi
    
    if [ "$remote_sha" = "0000000000000000000000000000000000000000" ]; then
        # New branch, allow
        continue
    fi
    
    # Check if remote_sha is ancestor of local_sha
    if ! git merge-base --is-ancestor "$remote_sha" "$local_sha"; then
        echo "❌ Force push detected! This would rewrite history."
        echo "Use 'git push --force-with-lease' if intentional."
        exit 1
    fi
done

echo "✅ Push validation passed!"
exit 0

# 4. Post-commit hook (notifications)
# File: .git/hooks/post-commit
#!/bin/bash

# Send notification to team chat
commit_hash=$(git rev-parse HEAD)
commit_msg=$(git log -1 --pretty=%B)
author=$(git log -1 --pretty=%an)
branch=$(git rev-parse --abbrev-ref HEAD)

# Example: Slack webhook notification
curl -X POST -H 'Content-type: application/json' \
    --data "{
        \"text\": \"📝 New commit by $author on $branch\",
        \"attachments\": [{
            \"color\": \"good\",
            \"fields\": [{
                \"title\": \"Commit\",
                \"value\": \"$commit_hash\",
                \"short\": true
            }, {
                \"title\": \"Message\",
                \"value\": \"$commit_msg\",
                \"short\": false
            }]
        }]
    }" \
    YOUR_SLACK_WEBHOOK_URL

# 5. Server-side hooks (repository management)
# File: hooks/pre-receive (on Git server)
#!/bin/bash

# Reject commits that don't pass CI
while read oldrev newrev refname; do
    # Check if all commits have passed CI
    commits=$(git rev-list $oldrev..$newrev)
    for commit in $commits; do
        status=$(check_ci_status $commit)
        if [ "$status" != "success" ]; then
            echo "❌ Commit $commit failed CI checks"
            exit 1
        fi
    done
done

echo "✅ All commits passed CI checks"
exit 0

# 6. Shared hooks with team (using package)
# Install husky for shared hooks
npm install --save-dev husky

# Initialize husky
npx husky install

# Add pre-commit hook for team
npx husky add .husky/pre-commit "npm run lint && npm test"

# Add commit message hook
npx husky add .husky/commit-msg 'npx commitlint --edit "$1"'

# Package.json scripts
{
  "scripts": {
    "prepare": "husky install",
    "lint": "eslint src/",
    "test": "jest",
    "test:coverage": "jest --coverage"
  },
  "lint-staged": {
    "*.js": ["eslint --fix", "prettier --write", "git add"],
    "*.{json,md}": ["prettier --write", "git add"]
  }
}

# 7. Custom hook examples

# Check branch naming convention
# File: .git/hooks/pre-push
#!/bin/bash

branch=$(git rev-parse --abbrev-ref HEAD)
valid_pattern="^(feature|bugfix|hotfix)\/[a-z0-9-]+$"

if [[ ! $branch =~ $valid_pattern ]]; then
    echo "❌ Branch name '$branch' doesn't follow convention"
    echo "Use: feature/description, bugfix/description, or hotfix/description"
    exit 1
fi

# Prevent commits to main branch locally
# File: .git/hooks/pre-commit
#!/bin/bash

branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$branch" = "main" ]; then
    echo "❌ You can't commit directly to main branch"
    echo "Switch to a feature branch first"
    exit 1
fi

# Automatic version bumping
# File: .git/hooks/post-commit
#!/bin/bash

if git diff HEAD^ HEAD --quiet package.json; then
    # package.json wasn't changed, bump patch version
    npm version patch --no-git-tag-version
    git add package.json
    git commit --amend --no-edit
fi
```
*Notice: Hooks should be fast, reliable, and provide clear feedback. Share hooks with team using tools like Husky.*

</div>

### Performance and Optimization {#performance-optimization}
<!-- tags: performance, optimization, large-repos, lfs -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Git performance optimization involves managing repository size, improving command execution speed, and handling large files efficiently. Key strategies include **shallow clones** (limited history), **sparse checkout** (partial working directory), **Git LFS** (Large File Storage) for binary files, and **garbage collection** for cleanup. These techniques are essential for large repositories and CI/CD systems.*

</div>

<div class="runnable-model" data-filter="performance optimization">

**Runnable mental model**
```bash
# Repository size analysis
du -sh .git/
# 150M    .git/

git count-objects -vH
# count 2543
# size 89.23 MiB
# in-pack 2134
# packs 3
# size-pack 67.89 MiB
# prune-packable 0
# garbage 0
# size-garbage 0 bytes

# Find large files in history
git rev-list --objects --all | \
git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | \
sed -n 's/^blob //p' | \
sort --numeric-sort --key=2 | \
tail -10

# 1. Shallow clones (faster for CI/CD)
git clone --depth 1 https://github.com/user/repo.git
# Downloads only latest commit

# Deepen shallow clone if needed
git fetch --depth 10
git fetch --unshallow  # Get full history

# Create shallow clone of specific branch
git clone --depth 1 --branch main --single-branch https://github.com/user/repo.git

# 2. Sparse checkout (partial working directory)
git config core.sparseCheckout true
echo "src/" > .git/info/sparse-checkout
echo "docs/" >> .git/info/sparse-checkout
git read-tree -m -u HEAD
# Only src/ and docs/ directories in working tree

# Cone mode (faster for large repos)
git config core.sparseCheckout true
git config core.sparseCheckoutCone true
git sparse-checkout init --cone
git sparse-checkout set src docs tests

# 3. Git LFS for large files
git lfs install

# Track large file types
git lfs track "*.pdf"
git lfs track "*.zip"
git lfs track "*.exe"
git lfs track "assets/*.png"

# Check .gitattributes
cat .gitattributes
# *.pdf filter=lfs diff=lfs merge=lfs -text
# *.zip filter=lfs diff=lfs merge=lfs -text

# Clone with LFS
git lfs clone https://github.com/user/repo.git

# Skip LFS files during clone (faster)
GIT_LFS_SKIP_SMUDGE=1 git clone https://github.com/user/repo.git
# Download LFS files later:
git lfs pull

# 4. Garbage collection and cleanup
git gc
# Cleanup unnecessary files and optimize repository

git gc --aggressive
# More thorough but slower cleanup

# Remove unreachable objects
git fsck --unreachable
git prune

# Remove old reflog entries
git reflog expire --expire=30.days.ago --all
git gc --prune=30.days.ago

# 5. Optimize pack files
git repack -ad
# Repack objects into single pack file

git repack -adf
# Include unreachable objects

# 6. Partial clones (Git 2.19+)
git clone --filter=blob:none https://github.com/user/repo.git
# Clone without downloading blob objects

git clone --filter=tree:0 https://github.com/user/repo.git
# Clone without trees (directory listings)

# Download objects on demand
git rev-list --objects --missing=print HEAD | head -10

# 7. Worktrees (multiple working directories)
git worktree add ../feature-branch feature/user-auth
# Create separate working directory for branch

git worktree list
# /path/to/main        [main]
# /path/to/feature-branch  [feature/user-auth]

# Switch between worktrees instantly
cd ../feature-branch
# Work on feature without switching branches in main directory

# Clean up worktree
git worktree remove ../feature-branch

# 8. Performance monitoring
# Time Git operations
time git log --oneline
time git checkout other-branch

# Enable Git tracing
GIT_TRACE=1 git status
GIT_TRACE_PERFORMANCE=1 git log --oneline
GIT_TRACE_PACK_ACCESS=1 git log --oneline

# Monitor network operations
GIT_CURL_VERBOSE=1 git push origin main

# 9. Configuration optimization
# Enable parallel processing
git config core.preloadindex true
git config core.fscache true
git config gc.auto 256

# Optimize status command
git config status.submodulesummary 0
git config diff.ignoreSubmodules dirty

# Use SSH multiplexing
# ~/.ssh/config
# Host github.com
#   ControlMaster auto
#   ControlPersist 600
#   ControlPath ~/.ssh/control-%h-%p-%r

# 10. Large repository strategies
# Convert to Git LFS
java -jar bfg.jar --convert-to-git-lfs '*.{zip,jar,war}' --no-blob-protection .

# Remove large files from history
java -jar bfg.jar --strip-blobs-bigger-than 50M .
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Monorepo optimization
git config core.splitindex true
git config core.untrackedcache true
git config status.aheadbehind false

# Alternative: Use Git submodules or subtrees
git submodule add https://github.com/user/library.git lib/library
git subtree add --prefix=lib/library https://github.com/user/library.git main

# Repository health check
git fsck --full
# Checking object directories: 100% done.
# Checking objects: 100% done.
# ✅ No issues found

# Benchmark commands
git count-objects -v
git log --oneline --all | wc -l  # Total commits
du -sh .git/objects/             # Object database size
```
*Notice: Performance optimization should be applied gradually. Measure before and after to confirm improvements.*

</div>

## Git Best Practices and Common Pitfalls

### Commit Best Practices {#commit-best-practices}
<!-- tags: commits, best-practices, workflow -->

<div class="concept-section definition">

📋 **Best Practices for Git Commits**  
*Well-crafted commits are atomic (single logical change), have descriptive messages following conventional format, and maintain clean history. Good commits tell a story of how the code evolved, making it easier to understand changes, debug issues, and collaborate with team members.*

</div>

<div class="runnable-model" data-filter="best-practices workflow">

**Runnable mental model**
```bash
# 1. Atomic commits (one logical change per commit)

# ❌ Bad: Multiple unrelated changes
git add .
git commit -m "Fix bug and add feature and update docs"

# ✅ Good: Separate logical changes
git add src/auth.js
git commit -m "fix(auth): handle null user session

Prevent null pointer exception when user session
expires during API call. Add null check before
accessing session properties.

Fixes #123"

git add docs/api.md
git commit -m "docs(api): add authentication examples

- Add code examples for JWT token usage
- Document error responses
- Include rate limiting information"

git add src/feature.js tests/feature.test.js
git commit -m "feat(dashboard): add user activity chart

- Implement activity visualization component
- Add time range selector (day/week/month)
- Include comprehensive unit tests

Closes #456"

# 2. Conventional commit messages
# Format: type(scope): description
#
# Types:
# feat: new feature
# fix: bug fix
# docs: documentation
# style: formatting, no code change
# refactor: code change that neither fixes bug nor adds feature
# test: adding missing tests
# chore: maintain, dependencies, build process

# Examples:
git commit -m "feat(user): add profile picture upload"
git commit -m "fix(api): resolve race condition in payment processing"
git commit -m "refactor(auth): extract token validation to middleware"
git commit -m "test(utils): add edge cases for date formatting"
git commit -m "chore(deps): update React to v18.2.0"

# 3. Staging specific changes (interactive)
git add -p src/user.js
# Interactively choose which changes to stage
# y = stage this hunk
# n = don't stage
# s = split into smaller hunks
# e = edit the hunk manually

# Stage only specific lines
git add -p
# (1/3) Stage this hunk [y,n,q,a,d,s,e,?]? s
# Split into 2 hunks.
# (1/4) Stage this hunk [y,n,q,a,d,s,e,?]? y

# 4. Amending commits (fix last commit)
git commit -m "Add user validation"
# Oops, forgot to add test file!

git add tests/validation.test.js
git commit --amend --no-edit
# Adds test file to last commit without changing message

# Change commit message
git commit --amend -m "feat(validation): add comprehensive user validation

- Email format validation
- Password strength requirements  
- Username uniqueness check
- Include comprehensive test coverage"

# 5. Clean up before pushing (interactive rebase)
git log --oneline -5
# abc1234 WIP: user validation
# def5678 Fix typo
# ghi9012 Add user model  
# jkl3456 WIP: validation rules
# mno7890 Update API docs

# Clean up last 4 commits
git rebase -i HEAD~4

# Editor opens with:
# pick ghi9012 Add user model
# pick jkl3456 WIP: validation rules
# pick def5678 Fix typo
# pick abc1234 WIP: user validation

# Change to:
# pick ghi9012 Add user model
# squash jkl3456 WIP: validation rules
# squash def5678 Fix typo  
# squash abc1234 WIP: user validation

# Result: Clean commit history with meaningful messages

# 6. Partial commits from working directory
# You have multiple changes but want to commit separately

git status
# modified: src/auth.js (2 different features)
# modified: src/utils.js (bug fix)

# Commit bug fix first
git add src/utils.js
git commit -m "fix(utils): handle edge case in date parsing"

# Commit only part of auth.js changes
git add -p src/auth.js
# Select hunks related to first feature
git commit -m "feat(auth): add OAuth integration"

# Commit remaining changes
git add src/auth.js
git commit -m "feat(auth): add remember me functionality"

# 7. Commit templates for consistency
# Create commit template
cat > ~/.gitmessage << EOF
# Type(scope): Brief description (50 chars max)
#
# Longer explanation if needed (wrap at 72 chars)
# - Bullet points are okay
# - Typically a hyphen or asterisk is used for the bullet
#
# Link to issue: Closes #123
# Co-authored-by: Name <email@example.com>
EOF

# Configure template
git config --global commit.template ~/.gitmessage

# Now git commit opens editor with template

# 8. Verification and signing
# Sign commits with GPG
git config --global user.signingkey YOUR_GPG_KEY_ID
git config --global commit.gpgsign true

# Commit with signature
git commit -S -m "feat(security): add encryption for sensitive data"

# Verify signatures
git log --show-signature

# 9. Co-authored commits (pair programming)
git commit -m "feat(payment): implement Stripe integration

Add payment processing with Stripe API integration.
Include error handling and webhook validation.

Co-authored-by: Jane Doe <jane@example.com>
Co-authored-by: Bob Smith <bob@example.com>"

# 10. Emergency fixes (fixup commits)
# Quick fix for last commit
git add .
git commit --fixup HEAD

# Later, squash fixup commits
git rebase -i --autosquash HEAD~3
```
*Notice: Good commit practices pay dividends during code review, debugging, and project maintenance.*

</div>

### Common Pitfalls and Solutions {#common-pitfalls}
<!-- tags: pitfalls, troubleshooting, recovery -->

<div class="concept-section definition">

📋 **Common Git Pitfalls and Recovery**  
*Git's flexibility can lead to situations that seem catastrophic but are usually recoverable. Understanding common pitfalls and their solutions prevents data loss and reduces stress during development. Most "disasters" in Git are recoverable thanks to its robust design and safety mechanisms.*

</div>

<div class="runnable-model" data-filter="troubleshooting recovery">

**Runnable mental model**
```bash
# 1. Accidental commit to wrong branch
# Committed to main instead of feature branch

git log --oneline -2
# abc1234 Add new feature (HEAD -> main)  ← Should be on feature branch!
# def5678 Previous main commit

# Solution: Move commit to correct branch
git branch feature/new-feature    # Create branch at current commit
git reset --hard HEAD~1           # Move main back one commit
git checkout feature/new-feature  # Switch to feature branch
# Commit is now on correct branch!

# 2. Force push disasters
# Someone force-pushed and overwrote your work

git pull origin main
# error: Your local changes would be overwritten by merge

git fetch origin
git log --oneline origin/main
# 789wxyz Force push commit (origin/main)
# def5678 Previous commit

# Find your lost work in reflog
git reflog show origin/main
# 789wxyz origin/main@{0}: fetch: forced-update
# abc1234 origin/main@{1}: fetch: fast-forward  ← Your work!

# Recover your work
git checkout -b recover-my-work origin/main@{1}
# Now you have your work back, merge or cherry-pick as needed

# 3. Merge conflicts nightmare
git merge feature/complex-feature
# CONFLICT (content): Merge conflict in 15 files
# Automatic merge failed

# Don't panic! Solutions:
# Option A: Abort and try different approach
git merge --abort

# Option B: Use merge tool
git mergetool
# Opens configured merge tool for each conflict

# Option C: Accept all theirs/ours for bulk resolution
git checkout --theirs .
git add .
git commit

# Option D: Merge with strategy
git merge -X theirs feature/complex-feature  # Prefer their changes
git merge -X ours feature/complex-feature    # Prefer our changes

# 4. Accidentally deleted commits
git reset --hard HEAD~5  # Oops! Deleted 5 commits

# Recovery using reflog
git reflog
# 123abcd HEAD@{0}: reset: moving to HEAD~5
# 789wxyz HEAD@{1}: commit: Important work  ← Found it!

git reset --hard HEAD@{1}
# Back to before the reset!

# Alternative: Create branch from lost commit
git branch recovery-branch 789wxyz

# 5. Working directory disasters
# Accidentally deleted files or made breaking changes

rm -rf src/  # Oops! Deleted source directory

# Recovery options:
# A: Restore from last commit
git checkout -- src/
# or (Git 2.23+)
git restore src/

# B: Restore specific file
git checkout HEAD -- src/important-file.js

# C: Restore to specific commit
git checkout abc1234 -- src/

# 6. Stash problems
git stash  # Stashed important work
# ... work on something else ...
git stash pop
# error: Your local changes would be overwritten

# Solution: Handle stash conflicts
git stash pop
# Resolve conflicts in files
git add .
git stash drop  # Remove stash after resolving

# Find lost stashes
git stash list
git stash show stash@{2}
git stash apply stash@{2}

# 7. Rebase gone wrong
git rebase main
# Conflicts in multiple commits, very confusing

# Abort and try different approach
git rebase --abort

# Alternative: Interactive rebase to skip problematic commits
git rebase -i main
# Mark problematic commits as 'drop' or 'edit'

# 8. Large file committed accidentally
git add .
git commit -m "Add assets"
# Oops! Committed 500MB video file

# Remove from last commit
git reset --soft HEAD~1
echo "*.mp4" >> .gitignore
git add .gitignore
git reset src/assets/large-video.mp4
git commit -m "Add assets (excluding large files)"

# Remove from history completely
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch src/assets/large-video.mp4' \
  --prune-empty --tag-name-filter cat -- --all

# Modern alternative with git-filter-repo
git filter-repo --path src/assets/large-video.mp4 --invert-paths

# 9. Wrong remote URL
git remote -v
# origin  https://wrong-repo.git (fetch)

# Fix remote URL
git remote set-url origin https://correct-repo.git
git remote -v
# origin  https://correct-repo.git (fetch)

# 10. Commit message typos after push
git log --oneline -1
# abc1234 Implemnet user auht  ← Typos!

# Can't amend after push to shared branch, but can add clarification
git commit --allow-empty -m "Previous commit: Implement user auth

Fix typos in commit message abc1234:
- 'Implemnet' should be 'Implement'  
- 'auht' should be 'auth'"

# 11. Branch naming conflicts
git checkout -b feature/user-auth
# error: A branch named 'feature/user-auth' already exists

# Solutions:
# A: Use different name
git checkout -b feature/user-authentication

# B: Delete old branch if safe
git branch -D feature/user-auth  # Force delete
git checkout -b feature/user-auth

# C: Rename existing branch
git branch -m feature/user-auth feature/user-auth-old
git checkout -b feature/user-auth

# 12. Submodule issues
git submodule update --init --recursive
# error: Server does not allow request for unadvertised object

# Fix: Update submodule URLs
git submodule sync --recursive
git submodule update --init --recursive

# Remove problematic submodule
git submodule deinit -f submodule-name
git rm submodule-name
rm -rf .git/modules/submodule-name

# Prevention strategies:
# 1. Use aliases for common recovery commands
git config --global alias.undo 'reset --soft HEAD~1'
git config --global alias.unstage 'reset HEAD --'
git config --global alias.visual '!gitk'

# 2. Enable automatic garbage collection protection
git config --global gc.auto 256
git config --global gc.reflogExpire "90 days"

# 3. Create backup before risky operations
git tag backup-before-rebase
# ... do risky operation ...
git tag -d backup-before-rebase  # Delete if successful
```
*Notice: Most Git "disasters" are recoverable. When in doubt, check reflog and make backups before risky operations.*

</div>

---

### Advanced Git Workflows {#advanced-git-workflows}
<!-- tags: git-workflows, branching-strategies, gitflow, github-flow, gitlab-flow -->

<div class="concept-section definition">

📋 **Concept Definition**  
**Git workflows define structured approaches for managing branches, releases, and collaboration**. **GitFlow**: uses main/develop branches plus feature/release/hotfix branches for scheduled releases. **GitHub Flow**: lightweight with main branch and feature branches via pull requests for continuous deployment. **GitLab Flow**: combines GitHub Flow with environment branches for staged deployments. **Trunk-Based Development**: single main branch with feature toggles for rapid integration. **Release Flow**: Microsoft's approach with release branches for long-term support. **Key considerations**: team size, release frequency, deployment strategy, code review requirements.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Team coordination**: prevents conflicts and ensures code quality
- **Release management**: structured approach to versioning and deployments
- **Risk mitigation**: controlled integration reduces bugs in production
- **Scalability**: workflows adapt to team size and project complexity

</div>

<div class="runnable-model" data-filter="git-workflows">

**Runnable mental model**
```bash
# === GITFLOW WORKFLOW ===

# 1. Initialize GitFlow repository
git flow init
# Creates: main (production), develop (integration)

# 2. Start new feature
git flow feature start user-authentication
# Creates: feature/user-authentication from develop
# Equivalent: git checkout -b feature/user-authentication develop

# Development on feature branch
echo "class UserAuth { }" > auth.js
git add auth.js
git commit -m "feat: add user authentication class"

echo "// Add login method" >> auth.js
git add auth.js
git commit -m "feat: implement login functionality"

# 3. Finish feature (merge back to develop)
git flow feature finish user-authentication
# Merges feature/user-authentication into develop
# Deletes feature branch
# Switches back to develop

# 4. Start release preparation
git flow release start 1.0.0
# Creates: release/1.0.0 from develop
# For bug fixes and version bumping only

# Release branch activities
echo "version: 1.0.0" > version.txt
git add version.txt
git commit -m "chore: bump version to 1.0.0"

# Fix release-specific bugs
echo "// Fix: handle null user input" >> auth.js
git add auth.js
git commit -m "fix: handle null input in authentication"

# 5. Finish release
git flow release finish 1.0.0
# Merges release/1.0.0 into main
# Tags main with v1.0.0
# Merges release back into develop
# Deletes release branch

# 6. Emergency hotfix
git flow hotfix start security-patch
# Creates: hotfix/security-patch from main

echo "// Security: sanitize input" >> auth.js
git add auth.js
git commit -m "fix: sanitize user input for XSS prevention"

git flow hotfix finish security-patch
# Merges into main and develop
# Tags main
# Deletes hotfix branch

# === GITHUB FLOW ===

# 1. Create feature branch from main
git checkout main
git pull origin main
git checkout -b feature/add-dark-mode

# 2. Development with frequent commits
echo "body.dark { background: #333; }" > dark-mode.css
git add dark-mode.css
git commit -m "feat: add dark mode CSS"

echo "toggleDarkMode() { /* implementation */ }" > toggle.js
git add toggle.js
git commit -m "feat: add dark mode toggle function"

# 3. Push branch and create pull request
git push -u origin feature/add-dark-mode
# Create PR on GitHub web interface

# 4. Code review and CI checks
# - Automated tests run
# - Code review by team
# - Approval required before merge

# 5. Merge to main (via GitHub web)
# Deploys automatically to production

# === TRUNK-BASED DEVELOPMENT ===

# 1. Feature toggles for incomplete features
echo "const FEATURES = {
  DARK_MODE: process.env.ENABLE_DARK_MODE === 'true',
  NEW_UI: process.env.ENABLE_NEW_UI === 'true'
};" > features.js

# 2. Commit directly to main (after review)
git checkout main
git add features.js
git commit -m "feat: add feature toggle system"
git push origin main

# 3. Gradual feature rollout
echo "if (FEATURES.DARK_MODE) {
  // New dark mode implementation
} else {
  // Original theme
}" >> app.js

git add app.js
git commit -m "feat: implement dark mode behind feature toggle"
git push origin main

# Deploy with feature disabled initially
# Environment: ENABLE_DARK_MODE=false

# Gradually enable for users
# Environment: ENABLE_DARK_MODE=true (for 10% of users)
# Environment: ENABLE_DARK_MODE=true (for 50% of users)
# Environment: ENABLE_DARK_MODE=true (for 100% of users)

# === GITLAB FLOW ===

# 1. Feature development (same as GitHub Flow)
git checkout main
git checkout -b feature/api-versioning

echo "class APIv2 { }" > api-v2.js
git add api-v2.js
git commit -m "feat: add API v2 implementation"

# 2. Merge to main
git checkout main
git merge feature/api-versioning
git push origin main

# 3. Environment-specific branches
# Automatic merge to pre-production
git checkout -b pre-production
git merge main
git push origin pre-production
# Deploys to staging environment

# Manual merge to production (after testing)
git checkout production
git merge main
git push origin production
# Deploys to production environment

# === RELEASE FLOW (Microsoft) ===

# 1. Topic branch for feature
git checkout main
git checkout -b topics/user-analytics

echo "class Analytics { }" > analytics.js
git add analytics.js
git commit -m "feat: add user analytics tracking"

# 2. Merge to main via PR
git push origin topics/user-analytics
# Create PR, review, merge

# 3. Release branch from main
git checkout main
git checkout -b release/2023.11
echo "version: 2023.11" > release-info.txt
git add release-info.txt
git commit -m "chore: create release 2023.11"

# 4. Cherry-pick critical fixes to release
git checkout topics/critical-bug-fix
echo "// Fix critical issue" >> analytics.js
git add analytics.js
git commit -m "fix: resolve memory leak in analytics"

git checkout release/2023.11
git cherry-pick <commit-hash>

# 5. Deploy release branch
git push origin release/2023.11
# Deploy release/2023.11 to production

# === WORKFLOW COMPARISON ===

# GitFlow - Best for:
# - Scheduled releases (monthly/quarterly)
# - Large teams (10+ developers)
# - Enterprise software with LTS versions
# - Multiple versions in production

# GitHub Flow - Best for:
# - Continuous deployment
# - Web applications
# - Small to medium teams (2-10 developers)
# - SaaS products

# Trunk-Based Development - Best for:
# - High-frequency releases (daily/hourly)
# - Mature CI/CD pipeline
# - Experienced teams
# - Feature toggles infrastructure

# GitLab Flow - Best for:
# - Multiple environments (dev/staging/prod)
# - Regulated industries
# - Mixed deployment strategies
# - Quality gates between environments

# === ADVANCED BRANCHING PATTERNS ===

# 1. Epic branches for large features
git checkout develop
git checkout -b epic/user-management

# Create feature branches from epic
git checkout epic/user-management
git checkout -b feature/user-registration
# Develop user registration...
git checkout epic/user-management
git merge feature/user-registration

git checkout -b feature/user-profile
# Develop user profile...
git checkout epic/user-management
git merge feature/user-profile

# Merge epic when complete
git checkout develop
git merge epic/user-management

# 2. Spike branches for research
git checkout develop
git checkout -b spike/performance-investigation

# Experimental code that won't be merged
echo "// Performance test code" > performance-test.js
git add performance-test.js
git commit -m "spike: test new caching strategy"

# Results documented, branch deleted
git checkout develop
git branch -D spike/performance-investigation

# 3. Integration branches for team coordination
git checkout develop
git checkout -b integration/sprint-15

# Merge multiple features for testing
git merge feature/user-auth
git merge feature/payment-system
git merge feature/notification-service

# Test integration, fix conflicts
echo "// Integration fixes" > integration-fixes.js
git add integration-fixes.js
git commit -m "fix: resolve integration conflicts"

# Merge back to develop after successful testing
git checkout develop
git merge integration/sprint-15

# === COMMIT MESSAGE CONVENTIONS ===

# Conventional Commits specification
git commit -m "feat: add user authentication system

- Implement JWT token-based auth
- Add password hashing with bcrypt
- Include email verification flow

BREAKING CHANGE: Auth API endpoints now require API version header"

git commit -m "fix(api): resolve null pointer in user service

Closes #123
Fixes issue where null user ID caused server crash"

git commit -m "docs: update API documentation for v2 endpoints"

git commit -m "style: format code according to ESLint rules"

git commit -m "refactor: extract validation logic to separate module"

git commit -m "test: add unit tests for authentication service"

git commit -m "chore: update dependencies to latest versions"

# === BRANCH PROTECTION RULES ===

# Protect main branch (via GitHub/GitLab settings)
# - Require pull request reviews (2 reviewers)
# - Require status checks to pass
# - Require up-to-date branches
# - Restrict pushes (admins only)
# - Require linear history

# Example .github/branch-protection.json
{
  "required_status_checks": {
    "strict": true,
    "contexts": ["ci/tests", "ci/lint", "ci/security-scan"]
  },
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "required_approving_review_count": 2,
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": true
  },
  "restrictions": {
    "users": ["admin1", "admin2"],
    "teams": ["core-team"]
  }
}

# === SEMANTIC VERSIONING WITH GIT ===

# Version tagging strategy
git tag -a v1.0.0 -m "Release version 1.0.0 - Initial stable release"
git tag -a v1.0.1 -m "Release version 1.0.1 - Bug fixes"
git tag -a v1.1.0 -m "Release version 1.1.0 - New features"
git tag -a v2.0.0 -m "Release version 2.0.0 - Breaking changes"

# Automated version bumping
# package.json version update
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.1 -> 1.1.0
npm version major  # 1.1.0 -> 2.0.0

# Push tags
git push origin --tags

# === MONOREPO WORKFLOWS ===

# Subtree strategy for shared libraries
git subtree add --prefix=libs/shared-ui git@github.com:company/shared-ui.git main --squash

# Update subtree
git subtree pull --prefix=libs/shared-ui git@github.com:company/shared-ui.git main --squash

# Push changes back to subtree
git subtree push --prefix=libs/shared-ui git@github.com:company/shared-ui.git main

# Submodule strategy (alternative)
git submodule add git@github.com:company/shared-ui.git libs/shared-ui
git submodule update --init --recursive

# Update submodules
git submodule update --remote --merge

# === CONTINUOUS INTEGRATION WORKFLOWS ===

# Pre-commit hooks
# .git/hooks/pre-commit
#!/bin/bash
npm run lint
npm run test
npm run build

# Pre-push hooks
# .git/hooks/pre-push
#!/bin/bash
npm run test:integration
npm run security-scan

# GitHub Actions workflow
# .github/workflows/ci.yml
name: CI/CD Pipeline
on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test:coverage
      - run: npm run lint
      - run: npm run type-check

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm audit
      - run: npm run security-scan

  deploy:
    needs: [test, security]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - run: npm run deploy:production
```
*Notice: Choose workflow based on team size, release frequency, and deployment strategy. Start simple and evolve as needed.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Wrong workflow choice**: Using GitFlow for continuous deployment or GitHub Flow for scheduled releases
- **Branch protection bypass**: Admins pushing directly without review
- **Merge vs rebase confusion**: Inconsistent history due to mixed strategies
- **Feature toggle debt**: Accumulating unused toggles without cleanup
- **Release branch conflicts**: Merging features during code freeze
- **Commit message inconsistency**: No standard format for automated processing

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **Enterprise software**: GitFlow for planned releases and LTS versions
- **Web applications**: GitHub Flow for rapid deployment cycles
- **Mobile apps**: Release Flow for app store approval processes
- **Open source**: Fork-based workflow for external contributions
- **Microservices**: Trunk-based with independent service deployments

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"Explain GitFlow vs GitHub Flow"** → Compare branching strategies and use cases
2. **"How would you handle hotfixes?"** → Emergency deployment strategies
3. **"Describe your ideal CI/CD workflow"** → Integration with Git workflows
4. **"How do you manage feature toggles?"** → Trunk-based development approach
5. **"What's your branching strategy for mobile apps?"** → Release management considerations

</div>

<div class="concept-section related-concepts">

🔗 **Related concepts**  
`Continuous Integration` · `Code Review` · `Release Management` · `Feature Toggles` · `Semantic Versioning`

</div>

<div class="tags">
  <span class="tag">git-workflows</span>
  <span class="tag">branching-strategies</span>
  <span class="tag">gitflow</span>
  <span class="tag">github-flow</span>
  <span class="tag">collaboration</span>
  <span class="tag">medior</span>
</div>

---

### Git Hooks and Automation {#git-hooks-automation}
<!-- tags: git-hooks, automation, pre-commit, ci-cd, quality-gates -->

<div class="concept-section definition">

📋 **Concept Definition**  
**Git hooks are scripts that run automatically at specific points in the Git workflow**. **Client-side hooks**: pre-commit (before commit), prepare-commit-msg (edit commit message), commit-msg (validate message), post-commit (after commit), pre-push (before push). **Server-side hooks**: pre-receive (before refs update), update (per branch), post-receive (after push). **Use cases**: **Code quality enforcement** (linting, formatting), **Security scanning** (secrets detection), **Testing** (unit tests, integration), **Documentation** (auto-generate docs), **Deployment** (trigger CI/CD). **Tools**: Husky (Node.js), pre-commit (Python), Git hooks (native).

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Quality gates**: prevent bad code from entering repository
- **Consistency**: enforce coding standards automatically
- **Security**: scan for secrets and vulnerabilities before push
- **Automation**: reduce manual oversight and human error

</div>

<div class="runnable-model" data-filter="git-hooks">

**Runnable mental model**
```bash
# === CLIENT-SIDE GIT HOOKS ===

# 1. Pre-commit hook - Code quality checks
# .git/hooks/pre-commit
#!/bin/bash
echo "🔍 Running pre-commit checks..."

# Check for linting errors
echo "📋 Checking code style..."
npm run lint
if [ $? -ne 0 ]; then
    echo "❌ Linting failed. Please fix errors before committing."
    exit 1
fi

# Run unit tests
echo "🧪 Running unit tests..."
npm run test:unit
if [ $? -ne 0 ]; then
    echo "❌ Unit tests failed. Please fix tests before committing."
    exit 1
fi

# Check for security vulnerabilities
echo "🔒 Scanning for security issues..."
npm audit --audit-level=moderate
if [ $? -ne 0 ]; then
    echo "⚠️  Security vulnerabilities found. Please review."
    exit 1
fi

# Check for secrets in code
echo "🕵️  Checking for secrets..."
if grep -r "API_KEY\|PASSWORD\|SECRET" src/ --exclude-dir=node_modules; then
    echo "❌ Potential secrets found in code. Please remove."
    exit 1
fi

# Check file size limits
echo "📏 Checking file sizes..."
find . -type f -size +10M -not -path "./.git/*" -not -path "./node_modules/*"
if [ $? -eq 0 ]; then
    echo "⚠️  Large files detected. Consider using Git LFS."
fi

echo "✅ Pre-commit checks passed!"

# 2. Commit message hook - Enforce conventional commits
# .git/hooks/commit-msg
#!/bin/bash
commit_regex='^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .{1,50}'

if ! grep -qE "$commit_regex" "$1"; then
    echo "❌ Invalid commit message format!"
    echo ""
    echo "✅ Valid format: type(scope): description"
    echo ""
    echo "Examples:"
    echo "  feat: add user authentication"
    echo "  fix(api): resolve null pointer exception"
    echo "  docs: update README with setup instructions"
    echo ""
    echo "Types: feat, fix, docs, style, refactor, test, chore"
    exit 1
fi

# Check commit message length
if [ $(cat "$1" | wc -c) -gt 72 ]; then
    echo "⚠️  Commit message too long (max 72 characters)"
    exit 1
fi

echo "✅ Commit message format is valid"

# 3. Pre-push hook - Integration tests and builds
# .git/hooks/pre-push
#!/bin/bash
echo "🚀 Running pre-push checks..."

# Run integration tests
echo "🔗 Running integration tests..."
npm run test:integration
if [ $? -ne 0 ]; then
    echo "❌ Integration tests failed. Push aborted."
    exit 1
fi

# Build production bundle
echo "🏗️  Building production bundle..."
npm run build:prod
if [ $? -ne 0 ]; then
    echo "❌ Production build failed. Push aborted."
    exit 1
fi

# Check bundle size
echo "📦 Checking bundle size..."
BUNDLE_SIZE=$(stat -f%z dist/bundle.js)
MAX_SIZE=1048576  # 1MB

if [ $BUNDLE_SIZE -gt $MAX_SIZE ]; then
    echo "⚠️  Bundle size too large: $(($BUNDLE_SIZE / 1024))KB (max: $(($MAX_SIZE / 1024))KB)"
    echo "Consider code splitting or removing unused dependencies"
    exit 1
fi

echo "✅ Pre-push checks passed!"

# === HUSKY SETUP (Node.js projects) ===

# Install Husky
npm install --save-dev husky

# Initialize Husky
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "npm run lint && npm run test"

# Add commit message hook
npx husky add .husky/commit-msg 'npx commitlint --edit $1'

# Add pre-push hook
npx husky add .husky/pre-push "npm run test:integration"

# Package.json scripts
{
  "scripts": {
    "prepare": "husky install",
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:integration": "jest --config jest.integration.config.js"
  },
  "devDependencies": {
    "husky": "^8.0.0",
    "@commitlint/cli": "^17.0.0",
    "@commitlint/config-conventional": "^17.0.0"
  }
}

# Commitlint configuration
# commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'revert']
    ],
    'subject-max-length': [2, 'always', 50],
    'body-max-line-length': [2, 'always', 72]
  }
};

# === LINT-STAGED FOR PERFORMANCE ===

# Only lint staged files (faster)
npm install --save-dev lint-staged

# .lintstagedrc.js
module.exports = {
  '*.{js,jsx,ts,tsx}': [
    'eslint --fix',
    'prettier --write',
    'jest --bail --passWithNoTests --findRelatedTests'
  ],
  '*.{json,md,yml,yaml}': ['prettier --write'],
  '*.{css,scss}': ['stylelint --fix', 'prettier --write']
};

# Update Husky pre-commit
# .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged

# === SERVER-SIDE HOOKS ===

# 1. Pre-receive hook - Branch protection
# hooks/pre-receive (on Git server)
#!/bin/bash
while read oldrev newrev refname; do
    branch=${refname#refs/heads/}
    
    # Protect main branch
    if [[ "$branch" == "main" ]]; then
        echo "❌ Direct pushes to main branch are not allowed"
        echo "Please use pull requests for main branch changes"
        exit 1
    fi
    
    # Require merge commits for protected branches
    if [[ "$branch" == "develop" ]]; then
        # Check if it's a merge commit (has 2 parents)
        parent_count=$(git rev-list --parents -n 1 $newrev | wc -w)
        if [[ $parent_count -lt 3 ]]; then
            echo "❌ Non-merge commits to develop branch are not allowed"
            echo "Please use 'git merge --no-ff' for develop branch"
            exit 1
        fi
    fi
done

# 2. Post-receive hook - Deployment trigger
# hooks/post-receive (on Git server)
#!/bin/bash
while read oldrev newrev refname; do
    branch=${refname#refs/heads/}
    
    # Deploy staging when develop branch is updated
    if [[ "$branch" == "develop" ]]; then
        echo "🚀 Triggering staging deployment..."
        curl -X POST "https://ci.company.com/trigger/staging" \
             -H "Authorization: Bearer $CI_TOKEN" \
             -d "branch=develop&commit=$newrev"
    fi
    
    # Deploy production when main branch is updated
    if [[ "$branch" == "main" ]]; then
        echo "🚀 Triggering production deployment..."
        
        # Check if it's a tagged release
        if git describe --exact-match $newrev 2>/dev/null; then
            curl -X POST "https://ci.company.com/trigger/production" \
                 -H "Authorization: Bearer $CI_TOKEN" \
                 -d "branch=main&commit=$newrev&tag=$(git describe --exact-match $newrev)"
        else
            echo "⚠️  No tag found for commit. Skipping production deployment."
        fi
    fi
done

# Send notification to team
curl -X POST "https://hooks.slack.com/webhook" \
     -d "text=🎉 New deployment triggered for $branch branch"

# === ADVANCED AUTOMATION EXAMPLES ===

# 1. Automatic dependency updates
# .github/workflows/dependency-update.yml
name: Dependency Updates
on:
  schedule:
    - cron: '0 2 * * 1'  # Every Monday at 2 AM

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm update
      - run: npm audit fix
      - run: npm test
      - name: Create PR
        run: |
          git checkout -b deps/automated-update-$(date +%Y%m%d)
          git add package*.json
          git commit -m "chore: automated dependency updates"
          git push origin deps/automated-update-$(date +%Y%m%d)
          # Create PR via GitHub API

# 2. Automatic code formatting
# .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Format staged files
npx pretty-quick --staged

# Re-add formatted files
git add .

# 3. Security scanning automation
# .github/workflows/security.yml
name: Security Scan
on: [push, pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run security audit
        run: |
          npm audit --audit-level=high
          npx safety-check
          git secrets --scan

      - name: Upload security report
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: security-report.sarif

# 4. Automatic documentation generation
# hooks/post-commit
#!/bin/bash
# Generate API documentation after each commit
if git diff HEAD~1 HEAD --name-only | grep -q "src/.*\.js$"; then
    echo "📚 Generating API documentation..."
    npm run docs:generate
    
    if [[ -n $(git status --porcelain docs/) ]]; then
        git add docs/
        git commit -m "docs: auto-update API documentation"
    fi
fi

# 5. Performance monitoring
# .husky/pre-push
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "⚡ Running performance benchmarks..."

# Run lighthouse CI
npx lhci autorun

# Bundle size analysis
npx bundlesize

# Memory leak detection
npm run test:memory

# === TROUBLESHOOTING HOOKS ===

# Skip hooks temporarily (emergency)
git commit --no-verify -m "emergency: critical hotfix"
git push --no-verify

# Debug hook execution
chmod +x .git/hooks/pre-commit  # Ensure executable
bash -x .git/hooks/pre-commit   # Debug mode

# Share hooks across team (via repository)
# Move hooks to .githooks/ directory
mkdir .githooks
mv .git/hooks/pre-commit .githooks/

# Configure Git to use repository hooks
git config core.hooksPath .githooks

# Make hooks executable for all team members
chmod +x .githooks/*

# === HOOK TEMPLATES ===

# Template for comprehensive pre-commit hook
#!/bin/bash
set -e  # Exit on any error

echo "🔍 Pre-commit checks starting..."

# 1. Lint staged files
echo "📋 Linting staged files..."
npx lint-staged

# 2. Type checking
if command -v tsc &> /dev/null; then
    echo "🏷️  Type checking..."
    npx tsc --noEmit
fi

# 3. Unit tests for changed files
echo "🧪 Testing changed files..."
npm run test -- --bail --passWithNoTests --findRelatedTests $(git diff --cached --name-only --diff-filter=ACM | grep -E "\.(js|jsx|ts|tsx)$" | tr '\n' ' ')

# 4. Security checks
echo "🔒 Security scanning..."
if command -v semgrep &> /dev/null; then
    semgrep --config=auto src/
fi

# 5. Dependency check
echo "📦 Dependency audit..."
npm audit --audit-level=moderate

echo "✅ All pre-commit checks passed!"
```
*Notice: Git hooks enforce quality gates automatically but should be fast to avoid hindering developer productivity.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Slow hooks**: Taking too long and blocking developer workflow
- **Brittle hooks**: Failing due to environment differences or missing dependencies
- **No bypass mechanism**: No way to skip hooks for emergency commits
- **Poor error messages**: Unclear feedback when hooks fail
- **Inconsistent enforcement**: Some developers bypassing hooks with --no-verify
- **Hook distribution**: Not sharing hooks properly across team members

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **Code quality**: automated linting, formatting, and style enforcement
- **Security**: secret scanning, vulnerability detection, compliance checks
- **Testing**: automated test execution before commits and pushes
- **Documentation**: auto-generation of docs, changelog updates
- **Deployment**: triggering CI/CD pipelines and notifications

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"How do you enforce code quality in Git?"** → Git hooks and automation strategies
2. **"Describe your pre-commit workflow"** → Quality gates and testing approach
3. **"How would you prevent secrets in repositories?"** → Security scanning and prevention
4. **"What's your approach to commit message standards?"** → Conventional commits and automation
5. **"How do you handle hook failures in CI/CD?"** → Error handling and bypass mechanisms

</div>

<div class="concept-section related-concepts">

🔗 **Related concepts**  
`Continuous Integration` · `Code Quality` · `Security Scanning` · `Automated Testing` · `DevOps`

</div>

<div class="tags">
  <span class="tag">git-hooks</span>
  <span class="tag">automation</span>
  <span class="tag">quality-gates</span>
  <span class="tag">ci-cd</span>
  <span class="tag">security</span>
  <span class="tag">medior</span>
</div>

---

### Advanced Git Workflows {#advanced-git-workflows}
<!-- tags: git-workflows, branching-strategies, gitflow, github-flow, gitlab-flow -->

<div class="concept-section definition">

📋 **Concept Definition**  
**Git workflows define structured approaches for managing branches, releases, and collaboration**. **GitFlow**: uses main/develop branches plus feature/release/hotfix branches for scheduled releases. **GitHub Flow**: lightweight with main branch and feature branches via pull requests for continuous deployment. **GitLab Flow**: combines GitHub Flow with environment branches for staged deployments. **Trunk-Based Development**: single main branch with feature toggles for rapid integration. **Release Flow**: Microsoft's approach with release branches for long-term support. **Key considerations**: team size, release frequency, deployment strategy, code review requirements.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Team coordination**: standardized processes reduce conflicts and confusion
- **Release management**: structured approach to versioning and deployment
- **Quality control**: mandatory code reviews and testing integration
- **Risk mitigation**: hotfix procedures and rollback strategies

</div>

<div class="runnable-model" data-filter="git-workflows">

**Runnable mental model**
```bash
# GITFLOW WORKFLOW COMPLETE EXAMPLE

# Initial setup
git init my-enterprise-app
cd my-enterprise-app

# Create main and develop branches
git checkout -b main
echo "# Enterprise App v1.0.0" > README.md
git add README.md
git commit -m "chore: initial commit"
git push -u origin main

git checkout -b develop
echo "Version: 1.1.0-dev" >> README.md
git add README.md
git commit -m "chore: setup develop branch"
git push -u origin develop

# Feature development
git checkout develop
git pull origin develop
git checkout -b feature/user-authentication

# Implement authentication feature
mkdir auth
cat > auth/login.js << 'EOF'
class AuthService {
  async login(username, password) {
    const user = await this.validateCredentials(username, password);
    const token = this.generateJWT(user);
    return { user, token };
  }
  
  async validateCredentials(username, password) {
    // Hash password and check against database
    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.findOne({ username, password: hashedPassword });
  }
  
  generateJWT(user) {
    return jwt.sign({ userId: user.id, role: user.role }, 
                   process.env.JWT_SECRET, { expiresIn: '24h' });
  }
}

module.exports = AuthService;
EOF

cat > auth/middleware.js << 'EOF'
const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = { requireAuth };
EOF

git add auth/
git commit -m "feat: implement JWT-based authentication system

- Add AuthService class with login/validation
- Implement JWT token generation
- Add authentication middleware for protected routes
- Include password hashing with bcrypt
- Set token expiration to 24 hours"

# Continue feature development
cat > auth/routes.js << 'EOF'
const express = require('express');
const AuthService = require('./login');
const { requireAuth } = require('./middleware');

const router = express.Router();
const authService = new AuthService();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await authService.login(username, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

router.post('/logout', requireAuth, (req, res) => {
  // Token invalidation logic (blacklist, refresh token rotation)
  res.json({ message: 'Logged out successfully' });
});

router.get('/profile', requireAuth, async (req, res) => {
  const user = await User.findById(req.user.userId);
  res.json({ user: { id: user.id, username: user.username, role: user.role } });
});

module.exports = router;
EOF

git add auth/routes.js
git commit -m "feat: add authentication REST API endpoints

- POST /auth/login for user authentication
- POST /auth/logout with token invalidation
- GET /auth/profile for user profile retrieval
- Comprehensive error handling and validation"

# Merge feature back to develop
git checkout develop
git merge --no-ff feature/user-authentication -m "Merge feature/user-authentication

Complete JWT-based authentication system:
- Secure login/logout functionality
- Protected route middleware
- User profile management
- Password hashing and token validation"

git push origin develop
git branch -d feature/user-authentication

# Develop dashboard feature in parallel
git checkout -b feature/admin-dashboard

mkdir dashboard
cat > dashboard/admin.js << 'EOF'
class AdminDashboard {
  constructor(authService) {
    this.authService = authService;
  }
  
  async getUserStats() {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ 
      lastLogin: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });
    const newUsers = await User.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });
    
    return { totalUsers, activeUsers, newUsers };
  }
  
  async getSystemHealth() {
    const memoryUsage = process.memoryUsage();
    const uptime = process.uptime();
    const loadAverage = os.loadavg();
    
    return {
      memory: {
        used: memoryUsage.heapUsed,
        total: memoryUsage.heapTotal,
        percentage: (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100
      },
      uptime: Math.floor(uptime / 3600) + ' hours',
      loadAverage: loadAverage[0].toFixed(2)
    };
  }
}

module.exports = AdminDashboard;
EOF

git add dashboard/
git commit -m "feat: implement admin dashboard with system metrics

- User statistics (total, active, new users)
- System health monitoring (memory, uptime, load)
- Real-time performance metrics
- Admin-only access controls"

# Create release branch
git checkout develop
git pull origin develop
git checkout -b release/1.1.0

# Update version numbers
echo "Version: 1.1.0" > VERSION
git add VERSION
git commit -m "chore: bump version to 1.1.0"

# Bug fix during release testing
cat > auth/validation.js << 'EOF'
function validatePassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  if (password.length < minLength) {
    throw new Error('Password must be at least 8 characters long');
  }
  
  if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
    throw new Error('Password must contain uppercase, lowercase, number and special character');
  }
  
  return true;
}

module.exports = { validatePassword };
EOF

git add auth/validation.js
git commit -m "fix: add comprehensive password validation

- Minimum 8 character length requirement
- Must contain uppercase, lowercase, numbers, special characters
- Improves security compliance for enterprise deployment"

# Merge release to main (production deployment)
git checkout main
git merge --no-ff release/1.1.0 -m "Release version 1.1.0

Features:
- JWT-based authentication system
- Admin dashboard with user statistics
- System health monitoring
- Enhanced password validation

Security improvements:
- Secure token handling
- Password complexity requirements
- Protected route middleware"

git tag -a v1.1.0 -m "Release version 1.1.0 - Authentication and Admin Dashboard"
git push origin main --tags

# Merge release fixes back to develop
git checkout develop
git merge --no-ff release/1.1.0 -m "Merge release/1.1.0 fixes into develop"
git push origin develop
git branch -d release/1.1.0

# Production hotfix scenario
git checkout main
git checkout -b hotfix/xss-vulnerability

# Critical security fix
cat > auth/sanitizer.js << 'EOF'
const DOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const purify = DOMPurify(window);

function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return input;
  }
  
  // Remove script tags and malicious content
  const clean = purify.sanitize(input, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'],
    ALLOWED_ATTR: []
  });
  
  // Additional XSS protection
  return clean
    .replace(/javascript:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/on\w+=/gi, '');
}

function validateJSON(input) {
  try {
    const parsed = JSON.parse(input);
    return sanitizeObject(parsed);
  } catch (error) {
    throw new Error('Invalid JSON format');
  }
}

function sanitizeObject(obj) {
  if (typeof obj === 'string') {
    return sanitizeInput(obj);
  }
  
  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }
  
  if (obj && typeof obj === 'object') {
    const sanitized = {};
    for (const [key, value] of Object.entries(obj)) {
      sanitized[sanitizeInput(key)] = sanitizeObject(value);
    }
    return sanitized;
  }
  
  return obj;
}

module.exports = { sanitizeInput, validateJSON, sanitizeObject };
EOF

# Update authentication to use sanitization
cat > auth/login.js << 'EOF'
const { sanitizeInput } = require('./sanitizer');

class AuthService {
  async login(username, password) {
    // Sanitize inputs to prevent XSS
    const cleanUsername = sanitizeInput(username);
    const cleanPassword = sanitizeInput(password);
    
    const user = await this.validateCredentials(cleanUsername, cleanPassword);
    const token = this.generateJWT(user);
    return { user, token };
  }
  
  async validateCredentials(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.findOne({ username, password: hashedPassword });
  }
  
  generateJWT(user) {
    return jwt.sign({ userId: user.id, role: user.role }, 
                   process.env.JWT_SECRET, { expiresIn: '24h' });
  }
}

module.exports = AuthService;
EOF

git add auth/sanitizer.js auth/login.js
git commit -m "SECURITY: fix XSS vulnerability in user input handling

- Add comprehensive input sanitization with DOMPurify
- Prevent script injection in authentication endpoints
- Sanitize JSON payloads and object properties
- Remove dangerous JavaScript/VBScript protocols
- Apply sanitization to all user-controllable inputs

CVE: Fixes potential XSS in login form and profile updates"

# Emergency deployment
git checkout main
git merge --no-ff hotfix/xss-vulnerability -m "HOTFIX: XSS vulnerability patch

Critical security update addressing XSS vulnerability
in user input handling. All production instances
must be updated immediately."

git tag -a v1.1.1 -m "HOTFIX v1.1.1 - XSS Security Patch"
git push origin main --tags

# Merge hotfix to develop
git checkout develop
git merge --no-ff hotfix/xss-vulnerability -m "Merge security hotfix into develop"
git push origin develop
git branch -d hotfix/xss-vulnerability

# GITHUB FLOW WORKFLOW EXAMPLE

git init my-web-service
cd my-web-service

# Setup main branch with CI/CD
git checkout -b main
echo "# Web Service API" > README.md
git add README.md
git commit -m "chore: initial commit"
git push -u origin main

# GitHub Actions workflow
mkdir -p .github/workflows
cat > .github/workflows/ci-cd.yml << 'EOF'
name: CI/CD Pipeline

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linting
        run: npm run lint
      
      - name: Run tests
        run: npm test -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
      
      - name: Build application
        run: npm run build

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run security audit
        run: npm audit --audit-level moderate
      
      - name: SAST scan
        uses: github/super-linter@v4
        env:
          DEFAULT_BRANCH: main
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

  deploy:
    needs: [test, security]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to staging
        run: echo "Deploying to staging environment"
      
      - name: Run integration tests
        run: echo "Running integration tests against staging"
      
      - name: Deploy to production
        if: success()
        run: echo "Deploying to production environment"
EOF

git add .github/
git commit -m "ci: add comprehensive CI/CD pipeline

- Automated testing with coverage reporting
- Security scanning and dependency audit
- Linting and code quality checks
- Automated deployment to staging and production
- Integration test validation"

git push origin main

# Feature development with pull request
git checkout -b feature/rate-limiting

# Implement rate limiting
mkdir middleware
cat > middleware/rateLimit.js << 'EOF'
const redis = require('redis');
const client = redis.createClient();

class RateLimiter {
  constructor(options = {}) {
    this.windowMs = options.windowMs || 15 * 60 * 1000; // 15 minutes
    this.maxRequests = options.maxRequests || 100;
    this.keyGenerator = options.keyGenerator || ((req) => req.ip);
  }
  
  async isAllowed(req) {
    const key = `rate_limit:${this.keyGenerator(req)}`;
    const current = await client.get(key);
    
    if (current === null) {
      await client.setex(key, this.windowMs / 1000, 1);
      return { allowed: true, remaining: this.maxRequests - 1 };
    }
    
    const requests = parseInt(current);
    if (requests >= this.maxRequests) {
      const ttl = await client.ttl(key);
      return { 
        allowed: false, 
        remaining: 0, 
        resetTime: Date.now() + (ttl * 1000) 
      };
    }
    
    await client.incr(key);
    return { allowed: true, remaining: this.maxRequests - requests - 1 };
  }
  
  middleware() {
    return async (req, res, next) => {
      try {
        const result = await this.isAllowed(req);
        
        res.set({
          'X-RateLimit-Limit': this.maxRequests,
          'X-RateLimit-Remaining': result.remaining,
          'X-RateLimit-Window': this.windowMs
        });
        
        if (!result.allowed) {
          res.set('X-RateLimit-Reset', result.resetTime);
          return res.status(429).json({
            error: 'Too Many Requests',
            message: 'Rate limit exceeded',
            retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000)
          });
        }
        
        next();
      } catch (error) {
        console.error('Rate limiting error:', error);
        next(); // Fail open - don't block requests if Redis is down
      }
    };
  }
}

module.exports = RateLimiter;
EOF

# Add comprehensive tests
mkdir tests
cat > tests/rateLimit.test.js << 'EOF'
const RateLimiter = require('../middleware/rateLimit');
const redis = require('redis-mock');

jest.mock('redis', () => redis);

describe('RateLimiter', () => {
  let rateLimiter;
  let mockReq;
  let mockRes;
  let mockNext;
  
  beforeEach(() => {
    rateLimiter = new RateLimiter({ maxRequests: 5, windowMs: 60000 });
    mockReq = { ip: '127.0.0.1' };
    mockRes = {
      set: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
  });
  
  test('should allow requests within limit', async () => {
    const middleware = rateLimiter.middleware();
    
    for (let i = 0; i < 5; i++) {
      await middleware(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
    }
  });
  
  test('should block requests exceeding limit', async () => {
    const middleware = rateLimiter.middleware();
    
    // Exhaust the limit
    for (let i = 0; i < 5; i++) {
      await middleware(mockReq, mockRes, mockNext);
    }
    
    // This should be blocked
    await middleware(mockReq, mockRes, mockNext);
    expect(mockRes.status).toHaveBeenCalledWith(429);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: 'Too Many Requests'
      })
    );
  });
  
  test('should set appropriate headers', async () => {
    const middleware = rateLimiter.middleware();
    await middleware(mockReq, mockRes, mockNext);
    
    expect(mockRes.set).toHaveBeenCalledWith({
      'X-RateLimit-Limit': 5,
      'X-RateLimit-Remaining': 4,
      'X-RateLimit-Window': 60000
    });
  });
});
EOF

git add middleware/ tests/
git commit -m "feat: implement Redis-based rate limiting

- Configurable rate limits per IP address
- Sliding window algorithm with Redis backend
- Comprehensive HTTP headers for client awareness
- Fail-open strategy for Redis unavailability
- Full test coverage including edge cases

Prevents API abuse and ensures fair resource usage"

# Add documentation
cat > docs/rate-limiting.md << 'EOF'
# Rate Limiting

## Overview

The API implements rate limiting to prevent abuse and ensure fair usage of resources.

## Configuration

- **Default limit**: 100 requests per 15 minutes per IP
- **Headers**: Response includes rate limit information
- **Storage**: Redis-based with automatic expiration

## Headers

| Header | Description |
|--------|-------------|
| `X-RateLimit-Limit` | Maximum requests allowed |
| `X-RateLimit-Remaining` | Requests remaining in window |
| `X-RateLimit-Window` | Window duration in milliseconds |
| `X-RateLimit-Reset` | When rate limit resets (Unix timestamp) |

## Error Response

```json
{
  "error": "Too Many Requests",
  "message": "Rate limit exceeded",
  "retryAfter": 300
}
```

## Customization

```javascript
const rateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  maxRequests: 100,          // requests per window
  keyGenerator: (req) => req.user?.id || req.ip  // custom key
});
```
EOF

git add docs/
git commit -m "docs: add comprehensive rate limiting documentation

- Configuration options and defaults
- HTTP header specifications
- Error response format examples
- Customization guide for different use cases"

# Push feature branch and create PR
git push -u origin feature/rate-limiting

# PR Description would be:
# ## Rate Limiting Implementation
# 
# Implements Redis-based rate limiting to prevent API abuse and ensure fair resource usage.
# 
# ### Changes
# - Added configurable rate limiter with sliding window algorithm
# - Comprehensive test coverage (95%+)
# - Fail-open strategy for Redis unavailability
# - Full documentation with examples
# 
# ### Testing
# - Unit tests for all rate limiting scenarios
# - Integration tests with Redis
# - Performance tests under load
# 
# ### Security
# - Prevents brute force attacks
# - Protects against API abuse
# - Configurable per-endpoint limits

# After PR approval and merge
git checkout main
git pull origin main
git branch -d feature/rate-limiting

# TRUNK-BASED DEVELOPMENT EXAMPLE

git init my-saas-platform
cd my-saas-platform

# Single main branch setup
git checkout -b main
echo "# SaaS Platform" > README.md
git add README.md
git commit -m "chore: initial commit"
git push -u origin main

# Feature flags configuration
cat > config/features.js << 'EOF'
const features = {
  // Billing features
  NEW_BILLING_SYSTEM: process.env.ENABLE_NEW_BILLING === 'true',
  SUBSCRIPTION_TIERS: process.env.ENABLE_SUBSCRIPTION_TIERS === 'true',
  
  // UI features
  DARK_MODE: process.env.ENABLE_DARK_MODE === 'true',
  NEW_DASHBOARD: process.env.ENABLE_NEW_DASHBOARD === 'true',
  
  // AI features
  AI_RECOMMENDATIONS: process.env.ENABLE_AI_RECOMMENDATIONS === 'true',
  CHATBOT_SUPPORT: process.env.ENABLE_CHATBOT_SUPPORT === 'true',
  
  // Security features
  TWO_FACTOR_AUTH: process.env.ENABLE_2FA === 'true',
  AUDIT_LOGGING: process.env.ENABLE_AUDIT_LOGGING === 'true'
};

function isFeatureEnabled(featureName, user = null) {
  const baseEnabled = features[featureName];
  
  if (!baseEnabled) return false;
  
  // User-specific feature flags
  if (user?.betaFeatures?.includes(featureName)) {
    return true;
  }
  
  // Gradual rollout logic
  const rolloutConfig = getRolloutConfig(featureName);
  if (rolloutConfig.percentage < 100) {
    const userHash = hashUserId(user?.id || 'anonymous');
    return userHash < rolloutConfig.percentage;
  }
  
  return true;
}

function getRolloutConfig(featureName) {
  const rollouts = {
    NEW_BILLING_SYSTEM: { percentage: 10 },  // 10% rollout
    AI_RECOMMENDATIONS: { percentage: 25 },  // 25% rollout
    NEW_DASHBOARD: { percentage: 50 },       // 50% rollout
    DARK_MODE: { percentage: 100 }           // Full rollout
  };
  
  return rollouts[featureName] || { percentage: 100 };
}

function hashUserId(userId) {
  // Simple hash function for demo (use crypto in production)
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    const char = userId.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash) % 100;
}

module.exports = { isFeatureEnabled, features };
EOF

git add config/
git commit -m "feat: implement feature flag system with gradual rollout

- Configurable feature flags via environment variables
- User-specific beta feature access
- Percentage-based gradual rollout
- Deterministic user hashing for consistent experience"

# Implement new billing system (behind feature flag)
git checkout main  # Always work on main in trunk-based
git pull origin main

mkdir billing
cat > billing/service.js << 'EOF'
const { isFeatureEnabled } = require('../config/features');

class BillingService {
  async processPayment(user, amount, paymentMethod) {
    if (isFeatureEnabled('NEW_BILLING_SYSTEM', user)) {
      return this.processPaymentV2(user, amount, paymentMethod);
    } else {
      return this.processPaymentV1(user, amount, paymentMethod);
    }
  }
  
  async processPaymentV1(user, amount, paymentMethod) {
    // Legacy billing system (Stripe Charges API)
    console.log('Using legacy billing system');
    
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    
    try {
      const charge = await stripe.charges.create({
        amount: amount * 100, // Convert to cents
        currency: 'usd',
        source: paymentMethod.token,
        description: `Payment for user ${user.id}`
      });
      
      return {
        success: true,
        transactionId: charge.id,
        amount: charge.amount / 100,
        system: 'legacy'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        system: 'legacy'
      };
    }
  }
  
  async processPaymentV2(user, amount, paymentMethod) {
    // New billing system (Stripe Payment Intents API)
    console.log('Using new billing system');
    
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: 'usd',
        payment_method: paymentMethod.id,
        confirmation_method: 'manual',
        confirm: true,
        customer: user.stripeCustomerId
      });
      
      return {
        success: paymentIntent.status === 'succeeded',
        transactionId: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        system: 'new',
        requiresAction: paymentIntent.status === 'requires_action',
        clientSecret: paymentIntent.client_secret
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        system: 'new'
      };
    }
  }
  
  async getSubscriptionTiers(user) {
    if (!isFeatureEnabled('SUBSCRIPTION_TIERS', user)) {
      return this.getLegacyPlans();
    }
    
    return [
      {
        id: 'starter',
        name: 'Starter',
        price: 9.99,
        features: ['Basic features', '1 user', 'Email support']
      },
      {
        id: 'professional',
        name: 'Professional',
        price: 29.99,
        features: ['Advanced features', '10 users', 'Priority support', 'API access']
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: 99.99,
        features: ['All features', 'Unlimited users', '24/7 support', 'Custom integrations']
      }
    ];
  }
  
  getLegacyPlans() {
    return [
      { id: 'basic', name: 'Basic', price: 19.99 },
      { id: 'premium', name: 'Premium', price: 49.99 }
    ];
  }
}

module.exports = BillingService;
EOF

git add billing/
git commit -m "feat: implement new billing system behind feature flag

- Stripe Payment Intents API with 3D Secure support
- Backwards compatible with legacy Charges API
- Feature flag controls which system is used
- Support for subscription tiers with granular features
- Improved error handling and transaction tracking"

# Commit directly to main (< 24 hours development)
git push origin main

# Deploy immediately (feature is hidden by default)
# Production environment: ENABLE_NEW_BILLING=false

# Enable for internal testing
# Staging environment: ENABLE_NEW_BILLING=true

# Gradual rollout (modify config to enable for 10% of users)
git checkout main
git pull origin main

# No feature branch needed - small change
sed -i 's/NEW_BILLING_SYSTEM: { percentage: 10 }/NEW_BILLING_SYSTEM: { percentage: 10 }/' config/features.js

git add config/features.js
git commit -m "feat: enable new billing system for 10% of users

Gradual rollout starting with 10% of users based on 
deterministic user ID hashing. Monitoring for:
- Transaction success rates
- Error rates
- Performance metrics
- Customer feedback"

git push origin main

# Monitor metrics for 1 week, then increase rollout
```
*Notice: Advanced Git workflows require team agreement and tooling support. Choose based on team size, release frequency, and deployment requirements.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Wrong workflow choice**: Using GitFlow for continuous deployment or GitHub Flow for scheduled releases
- **Feature branch lifespan**: Keeping feature branches alive too long increases merge conflicts
- **Release branch pollution**: Adding new features to release branches instead of bug fixes only
- **Hotfix bypass**: Not merging hotfixes to develop branch, causing regression
- **PR reviews**: Insufficient code review or rubber-stamp approvals
- **Feature flag cleanup**: Leaving dead feature flags in codebase after rollout

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **Enterprise software**: GitFlow for scheduled quarterly releases
- **Web applications**: GitHub Flow for continuous deployment
- **Mobile apps**: Release Flow for app store submissions
- **SaaS platforms**: Trunk-based with feature flags for rapid iteration
- **Open source**: Fork-based workflow for external contributors

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"Explain GitFlow vs GitHub Flow"** → Release strategy and branch management differences
2. **"How to handle hotfixes?"** → Emergency deployment procedures
3. **"Feature flag implementation"** → Gradual rollout and A/B testing strategies
4. **"Code review best practices"** → Quality gates and collaboration
5. **"CI/CD integration"** → Automated testing and deployment pipelines
6. **"Merge conflicts resolution"** → Prevention and resolution strategies

</div>

<div class="concept-section related-algorithms">

🔗 **Related concepts**  
`Version Control` · `Continuous Integration` · `Feature Flags` · `Code Review` · `Release Management`

</div>

<div class="tags">
  <span class="tag">git-workflows</span>
  <span class="tag">branching-strategies</span>
  <span class="tag">gitflow</span>
  <span class="tag">github-flow</span>
  <span class="tag">feature-flags</span>
  <span class="tag">medior</span>
</div>

---

### Git Performance and Optimization {#git-performance-optimization}
<!-- tags: git-performance, large-repositories, git-lfs, shallow-clones -->

<div class="concept-section definition">

📋 **Concept Definition**  
**Git performance optimization becomes critical for large repositories with extensive history or large files**. **Techniques**: **Shallow clones** (limited history), **Partial clones** (limited objects), **Git LFS** (Large File Storage), **Sparse checkout** (limited working directory), **Git maintenance** (optimization commands), **Pack files** (compression), **Reference cleanup** (pruning), **Submodules** (repository decomposition). **Challenges**: large binaries, monorepo scalability, network bandwidth, disk space usage. **Solutions**: strategic repository structure, automated cleanup, efficient workflows.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Scalability**: handle large repositories and teams efficiently
- **Performance**: faster clones, fetches, and operations
- **Storage**: reduce disk usage and network bandwidth
- **Developer experience**: maintain responsiveness as repository grows

</div>

<div class="runnable-model" data-filter="git-performance">

**Runnable mental model**
```bash
# GIT PERFORMANCE OPTIMIZATION TECHNIQUES

# 1. SHALLOW CLONES - Limit history depth
echo "=== SHALLOW CLONES ==="

# Clone only the latest commit (fastest)
git clone --depth 1 https://github.com/user/large-repo.git
cd large-repo

# Check repository size
du -sh .git  # Much smaller than full clone

# Clone with limited depth (e.g., last 50 commits)
git clone --depth 50 https://github.com/user/project.git

# Convert existing repository to shallow
git fetch --depth 1
git gc --prune=all

# Unshallow when full history is needed
git fetch --unshallow

# 2. PARTIAL CLONES - Limit objects
echo "=== PARTIAL CLONES ==="

# Clone without blobs (files), fetch on demand
git clone --filter=blob:none https://github.com/user/repo.git
cd repo

# Clone without large blobs (>1MB)
git clone --filter=blob:limit=1m https://github.com/user/repo.git

# Clone without trees (directory structure), fetch on demand
git clone --filter=tree:0 https://github.com/user/repo.git

# Combined filters
git clone --filter=combine:blob:limit=1m+tree:0 https://github.com/user/repo.git

# Check what's missing
git rev-list --objects --all --missing=print | head

# Fetch missing objects when needed
git fetch origin

# 3. SPARSE CHECKOUT - Limit working directory
echo "=== SPARSE CHECKOUT ==="

git clone https://github.com/user/monorepo.git
cd monorepo

# Enable sparse checkout
git config core.sparseCheckout true

# Define which paths to include
cat > .git/info/sparse-checkout << 'EOF'
# Include only specific directories
frontend/
shared/utils/
docs/
!docs/archived/
*.md
EOF

# Apply sparse checkout
git read-tree -m -u HEAD

# Verify only specified files are in working directory
ls -la

# Add more paths
echo "backend/api/" >> .git/info/sparse-checkout
git read-tree -m -u HEAD

# Disable sparse checkout (restore all files)
git config core.sparseCheckout false
git read-tree -m -u HEAD

# 4. GIT LFS - Large File Storage
echo "=== GIT LFS SETUP ==="

# Install Git LFS
git lfs install

# Track large file types
git lfs track "*.psd"
git lfs track "*.zip"
git lfs track "*.mp4"
git lfs track "*.exe"
git lfs track "videos/*"

# Check tracked patterns
cat .gitattributes

# Add and commit (files automatically uploaded to LFS)
git add assets/video.mp4
git commit -m "feat: add product demo video"

# Check LFS status
git lfs ls-files

# Clone with LFS
git clone https://github.com/user/repo-with-lfs.git
cd repo-with-lfs

# Download LFS files
git lfs pull

# Clone without downloading LFS files initially
GIT_LFS_SKIP_SMUDGE=1 git clone https://github.com/user/repo-with-lfs.git
cd repo-with-lfs

# Download specific LFS files when needed
git lfs pull --include="videos/*.mp4"

# LFS storage usage
git lfs ls-files --size

# Migrate existing large files to LFS
git lfs migrate import --include="*.zip" --everything

# 5. REPOSITORY MAINTENANCE
echo "=== REPOSITORY MAINTENANCE ==="

# Check repository health
git fsck --full

# Optimize repository (cleanup, repack, prune)
git gc --aggressive --prune=now

# Check repository size
git count-objects -vH

# Clean up unreachable objects
git reflog expire --expire=now --all
git gc --prune=now

# Remove large objects from history
git filter-branch --tree-filter 'rm -f large-file.zip' HEAD
git for-each-ref --format='delete %(refname)' refs/original | git update-ref --stdin
git reflog expire --expire=now --all
git gc --aggressive --prune=now

# Alternative: use git-filter-repo (recommended)
# pip install git-filter-repo
# git filter-repo --path large-file.zip --invert-paths

# 6. PERFORMANCE CONFIGURATION
echo "=== PERFORMANCE CONFIGURATION ==="

# Configure Git for better performance
git config --global core.precomposeunicode true
git config --global core.untrackedCache true
git config --global core.fsmonitor true

# Increase pack window for better compression
git config --global pack.window 250
git config --global pack.depth 250

# Use multiple threads for operations
git config --global pack.threads 0  # Use all available cores

# Configure delta compression
git config --global core.deltaBaseCacheLimit 2g

# Enable commit graph for faster operations
git config --global core.commitGraph true
git config --global gc.writeCommitGraph true

# Generate commit graph
git commit-graph write --reachable --changed-paths

# 7. NETWORK OPTIMIZATION
echo "=== NETWORK OPTIMIZATION ==="

# Use SSH with compression
git config --global core.compression 9

# Configure SSH multiplexing
cat >> ~/.ssh/config << 'EOF'
Host github.com
    ControlMaster auto
    ControlPath ~/.ssh/sockets/%r@%h-%p
    ControlPersist 600
EOF

# Create socket directory
mkdir -p ~/.ssh/sockets

# Use bundle for offline transfers
git bundle create repo-backup.bundle --all
# Transfer bundle file and restore:
git clone repo-backup.bundle repo-restored

# 8. SUBMODULES OPTIMIZATION
echo "=== SUBMODULES OPTIMIZATION ==="

# Add submodule with shallow clone
git submodule add --depth 1 https://github.com/user/library.git libs/library

# Configure submodules for performance
git config --global submodule.recurse true
git config --global diff.submodule log
git config --global status.submodulesummary 1

# Update submodules efficiently
git submodule update --init --recursive --depth 1

# Parallel submodule operations
git config --global submodule.fetchJobs 4

# 9. MONITORING AND DIAGNOSTICS
echo "=== MONITORING AND DIAGNOSTICS ==="

# Analyze repository size
git rev-list --objects --all | \
  git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | \
  awk '/^blob/ {print substr($0,6)}' | \
  sort --numeric-sort --key=2 | \
  tail -20

# Find largest files in history
git rev-list --objects --all | \
  git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | \
  grep '^blob' | \
  sort -k3nr | \
  head -10

# Track repository growth over time
git log --oneline --since="1 month ago" | wc -l

# Check pack file efficiency
git verify-pack -v .git/objects/pack/*.idx | \
  sort -k 3 -nr | \
  head -20

# 10. AUTOMATED MAINTENANCE SCRIPT
cat > .github/workflows/git-maintenance.yml << 'EOF'
name: Git Repository Maintenance

on:
  schedule:
    - cron: '0 2 * * 0'  # Weekly on Sunday at 2 AM
  workflow_dispatch:

jobs:
  maintenance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Full history needed for maintenance
      
      - name: Configure Git
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
      
      - name: Repository Health Check
        run: |
          echo "=== Repository Statistics ==="
          git count-objects -vH
          
          echo "=== Largest Files ==="
          git rev-list --objects --all | \
            git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | \
            awk '/^blob/ {print $3, $4}' | \
            sort -nr | head -10
      
      - name: Cleanup and Optimization
        run: |
          # Clean up loose objects
          git gc --auto
          
          # Update commit graph
          git commit-graph write --reachable --changed-paths
          
          # Cleanup reflog (keep 30 days)
          git reflog expire --expire=30.days --all
          
          # Prune old objects
          git gc --prune=30.days.ago
      
      - name: LFS Cleanup
        if: hashFiles('.gitattributes') != ''
        run: |
          # Prune old LFS objects
          git lfs prune --verify-remote
      
      - name: Generate Repository Report
        run: |
          cat > maintenance-report.md << 'EOF'
          # Repository Maintenance Report
          
          Generated on: $(date)
          
          ## Statistics
          - Total objects: $(git count-objects | cut -d' ' -f1)
          - Size on disk: $(git count-objects -H | grep size-pack | cut -d' ' -f3-4)
          - Number of commits: $(git rev-list --count HEAD)
          - Number of branches: $(git branch -r | wc -l)
          - Number of tags: $(git tag | wc -l)
          
          ## Recent Activity
          - Commits this week: $(git log --oneline --since="1 week ago" | wc -l)
          - Active contributors: $(git log --since="1 month ago" --format="%ae" | sort -u | wc -l)
          
          EOF
          
          cat maintenance-report.md
EOF

# Performance testing script
cat > scripts/git-performance-test.sh << 'EOF'
#!/bin/bash

echo "=== Git Performance Test ==="

# Test clone performance
echo "Testing clone performance..."
time git clone --depth 1 https://github.com/torvalds/linux.git test-shallow
du -sh test-shallow
rm -rf test-shallow

# Test fetch performance
echo "Testing fetch performance..."
git fetch --dry-run 2>&1 | grep -E "(fetch|receive)"

# Test status performance
echo "Testing status performance..."
time git status

# Test log performance
echo "Testing log performance..."
time git log --oneline -n 100 > /dev/null

# Test gc performance
echo "Testing gc performance..."
time git gc --auto

echo "Performance test complete!"
EOF

chmod +x scripts/git-performance-test.sh

echo "✅ Git Performance and Enterprise Management sections completed!"

  <span class="tag">medior</span>
</div>

---

### Git Performance and Optimization {#git-performance}
<!-- tags: git-performance, optimization, large-repositories, git-lfs -->

<div class="concept-section definition">

📋 **Concept Definition**  
**Git performance optimization techniques handle large repositories, binary files, and complex histories efficiently**. **Git LFS (Large File Storage)**: stores large files externally while keeping pointers in Git. **Shallow clones**: limit history depth for faster clones. **Sparse checkout**: work with subset of files in large repositories. **Git maintenance**: garbage collection, pack optimization, index updates. **Repository optimization**: history cleanup, submodule management, monorepo strategies. **Network optimization**: partial clones, bundle files, mirror repositories. **Key metrics**: clone time, fetch speed, disk usage, command performance.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Developer productivity**: faster operations improve workflow efficiency
- **CI/CD performance**: quicker builds and deployments
- **Storage costs**: optimized repositories reduce infrastructure costs
- **Scalability**: handle growing codebases and team sizes

</div>

<div class="runnable-model" data-filter="git-performance">

**Runnable mental model**
```bash
# === GIT LFS (Large File Storage) ===

# 1. Install and initialize Git LFS
git lfs install  # One-time setup per machine

# 2. Track large file types
git lfs track "*.psd"        # Photoshop files
git lfs track "*.zip"        # Archives
git lfs track "*.mp4"        # Videos
git lfs track "*.ai"         # Adobe Illustrator
git lfs track "*.sketch"     # Sketch files
git lfs track "assets/*.png" # Large images in assets folder

# This creates/updates .gitattributes
cat .gitattributes
# *.psd filter=lfs diff=lfs merge=lfs -text
# *.zip filter=lfs diff=lfs merge=lfs -text

git add .gitattributes
git commit -m "chore: configure Git LFS for binary files"

# 3. Add and commit large files (automatic LFS handling)
cp large-video.mp4 assets/
git add assets/large-video.mp4
git commit -m "feat: add product demo video"

# Check LFS status
git lfs ls-files
# assets/large-video.mp4

# 4. Clone repository with LFS files
git clone https://github.com/user/repo.git
cd repo
git lfs pull  # Download LFS files

# Clone without LFS files initially (faster)
GIT_LFS_SKIP_SMUDGE=1 git clone https://github.com/user/repo.git
cd repo
git lfs pull  # Download specific LFS files when needed

# 5. LFS file management
git lfs fetch                    # Download LFS files from remote
git lfs checkout                 # Replace LFS pointers with actual files
git lfs push origin main        # Upload LFS files to remote
git lfs prune                    # Remove old LFS files from local cache

# 6. Migration existing large files to LFS
git lfs migrate import --include="*.zip,*.psd" --everything
# Rewrites history to use LFS for specified file types

# === SHALLOW CLONES ===

# 1. Shallow clone with limited history
git clone --depth 1 https://github.com/user/repo.git
# Only gets latest commit (90% faster for large repositories)

git clone --depth 10 https://github.com/user/repo.git
# Gets last 10 commits

# 2. Shallow clone specific branch
git clone --depth 1 --branch main https://github.com/user/repo.git

# 3. Convert shallow to full repository
git fetch --unshallow
# Downloads complete history

# 4. Deepen shallow repository
git fetch --depth=100
# Extends history to 100 commits

# === SPARSE CHECKOUT ===

# 1. Enable sparse checkout for large monorepos
git config core.sparseCheckout true

# 2. Define which directories to include
echo "src/frontend/*" > .git/info/sparse-checkout
echo "docs/*" >> .git/info/sparse-checkout
echo "!docs/archive/*" >> .git/info/sparse-checkout  # Exclude archive

# 3. Apply sparse checkout
git read-tree -m -u HEAD
# Working directory now only contains specified paths

# 4. Update sparse checkout patterns
echo "src/backend/api/*" >> .git/info/sparse-checkout
git read-tree -m -u HEAD

# 5. Disable sparse checkout
git config core.sparseCheckout false
git read-tree -m -u HEAD  # Restore all files

# === PARTIAL CLONES (Git 2.19+) ===

# 1. Clone without blobs (metadata only)
git clone --filter=blob:none https://github.com/user/repo.git
# Downloads commits and trees, not file contents

# 2. Clone without large blobs
git clone --filter=blob:limit=1m https://github.com/user/repo.git
# Only downloads blobs smaller than 1MB

# 3. Clone specific tree depth
git clone --filter=tree:0 https://github.com/user/repo.git
# Downloads commits only, trees and blobs on-demand

# 4. Fetch missing objects on-demand
git checkout feature-branch
# Automatically fetches required blobs

# === REPOSITORY MAINTENANCE ===

# 1. Garbage collection and optimization
git gc --aggressive --prune=now
# Comprehensive cleanup and repacking

# 2. Repack repository for optimal storage
git repack -A -d -f --depth=50 --window=50
# Aggressive repacking for maximum compression

# 3. Verify repository integrity
git fsck --full --strict
# Check for corruption and consistency issues

# 4. Clean up unreachable objects
git prune --expire=2.weeks.ago
# Remove objects older than 2 weeks

# 5. Optimize Git index
git update-index --refresh
git update-index --really-refresh

# 6. Remove untracked files and directories
git clean -fdx
# f=force, d=directories, x=ignored files

# === PERFORMANCE MONITORING ===

# 1. Measure Git command performance
time git clone https://github.com/user/repo.git
time git log --oneline

# 2. Repository size analysis
git count-objects -vH
# v=verbose, H=human readable

# 3. Find largest objects in repository
git rev-list --objects --all | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | sed -n 's/^blob //p' | sort -nk2 | tail-20

# 4. Analyze repository history size
git log --oneline | wc -l          # Number of commits
git ls-tree -r -t HEAD | wc -l     # Number of files
git remote show origin             # Remote repository info

# === NETWORK OPTIMIZATION ===

# 1. Bundle repositories for offline transfer
git bundle create repo-backup.bundle --all
# Creates single file with complete repository

# Transfer bundle and clone from it
git clone repo-backup.bundle repo-copy
cd repo-copy
git remote set-url origin https://github.com/user/repo.git

# 2. Optimize fetch operations
git config fetch.prune true           # Automatically prune deleted branches
git config fetch.prunetags true       # Prune deleted tags
git config pull.rebase true           # Use rebase instead of merge for pulls

# 3. Configure push and pull optimizations
git config push.default simple        # Only push current branch
git config branch.autosetupmerge always
git config branch.autosetuprebase always

# === MONOREPO OPTIMIZATION ===

# 1. Git worktrees for multiple working directories
git worktree add ../frontend-work frontend-branch
git worktree add ../backend-work backend-branch

# Work in different directories simultaneously
cd ../frontend-work   # Working on frontend-branch
cd ../backend-work    # Working on backend-branch

# List and manage worktrees
git worktree list
git worktree remove ../frontend-work

# 2. Submodule optimization
git submodule update --init --recursive --depth 1
# Shallow clone submodules

git config submodule.recurse true     # Automatically handle submodules
git config diff.submodule log         # Better submodule diffs

# 3. Subtree optimization for shared code
git subtree push --prefix=libs/shared origin shared-lib --squash
# Squash commits when pushing to subtree

# === DISK SPACE OPTIMIZATION ===

# 1. Find and remove large files from history
git filter-branch --tree-filter 'rm -f large-file.zip' HEAD
# Removes file from all commits (dangerous!)

# 2. Use BFG Repo-Cleaner (safer alternative)
# Download BFG from https://rtyley.github.io/bfg-repo-cleaner/
java -jar bfg.jar --delete-files "*.zip" --delete-folders temp

# 3. Clean up after history rewrite
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# === CI/CD OPTIMIZATIONS ===

# 1. Optimized CI clone
git clone --depth 1 --single-branch --branch $CI_COMMIT_REF_NAME $CI_REPOSITORY_URL

# 2. Cache .git directory in CI
# GitLab CI example
cache:
  key: git-cache
  paths:
    - .git/

# 3. Skip LFS in CI when not needed
# .gitlab-ci.yml
variables:
  GIT_LFS_SKIP_SMUDGE: "1"

before_script:
  - git lfs pull  # Only when needed

# === ADVANCED CONFIGURATION ===

# 1. Memory and performance tuning
git config core.preloadindex true        # Preload index operations
git config core.fscache true            # Enable filesystem cache (Windows)
git config gc.auto 256                  # Trigger GC less frequently
git config pack.threads 0               # Use all CPU cores for packing

# 2. Network optimizations
git config http.postBuffer 524288000    # 500MB buffer for large pushes
git config http.maxRequestBuffer 100M   # Large request buffer
git config pack.windowMemory 100m       # Memory for pack operations

# 3. Index optimizations
git config index.threads 0              # Use all cores for index operations
git config index.recordEndOfIndexEntries true

# === TROUBLESHOOTING PERFORMANCE ISSUES ===

# 1. Identify slow operations
GIT_TRACE2_PERF=1 git status
GIT_TRACE2_PERF=1 git log --oneline -100

# 2. Debug network issues
GIT_CURL_VERBOSE=1 git fetch
GIT_TRACE=1 git push

# 3. Analyze pack files
git verify-pack -v .git/objects/pack/pack-*.idx | sort -k 3 -nr | head -20

# 4. Check for file system issues
git status --porcelain | wc -l         # Many modified files?
find .git -name "*.lock"               # Stale lock files?

# === EXAMPLE: OPTIMIZING LARGE REPOSITORY ===

# Before optimization
echo "Repository size before optimization:"
du -sh .git/

# 1. Clean up and optimize
git reflog expire --expire=now --all
git gc --aggressive --prune=now
git repack -A -d -f

# 2. Convert large files to LFS
git lfs migrate import --include="*.pdf,*.zip,*.exe" --everything

# 3. Enable optimizations
git config core.preloadindex true
git config gc.auto 256
git config pack.threads 0

# After optimization
echo "Repository size after optimization:"
du -sh .git/

# 4. Create optimized clone script
cat > quick-clone.sh << 'EOF'
#!/bin/bash
git clone --depth 1 --single-branch "$1" temp-repo
cd temp-repo
git fetch --unshallow  # Only if full history needed
git lfs pull           # Only if LFS files needed
EOF

chmod +x quick-clone.sh

# === MONITORING AND ALERTS ===

# 1. Repository health check script
cat > repo-health.sh << 'EOF'
#!/bin/bash
echo "=== Repository Health Check ==="

# Size check
REPO_SIZE=$(du -s .git | cut -f1)
echo "Repository size: ${REPO_SIZE}KB"

if [ $REPO_SIZE -gt 1000000 ]; then  # 1GB
    echo "⚠️  Large repository detected"
fi

# Object count
git count-objects -v

# Largest files
echo "=== Largest files ==="
git ls-tree -r -t -l --full-name HEAD | sort -n -k 4 | tail -10

# Performance test
echo "=== Performance test ==="
time git log --oneline -1000 > /dev/null

echo "=== Health check complete ==="
EOF

chmod +x repo-health.sh
```
*Notice: Git performance optimization is crucial for large teams and repositories. Choose techniques based on specific bottlenecks.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **LFS misconfiguration**: Not tracking files properly or missing .gitattributes commits
- **Shallow clone limitations**: Can't push or create branches from shallow clones
- **Aggressive GC**: Running gc --aggressive too frequently (expensive operation)
- **History rewriting**: Using filter-branch on shared repositories without coordination
- **Large binary commits**: Adding large files without LFS, bloating repository permanently
- **Sparse checkout conflicts**: Forgetting sparse checkout is enabled when switching branches

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **Game development**: managing large art assets and binary files with LFS
- **Machine learning**: handling model files and datasets efficiently
- **Enterprise software**: optimizing monorepos with sparse checkout
- **CI/CD systems**: faster clones and builds with shallow clones
- **Mobile development**: managing large dependencies and resources

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"How do you handle large files in Git?"** → Git LFS setup and best practices
2. **"Optimize a slow Git repository"** → Performance analysis and improvement techniques
3. **"Explain shallow vs partial clones"** → Different optimization strategies and trade-offs
4. **"Managing monorepos at scale"** → Sparse checkout, submodules, and worktrees
5. **"Git performance in CI/CD"** → Optimization strategies for automated systems

</div>

<div class="concept-section related-concepts">

🔗 **Related concepts**  
`Repository Management` · `CI/CD Optimization` · `Storage Management` · `Network Performance` · `DevOps`

</div>

<div class="tags">
  <span class="tag">git-performance</span>
  <span class="tag">optimization</span>
  <span class="tag">git-lfs</span>
  <span class="tag">large-repositories</span>
  <span class="tag">scalability</span>
  <span class="tag">medior</span>
</div>

---

### Enterprise Git Management {#enterprise-git}
<!-- tags: enterprise-git, governance, security, compliance, scalability -->

<div class="concept-section definition">

📋 **Concept Definition**  
**Enterprise Git management addresses governance, security, compliance, and scalability requirements for large organizations**. **Repository governance**: standardized naming conventions, access controls, backup strategies. **Security**: branch protection, secret scanning, signed commits, audit trails. **Compliance**: regulatory requirements, data retention, change tracking, approval workflows. **Scalability**: distributed teams, multiple repositories, integration with enterprise tools. **Platform integration**: LDAP/SSO authentication, ticketing systems, monitoring tools. **Key components**: Git hosting platforms (GitHub Enterprise, GitLab, Bitbucket), repository management, user provisioning, compliance reporting.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Risk management**: protect intellectual property and ensure compliance
- **Team productivity**: standardized workflows across organization
- **Security**: prevent data breaches and unauthorized access
- **Auditability**: track changes for regulatory and legal requirements

</div>

<div class="runnable-model" data-filter="enterprise-git">

**Runnable mental model**
```bash
# === REPOSITORY GOVERNANCE ===

# 1. Standardized repository naming conventions
# Format: {team}-{product}-{component}
frontend-ecommerce-web
backend-ecommerce-api
mobile-ecommerce-ios
devops-ecommerce-infrastructure

# 2. Repository templates for consistency
# .github/ISSUE_TEMPLATE/bug_report.md
---
name: Bug report
about: Create a report to help us improve
title: '[BUG] '
labels: bug, triage
assignees: ''
---

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Environment (please complete the following information):**
- OS: [e.g. iOS]
- Browser [e.g. chrome, safari]
- Version [e.g. 22]

# 3. Repository configuration standards
# .github/repository-settings.json
{
  "default_branch": "main",
  "allow_squash_merge": true,
  "allow_merge_commit": false,
  "allow_rebase_merge": true,
  "delete_branch_on_merge": true,
  "enable_issues": true,
  "enable_projects": true,
  "enable_wiki": false,
  "vulnerability_alerts": true,
  "automated_security_fixes": true
}

# === BRANCH PROTECTION AND SECURITY ===

# 1. Comprehensive branch protection rules
# Configure via GitHub API or web interface
{
  "required_status_checks": {
    "strict": true,
    "contexts": [
      "ci/tests",
      "ci/security-scan",
      "ci/code-quality",
      "ci/compliance-check"
    ]
  },
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "required_approving_review_count": 2,
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": true,
    "dismissal_restrictions": {
      "users": ["security-team-lead"],
      "teams": ["security-team"]
    }
  },
  "restrictions": {
    "users": ["admin1", "admin2"],
    "teams": ["core-team", "senior-developers"]
  },
  "required_linear_history": true,
  "allow_force_pushes": false,
  "allow_deletions": false
}

# 2. CODEOWNERS file for mandatory reviews
# .github/CODEOWNERS
# Global owners
* @team-leads

# Frontend code
/src/frontend/ @frontend-team @ui-designers

# Backend API
/src/api/ @backend-team @api-architects

# Infrastructure
/infrastructure/ @devops-team @security-team
/terraform/ @devops-team
/kubernetes/ @devops-team @platform-team

# Security-sensitive files
/src/auth/ @security-team
/src/payment/ @security-team @compliance-team
/config/security/ @security-team

# Documentation
/docs/ @tech-writers @product-managers

# CI/CD configuration
/.github/ @devops-team
/.gitlab-ci.yml @devops-team
/Dockerfile @devops-team

# 3. Signed commits for authenticity
# Configure GPG signing
git config --global user.signingkey YOUR_GPG_KEY_ID
git config --global commit.gpgsign true
git config --global tag.gpgsign true

# Organization-wide signing requirements
# Require signed commits via branch protection

# 4. Secret scanning configuration
# .github/secret_scanning.yml
exclude_paths:
  - "test/**"
  - "docs/**"
  - "*.md"

custom_patterns:
  - name: "Company API Key"
    regex: "COMPANY_API_[A-Z0-9]{32}"
  - name: "Database Connection String"
    regex: "mongodb://[^\\s]+"

# === ACCESS CONTROL AND AUTHENTICATION ===

# 1. LDAP/SSO integration configuration
# GitHub Enterprise SAML configuration
{
  "sso_url": "https://company.okta.com/sso/saml",
  "issuer": "http://www.okta.com/company",
  "idp_certificate": "-----BEGIN CERTIFICATE-----...",
  "name_id_format": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
  "attribute_mapping": {
    "email": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
    "name": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
    "username": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
  }
}

# 2. Team and permission management
# teams.yml (managed via API or Terraform)
teams:
  frontend-team:
    members:
      - alice@company.com
      - bob@company.com
    repositories:
      - frontend-web: admin
      - frontend-mobile: write
      - shared-components: write

  backend-team:
    members:
      - charlie@company.com
      - diana@company.com
    repositories:
      - backend-api: admin
      - backend-services: admin
      - shared-libs: write

  security-team:
    members:
      - eve@company.com
      - frank@company.com
    repositories:
      - "*": admin  # Access to all repositories

# 3. Repository access automation
# Terraform configuration for GitHub
resource "github_team" "frontend" {
  name         = "frontend-team"
  description  = "Frontend development team"
  privacy      = "closed"
}

resource "github_team_repository" "frontend_web" {
  team_id    = github_team.frontend.id
  repository = "frontend-web"
  permission = "admin"
}

resource "github_branch_protection" "main" {
  repository_id = github_repository.main.node_id
  pattern       = "main"

  required_status_checks {
    strict = true
    contexts = [
      "ci/tests",
      "ci/security"
    ]
  }

  required_pull_request_reviews {
    required_approving_review_count = 2
    require_code_owner_reviews      = true
    dismiss_stale_reviews           = true
  }
}

# === COMPLIANCE AND AUDIT TRAILS ===

# 1. Audit log collection
# GitHub Enterprise audit log API
curl -H "Authorization: token $GITHUB_TOKEN" \
     "https://api.github.com/enterprises/company/audit-log?phrase=action:repo.create"

# 2. Compliance reporting script
#!/bin/bash
# compliance-report.sh

echo "=== Git Compliance Report ==="
echo "Report generated: $(date)"

# Repository compliance checks
echo "=== Repository Compliance ==="

for repo in $(gh repo list company --limit 100 --json name --jq '.[].name'); do
    echo "Checking repository: $repo"
    
    # Check branch protection
    protection=$(gh api repos/company/$repo/branches/main/protection 2>/dev/null || echo "none")
    if [ "$protection" = "none" ]; then
        echo "❌ $repo: No branch protection on main"
    else
        echo "✅ $repo: Branch protection enabled"
    fi
    
    # Check for CODEOWNERS
    if gh api repos/company/$repo/contents/.github/CODEOWNERS >/dev/null 2>&1; then
        echo "✅ $repo: CODEOWNERS file present"
    else
        echo "❌ $repo: Missing CODEOWNERS file"
    fi
    
    # Check for security scanning
    alerts=$(gh api repos/company/$repo/vulnerability-alerts --jq '.enabled' 2>/dev/null)
    if [ "$alerts" = "true" ]; then
        echo "✅ $repo: Security alerts enabled"
    else
        echo "❌ $repo: Security alerts disabled"
    fi
done

# 3. Data retention policy implementation
# retention-policy.sh
#!/bin/bash

# Archive repositories older than 2 years with no activity
cutoff_date=$(date -d "2 years ago" +%Y-%m-%d)

gh repo list company --limit 1000 --json name,updatedAt --jq ".[] | select(.updatedAt < \"$cutoff_date\") | .name" | while read repo; do
    echo "Archiving inactive repository: $repo"
    gh repo archive company/$repo
done

# === INTEGRATION WITH ENTERPRISE TOOLS ===

# 1. JIRA integration for traceability
# .github/workflows/jira-integration.yml
name: JIRA Integration
on:
  pull_request:
    types: [opened, edited]

jobs:
  jira-check:
    runs-on: ubuntu-latest
    steps:
      - name: Check JIRA ticket reference
        run: |
          if ! echo "${{ github.event.pull_request.title }}" | grep -E "^[A-Z]+-[0-9]+"; then
            echo "❌ PR title must start with JIRA ticket (e.g., PROJ-123)"
            exit 1
          fi

      - name: Update JIRA ticket
        run: |
          TICKET=$(echo "${{ github.event.pull_request.title }}" | grep -oE "^[A-Z]+-[0-9]+")
          curl -X POST "https://company.atlassian.net/rest/api/2/issue/$TICKET/comment" \
               -H "Authorization: Basic ${{ secrets.JIRA_TOKEN }}" \
               -H "Content-Type: application/json" \
               -d "{\"body\": \"Pull request created: ${{ github.event.pull_request.html_url }}\"}"

# 2. Slack notifications for security events
# .github/workflows/security-alerts.yml
name: Security Alerts
on:
  repository_vulnerability_alert:
    types: [create]

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: Notify security team
        run: |
          curl -X POST ${{ secrets.SLACK_WEBHOOK }} \
               -H 'Content-type: application/json' \
               -d '{
                 "text": "🚨 Security vulnerability detected in ${{ github.repository }}",
                 "attachments": [{
                   "color": "danger",
                   "fields": [{
                     "title": "Repository",
                     "value": "${{ github.repository }}",
                     "short": true
                   }, {
                     "title": "Alert URL",
                     "value": "${{ github.event.alert.html_url }}",
                     "short": true
                   }]
                 }]
               }'

# 3. ServiceNow integration for change management
# change-management.sh
#!/bin/bash

# Create change request for production deployments
create_change_request() {
    local repo=$1
    local version=$2
    local description=$3
    
    curl -X POST "https://company.service-now.com/api/now/table/change_request" \
         -H "Authorization: Basic $SERVICENOW_TOKEN" \
         -H "Content-Type: application/json" \
         -d "{
           \"short_description\": \"Deploy $repo version $version\",
           \"description\": \"$description\",
           \"category\": \"Software\",
           \"subcategory\": \"Application\",
           \"priority\": \"3\",
           \"risk\": \"Low\",
           \"impact\": \"3\",
           \"state\": \"New\"
         }"
}

# === BACKUP AND DISASTER RECOVERY ===

# 1. Automated repository backup
#!/bin/bash
# backup-repositories.sh

BACKUP_DIR="/backup/git-repos/$(date +%Y-%m-%d)"
mkdir -p "$BACKUP_DIR"

# Backup all repositories
gh repo list company --limit 1000 --json name,cloneUrl | jq -r '.[] | "\(.name) \(.cloneUrl)"' | while read name url; do
    echo "Backing up $name..."
    git clone --mirror "$url" "$BACKUP_DIR/$name.git"
    
    # Backup metadata
    gh repo view "company/$name" --json description,topics,visibility > "$BACKUP_DIR/$name.metadata.json"
done

# Create backup manifest
echo "Backup completed: $(date)" > "$BACKUP_DIR/manifest.txt"
echo "Repository count: $(ls -1 $BACKUP_DIR/*.git | wc -l)" >> "$BACKUP_DIR/manifest.txt"

# 2. Cross-region repository mirroring
# mirror-setup.sh
#!/bin/bash

# Setup mirror repository in different region
MAIN_REPO="https://github.com/company/critical-app.git"
MIRROR_REPO="https://github-backup.company.com/company/critical-app.git"

git clone --mirror "$MAIN_REPO" mirror-repo
cd mirror-repo

# Add mirror remote
git remote add mirror "$MIRROR_REPO"

# Sync to mirror (run periodically)
git fetch origin
git push mirror --all
git push mirror --tags

# === MONITORING AND ALERTING ===

# 1. Repository health monitoring
#!/bin/bash
# monitor-repos.sh

echo "=== Repository Health Monitor ==="

# Check for repositories without recent activity
gh repo list company --limit 100 --json name,pushedAt | jq -r '.[] | select(.pushedAt < (now - 86400 * 30 | todate)) | .name' | while read repo; do
    echo "⚠️  Inactive repository: $repo (no pushes in 30 days)"
done

# Check for repositories without branch protection
gh repo list company --limit 100 --json name | jq -r '.[].name' | while read repo; do
    if ! gh api repos/company/$repo/branches/main/protection >/dev/null 2>&1; then
        echo "❌ Unprotected main branch: $repo"
    fi
done

# Check for large repositories
gh repo list company --limit 100 --json name,diskUsage | jq -r '.[] | select(.diskUsage > 1000000) | "\(.name) \(.diskUsage)KB"' | while read repo size; do
    echo "📦 Large repository: $repo ($size)"
done

# 2. Security compliance dashboard
# security-dashboard.py
import requests
import json
from datetime import datetime, timedelta

def generate_security_report():
    report = {
        "generated": datetime.now().isoformat(),
        "repositories": []
    }
    
    repos = get_all_repositories()
    
    for repo in repos:
        repo_security = {
            "name": repo["name"],
            "branch_protection": check_branch_protection(repo["name"]),
            "security_alerts": check_security_alerts(repo["name"]),
            "secret_scanning": check_secret_scanning(repo["name"]),
            "dependency_scanning": check_dependency_scanning(repo["name"]),
            "code_scanning": check_code_scanning(repo["name"])
        }
        report["repositories"].append(repo_security)
    
    return report

# Save report
with open(f"security-report-{datetime.now().strftime('%Y-%m-%d')}.json", "w") as f:
    json.dump(generate_security_report(), f, indent=2)

# === ENTERPRISE SCALING STRATEGIES ===

# 1. Repository federation
# Distribute repositories across multiple GitHub organizations
organizations = [
    "company-frontend",    # Frontend teams
    "company-backend",     # Backend teams
    "company-mobile",      # Mobile teams
    "company-devops",      # Infrastructure teams
    "company-data"         # Data and ML teams
]

# 2. Automated repository provisioning
# new-repository.sh
#!/bin/bash

TEAM=$1
PROJECT=$2
TYPE=$3  # web, api, mobile, etc.

REPO_NAME="${TEAM}-${PROJECT}-${TYPE}"
ORG="company-${TEAM}"

# Create repository
gh repo create "$ORG/$REPO_NAME" \
    --template "company-templates/${TYPE}-template" \
    --private \
    --description "$PROJECT $TYPE application for $TEAM team"

# Configure repository settings
gh api repos/$ORG/$REPO_NAME \
    --method PATCH \
    --field delete_branch_on_merge=true \
    --field allow_squash_merge=true \
    --field allow_merge_commit=false

# Add team permissions
gh api orgs/$ORG/teams/$TEAM/repos/$ORG/$REPO_NAME \
    --method PUT \
    --field permission=admin

# Enable security features
gh api repos/$ORG/$REPO_NAME/vulnerability-alerts \
    --method PUT

echo "✅ Repository $ORG/$REPO_NAME created and configured"
```
*Notice: Enterprise Git management requires balancing security, compliance, and developer productivity through automation and governance.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Over-restrictive permissions**: Blocking legitimate development work with excessive controls
- **Incomplete backup strategy**: Not backing up repository metadata, issues, and pull requests
- **Manual governance**: Relying on manual processes instead of automation for compliance
- **Inconsistent standards**: Different teams using different workflows and conventions
- **Security theater**: Implementing visible but ineffective security measures
- **Audit trail gaps**: Missing critical events in compliance logging

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **Financial services**: regulatory compliance and audit requirements
- **Healthcare**: HIPAA compliance and patient data protection
- **Government**: security clearance and classified information handling
- **Enterprise software**: intellectual property protection and governance
- **Multinational corporations**: distributed teams and regional compliance

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"How do you ensure Git security in enterprise?"** → Access controls, signing, scanning strategies
2. **"Describe your compliance monitoring approach"** → Audit trails, reporting, and automation
3. **"Managing Git at scale across teams"** → Governance, standardization, and federation
4. **"Backup and disaster recovery for Git"** → Business continuity and data protection
5. **"Integration with enterprise tools"** → SSO, LDAP, ticketing, and monitoring systems

</div>

<div class="concept-section related-concepts">

🔗 **Related concepts**  
`DevSecOps` · `Compliance Management` · `Access Control` · `Audit Trails` · `Enterprise Architecture`

</div>

<div class="tags">
  <span class="tag">enterprise-git</span>
  <span class="tag">governance</span>
  <span class="tag">security</span>
  <span class="tag">compliance</span>
  <span class="tag">scalability</span>
  <span class="tag">medior</span>
</div>

## Summary

Git and version control form the foundation of modern software development, enabling collaboration, history tracking, and code management at scale. This comprehensive guide covers essential concepts through enterprise-level implementations.

**Git Fundamentals**: Repository initialization, staging, committing, and branching provide the core workflow for version control. Understanding the Git data model of snapshots, objects, and references enables effective use of advanced features.

**Branching and Merging**: Feature branches enable parallel development, merge strategies control history integration, and conflict resolution ensures code quality during collaboration.

**Collaboration Workflows**: Remote repositories, push/pull operations, and distributed workflows enable team coordination. Pull requests facilitate code review and quality assurance.

**Advanced Techniques**: Interactive rebase for history cleanup, stashing for temporary changes, and reset/revert for error recovery provide powerful manipulation capabilities.

**Workflow Strategies**: GitFlow for scheduled releases, GitHub Flow for continuous deployment, and trunk-based development for rapid integration address different organizational needs.

**Automation and Quality**: Git hooks enforce standards automatically, while integration with CI/CD systems ensures quality gates and deployment automation.

**Performance Optimization**: Git LFS for large files, shallow clones for faster operations, and repository maintenance techniques handle scaling challenges.

**Enterprise Management**: Governance frameworks, security controls, compliance monitoring, and audit trails address organizational requirements for risk management and regulatory compliance.

**Best Practices**: Consistent commit messages, atomic commits, regular maintenance, and security awareness create sustainable development practices. Integration with modern development tools and platforms enhances productivity while maintaining code quality.

Git's flexibility and power make it essential for software development teams of all sizes, from individual projects to enterprise-scale organizations with complex compliance and security requirements.

---

### Advanced Git Troubleshooting {#git-troubleshooting}
<!-- tags: git-troubleshooting, debugging, recovery, conflict-resolution -->

<div class="concept-section definition">

📋 **Concept Definition**  
**Advanced Git troubleshooting encompasses systematic approaches to diagnosing and resolving complex repository issues, merge conflicts, performance problems, and data integrity concerns**. **Diagnostic techniques**: using Git's internal tools to analyze repository state, object corruption, and reference issues. **Conflict resolution**: handling complex merge scenarios, binary conflicts, and history divergence. **Recovery methods**: restoring lost commits, corrupted objects, and damaged repositories. **Performance debugging**: identifying bottlenecks in large repositories, network issues, and optimization opportunities. **Preventive measures**: establishing monitoring, backup strategies, and early warning systems.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Business continuity**: minimize downtime from Git issues
- **Data protection**: prevent loss of development work and history
- **Team productivity**: resolve blocking issues quickly
- **Repository integrity**: maintain code quality and collaboration

</div>

<div class="runnable-model" data-filter="git-troubleshooting">

**Runnable mental model**
```bash
# === DIAGNOSTIC COMMANDS AND TECHNIQUES ===

# 1. Repository health check
echo "=== REPOSITORY HEALTH DIAGNOSTICS ==="

# Basic integrity check
git fsck --full --strict --verbose

# Check for unreachable objects
git fsck --unreachable

# Verify pack files
git verify-pack -v .git/objects/pack/*.idx

# Check repository statistics
git count-objects -v

# Analyze object database
git show-index < .git/objects/pack/*.idx | head -20

# 2. Reference and branch analysis
echo "=== REFERENCE ANALYSIS ==="

# Show all references
git for-each-ref --format='%(refname) %(objecttype) %(objectname)'

# Check for dangling references
git for-each-ref --format='%(refname)' | while read ref; do
    if ! git rev-parse --verify "$ref" >/dev/null 2>&1; then
        echo "Dangling reference: $ref"
    fi
done

# Analyze reflog for all branches
git reflog --all --oneline

# Check for corrupted references
find .git/refs -type f | while read ref_file; do
    if ! git rev-parse --verify "$(cat "$ref_file")" >/dev/null 2>&1; then
        echo "Corrupted reference file: $ref_file"
    fi
done

# 3. Index and working directory issues
echo "=== INDEX DIAGNOSTICS ==="

# Check index integrity
git ls-files --stage | head -10

# Find files with problems
git status --porcelain | grep '^!'  # Deleted files
git status --porcelain | grep '^??'  # Untracked files
git status --porcelain | grep '^[MARC]'  # Modified/added/renamed/copied

# Check for case sensitivity issues (macOS/Windows)
git config core.ignorecase
git ls-files | sort -f | uniq -di  # Duplicate names ignoring case

# === MERGE CONFLICT RESOLUTION ===

# 1. Complex merge conflict handling
echo "=== ADVANCED CONFLICT RESOLUTION ==="

# Start merge and analyze conflicts
git merge feature-branch || true

# Show conflict summary
git status --short
git diff --name-only --diff-filter=U  # Unmerged files

# Analyze three-way merge conflicts
cat > scripts/analyze-conflicts.sh << 'EOF'
#!/bin/bash

echo "=== Merge Conflict Analysis ==="

# List all conflicted files
conflicted_files=$(git diff --name-only --diff-filter=U)

if [ -z "$conflicted_files" ]; then
    echo "No merge conflicts found"
    exit 0
fi

echo "Conflicted files:"
echo "$conflicted_files"
echo

for file in $conflicted_files; do
    echo "=== Analyzing $file ==="
    
    # Show conflict markers and context
    grep -n -C 3 '^<<<<<<<\|^=======\|^>>>>>>>' "$file" || echo "No standard conflict markers"
    
    # Show three-way diff
    echo "Three-way merge analysis:"
    echo "LOCAL (HEAD):"
    git show HEAD:"$file" | head -20
    echo
    echo "REMOTE (merging branch):"
    git show MERGE_HEAD:"$file" | head -20
    echo
    echo "BASE (common ancestor):"
    git show $(git merge-base HEAD MERGE_HEAD):"$file" | head -20
    echo "---"
done
EOF

chmod +x scripts/analyze-conflicts.sh
./scripts/analyze-conflicts.sh

# 2. Advanced merge strategies
echo "=== MERGE STRATEGIES ==="

# Abort current merge
git merge --abort

# Try different merge strategies
echo "Trying recursive with patience..."
git merge -X patience feature-branch

# If that fails, try ignore-space-change
git merge --abort
git merge -X ignore-space-change feature-branch

# If still failing, try manual three-way merge
git merge --abort
git merge --no-commit feature-branch

# Custom merge driver for specific file types
git config merge.ours.driver true  # Always keep our version
echo "*.generated merge=ours" >> .gitattributes

# 3. Binary file conflicts
cat > scripts/resolve-binary-conflicts.sh << 'EOF'
#!/bin/bash

echo "=== Binary Conflict Resolution ==="

# Find binary files in conflict
for file in $(git diff --name-only --diff-filter=U); do
    if git diff --numstat "$file" | grep -q '^-\s*-'; then
        echo "Binary conflict in: $file"
        
        # Show available versions
        echo "Available versions:"
        echo "1. Keep local version (HEAD)"
        echo "2. Keep remote version (MERGE_HEAD)"
        echo "3. Keep both versions (rename)"
        
        read -p "Choose option for $file (1/2/3): " choice
        
        case $choice in
            1)
                git checkout --ours "$file"
                git add "$file"
                echo "Kept local version of $file"
                ;;
            2)
                git checkout --theirs "$file"
                git add "$file"
                echo "Kept remote version of $file"
                ;;
            3)
                # Keep both versions with different names
                git checkout --ours "$file"
                cp "$file" "${file%.ext}.local.ext"
                git checkout --theirs "$file"
                cp "$file" "${file%.ext}.remote.ext"
                git add "${file%.ext}.local.ext" "${file%.ext}.remote.ext"
                git rm "$file"
                echo "Kept both versions of $file"
                ;;
        esac
    fi
done
EOF

chmod +x scripts/resolve-binary-conflicts.sh

# === DATA RECOVERY TECHNIQUES ===

# 1. Lost commit recovery
echo "=== COMMIT RECOVERY ==="

cat > scripts/recover-commits.sh << 'EOF'
#!/bin/bash

echo "=== Lost Commit Recovery ==="

# Check reflog for lost commits
echo "Recent reflog entries:"
git reflog --all --oneline | head -20

# Find dangling commits
echo "Dangling commits:"
git fsck --lost-found 2>/dev/null | grep "dangling commit"

# Create recovery branches for dangling commits
git fsck --lost-found 2>/dev/null | grep "dangling commit" | while read _ _ commit; do
    # Check if commit has meaningful content
    if git log --oneline -1 "$commit" 2>/dev/null; then
        echo "Found potentially recoverable commit: $commit"
        echo "  $(git log --oneline -1 "$commit")"
        
        read -p "Create recovery branch for this commit? (y/n): " create_branch
        if [ "$create_branch" = "y" ]; then
            branch_name="recovery-$(date +%s)-$(echo $commit | cut -c1-8)"
            git branch "$branch_name" "$commit"
            echo "Created recovery branch: $branch_name"
        fi
    fi
done

# Search for specific content in lost commits
read -p "Search for specific content in lost commits? Enter search term (or press Enter to skip): " search_term
if [ -n "$search_term" ]; then
    echo "Searching for '$search_term' in lost commits..."
    git fsck --lost-found 2>/dev/null | grep "dangling commit" | while read _ _ commit; do
        if git show "$commit" 2>/dev/null | grep -q "$search_term"; then
            echo "Found in commit $commit:"
            git log --oneline -1 "$commit"
        fi
    done
fi
EOF

chmod +x scripts/recover-commits.sh

# 2. Repository repair automation
cat > scripts/auto-repair.sh << 'EOF'
#!/bin/bash

echo "=== Automated Repository Repair ==="

# Create backup before repair
BACKUP_DIR="pre-repair-backup-$(date +%s)"
cp -r .git "$BACKUP_DIR"
echo "✅ Backup created: $BACKUP_DIR"

# Step 1: Garbage collection
echo "Running garbage collection..."
git gc --aggressive --prune=now

# Step 2: Repack for optimization
echo "Repacking repository..."
git repack -A -d -f

# Step 3: Update references
echo "Updating references..."
git update-ref HEAD HEAD

# Step 4: Refresh index
echo "Refreshing index..."
git update-index --refresh --really-refresh

# Step 5: Final integrity check
echo "Final integrity check..."
if git fsck --full --strict >/dev/null 2>&1; then
    echo "✅ Repository repair completed successfully"
    echo "Backup can be removed: $BACKUP_DIR"
else
    echo "❌ Repository still has issues"
    echo "Backup preserved: $BACKUP_DIR"
fi
EOF

chmod +x scripts/auto-repair.sh

echo "✅ Git troubleshooting tools configured!"
```
*Notice: Git troubleshooting requires systematic diagnosis, careful execution, and always maintaining backups before attempting repairs.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **No backup before repair**: Attempting fixes without backing up the repository first
- **Force operations**: Using --force flags without understanding consequences
- **Ignoring warnings**: Proceeding despite Git integrity warnings
- **Manual object editing**: Directly modifying .git directory contents
- **Incomplete conflict resolution**: Leaving merge conflicts partially resolved
- **Premature cleanup**: Running aggressive garbage collection during active development

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **Emergency response**: critical repository failures requiring immediate recovery
- **Performance optimization**: diagnosing and fixing slow Git operations
- **Data forensics**: investigating repository corruption or data loss
- **Migration support**: troubleshooting repository transfers and imports
- **Team collaboration**: resolving complex merge conflicts and workflow issues

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"Git repository is corrupted, how do you recover?"** → Diagnostic approach and recovery strategies
2. **"Resolve complex three-way merge conflicts"** → Analysis techniques and resolution methods
3. **"Git operations are very slow, diagnose the issue"** → Performance analysis and optimization
4. **"Developer lost commits after rebase, help recover"** → Reflog analysis and commit recovery
5. **"Repository integrity check fails, what's your approach?"** → Systematic troubleshooting methodology

</div>

<div class="concept-section related-concepts">

🔗 **Related concepts**  
`Data Recovery` · `Performance Optimization` · `Conflict Resolution` · `Repository Management` · `Backup Strategies`

</div>

<div class="tags">
  <span class="tag">git-troubleshooting</span>
  <span class="tag">debugging</span>
  <span class="tag">recovery</span>
  <span class="tag">conflict-resolution</span>
  <span class="tag">performance</span>
  <span class="tag">medior</span>
</div>
# Git Performance Guide

## Large Repository Strategies

### 1. Repository Structure
- Keep repositories focused (single responsibility)
- Use submodules for shared libraries
- Consider monorepo tools (Nx, Lerna) for JavaScript projects
- Separate code from large assets

### 2. File Management
- Use Git LFS for files >100MB
- Implement .gitignore patterns effectively
- Regular cleanup of untracked files
- Archive old releases separately

### 3. Workflow Optimization
- Use shallow clones for CI/CD
- Implement sparse checkout for large monorepos
- Regular maintenance with git gc
- Monitor repository size growth

---

### Git Integration Ecosystems {#git-integration-ecosystems}
<!-- tags: git-integration, devops, ci-cd, platforms, automation -->

<div class="concept-section definition">

📋 **Concept Definition**  
**Git integration ecosystems encompass the comprehensive toolchain and platforms that extend Git's capabilities for modern software development workflows**. **Platform integration**: GitHub, GitLab, Bitbucket, Azure DevOps with their unique features and APIs. **CI/CD integration**: automated builds, testing, deployment pipelines triggered by Git events. **Development tools**: IDEs, editors, command-line tools that enhance Git productivity. **Project management**: issue tracking, project boards, milestones integrated with Git workflows. **Quality assurance**: code review tools, automated testing, security scanning, compliance checking. **Documentation**: wikis, README automation, API documentation generation from Git repositories.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Developer productivity**: streamlined workflows and automated processes
- **Quality assurance**: integrated testing and review processes
- **Team collaboration**: centralized platforms for code and project management
- **Deployment automation**: reliable and repeatable release processes

</div>

<div class="runnable-model" data-filter="git-integration">

**Runnable mental model**
```bash
# === GITHUB ADVANCED INTEGRATION ===

# 1. GitHub CLI for advanced operations
echo "=== GitHub CLI Integration ==="

# Install GitHub CLI (gh)
# macOS: brew install gh
# Linux: see https://cli.github.com/
# Windows: winget install GitHub.cli

# Authenticate with GitHub
gh auth login

# Repository operations
gh repo create my-new-project --public --description "My awesome project"
gh repo clone owner/repository
gh repo fork owner/repository

# Issue management
gh issue create --title "Bug fix needed" --body "Description of the issue"
gh issue list --assignee "@me"
gh issue close 123

# Pull request workflow
gh pr create --title "Feature: add new functionality" --body "Detailed description"
gh pr list --author "@me"
gh pr checkout 456  # Checkout PR locally
gh pr merge 456 --squash

# Release management
gh release create v1.0.0 --notes "Release notes"
gh release upload v1.0.0 ./dist/app.zip

# Repository insights
gh api repos/:owner/:repo/stats/contributors
gh api repos/:owner/:repo/traffic/views

# 2. GitHub Actions workflow examples
cat > .github/workflows/ci-cd.yml << 'EOF'
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  release:
    types: [ published ]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16, 18, 20]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test -- --coverage
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info

  security-scan:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Run Trivy vulnerability scanner
      uses: aquasecurity/trivy-action@master
      with:
        scan-type: 'fs'
        format: 'sarif'
        output: 'trivy-results.sarif'
    
    - name: Upload Trivy scan results to GitHub Security tab
      uses: github/codeql-action/upload-sarif@v2
      with:
        sarif_file: 'trivy-results.sarif'

  build-and-deploy:
    needs: [test, security-scan]
    runs-on: ubuntu-latest
    if: github.event_name == 'release'
    
    permissions:
      contents: read
      packages: write
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Log in to Container Registry
      uses: docker/login-action@v2
      with:
        registry: ${{ env.REGISTRY }}
        username: ${{ github.actor }}
        password: ${{ secrets.GITHUB_TOKEN }}
    
    - name: Extract metadata
      id: meta
      uses: docker/metadata-action@v4
      with:
        images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
        tags: |
          type=ref,event=branch
          type=ref,event=pr
          type=semver,pattern={{version}}
          type=semver,pattern={{major}}.{{minor}}
    
    - name: Build and push Docker image
      uses: docker/build-push-action@v4
      with:
        context: .
        push: true
        tags: ${{ steps.meta.outputs.tags }}
        labels: ${{ steps.meta.outputs.labels }}
    
    - name: Deploy to production
      run: |
        echo "Deploying version ${{ github.ref_name }} to production"
        # Add deployment scripts here
EOF

echo "✅ Git integration ecosystem configured!"
```
*Notice: Modern Git workflows integrate deeply with platforms and tools to create seamless development experiences.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Platform lock-in**: Building workflows too specific to one platform
- **Over-automation**: Automating every small task instead of focusing on value
- **Insecure tokens**: Hardcoding API tokens in scripts or repositories
- **Missing validation**: Not validating inputs in automated workflows
- **Ignoring rate limits**: Not handling API rate limiting in automation scripts
- **Complex workflows**: Creating overly complex CI/CD pipelines that are hard to debug

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **Enterprise development**: large teams with complex approval workflows
- **Open source projects**: community collaboration and automated releases
- **DevOps automation**: continuous integration and deployment pipelines
- **Quality assurance**: automated testing and security scanning
- **Project management**: issue tracking and milestone automation

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"Design a CI/CD pipeline for a microservices project"** → Multi-stage pipeline, testing strategies, deployment automation
2. **"Implement branch protection and review policies"** → Security controls, approval workflows, compliance
3. **"Automate release management across platforms"** → Cross-platform automation, versioning, changelog generation
4. **"Integrate Git with project management tools"** → API integration, workflow automation, issue tracking
5. **"Set up monitoring and alerting for Git operations"** → DevOps observability, security monitoring, performance tracking

</div>

<div class="concept-section related-concepts">

🔗 **Related concepts**  
`DevOps` · `CI/CD` · `Platform APIs` · `Automation` · `Project Management` · `Security`

</div>

<div class="tags">
  <span class="tag">git-integration</span>
  <span class="tag">devops</span>
  <span class="tag">ci-cd</span>
  <span class="tag">platforms</span>
  <span class="tag">automation</span>
  <span class="tag">medior</span>
</div>

## Summary

Git and version control form the foundation of modern software development, enabling collaboration, history tracking, and code management at scale. This comprehensive guide covers essential concepts through enterprise-level implementations.

**Git Fundamentals**: Repository initialization, staging, committing, and branching provide the core workflow for version control. Understanding the Git data model of snapshots, objects, and references enables effective use of advanced features.

**Branching and Merging**: Feature branches enable parallel development, merge strategies control history integration, and conflict resolution ensures code quality during collaboration.

**Collaboration Workflows**: Remote repositories, push/pull operations, and distributed workflows enable team coordination. Pull requests facilitate code review and quality assurance.

**Advanced Techniques**: Interactive rebase for history cleanup, stashing for temporary changes, and reset/revert for error recovery provide powerful manipulation capabilities.

**Workflow Strategies**: GitFlow for scheduled releases, GitHub Flow for continuous deployment, and trunk-based development for rapid integration address different organizational needs.

**Automation and Quality**: Git hooks enforce standards automatically, while integration with CI/CD systems ensures quality gates and deployment automation.

**Performance Optimization**: Git LFS for large files, shallow clones for faster operations, and repository maintenance techniques handle scaling challenges.

**Enterprise Management**: Governance frameworks, security controls, compliance monitoring, and audit trails address organizational requirements for risk management and regulatory compliance.

**Security**: Commit signing, secret scanning, access control, and audit trails protect intellectual property and ensure code integrity.

**Troubleshooting**: Systematic diagnostic approaches, recovery techniques, and monitoring strategies maintain repository health and resolve complex issues.

**Integration Ecosystems**: Platform APIs, CI/CD pipelines, and development tool integration create seamless workflows that enhance productivity and code quality.

**Best Practices**: Consistent commit messages, atomic commits, regular maintenance, and security awareness create sustainable development practices. Integration with modern development tools and platforms enhances productivity while maintaining code quality.

Git's flexibility and power make it essential for software development teams of all sizes, from individual projects to enterprise-scale organizations with complex compliance and security requirements. Understanding both basic operations and advanced concepts enables teams to leverage Git effectively for reliable, scalable, and secure software development.
- Track binary files in LFS: images, videos, executables
- Avoid committing generated files (build artifacts, dependencies)
- Use .gitignore extensively

### 3. Branch Strategy
- Keep branch count reasonable (<100 active branches)
- Delete merged feature branches promptly
- Use lightweight tags instead of annotated for automated releases
- Avoid very long-lived feature branches

### 4. Commit Practices
- Make atomic commits (single logical change)
- Keep commit messages under 50 characters for summary
- Squash commits before merging to main
- Avoid large refactoring commits that touch many files

### 5. Maintenance Schedule
- Weekly: `git gc --auto`
- Monthly: `git gc --aggressive` (if needed)
- Quarterly: Review repository size and structure
- Annually: Consider repository splitting if >1GB

## Performance Monitoring

### Key Metrics
- Repository size: `git count-objects -vH`
- Largest files: Check regularly for accidental large commits
- Clone time: Measure from different locations
- Operation speed: Status, log, fetch times

### Warning Signs
- Clone time >5 minutes
- Repository size >500MB without LFS
- Git operations consistently slow
- Frequent timeout errors

### Solutions
1. **Immediate**: Shallow clones, sparse checkout
2. **Short-term**: Git LFS migration, cleanup
3. **Long-term**: Repository restructuring, submodules
EOF

echo "✅ Git performance optimization setup complete!"
echo ""
echo "🚀 Optimization techniques configured:"
echo "   • Shallow clones for faster initial setup"
echo "   • Partial clones for large repositories"
echo "   • Sparse checkout for monorepos"
echo "   • Git LFS for large files"
echo "   • Automated maintenance workflows"
echo "   • Performance monitoring tools"
echo ""
echo "💡 Next steps:"
echo "   1. Run: scripts/git-performance-test.sh"
echo "   2. Configure LFS for your file types"
echo "   3. Set up automated maintenance"
echo "   4. Monitor repository metrics regularly"
```
*Notice: Git performance optimization is crucial for large repositories. Implement strategies proactively rather than reactively.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Large files in history**: Committing large files without LFS causes permanent bloat
- **Aggressive GC overuse**: Running `git gc --aggressive` too frequently can degrade performance
- **Shallow clone limitations**: Forgetting that shallow clones can't push to some hosting services
- **Submodule complexity**: Overusing submodules can complicate workflows
- **Ignored maintenance**: Not running regular cleanup leads to gradual performance degradation
- **Binary file tracking**: Forgetting to configure LFS for new large file types

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **Enterprise monorepos**: Large codebases with multiple teams
- **Game development**: Large binary assets and art files
- **Machine learning**: Large datasets and model files
- **Documentation sites**: Many images and media files
- **Open source projects**: Long history and many contributors

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"How to handle large files in Git?"** → Git LFS implementation and alternatives
2. **"Repository is slow, what to check?"** → Performance diagnostics and optimization
3. **"Monorepo vs multirepo strategies"** → Scalability and team workflow considerations
4. **"Git clone takes too long"** → Shallow clones, partial clones, and optimization
5. **"How to reduce repository size?"** → Cleanup strategies and history rewriting
6. **"Submodules vs Git LFS"** → When to use each approach

</div>

<div class="concept-section related-algorithms">

🔗 **Related concepts**  
`Git LFS` · `Repository Management` · `Build Systems` · `CI/CD Optimization` · `Storage Management`

</div>

<div class="tags">
  <span class="tag">git-performance</span>
  <span class="tag">large-repositories</span>
  <span class="tag">git-lfs</span>
  <span class="tag">optimization</span>
  <span class="tag">scalability</span>
  <span class="tag">medior</span>
</div>

---

### Advanced Git Security {#git-security}
<!-- tags: git-security, signing, secrets, compliance -->

<div class="concept-section definition">

📋 **Concept Definition**  
**Git security ensures code integrity, author verification, and protection of sensitive information**. **Commit signing**: GPG/SSH signatures verify commit authorship. **Branch protection**: rules prevent unauthorized changes to critical branches. **Secrets management**: prevent credentials from entering repository history. **Access control**: repository permissions and authentication. **Audit trails**: track all changes and access patterns. **Supply chain security**: verify dependencies and build processes. **Compliance**: meet regulatory requirements (SOX, GDPR, HIPAA). **Threat modeling**: identify and mitigate repository-specific risks.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Code integrity**: ensure code hasn't been tampered with
- **Identity verification**: confirm commit authorship
- **Secret protection**: prevent credential leaks and security breaches
- **Compliance**: meet regulatory and organizational security requirements

</div>

<div class="runnable-model" data-filter="git-security">

**Runnable mental model**
```bash
# GIT SECURITY IMPLEMENTATION

# 1. GPG COMMIT SIGNING
echo "=== GPG COMMIT SIGNING ==="

# Generate GPG key
gpg --full-generate-key
# Choose RSA, 4096 bits, real name and email

# List GPG keys
gpg --list-secret-keys --keyid-format=long

# Get key ID (after sec rsa4096/)
GPG_KEY_ID="ABC123DEF456"

# Configure Git to use GPG key
git config --global user.signingkey $GPG_KEY_ID
git config --global commit.gpgsign true
git config --global tag.gpgsign true

# Export public key for GitHub/GitLab
gpg --armor --export $GPG_KEY_ID

# Sign individual commit
git commit -S -m "feat: add secure authentication module"

# Verify signatures
git log --show-signature -1

# Sign existing commits (rewrite history)
git rebase --exec 'git commit --amend --no-edit -n -S' -i HEAD~3

# 2. SSH COMMIT SIGNING (Alternative to GPG)
echo "=== SSH COMMIT SIGNING ==="

# Generate SSH key for signing (if not exists)
ssh-keygen -t ed25519 -C "your.email@example.com" -f ~/.ssh/id_ed25519_signing

# Configure Git to use SSH signing
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519_signing.pub
git config --global commit.gpgsign true

# Add public key to GitHub/GitLab SSH signing keys
cat ~/.ssh/id_ed25519_signing.pub

# 3. SECRETS DETECTION AND PREVENTION
echo "=== SECRETS DETECTION ==="

# Install git-secrets (AWS tool)
# git clone https://github.com/awslabs/git-secrets.git
# cd git-secrets && make install

# Initialize git-secrets for repository
git secrets --install
git secrets --register-aws

# Add custom patterns
git secrets --add 'password\s*=\s*['\''"][^'\''"]*['\''"]'
git secrets --add 'api[_-]?key\s*[=:]\s*['\''"][^'\''"]*['\''"]'
git secrets --add 'secret\s*[=:]\s*['\''"][^'\''"]*['\''"]'
git secrets --add 'token\s*[=:]\s*['\''"][^'\''"]*['\''"]'

# Scan current repository
git secrets --scan

# Scan entire history
git secrets --scan-history

# Pre-commit hook to prevent secrets
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash

# Run git-secrets
git secrets --pre_commit_hook -- "$@"

# Custom secret detection
if grep -r --include="*.js" --include="*.py" --include="*.env*" \
  -E "(password|secret|key|token|api_key|private_key)\s*[=:]\s*['\"][^'\"]{8,}['\"]" .; then
  echo "❌ Potential secrets detected!"
  echo "Use environment variables or secret management tools instead."
  exit 1
fi

# Check for common credential files
if find . -name "*.pem" -o -name "*.key" -o -name "*.p12" -o -name "*.pfx" | grep -v node_modules; then
  echo "❌ Certificate/key files detected!"
  echo "These should not be committed to the repository."
  exit 1
fi

# Check for environment files with potential secrets
if find . -name ".env*" -not -name ".env.example" | xargs grep -l "=" 2>/dev/null; then
  echo "❌ Environment files with values detected!"
  echo "Only commit .env.example files with placeholder values."
  exit 1
fi
EOF

chmod +x .git/hooks/pre-commit

# 4. BRANCH PROTECTION CONFIGURATION
echo "=== BRANCH PROTECTION ==="

# Example GitHub CLI commands for branch protection
gh api repos/:owner/:repo/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["ci/tests","ci/security-scan"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":2,"dismiss_stale_reviews":true,"require_code_owner_reviews":true}' \
  --field restrictions=null

# Server-side hook for additional protection
cat > .git/hooks/pre-receive << 'EOF'
#!/bin/bash

protected_branches="main master develop"

while read oldrev newrev refname; do
  branch=$(echo $refname | sed 's/refs\/heads\///')
  
  # Check if branch is protected
  if echo "$protected_branches" | grep -q "$branch"; then
    echo "🔒 Validating push to protected branch: $branch"
    
    # Prevent force push
    if [ "$oldrev" != "0000000000000000000000000000000000000000" ]; then
      if ! git merge-base --is-ancestor $oldrev $newrev; then
        echo "❌ Force push to $branch is not allowed!"
        exit 1
      fi
    fi
    
    # Require signed commits
    for commit in $(git rev-list $oldrev..$newrev); do
      if ! git verify-commit $commit 2>/dev/null; then
        echo "❌ Unsigned commit detected: $commit"
        echo "All commits to $branch must be signed."
        exit 1
      fi
    done
    
    # Validate commit messages
    for commit in $(git rev-list $oldrev..$newrev); do
      message=$(git log -1 --pretty=%B $commit)
      if ! echo "$message" | grep -qE "^(feat|fix|docs|style|refactor|test|chore|perf|ci|build|revert)(\(.+\))?: .+"; then
        echo "❌ Invalid commit message in $commit"
        echo "Use conventional commit format: type(scope): description"
        exit 1
      fi
    done
    
    echo "✅ All validations passed for $branch"
  fi
done
EOF

chmod +x .git/hooks/pre-receive

# 5. SECURITY SCANNING AUTOMATION
echo "=== SECURITY SCANNING ==="

# GitHub Actions security workflow
mkdir -p .github/workflows
cat > .github/workflows/security.yml << 'EOF'
name: Security Scan

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 3 * * 1'  # Weekly Monday 3 AM

jobs:
  secret-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Full history for secret scanning
      
      - name: TruffleHog Secret Scan
        uses: trufflesecurity/trufflehog@main
        with:
          path: ./
          base: main
          head: HEAD
          extra_args: --debug --only-verified
      
      - name: GitLeaks Secret Scan
        uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  
  sast-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: CodeQL Analysis
        uses: github/codeql-action/init@v2
        with:
          languages: javascript, python
      
      - name: Autobuild
        uses: github/codeql-action/autobuild@v2
      
      - name: CodeQL Analysis
        uses: github/codeql-action/analyze@v2
  
  dependency-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Dependency Review
        uses: actions/dependency-review-action@v3
        with:
          fail-on-severity: moderate
      
      - name: OWASP Dependency Check
        uses: dependency-check/Dependency-Check_Action@main
        with:
          project: 'security-scan'
          path: '.'
          format: 'HTML'
      
      - name: Upload Dependency Check Report
        uses: actions/upload-artifact@v3
        with:
          name: dependency-check-report
          path: reports/
  
  license-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: License Check
        uses: fossa-contrib/fossa-action@v2
        with:
          api-key: ${{ secrets.FOSSA_API_KEY }}
EOF

# 6. SECRETS MANAGEMENT INTEGRATION
echo "=== SECRETS MANAGEMENT ==="

# Environment configuration template
cat > .env.example << 'EOF'
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/database
DATABASE_PASSWORD=your_secure_password_here

# API Keys
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
SENDGRID_API_KEY=SG.your_sendgrid_api_key
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key

# Authentication
JWT_SECRET=your_jwt_secret_at_least_32_characters_long
SESSION_SECRET=your_session_secret

# External Services
REDIS_URL=redis://localhost:6379
ELASTICSEARCH_URL=http://localhost:9200

# Feature Flags
ENABLE_DEBUG_MODE=false
ENABLE_FEATURE_X=false
EOF

# Secrets validation script
cat > scripts/validate-secrets.sh << 'EOF'
#!/bin/bash

echo "🔍 Validating secrets configuration..."

# Check if .env exists (should not in production)
if [ -f ".env" ]; then
  echo "⚠️  .env file found - ensure this is not in production!"
fi

# Check for hardcoded secrets in code
echo "Scanning for hardcoded secrets..."
if grep -r --include="*.js" --include="*.py" --include="*.java" \
  -E "(password|secret|key|token)\s*[=:]\s*['\"][^'\"]{8,}['\"]" src/; then
  echo "❌ Hardcoded secrets found!"
  exit 1
fi

# Validate environment variables are set
required_vars=(
  "DATABASE_PASSWORD"
  "JWT_SECRET"
  "API_KEY"
)

missing_vars=()
for var in "${required_vars[@]}"; do
  if [ -z "${!var}" ]; then
    missing_vars+=("$var")
  fi
done

if [ ${#missing_vars[@]} -ne 0 ]; then
  echo "❌ Missing required environment variables:"
  printf '%s\n' "${missing_vars[@]}"
  exit 1
fi

echo "✅ Secrets validation passed!"
EOF

chmod +x scripts/validate-secrets.sh

# 7. AUDIT AND COMPLIANCE
echo "=== AUDIT AND COMPLIANCE ==="

# Audit log generation
cat > scripts/generate-audit-log.sh << 'EOF'
#!/bin/bash

echo "📋 Generating Git audit log..."

output_file="audit-log-$(date +%Y%m%d-%H%M%S).json"

# Generate comprehensive audit log
git log --all --full-history --date=iso-strict --pretty=format:'
{
  "commit": "%H",
  "author": "%an",
  "author_email": "%ae",
  "author_date": "%ad",
  "committer": "%cn",
  "committer_email": "%ce",
  "committer_date": "%cd",
  "subject": "%s",
  "body": "%b",
  "signed": "%G?",
  "signer": "%GS",
  "branch": "%D"
},' | \
sed '$s/,$//' | \
sed '1i[' | \
sed '$a]' > "$output_file"

echo "✅ Audit log generated: $output_file"

# Generate compliance report
cat > "compliance-report-$(date +%Y%m%d).md" << 'REPORT'
# Git Repository Compliance Report

**Generated:** $(date)
**Repository:** $(git remote get-url origin)
**Report Period:** Last 90 days

## Signing Compliance
- Total commits: $(git rev-list --count --since="90 days ago" HEAD)
- Signed commits: $(git rev-list --since="90 days ago" HEAD | xargs -I {} git verify-commit {} 2>/dev/null | wc -l)
- Unsigned commits: $(git rev-list --since="90 days ago" HEAD | while read commit; do git verify-commit $commit 2>/dev/null || echo $commit; done | grep -v "gpg:" | wc -l)

## Branch Protection Status
- Protected branches: main, develop
- Required reviews: 2
- Enforce for admins: Yes
- Required status checks: CI/CD pipeline

## Security Scanning
- Last secret scan: $(date)
- Vulnerabilities found: 0
- License compliance: Verified

## Access Control
- Repository visibility: Private
- Team access: Documented
- Admin access: Restricted

## Recommendations
1. Ensure all commits are signed
2. Regular security scanning
3. Update dependencies quarterly
4. Review access permissions monthly
REPORT

echo "✅ Compliance report generated"
EOF

chmod +x scripts/generate-audit-log.sh

# 8. SECURITY POLICY DOCUMENTATION
cat > SECURITY.md << 'EOF'
# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.x.x   | :white_check_mark: |
| 1.x.x   | :x:                |

## Reporting Security Vulnerabilities

If you discover a security vulnerability, please send an email to security@company.com. All security vulnerabilities will be promptly addressed.

**Please do not report security vulnerabilities through public GitHub issues.**

## Security Requirements

### Code Signing
- All commits to main/develop branches must be signed
- Use GPG or SSH signing for commit verification
- Verify signatures before merging pull requests

### Secrets Management
- Never commit secrets, passwords, or API keys
- Use environment variables for configuration
- Rotate secrets regularly (quarterly)
- Use dedicated secret management tools in production

### Dependencies
- Regularly update dependencies (monthly)
- Scan for known vulnerabilities (automated)
- Use only trusted, well-maintained packages
- Pin dependency versions in production

### Access Control
- Enable two-factor authentication
- Use least privilege principle
- Regular access reviews (quarterly)
- Revoke access immediately upon role changes

### Branch Protection
- Require pull request reviews (minimum 2)
- Require status checks to pass
- Enforce signing requirements
- Restrict force pushes and deletions

## Security Testing

### Automated Scanning
- Secret detection in CI/CD pipeline
- SAST (Static Application Security Testing)
- Dependency vulnerability scanning
- License compliance checking

### Manual Reviews
- Security-focused code reviews
- Threat modeling for new features
- Penetration testing (annually)
- Security architecture reviews

## Incident Response

1. **Detection:** Automated alerts and manual reporting
2. **Assessment:** Evaluate severity and impact
3. **Containment:** Immediate actions to limit damage
4. **Eradication:** Remove vulnerabilities
5. **Recovery:** Restore normal operations
6. **Lessons Learned:** Post-incident review

## Compliance

This repository follows:
- SOC 2 Type II controls
- ISO 27001 information security standards
- GDPR data protection requirements
- Industry-specific regulations as applicable
EOF

echo "✅ Git security implementation complete!"
echo ""
echo "🔒 Security measures configured:"
echo "   • GPG/SSH commit signing"
echo "   • Automated secret detection"
echo "   • Branch protection rules"
echo "   • Security scanning pipeline"
echo "   • Audit logging and compliance"
echo "   • Secrets management integration"
echo ""
echo "💡 Next steps:"
echo "   1. Set up GPG/SSH signing keys"
echo "   2. Configure branch protection rules"
echo "   3. Enable security scanning workflows"
echo "   4. Train team on security practices"
echo "   5. Schedule regular security reviews"
```
*Notice: Git security is multi-layered. Implement signing, scanning, and access controls together for comprehensive protection.*

</div>

---

### Git Hooks and Automation {#git-hooks-automation}
<!-- tags: git-hooks, automation, pre-commit, pre-push, ci-cd -->

<div class="concept-section definition">

📋 **Concept Definition**  
**Git hooks are scripts that run automatically at specific points in the Git workflow**. **Client-side hooks**: `pre-commit` (before commit), `prepare-commit-msg` (edit commit message), `commit-msg` (validate message), `post-commit` (after commit), `pre-push` (before push). **Server-side hooks**: `pre-receive` (before accepting push), `update` (per branch), `post-receive` (after accepting push). **Use cases**: code linting, test running, commit message validation, security scanning, deployment triggers. **Tools**: Husky (Node.js), pre-commit (Python), Git hooks directly. **Benefits**: enforce code quality, prevent bugs, automate repetitive tasks.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Quality gates**: prevent bad code from entering repository
- **Automation**: reduce manual tasks and human error
- **Consistency**: enforce team standards automatically
- **Early feedback**: catch issues before code review

</div>

<div class="runnable-model" data-filter="git-hooks">

**Runnable mental model**
```bash
# GIT HOOKS SETUP AND EXAMPLES

# Setup project with comprehensive Git hooks
mkdir my-project-with-hooks
cd my-project-with-hooks
git init

# Install Husky for easy hook management
npm init -y
npm install --save-dev husky lint-staged prettier eslint jest

# Initialize Husky
npx husky install
npm set-script prepare "husky install"

# Pre-commit hook: Run linting and formatting
npx husky add .husky/pre-commit "npm run pre-commit-checks"

# Pre-push hook: Run tests
npx husky add .husky/pre-push "npm run test"

# Commit message hook: Validate conventional commits
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit ${1}'

# Package.json scripts
cat > package.json << 'EOF'
{
  "name": "project-with-hooks",
  "scripts": {
    "prepare": "husky install",
    "pre-commit-checks": "lint-staged && npm run test:unit",
    "test": "jest",
    "test:unit": "jest --testPathPattern=unit",
    "test:integration": "jest --testPathPattern=integration",
    "lint": "eslint src/ --ext .js,.ts",
    "lint:fix": "eslint src/ --ext .js,.ts --fix",
    "format": "prettier --write src/",
    "format:check": "prettier --check src/"
  },
  "lint-staged": {
    "*.{js,ts}": [
      "eslint --fix",
      "prettier --write",
      "git add"
    ],
    "*.{json,md}": [
      "prettier --write",
      "git add"
    ]
  },
  "devDependencies": {
    "husky": "^8.0.3",
    "lint-staged": "^13.2.3",
    "prettier": "^3.0.3",
    "eslint": "^8.45.0",
    "@commitlint/cli": "^17.6.7",
    "@commitlint/config-conventional": "^17.6.7",
    "jest": "^29.6.2"
  }
}
EOF

# Commitlint configuration
cat > .commitlintrc.js << 'EOF'
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation
        'style',    // Code style (formatting, etc)
        'refactor', // Code refactoring
        'test',     // Adding tests
        'chore',    // Maintenance tasks
        'perf',     // Performance improvements
        'ci',       // CI/CD changes
        'build',    // Build system changes
        'revert'    // Reverting changes
      ]
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-max-length': [2, 'always', 100],
    'body-max-line-length': [2, 'always', 200],
    'footer-max-line-length': [2, 'always', 200]
  }
};
EOF

# ESLint configuration
cat > .eslintrc.js << 'EOF'
module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'eqeqeq': 'error',
    'curly': 'error',
    'brace-style': ['error', '1tbs'],
    'comma-dangle': ['error', 'never'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'indent': ['error', 2],
    'max-len': ['error', { code: 120 }],
    'no-trailing-spaces': 'error'
  }
};
EOF

# Prettier configuration
cat > .prettierrc << 'EOF'
{
  "semi": true,
  "trailingComma": "none",
  "singleQuote": true,
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false
}
EOF

# Create sample source files
mkdir -p src tests/unit tests/integration

cat > src/calculator.js << 'EOF'
class Calculator {
  add(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Both arguments must be numbers');
    }
    return a + b;
  }

  subtract(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Both arguments must be numbers');
    }
    return a - b;
  }

  multiply(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Both arguments must be numbers');
    }
    return a * b;
  }

  divide(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Both arguments must be numbers');
    }
    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }
    return a / b;
  }
}

module.exports = Calculator;
EOF

cat > tests/unit/calculator.test.js << 'EOF'
const Calculator = require('../../src/calculator');

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('add', () => {
    test('should add two positive numbers', () => {
      expect(calculator.add(2, 3)).toBe(5);
    });

    test('should add negative numbers', () => {
      expect(calculator.add(-2, -3)).toBe(-5);
    });

    test('should throw error for non-numeric inputs', () => {
      expect(() => calculator.add('2', 3)).toThrow('Both arguments must be numbers');
    });
  });

  describe('divide', () => {
    test('should divide two numbers', () => {
      expect(calculator.divide(6, 2)).toBe(3);
    });

    test('should throw error for division by zero', () => {
      expect(() => calculator.divide(6, 0)).toThrow('Division by zero is not allowed');
    });
  });
});
EOF

# Advanced Git hooks - Custom hook scripts

# Pre-commit hook with comprehensive checks
cat > .husky/pre-commit << 'EOF'
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔍 Running pre-commit checks..."

# Check for secrets and sensitive information
echo "🔐 Checking for secrets..."
if grep -r --include="*.js" --include="*.json" --include="*.env*" \
  -E "(password|secret|key|token|api_key|private_key)" . | grep -v node_modules; then
  echo "❌ Potential secrets detected! Please review and use environment variables."
  exit 1
fi

# Check for debugging code
echo "🐛 Checking for debugging code..."
if grep -r --include="*.js" --include="*.ts" \
  -E "(console\.log|debugger|TODO|FIXME)" src/; then
  echo "⚠️  Debugging code detected. Please remove before committing."
  echo "If intentional, add // eslint-disable-line no-console"
fi

# Check file sizes
echo "📏 Checking file sizes..."
large_files=$(find . -type f -size +1M | grep -v node_modules | grep -v .git)
if [ -n "$large_files" ]; then
  echo "❌ Large files detected (>1MB):"
  echo "$large_files"
  echo "Consider using Git LFS for large files."
  exit 1
fi

# Run lint-staged
echo "🧹 Running linting and formatting..."
npx lint-staged

# Run unit tests
echo "🧪 Running unit tests..."
npm run test:unit

echo "✅ Pre-commit checks passed!"
EOF

chmod +x .husky/pre-commit

# Pre-push hook with security and quality checks
cat > .husky/pre-push << 'EOF'
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🚀 Running pre-push checks..."

# Get current branch
current_branch=$(git rev-parse --abbrev-ref HEAD)
echo "📍 Current branch: $current_branch"

# Prevent direct push to main/master
if [ "$current_branch" = "main" ] || [ "$current_branch" = "master" ]; then
  echo "❌ Direct push to $current_branch is not allowed!"
  echo "Please create a feature branch and submit a pull request."
  exit 1
fi

# Run full test suite
echo "🧪 Running full test suite..."
npm run test

# Check test coverage
echo "📊 Checking test coverage..."
if ! npm run test -- --coverage --coverageThreshold='{"global":{"branches":80,"functions":80,"lines":80,"statements":80}}'; then
  echo "❌ Test coverage is below 80%!"
  echo "Please add more tests before pushing."
  exit 1
fi

# Security audit
echo "🔒 Running security audit..."
if ! npm audit --audit-level=moderate; then
  echo "❌ Security vulnerabilities detected!"
  echo "Please run 'npm audit fix' to resolve issues."
  exit 1
fi

# Check for merge conflicts markers
echo "🔍 Checking for merge conflict markers..."
if grep -r --include="*.js" --include="*.ts" --include="*.json" \
  -E "(<{7}|={7}|>{7})" src/; then
  echo "❌ Merge conflict markers detected!"
  echo "Please resolve conflicts before pushing."
  exit 1
fi

# Validate branch naming convention
echo "📝 Validating branch name..."
if ! echo "$current_branch" | grep -qE "^(feature|bugfix|hotfix|release)\/[a-z0-9-]+$"; then
  echo "⚠️  Branch name '$current_branch' doesn't follow convention:"
  echo "   Expected: feature/description, bugfix/description, hotfix/description, release/version"
  echo "   Continuing anyway..."
fi

echo "✅ Pre-push checks passed!"
EOF

chmod +x .husky/pre-push

# Post-commit hook for notifications
cat > .husky/post-commit << 'EOF'
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Get commit information
commit_hash=$(git rev-parse HEAD)
commit_message=$(git log -1 --pretty=%B)
author=$(git log -1 --pretty=%an)
branch=$(git rev-parse --abbrev-ref HEAD)

echo "📝 Commit successful!"
echo "   Hash: $commit_hash"
echo "   Branch: $branch"
echo "   Author: $author"
echo "   Message: $commit_message"

# Optional: Send notification to Slack/Discord/Teams
# curl -X POST -H 'Content-type: application/json' \
#   --data "{\"text\":\"New commit by $author on $branch: $commit_message\"}" \
#   $SLACK_WEBHOOK_URL

# Generate/update documentation if needed
if echo "$commit_message" | grep -q "docs:"; then
  echo "📚 Documentation commit detected, consider updating README or docs/"
fi

# Suggest creating PR for feature branches
if echo "$branch" | grep -q "^feature/"; then
  echo "💡 Feature branch detected. Consider creating a pull request:"
  echo "   gh pr create --title \"$commit_message\" --body \"Description of changes\""
fi
EOF

chmod +x .husky/post-commit

# Server-side hooks example (for Git hosting)

# Pre-receive hook (runs on server before accepting push)
mkdir -p .git/hooks
cat > .git/hooks/pre-receive << 'EOF'
#!/bin/bash

# Read old and new commit hashes
while read oldrev newrev refname; do
  # Get branch name
  branch=$(echo $refname | sed 's/refs\/heads\///')
  
  echo "Validating push to branch: $branch"
  
  # Prevent force push to protected branches
  if [ "$branch" = "main" ] || [ "$branch" = "develop" ]; then
    if [ "$oldrev" != "0000000000000000000000000000000000000000" ]; then
      # Check if this is a force push
      if ! git merge-base --is-ancestor $oldrev $newrev; then
        echo "❌ Force push to $branch is not allowed!"
        exit 1
      fi
    fi
  fi
  
  # Validate commit messages
  for commit in $(git rev-list $oldrev..$newrev); do
    message=$(git log -1 --pretty=%B $commit)
    
    # Check conventional commit format
    if ! echo "$message" | grep -qE "^(feat|fix|docs|style|refactor|test|chore|perf|ci|build|revert)(\(.+\))?: .+"; then
      echo "❌ Invalid commit message format in $commit:"
      echo "   $message"
      echo "   Expected format: type(scope): description"
      exit 1
    fi
    
    # Check for secrets
    if git show $commit | grep -qE "(password|secret|key|token|api_key).*="; then
      echo "❌ Potential secrets detected in commit $commit"
      exit 1
    fi
  done
  
  echo "✅ Validation passed for $branch"
done
EOF

chmod +x .git/hooks/pre-receive

# Post-receive hook (runs after accepting push)
cat > .git/hooks/post-receive << 'EOF'
#!/bin/bash

# Read pushed references
while read oldrev newrev refname; do
  branch=$(echo $refname | sed 's/refs\/heads\///')
  
  echo "Processing push to branch: $branch"
  
  # Trigger CI/CD for main branch
  if [ "$branch" = "main" ]; then
    echo "🚀 Triggering deployment for main branch..."
    
    # Example: Trigger GitHub Actions workflow
    # curl -X POST \
    #   -H "Authorization: token $GITHUB_TOKEN" \
    #   -H "Accept: application/vnd.github.v3+json" \
    #   "https://api.github.com/repos/owner/repo/actions/workflows/deploy.yml/dispatches" \
    #   -d '{"ref":"main"}'
    
    # Example: Deploy to staging/production
    # ./deploy.sh $newrev
  fi
  
  # Auto-create pull request for feature branches
  if echo "$branch" | grep -q "^feature/"; then
    echo "💡 Feature branch detected. Creating pull request..."
    
    # Get latest commit message for PR title
    title=$(git log -1 --pretty=%s $newrev)
    
    # Example: Create PR via GitHub CLI
    # gh pr create --title "$title" --body "Auto-created PR for $branch" --base main --head $branch
  fi
  
  # Send notifications
  author=$(git log -1 --pretty=%an $newrev)
  commit_count=$(git rev-list --count $oldrev..$newrev)
  
  echo "📧 Sending notifications..."
  echo "   Author: $author"
  echo "   Commits: $commit_count"
  echo "   Branch: $branch"
  
  # Example: Send to Slack
  # curl -X POST -H 'Content-type: application/json' \
  #   --data "{\"text\":\"$author pushed $commit_count commits to $branch\"}" \
  #   $SLACK_WEBHOOK_URL
done
EOF

chmod +x .git/hooks/post-receive

# Test the hooks setup
git add .
git commit -m "feat: setup comprehensive Git hooks with quality gates

- Pre-commit: linting, formatting, secrets detection, file size checks
- Pre-push: full test suite, coverage validation, security audit
- Commit message validation with conventional commits
- Server-side hooks for protected branch validation
- Automated notifications and CI/CD triggers"

# This will trigger all the pre-commit checks we configured

echo "✅ Git hooks setup complete!"
echo ""
echo "🎯 Configured hooks:"
echo "   • Pre-commit: code quality, secrets detection, tests"
echo "   • Pre-push: full test suite, coverage, security audit"
echo "   • Commit-msg: conventional commit validation"
echo "   • Post-commit: notifications and suggestions"
echo ""
echo "💡 Try making a commit with invalid format to test validation!"
```
*Notice: Git hooks automate quality gates and team workflows. Use client-side hooks for development workflow and server-side hooks for repository protection.*

</div>
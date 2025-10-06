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

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*A Git repository is like a time machine vault: it stores every version of your project, lets you travel back in time, and creates parallel timelines (branches) for different experiments.*

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

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*The .gitignore file is like a bouncer at a club: it tells Git which files/folders can enter version control and which should be kept out.*

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

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*A commit is like taking a snapshot: it captures the exact state of your project at that moment, with a description of what changed and why.*

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

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Branches are like parallel universes: you can experiment in one universe without affecting the main timeline, then merge successful experiments back.*

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

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Merge is like combining two rivers - you can see where each river came from. Rebase is like redirecting one river to flow from a different source - cleaner but rewrites history.*

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

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*A Pull Request is like submitting a proposal: you present your changes, others review and discuss them, then the proposal is accepted or rejected.*

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

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*GitFlow is like a factory assembly line: features move through development → staging → production with strict quality control at each step.*

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

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Advanced Git techniques are like a master craftsman's toolkit: while basic tools get the job done, specialized tools solve complex problems elegantly.*

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

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Git tags are like milestones on a road: they mark important points along the journey. Lightweight tags are simple signs "v1.0", annotated tags are information boards with full descriptions: who set it, when, and why.*

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

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Git security is like digital fortress protection: you need secure gates (SSH keys), guards (access controls), and audit logs (commit signing) to protect your code treasures.*

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

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Git performance optimization is like tuning a race car: regular maintenance, removing unnecessary weight, and using the right fuel makes everything run faster.*

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

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Git best practices are like rules of the road: following them prevents accidents, ensures smooth traffic flow, and makes everyone's journey more predictable.*

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

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Clone is like photocopying a book to read at home. Fork is like getting your own copy to edit and potentially publish your version.*

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

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Staging area is like a shopping cart: you put items (changes) in the cart before checking out (committing). You can add, remove, or modify items before finalizing the purchase.*

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
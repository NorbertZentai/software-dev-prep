# CI/CD & DevOps

## Rövid összefoglaló

A DevOps kulturális és technológiai megközelítés a fejlesztési és üzemeltetési csapatok közötti együttműködés javítására. CI/CD (Continuous Integration/Continuous Deployment) automatizált pipeline-okat biztosít a kód integrációjához, teszteléséhez és telepítéséhez. Modern DevOps stack: Git, Docker, Kubernetes, Jenkins, GitLab CI, GitHub Actions. Infrastructure as Code (IaC) tools: Terraform, Ansible, CloudFormation. Monitoring és observability: Prometheus, Grafana, ELK stack, Jaeger. Containerizáció és orchestration alapvető. Fő előnyök: gyorsabb release ciklusok, automatizált quality gates, scalable infrastructure. Kihívások: kulturális változás, tooling komplexitás, security integration, cost optimization.

<!-- Reading Progress Bar -->
<div id="read-progress"></div>

<!-- Tag Filter -->
<div class="tag-filter-container">
  <div class="tag-filter-header">
    <span class="filter-icon">🔍</span>
    <span>Szűrés témakör szerint</span>
  </div>
  <div class="tag-filter-chips">
    <button class="filter-chip" data-filter="all">Összes</button>
    <button class="filter-chip" data-filter="junior">Junior</button>
    <button class="filter-chip" data-filter="medior">Medior</button>
    <button class="filter-chip" data-filter="pipeline">Pipeline</button>
    <button class="filter-chip" data-filter="docker">Docker</button>
    <button class="filter-chip" data-filter="kubernetes">Kubernetes</button>
    <button class="filter-chip" data-filter="monitoring">Monitoring</button>
    <button class="filter-chip" data-filter="iac">IaC</button>
  </div>
</div>

## Fogalmak

### Continuous Integration (CI) alapelvek {#continuous-integration}

<div class="concept-section mental-model" data-filter="pipeline junior">

<details>
<summary>🔄 <strong>Fogalom meghatározása</strong></summary>

<div>

A **Continuous Integration (CI)** egy szoftverfejlesztési gyakorlat, amelyben a fejlesztők gyakran (akár naponta többször is) integrálják kódváltoztatásaikat egy közös verziókezelő repositoryba. Minden integráció után automatikus build és tesztelési folyamat fut le, amely azonnal visszajelzést ad a kód minőségéről. 

**Fő elemei:**
- **Gyakori commit-ok** a verziókezelő rendszerbe (Git)
- **Automatikus build process** minden commit után
- **Automatikus tesztelés** (unit, integration tests)
- **Azonnali feedback** a fejlesztőknek hiba esetén
- **Kód minőség ellenőrzés** (linting, code analysis)

A CI célja a korai hibafeltárás és a folyamatos kódintegráció fenntartása, csökkentve az integráció konfliktusokat és gyorsítva a fejlesztési ciklust.

</div>

</details>

</div>

<div class="concept-section why-important" data-filter="pipeline junior">

<details>
<summary>💡 <strong>Miért számít?</strong></summary>

<div>

- **Korai hibafeltárás**: Problémák azonosítása percekkel a commit után, nem napokkal később
- **Merge konfliktuseliminálás**: Gyakori integráció csökkenti a code conflict-okat
- **Kód minőség biztosítása**: Automatikus code quality checks minden változásnál
- **Team productivity**: Fejlesztők azonnal tudják, ha törtek valamit

</div>

</details>

</div>

<div class="runnable-model" data-filter="pipeline">

<details>
<summary><strong>Runnable mental model</strong></summary>

<div>

**GitHub Actions CI workflow:**
```yaml
name: Continuous Integration

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  continuous-integration:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [16, 18, 20]
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Code quality checks
      run: |
        npm run lint
        npm run format:check
        npm run type-check
        
    - name: Run unit tests
      run: npm run test:unit -- --coverage
      
    - name: Run integration tests
      run: npm run test:integration
      
    - name: Build application
      run: npm run build
      
    - name: Upload test coverage
      uses: codecov/codecov-action@v3
      if: matrix.node-version == 18
      
    - name: Notify on failure
      if: failure()
      uses: 8398a7/action-slack@v3
      with:
        status: failure
        channel: '#ci-notifications'
        webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

**Java Maven CI example:**
```yaml
name: Java CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:13
        env:
          POSTGRES_PASSWORD: test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Set up JDK 17
      uses: actions/setup-java@v3
      with:
        java-version: '17'
        distribution: 'temurin'
        
    - name: Cache Maven dependencies
      uses: actions/cache@v3
      with:
        path: ~/.m2
        key: ${{ runner.os }}-m2-${{ hashFiles('**/pom.xml') }}
        
    - name: Compile code
      run: mvn compile -B
      
    - name: Run tests
      run: mvn test -B
      env:
        DATABASE_URL: postgresql://postgres:test@localhost:5432/test
        
    - name: Generate test report
      uses: dorny/test-reporter@v1
      if: success() || failure()
      with:
        name: Maven Tests
        path: target/surefire-reports/*.xml
        reporter: java-junit
        
    - name: Code coverage
      run: mvn jacoco:report
      
    - name: SonarQube analysis
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
      run: mvn sonar:sonar
```

**CI best practices config:**
```yaml
# .github/workflows/ci-best-practices.yml
name: CI Best Practices

on:
  push:
  pull_request:

env:
  # Fail fast on first error
  CI: true
  # Cache optimization
  CACHE_VERSION: v1

jobs:
  fast-feedback:
    name: Fast Feedback Loop
    runs-on: ubuntu-latest
    timeout-minutes: 10  # Fail fast if stuck
    
    steps:
    - uses: actions/checkout@v4
      with:
        fetch-depth: 1  # Shallow clone for speed
        
    - name: Setup environment
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    # Run fastest checks first
    - name: Syntax check
      run: npm run lint:syntax
      
    - name: Type checking
      run: npm run type-check
      
    - name: Unit tests (fast subset)
      run: npm run test:unit:fast
      
    # Parallel execution for independent tasks
  quality-gates:
    name: Quality Gates
    runs-on: ubuntu-latest
    needs: fast-feedback
    
    strategy:
      matrix:
        check: [lint, test, security, coverage]
        
    steps:
    - uses: actions/checkout@v4
    
    - name: Run ${{ matrix.check }}
      run: |
        case "${{ matrix.check }}" in
          lint)
            npm run lint:full
            ;;
          test)
            npm run test:all
            ;;
          security)
            npm audit --audit-level=high
            ;;
          coverage)
            npm run test:coverage
            ;;
        esac
        
  build-validation:
    name: Build Validation
    runs-on: ubuntu-latest
    needs: [fast-feedback, quality-gates]
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Build application
      run: npm run build
      
    - name: Validate build artifacts
      run: |
        test -f dist/index.html
        test -f dist/main.js
        echo "Build artifacts validated"
        
    - name: Store build artifacts
      uses: actions/upload-artifact@v3
      with:
        name: build-artifacts
        path: dist/
        retention-days: 7
```

</div>

</details>

</div>

<div class="concept-section myths" data-filter="pipeline">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

❌ **"CI lassítja a fejlesztést"**  
✅ Kezdetben setup overhead, de hosszú távon exponenciálisan gyorsítja a team velocity-t

❌ **"Minden test minden commit-nál fusson"**  
✅ Test pyramid: gyors unit testek minden commit-nál, lassabb integration/e2e testek csak merge előtt

❌ **"CI = automated testing"**  
✅ CI magában foglalja a code quality, security scanning, build validation és deployment preparation-t is

❌ **"Ha a CI zöld, a kód production-ready"**  
✅ CI csak az első lépés, CD pipeline további validation és deployment lépéseket tartalmaz

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="pipeline">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**CI pipeline optimalizálás:**
```bash
# Parallel execution tesztelés
npm run lint & npm run type-check & wait

# Cache effectiveness mérés
echo "Cache hit rate: $(npm ci --verbose | grep cache | wc -l)"

# Build time monitoring
time npm run build
```

**Quick CI health check:**
```yaml
# Minimum CI checks minden commit-hoz
- Syntax validation (< 30 sec)
- Unit tests (< 2 min)
- Build verification (< 5 min)
- Security scan (< 3 min)
```

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="pipeline junior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mi a Continuous Integration lényege?**
A: Frequent code integration automated build/test-tel. Korai feedback, merge konfliktusok minimalizálása, consistent code quality biztosítása.

**Q: Hogyan optimalizálnád egy lassú CI pipeline-t?**
A: Parallel execution, caching, test optimization (unit > integration > e2e), incremental builds, proper resource allocation.

**Q: Mit csinálnál, ha a CI gyakran fail-el flaky testek miatt?**
A: Test stability analysis, retry mechanisms, test isolation improvement, environment consistency biztosítása.

**Q: Hogyan kezelnéd a CI-ban a secrets-eket?**
A: Environment variables, CI/CD platform secret stores, soha commit-ba, encryption at rest/transit.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="pipeline">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **Continuous Delivery** → CI kimenet mint CD input
- **Git branching strategies** → CI trigger patterns
- **Testing frameworks** → CI validation steps
- **Code quality tools** → CI quality gates
- **Artifact repositories** → CI build outputs

</div>

</details>

</div>

---

### Continuous Delivery vs Continuous Deployment {#cd-vs-cd}

<div class="concept-section mental-model" data-filter="pipeline medior">

<details>
<summary>📦 <strong>Fogalom meghatározása</strong></summary>

<div>

A **Continuous Delivery (CD)** és **Continuous Deployment** gyakran összetévesztett, de fontos különbségekkel bíró fogalmak:

**Continuous Delivery:**
- A kód mindig **deployment-ready** állapotban van
- Minden commit automatikusan átmegy a teljes build, test és release pipeline-on
- **Manuális jóváhagyás** szükséges a production deployment-hez
- Human gate van a végső éles környezetbe jutás előtt
- Deployment döntés üzleti vagy stratégiai megfontolásból történik

**Continuous Deployment:**
- **Teljes automatizáció**: minden sikeres commit automatikusan production-be kerül
- Nincs manuális beavatkozás a deployment folyamatban
- Automatic rollback mechanizmusokkal rendelkezik
- Magas fokú automatizált tesztelést és monitoring-ot igényel
- Gyorsabb feedback loop a felhasználóktól

**Fő különbség:** Delivery-nél lehet dönteni, mikor deployolunk. Deployment-nél minden zöld build automatikusan élesbe megy.

</div>

</details>

</div>

<div class="concept-section why-important" data-filter="pipeline medior">

<details>
<summary>💡 <strong>Miért számít?</strong></summary>

<div>

- **Release flexibility**: Delivery engedi a strategic timing-ot, Deployment maximalizálja a speed-et
- **Risk management**: Delivery human oversight-tal, Deployment automated safety nets-szel
- **Business alignment**: Delivery business decision-ökkel, Deployment technical maturity-vel
- **Feedback loop**: Deployment gyorsabb user feedback, Delivery kontrollált release process

</div>

</details>

</div>

<div class="runnable-model" data-filter="pipeline">

<details>
<summary><strong>Runnable mental model</strong></summary>

<div>

**Continuous Delivery pipeline (manual production trigger):**
```yaml
name: Continuous Delivery

on:
  push:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Build and test
      run: |
        npm ci
        npm run build
        npm test
    - name: Package application
      run: |
        docker build -t myapp:${{ github.sha }} .
        docker tag myapp:${{ github.sha }} myapp:latest
    - name: Push to registry
      run: |
        docker push myapp:${{ github.sha }}
        docker push myapp:latest

  deploy-staging:
    needs: build-and-test
    runs-on: ubuntu-latest
    environment: staging
    steps:
    - name: Deploy to staging
      run: |
        kubectl set image deployment/myapp myapp=myapp:${{ github.sha }} -n staging
        kubectl rollout status deployment/myapp -n staging
    - name: Run acceptance tests
      run: |
        npm run test:acceptance -- --base-url=https://staging.myapp.com

  # Manual approval required for production
  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://myapp.com
    # Manual approval gate here
    steps:
    - name: Deploy to production
      run: |
        kubectl set image deployment/myapp myapp=myapp:${{ github.sha }} -n production
        kubectl rollout status deployment/myapp -n production
    - name: Smoke tests
      run: |
        curl -f https://myapp.com/health
    - name: Notify stakeholders
      run: |
        slack-notify "Production deployment completed: v${{ github.sha }}"
```

**Continuous Deployment pipeline (full automation):**
```yaml
name: Continuous Deployment

on:
  push:
    branches: [main]

jobs:
  automated-deployment:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Quality gates
      run: |
        npm ci
        npm run lint
        npm run test:unit
        npm run test:integration
        npm run security:scan
        
    - name: Build and security scan
      run: |
        docker build -t myapp:${{ github.sha }} .
        # Container security scan
        trivy image myapp:${{ github.sha }}
        
    - name: Deploy to production (automated)
      run: |
        # Canary deployment
        kubectl apply -f k8s/canary-deployment.yaml
        kubectl set image deployment/myapp-canary myapp=myapp:${{ github.sha }}
        
        # Wait and validate canary
        sleep 120
        if curl -f https://canary.myapp.com/health; then
          # Promote canary to full deployment
          kubectl patch service myapp -p '{"spec":{"selector":{"version":"canary"}}}'
          kubectl scale deployment/myapp-main --replicas=0
          kubectl scale deployment/myapp-canary --replicas=3
        else
          # Auto-rollback on failure
          kubectl delete deployment/myapp-canary
          exit 1
        fi
        
    - name: Post-deployment validation
      run: |
        # Health checks
        curl -f https://myapp.com/health
        # Performance validation
        npm run test:performance -- --threshold=2000ms
        # Business metrics validation
        npm run validate:metrics
        
    - name: Rollback on validation failure
      if: failure()
      run: |
        # Automatic rollback
        kubectl rollout undo deployment/myapp -n production
        slack-notify "Auto-rollback executed for failed deployment"
```

**Feature flag enabled CD:**
```yaml
name: Feature Flag Continuous Deployment

on:
  push:
    branches: [main]

jobs:
  deploy-with-feature-flags:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Build with feature flags
      run: |
        docker build \
          --build-arg FEATURE_NEW_CHECKOUT=false \
          --build-arg FEATURE_RECOMMENDED_PRODUCTS=true \
          -t myapp:${{ github.sha }} .
          
    - name: Deploy to production
      run: |
        kubectl set image deployment/myapp myapp=myapp:${{ github.sha }}
        kubectl rollout status deployment/myapp
        
    - name: Gradual feature rollout
      run: |
        # Start with 1% of users
        curl -X POST https://feature-flags.myapp.com/api/flags/new-checkout \
          -d '{"enabled": true, "percentage": 1}'
          
        # Monitor metrics for 10 minutes
        sleep 600
        
        # Check error rates and performance
        ERROR_RATE=$(curl -s https://metrics.myapp.com/error-rate)
        if (( $(echo "$ERROR_RATE < 0.01" | bc -l) )); then
          # Gradually increase to 10%
          curl -X PUT https://feature-flags.myapp.com/api/flags/new-checkout \
            -d '{"percentage": 10}'
        else
          # Disable feature on high error rate
          curl -X PUT https://feature-flags.myapp.com/api/flags/new-checkout \
            -d '{"enabled": false}'
        fi
```

**CD decision matrix implementation:**
```python
# cd-strategy-selector.py
class DeploymentStrategy:
    def __init__(self, app_config):
        self.config = app_config
        
    def select_strategy(self):
        # Business criticality assessment
        if self.config.get('criticality') == 'high':
            if self.config.get('team_maturity') == 'advanced':
                return 'continuous_deployment_with_canary'
            else:
                return 'continuous_delivery_manual_prod'
                
        elif self.config.get('release_frequency') == 'multiple_daily':
            if self.config.get('automated_tests_coverage') > 80:
                return 'continuous_deployment'
            else:
                return 'continuous_delivery'
                
        else:
            return 'continuous_delivery_scheduled'
    
    def get_pipeline_config(self, strategy):
        configs = {
            'continuous_deployment': {
                'auto_deploy_prod': True,
                'approval_required': False,
                'rollback_automation': True,
                'feature_flags': True
            },
            'continuous_delivery': {
                'auto_deploy_prod': False,
                'approval_required': True,
                'rollback_automation': True,
                'feature_flags': False
            }
        }
        return configs.get(strategy, configs['continuous_delivery'])

# Usage example
app_config = {
    'criticality': 'medium',
    'team_maturity': 'intermediate',
    'release_frequency': 'daily',
    'automated_tests_coverage': 85
}

strategy_selector = DeploymentStrategy(app_config)
recommended_strategy = strategy_selector.select_strategy()
pipeline_config = strategy_selector.get_pipeline_config(recommended_strategy)

print(f"Recommended: {recommended_strategy}")
print(f"Config: {pipeline_config}")
```

</div>

</details>

</div>

<div class="concept-section myths" data-filter="pipeline">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

❌ **"Continuous Deployment minden team-nek jó"**  
✅ Függ a team maturity-től, business requirements-től és risk tolerance-től

❌ **"Manual approval lassítja a process-t"**  
✅ Continuous Delivery-ben az approval gyors lehet, mert minden előkészített és tesztelt

❌ **"Feature flags complicat-álja a kódot"**  
✅ Jól implementált feature flag system egyszerűsíti a deployment process-t és csökkenti a risk-et

❌ **"CD eliminálja a bugs-okat"**  
✅ CD gyorsabb feedback loop-ot biztosít a bugs javításához, nem eliminálásához

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="pipeline">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**CD maturity assessment:**
```bash
# Check deployment frequency
git log --since="1 month ago" --oneline | grep "deploy" | wc -l

# Test coverage check
npm run test:coverage | grep "Statements"

# Feature flag readiness
grep -r "featureFlag\|toggle" src/ | wc -l
```

**CD vs CD decision tree:**
```
High business criticality + Advanced team → CD with canary
High business criticality + Junior team → Continuous Delivery  
Low business criticality + Any team → Continuous Deployment
```

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="pipeline medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mi a különbség Continuous Delivery és Continuous Deployment között?**
A: Delivery = deployment-ready but manual trigger. Deployment = automated production release. Delivery human approval, Deployment full automation.

**Q: Mikor választanál Continuous Deployment helyett Continuous Delivery-t?**
A: Regulated industries, high business criticality, compliance requirements, team maturity concerns, strategic release timing needs.

**Q: Hogyan biztosítod a quality-t Continuous Deployment-ben?**
A: Comprehensive automated testing, feature flags, canary deployments, monitoring/alerting, automated rollback mechanisms.

**Q: Mi a feature flag role a CD process-ben?**
A: Decouple deployment from release, gradual rollout, instant rollback, A/B testing, risk mitigation.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="pipeline">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **Feature flags** → Deployment/release decoupling
- **Canary deployment** → CD risk mitigation
- **Monitoring** → CD validation és rollback triggers
- **Testing strategies** → CD quality assurance
- **Infrastructure as Code** → CD environment consistency

</div>

</details>

</div>

---

### Pipeline Stages {#pipeline-stages}

<div class="concept-section mental-model" data-filter="pipeline junior">

<details>
<summary>📋 <strong>Fogalom meghatározása</strong></summary>

<div>

A CI/CD pipeline stages szekvenciális vagy párhuzamos lépések, amelyek a kód életciklusát reprezentálják source-tól production-ig:

**1. Source Stage** = Kód checkout version control-ból (Git clone/pull)
**2. Build Stage** = Compilation, dependency resolution, artifact creation (Maven/Gradle/npm build)
**3. Test Stage** = Automated testing (unit, integration, E2E), code quality checks (SonarQube)
**4. Security Stage** = Vulnerability scanning (SAST, DAST, dependency check), secrets detection
**5. Deploy Stage** = Environment-specifikus deployment (dev/staging/prod), infrastructure provisioning
**6. Release Stage** = Production traffic routing, feature flag activation, blue-green/canary deployment

Minden stage **quality gate**-tel validálja az artifact-ot a következő lépés előtt.

</div>

</details>

</div>

<div class="concept-section why-important" data-filter="pipeline junior">

<details>
<summary>💡 <strong>Miért számít?</strong></summary>

<div>

- **Fail fast principle**: Korai stages-ben olcsóbb a hibákat megtalálni és javítani
- **Parallel execution**: Independent stages egyidejűleg futhatnak, csökkentve a total pipeline time-ot
- **Clear separation of concerns**: Minden stage specifikus felelősséggel rendelkezik
- **Quality gates**: Structured approach a code quality és security biztosításához

</div>

</details>

</div>

<div class="runnable-model" data-filter="pipeline">

<details>
<summary><strong>Runnable mental model</strong></summary>

<div>

**Comprehensive pipeline stages:**
```yaml
name: Multi-Stage Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

stages:
  - source
  - build
  - test
  - security
  - package
  - deploy
  - release

jobs:
  # Stage 1: Source
  source:
    name: Source Code Preparation
    runs-on: ubuntu-latest
    outputs:
      version: ${{ steps.version.outputs.version }}
      changed-files: ${{ steps.changes.outputs.files }}
    steps:
    - name: Checkout source code
      uses: actions/checkout@v4
      with:
        fetch-depth: 0  # Full history for versioning
        
    - name: Generate version
      id: version
      run: |
        if [[ "${{ github.ref }}" == "refs/tags/"* ]]; then
          VERSION=${GITHUB_REF#refs/tags/}
        else
          VERSION="$(date +%Y%m%d)-${GITHUB_SHA::8}"
        fi
        echo "version=$VERSION" >> $GITHUB_OUTPUT
        
    - name: Detect changed files
      id: changes
      run: |
        CHANGED_FILES=$(git diff --name-only HEAD~1 HEAD)
        echo "files=$CHANGED_FILES" >> $GITHUB_OUTPUT

  # Stage 2: Build (Parallel for different components)
  build:
    name: Build Application
    runs-on: ubuntu-latest
    needs: source
    strategy:
      matrix:
        component: [frontend, backend, api-docs]
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup build environment
      run: |
        case "${{ matrix.component }}" in
          frontend)
            npm ci
            ;;
          backend)
            mvn dependency:go-offline
            ;;
          api-docs)
            pip install -r requirements.txt
            ;;
        esac
        
    - name: Build component
      run: |
        case "${{ matrix.component }}" in
          frontend)
            npm run build
            ;;
          backend)
            mvn clean compile
            ;;
          api-docs)
            mkdocs build
            ;;
        esac
        
    - name: Store build artifacts
      uses: actions/upload-artifact@v3
      with:
        name: ${{ matrix.component }}-build
        path: |
          dist/
          target/
          site/

  # Stage 3: Test (Parallel test types)
  test:
    name: Automated Testing
    runs-on: ubuntu-latest
    needs: build
    strategy:
      matrix:
        test-type: [unit, integration, e2e, performance]
        
    services:
      postgres:
        image: postgres:13
        env:
          POSTGRES_PASSWORD: test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
          
    steps:
    - uses: actions/checkout@v4
    
    - name: Download build artifacts
      uses: actions/download-artifact@v3
      
    - name: Setup test environment
      run: |
        case "${{ matrix.test-type }}" in
          unit)
            npm ci
            ;;
          integration)
            docker-compose -f test/docker-compose.test.yml up -d
            ;;
          e2e)
            npx playwright install
            ;;
          performance)
            npm install -g k6
            ;;
        esac
        
    - name: Execute tests
      run: |
        case "${{ matrix.test-type }}" in
          unit)
            npm run test:unit -- --coverage
            ;;
          integration)
            npm run test:integration
            ;;
          e2e)
            npm run test:e2e
            ;;
          performance)
            k6 run tests/performance/load-test.js
            ;;
        esac
        
    - name: Upload test results
      uses: actions/upload-artifact@v3
      if: always()
      with:
        name: test-results-${{ matrix.test-type }}
        path: |
          coverage/
          test-results/
          reports/

  # Stage 4: Security Scanning
  security:
    name: Security Analysis
    runs-on: ubuntu-latest
    needs: build
    strategy:
      matrix:
        scan-type: [dependencies, secrets, container, sast]
        
    steps:
    - uses: actions/checkout@v4
    
    - name: Security scan
      run: |
        case "${{ matrix.scan-type }}" in
          dependencies)
            npm audit --audit-level=moderate
            ;;
          secrets)
            trufflehog git https://github.com/${{ github.repository }} --since-commit HEAD~10
            ;;
          container)
            docker build -t security-scan:latest .
            trivy image security-scan:latest
            ;;
          sast)
            # Static Application Security Testing
            sonar-scanner
            ;;
        esac
        
    - name: Security report
      uses: actions/upload-artifact@v3
      if: always()
      with:
        name: security-scan-${{ matrix.scan-type }}
        path: |
          security-reports/
          
  # Stage 5: Package
  package:
    name: Package Application
    runs-on: ubuntu-latest
    needs: [test, security]
    if: success()
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Download all artifacts
      uses: actions/download-artifact@v3
      
    - name: Build Docker images
      run: |
        # Multi-stage build for optimal image size
        docker build \
          --build-arg VERSION=${{ needs.source.outputs.version }} \
          --build-arg BUILD_DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ") \
          --build-arg VCS_REF=${GITHUB_SHA} \
          -t myapp:${{ needs.source.outputs.version }} \
          -t myapp:latest .
          
    - name: Sign container image
      run: |
        # Container signing for security
        cosign sign myapp:${{ needs.source.outputs.version }}
        
    - name: Push to registry
      run: |
        docker push myapp:${{ needs.source.outputs.version }}
        docker push myapp:latest

  # Stage 6: Deploy (Environment-specific)
  deploy:
    name: Deploy to Environment
    runs-on: ubuntu-latest
    needs: package
    strategy:
      matrix:
        environment: [staging, production]
        exclude:
          - environment: production
            # Only deploy to prod on main branch
            if: github.ref != 'refs/heads/main'
            
    environment:
      name: ${{ matrix.environment }}
      url: https://${{ matrix.environment }}.myapp.com
      
    steps:
    - name: Deploy to ${{ matrix.environment }}
      run: |
        case "${{ matrix.environment }}" in
          staging)
            helm upgrade --install myapp-staging ./helm-chart \
              --namespace staging \
              --set image.tag=${{ needs.source.outputs.version }} \
              --set environment=staging
            ;;
          production)
            # Blue-green deployment for production
            helm upgrade --install myapp-green ./helm-chart \
              --namespace production \
              --set image.tag=${{ needs.source.outputs.version }} \
              --set environment=production \
              --set service.selector.version=green
              
            # Health check before traffic switch
            sleep 60
            curl -f https://green.myapp.com/health
            
            # Switch traffic
            kubectl patch service myapp -n production \
              -p '{"spec":{"selector":{"version":"green"}}}'
            ;;
        esac
        
    - name: Post-deployment validation
      run: |
        curl -f https://${{ matrix.environment }}.myapp.com/health
        npm run test:smoke -- --env=${{ matrix.environment }}

  # Stage 7: Release
  release:
    name: Release Management
    runs-on: ubuntu-latest
    needs: deploy
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Create GitHub release
      uses: actions/create-release@v1
      with:
        tag_name: v${{ needs.source.outputs.version }}
        release_name: Release v${{ needs.source.outputs.version }}
        draft: false
        prerelease: false
        
    - name: Update changelog
      run: |
        # Generate changelog from commits
        conventional-changelog -p angular -i CHANGELOG.md -s
        
    - name: Notify stakeholders
      run: |
        # Slack notification
        curl -X POST -H 'Content-type: application/json' \
          --data '{"text":"🚀 Release v${{ needs.source.outputs.version }} deployed to production"}' \
          ${{ secrets.SLACK_WEBHOOK_URL }}
          
        # Email notification to product team
        sendmail product-team@company.com < release-notification.txt
```

**Pipeline stage gating strategy:**
```yaml
# pipeline-gates.yml
name: Pipeline Quality Gates

on: [push, pull_request]

jobs:
  quality-gate-1:
    name: "Gate 1: Code Quality"
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Lint and format check
      run: |
        npm run lint
        npm run format:check
        
    # Gate: Must pass to proceed
    - name: Gate 1 Status
      run: echo "✅ Code quality gate passed"

  quality-gate-2:
    name: "Gate 2: Unit Testing"
    needs: quality-gate-1
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Unit tests with coverage
      run: npm run test:unit -- --coverage
      
    - name: Coverage threshold check
      run: |
        COVERAGE=$(npm run test:coverage --silent | grep "Lines" | awk '{print $4}' | sed 's/%//')
        if [ "$COVERAGE" -lt 80 ]; then
          echo "❌ Coverage $COVERAGE% below 80% threshold"
          exit 1
        fi
        echo "✅ Coverage $COVERAGE% meets threshold"

  quality-gate-3:
    name: "Gate 3: Security & Integration"
    needs: quality-gate-2
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Security scan
      run: npm audit --audit-level=moderate
      
    - name: Integration tests
      run: npm run test:integration
      
    - name: Gate 3 Status
      run: echo "✅ Security and integration gate passed"

  deployment-approval:
    name: "Gate 4: Deployment Approval"
    needs: quality-gate-3
    runs-on: ubuntu-latest
    environment: production-approval
    steps:
    - name: Manual approval required
      run: echo "⏳ Waiting for deployment approval..."
      
    - name: Deployment approved
      run: echo "✅ Deployment approved for production"
```

</div>

</details>

</div>

<div class="concept-section myths" data-filter="pipeline">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

❌ **"Több stage = jobb pipeline"**  
✅ Balance kell a thoroughness és speed között, túl sok stage lassíthatja a feedback loop-ot

❌ **"Minden stage sequential legyen"**  
✅ Independent stages parallelizálhatók a performance javítása érdekében

❌ **"Test stage-ben minden test fusson"**  
✅ Test pyramid: gyors unit tests minden stage-ben, lassabb integration/e2e tests ritkábban

❌ **"Security stage opcionális"**  
✅ Security scanning minden modern pipeline essential része kell hogy legyen

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="pipeline">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Pipeline stage optimization:**
```bash
# Stage timing analysis
time npm run build  # Build stage timing
time npm test      # Test stage timing

# Parallel execution test
npm run lint & npm run test:unit & wait
```

**Stage failure analysis:**
```yaml
# Quick stage health check
- name: Stage checkpoint
  if: always()
  run: |
    echo "Stage status: ${{ job.status }}"
    echo "Failed step: ${{ steps.*.outcome }}"
```

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="pipeline junior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Milyen stages-eket tennél egy CI/CD pipeline-ba?**
A: Source, Build, Test, Security, Package, Deploy, Release. Minden stage specific purpose-szel és quality gate-ekkel.

**Q: Hogyan optimalizálnád a pipeline execution time-ot?**
A: Parallel execution, caching, incremental builds, test optimization, resource allocation tuning.

**Q: Mi történik, ha egy stage fail-el?**
A: Pipeline stop, notification, rollback if needed, investigation, fix, retry. Fast feedback principle.

**Q: Mikor használnál manual approval gate-et?**
A: Production deployment, security-critical changes, compliance requirements, high-risk releases.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="pipeline">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **Quality gates** → Stage completion criteria
- **Artifact repositories** → Build outputs storage
- **Testing strategies** → Test stage implementation
- **Security scanning** → Security stage tools
- **Deployment strategies** → Deploy stage patterns

</div>

</details>

</div>

---

<div class="concept-section" data-filter="pipeline junior">

### CI/CD Pipeline {#ci-cd-pipeline}

<div class="mental-model">
🏭 **Mental Model: CI/CD Pipeline - A Digital Assembly Line**
Képzeld el a CI/CD pipeline-t mint egy modern autógyár futószalagját. Minden kód változás (mint egy autóalkatrész) végigmegy egy automatizált soron:

**Az Assembly Line szakaszai:**
1. **Quality Control Station** - Automated testing (minden alkatrész ellenőrzése)
2. **Security Checkpoint** - Vulnerability scanning (biztonsági ellenőrzés)
3. **Assembly Station** - Build és package (összerakás)
4. **Final Inspection** - Integration testing (végső ellenőrzés)
5. **Shipping Department** - Deployment (kiszállítás)

**A pipeline mint biztosíték:**
- **Automated Quality Gates**: Rossz kód nem mehet tovább
- **Consistent Process**: Minden commit ugyanazon az úton megy át
- **Fast Feedback**: Azonnal tudod, ha valami probléma van
- **Traceability**: Minden lépés dokumentált és audit-álható
</div>

<div class="why-important">
💡 **Miért kritikus a CI/CD Pipeline?**
- **Hibák korai felismerése**: 10x olcsóbb javítani development-ben, mint production-ben
- **Deployment frequency növelése**: Napi több deployment vs havi egy
- **Risk csökkentése**: Kisebb, gyakoribb changek kevésbé kockázatosak
- **Developer productivity**: Automatizált mundane tasks
- **Consistency**: Minden környezet ugyanúgy néz ki
- **Rollback capability**: Gyors visszaállás ha probléma van
- **Compliance**: Audit trail és approval process
- **Team confidence**: Mernek gyakrabban deploy-olni
</div>

<div class="runnable-model">
🚀 **Modern CI/CD Pipeline felépítése:**

**GitHub Actions pipeline example:**
```yaml
name: Production Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '18'
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  # 1. Code Quality & Security
  quality-gate:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      with:
        fetch-depth: 0  # Sonar analysis needs full history
        
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Lint code
      run: npm run lint:ci
      
    - name: Type checking
      run: npm run type-check
      
    - name: Security audit
      run: npm audit --audit-level=moderate
      
    - name: SonarQube analysis
      uses: sonarqube-quality-gate-action@master
      env:
        SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}

  # 2. Automated Testing
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16, 18, 20]  # Test multiple versions
    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_PASSWORD: test
          POSTGRES_DB: testdb
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
        
    - run: npm ci
    
    - name: Unit tests
      run: npm run test:unit -- --coverage
      
    - name: Integration tests
      run: npm run test:integration
      env:
        DATABASE_URL: postgresql://postgres:test@localhost:5432/testdb
        
    - name: E2E tests
      run: npm run test:e2e
      
    - name: Upload coverage
      uses: codecov/codecov-action@v3
      if: matrix.node-version == 18  # Only upload once

  # 3. Container Build & Security
  build:
    needs: [quality-gate, test]
    runs-on: ubuntu-latest
    outputs:
      image-digest: ${{ steps.build.outputs.digest }}
      image-tag: ${{ steps.meta.outputs.tags }}
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Docker Buildx
      uses: docker/setup-buildx-action@v3
      
    - name: Login to Container Registry
      uses: docker/login-action@v3
      with:
        registry: ${{ env.REGISTRY }}
        username: ${{ github.actor }}
        password: ${{ secrets.GITHUB_TOKEN }}
        
    - name: Extract metadata
      id: meta
      uses: docker/metadata-action@v5
      with:
        images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
        tags: |
          type=ref,event=branch
          type=ref,event=pr
          type=sha,prefix={{branch}}-
          type=raw,value=latest,enable={{is_default_branch}}
          
    - name: Build and push
      id: build
      uses: docker/build-push-action@v5
      with:
        context: .
        push: true
        tags: ${{ steps.meta.outputs.tags }}
        labels: ${{ steps.meta.outputs.labels }}
        cache-from: type=gha
        cache-to: type=gha,mode=max
        
    - name: Container security scan
      uses: aquasecurity/trivy-action@master
      with:
        image-ref: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}@${{ steps.build.outputs.digest }}
        format: 'sarif'
        output: 'trivy-results.sarif'
        
    - name: Upload Trivy scan results
      uses: github/codeql-action/upload-sarif@v2
      with:
        sarif_file: 'trivy-results.sarif'

  # 4. Deployment Strategy
  deploy-staging:
    needs: build
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    environment: staging
    steps:
    - name: Deploy to staging
      run: |
        echo "Deploying ${{ needs.build.outputs.image-tag }} to staging"
        # Helm deployment
        helm upgrade --install myapp ./charts/myapp \
          --namespace staging \
          --set image.tag=${{ needs.build.outputs.image-digest }} \
          --set environment=staging \
          --wait --timeout=300s
          
    - name: Smoke tests
      run: |
        curl -f https://staging.myapp.com/health
        npm run test:smoke -- --baseUrl=https://staging.myapp.com

  deploy-production:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: 
      name: production
      url: https://myapp.com
    steps:
    - name: Blue-Green deployment
      run: |
        # Deploy to green environment
        helm upgrade --install myapp-green ./charts/myapp \
          --namespace production \
          --set image.tag=${{ needs.build.outputs.image-digest }} \
          --set environment=production \
          --set service.selector.version=green \
          --wait --timeout=600s
          
    - name: Production smoke tests
      run: |
        curl -f https://green.myapp.com/health
        npm run test:smoke -- --baseUrl=https://green.myapp.com
        
    - name: Switch traffic
      run: |
        # Switch load balancer to green
        kubectl patch service myapp -n production \
          -p '{"spec":{"selector":{"version":"green"}}}'
          
    - name: Cleanup blue environment
      run: |
        sleep 300  # Wait 5 minutes for traffic to settle
        helm uninstall myapp-blue -n production || true
```

**Key CI/CD Best Practices:**
```yaml
# 1. Fast Feedback Loop
- name: Fast fail tests first
  run: |
    npm run lint          # < 30 seconds
    npm run test:unit     # < 2 minutes
    npm run test:integration  # < 5 minutes
    
# 2. Parallel execution
strategy:
  matrix:
    test-type: [unit, integration, e2e]
    
# 3. Caching strategy
- uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    
# 4. Security first
- name: Dependency vulnerability check
  run: npm audit --audit-level=high
  
# 5. Environment promotion
# develop → staging → production
# with manual approval gates for production
```
</div>

<div class="myths">
🚫 **Gyakori tévhitek és hibák**

<details>
<summary><strong>Tévhit: "CI/CD lassítja a fejlesztést"</strong></summary>
<div class="myth-content">
**Valóság:** Kezdetben investment, hosszú távon exponenciálisan gyorsítja a fejlesztést.

**Statisztikák a DORA Report szerint:**
- Elite performers: 208x gyakoribb deployment
- 106x gyorsabb lead time változtatásokhoz
- 7x alacsonyabb change failure rate
- 2604x gyorsabb recovery time

**ROI calculation:**
```
Manual deployment: 2 óra + 1 óra testing + 30 perc rollback risk = 3.5 óra
Automated pipeline: 15 perc pipeline + 0 perc manual work = 15 perc

Weekly savings: (3.5 - 0.25) * 5 deployments = 16.25 óra/hét
Monthly savings: 65 óra/hó * developer hourly cost
```
</div>
</details>

<details>
<summary><strong>Tévhit: "Minden commit production-be mehet"</strong></summary>
<div class="myth-content">
**Valóság:** Continuous Integration ≠ Continuous Deployment minden esetben.

**CI/CD maturity levels:**
1. **Continuous Integration**: Minden commit build + test
2. **Continuous Delivery**: Minden commit deployment-ready
3. **Continuous Deployment**: Minden commit automatikusan production-be

**Deployment strategies:**
- **Feature flags**: Deploy code, enable features later
- **Branch-based**: develop → staging → main → production
- **Trunk-based**: main branch + feature toggles
- **GitOps**: Git as single source of truth

**Example feature flag usage:**
```javascript
if (featureFlag.isEnabled('NEW_CHECKOUT_FLOW', user)) {
  return newCheckoutComponent();
} else {
  return legacyCheckoutComponent();
}
```
</div>
</details>

<details>
<summary><strong>Tévhit: "Pipeline failure = kód probléma"</strong></summary>
<div class="myth-content">
**Valóság:** Pipeline failure-öket más okok is okozhatják.

**Common pipeline failure causes:**
1. **Flaky tests** (30%): Non-deterministic test behavior
2. **Infrastructure issues** (25%): Network, resource limitations
3. **Dependency failures** (20%): External service downtime
4. **Configuration drift** (15%): Environment inconsistencies
5. **Actual code issues** (10%): Logic bugs

**Solutions:**
```yaml
# Retry strategy for flaky tests
- name: Run tests with retry
  run: npm test
  continue-on-error: true
  
- name: Retry failed tests
  if: failure()
  run: npm test -- --onlyFailures --maxRetries=3
  
# Timeout configuration
- name: Integration tests
  run: npm run test:integration
  timeout-minutes: 10
  
# Health checks before deployment
- name: Pre-deployment health check
  run: |
    curl -f https://api.external-service.com/health || exit 1
```
</div>
</details>
</details>

<div class="micro-learning">
🎯 **Micro-learning: Pipeline Optimization**

**The 10-minute rule:**
> "If your CI pipeline takes longer than 10 minutes, developers will start bypassing it"

**Optimization strategies:**
```yaml
# 1. Parallel job execution
jobs:
  lint:    # 2 minutes
  test:    # 8 minutes  
  build:   # 5 minutes
# Total: 8 minutes (parallel) vs 15 minutes (sequential)

# 2. Test splitting
strategy:
  matrix:
    test-chunk: [1, 2, 3, 4]
run: npm test -- --shard=${{ matrix.test-chunk }}/4

# 3. Selective execution
- name: Get changed files
  id: changed
  run: echo "files=$(git diff --name-only HEAD^ HEAD)" >> $GITHUB_OUTPUT
  
- name: Run affected tests only
  if: contains(steps.changed.outputs.files, 'src/')
  run: npm run test:affected
```

**Pipeline metrics to track:**
- **Build time**: Target < 10 minutes
- **Test success rate**: Target > 95%
- **Deployment frequency**: Daily for modern teams
- **Mean time to recovery**: < 1 hour
</div>

</div>

---

### Docker Compose vs Kubernetes {#docker-compose-vs-kubernetes}

<div class="concept-section mental-model" data-filter="docker medior">

<details>
<summary>📋 <strong>Fogalom meghatározása</strong></summary>

<div>

**Docker Compose** = Single-host multi-container orchestration tool YAML definition-nel (docker-compose.yml), service dependencies, volume és network management. Local development és simple deployment use case-ekhez. Compose file definiálja service-eket, port mapping-et, environment variables-t.

**Kubernetes** = Production-grade container orchestration platform multi-node cluster-en, declarative configuration (YAML manifests), automatic scaling (HPA, VPA), self-healing, load balancing, rolling updates, service discovery. Pod, Deployment, Service, ConfigMap, Secret primitívekkel.

Compose **development/testing**, K8s **production/enterprise** complex workload-okhoz.

</div>

</details>

</div>

<div class="concept-section why-important" data-filter="docker medior">

<details>
<summary>💡 <strong>Miért számít?</strong></summary>

<div>

- **Development vs Production**: Compose local dev environment-hez, K8s scalable production deployment-hez
- **Complexity trade-off**: Compose egyszerűbb syntax, K8s robustus enterprise features
- **Migration path**: Compose-ból K8s-be történő migration planning és execution
- **Tool selection**: Right tool for the right job based on requirements és scale

</div>

</details>

</div>

<div class="runnable-model" data-filter="docker">

<details>
<summary><strong>Runnable mental model</strong></summary>

<div>

**Docker Compose example:**
```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: 
      context: .
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=docker
      - DATABASE_URL=postgresql://db:5432/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    volumes:
      - ./logs:/app/logs
      - ./config:/app/config
    networks:
      - app-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s

  db:
    image: postgres:13-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./db/init:/docker-entrypoint-initdb.d
    networks:
      - app-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U myuser -d myapp"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    networks:
      - app-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 5

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
    depends_on:
      - app
    networks:
      - app-network
    restart: unless-stopped

  # Development tools
  mailhog:
    image: mailhog/mailhog:latest
    ports:
      - "1025:1025"  # SMTP
      - "8025:8025"  # Web UI
    networks:
      - app-network
    profiles:
      - dev

  # Monitoring stack
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    networks:
      - app-network
    profiles:
      - monitoring

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana_data:/var/lib/grafana
      - ./monitoring/grafana:/etc/grafana/provisioning
    networks:
      - app-network
    profiles:
      - monitoring

volumes:
  postgres_data:
  redis_data:
  prometheus_data:
  grafana_data:

networks:
  app-network:
    driver: bridge
```

**Kubernetes equivalent:**
```yaml
# kubernetes/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: myapp

---
# kubernetes/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: myapp
data:
  application.properties: |
    spring.profiles.active=kubernetes
    management.endpoints.web.exposure.include=health,metrics,prometheus
    logging.level.com.company=INFO

---
# kubernetes/secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
  namespace: myapp
type: Opaque
data:
  database-url: cG9zdGdyZXNxbDovL215dXNlcjpteXBhc3N3b3JkQGRiLXNlcnZpY2U6NTQzMi9teWFwcA==
  redis-url: cmVkaXM6Ly9yZWRpcy1zZXJ2aWNlOjYzNzk=

---
# kubernetes/postgres.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
  namespace: myapp
spec:
  serviceName: postgres-service
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:13-alpine
        env:
        - name: POSTGRES_DB
          value: myapp
        - name: POSTGRES_USER
          value: myuser
        - name: POSTGRES_PASSWORD
          value: mypassword
        ports:
        - containerPort: 5432
        volumeMounts:
        - name: postgres-storage
          mountPath: /var/lib/postgresql/data
        livenessProbe:
          exec:
            command:
            - pg_isready
            - -U
            - myuser
            - -d
            - myapp
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          exec:
            command:
            - pg_isready
            - -U
            - myuser
            - -d
            - myapp
          initialDelaySeconds: 5
          periodSeconds: 5
  volumeClaimTemplates:
  - metadata:
      name: postgres-storage
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 10Gi

---
apiVersion: v1
kind: Service
metadata:
  name: postgres-service
  namespace: myapp
spec:
  selector:
    app: postgres
  ports:
  - port: 5432
    targetPort: 5432

---
# kubernetes/redis.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis
  namespace: myapp
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      containers:
      - name: redis
        image: redis:7-alpine
        command: ["redis-server", "--appendonly", "yes"]
        ports:
        - containerPort: 6379
        volumeMounts:
        - name: redis-storage
          mountPath: /data
        livenessProbe:
          exec:
            command:
            - redis-cli
            - ping
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          exec:
            command:
            - redis-cli
            - ping
          initialDelaySeconds: 5
          periodSeconds: 5
      volumes:
      - name: redis-storage
        emptyDir: {}

---
apiVersion: v1
kind: Service
metadata:
  name: redis-service
  namespace: myapp
spec:
  selector:
    app: redis
  ports:
  - port: 6379
    targetPort: 6379

---
# kubernetes/app.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  namespace: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myregistry.com/myapp:latest
        ports:
        - containerPort: 8080
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: database-url
        - name: REDIS_URL
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: redis-url
        volumeMounts:
        - name: app-config
          mountPath: /app/config
          readOnly: true
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /actuator/health/liveness
            port: 8080
          initialDelaySeconds: 60
          periodSeconds: 30
        readinessProbe:
          httpGet:
            path: /actuator/health/readiness
            port: 8080
          initialDelaySeconds: 10
          periodSeconds: 10
      volumes:
      - name: app-config
        configMap:
          name: app-config

---
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
  namespace: myapp
spec:
  selector:
    app: myapp
  ports:
  - port: 80
    targetPort: 8080

---
# kubernetes/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-ingress
  namespace: myapp
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - myapp.com
    secretName: myapp-tls
  rules:
  - host: myapp.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: myapp-service
            port:
              number: 80

---
# kubernetes/hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp-hpa
  namespace: myapp
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

**Migration strategy (Compose → K8s):**
```bash
#!/bin/bash
# compose-to-k8s-migration.sh

echo "=== Docker Compose to Kubernetes Migration ==="

# Step 1: Analyze existing Compose setup
echo "1. Analyzing Docker Compose configuration..."
docker-compose config --services
docker-compose config --volumes

# Step 2: Convert Compose to K8s (using kompose)
echo "2. Converting Compose to Kubernetes manifests..."
kompose convert --file docker-compose.yml --out k8s/

# Step 3: Enhance generated manifests
echo "3. Enhancing Kubernetes manifests..."
# Add proper resource limits
# Add health checks
# Add proper service types
# Add ingress configuration
# Add persistent volume claims

# Step 4: Create namespace
echo "4. Creating Kubernetes namespace..."
kubectl create namespace myapp

# Step 5: Deploy secrets and config
echo "5. Deploying configuration..."
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml

# Step 6: Deploy stateful services first
echo "6. Deploying database..."
kubectl apply -f k8s/postgres.yaml
kubectl wait --for=condition=ready pod -l app=postgres -n myapp --timeout=300s

# Step 7: Deploy application
echo "7. Deploying application..."
kubectl apply -f k8s/app.yaml
kubectl wait --for=condition=ready pod -l app=myapp -n myapp --timeout=300s

# Step 8: Deploy networking
echo "8. Setting up networking..."
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml

# Step 9: Verify deployment
echo "9. Verifying deployment..."
kubectl get all -n myapp
kubectl get ingress -n myapp

# Step 10: Health check
echo "10. Running health checks..."
kubectl port-forward service/myapp-service 8080:80 -n myapp &
sleep 5
curl -f http://localhost:8080/actuator/health
pkill -f "kubectl port-forward"

echo "Migration completed successfully!"
```

**Development workflow comparison:**
```bash
# Docker Compose workflow
# Start development environment
docker-compose up -d

# View logs
docker-compose logs -f app

# Scale service
docker-compose up -d --scale app=3

# Update service
docker-compose build app
docker-compose up -d app

# Cleanup
docker-compose down -v

---

# Kubernetes workflow
# Start development environment
kubectl apply -f k8s/

# View logs
kubectl logs -f deployment/myapp -n myapp

# Scale service
kubectl scale deployment myapp --replicas=3 -n myapp

# Update service
docker build -t myapp:v2 .
kubectl set image deployment/myapp myapp=myapp:v2 -n myapp

# Cleanup
kubectl delete namespace myapp
```

</div>

</details>

</div>

<div class="concept-section myths" data-filter="docker">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

❌ **"Docker Compose production-ready"**  
✅ Compose single-host limitation és limited scaling capabilities miatt nem alkalmas large-scale production use-ra

❌ **"Kubernetes overkill minden project-hez"**  
✅ Small applications és simple deployments-hez Compose gyakran elegendő és practical

❌ **"Kubernetes automatic migration Compose-ból"**  
✅ Tools like kompose segítenek, de manual tuning és architecture considerations szükségesek

❌ **"Same configuration works mindkét platform-on"**  
✅ Different orchestration models require platform-specific optimizations és configurations

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="docker">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Compose to K8s conversion:**
```bash
# Install kompose
curl -L https://github.com/kubernetes/kompose/releases/download/v1.28.0/kompose-linux-amd64 -o kompose
chmod +x kompose

# Convert compose file
./kompose convert -f docker-compose.yml
```

**Resource comparison:**
```bash
# Compose resource usage
docker stats

# K8s resource usage
kubectl top pods -n myapp
kubectl top nodes
```

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="docker medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mikor használnál Docker Compose-t és mikor Kubernetes-t?**
A: Compose = local development, simple multi-container apps, quick prototyping. K8s = production, scaling, high availability, complex deployments.

**Q: Hogyan migráljál Docker Compose-ból Kubernetes-be?**
A: Analyze services, convert with tools like kompose, enhance manifests (resources, health checks, networking), test thoroughly, gradual migration.

**Q: Mi a legnagyobb különbség a networking között?**
A: Compose = automatic service discovery single host-on. K8s = Service objects, DNS-based discovery, network policies, multi-host networking.

**Q: Hogyan kezelnéd a persistent data-t mindkét platform-on?**
A: Compose = named volumes, bind mounts. K8s = PersistentVolumes, PersistentVolumeClaims, StatefulSets for stateful applications.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="docker">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **Container orchestration** → Platform selection criteria
- **Development environments** → Local vs remote development setups
- **Scaling strategies** → Horizontal scaling implementation
- **Service discovery** → Network configuration patterns
- **Migration strategies** → Platform transition planning

</div>

</details>

</div>

---

### Infrastructure as Code {#infrastructure-as-code}

<div class="concept-section mental-model" data-filter="iac medior">

<details>
<summary>📋 <strong>Fogalom meghatározása</strong></summary>

<div>

Az Infrastructure as Code (IaC) infrastruktúra provisioning és management kóddal version control alatt:
- **Terraform/CloudFormation** = Declarative IaC (desired state definition), provider-agnostic (Terraform) vagy cloud-specific (CFN)
- **Ansible/Chef/Puppet** = Configuration management tools, imperative vagy declarative approach, agent-based (Chef/Puppet) vagy agentless (Ansible)
- **Version control** = Git-based infrastructure change tracking, code review, rollback capability
- **State management** = Current infrastructure state tracking (terraform.tfstate), drift detection
- **Modules/Roles** = Reusable infrastructure components, DRY principle, parameterized templates

Az infrastruktúra immutable, reproducible, version-controlled **kód**, eliminálva a manual configuration drift-et és snowflake servers-t.

</div>

</details>

</div>

<div class="concept-section why-important" data-filter="iac medior">

<details>
<summary>💡 <strong>Miért számít?</strong></summary>

<div>

- **Reproducibility**: Identikus infrastructure deploy multiple environments-ben
- **Version control**: Infrastructure changes tracked, reviewzva, és rollback-elhető
- **Automation**: Manual configuration errors elimination és consistent deployments
- **Documentation**: Infrastructure configuration self-documenting és auditable

</div>

</details>

</div>

<div class="runnable-model" data-filter="iac">

<details>
<summary><strong>Runnable mental model</strong></summary>

<div>

**Terraform AWS infrastructure:**
```hcl
# main.tf
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  
  backend "s3" {
    bucket = "mycompany-terraform-state"
    key    = "infrastructure/terraform.tfstate"
    region = "eu-west-1"
    
    # State locking
    dynamodb_table = "terraform-state-lock"
    encrypt        = true
  }
}

provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Project     = var.project_name
      Environment = var.environment
      ManagedBy   = "terraform"
      Owner       = var.team_name
    }
  }
}

# Data sources
data "aws_availability_zones" "available" {
  state = "available"
}

data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]
  
  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
}

# Variables
variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "eu-west-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "myapp"
}

variable "team_name" {
  description = "Team responsible for resources"
  type        = string
  default     = "platform"
}

# Local values
locals {
  name_prefix = "${var.project_name}-${var.environment}"
  
  vpc_cidr = {
    dev     = "10.0.0.0/16"
    staging = "10.1.0.0/16"
    prod    = "10.2.0.0/16"
  }
  
  instance_counts = {
    dev     = 1
    staging = 2
    prod    = 3
  }
}

# VPC Module
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  
  name = "${local.name_prefix}-vpc"
  cidr = local.vpc_cidr[var.environment]
  
  azs             = data.aws_availability_zones.available.names
  private_subnets = [for i, az in data.aws_availability_zones.available.names : cidrsubnet(local.vpc_cidr[var.environment], 8, i)]
  public_subnets  = [for i, az in data.aws_availability_zones.available.names : cidrsubnet(local.vpc_cidr[var.environment], 8, i + 100)]
  
  enable_nat_gateway = true
  enable_vpn_gateway = false
  enable_dns_hostnames = true
  enable_dns_support = true
  
  tags = {
    Name = "${local.name_prefix}-vpc"
  }
}

# Security Groups
resource "aws_security_group" "web" {
  name_prefix = "${local.name_prefix}-web-"
  vpc_id      = module.vpc.vpc_id
  
  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [module.vpc.vpc_cidr_block]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  tags = {
    Name = "${local.name_prefix}-web-sg"
  }
}

resource "aws_security_group" "database" {
  name_prefix = "${local.name_prefix}-db-"
  vpc_id      = module.vpc.vpc_id
  
  ingress {
    description     = "PostgreSQL"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.web.id]
  }
  
  tags = {
    Name = "${local.name_prefix}-db-sg"
  }
}

# Application Load Balancer
resource "aws_lb" "main" {
  name               = "${local.name_prefix}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.web.id]
  subnets            = module.vpc.public_subnets
  
  enable_deletion_protection = var.environment == "prod"
  
  tags = {
    Name = "${local.name_prefix}-alb"
  }
}

resource "aws_lb_target_group" "app" {
  name     = "${local.name_prefix}-tg"
  port     = 8080
  protocol = "HTTP"
  vpc_id   = module.vpc.vpc_id
  
  health_check {
    enabled             = true
    healthy_threshold   = 2
    interval            = 30
    matcher             = "200"
    path                = "/actuator/health"
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = 5
    unhealthy_threshold = 2
  }
  
  tags = {
    Name = "${local.name_prefix}-tg"
  }
}

resource "aws_lb_listener" "app" {
  load_balancer_arn = aws_lb.main.arn
  port              = "80"
  protocol          = "HTTP"
  
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app.arn
  }
}

# Launch Template
resource "aws_launch_template" "app" {
  name_prefix   = "${local.name_prefix}-"
  image_id      = data.aws_ami.amazon_linux.id
  instance_type = var.environment == "prod" ? "t3.medium" : "t3.micro"
  
  vpc_security_group_ids = [aws_security_group.web.id]
  
  user_data = base64encode(templatefile("${path.module}/user_data.sh", {
    environment = var.environment
    app_name    = var.project_name
  }))
  
  tag_specifications {
    resource_type = "instance"
    tags = {
      Name = "${local.name_prefix}-instance"
    }
  }
  
  lifecycle {
    create_before_destroy = true
  }
}

# Auto Scaling Group
resource "aws_autoscaling_group" "app" {
  name                = "${local.name_prefix}-asg"
  vpc_zone_identifier = module.vpc.private_subnets
  target_group_arns   = [aws_lb_target_group.app.arn]
  health_check_type   = "ELB"
  health_check_grace_period = 300
  
  min_size         = 1
  max_size         = local.instance_counts[var.environment] * 2
  desired_capacity = local.instance_counts[var.environment]
  
  launch_template {
    id      = aws_launch_template.app.id
    version = "$Latest"
  }
  
  tag {
    key                 = "Name"
    value               = "${local.name_prefix}-asg"
    propagate_at_launch = true
  }
}

# RDS Database
resource "aws_db_subnet_group" "main" {
  name       = "${local.name_prefix}-db-subnet-group"
  subnet_ids = module.vpc.private_subnets
  
  tags = {
    Name = "${local.name_prefix}-db-subnet-group"
  }
}

resource "aws_db_instance" "main" {
  identifier = "${local.name_prefix}-db"
  
  engine         = "postgres"
  engine_version = "13.13"
  instance_class = var.environment == "prod" ? "db.t3.medium" : "db.t3.micro"
  
  allocated_storage     = var.environment == "prod" ? 100 : 20
  max_allocated_storage = var.environment == "prod" ? 1000 : 100
  storage_encrypted     = true
  
  db_name  = replace(var.project_name, "-", "_")
  username = "admin"
  password = var.db_password
  
  vpc_security_group_ids = [aws_security_group.database.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name
  
  backup_retention_period = var.environment == "prod" ? 7 : 1
  backup_window          = "03:00-04:00"
  maintenance_window     = "Sun:04:00-Sun:05:00"
  
  skip_final_snapshot = var.environment != "prod"
  final_snapshot_identifier = var.environment == "prod" ? "${local.name_prefix}-final-snapshot" : null
  
  tags = {
    Name = "${local.name_prefix}-db"
  }
}

# Outputs
output "vpc_id" {
  description = "VPC ID"
  value       = module.vpc.vpc_id
}

output "load_balancer_dns" {
  description = "Load balancer DNS name"
  value       = aws_lb.main.dns_name
}

output "database_endpoint" {
  description = "Database endpoint"
  value       = aws_db_instance.main.endpoint
  sensitive   = true
}
```

**User data script (user_data.sh):**
```bash
#!/bin/bash
yum update -y
yum install -y docker

# Start Docker
systemctl start docker
systemctl enable docker
usermod -a -G docker ec2-user

# Install CloudWatch agent
wget https://s3.amazonaws.com/amazoncloudwatch-agent/amazon_linux/amd64/latest/amazon-cloudwatch-agent.rpm
rpm -U ./amazon-cloudwatch-agent.rpm

# Application deployment
docker pull myregistry.com/${app_name}:latest
docker run -d \
  --name ${app_name} \
  --restart unless-stopped \
  -p 8080:8080 \
  -e ENVIRONMENT=${environment} \
  myregistry.com/${app_name}:latest

# Health check script
cat > /home/ec2-user/health-check.sh << 'EOF'
#!/bin/bash
curl -f http://localhost:8080/actuator/health || exit 1
EOF

chmod +x /home/ec2-user/health-check.sh

# Setup health check cron
echo "*/5 * * * * /home/ec2-user/health-check.sh" | crontab -
```

**Ansible configuration management:**
```yaml
# ansible/playbook.yml
---
- name: Configure application servers
  hosts: app_servers
  become: yes
  vars:
    app_name: myapp
    app_version: "{{ lookup('env', 'APP_VERSION') | default('latest') }}"
    environment: "{{ lookup('env', 'ENVIRONMENT') | default('development') }}"
    
  tasks:
    - name: Update system packages
      yum:
        name: "*"
        state: latest
        
    - name: Install required packages
      yum:
        name:
          - docker
          - htop
          - vim
          - curl
          - wget
        state: present
        
    - name: Start and enable Docker
      systemd:
        name: docker
        state: started
        enabled: yes
        
    - name: Add ec2-user to docker group
      user:
        name: ec2-user
        groups: docker
        append: yes
        
    - name: Create application directory
      file:
        path: /opt/{{ app_name }}
        state: directory
        owner: ec2-user
        group: ec2-user
        mode: '0755'
        
    - name: Copy application configuration
      template:
        src: application.properties.j2
        dest: /opt/{{ app_name }}/application.properties
        owner: ec2-user
        group: ec2-user
        mode: '0644'
      notify: restart application
      
    - name: Copy docker-compose file
      template:
        src: docker-compose.yml.j2
        dest: /opt/{{ app_name }}/docker-compose.yml
        owner: ec2-user
        group: ec2-user
        mode: '0644'
      notify: restart application
      
    - name: Pull Docker images
      docker_image:
        name: "myregistry.com/{{ app_name }}:{{ app_version }}"
        source: pull
        
    - name: Start application containers
      docker_compose:
        project_src: /opt/{{ app_name }}
        state: present
        
    - name: Setup log rotation
      copy:
        content: |
          /opt/{{ app_name }}/logs/*.log {
              daily
              rotate 7
              compress
              delaycompress
              missingok
              notifempty
              create 0644 ec2-user ec2-user
          }
        dest: /etc/logrotate.d/{{ app_name }}
        
    - name: Setup monitoring script
      template:
        src: monitoring.sh.j2
        dest: /usr/local/bin/{{ app_name }}-monitor
        mode: '0755'
        
    - name: Setup monitoring cron
      cron:
        name: "{{ app_name }} monitoring"
        minute: "*/5"
        job: "/usr/local/bin/{{ app_name }}-monitor"
        
  handlers:
    - name: restart application
      docker_compose:
        project_src: /opt/{{ app_name }}
        state: present
        restarted: yes

# ansible/templates/application.properties.j2
server.port=8080
spring.profiles.active={{ environment }}

# Database configuration
spring.datasource.url=jdbc:postgresql://{{ database_host }}:5432/{{ database_name }}
spring.datasource.username={{ database_username }}
spring.datasource.password={{ database_password }}

# Logging configuration
logging.level.com.company={{ 'DEBUG' if environment == 'development' else 'INFO' }}
logging.file.name=/opt/{{ app_name }}/logs/application.log

# Monitoring
management.endpoints.web.exposure.include=health,metrics,prometheus
management.endpoint.health.show-details=always
```

**Terraform workspace management:**
```bash
# terraform-workflow.sh
#!/bin/bash

ENVIRONMENT=${1:-dev}
ACTION=${2:-plan}

echo "=== Terraform Workflow for $ENVIRONMENT ==="

# Initialize Terraform
echo "Initializing Terraform..."
terraform init

# Select workspace
echo "Selecting workspace: $ENVIRONMENT"
terraform workspace select $ENVIRONMENT || terraform workspace new $ENVIRONMENT

# Validate configuration
echo "Validating configuration..."
terraform validate

if [ "$ACTION" = "plan" ]; then
    echo "Planning infrastructure changes..."
    terraform plan \
        -var-file="environments/$ENVIRONMENT.tfvars" \
        -out="$ENVIRONMENT.tfplan"
        
elif [ "$ACTION" = "apply" ]; then
    echo "Applying infrastructure changes..."
    terraform apply \
        -var-file="environments/$ENVIRONMENT.tfvars" \
        -auto-approve
        
elif [ "$ACTION" = "destroy" ]; then
    echo "Destroying infrastructure..."
    terraform destroy \
        -var-file="environments/$ENVIRONMENT.tfvars" \
        -auto-approve
        
else
    echo "Invalid action: $ACTION"
    echo "Usage: $0 <environment> <plan|apply|destroy>"
    exit 1
fi

echo "Terraform workflow completed for $ENVIRONMENT"
```

**Environment-specific variables:**
```hcl
# environments/dev.tfvars
environment = "dev"
aws_region = "eu-west-1"
project_name = "myapp"
team_name = "development"
db_password = "dev-password-123"

# environments/prod.tfvars
environment = "prod"
aws_region = "eu-west-1"
project_name = "myapp"
team_name = "platform"
db_password = "super-secure-prod-password"
```

</div>

</details>

</div>

<div class="concept-section myths" data-filter="iac">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

❌ **"IaC bonyolultabb, mint manual setup"**  
✅ Initial learning curve után sokkal reliable, auditable és maintainable, mint manual processes

❌ **"Terraform state file nem fontos"**  
✅ State file kritikus Terraform működéséhez, proper backup és locking essential

❌ **"Egy nagy Terraform file OK"**  
✅ Modular approach modules-kal és separate state files-okkal sokkal maintainable

❌ **"IaC tools mindent automatizálnak"**  
✅ Configuration management (Ansible) gyakran szükséges infrastructure provisioning (Terraform) után

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="iac">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Terraform basic workflow:**
```bash
# Initialize and plan
terraform init
terraform plan -out=tfplan

# Apply changes
terraform apply tfplan

# Inspect state
terraform show
terraform state list
```

**Ansible quick test:**
```bash
# Test connectivity
ansible all -m ping -i inventory.ini

# Run dry run
ansible-playbook playbook.yml --check

# Apply configuration
ansible-playbook playbook.yml
```

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="iac medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mi az Infrastructure as Code előnye?**
A: Version control, reproducibility, automation, documentation, audit trail. Infrastructure mint code, ikke manual configuration.

**Q: Mi a különbség Terraform és Ansible között?**
A: Terraform = infrastructure provisioning (declarative), Ansible = configuration management (imperative). Different use cases, gyakran together használva.

**Q: Hogyan kezelnéd a Terraform state file-t?**
A: Remote backend (S3), state locking (DynamoDB), encryption, backup, access control. Soha local state production-ben.

**Q: Mikor használnál modular Terraform approach-ot?**
A: Large infrastructures, reusable components, different teams, separate state management, easier testing és maintenance.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="iac">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **CI/CD pipelines** → Automated infrastructure deployment
- **Version control** → Infrastructure change tracking
- **Configuration management** → Post-provisioning setup
- **Cloud platforms** → Target infrastructure providers
- **Security** → Infrastructure security patterns

</div>

</details>

</div>

---

### GitLab CI {#gitlab-ci}
GitLab beépített CI/CD rendszere YAML konfigurációval és built-in Docker registry-vel.

**Példa:**
```yaml
# .gitlab-ci.yml
stages:
  - test
  - build
  - deploy

variables:
  DOCKER_DRIVER: overlay2
  DOCKER_TLS_CERTDIR: "/certs"
  MAVEN_OPTS: "-Dmaven.repo.local=$CI_PROJECT_DIR/.m2/repository"

cache:
  paths:
    - .m2/repository/
    - node_modules/

# Test stage
unit-test:
  stage: test
  image: maven:3.8.4-openjdk-11
  script:
    - mvn clean test
    - mvn jacoco:report
  coverage: '/Total.*?([0-9]{1,3})%/'
  artifacts:
    reports:
      junit:
        - target/surefire-reports/TEST-*.xml
      coverage_report:
        coverage_format: jacoco
        path: target/site/jacoco/jacoco.xml
    expire_in: 30 days

integration-test:
  stage: test
  image: maven:3.8.4-openjdk-11
  services:
    - name: postgres:13
      alias: database
  variables:
    POSTGRES_DB: testdb
    POSTGRES_USER: testuser
    POSTGRES_PASSWORD: testpass
    DATABASE_URL: jdbc:postgresql://database:5432/testdb
  script:
    - mvn clean verify -Pintegration-test

security-scan:
  stage: test
  image: owasp/zap2docker-stable
  script:
    - zap-baseline.py -t https://staging.myapp.com -J zap-report.json
  artifacts:
    reports:
      sast: zap-report.json

# Build stage  
build:
  stage: build
  image: docker:20.10.16
  services:
    - docker:20.10.16-dind
  before_script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
  script:
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .
    - docker tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA $CI_REGISTRY_IMAGE:latest
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    - docker push $CI_REGISTRY_IMAGE:latest
  only:
    - main
    - develop

# Deploy stages
deploy-staging:
  stage: deploy
  image: bitnami/kubectl:latest
  environment:
    name: staging
    url: https://staging.myapp.com
  script:
    - kubectl config use-context $KUBE_CONTEXT
    - kubectl set image deployment/myapp myapp=$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA -n staging
    - kubectl rollout status deployment/myapp -n staging --timeout=300s
    - curl -f https://staging.myapp.com/health
  only:
    - develop

deploy-production:
  stage: deploy
  image: bitnami/kubectl:latest
  environment:
    name: production
    url: https://myapp.com
  script:
    - kubectl config use-context $KUBE_CONTEXT
    - kubectl set image deployment/myapp myapp=$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA -n production
    - kubectl rollout status deployment/myapp -n production --timeout=300s
    - curl -f https://myapp.com/health
  when: manual
  only:
    - main
```

Magyarázat: GitLab CI robustus pipeline-okat biztosít beépített registry-vel és environment management-tel.

### Build → Test → Deploy {#build-test-deploy}
A klasszikus CI/CD workflow három fő szakasza minden kód változásnál.

**Példa Maven Java projekt:**
```yaml
# Jenkins Jenkinsfile
pipeline {
    agent any
    
    tools {
        maven 'Maven-3.8'
        jdk 'OpenJDK-11'
    }
    
    environment {
        DOCKER_REGISTRY = 'registry.company.com'
        APP_NAME = 'user-service'
        SONARQUBE_URL = 'https://sonar.company.com'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    env.BUILD_NUMBER = "${BUILD_NUMBER}"
                    env.GIT_COMMIT_SHORT = sh(
                        script: "git rev-parse --short HEAD",
                        returnStdout: true
                    ).trim()
                }
            }
        }
        
        stage('Build') {
            steps {
                sh 'mvn clean compile -B'
            }
        }
        
        stage('Test') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        sh 'mvn test -B'
                    }
                    post {
                        always {
                            publishTestResults testResultsPattern: 'target/surefire-reports/*.xml'
                            publishCoverage adapters: [jacocoAdapter('target/site/jacoco/jacoco.xml')], sourceFileResolver: sourceFiles('STORE_LAST_BUILD')
                        }
                    }
                }
                
                stage('Integration Tests') {
                    steps {
                        sh 'docker-compose -f docker-compose.test.yml up -d'
                        sh 'mvn verify -B -Pintegration-test'
                    }
                    post {
                        always {
                            sh 'docker-compose -f docker-compose.test.yml down'
                        }
                    }
                }
                
                stage('Code Quality') {
                    steps {
                        withSonarQubeEnv('SonarQube') {
                            sh 'mvn sonar:sonar -B'
                        }
                    }
                }
            }
        }
        
        stage('Package') {
            steps {
                sh 'mvn package -B -DskipTests'
                
                script {
                    def dockerImage = docker.build("${DOCKER_REGISTRY}/${APP_NAME}:${GIT_COMMIT_SHORT}")
                    dockerImage.tag("latest")
                    
                    docker.withRegistry("https://${DOCKER_REGISTRY}", 'docker-registry-credentials') {
                        dockerImage.push("${GIT_COMMIT_SHORT}")
                        dockerImage.push("latest")
                    }
                }
            }
        }
        
        stage('Security Scan') {
            steps {
                sh """
                    docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \\
                        -v \${WORKSPACE}:/workspace \\
                        aquasec/trivy:latest image ${DOCKER_REGISTRY}/${APP_NAME}:${GIT_COMMIT_SHORT}
                """
            }
        }
        
        stage('Deploy to Staging') {
            when { 
                branch 'develop' 
            }
            steps {
                script {
                    sh """
                        helm upgrade --install ${APP_NAME}-staging ./helm-chart \\
                            --namespace staging \\
                            --set image.repository=${DOCKER_REGISTRY}/${APP_NAME} \\
                            --set image.tag=${GIT_COMMIT_SHORT} \\
                            --set ingress.host=staging-${APP_NAME}.company.com
                    """
                }
                
                // Health check
                sh """
                    timeout 300 bash -c 'until curl -f https://staging-${APP_NAME}.company.com/actuator/health; do sleep 5; done'
                """
            }
        }
        
        stage('Deploy to Production') {
            when { 
                branch 'main' 
            }
            input {
                message "Deploy to production?"
                ok "Deploy"
                parameters {
                    choice(name: 'DEPLOYMENT_STRATEGY', choices: ['rolling', 'blue-green'], description: 'Deployment strategy')
                }
            }
            steps {
                script {
                    if (params.DEPLOYMENT_STRATEGY == 'blue-green') {
                        sh """
                            # Blue-Green deployment
                            helm upgrade --install ${APP_NAME}-green ./helm-chart \\
                                --namespace production \\
                                --set image.repository=${DOCKER_REGISTRY}/${APP_NAME} \\
                                --set image.tag=${GIT_COMMIT_SHORT} \\
                                --set service.selector.version=green
                        """
                        
                        // Smoke tests on green
                        sh "curl -f https://${APP_NAME}-green.company.com/actuator/health"
                        
                        // Switch traffic
                        sh """
                            kubectl patch service ${APP_NAME} -n production \\
                                -p '{"spec":{"selector":{"version":"green"}}}'
                        """
                        
                        // Remove blue version
                        sh "helm uninstall ${APP_NAME}-blue -n production || true"
                        
                    } else {
                        sh """
                            helm upgrade --install ${APP_NAME} ./helm-chart \\
                                --namespace production \\
                                --set image.repository=${DOCKER_REGISTRY}/${APP_NAME} \\
                                --set image.tag=${GIT_COMMIT_SHORT}
                        """
                    }
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            slackSend(
                channel: '#deployments',
                color: 'good',
                message: "✅ ${APP_NAME} v${GIT_COMMIT_SHORT} deployed successfully to ${env.BRANCH_NAME}"
            )
        }
        failure {
            slackSend(
                channel: '#deployments',
                color: 'danger', 
                message: "❌ ${APP_NAME} deployment failed on ${env.BRANCH_NAME}. Build: ${BUILD_URL}"
            )
        }
    }
}
```

Magyarázat: Komplex pipeline parallel testing-gel, security scan-nal és deployment strategy választással.

<div class="concept-section" data-filter="docker junior">

### Docker alapok {#docker-alapok}

<div class="concept-section mental-model" data-filter="docker junior">

<details>
<summary>📋 <strong>Fogalom meghatározása</strong></summary>

<div>

Docker container-ek és alapkoncepciók:
- **Image** = Read-only template layered filesystem-mel (base image + application layers), built from Dockerfile
- **Container** = Runtime instance of an image, isolated process with own filesystem, network, process tree
- **Dockerfile** = Declarative build instructions (FROM, RUN, COPY, CMD, ENTRYPOINT, ENV, EXPOSE), creates reproducible images
- **Registry** = Centralized image repository (Docker Hub, ECR, ACR, GCR), push/pull images
- **Volume** = Persistent data storage outside container lifecycle (named volumes, bind mounts, tmpfs)
- **Network** = Container networking (bridge, host, overlay), service discovery via DNS

Minden konténer **process isolation**, **filesystem isolation**, **network isolation**-nel, share host OS kernel (vs VM hypervisor).

</div>

</details>

</div>

<div class="concept-section why-important" data-filter="docker junior">

<details>
<summary>💡 <strong>Miért számít?</strong></summary>

<div>

- **Consistency**: "Works on my machine" probléma eliminálása
- **Isolation**: Application dependencies nem ütköznek egymással
- **Portability**: Ugyanaz a container bárhol fut (laptop, cloud, datacenter)
- **Efficiency**: Lightweight virtualization, gyorsabb startup mint VM-ek

</div>

</details>

</div>

<div class="runnable-model" data-filter="docker">

<details>
<summary><strong>Runnable mental model</strong></summary>

<div>

**Docker alapkommandok és workflow:**
```bash
# Image keresés és letöltés
docker search nginx
docker pull nginx:alpine
docker images

# Container futtatás
docker run -d --name my-nginx -p 8080:80 nginx:alpine
docker ps
docker ps -a

# Container management
docker start my-nginx
docker stop my-nginx
docker restart my-nginx
docker rm my-nginx

# Container interaction
docker exec -it my-nginx sh
docker logs my-nginx
docker logs -f my-nginx --tail 100

# Image és container cleanup
docker rmi nginx:alpine
docker system prune
docker system prune -a --volumes
```

**Dockerfile alapok:**
```dockerfile
# Simple Node.js application
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy application code
COPY . .

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Change ownership to non-root user
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Default command
CMD ["node", "server.js"]
```

**Multi-stage build example:**
```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app directory
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copy built application from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./

# Switch to non-root user
USER nextjs

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/server.js"]
```

**Docker Compose basic setup:**
```yaml
version: '3.8'

services:
  web:
    build: 
      context: .
      dockerfile: Dockerfile
      target: runner
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:password@db:5432/myapp
    depends_on:
      db:
        condition: service_healthy
    volumes:
      - ./logs:/app/logs
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  db:
    image: postgres:13-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./db/init:/docker-entrypoint-initdb.d
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d myapp"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 5

volumes:
  postgres_data:
  redis_data:

networks:
  default:
    driver: bridge
```

**Container resource management:**
```bash
# Resource limits
docker run -d \
  --name limited-container \
  --memory="512m" \
  --cpus="0.5" \
  --restart=unless-stopped \
  nginx:alpine

# Monitor resource usage
docker stats
docker stats --no-stream
docker stats limited-container

# Container logs management
docker run -d \
  --name logged-app \
  --log-driver json-file \
  --log-opt max-size=10m \
  --log-opt max-file=3 \
  myapp:latest

# Check container details
docker inspect limited-container
docker inspect --format='{{.State.Status}}' limited-container
docker inspect --format='{{.NetworkSettings.IPAddress}}' limited-container
```

**Volume és bind mount management:**
```bash
# Named volumes
docker volume create myapp-data
docker volume ls
docker volume inspect myapp-data

# Using volumes
docker run -d \
  --name app-with-volume \
  -v myapp-data:/app/data \
  myapp:latest

# Bind mounts
docker run -d \
  --name app-with-bind \
  -v $(pwd)/config:/app/config:ro \
  -v $(pwd)/logs:/app/logs \
  myapp:latest

# Backup and restore volumes
docker run --rm \
  -v myapp-data:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/backup.tar.gz -C /data .

# Restore volume
docker run --rm \
  -v myapp-data:/data \
  -v $(pwd):/backup \
  alpine tar xzf /backup/backup.tar.gz -C /data
```

**Docker networking:**
```bash
# List networks
docker network ls

# Create custom network
docker network create myapp-network
docker network create --driver bridge --subnet 172.20.0.0/16 custom-network

# Run containers on custom network
docker run -d --name web --network myapp-network nginx:alpine
docker run -d --name api --network myapp-network myapi:latest

# Connect existing container to network
docker network connect myapp-network existing-container

# Inspect network
docker network inspect myapp-network

# Container-to-container communication
docker exec web ping api
docker exec api curl http://web:80
```

</div>

</details>

</div>

<div class="concept-section myths" data-filter="docker">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

❌ **"Docker container = virtuális gép"**  
✅ Container shared kernel, VM külön OS. Container lightweight, gyorsabb startup, jobb resource efficiency

❌ **"Root user OK container-ben"**  
✅ Security risk! Mindig non-root user-t használj production container-ekben

❌ **"Dockerfile ORDER nem számít"**  
✅ Layer caching miatt order kritikus. Gyakran változó fájlok UTOLJÁRA másolása

❌ **"Container data automatikusan persistent"**  
✅ Container filesystem ephemeral. Volumes vagy bind mounts szükségesek persistent data-hoz

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="docker">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Container lifecycle practice:**
```bash
# Quick container test
docker run --rm -it alpine:latest sh

# One-liner web server
docker run --rm -p 8080:80 nginx:alpine

# Quick database for testing
docker run --rm --name test-db -e POSTGRES_PASSWORD=test -p 5432:5432 postgres:13-alpine
```

**Image size optimization check:**
```bash
# Compare image sizes
docker images | grep myapp

# Analyze layers
docker history myapp:latest
```

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="docker junior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mi a különbség Docker Image és Container között?**
A: Image = read-only template, Container = running instance image-ből. Image immutable, Container írható layer-rel.

**Q: Mire szolgál a Dockerfile?**
A: Automated image building instructions. Reproducible, version controlled way to create images step-by-step.

**Q: Hogyan biztosítod a container security-t?**
A: Non-root user, minimal base images, regular updates, vulnerability scanning, resource limits, read-only filesystem.

**Q: Mi a Docker layer caching és miért fontos?**
A: Unchanged layers reused builds között. Order optimization critical - stable layers first, changing files last.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="docker">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **Kubernetes** → Container orchestration platform
- **Docker Compose** → Multi-container development
- **CI/CD** → Container build és deployment automation
- **Microservices** → Service containerization patterns
- **Infrastructure as Code** → Container infrastructure management

</div>

</details>

</div>

---

### Docker Image optimization {#docker-image-optimization}

<div class="concept-section mental-model" data-filter="docker medior">

<details>
<summary>📋 <strong>Fogalom meghatározása</strong></summary>

<div>

Docker Image optimization = image size és build time csökkentése strategiák: Multi-stage builds (FROM...AS pattern, build dependencies külön stage-ben, csak artifacts copy-olva final image-be), Layer caching (Dockerfile instruction order optimalizálása, frequently changing parts last), Base image selection (alpine vs slim vs distroless, vulnerability surface minimizálás), .dockerignore file (node_modules, .git, test files excludálása), Image squashing/flattening layers. Security scanning: Trivy, Snyk, Clair vulnerability detection. Build optimization: BuildKit, caching mount types.

</div>

</details>

</div>

<div class="concept-section why-important" data-filter="docker medior">

<details>
<summary>💡 <strong>Miért számít?</strong></summary>

<div>

- **Deployment speed**: Kisebb images gyorsabban transfer-álhatók és indulnak
- **Security surface**: Kevesebb components = kevesebb vulnerability
- **Storage costs**: Smaller images kevesebb registry storage-ot használnak
- **Build efficiency**: Optimized caching dramatically csökkenti a build time-ot

</div>

</details>

</div>

<div class="runnable-model" data-filter="docker">

<details>
<summary><strong>Runnable mental model</strong></summary>

<div>

**Advanced multi-stage build patterns:**
```dockerfile
# Advanced Node.js optimization
FROM node:18-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
# Install ALL dependencies (dev + prod) in separate stage
RUN npm ci && npm cache clean --force

FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Copy node_modules from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run build && npm prune --production

FROM node:18-alpine AS runner
# Install only production runtime dependencies
RUN apk add --no-cache \
    dumb-init \
    curl

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001

WORKDIR /app

# Copy only built application and production dependencies
COPY --from=builder --chown=nodeuser:nodejs /app/dist ./dist
COPY --from=builder --chown=nodeuser:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodeuser:nodejs /app/package.json ./

USER nodeuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/index.js"]
```

**Java Spring Boot optimization:**
```dockerfile
# Maven build optimization
FROM maven:3.8.4-eclipse-temurin-17-alpine AS dependencies
WORKDIR /app
COPY pom.xml .
# Download dependencies in separate layer for better caching
RUN mvn dependency:go-offline -B

FROM maven:3.8.4-eclipse-temurin-17-alpine AS builder
WORKDIR /app
COPY pom.xml .
COPY --from=dependencies /root/.m2 /root/.m2
COPY src ./src
RUN mvn clean package -DskipTests -B

FROM eclipse-temurin:17-jre-alpine AS runner
# Install runtime dependencies and security updates
RUN apk update && apk upgrade && \
    apk add --no-cache \
        curl \
        dumb-init && \
    rm -rf /var/cache/apk/*

# Create non-root user
RUN addgroup -S spring && adduser -S spring -G spring

WORKDIR /app

# Copy only the JAR file
COPY --from=builder --chown=spring:spring /app/target/*.jar app.jar

USER spring

# JVM optimization for containers
ENV JAVA_OPTS="-XX:+UseContainerSupport \
               -XX:MaxRAMPercentage=75.0 \
               -XX:+UseG1GC \
               -XX:+UseStringDeduplication \
               -Djava.security.egd=file:/dev/./urandom"

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health/liveness || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
```

**Python Flask optimization:**
```dockerfile
# Python optimization with poetry
FROM python:3.11-slim as dependencies
RUN pip install poetry
WORKDIR /app
COPY pyproject.toml poetry.lock ./
# Export requirements.txt for production
RUN poetry export -f requirements.txt --output requirements.txt --without-hashes

FROM python:3.11-slim as builder
WORKDIR /app
COPY --from=dependencies /app/requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

FROM python:3.11-slim as runner
# Install security updates and runtime deps
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
        curl \
        dumb-init && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN useradd --create-home --shell /bin/bash app

WORKDIR /app

# Copy Python packages from builder
COPY --from=builder --chown=app:app /root/.local /home/app/.local
# Copy application code
COPY --chown=app:app . .

USER app

# Make sure scripts in .local are usable
ENV PATH=/home/app/.local/bin:$PATH

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:5000/health || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["python", "app.py"]
```

**Advanced optimization techniques:**
```dockerfile
# Distroless final image for maximum security
FROM gcr.io/distroless/java17-debian11 AS runner
COPY --from=builder /app/target/*.jar /app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]

# Alpine with specific package pinning
FROM alpine:3.18.4 AS base
RUN apk add --no-cache \
    nodejs=18.17.1-r0 \
    npm=9.6.6-r0 \
    && rm -rf /var/cache/apk/*

# Scratch for minimal static binaries
FROM scratch AS minimal
COPY --from=builder /app/binary /
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
ENTRYPOINT ["/binary"]
```

**Build optimization scripts:**
```bash
#!/bin/bash
# docker-optimization.sh

set -e

IMAGE_NAME=${1:-myapp}
TAG=${2:-latest}

echo "=== Docker Image Optimization ==="

# Build with BuildKit for advanced features
export DOCKER_BUILDKIT=1

# Build with cache optimization
docker build \
    --target runner \
    --cache-from ${IMAGE_NAME}:cache \
    --tag ${IMAGE_NAME}:${TAG} \
    --tag ${IMAGE_NAME}:cache \
    .

# Analyze image
echo "=== Image Analysis ==="
docker images ${IMAGE_NAME}:${TAG}

# Detailed layer analysis
echo "=== Layer Analysis ==="
docker history ${IMAGE_NAME}:${TAG} --no-trunc

# Security scanning with Trivy
echo "=== Security Scan ==="
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
    aquasec/trivy:latest image ${IMAGE_NAME}:${TAG}

# Image optimization with Dive
echo "=== Optimization Analysis ==="
docker run --rm -it \
    -v /var/run/docker.sock:/var/run/docker.sock \
    wagoodman/dive:latest ${IMAGE_NAME}:${TAG}

# Multi-arch build for production
echo "=== Multi-Architecture Build ==="
docker buildx create --name mybuilder --use || true
docker buildx build \
    --platform linux/amd64,linux/arm64 \
    --target runner \
    --tag ${IMAGE_NAME}:${TAG} \
    --push \
    .

echo "Optimization completed for ${IMAGE_NAME}:${TAG}"
```

**.dockerignore optimization:**
```bash
# .dockerignore - Critical for build context optimization
node_modules
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Development files
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE and editor files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Version control
.git
.gitignore
.gitattributes

# CI/CD files
.github/
.gitlab-ci.yml
Jenkinsfile

# Documentation
README.md
CHANGELOG.md
docs/
*.md

# Testing
coverage/
.nyc_output
.coverage
test/
tests/
__tests__/
spec/
.pytest_cache/

# Build artifacts
dist/
build/
target/
*.log
*.pid
*.seed
*.pid.lock

# Dependency directories that will be reinstalled
node_modules/
vendor/
```

**Image scanning and security:**
```yaml
# security-scan.yml
name: Docker Security Scan

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Build image
      run: |
        docker build -t myapp:scan .
        
    - name: Run Trivy vulnerability scanner
      uses: aquasecurity/trivy-action@master
      with:
        image-ref: 'myapp:scan'
        format: 'sarif'
        output: 'trivy-results.sarif'
        severity: 'CRITICAL,HIGH'
        
    - name: Upload Trivy scan results
      uses: github/codeql-action/upload-sarif@v2
      if: always()
      with:
        sarif_file: 'trivy-results.sarif'
        
    - name: Docker Scout CVE scan
      run: |
        docker scout cves myapp:scan --exit-code --only-severity critical,high
        
    - name: Image efficiency analysis
      run: |
        docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
          wagoodman/dive:latest myapp:scan --ci
```

</div>

</details>

</div>

<div class="concept-section myths" data-filter="docker">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

❌ **"Alpine mindig a legjobb választás"**  
✅ Alpine kicsi, de compatibility issues lehetnek. Balance kell size és functionality között

❌ **"Multi-stage builds túl bonyolultak"**  
✅ Multi-stage builds jelentősen csökkentik az image size-ot és javítják a security-t

❌ **"FROM scratch a legbiztonságosabb"**  
✅ Scratch minimal, de debugging nehéz. Distroless images jó compromise

❌ **"Build cache mindig jó"**  
✅ Cache invalidation fontos security updates és dependency changes esetén

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="docker">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Image size comparison:**
```bash
# Compare image sizes
docker images | grep myapp

# Analyze specific image layers
docker history myapp:latest --no-trunc

# Check for unnecessary files
docker run --rm myapp:latest find / -type f -size +10M 2>/dev/null
```

**Quick optimization test:**
```bash
# Test different base images
docker build -f Dockerfile.alpine -t myapp:alpine .
docker build -f Dockerfile.slim -t myapp:slim .
docker images | grep myapp
```

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="docker medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Hogyan optimalizálnád egy Docker image size-ot?**
A: Multi-stage builds, appropriate base images, .dockerignore, layer ordering, unnecessary packages removal, distroless images.

**Q: Mi a Docker layer caching stratégia?**
A: Least changing instructions first, dependencies before application code, combine RUN commands, leverage BuildKit cache mounts.

**Q: Mikor használnál alpine vs slim vs distroless images-eket?**
A: Alpine = small but potential compatibility issues. Slim = good balance. Distroless = maximum security, minimal attack surface.

**Q: Hogyan biztosítod a Docker image security-t?**
A: Vulnerability scanning, non-root users, minimal base images, regular updates, secrets management, read-only filesystem.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="docker">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **CI/CD pipelines** → Automated image building és optimization
- **Security scanning** → Image vulnerability assessment
- **Container registries** → Optimized image storage és distribution
- **Kubernetes** → Resource-efficient pod scheduling
- **Performance monitoring** → Image startup time tracking

</div>

</details>

</div>

---

### Docker Security {#docker-security}

<div class="concept-section mental-model" data-filter="docker medior">

<details>
<summary>📋 <strong>Fogalom meghatározása</strong></summary>

<div>

Docker Security = defense-in-depth container biztonság: Image scanning (Trivy/Snyk vulnerability detection, base image updates), Non-root users (USER instruction Dockerfile-ban, principle of least privilege), Resource limits (--memory, --cpus flags container escape prevention-höz), Network isolation (custom bridge networks, firewall rules), Secret management (Docker secrets, environment variables avoidálása), Read-only filesystem (--read-only flag, tmpfs mounts temporary writes-hoz), Capabilities dropping (--cap-drop, minimal permissions), SELinux/AppArmor mandatory access control. Container runtime security: seccomp profiles, namespace isolation.

</div>

</details>

</div>

<div class="concept-section why-important" data-filter="docker medior">

<details>
<summary>💡 <strong>Miért számít?</strong></summary>

<div>

- **Attack surface reduction**: Minimális components csökkentik a potential vulnerabilities-eket
- **Container escape prevention**: Proper isolation megakadályozza a host system compromise-t
- **Data protection**: Secrets és sensitive data proper handling
- **Compliance**: Regulatory requirements teljesítése secure container practices-szel

</div>

</details>

</div>

<div class="runnable-model" data-filter="docker">

<details>
<summary><strong>Runnable mental model</strong></summary>

<div>

**Secure Dockerfile patterns:**
```dockerfile
# Security-first Dockerfile
FROM node:18-alpine AS builder
# Install security updates first
RUN apk update && apk upgrade && apk add --no-cache dumb-init

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

COPY . .
RUN npm run build

# Minimal production image
FROM node:18-alpine AS runner

# Install security updates and minimal dependencies
RUN apk update && apk upgrade && \
    apk add --no-cache \
        dumb-init \
        curl && \
    rm -rf /var/cache/apk/*

# Create non-root user with specific UID/GID
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001 -G nodejs

WORKDIR /app

# Copy built application with proper ownership
COPY --from=builder --chown=nodeuser:nodejs /app/dist ./dist
COPY --from=builder --chown=nodeuser:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodeuser:nodejs /app/package.json ./

# Switch to non-root user BEFORE any file operations
USER nodeuser

# Security: make filesystem read-only except for temp
VOLUME ["/tmp"]

EXPOSE 3000

# Health check for security monitoring
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/server.js"]
```

**Security-hardened Docker run commands:**
```bash
# Maximum security container run
docker run -d \
  --name secure-app \
  --user 1001:1001 \
  --read-only \
  --tmpfs /tmp:rw,noexec,nosuid,size=100m \
  --tmpfs /run:rw,noexec,nosuid,size=50m \
  --memory="512m" \
  --memory-swap="512m" \
  --cpus="0.5" \
  --restart=unless-stopped \
  --security-opt="no-new-privileges:true" \
  --cap-drop=ALL \
  --cap-add=NET_BIND_SERVICE \
  --network=isolated-network \
  -p 3000:3000 \
  myapp:secure

# Container with security scanning
docker run -d \
  --name monitored-app \
  --security-opt="apparmor:docker-default" \
  --security-opt="seccomp:default" \
  --log-driver=json-file \
  --log-opt max-size=10m \
  --log-opt max-file=3 \
  myapp:latest
```

**Docker Compose security configuration:**
```yaml
version: '3.8'

services:
  app:
    build: 
      context: .
      dockerfile: Dockerfile.secure
    user: "1001:1001"
    read_only: true
    tmpfs:
      - /tmp:rw,noexec,nosuid,size=100m
      - /run:rw,noexec,nosuid,size=50m
    mem_limit: 512m
    mem_reservation: 256m
    cpus: 0.5
    restart: unless-stopped
    security_opt:
      - no-new-privileges:true
      - apparmor:docker-default
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE
    networks:
      - frontend
      - backend
    environment:
      - NODE_ENV=production
    secrets:
      - db_password
      - api_key
    depends_on:
      - db
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s

  db:
    image: postgres:13-alpine
    user: "999:999"
    read_only: true
    tmpfs:
      - /tmp:rw,noexec,nosuid,size=100m
      - /run/postgresql:rw,noexec,nosuid,size=50m
    mem_limit: 1g
    restart: unless-stopped
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    networks:
      - backend
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=dbuser
      - POSTGRES_PASSWORD_FILE=/run/secrets/db_password
    secrets:
      - db_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U dbuser -d myapp"]
      interval: 10s
      timeout: 5s
      retries: 5

secrets:
  db_password:
    external: true
  api_key:
    external: true

volumes:
  postgres_data:
    driver: local

networks:
  frontend:
    driver: bridge
    internal: false
  backend:
    driver: bridge
    internal: true
```

**Image vulnerability scanning:**
```bash
#!/bin/bash
# security-scan.sh

IMAGE_NAME=${1:-myapp:latest}

echo "=== Docker Security Scan for $IMAGE_NAME ==="

# Trivy comprehensive scan
echo "Running Trivy vulnerability scan..."
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
    aquasec/trivy:latest image \
    --severity HIGH,CRITICAL \
    --format table \
    --exit-code 1 \
    $IMAGE_NAME

# Docker Scout scan (if available)
echo "Running Docker Scout scan..."
docker scout cves $IMAGE_NAME --exit-code --only-severity critical,high

# Custom security checks
echo "Running custom security checks..."

# Check for root user
if docker run --rm $IMAGE_NAME whoami | grep -q root; then
    echo "❌ WARNING: Container running as root user"
else
    echo "✅ Container running as non-root user"
fi

# Check for secrets in image
echo "Checking for potential secrets..."
docker run --rm $IMAGE_NAME find / -name "*.key" -o -name "*.pem" -o -name "*password*" 2>/dev/null || true

# Check for sensitive environment variables
echo "Checking environment variables..."
docker inspect $IMAGE_NAME | jq '.[0].Config.Env[]' | grep -i -E "(password|secret|key|token)" || echo "No sensitive env vars found"

# Check image signature (if using Docker Content Trust)
echo "Checking image signature..."
DOCKER_CONTENT_TRUST=1 docker pull $IMAGE_NAME 2>&1 | grep -q "Tagging" && echo "✅ Image signed" || echo "⚠️ Image not signed"

echo "Security scan completed"
```

**Runtime security monitoring:**
```yaml
# docker-compose.monitoring.yml
version: '3.8'

services:
  # Falco for runtime security monitoring
  falco:
    image: falcosecurity/falco:latest
    privileged: true
    volumes:
      - /var/run/docker.sock:/host/var/run/docker.sock
      - /dev:/host/dev
      - /proc:/host/proc:ro
      - /boot:/host/boot:ro
      - /lib/modules:/host/lib/modules:ro
      - /usr:/host/usr:ro
      - /etc:/host/etc:ro
    environment:
      - FALCO_GRPC_ENABLED=true
    ports:
      - "8765:8765"
    restart: unless-stopped

  # Sysdig for container monitoring
  sysdig:
    image: sysdig/agent:latest
    privileged: true
    volumes:
      - /var/run/docker.sock:/host/var/run/docker.sock
      - /dev:/host/dev
      - /proc:/host/proc:ro
      - /boot:/host/boot:ro
      - /lib/modules:/host/lib/modules:ro
      - /usr:/host/usr:ro
    environment:
      - ACCESS_KEY=${SYSDIG_ACCESS_KEY}
      - SECURE_ENABLED=true
    restart: unless-stopped

  # CIS Docker Benchmark
  docker-bench:
    image: docker/docker-bench-security:latest
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /usr/lib/systemd:/usr/lib/systemd
      - /etc:/etc
    command: ["sh", "-c", "while true; do /usr/local/bin/docker-bench-security.sh; sleep 3600; done"]
    restart: unless-stopped
```

**Secret management patterns:**
```bash
# Using Docker secrets
echo "supersecretpassword" | docker secret create db_password -

# Using external secret management
docker run -d \
  --name app-with-vault \
  -e VAULT_ADDR=https://vault.company.com \
  -e VAULT_TOKEN_FILE=/run/secrets/vault_token \
  -v vault_token:/run/secrets/vault_token:ro \
  myapp:secure

# Environment variable injection at runtime
docker run -d \
  --name secure-env-app \
  --env-file <(vault kv get -format=json secret/myapp | jq -r '.data.data | to_entries[] | "\(.key)=\(.value)"') \
  myapp:latest

# Using init containers for secret fetch
kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: app-with-init-secrets
spec:
  initContainers:
  - name: secret-fetcher
    image: vault:latest
    command: ['sh', '-c']
    args:
    - |
      vault auth -method=kubernetes role=myapp
      vault kv get -field=password secret/myapp > /shared/db_password
    volumeMounts:
    - name: shared-secrets
      mountPath: /shared
  containers:
  - name: app
    image: myapp:secure
    volumeMounts:
    - name: shared-secrets
      mountPath: /secrets
      readOnly: true
  volumes:
  - name: shared-secrets
    emptyDir: {}
EOF
```

**Network security configuration:**
```bash
# Create isolated networks
docker network create --driver bridge \
  --subnet=172.20.0.0/16 \
  --ip-range=172.20.240.0/20 \
  frontend-network

docker network create --driver bridge \
  --subnet=172.21.0.0/16 \
  --internal \
  backend-network

# Run containers with network isolation
docker run -d \
  --name web-server \
  --network frontend-network \
  -p 80:80 \
  nginx:alpine

docker run -d \
  --name api-server \
  --network frontend-network \
  --network backend-network \
  myapi:secure

docker run -d \
  --name database \
  --network backend-network \
  postgres:13-alpine

# Network policy enforcement (with docker-compose)
version: '3.8'
services:
  web:
    networks:
      - frontend
  api:
    networks:
      - frontend
      - backend
  db:
    networks:
      - backend

networks:
  frontend:
    driver: bridge
    driver_opts:
      com.docker.network.bridge.enable_icc: "false"
  backend:
    driver: bridge
    internal: true
```

</div>

</details>

</div>

<div class="concept-section myths" data-filter="docker">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

❌ **"Container isolation elég a security-hez"**  
✅ Container alapértelmezetten nem teljesen isolated. Additional security measures szükségesek

❌ **"Official images mindig biztonságosak"**  
✅ Official images is tartalmazhatnak vulnerabilities. Regular scanning és updates fontosak

❌ **"Docker secrets file-based secrets-nél biztonságosabbak"**  
✅ Docker secrets jók, de external secret management (Vault) még biztonságosabb

❌ **"Root user container-ben OK, mert isolated"**  
✅ Container escape vulnerabilities miatt root user significant security risk

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="docker">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Quick security check:**
```bash
# Check if container runs as root
docker exec <container> whoami

# Check container capabilities
docker inspect <container> | grep -i cap

# Scan image for vulnerabilities
docker scout cves <image>
```

**Security best practices checklist:**
```bash
# ✅ Non-root user
# ✅ Read-only filesystem
# ✅ No unnecessary capabilities
# ✅ Resource limits
# ✅ Secret management
# ✅ Regular updates
```

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="docker medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Hogyan biztosítod a Docker container security-t?**
A: Non-root users, read-only filesystem, capability dropping, resource limits, secret management, image scanning, network isolation.

**Q: Mi a container escape és hogyan előzheted meg?**
A: Container process breaks out to host. Prevention: non-root users, proper capabilities, AppArmor/SELinux, regular updates.

**Q: Hogyan kezelnéd a secrets-eket Docker environment-ben?**
A: Docker secrets, external secret management (Vault), environment variable injection, init containers, avoiding hardcoded secrets.

**Q: Mik a Docker image security best practices?**
A: Minimal base images, vulnerability scanning, multi-stage builds, dependency updates, signature verification, content trust.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="docker">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **Kubernetes security** → Pod security policies és network policies
- **Secret management** → External secret stores integration
- **CI/CD security** → Automated security scanning
- **Compliance** → Regulatory requirements adherence
- **Monitoring** → Security event detection és alerting

</div>

</details>

</div>

---

---

### Docker Networking {#docker-networking}

<div class="concept-section mental-model" data-filter="docker medior">

<details>
<summary>📋 <strong>Fogalom meghatározása</strong></summary>

<div>

Docker Networking = container communication management network drivers-szel: Bridge network (default, single-host container isolation, custom bridge networks DNS resolution-nel), Host network (container directly host network stack-et használ, no isolation), Overlay network (multi-host communication Swarm-ban, encrypted by default), None network (network isolation, no connectivity), Macvlan network (container-ek saját MAC address-szel physical network-höz csatlakoznak). Port mapping (-p flag, host:container port binding). Service discovery: embedded DNS server container name resolution-höz. Network namespaces isolation.

</div>

</details>

</div>

<div class="concept-section why-important" data-filter="docker medior">

<details>
<summary>💡 <strong>Miért számít?</strong></summary>

<div>

- **Service discovery**: Container-ek név alapján találják meg egymást
- **Network isolation**: Security és performance optimization different network segments-szel
- **Load balancing**: Traffic distribution multiple container instances között
- **Multi-host communication**: Distributed applications seamless networking-je

</div>

</details>

</div>

<div class="runnable-model" data-filter="docker">

<details>
<summary><strong>Runnable mental model</strong></summary>

<div>

**Docker network típusok és használat:**
```bash
# List existing networks
docker network ls

# Bridge network (default)
docker network create --driver bridge myapp-network
docker network inspect myapp-network

# Custom bridge with specific configuration
docker network create \
  --driver bridge \
  --subnet=172.20.0.0/16 \
  --ip-range=172.20.240.0/20 \
  --gateway=172.20.0.1 \
  --opt "com.docker.network.bridge.name"="docker1" \
  custom-bridge

# Host network (container uses host networking)
docker run -d --name nginx-host --network host nginx:alpine

# None network (no networking)
docker run -d --name isolated-container --network none alpine sleep 3600

# Overlay network for multi-host communication
docker network create \
  --driver overlay \
  --subnet=10.0.0.0/24 \
  --attachable \
  multi-host-network
```

**Container communication patterns:**
```bash
# Same network communication
docker network create app-network

# Start containers on same network
docker run -d --name web --network app-network nginx:alpine
docker run -d --name api --network app-network myapi:latest
docker run -d --name db --network app-network postgres:13-alpine

# Test connectivity
docker exec web ping api
docker exec api ping db
docker exec web curl http://api:3000/health

# Multiple network connectivity
docker network create frontend-network
docker network create backend-network

# API server on both networks
docker run -d --name api-server \
  --network frontend-network \
  myapi:latest

docker network connect backend-network api-server

# Web on frontend only
docker run -d --name web-server \
  --network frontend-network \
  nginx:alpine

# Database on backend only
docker run -d --name database \
  --network backend-network \
  postgres:13-alpine
```

**Advanced Docker Compose networking:**
```yaml
version: '3.8'

services:
  # Frontend services
  web:
    image: nginx:alpine
    ports:
      - "80:80"
    networks:
      - frontend
      - monitoring
    depends_on:
      - api

  cdn:
    image: nginx:alpine
    ports:
      - "8080:80"
    networks:
      - frontend
    volumes:
      - ./static:/usr/share/nginx/html:ro

  # API layer
  api:
    image: myapi:latest
    ports:
      - "3000:3000"
    networks:
      - frontend
      - backend
      - monitoring
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/myapp
      - REDIS_URL=redis://cache:6379
    depends_on:
      - db
      - cache

  # Backend services
  db:
    image: postgres:13-alpine
    networks:
      - backend
      - monitoring
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  cache:
    image: redis:7-alpine
    networks:
      - backend
      - monitoring
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data

  # Monitoring services
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    networks:
      - monitoring
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    networks:
      - monitoring
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin

networks:
  frontend:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
  backend:
    driver: bridge
    internal: true  # No external access
    ipam:
      config:
        - subnet: 172.21.0.0/16
  monitoring:
    driver: bridge
    ipam:
      config:
        - subnet: 172.22.0.0/16

volumes:
  postgres_data:
  redis_data:
```

**Load balancing with Docker:**
```yaml
# docker-compose.loadbalancer.yml
version: '3.8'

services:
  # Load balancer
  nginx-lb:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    networks:
      - frontend
    depends_on:
      - api-1
      - api-2
      - api-3

  # Multiple API instances
  api-1:
    image: myapi:latest
    networks:
      - frontend
      - backend
    environment:
      - INSTANCE_ID=api-1
      - DATABASE_URL=postgresql://postgres:password@db:5432/myapp

  api-2:
    image: myapi:latest
    networks:
      - frontend
      - backend
    environment:
      - INSTANCE_ID=api-2
      - DATABASE_URL=postgresql://postgres:password@db:5432/myapp

  api-3:
    image: myapi:latest
    networks:
      - frontend
      - backend
    environment:
      - INSTANCE_ID=api-3
      - DATABASE_URL=postgresql://postgres:password@db:5432/myapp

  # Shared database
  db:
    image: postgres:13-alpine
    networks:
      - backend
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

networks:
  frontend:
  backend:
    internal: true

volumes:
  postgres_data:
```

**NGINX load balancer configuration:**
```nginx
# nginx.conf
upstream api_backend {
    least_conn;
    server api-1:3000 weight=1 max_fails=3 fail_timeout=30s;
    server api-2:3000 weight=1 max_fails=3 fail_timeout=30s;
    server api-3:3000 weight=1 max_fails=3 fail_timeout=30s;
}

server {
    listen 80;
    server_name localhost;

    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }

    # API proxy
    location /api/ {
        proxy_pass http://api_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Health checks
        proxy_next_upstream error timeout http_500 http_502 http_503 http_504;
        proxy_timeout 30s;
        proxy_connect_timeout 5s;
    }

    # Static content
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ =404;
    }
}
```

**Network debugging és troubleshooting:**
```bash
#!/bin/bash
# network-debug.sh

CONTAINER_NAME=${1:-myapp}

echo "=== Docker Network Debugging for $CONTAINER_NAME ==="

# Container network info
echo "Container network configuration:"
docker inspect $CONTAINER_NAME | jq '.[0].NetworkSettings'

# Container IP addresses
echo -e "\nContainer IP addresses:"
docker inspect $CONTAINER_NAME | jq -r '.[0].NetworkSettings.Networks | to_entries[] | "\(.key): \(.value.IPAddress)"'

# Network connectivity tests
echo -e "\nTesting connectivity:"
docker exec $CONTAINER_NAME ping -c 3 8.8.8.8
docker exec $CONTAINER_NAME nslookup google.com

# Port checking
echo -e "\nChecking open ports:"
docker exec $CONTAINER_NAME netstat -tlnp

# DNS resolution test
echo -e "\nDNS resolution test:"
docker exec $CONTAINER_NAME nslookup db
docker exec $CONTAINER_NAME nslookup api

# Network interface info
echo -e "\nNetwork interfaces:"
docker exec $CONTAINER_NAME ip addr show

# Routing table
echo -e "\nRouting table:"
docker exec $CONTAINER_NAME ip route show

# Test specific service connectivity
echo -e "\nTesting service connectivity:"
if docker exec $CONTAINER_NAME curl -f -m 5 http://api:3000/health 2>/dev/null; then
    echo "✅ API service reachable"
else
    echo "❌ API service not reachable"
fi

if docker exec $CONTAINER_NAME pg_isready -h db -p 5432 2>/dev/null; then
    echo "✅ Database reachable"
else
    echo "❌ Database not reachable"
fi

# Network performance test
echo -e "\nNetwork performance test:"
docker exec $CONTAINER_NAME ping -c 10 -i 0.2 api | tail -n 2
```

**Docker Swarm overlay networking:**
```bash
# Initialize Docker Swarm
docker swarm init --advertise-addr $(hostname -I | awk '{print $1}')

# Create overlay network
docker network create \
  --driver overlay \
  --subnet=10.0.1.0/24 \
  --gateway=10.0.1.1 \
  --attachable \
  swarm-network

# Deploy service on overlay network
docker service create \
  --name web-service \
  --network swarm-network \
  --replicas 3 \
  --publish 80:80 \
  nginx:alpine

# Service discovery test
docker service create \
  --name api-service \
  --network swarm-network \
  --replicas 2 \
  myapi:latest

# Test cross-host communication
docker exec $(docker ps -q -f name=web-service) ping api-service
```

</div>

</details>

</div>

<div class="concept-section myths" data-filter="docker">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

❌ **"Bridge network automatikusan secure"**  
✅ Default bridge network nincs isolation. Custom networks és network policies szükségesek

❌ **"Container name = hostname mindig"**  
✅ Only custom networks-ön automatic DNS resolution. Default bridge network-ön manual linking szükséges

❌ **"Host network mode mindig gyorsabb"**  
✅ Host network bypass Docker networking, de security és isolation trade-off-fal jár

❌ **"Port mapping elég a connectivity-hez"**  
✅ Port mapping csak external access-hez. Internal communication name-based resolution-nel hatékonyabb

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="docker">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Quick network test:**
```bash
# Create test network and containers
docker network create test-network
docker run -d --name test1 --network test-network alpine sleep 300
docker run -d --name test2 --network test-network alpine sleep 300

# Test connectivity
docker exec test1 ping test2
docker exec test2 ping test1

# Cleanup
docker rm -f test1 test2
docker network rm test-network
```

**Network inspection:**
```bash
# See container networks
docker inspect <container> | grep -A 10 NetworkSettings

# Network details
docker network inspect <network-name>
```

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="docker medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Milyen Docker network driver-eket ismersz?**
A: Bridge (default, single host), Host (container uses host network), None (no network), Overlay (multi-host), Macvlan (direct physical network access).

**Q: Hogyan működik a container name resolution?**
A: Custom networks automatic DNS resolution container names-hez. Default bridge network links vagy IP addresses szükségesek.

**Q: Mikor használnál overlay network-öt?**
A: Multi-host container communication, Docker Swarm, distributed applications, service mesh architectures.

**Q: Hogyan debuggolnál network connectivity problémákat?**
A: docker network inspect, container ping tests, port accessibility check, DNS resolution verification, network interface analysis.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="docker">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **Docker Compose** → Multi-container networking definitions
- **Kubernetes networking** → Advanced orchestration networking
- **Load balancing** → Traffic distribution strategies
- **Service discovery** → Dynamic service location
- **Security** → Network isolation és access control

</div>

</details>

</div>

---

### Docker Volumes {#docker-volumes}

<div class="concept-section mental-model" data-filter="docker junior">

<details>
<summary>🧭 <strong>Így gondolj rá</strong></summary>

<div>

A Docker Volumes olyan, mint **külső tárolók** és **megosztott mappák**:
- **Named volumes** = **Biztonsági széf** amit Docker kezel, de bárhonnan elérhető
- **Bind mounts** = **Szimbolikus link** host file system-re
- **tmpfs mounts** = **Ideiglenes memória tároló** ami eltűnik restart után
- **Volume drivers** = **Különböző tárolási technológiák** (local, cloud, network storage)

Volumes **persistent data** tárolására szolgálnak, ami **túléli a container lifecycle-t**.

</div>

</details>

</div>

<div class="concept-section why-important" data-filter="docker junior">

<details>
<summary>💡 <strong>Miért számít?</strong></summary>

<div>

- **Data persistence**: Container restart vagy removal után is megmarad az adat
- **Data sharing**: Multiple containers között adat megosztása
- **Performance**: Optimalized storage access különböző use case-ekhez
- **Backup strategy**: Centralized data management és backup procedures

</div>

</details>

</div>

<div class="runnable-model" data-filter="docker">

<details>
<summary><strong>Runnable mental model</strong></summary>

<div>

**Volume típusok és használat:**
```bash
# Named volumes management
docker volume create myapp-data
docker volume create postgres-data
docker volume ls
docker volume inspect myapp-data

# Using named volumes
docker run -d \
  --name database \
  -v postgres-data:/var/lib/postgresql/data \
  -e POSTGRES_PASSWORD=password \
  postgres:13-alpine

docker run -d \
  --name app \
  -v myapp-data:/app/data \
  -v myapp-logs:/app/logs \
  myapp:latest

# Bind mounts
docker run -d \
  --name development-app \
  -v $(pwd)/src:/app/src \
  -v $(pwd)/config:/app/config:ro \
  -v $(pwd)/logs:/app/logs \
  -p 3000:3000 \
  myapp:dev

# tmpfs mounts (memory storage)
docker run -d \
  --name secure-app \
  --tmpfs /tmp:rw,noexec,nosuid,size=100m \
  --tmpfs /var/cache:rw,size=50m \
  myapp:latest

# Read-only mounts
docker run -d \
  --name readonly-config-app \
  -v $(pwd)/config:/app/config:ro \
  -v app-data:/app/data \
  myapp:latest
```

**Volume backup és restore:**
```bash
#!/bin/bash
# volume-backup.sh

VOLUME_NAME=${1:-myapp-data}
BACKUP_PATH=${2:-./backups}
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

echo "=== Docker Volume Backup: $VOLUME_NAME ==="

# Create backup directory
mkdir -p $BACKUP_PATH

# Backup volume to tar.gz
docker run --rm \
  -v $VOLUME_NAME:/data:ro \
  -v $(pwd)/$BACKUP_PATH:/backup \
  alpine:latest \
  tar czf /backup/${VOLUME_NAME}_${TIMESTAMP}.tar.gz -C /data .

echo "Backup completed: $BACKUP_PATH/${VOLUME_NAME}_${TIMESTAMP}.tar.gz"

# List backup files
ls -lh $BACKUP_PATH/

# Verify backup
echo "Verifying backup..."
tar -tzf $BACKUP_PATH/${VOLUME_NAME}_${TIMESTAMP}.tar.gz | head -10

echo "Backup verification completed"
```

```bash
#!/bin/bash
# volume-restore.sh

BACKUP_FILE=${1}
VOLUME_NAME=${2}

if [ ! -f "$BACKUP_FILE" ]; then
    echo "Backup file not found: $BACKUP_FILE"
    exit 1
fi

echo "=== Docker Volume Restore: $VOLUME_NAME ==="

# Create volume if doesn't exist
docker volume create $VOLUME_NAME

# Restore from backup
docker run --rm \
  -v $VOLUME_NAME:/data \
  -v $(dirname $BACKUP_FILE):/backup \
  alpine:latest \
  tar xzf /backup/$(basename $BACKUP_FILE) -C /data

echo "Restore completed for volume: $VOLUME_NAME"

# Verify restore
docker run --rm \
  -v $VOLUME_NAME:/data \
  alpine:latest \
  ls -la /data
```

**Docker Compose volume management:**
```yaml
version: '3.8'

services:
  # Database with persistent storage
  postgres:
    image: postgres:13-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: dbuser
      POSTGRES_PASSWORD: dbpass
    volumes:
      # Named volume for data persistence
      - postgres_data:/var/lib/postgresql/data
      # Bind mount for initialization scripts
      - ./db/init:/docker-entrypoint-initdb.d:ro
      # tmpfs for temporary files
      - type: tmpfs
        target: /tmp
        tmpfs:
          size: 100M
    restart: unless-stopped

  # Application with multiple volume types
  app:
    build: .
    depends_on:
      - postgres
    volumes:
      # Named volumes for persistent data
      - app_data:/app/data
      - app_uploads:/app/uploads
      - app_logs:/app/logs
      
      # Bind mounts for development
      - ./config:/app/config:ro
      - ./static:/app/static:ro
      
      # tmpfs for sensitive temporary data
      - type: tmpfs
        target: /tmp
        tmpfs:
          size: 100M
          mode: 01777
    environment:
      - DATABASE_URL=postgresql://dbuser:dbpass@postgres:5432/myapp
    restart: unless-stopped

  # Log aggregator
  filebeat:
    image: docker.elastic.co/beats/filebeat:7.15.0
    user: root
    volumes:
      # Access to application logs
      - app_logs:/var/log/app:ro
      # Bind mount for configuration
      - ./filebeat/filebeat.yml:/usr/share/filebeat/filebeat.yml:ro
      # Access to Docker logs
      - /var/log:/var/log:ro
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
      - /var/run/docker.sock:/var/run/docker.sock:ro
    depends_on:
      - app

  # Backup service
  backup:
    image: alpine:latest
    volumes:
      - postgres_data:/data/postgres:ro
      - app_data:/data/app:ro
      - app_uploads:/data/uploads:ro
      - ./backups:/backups
    command: |
      sh -c '
        while true; do
          timestamp=$$(date +"%Y%m%d_%H%M%S")
          echo "Starting backup at $$timestamp"
          
          # Create backup directory
          mkdir -p /backups/$$timestamp
          
          # Backup each volume
          tar czf /backups/$$timestamp/postgres.tar.gz -C /data/postgres .
          tar czf /backups/$$timestamp/app_data.tar.gz -C /data/app .
          tar czf /backups/$$timestamp/uploads.tar.gz -C /data/uploads .
          
          echo "Backup completed: $$timestamp"
          
          # Clean old backups (keep last 7 days)
          find /backups -name "*.tar.gz" -mtime +7 -delete
          
          # Wait 24 hours
          sleep 86400
        done
      '

volumes:
  postgres_data:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: /opt/myapp/data/postgres
      
  app_data:
    driver: local
    
  app_uploads:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: /opt/myapp/uploads
      
  app_logs:
    driver: local

networks:
  default:
    name: myapp_network
```

**Advanced volume configurations:**
```yaml
# Production volume setup with different drivers
version: '3.8'

services:
  app:
    image: myapp:latest
    volumes:
      # Local SSD for high-performance data
      - type: volume
        source: fast_data
        target: /app/cache
        volume:
          driver: local
          driver_opts:
            type: ext4
            device: /dev/sdb1

      # Network storage for shared data
      - type: volume
        source: shared_storage
        target: /app/shared
        volume:
          driver: local
          driver_opts:
            type: nfs
            o: addr=nfs.company.com,rw
            device: ":/shared/myapp"

      # Encrypted volume for sensitive data
      - type: volume
        source: encrypted_data
        target: /app/sensitive
        volume:
          driver: local
          driver_opts:
            type: ext4
            o: defaults,discard
            device: /dev/mapper/encrypted-volume

volumes:
  fast_data:
    driver: local
    driver_opts:
      type: ext4
      device: /dev/nvme0n1p1
      
  shared_storage:
    driver: local
    driver_opts:
      type: nfs
      o: addr=storage.company.com,rw,nfsvers=4
      device: ":/exports/myapp"
      
  encrypted_data:
    driver: local
    driver_opts:
      type: ext4
      device: /dev/mapper/secure-volume
```

**Volume monitoring és management:**
```bash
#!/bin/bash
# volume-management.sh

echo "=== Docker Volume Management ==="

# Volume usage statistics
echo "Volume usage:"
docker system df -v

# Detailed volume information
echo -e "\nDetailed volume info:"
for volume in $(docker volume ls -q); do
    echo "Volume: $volume"
    docker volume inspect $volume | jq '.[0] | {Name, Driver, Mountpoint, CreatedAt}'
    
    # Check volume size
    mountpoint=$(docker volume inspect $volume | jq -r '.[0].Mountpoint')
    if [ -d "$mountpoint" ]; then
        size=$(du -sh "$mountpoint" 2>/dev/null | cut -f1)
        echo "Size: $size"
    fi
    echo "---"
done

# Find unused volumes
echo -e "\nUnused volumes:"
docker volume ls -f dangling=true

# Volume cleanup
echo -e "\nCleaning up unused volumes:"
docker volume prune -f

# Check for volumes without containers
echo -e "\nOrphaned volumes:"
all_volumes=$(docker volume ls -q)
used_volumes=$(docker ps -a --format "table {{.Mounts}}" | grep -o '[a-zA-Z0-9][a-zA-Z0-9_.-]*' | sort | uniq)

for volume in $all_volumes; do
    if ! echo "$used_volumes" | grep -q "$volume"; then
        echo "Orphaned: $volume"
    fi
done

# Performance monitoring
echo -e "\nVolume I/O statistics:"
iostat -x 1 1 | grep -E "(Device|sda|sdb|nvme)"
```

**Volume performance optimization:**
```bash
# Performance testing script
#!/bin/bash
# volume-performance-test.sh

VOLUME_NAME=${1:-test-volume}
TEST_SIZE=${2:-1G}

echo "=== Volume Performance Test: $VOLUME_NAME ==="

# Create test volume
docker volume create $VOLUME_NAME

# Sequential write test
echo "Testing sequential write performance..."
docker run --rm \
  -v $VOLUME_NAME:/test \
  alpine:latest \
  dd if=/dev/zero of=/test/testfile bs=1M count=1024 oflag=direct

# Sequential read test  
echo "Testing sequential read performance..."
docker run --rm \
  -v $VOLUME_NAME:/test \
  alpine:latest \
  dd if=/test/testfile of=/dev/null bs=1M iflag=direct

# Random I/O test with fio
echo "Testing random I/O performance..."
docker run --rm \
  -v $VOLUME_NAME:/test \
  ljishen/fio:latest \
  fio --name=randwrite --ioengine=libaio --iodepth=1 --rw=randwrite \
      --bs=4k --direct=0 --size=100M --numjobs=1 --runtime=60 \
      --group_reporting --filename=/test/fio-test

# Cleanup
docker run --rm \
  -v $VOLUME_NAME:/test \
  alpine:latest \
  rm -f /test/testfile /test/fio-test

echo "Performance test completed"
```

</div>

</details>

</div>

<div class="concept-section myths" data-filter="docker">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

❌ **"Volumes automatikusan backup-olódnak"**  
✅ Volumes manual backup strategy-t igényelnek. Docker nem biztosít automatic backup-ot

❌ **"Bind mounts ugyanaz, mint volumes"**  
✅ Bind mounts host path-ra mutatnak, volumes Docker-managed storage. Different use cases és performance

❌ **"tmpfs volumes persistent"**  
✅ tmpfs memory-based, ephemeral storage. Container restart-nál elvész az adat

❌ **"Volume permissions automatikusan jók"**  
✅ File ownership és permissions manual configuration-t igényelhetnek, especially bind mounts

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="docker">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Quick volume test:**
```bash
# Create and test volume
docker volume create test-vol
docker run --rm -v test-vol:/data alpine sh -c "echo 'test data' > /data/test.txt"
docker run --rm -v test-vol:/data alpine cat /data/test.txt
docker volume rm test-vol
```

**Volume backup/restore practice:**
```bash
# Quick backup
docker run --rm -v mydata:/data -v $(pwd):/backup alpine tar czf /backup/mydata.tar.gz -C /data .

# Quick restore
docker run --rm -v mydata:/data -v $(pwd):/backup alpine tar xzf /backup/mydata.tar.gz -C /data
```

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="docker junior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Mi a különbség named volumes, bind mounts és tmpfs között?**
A: Named volumes = Docker-managed, portable. Bind mounts = host filesystem access. tmpfs = memory storage, ephemeral.

**Q: Hogyan backup-olnál Docker volumes-okat?**
A: Container-based backup tar-al, external backup tools, volume plugins, vagy cloud storage integration.

**Q: Mikor használnál bind mount vs named volume?**
A: Bind mount = development, config files, host integration. Named volume = production data, portability, Docker management.

**Q: Hogyan sharing-elnél data-t containers között?**
A: Named volumes multiple containers-hez mount-olva, shared volume drivers, vagy external storage systems.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="docker">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **Data persistence** → Database storage strategies
- **Backup strategies** → Data protection és recovery
- **Performance optimization** → Storage I/O tuning
- **Security** → Data encryption és access control
- **Kubernetes** → Persistent Volumes és storage classes

</div>

</details>

</div>

---

### Docker {#docker}

<div class="mental-model">
📦 **Mental Model: Docker - A Shipping Container for Code**
Képzeld el a Docker container-eket mint a modern szállítási konténereket. Ahogy egy konténer ugyanúgy működik bárhol a világon (hajón, vonaton, kamionon), úgy a Docker container is ugyanúgy fut bárhol (fejlesztői laptop, staging szerver, production cloud).

**A Container anatómiája:**
- **Image**: A "blueprint" - mint egy konténer gyári specifikáció
- **Container**: A futó instance - mint egy ténylegesen használt konténer
- **Dockerfile**: A építési utasítások - mint egy assembly manual
- **Layers**: Egymásra épülő rétegek - mint a konténer falai
- **Registry**: A "container port" - ahol tárolod és osztod meg

**Miért forradalmi:**
- **"It works on my machine" problémája megoldva**
- **Consistent environment**: Dev = Staging = Production
- **Isolation**: Alkalmazások nem zavarják egymást
- **Portability**: Bárhol futtatható
</div>

<div class="why-important">
💡 **Miért game-changer a Docker?**
- **Environment consistency**: Nincs több "nálam működött" probléma
- **Faster deployment**: Seconds helyett minutes/hours
- **Resource efficiency**: VM-eknél 10x jobb resource utilization
- **Scalability**: Horizontal scaling könnyű
- **Microservices enabler**: Service izolálás és deployment
- **DevOps velocity**: Gyorsabb fejlesztés és deployment
- **Cost optimization**: Jobb server utilization
- **Testing reliability**: Reproducible test environments
</div>

<div class="runnable-model">
🚀 **Docker best practices és patterns:**

**1. Multi-stage Dockerfile optimizations:**
```dockerfile
# Optimized Node.js application
FROM node:18-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
# Install ALL dependencies (dev + prod)
RUN npm ci && npm cache clean --force

FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
# Build the application
RUN npm run build && npm prune --production

FROM node:18-alpine AS runner
# Security: non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodeuser -u 1001

WORKDIR /app

# Copy only production dependencies and built app
COPY --from=builder --chown=nodeuser:nodejs /app/dist ./dist
COPY --from=builder --chown=nodeuser:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodeuser:nodejs /app/package.json ./package.json

USER nodeuser

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["node", "dist/index.js"]
```

**2. Spring Boot optimized Dockerfile:**
```dockerfile
# Java application with JVM optimization
FROM eclipse-temurin:17-jdk-alpine AS builder
WORKDIR /app
COPY pom.xml .
# Download dependencies for better caching
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests -B

FROM eclipse-temurin:17-jre-alpine AS runner

# Security updates and utilities
RUN apk update && apk upgrade && \
    apk add --no-cache curl dumb-init && \
    rm -rf /var/cache/apk/*

# Non-privileged user
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

WORKDIR /app

# Copy JAR with proper ownership
COPY --from=builder --chown=spring:spring /app/target/*.jar app.jar

# JVM optimization for containers
ENV JAVA_OPTS="-XX:+UseContainerSupport \
               -XX:MaxRAMPercentage=75.0 \
               -XX:+UseG1GC \
               -XX:+UseStringDeduplication \
               -Djava.security.egd=file:/dev/./urandom"

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health/liveness || exit 1

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]
CMD ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
```

**3. Production-ready Docker Compose:**
```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      target: runner
      args:
        - BUILD_VERSION=${BUILD_VERSION:-latest}
    ports:
      - "${APP_PORT:-8080}:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=${ENVIRONMENT:-development}
      - DATABASE_URL=postgresql://db:5432/${POSTGRES_DB}
      - REDIS_URL=redis://redis:6379
      - JAVA_OPTS=-Xmx512m -Xms256m
    volumes:
      # Config as volume for production
      - ./config:/app/config:ro
      # Logs volume
      - app-logs:/app/logs
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    networks:
      - backend
      - frontend
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: ${POSTGRES_DB:-myapp}
      POSTGRES_USER: ${POSTGRES_USER:-user}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./db/init:/docker-entrypoint-initdb.d:ro
    networks:
      - backend
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER:-user} -d ${POSTGRES_DB:-myapp}"]
      interval: 10s
      timeout: 5s
      retries: 5
    # Security: no external ports in production

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis-data:/data
    networks:
      - backend
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "redis-cli", "--raw", "incr", "ping"]
      interval: 10s
      timeout: 3s
      retries: 5

  nginx:
    image: nginx:alpine
    ports:
      - "${NGINX_PORT:-80}:80"
      - "${NGINX_SSL_PORT:-443}:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
      - nginx-logs:/var/log/nginx
    depends_on:
      - app
    networks:
      - frontend
    restart: unless-stopped

volumes:
  postgres-data:
    driver: local
  redis-data:
    driver: local
  app-logs:
    driver: local
  nginx-logs:
    driver: local

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    internal: true  # Backend network isolated from external access
```

**4. Docker optimization tricks:**
```bash
# Build optimization with BuildKit
export DOCKER_BUILDKIT=1
docker build --target runner \
  --cache-from myapp:cache \
  --cache-to type=registry,ref=myapp:cache \
  -t myapp:latest .

# Multi-architecture builds
docker buildx build --platform linux/amd64,linux/arm64 \
  -t myapp:latest --push .

# Image analysis and optimization
docker run --rm -it \
  -v /var/run/docker.sock:/var/run/docker.sock \
  wagoodman/dive:latest myapp:latest

# Security scanning
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy:latest image myapp:latest

# Resource usage monitoring
docker stats --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}"
```
</div>

<div class="myths">
🚫 **Gyakori tévhitek és hibák**

<details>
<summary><strong>Tévhit: "Docker ugyanaz, mint a VM"</strong></summary>
<div class="myth-content">
**Valóság:** Docker container-ek sokkal könnyebbek és hatékonyabbak, mint a VM-ek.

**Összehasonlítás:**
```
Virtual Machine:
├── Host OS
├── Hypervisor (VMware/VirtualBox)
├── Guest OS (full OS per VM)
├── Libraries & Dependencies
└── Application

Docker Container:
├── Host OS
├── Docker Engine
├── Libraries & Dependencies (shared kernel)
└── Application
```

**Erőforrás használat:**
- **VM**: 1-8 GB RAM, several GB disk per instance
- **Container**: 10-100 MB RAM, MB-s disk per instance

**Startup time:**
- **VM**: 1-5 minutes
- **Container**: 1-5 seconds
</div>
</details>

<details>
<summary><strong>Tévhit: "Docker image minél kisebb, annál jobb"</strong></summary>
<div class="myth-content">
**Valóság:** Balance kell a size és functionality között.

**Rossz optimalizáció:**
```dockerfile
# TOO aggressive - missing debugging tools
FROM scratch
COPY app /app
CMD ["/app"]
# Problem: no shell, no debugging tools, no package manager
```

**Jó optimalizáció:**
```dockerfile
# Balanced approach
FROM alpine:3.18
RUN apk add --no-cache ca-certificates curl
COPY app /app
CMD ["/app"]
# Better: minimal but functional
```

**Image size best practices:**
- Use appropriate base images (alpine vs slim vs full)
- Multi-stage builds for build dependencies
- .dockerignore for unnecessary files
- Order layers by change frequency
- Combine RUN commands to reduce layers

**Layer caching strategy:**
```dockerfile
# Good layer ordering (least to most likely to change)
FROM node:18-alpine
COPY package*.json ./    # Dependencies change less frequently
RUN npm ci
COPY . .                 # Source code changes most frequently
RUN npm run build
```
</div>
</details>

<details>
<summary><strong>Tévhit: "Root user OK container-ben"</strong></summary>
<div class="myth-content">
**Valóság:** Security first! Soha ne futtass production container-eket root user-ként.

**Security issues root user-rel:**
- Container escape vulnerabilities
- Host system compromise risk
- Kubernetes security policy violations
- Compliance failures

**Proper security implementation:**
```dockerfile
# Create non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Set ownership before switching user
COPY --chown=appuser:appuser . /app

# Switch to non-root user
USER appuser

# Additional security
RUN chmod +x /app/entrypoint.sh
```

**Kubernetes security context:**
```yaml
securityContext:
  runAsNonRoot: true
  runAsUser: 1000
  runAsGroup: 1000
  readOnlyRootFilesystem: true
  allowPrivilegeEscalation: false
  capabilities:
    drop:
      - ALL
```
</div>
</details>
</details>

<div class="micro-learning">
🎯 **Micro-learning: Docker layer caching mastery**

**The layer caching golden rule:**
> "Order your Dockerfile instructions from least to most likely to change"

**Optimal Dockerfile structure:**
```dockerfile
# 1. Base image (changes rarely)
FROM node:18-alpine

# 2. System dependencies (changes rarely)
RUN apk add --no-cache curl

# 3. Application dependencies (changes occasionally)
COPY package*.json ./
RUN npm ci

# 4. Application code (changes frequently)
COPY . .
RUN npm run build

# 5. Runtime configuration (changes frequently)
COPY config/ ./config/
CMD ["npm", "start"]
```

**Cache-busting patterns to avoid:**
```dockerfile
# BAD: Invalidates cache every build
RUN apt-get update && apt-get install -y curl
COPY . .  # This invalidates all subsequent layers

# GOOD: Stable base layer
RUN apt-get update && apt-get install -y curl
COPY package.json .
RUN npm install  # Only re-runs if package.json changes
COPY . .
```

**Pro tip:** Use `.dockerignore` to exclude files that don't affect the build:
```
node_modules
.git
README.md
.env.local
```
</div>

</div>

---

### Docker Compose {#docker-compose}

<div class="concept-section mental-model" data-filter="docker medior">

<details>
<summary>📋 <strong>Fogalom meghatározása</strong></summary>

<div>

Docker Compose = multi-container application orchestration tool YAML config file-lal (docker-compose.yml). Services definition (image, build, ports, volumes, environment, depends_on), Networks automatic creation service discovery-vel, Volumes persistent storage management. Commands: docker-compose up/down/ps/logs. Environment-specific configs (.env files, multiple compose files override-olhatók). Development parity: local environment production-hoz hasonló. Scaling: docker-compose up --scale service=3. Health checks és restart policies.

</div>

</details>

</div>

<div class="concept-section why-important" data-filter="docker medior">

<details>
<summary>💡 <strong>Miért számít?</strong></summary>

<div>

- **Multi-container orchestration**: Egyszerű kezelés komplex alkalmazásokhoz
- **Development parity**: Local environment = Production environment
- **One-command deployment**: `docker-compose up` és minden elindul
- **Environment management**: Dev/staging/prod konfigurációk könnyű váltása

</div>

</details>

</div>

<div class="runnable-model" data-filter="docker">

<details>
<summary><strong>Runnable mental model</strong></summary>

<div>

**Full-stack alkalmazás Docker Compose-ral:**
```yaml
version: '3.8'

services:
  # Frontend Service
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - REACT_APP_API_URL=http://localhost:8000/api
      - NODE_ENV=development
    depends_on:
      - backend
    networks:
      - app-network
    restart: unless-stopped

  # Backend API Service
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    volumes:
      - ./backend:/app
      - backend-uploads:/app/uploads
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/myapp
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=${JWT_SECRET}
      - NODE_ENV=development
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    networks:
      - app-network
      - db-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 30s

  # Database Service
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql:ro
    networks:
      - db-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d myapp"]
      interval: 10s
      timeout: 5s
      retries: 5
    # No external ports for security

  # Redis Cache Service
  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis-data:/data
    networks:
      - db-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 5

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
      - nginx-logs:/var/log/nginx
    depends_on:
      - frontend
      - backend
    networks:
      - app-network
    restart: unless-stopped

  # Monitoring with Prometheus
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - prometheus-data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--web.enable-lifecycle'
    networks:
      - monitoring
    restart: unless-stopped

  # Grafana Dashboard
  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=${GRAFANA_PASSWORD}
    volumes:
      - grafana-data:/var/lib/grafana
      - ./monitoring/grafana/dashboards:/var/lib/grafana/dashboards
    depends_on:
      - prometheus
    networks:
      - monitoring
    restart: unless-stopped

volumes:
  postgres-data:
    driver: local
  redis-data:
    driver: local
  backend-uploads:
    driver: local
  nginx-logs:
    driver: local
  prometheus-data:
    driver: local
  grafana-data:
    driver: local

networks:
  app-network:
    driver: bridge
  db-network:
    driver: bridge
    internal: true  # Database network isolated
  monitoring:
    driver: bridge
```

**Environment-specific override files:**
```yaml
# docker-compose.override.yml (development)
version: '3.8'

services:
  backend:
    volumes:
      - ./backend:/app
    environment:
      - DEBUG=true
      - LOG_LEVEL=debug
    ports:
      - "8000:8000"  # Expose for debugging

  db:
    ports:
      - "5432:5432"  # Expose for development tools
```

```yaml
# docker-compose.prod.yml (production)
version: '3.8'

services:
  backend:
    build:
      target: production
    environment:
      - NODE_ENV=production
      - LOG_LEVEL=warn
    deploy:
      replicas: 3
      restart_policy:
        condition: on-failure
        max_attempts: 3
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M

  nginx:
    deploy:
      replicas: 2
```

**Docker Compose management parancsok:**
```bash
# Szolgáltatások indítása
docker-compose up -d

# Specifikus service építése és indítása
docker-compose up --build backend

# Logok megtekintése
docker-compose logs -f backend

# Service skálázása
docker-compose up -d --scale backend=3

# Adott environment használata
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Cleanup
docker-compose down -v --remove-orphans

# Health check status
docker-compose ps

# Resource usage
docker-compose top
```

</div>

</details>

</div>

<div class="concept-section myths" data-filter="docker">

<details>
<summary>🧯 <strong>Gyakori tévhitek</strong></summary>

<div>

**"Docker Compose csak development-re jó"**
- Valóság: Production-ready orchestration tool kis és közepes alkalmazásokhoz
- Docker Swarm mode-dal production orchestration is lehetséges

**"Minden service egy compose file-ban"**
- Valóság: Moduláris compose files jobb (frontend, backend, monitoring külön)
- Override files használata environment-specifikus konfigurációkhoz

**"Volumes nélkül is működik"**
- Valóság: Data persistence nélkül minden adat elvész container restart-nál
- Named volumes használata production-ban kötelező

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="docker">

<details>
<summary>📚 <strong>Mikro-tanulás összefoglaló</strong></summary>

<div>

- **Compose = Multi-container orchestration** egyszerű YAML konfigurációval
- **Services**: Alkalmazás komponensek (frontend, backend, database)
- **Networks**: Service-ek közötti kommunikáció izolálása
- **Volumes**: Persistent data storage container restart-ok között
- **Environment files**: Sensitive data és environment-specifikus config
- **Health checks**: Automatic service health monitoring
- **Scaling**: Horizontal scaling `--scale` paraméterrel

</div>

</details>

</div>

<div class="concept-section interview" data-filter="docker medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Junior:**
- Mi a különbség a `docker run` és `docker-compose up` között?
- Hogyan kezeled a service-ek közötti függőségeket?
- Mire szolgálnak a volumes Docker Compose-ban?

**Medior:**
- Hogyan implementálnál rolling deployment-et Docker Compose-ral?
- Mikor használnál Docker Compose vs Kubernetes?
- Hogyan debug-olnál egy multi-container alkalmazást?

**Senior:**
- Hogyan terveznél Docker Compose alapú CI/CD pipeline-t?
- Milyen security best practice-eket követnél production compose setup-ban?
- Hogyan implementálnál blue-green deployment-et?

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="docker">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **Microservices** → Service-oriented architecture
- **Load balancing** → Nginx reverse proxy patterns
- **CI/CD** → Automated testing és deployment
- **Monitoring** → Prometheus, Grafana integration
- **Kubernetes** → Production orchestration upgrade path

</div>

</details>

</div>

---

### Multi-stage builds {#multi-stage-builds}

<div class="concept-section mental-model" data-filter="docker medior">

<details>
<summary>📋 <strong>Fogalom meghatározása</strong></summary>

<div>

Multi-stage Builds = Dockerfile optimization pattern multiple FROM statements-szel, külön build stages-ek (FROM...AS name syntax). Build dependencies külön stage-ben (compiler, dev tools, test frameworks), csak compiled artifacts/production dependencies final stage-be copy-olva (COPY --from=builder). Image size reduction (build tools excluded from final image), Security improvement (attack surface minimalization), Build caching per-stage level-en. Use cases: compiled languages (Java, Go, C++), Node.js (dev dependencies filtered), Python (wheel building separate).

</div>

</details>

</div>

<div class="concept-section why-important" data-filter="docker medior">

<details>
<summary>💡 <strong>Miért számít?</strong></summary>

<div>

- **Image size optimization**: 90%-kal kisebb final images (1GB → 100MB)
- **Security surface reduction**: Build tools és dependencies nincsenek production-ban
- **Build caching efficiency**: Stage-enkénti cache optimization
- **Separation of concerns**: Build és runtime environment elkülönítése

</div>

</details>

</div>

<div class="runnable-model" data-filter="docker">

<details>
<summary><strong>Runnable mental model</strong></summary>

<div>

**Node.js alkalmazás optimalizált multi-stage build:**
```dockerfile
# ==========================================
# Stage 1: Dependencies and Build Tools
# ==========================================
FROM node:18-bullseye AS dependencies

# Install system dependencies for native modules
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY yarn.lock* ./

# Install ALL dependencies (including devDependencies)
RUN npm ci --include=dev && npm cache clean --force

# ==========================================
# Stage 2: Application Builder
# ==========================================
FROM node:18-bullseye AS builder

WORKDIR /app

# Copy dependencies from previous stage
COPY --from=dependencies /app/node_modules ./node_modules
COPY package*.json ./

# Copy source code
COPY src ./src
COPY public ./public
COPY tsconfig.json ./
COPY webpack.config.js ./

# Build application
RUN npm run build

# Run tests
RUN npm run test:unit

# Install production dependencies only
RUN npm ci --omit=dev && npm cache clean --force

# ==========================================
# Stage 3: Security Scanner
# ==========================================
FROM builder AS security

# Install security scanning tools
RUN npm install -g audit-ci retire

# Run security scans
RUN npm audit --audit-level=high
RUN retire --path .

# ==========================================
# Stage 4: Production Runtime
# ==========================================
FROM node:18-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodeuser -u 1001

WORKDIR /app

# Copy production dependencies
COPY --from=builder --chown=nodeuser:nodejs /app/node_modules ./node_modules

# Copy built application
COPY --from=builder --chown=nodeuser:nodejs /app/dist ./dist
COPY --from=builder --chown=nodeuser:nodejs /app/package.json ./

# Copy static assets if any
COPY --from=builder --chown=nodeuser:nodejs /app/public ./public

# Security: Switch to non-root user
USER nodeuser

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

EXPOSE 3000

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/index.js"]
```

**Java Spring Boot optimalizált build:**
```dockerfile
# ==========================================
# Stage 1: Build Environment
# ==========================================
FROM eclipse-temurin:17-jdk AS builder

WORKDIR /app

# Copy Maven/Gradle files for dependency caching
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .

# Download dependencies (cached layer)
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src ./src

# Build application
RUN ./mvnw clean package -DskipTests -B

# ==========================================
# Stage 2: Test Runner
# ==========================================
FROM builder AS tester

# Run all tests
RUN ./mvnw test -B

# Generate test reports
RUN ./mvnw jacoco:report -B

# ==========================================
# Stage 3: JAR Layer Extraction
# ==========================================
FROM eclipse-temurin:17-jdk AS layers

WORKDIR /app

# Copy built JAR
COPY --from=builder /app/target/*.jar app.jar

# Extract JAR layers for better caching
RUN java -Djarmode=layertools -jar app.jar extract

# ==========================================
# Stage 4: Production Runtime
# ==========================================
FROM eclipse-temurin:17-jre-alpine AS production

# Install curl for health checks
RUN apk add --no-cache curl

# Create non-root user
RUN addgroup -S spring && adduser -S spring -G spring

WORKDIR /app

# Copy JAR layers (better caching)
COPY --from=layers --chown=spring:spring /app/dependencies/ ./
COPY --from=layers --chown=spring:spring /app/spring-boot-loader/ ./
COPY --from=layers --chown=spring:spring /app/snapshot-dependencies/ ./
COPY --from=layers --chown=spring:spring /app/application/ ./

# Switch to non-root user
USER spring:spring

# JVM optimization for containers
ENV JAVA_OPTS="-XX:+UseContainerSupport \
               -XX:MaxRAMPercentage=75.0 \
               -XX:+UseG1GC \
               -XX:+UseStringDeduplication"

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health/liveness || exit 1

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS org.springframework.boot.loader.JarLauncher"]
```

**Frontend React aplikáció multi-stage:**
```dockerfile
# ==========================================
# Stage 1: Build Environment
# ==========================================
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --include=dev

# Copy source code
COPY src ./src
COPY public ./public
COPY tsconfig.json ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

# Build for production
RUN npm run build

# ==========================================
# Stage 2: Test and Lint
# ==========================================
FROM builder AS tester

# Run linting
RUN npm run lint

# Run tests
RUN npm run test:ci

# Run e2e tests if available
# RUN npm run test:e2e

# ==========================================
# Stage 3: Production Server
# ==========================================
FROM nginx:alpine AS production

# Copy built files
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:80 || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**Build optimization parancsok:**
```bash
# Build specific stage
docker build --target builder -t myapp:build .

# Build with BuildKit for better caching
DOCKER_BUILDKIT=1 docker build \
  --cache-from myapp:cache \
  --cache-to type=registry,ref=myapp:cache \
  -t myapp:latest .

# Multi-platform build
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  --target production \
  -t myapp:latest .

# Image size comparison
docker images myapp

# Layer analysis
docker history myapp:latest
```

</div>

</details>

</div>

<div class="concept-section myths" data-filter="docker">

<details>
<summary>🧯 <strong>Gyakori tévhitek</strong></summary>

<div>

**"Multi-stage builds lassabbak"**
- Valóság: BuildKit cache-eléssel gyakran gyorsabbak
- Parallel stage execution optimalizálja a build időt

**"Minden stage-et újra kell építeni"**
- Valóság: Docker layer caching működik stage-ek között is
- Csak a változott stage-ek rebuildelődnek

**"Production stage-ben is kellenek dev tools"**
- Valóság: Runtime-hoz csak minimális dependencies kellenek
- Build tools security risk production környezetben

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="docker">

<details>
<summary>📚 <strong>Mikro-tanulás összefoglaló</strong></summary>

<div>

- **Multi-stage = Build optimization** különböző base image-ekkel és célokkal
- **FROM ... AS name**: Named stage definition
- **COPY --from=stage**: Artifacts másolása stage-ek között
- **Target-specific builds**: `--target` paraméterrel specifikus stage build
- **Layer caching**: Stage-enkénti optimalizálás
- **Security**: Build tools és dependencies nem kerülnek production-ba
- **Size reduction**: 70-90%-os image size csökkentés lehetséges

</div>

</details>

</div>

<div class="concept-section interview" data-filter="docker medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Junior:**
- Mi a különbség egy hagyományos és multi-stage Dockerfile között?
- Hogyan másolsz fájlokat egyik stage-ből a másikba?
- Mire jó a `--target` paraméter?

**Medior:**
- Hogyan optimalizálnád egy Node.js alkalmazás build idejét?
- Milyen security előnyei vannak a multi-stage builds-nek?
- Hogyan implementálnál parallel stage execution-t?

**Senior:**
- Hogyan terveznél CI/CD pipeline-t multi-stage builds-ekkel?
- Milyen caching stratégiát használnál large monorepo-hoz?
- Hogyan debug-olnál build performance problémákat?

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="docker">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **CI/CD optimization** → Build time és cache efficiency
- **Security** → Attack surface reduction
- **Performance** → Runtime optimization
- **Container registries** → Layer caching strategies
- **Kubernetes** → Pod startup time optimization

</div>

</details>

</div>

---

### Docker Healthchecks {#docker-healthchecks}

<div class="concept-section mental-model" data-filter="docker medior">

<details>
<summary>📋 <strong>Fogalom meghatározása</strong></summary>

<div>

Docker Healthcheck = HEALTHCHECK instruction Dockerfile-ban vagy --health-cmd flag-gel container "egészségének" monitorozására. Exit code 0 = healthy, 1 = unhealthy. Parameters: --interval (check frequency), --timeout (command timeout), --start-period (initialization time), --retries (consecutive failures threshold). Health states: starting → healthy/unhealthy. Orchestrator reakció: Kubernetes Pod restart, Docker Swarm traffic rerouting, Load balancer endpoint removal. HTTP endpoint check (/health), database connection test, dependency service availability.

</div>

</details>

</div>

<div class="concept-section why-important" data-filter="docker medior">

<details>
<summary>💡 <strong>Miért számít?</strong></summary>

<div>

- **Automatic recovery**: Unhealthy container-ek automatikus restart-ja
- **Load balancer integration**: Traffic routing healthy instances-ra
- **Early problem detection**: Performance degradation korai észlelése
- **Zero-downtime deployments**: Graceful container replacement

</div>

</details>

</div>

<div class="runnable-model" data-filter="docker">

<details>
<summary><strong>Runnable mental model</strong></summary>

<div>

**Comprehensive healthcheck implementáció:**
```dockerfile
# Node.js alkalmazás health check
FROM node:18-alpine

WORKDIR /app

# Install curl for health checks
RUN apk add --no-cache curl

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

# Multi-level health check
HEALTHCHECK --interval=30s \
            --timeout=10s \
            --start-period=60s \
            --retries=3 \
            CMD curl -f http://localhost:3000/health/detailed || exit 1

EXPOSE 3000
CMD ["node", "index.js"]
```

**Fejlett health endpoint Node.js-ben:**
```javascript
const express = require('express');
const app = express();

// Detailed health check endpoint
app.get('/health/detailed', async (req, res) => {
    const checks = {
        timestamp: new Date().toISOString(),
        status: 'healthy',
        checks: {}
    };
    
    try {
        // Database connectivity check
        const dbStart = Date.now();
        await db.raw('SELECT 1');
        checks.checks.database = {
            status: 'healthy',
            responseTime: `${Date.now() - dbStart}ms`
        };
        
        // Redis connectivity check
        const redisStart = Date.now();
        await redis.ping();
        checks.checks.redis = {
            status: 'healthy',
            responseTime: `${Date.now() - redisStart}ms`
        };
        
        // External API health
        const apiStart = Date.now();
        const apiResponse = await fetch('https://api.external.com/health', {
            timeout: 5000
        });
        checks.checks.externalAPI = {
            status: apiResponse.ok ? 'healthy' : 'unhealthy',
            responseTime: `${Date.now() - apiStart}ms`,
            statusCode: apiResponse.status
        };
        
        // Memory usage check
        const memUsage = process.memoryUsage();
        const memUsageMB = Math.round(memUsage.heapUsed / 1024 / 1024);
        checks.checks.memory = {
            status: memUsageMB < 500 ? 'healthy' : 'warning',
            heapUsed: `${memUsageMB}MB`,
            heapTotal: `${Math.round(memUsage.heapTotal / 1024 / 1024)}MB`
        };
        
        // Check if any component is unhealthy
        const hasUnhealthy = Object.values(checks.checks)
            .some(check => check.status === 'unhealthy');
            
        if (hasUnhealthy) {
            checks.status = 'unhealthy';
            return res.status(503).json(checks);
        }
        
        res.status(200).json(checks);
        
    } catch (error) {
        checks.status = 'unhealthy';
        checks.error = error.message;
        res.status(503).json(checks);
    }
});

// Simple liveness probe
app.get('/health/live', (req, res) => {
    res.status(200).json({ status: 'alive' });
});

// Readiness probe
app.get('/health/ready', async (req, res) => {
    try {
        // Check if app is ready to serve traffic
        await db.raw('SELECT 1');
        res.status(200).json({ status: 'ready' });
    } catch (error) {
        res.status(503).json({ status: 'not ready', error: error.message });
    }
});
```

**Spring Boot Actuator health check:**
```java
@Component
public class CustomHealthIndicator implements HealthIndicator {
    
    @Autowired
    private DatabaseService databaseService;
    
    @Autowired
    private RedisTemplate<String, String> redisTemplate;
    
    @Override
    public Health health() {
        Health.Builder builder = new Health.Builder();
        
        try {
            // Database health
            long dbStart = System.currentTimeMillis();
            databaseService.checkConnection();
            long dbTime = System.currentTimeMillis() - dbStart;
            
            // Redis health
            long redisStart = System.currentTimeMillis();
            redisTemplate.opsForValue().get("health:check");
            long redisTime = System.currentTimeMillis() - redisStart;
            
            // Memory health
            Runtime runtime = Runtime.getRuntime();
            long maxMemory = runtime.maxMemory();
            long totalMemory = runtime.totalMemory();
            long freeMemory = runtime.freeMemory();
            long usedMemory = totalMemory - freeMemory;
            double memoryUsagePercent = (double) usedMemory / maxMemory * 100;
            
            if (memoryUsagePercent > 90) {
                builder.down()
                    .withDetail("memory", "High memory usage: " + String.format("%.2f%%", memoryUsagePercent));
            } else {
                builder.up()
                    .withDetail("database", Map.of(
                        "status", "UP",
                        "responseTime", dbTime + "ms"
                    ))
                    .withDetail("redis", Map.of(
                        "status", "UP",
                        "responseTime", redisTime + "ms"
                    ))
                    .withDetail("memory", Map.of(
                        "status", "UP",
                        "usage", String.format("%.2f%%", memoryUsagePercent),
                        "used", usedMemory / 1024 / 1024 + "MB",
                        "max", maxMemory / 1024 / 1024 + "MB"
                    ));
            }
            
        } catch (Exception e) {
            builder.down(e);
        }
        
        return builder.build();
    }
}
```

**Docker Compose health-dependent startup:**
```yaml
version: '3.8'

services:
  backend:
    build: .
    ports:
      - "8080:8080"
    environment:
      - DATABASE_URL=postgresql://db:5432/myapp
    depends_on:
      db:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 5
      start_period: 60s
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d myapp"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s
    volumes:
      - postgres_data:/var/lib/postgresql/data

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    depends_on:
      backend:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:80"]
      interval: 30s
      timeout: 5s
      retries: 3

volumes:
  postgres_data:
```

**Kubernetes health probes:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: app
        image: myapp:latest
        ports:
        - containerPort: 8080
        
        # Liveness probe - restart if unhealthy
        livenessProbe:
          httpGet:
            path: /health/live
            port: 8080
          initialDelaySeconds: 60
          periodSeconds: 30
          timeoutSeconds: 10
          failureThreshold: 3
        
        # Readiness probe - remove from service if not ready
        readinessProbe:
          httpGet:
            path: /health/ready
            port: 8080
          initialDelaySeconds: 10
          periodSeconds: 5
          timeoutSeconds: 5
          failureThreshold: 3
        
        # Startup probe - allow slow startup
        startupProbe:
          httpGet:
            path: /health/startup
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
          timeoutSeconds: 5
          failureThreshold: 30  # Allow 5 minutes for startup
```

**Health monitoring és alerting:**
```bash
# Health status ellenőrzés
docker inspect --format='{{.State.Health.Status}}' container_name

# Healthcheck logs
docker inspect --format='{{range .State.Health.Log}}{{.Output}}{{end}}' container_name

# Unhealthy container-ek keresése
docker ps --filter health=unhealthy

# Health metrics Prometheus-hoz
curl -s http://localhost:8080/health/detailed | jq '.'
```

</div>

</details>

</div>

<div class="concept-section myths" data-filter="docker">

<details>
<summary>🧯 <strong>Gyakori tévhitek</strong></summary>

<div>

**"Healthcheck csak HTTP endpoint"**
- Valóság: Database connections, file system, external dependencies is ellenőrizhetők
- Custom script-ek és CLI tools is használhatók

**"Liveness = Readiness probe"**
- Valóság: Különböző céljuk van
- Liveness: Container restart trigger
- Readiness: Traffic routing control

**"Healthcheck performance overhead"**
- Valóság: Lightweight checks minimal overhead-del
- Critical system stability ellenében elhanyagolható

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="docker">

<details>
<summary>📚 <strong>Mikro-tanulás összefoglaló</strong></summary>

<div>

- **Healthcheck = Container wellness monitoring** automated failure detection
- **Liveness probe**: Container restart trigger
- **Readiness probe**: Service traffic control
- **Startup probe**: Slow startup accommodation
- **Multi-layer checks**: HTTP, database, external dependencies
- **Graceful degradation**: Partial functionality maintenance
- **Orchestrator integration**: Kubernetes, Docker Swarm support

</div>

</details>

</div>

<div class="concept-section interview" data-filter="docker medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Junior:**
- Mi a különbség a liveness és readiness probe között?
- Hogyan implementálnál egy egyszerű HTTP health check-et?
- Mik a HEALTHCHECK Dockerfile paraméterei?

**Medior:**
- Hogyan terveznél multi-service dependency health checking-et?
- Milyen métrikákat értelmes ellenőrizni health check-ben?
- Hogyan debug-olnál egy failing health check-et?

**Senior:**
- Hogyan implementálnál circuit breaker pattern-t health check-ekkel?
- Milyen monitoring és alerting stratégiát használnál?
- Hogyan optimalizálnád health check performance-ot large scale-en?

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="docker">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **Kubernetes probes** → Pod lifecycle management
- **Load balancing** → Healthy endpoint routing
- **Monitoring** → Health metrics és alerting
- **Circuit breaker** → Failure isolation patterns
- **Blue-green deployment** → Zero-downtime releases

</div>

</details>

</div>

---

### Resource limits {#resource-limits}

<div class="concept-section mental-model" data-filter="docker medior">

<details>
<summary>📋 <strong>Fogalom meghatározása</strong></summary>

<div>

Resource Limits = container erőforrás-használat korlátozása host system védelme érdekében: --memory (RAM limit, OOM kill threshold), --cpus (CPU cores limit, throttling), --memory-reservation (soft limit, guaranteed minimum), --cpuset-cpus (specific CPU pinning), --pids-limit (process count limit). Kubernetes: resources.requests (guaranteed), resources.limits (maximum). Monitoring: docker stats, cAdvisor metrics. Consequence: CPU throttling (slower execution), OOM killer (container termination), I/O throttling. Prevent noisy neighbor problem.

</div>

</details>

</div>

<div class="concept-section why-important" data-filter="docker medior">

<details>
<summary>💡 <strong>Miért számít?</strong></summary>

<div>

- **Resource contention prevention**: Egy container nem fogyaszthatja el az összes erőforrást
- **Predictable performance**: Guaranteed resource allocation applikációknak
- **Cost optimization**: Efficient resource utilization cloud környezetekben
- **Stability assurance**: System crash prevention runaway processes miatt

</div>

</details>

</div>

<div class="runnable-model" data-filter="docker">

<details>
<summary><strong>Runnable mental model</strong></summary>

<div>

**Docker CLI resource limits:**
```bash
# Basic resource limits
docker run -d \
  --name myapp \
  --memory="512m" \
  --cpus="0.5" \
  --memory-swap="1g" \
  myapp:latest

# Detailed resource configuration
docker run -d \
  --name production-app \
  --memory="2g" \
  --memory-reservation="1g" \
  --cpus="1.5" \
  --cpu-shares=1024 \
  --blkio-weight=500 \
  --device-read-bps /dev/sda:1mb \
  --device-write-bps /dev/sda:1mb \
  --ulimit nofile=65536:65536 \
  --ulimit nproc=4096:4096 \
  myapp:production

# Memory limits with swap control
docker run -d \
  --memory="1g" \
  --memory-swap="2g" \
  --oom-kill-disable=false \
  --memory-swappiness=10 \
  myapp:latest

# CPU limits detailed
docker run -d \
  --cpuset-cpus="0,1,2" \
  --cpu-period=100000 \
  --cpu-quota=50000 \
  --cpu-shares=512 \
  myapp:latest
```

**Docker Compose resource limits:**
```yaml
version: '3.8'

services:
  backend:
    image: myapp:latest
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
      restart_policy:
        condition: on-failure
        max_attempts: 3
    environment:
      - NODE_ENV=production
      - JAVA_OPTS=-Xms256m -Xmx768m -XX:MaxMetaspaceSize=128m

  database:
    image: postgres:15-alpine
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
    environment:
      - POSTGRES_SHARED_BUFFERS=128MB
      - POSTGRES_EFFECTIVE_CACHE_SIZE=256MB
    volumes:
      - db_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    deploy:
      resources:
        limits:
          cpus: '0.25'
          memory: 256M
        reservations:
          cpus: '0.1'
          memory: 64M
    command: redis-server --maxmemory 200mb --maxmemory-policy allkeys-lru

  nginx:
    image: nginx:alpine
    deploy:
      resources:
        limits:
          cpus: '0.25'
          memory: 128M
        reservations:
          cpus: '0.1'
          memory: 32M
    ports:
      - "80:80"
      - "443:443"

volumes:
  db_data:
```

**Kubernetes resource management:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: app
        image: myapp:latest
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        env:
        - name: JAVA_OPTS
          value: "-Xms128m -Xmx384m -XX:MaxMetaspaceSize=64m"
        
        # Security context
        securityContext:
          allowPrivilegeEscalation: false
          runAsNonRoot: true
          runAsUser: 1000
          capabilities:
            drop:
            - ALL
        
        # Volume mounts with size limits
        volumeMounts:
        - name: tmp
          mountPath: /tmp
        - name: logs
          mountPath: /app/logs
      
      volumes:
      - name: tmp
        emptyDir:
          sizeLimit: "1Gi"
      - name: logs
        emptyDir:
          sizeLimit: "500Mi"
      
      # Pod-level security
      securityContext:
        fsGroup: 1000
        runAsNonRoot: true
        seccompProfile:
          type: RuntimeDefault
```

**JVM container optimization:**
```dockerfile
FROM eclipse-temurin:17-jre-alpine

# Container-aware JVM flags
ENV JAVA_OPTS="-XX:+UseContainerSupport \
               -XX:MaxRAMPercentage=75.0 \
               -XX:InitialRAMPercentage=50.0 \
               -XX:+UseG1GC \
               -XX:MaxGCPauseMillis=200 \
               -XX:+UnlockExperimentalVMOptions \
               -XX:+UseCGroupMemoryLimitForHeap \
               -Djava.security.egd=file:/dev/./urandom"

WORKDIR /app
COPY target/*.jar app.jar

# Non-root user
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

EXPOSE 8080
CMD ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
```

**Node.js memory optimization:**
```dockerfile
FROM node:18-alpine

# Node.js memory limits
ENV NODE_OPTIONS="--max-old-space-size=384 --max-semi-space-size=64"

WORKDIR /app

# Efficient dependency installation
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts && \
    npm cache clean --force

COPY . .

# Non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001
USER nodeuser

EXPOSE 3000
CMD ["node", "index.js"]
```

**Resource monitoring és tuning:**
```bash
# Container resource usage monitoring
docker stats --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}\t{{.NetIO}}\t{{.BlockIO}}"

# Detailed container inspection
docker inspect container_name | jq '.HostConfig | {Memory, CpuShares, CpuQuota, CpuPeriod}'

# Kubernetes resource usage
kubectl top pods
kubectl top nodes

# Resource requests vs limits analysis
kubectl describe pod pod_name | grep -A 5 "Requests:\|Limits:"

# cgroup limits ellenőrzése container-ben
docker exec container_name cat /sys/fs/cgroup/memory/memory.limit_in_bytes
docker exec container_name cat /sys/fs/cgroup/cpu/cpu.cfs_quota_us

# Memory pressure monitoring
docker exec container_name cat /proc/meminfo
docker exec container_name free -h

# JVM memory analysis
docker exec container_name jstat -gc 1
docker exec container_name jmap -histo 1
```

**Performance tuning best practices:**
```yaml
# PostgreSQL optimized resource config
services:
  postgres:
    image: postgres:15-alpine
    deploy:
      resources:
        limits:
          cpus: '2.0'
          memory: 2G
        reservations:
          cpus: '1.0'
          memory: 1G
    environment:
      # Memory-based PostgreSQL tuning
      - POSTGRES_SHARED_BUFFERS=512MB      # 25% of RAM
      - POSTGRES_EFFECTIVE_CACHE_SIZE=1536MB # 75% of RAM
      - POSTGRES_WORK_MEM=16MB
      - POSTGRES_MAINTENANCE_WORK_MEM=256MB
      - POSTGRES_CHECKPOINT_COMPLETION_TARGET=0.9
      - POSTGRES_WAL_BUFFERS=16MB
    
  redis:
    image: redis:7-alpine
    deploy:
      resources:
        limits:
          memory: 512M
    command: >
      redis-server
      --maxmemory 400mb
      --maxmemory-policy allkeys-lru
      --save 900 1
      --save 300 10
      --save 60 10000
```

</div>

</details>

</div>

<div class="concept-section myths" data-filter="docker">

<details>
<summary>🧯 <strong>Gyakori tévhitek</strong></summary>

<div>

**"Több CPU = jobb performance"**
- Valóság: Single-threaded applikációk nem használják ki a több CPU-t
- Értelmes CPU limit beállítás az alkalmazás architektúrája alapján

**"Unlimited resources = better"**
- Valóság: Resource limits védik a rendszert runaway processes-től
- Predictable performance jobb, mint unlimited chaos

**"Memory limit = allocated memory"**
- Valóság: Memory limit maximum threshold, nem reservation
- Request vs Limit különbség értése kulcsfontosságú

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="docker">

<details>
<summary>📚 <strong>Mikro-tanulás összefoglaló</strong></summary>

<div>

- **Resource limits = Container constraints** CPU, memory, I/O boundaries
- **Request vs Limit**: Guaranteed minimum vs maximum threshold
- **Memory limits**: OOM killer protection és stable performance
- **CPU limits**: Processing power allocation és throttling
- **JVM container support**: Automatic heap sizing based on limits
- **Monitoring essential**: Resource usage tracking és optimization
- **Performance tuning**: Application-specific resource configuration

</div>

</details>

</div>

<div class="concept-section interview" data-filter="docker medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Junior:**
- Mi a különbség a memory és memory-swap limit között?
- Hogyan állítanál be CPU limit Docker container-nek?
- Mi történik, ha egy container túllépi a memory limit-et?

**Medior:**
- Hogyan optimalizálnád egy Java alkalmazás memory settings-eit container-ben?
- Milyen métrikákat figyelnél resource utilization monitoring-hoz?
- Hogyan debug-olnál egy OOM killed container-t?

**Senior:**
- Hogyan terveznél resource quota stratégiát multi-tenant environment-ben?
- Milyen auto-scaling stratégiát implementálnál resource metrics alapján?
- Hogyan optimalizálnád cluster resource utilization-t?

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="docker">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **Kubernetes HPA** → Horizontal Pod Autoscaling
- **Performance monitoring** → Resource metrics és alerting
- **Cost optimization** → Cloud resource efficiency
- **QoS classes** → Kubernetes service quality
- **Node affinity** → Resource-based scheduling

</div>

</details>

</div>

---

### Docker Registry {#docker-registry}

<div class="concept-section mental-model" data-filter="docker medior">

<details>
<summary>🧭 <strong>Így gondolj rá</strong></summary>

<div>

**Docker Registry** = **Könyvtár rendszer** Docker image-ek számára

**Registry types:**
- **Public Registry (Docker Hub)** = **Nyilvános könyvtár** - mindenki hozzáfér
- **Private Registry** = **Céges könyvtár** - restricted access
- **Self-hosted Registry** = **Saját könyvtár** - full control

**Registry components:**
- **Repository** = **Könyv sorozat** (pl. myapp, nginx)
- **Tag** = **Könyv verzió** (latest, v1.2.3, production)
- **Manifest** = **Tartalomjegyzék** - image layers és metadata
- **Layer** = **Fejezetek** - reusable image components

**Access control:**
- **Public repos** = Free reading for everyone
- **Private repos** = Authentication és authorization
- **Team permissions** = Role-based access control
- **Webhook integrations** = Automated triggers

</div>

</details>

</div>

<div class="concept-section why-important" data-filter="docker medior">

<details>
<summary>💡 <strong>Miért számít?</strong></summary>

<div>

- **Centralized image storage**: Egy helyen tárolt és verziózott images
- **Team collaboration**: Shared images közös fejlesztéshez
- **CI/CD integration**: Automated build és deployment pipeline
- **Security és compliance**: Private repositories és access control

</div>

</details>

</div>

<div class="runnable-model" data-filter="docker">

<details>
<summary><strong>Runnable mental model</strong></summary>

<div>

**Docker Hub workflow:**
```bash
# Docker Hub login
docker login

# Image tagging for registry
docker tag myapp:latest username/myapp:v1.2.3
docker tag myapp:latest username/myapp:latest

# Push to Docker Hub
docker push username/myapp:v1.2.3
docker push username/myapp:latest

# Pull from Docker Hub
docker pull username/myapp:v1.2.3

# Search public images
docker search nginx

# Image information
docker manifest inspect username/myapp:latest
```

**Private registry setup (Docker Registry v2):**
```yaml
# docker-compose.yml for private registry
version: '3.8'

services:
  registry:
    image: registry:2
    ports:
      - "5000:5000"
    environment:
      REGISTRY_STORAGE_FILESYSTEM_ROOTDIRECTORY: /data
      REGISTRY_AUTH: htpasswd
      REGISTRY_AUTH_HTPASSWD_REALM: Registry Realm
      REGISTRY_AUTH_HTPASSWD_PATH: /auth/htpasswd
      REGISTRY_HTTP_TLS_CERTIFICATE: /certs/registry.crt
      REGISTRY_HTTP_TLS_KEY: /certs/registry.key
    volumes:
      - registry-data:/data
      - ./auth:/auth:ro
      - ./certs:/certs:ro
    restart: unless-stopped

  registry-ui:
    image: joxit/docker-registry-ui:latest
    ports:
      - "8080:80"
    environment:
      REGISTRY_TITLE: Private Docker Registry
      REGISTRY_URL: https://registry:5000
      DELETE_IMAGES: true
      SHOW_CONTENT_DIGEST: true
    depends_on:
      - registry

volumes:
  registry-data:
```

**Security setup for private registry:**
```bash
# Generate TLS certificates
mkdir -p certs
openssl req -newkey rsa:4096 -nodes -sha256 \
  -keyout certs/registry.key \
  -x509 -days 365 \
  -out certs/registry.crt \
  -subj "/CN=registry.company.com"

# Create htpasswd authentication
mkdir -p auth
docker run --rm --entrypoint htpasswd \
  httpd:2 -Bbn admin secretpassword > auth/htpasswd

# Add multiple users
docker run --rm --entrypoint htpasswd \
  httpd:2 -Bbn developer devpass >> auth/htpasswd
```

**AWS ECR (Elastic Container Registry) workflow:**
```bash
# ECR authentication
aws ecr get-login-password --region us-west-2 | \
  docker login --username AWS --password-stdin \
  123456789012.dkr.ecr.us-west-2.amazonaws.com

# Create repository
aws ecr create-repository --repository-name myapp --region us-west-2

# Tag and push to ECR
docker tag myapp:latest 123456789012.dkr.ecr.us-west-2.amazonaws.com/myapp:latest
docker push 123456789012.dkr.ecr.us-west-2.amazonaws.com/myapp:latest

# ECR lifecycle policy
cat > lifecycle-policy.json << 'EOF'
{
  "rules": [
    {
      "rulePriority": 1,
      "selection": {
        "tagStatus": "untagged",
        "countType": "sinceImagePushed",
        "countUnit": "days",
        "countNumber": 7
      },
      "action": {
        "type": "expire"
      }
    },
    {
      "rulePriority": 2,
      "selection": {
        "tagStatus": "tagged",
        "tagPrefixList": ["v"],
        "countType": "imageCountMoreThan",
        "countNumber": 10
      },
      "action": {
        "type": "expire"
      }
    }
  ]
}
EOF

aws ecr put-lifecycle-policy \
  --repository-name myapp \
  --lifecycle-policy-text file://lifecycle-policy.json
```

**GitLab Container Registry:**
```yaml
# .gitlab-ci.yml
stages:
  - build
  - test
  - push

variables:
  DOCKER_DRIVER: overlay2
  DOCKER_TLS_CERTDIR: "/certs"
  IMAGE_TAG: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
  LATEST_TAG: $CI_REGISTRY_IMAGE:latest

services:
  - docker:20.10.16-dind

before_script:
  - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY

build:
  stage: build
  image: docker:20.10.16
  script:
    - docker build -t $IMAGE_TAG -t $LATEST_TAG .
    - docker push $IMAGE_TAG
    - docker push $LATEST_TAG
  only:
    - main
    - develop

# Security scanning
security_scan:
  stage: test
  image: docker:20.10.16
  script:
    - docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
        aquasec/trivy:latest image $IMAGE_TAG
  dependencies:
    - build
```

**GitHub Container Registry (GHCR):**
```yaml
# .github/workflows/docker.yml
name: Docker Build and Push

on:
  push:
    branches: [main, develop]
    tags: ['v*']

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
    
    - name: Setup Docker Buildx
      uses: docker/setup-buildx-action@v3
    
    - name: Login to Container Registry
      uses: docker/login-action@v3
      with:
        registry: ${{ env.REGISTRY }}
        username: ${{ github.actor }}
        password: ${{ secrets.GITHUB_TOKEN }}
    
    - name: Extract metadata
      id: meta
      uses: docker/metadata-action@v5
      with:
        images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
        tags: |
          type=ref,event=branch
          type=ref,event=pr
          type=semver,pattern={{version}}
          type=semver,pattern={{major}}.{{minor}}
          type=sha,prefix=sha-
    
    - name: Build and push
      uses: docker/build-push-action@v5
      with:
        context: .
        platforms: linux/amd64,linux/arm64
        push: true
        tags: ${{ steps.meta.outputs.tags }}
        labels: ${{ steps.meta.outputs.labels }}
        cache-from: type=gha
        cache-to: type=gha,mode=max
```

**Registry management scripts:**
```bash
#!/bin/bash
# registry-cleanup.sh

REGISTRY_URL="localhost:5000"
IMAGE_NAME="myapp"

# List all tags
echo "Available tags for $IMAGE_NAME:"
curl -s "http://$REGISTRY_URL/v2/$IMAGE_NAME/tags/list" | jq -r '.tags[]'

# Delete specific tag
delete_tag() {
    local tag=$1
    local digest=$(curl -s -H "Accept: application/vnd.docker.distribution.manifest.v2+json" \
        "http://$REGISTRY_URL/v2/$IMAGE_NAME/manifests/$tag" | \
        jq -r '.config.digest')
    
    if [ "$digest" != "null" ]; then
        curl -X DELETE "http://$REGISTRY_URL/v2/$IMAGE_NAME/manifests/$digest"
        echo "Deleted tag: $tag (digest: $digest)"
    fi
}

# Cleanup old tags (keep last 5)
old_tags=$(curl -s "http://$REGISTRY_URL/v2/$IMAGE_NAME/tags/list" | \
    jq -r '.tags[]' | sort -V | head -n -5)

for tag in $old_tags; do
    delete_tag "$tag"
done

# Garbage collection
docker exec registry_container registry garbage-collect /etc/docker/registry/config.yml
```

**Multi-registry synchronization:**
```bash
#!/bin/bash
# registry-sync.sh

SOURCE_REGISTRY="source.registry.com"
TARGET_REGISTRY="target.registry.com"
IMAGE_NAME="myapp"

# Get all tags from source
source_tags=$(curl -s "https://$SOURCE_REGISTRY/v2/$IMAGE_NAME/tags/list" | jq -r '.tags[]')

for tag in $source_tags; do
    echo "Syncing $IMAGE_NAME:$tag"
    
    # Pull from source
    docker pull "$SOURCE_REGISTRY/$IMAGE_NAME:$tag"
    
    # Tag for target
    docker tag "$SOURCE_REGISTRY/$IMAGE_NAME:$tag" "$TARGET_REGISTRY/$IMAGE_NAME:$tag"
    
    # Push to target
    docker push "$TARGET_REGISTRY/$IMAGE_NAME:$tag"
    
    # Cleanup local images
    docker rmi "$SOURCE_REGISTRY/$IMAGE_NAME:$tag" "$TARGET_REGISTRY/$IMAGE_NAME:$tag"
done
```

</div>

</details>

</div>

<div class="concept-section myths" data-filter="docker">

<details>
<summary>🧯 <strong>Gyakori tévhitek</strong></summary>

<div>

**"Docker Hub ingyenes mindenhez"**
- Valóság: Private repositories limitált free tier-ben
- Enterprise feature-ök és unlimited private repos fizetett plans-ben

**"Latest tag mindig a legfrissebb"**
- Valóség: Latest tag manual update-et igényel
- Semantic versioning (v1.2.3) jobb practice production-hoz

**"Registry security automatikus"**
- Valóség: Authentication, TLS, vulnerability scanning manuális setup
- Security scanning és access control explicit konfiguráció

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="docker">

<details>
<summary>📚 <strong>Mikro-tanulás összefoglaló</strong></summary>

<div>

- **Registry = Image storage** centralized, versioned, accessible
- **Public vs Private**: Open vs restricted access és security
- **Tags**: Semantic versioning és deployment strategy
- **CI/CD integration**: Automated build, test, push workflow
- **Security**: Authentication, TLS, vulnerability scanning
- **Lifecycle management**: Tag cleanup és storage optimization
- **Multi-cloud**: Registry synchronization és migration

</div>

</details>

</div>

<div class="concept-section interview" data-filter="docker medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Junior:**
- Mi a különbség a Docker Hub és egy private registry között?
- Hogyan push-olnál egy image-et Docker Hub-ra?
- Mire jó az image tagging?

**Medior:**
- Hogyan állítanál fel egy secure private registry-t?
- Milyen lifecycle policy-t használnál registry cleanup-hoz?
- Hogyan integrálnád a registry-t CI/CD pipeline-ba?

**Senior:**
- Hogyan terveznél multi-region registry replication-t?
- Milyen security és compliance stratégiát implementálnál?
- Hogyan optimalizálnád registry performance-ot és cost-ot?

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="docker">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **CI/CD pipelines** → Automated image builds és deployments
- **Security scanning** → Vulnerability assessment és compliance
- **Kubernetes** → Image pull policies és secrets
- **GitOps** → Image-based deployment workflows
- **Artifact management** → Binary és dependency storage

</div>

</details>

</div>

---

### CI/CD integration {#ci-cd-integration}

<div class="concept-section mental-model" data-filter="docker senior">

<details>
<summary>🧭 <strong>Így gondolj rá</strong></summary>

<div>

**CI/CD + Docker** = **Automatizált gyár** kódból production-ready container-ek előállítására

**Pipeline stages:**
- **Source stage** = **Nyersanyag bekérés** (git checkout)
- **Build stage** = **Gyártás** (docker build)
- **Test stage** = **Minőségellekőrzés** (unit tests, integration tests)
- **Security stage** = **Biztonsági audit** (vulnerability scanning)
- **Package stage** = **Csomagolás** (docker push to registry)
- **Deploy stage** = **Szállítás** (container deployment)

**Quality gates:**
- **Code quality** = Syntax és style checks
- **Test coverage** = Minimum test threshold
- **Security scan** = No critical vulnerabilities
- **Performance** = Load test requirements

</div>

</details>

</div>

<div class="concept-section why-important" data-filter="docker senior">

<details>
<summary>💡 <strong>Miért számít?</strong></summary>

<div>

- **Automated quality assurance**: Minden build automatikusan tesztelve és scan-elve
- **Consistent deployments**: Identical containers minden environment-ben
- **Fast feedback loop**: Gyors error detection és resolution
- **Zero-downtime deployments**: Rolling updates és blue-green strategies

</div>

</details>

</div>

<div class="runnable-model" data-filter="docker">

<details>
<summary><strong>Runnable mental model</strong></summary>

<div>

**GitHub Actions comprehensive Docker pipeline:**
```yaml
name: Docker CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}
  DOCKER_BUILDKIT: 1

jobs:
  # Stage 1: Code Quality
  quality:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Lint code
      run: npm run lint
    
    - name: Type check
      run: npm run type-check
    
    - name: Unit tests
      run: npm run test:unit -- --coverage
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info

  # Stage 2: Build & Test Docker Image
  build:
    needs: quality
    runs-on: ubuntu-latest
    outputs:
      image-digest: ${{ steps.build.outputs.digest }}
      image-tag: ${{ steps.meta.outputs.tags }}
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Docker Buildx
      uses: docker/setup-buildx-action@v3
    
    - name: Login to Container Registry
      uses: docker/login-action@v3
      with:
        registry: ${{ env.REGISTRY }}
        username: ${{ github.actor }}
        password: ${{ secrets.GITHUB_TOKEN }}
    
    - name: Extract metadata
      id: meta
      uses: docker/metadata-action@v5
      with:
        images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
        tags: |
          type=ref,event=branch
          type=ref,event=pr
          type=sha,prefix={{branch}}-
          type=raw,value=latest,enable={{is_default_branch}}
    
    - name: Build and push
      id: build
      uses: docker/build-push-action@v5
      with:
        context: .
        platforms: linux/amd64,linux/arm64
        push: true
        tags: ${{ steps.meta.outputs.tags }}
        labels: ${{ steps.meta.outputs.labels }}
        cache-from: type=gha
        cache-to: type=gha,mode=max
        target: production

  # Stage 3: Security Scanning
  security:
    needs: build
    runs-on: ubuntu-latest
    steps:
    - name: Run Trivy vulnerability scanner
      uses: aquasecurity/trivy-action@master
      with:
        image-ref: ${{ needs.build.outputs.image-tag }}
        format: 'sarif'
        output: 'trivy-results.sarif'
    
    - name: Upload Trivy scan results
      uses: github/codeql-action/upload-sarif@v2
      with:
        sarif_file: 'trivy-results.sarif'
    
    - name: Container structure test
      run: |
        curl -LO https://storage.googleapis.com/container-structure-test/latest/container-structure-test-linux-amd64
        chmod +x container-structure-test-linux-amd64
        ./container-structure-test-linux-amd64 test \
          --image ${{ needs.build.outputs.image-tag }} \
          --config container-structure-test.yaml

  # Stage 4: Integration Tests
  integration:
    needs: [build, security]
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: testdb
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Run integration tests
      run: |
        docker run --rm \
          --network host \
          -e DATABASE_URL=postgresql://postgres:postgres@localhost:5432/testdb \
          -e NODE_ENV=test \
          ${{ needs.build.outputs.image-tag }} \
          npm run test:integration

  # Stage 5: Deploy to Staging
  deploy-staging:
    needs: [build, security, integration]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'
    environment:
      name: staging
      url: https://staging.myapp.com
    steps:
    - name: Deploy to staging
      run: |
        # Update Kubernetes deployment
        kubectl set image deployment/myapp-staging \
          myapp=${{ needs.build.outputs.image-tag }} \
          --namespace=staging
        
        # Wait for rollout
        kubectl rollout status deployment/myapp-staging --namespace=staging
    
    - name: Run smoke tests
      run: |
        # Wait for service to be ready
        sleep 30
        
        # Health check
        curl -f https://staging.myapp.com/health
        
        # Basic functionality test
        npm run test:e2e -- --base-url=https://staging.myapp.com

  # Stage 6: Deploy to Production
  deploy-production:
    needs: [build, security, integration]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment:
      name: production
      url: https://myapp.com
    steps:
    - name: Blue-Green Deployment
      run: |
        # Deploy to green environment
        kubectl apply -f k8s/green-deployment.yaml
        kubectl set image deployment/myapp-green \
          myapp=${{ needs.build.outputs.image-tag }} \
          --namespace=production
        
        # Wait for green deployment
        kubectl rollout status deployment/myapp-green --namespace=production
        
        # Health check green environment
        kubectl exec -n production deployment/myapp-green -- \
          curl -f http://localhost:8080/health
        
        # Switch traffic to green
        kubectl patch service myapp -n production \
          -p '{"spec":{"selector":{"version":"green"}}}'
        
        # Scale down blue deployment
        kubectl scale deployment myapp-blue --replicas=0 -n production
        
        # Rename deployments for next cycle
        kubectl patch deployment myapp-green -n production \
          -p '{"metadata":{"labels":{"version":"blue"}}}'
    
    - name: Post-deployment verification
      run: |
        # Wait for traffic switch
        sleep 60
        
        # Production health check
        curl -f https://myapp.com/health
        
        # Performance baseline test
        npm run test:performance -- --url=https://myapp.com
        
        # Business metrics validation
        npm run validate:metrics
```

**GitLab CI/CD Docker pipeline:**
```yaml
stages:
  - lint
  - test
  - build
  - security
  - deploy-staging
  - deploy-production

variables:
  DOCKER_DRIVER: overlay2
  DOCKER_TLS_CERTDIR: "/certs"
  IMAGE_NAME: $CI_REGISTRY_IMAGE
  IMAGE_TAG: $IMAGE_NAME:$CI_COMMIT_SHA

lint:
  stage: lint
  image: node:18-alpine
  script:
    - npm ci
    - npm run lint
    - npm run type-check
  cache:
    paths:
      - node_modules/

test:
  stage: test
  image: node:18-alpine
  services:
    - postgres:15-alpine
  variables:
    POSTGRES_DB: testdb
    POSTGRES_USER: postgres
    POSTGRES_PASSWORD: postgres
  script:
    - npm ci
    - npm run test:unit -- --coverage
    - npm run test:integration
  coverage: '/Coverage: \d+\.\d+%/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml

build:
  stage: build
  image: docker:20.10.16
  services:
    - docker:20.10.16-dind
  before_script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
  script:
    - docker build --target production -t $IMAGE_TAG .
    - docker push $IMAGE_TAG
    - docker tag $IMAGE_TAG $IMAGE_NAME:latest
    - docker push $IMAGE_NAME:latest
  only:
    - main
    - develop

security-scan:
  stage: security
  image: docker:20.10.16
  services:
    - docker:20.10.16-dind
  script:
    # Trivy vulnerability scan
    - docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
        aquasec/trivy:latest image --exit-code 1 --severity HIGH,CRITICAL $IMAGE_TAG
    
    # Container structure test
    - wget -O container-structure-test https://storage.googleapis.com/container-structure-test/latest/container-structure-test-linux-amd64
    - chmod +x container-structure-test
    - ./container-structure-test test --image $IMAGE_TAG --config structure-test.yaml
  dependencies:
    - build

deploy-staging:
  stage: deploy-staging
  image: bitnami/kubectl:latest
  script:
    - kubectl config use-context staging
    - kubectl set image deployment/myapp myapp=$IMAGE_TAG -n staging
    - kubectl rollout status deployment/myapp -n staging
    - kubectl exec deployment/myapp -n staging -- curl -f http://localhost:8080/health
  environment:
    name: staging
    url: https://staging.myapp.com
  only:
    - develop
  dependencies:
    - build
    - security-scan

deploy-production:
  stage: deploy-production
  image: bitnami/kubectl:latest
  script:
    - kubectl config use-context production
    # Canary deployment
    - kubectl apply -f k8s/canary-deployment.yaml
    - kubectl set image deployment/myapp-canary myapp=$IMAGE_TAG -n production
    - kubectl rollout status deployment/myapp-canary -n production
    # Validate canary
    - sleep 120
    - kubectl exec deployment/myapp-canary -n production -- curl -f http://localhost:8080/health
    # Promote canary
    - kubectl patch service myapp -n production -p '{"spec":{"selector":{"version":"canary"}}}'
    - kubectl scale deployment/myapp-main --replicas=0 -n production
    - kubectl scale deployment/myapp-canary --replicas=3 -n production
  environment:
    name: production
    url: https://myapp.com
  when: manual
  only:
    - main
  dependencies:
    - build
    - security-scan
```

**Docker-in-Docker security setup:**
```yaml
# Secure DinD configuration
services:
  docker:
    image: docker:20.10.16-dind
    privileged: true
    environment:
      DOCKER_TLS_CERTDIR: /certs
    volumes:
      - docker-certs-ca:/certs/ca
      - docker-certs-client:/certs/client
    command: [
      "--tls=true",
      "--tlscert=/certs/server/cert.pem",
      "--tlskey=/certs/server/key.pem",
      "--tlsverify=true",
      "--tlscacert=/certs/ca/cert.pem"
    ]

build:
  image: docker:20.10.16
  services:
    - docker:20.10.16-dind
  variables:
    DOCKER_HOST: tcp://docker:2376
    DOCKER_TLS_CERTDIR: "/certs"
    DOCKER_TLS_VERIFY: 1
    DOCKER_CERT_PATH: "$DOCKER_TLS_CERTDIR/client"
  volumes:
    - docker-certs-client:/certs/client:ro
```

**Performance és cost optimization:**
```bash
# Docker layer caching strategy
docker build \
  --cache-from $IMAGE_NAME:cache \
  --target dependencies \
  -t $IMAGE_NAME:dependencies .

docker build \
  --cache-from $IMAGE_NAME:dependencies \
  --cache-from $IMAGE_NAME:cache \
  --target production \
  -t $IMAGE_NAME:$CI_COMMIT_SHA .

# Multi-stage build caching
docker build \
  --target dependencies \
  --cache-from $IMAGE_NAME:deps-cache \
  -t $IMAGE_NAME:deps-cache .

docker push $IMAGE_NAME:deps-cache
```

</div>

</details>

</div>

<div class="concept-section myths" data-filter="docker">

<details>
<summary>🧯 <strong>Gyakori tévhitek</strong></summary>

<div>

**"Docker build minden commit-nál szükséges"**
- Valóság: Smart caching és incremental builds optimalizálhatják a pipeline-t
- Layer caching és multi-stage builds dramátikusan csökkentik a build időt

**"CI/CD pipeline security optional"**
- Valóság: Security scanning és compliance checks kritikusak production-hoz
- Vulnerability scanning, secrets detection, és access control alapvető

**"Manual deployment biztonságosabb"**
- Valóség: Automated deployment konzisztensebb és kevesebb emberi hibával
- Proper testing és rollback mechanisms esetben

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="docker">

<details>
<summary>📚 <strong>Mikro-tanulás összefoglaló</strong></summary>

<div>

- **CI/CD + Docker = Automated delivery** kódból production-ig
- **Multi-stage pipelines**: Quality gates és progressive validation
- **Security integration**: Vulnerability scanning és compliance checks
- **Caching strategies**: Build time és cost optimization
- **Deployment patterns**: Blue-green, canary, rolling updates
- **Monitoring**: Pipeline metrics és failure analysis
- **Rollback mechanisms**: Automated failure recovery

</div>

</details>

</div>

<div class="concept-section interview" data-filter="docker senior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Junior:**
- Hogyan integrálnád Docker build-et GitHub Actions-ba?
- Milyen lépések szükségesek egy basic CI/CD pipeline-hoz?
- Mire jó a Docker layer caching?

**Medior:**
- Hogyan implementálnál blue-green deployment-et Docker-rel?
- Milyen security checks-et integrálnál a pipeline-ba?
- Hogyan optimalizálnád a Docker build performance-ot?

**Senior:**
- Hogyan terveznél enterprise-scale Docker CI/CD architecture-t?
- Milyen compliance és governance stratégiát implementálnál?
- Hogyan kezebnéd multi-region deployment-eket és disaster recovery-t?

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="docker">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **GitOps** → Git-based deployment workflows
- **Infrastructure as Code** → Terraform, Kubernetes manifests
- **Monitoring** → Deployment metrics és observability
- **Security** → DevSecOps és shift-left practices
- **Kubernetes** → Container orchestration és deployment

</div>

</details>

</div>

---

### Debugging containers {#debugging-containers}

<div class="concept-section mental-model" data-filter="docker medior">

<details>
<summary>🧭 <strong>Így gondolj rá</strong></summary>

<div>

**Container debugging** = **Orvosi diagnózis** container "betegek" számára

**Diagnostic tools:**
- **Logs** = **Tünetek leírása** - mi történt és mikor
- **Exec** = **Közvetlen vizsgálat** - belépés a container-be
- **Inspect** = **Röntgen kép** - container configuration és state
- **Stats** = **Vérkép** - resource usage és performance
- **Events** = **Korábbsagi** - Docker daemon events

**Debug levels:**
- **Quick check** = **Alapvizsgálat** (health, logs)
- **Deep dive** = **Részletes diagnózis** (exec, inspect)
- **System analysis** = **Teljes környé ellenőrzés** (network, volumes)
- **Root cause** = **Ok kiderítése** (performance, dependencies)

</div>

</details>

</div>

<div class="concept-section why-important" data-filter="docker medior">

<details>
<summary>💡 <strong>Miért számít?</strong></summary>

<div>

- **Fast troubleshooting**: Gyors problémafelderítés és megoldás
- **Production debugging**: Live system issue resolution
- **Performance optimization**: Bottleneck identification és tuning
- **Security incident response**: Attack detection és containment

</div>

</details>

</div>

<div class="runnable-model" data-filter="docker">

<details>
<summary><strong>Runnable mental model</strong></summary>

<div>

**Basic container debugging commands:**
```bash
# Container status és basic info
docker ps -a  # All containers (running + stopped)
docker container ls --filter status=exited  # Only failed containers

# Container logs analysis
docker logs container_name                    # All logs
docker logs --tail 100 container_name        # Last 100 lines
docker logs --since="2023-01-01T10:00:00" container_name  # Time-based
docker logs -f container_name                # Follow/tail logs
docker logs --timestamps container_name      # With timestamps

# Container resource usage
docker stats container_name                   # Real-time stats
docker stats --no-stream container_name       # One-time snapshot
docker stats --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}"

# Container inspection
docker inspect container_name                 # Full configuration
docker inspect --format='{{.State.Status}}' container_name
docker inspect --format='{{.NetworkSettings.IPAddress}}' container_name
docker inspect --format='{{range .Mounts}}{{.Source}}:{{.Destination}}{{end}}' container_name

# Interactive debugging
docker exec -it container_name /bin/bash     # Interactive shell
docker exec -it container_name /bin/sh       # Alpine Linux shell
docker exec container_name ps aux            # Process list
docker exec container_name netstat -tulpn    # Network connections
docker exec container_name df -h             # Disk usage
```

**Advanced debugging techniques:**
```bash
# Debug container build issues
DOCKER_BUILDKIT=0 docker build --no-cache --progress=plain -t debug-image .

# Debug with intermediate containers
docker run --rm -it --entrypoint=/bin/bash image_name

# Network debugging
docker network ls
docker network inspect bridge
docker exec container_name ip addr show
docker exec container_name ping other_container
docker exec container_name nslookup service_name

# Volume debugging
docker volume ls
docker volume inspect volume_name
docker exec container_name ls -la /mount/point
docker exec container_name cat /proc/mounts

# Copy files for analysis
docker cp container_name:/app/logs/error.log ./debug/
docker cp ./debug.sh container_name:/tmp/

# Create debug container with same network/volumes
docker run --rm -it \
  --network container:target_container \
  --volumes-from target_container \
  --pid container:target_container \
  nicolaka/netshoot
```

**Comprehensive debugging script:**
```bash
#!/bin/bash
# debug-container.sh

CONTAINER_NAME="$1"

if [ -z "$CONTAINER_NAME" ]; then
    echo "Usage: $0 <container_name>"
    exit 1
fi

echo "=== Container Debug Report ==="
echo "Container: $CONTAINER_NAME"
echo "Timestamp: $(date)"
echo

# Basic container info
echo "--- Container Status ---"
docker ps -f name="$CONTAINER_NAME" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
echo

# Container inspection
echo "--- Container Configuration ---"
docker inspect "$CONTAINER_NAME" --format '
Image: {{.Config.Image}}
State: {{.State.Status}}
Started: {{.State.StartedAt}}
Finished: {{.State.FinishedAt}}
ExitCode: {{.State.ExitCode}}
RestartCount: {{.RestartCount}}
Memory: {{.HostConfig.Memory}}
CPU: {{.HostConfig.CpuShares}}
'

# Resource usage
echo "--- Resource Usage ---"
docker stats "$CONTAINER_NAME" --no-stream --format "table {{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}\t{{.NetIO}}\t{{.BlockIO}}"
echo

# Recent logs
echo "--- Recent Logs (last 50 lines) ---"
docker logs --tail 50 "$CONTAINER_NAME"
echo

# Process list
echo "--- Running Processes ---"
docker exec "$CONTAINER_NAME" ps aux 2>/dev/null || echo "Cannot access processes"
echo

# Network information
echo "--- Network Information ---"
docker exec "$CONTAINER_NAME" ip addr show 2>/dev/null || echo "Cannot access network info"
echo

# Disk usage
echo "--- Disk Usage ---"
docker exec "$CONTAINER_NAME" df -h 2>/dev/null || echo "Cannot access disk info"
echo

# Environment variables
echo "--- Environment Variables ---"
docker exec "$CONTAINER_NAME" env 2>/dev/null | sort || echo "Cannot access environment"
echo

# Port information
echo "--- Port Mappings ---"
docker port "$CONTAINER_NAME" 2>/dev/null || echo "No port mappings"
echo

echo "=== Debug Report Complete ==="
```

**Production debugging with minimal impact:**
```bash
# Non-intrusive debugging
docker exec --user root container_name cat /proc/1/environ | tr '\0' '\n'
docker exec container_name cat /proc/meminfo
docker exec container_name cat /proc/cpuinfo
docker exec container_name ls -la /proc/1/fd/  # Open file descriptors

# Memory analysis
docker exec container_name cat /proc/1/status | grep -E "VmSize|VmRSS|VmSwap"
docker exec container_name cat /proc/1/smaps | grep -E "Size|Rss|Pss|Swap"

# Performance profiling
docker exec container_name top -bn1
docker exec container_name iostat 1 3
docker exec container_name sar -u 1 3

# Application-specific debugging
# Java applications
docker exec container_name jstack 1        # Thread dump
docker exec container_name jstat -gc 1     # GC statistics
docker exec container_name jmap -histo 1   # Heap histogram

# Node.js applications
docker exec container_name kill -USR1 1    # Heap dump (if configured)
docker exec container_name node -e "console.log(process.memoryUsage())"
```

**Kubernetes debugging:**
```bash
# Pod debugging
kubectl describe pod pod_name
kubectl logs pod_name -c container_name --previous  # Previous container logs
kubectl exec -it pod_name -c container_name -- /bin/bash

# Debug with ephemeral containers (Kubernetes 1.23+)
kubectl debug pod_name -it --image=nicolaka/netshoot --target=container_name

# Create debug pod
kubectl run debug-pod --rm -i --tty --image nicolaka/netshoot -- /bin/bash

# Port forwarding for debugging
kubectl port-forward pod/pod_name 8080:8080

# Resource debugging
kubectl top pod pod_name --containers
kubectl describe node node_name
```

**Docker Compose debugging:**
```bash
# Service debugging
docker-compose logs service_name
docker-compose exec service_name /bin/bash
docker-compose ps
docker-compose top service_name

# Configuration debugging
docker-compose config                    # Validate compose file
docker-compose config --services         # List services
docker-compose config --volumes          # List volumes

# Network debugging
docker-compose exec service_name ping other_service
docker network ls
docker network inspect project_default
```

**Log analysis patterns:**
```bash
# Error pattern analysis
docker logs container_name 2>&1 | grep -i error
docker logs container_name 2>&1 | grep -i exception
docker logs container_name 2>&1 | grep -E "(failed|timeout|refused)"

# Performance pattern analysis
docker logs container_name 2>&1 | grep -E "(slow|timeout|latency)"
docker logs container_name 2>&1 | awk '/ERROR/ {print $1, $2, $NF}'

# Log aggregation for analysis
docker logs container_name 2>&1 | \
  awk '{print $1, $2}' | sort | uniq -c | sort -nr  # Timestamp frequency

# Export logs for external analysis
docker logs container_name > /tmp/container_debug.log 2>&1
```

**Automated debugging tools:**
```bash
# Install debugging utilities in running container
docker exec -u root container_name sh -c '
  apt-get update && 
  apt-get install -y htop iotop strace tcpdump net-tools
'

# Performance monitoring setup
docker exec -d container_name top -b -d1 > /tmp/container_top.log &
docker exec -d container_name iostat 1 > /tmp/container_io.log &

# Network traffic analysis
docker exec container_name tcpdump -i any -w /tmp/network.pcap

# System call tracing
docker exec container_name strace -p 1 -o /tmp/syscalls.log
```

</div>

</details>

</div>

<div class="concept-section myths" data-filter="docker">

<details>
<summary>🧯 <strong>Gyakori tévhitek</strong></summary>

<div>

**"Docker logs mindig elérhetők"**
- Valóság: Log driver konfigurációtól függ (json-file, syslog, none)
- Container restart után logs elveszhetnek log retention policy alapján

**"Exec mindig működik"**
- Valóség: Crashed vagy stopped container-ekbe nem lehet exec-elni
- Minimal images-ben (scratch, distroless) nincs shell

**"Root access mindig szükséges debug-hoz"**
- Valóség: Sok debugging info elérhető non-root user-rel is
- Security best practice: minimal privileges használata

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="docker">

<details>
<summary>📚 <strong>Mikro-tanulás összefoglaló</strong></summary>

<div>

- **Debugging toolkit**: logs, exec, inspect, stats fő eszközök
- **Non-intrusive methods**: Production-safe debugging techniques
- **Systematic approach**: Status → Logs → Resources → Deep dive
- **Network debugging**: Container-to-container connectivity
- **Performance analysis**: Resource usage és bottleneck identification
- **Log pattern analysis**: Error detection és trend analysis
- **Emergency procedures**: Quick diagnosis és recovery

</div>

</details>

</div>

<div class="concept-section interview" data-filter="docker medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Junior:**
- Hogyan néznéd meg egy container log-jait?
- Hogyan lépnél be egy futó container-be?
- Mit csinálnál, ha egy container nem indul el?

**Medior:**
- Hogyan debug-olnál egy container network connectivity problémát?
- Milyen métrikákat figyelnél container performance issue-nál?
- Hogyan analyze-álnád egy high memory usage container-t?

**Senior:**
- Hogyan terveznél comprehensive debugging strategy-t production environment-hez?
- Milyen automated monitoring és alerting setup-ot implementálnál?
- Hogyan kezebnéd security incident response-t container environment-ben?

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="docker">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **Monitoring** → Proactive issue detection és alerting
- **Logging** → Centralized log aggregation és analysis
- **Observability** → Distributed tracing és metrics
- **Security** → Incident response és forensics
- **Performance tuning** → Resource optimization és scaling

</div>

</details>

</div>

---

### Container lifecycle management {#container-lifecycle-management}

<div class="concept-section mental-model" data-filter="docker medior">

<details>
<summary>🧭 <strong>Így gondolj rá</strong></summary>

<div>

**Container lifecycle** = **Élőlény életciklus** birth-től death-ig

**Lifecycle stages:**
- **Created** = **Fogantatás** - container létrehozva, de még nem fut
- **Running** = **Élet** - container aktiv és működik
- **Paused** = **Hibernáció** - process-ek fagyasztva, de memory megmarad
- **Stopped** = **Halotti állapot** - process-ek leálltak, de container metadata megvan
- **Removed** = **Eltemetés** - container és metadata törölve

**State transitions:**
- **Birth**: `docker create` vagy `docker run`
- **Start**: `docker start` (created → running)
- **Pause**: `docker pause` (running → paused)
- **Resume**: `docker unpause` (paused → running)
- **Stop**: `docker stop` (running → stopped)
- **Kill**: `docker kill` (erőszakos leállítás)
- **Remove**: `docker rm` (stopped → removed)

</div>

</details>

</div>

<div class="concept-section why-important" data-filter="docker medior">

<details>
<summary>💡 <strong>Miért számít?</strong></summary>

<div>

- **Resource optimization**: Proper lifecycle management optimalizálja resource usage-t
- **Graceful operations**: Clean startup és shutdown processes
- **Data persistence**: Így biztosunk container restart-ok közötti data integrity-t
- **Automated management**: Orchestration platforms (így kezelik a container fleet-et

</div>

</details>

</div>

<div class="runnable-model" data-filter="docker">

<details>
<summary><strong>Runnable mental model</strong></summary>

<div>

**Basic lifecycle operations:**
```bash
# Container creation és management
docker create --name myapp nginx:alpine     # Create but don't start
docker start myapp                          # Start created container
docker stop myapp                           # Graceful stop (SIGTERM then SIGKILL)
docker restart myapp                        # Stop then start
docker pause myapp                          # Suspend processes
docker unpause myapp                        # Resume processes
docker kill myapp                           # Force stop (SIGKILL)
docker rm myapp                            # Remove stopped container

# Combined operations
docker run -d --name webapp nginx:alpine   # Create + start in one command
docker rm -f webapp                        # Force remove (stop + remove)

# Lifecycle inspection
docker ps -a                               # All containers with states
docker container ls --filter status=exited # Only stopped containers
docker inspect myapp --format '{{.State.Status}}'
```

**Advanced lifecycle patterns:**
```bash
# Graceful application shutdown
docker stop --time 30 myapp               # 30 second grace period

# Signal handling
docker kill --signal=USR1 myapp           # Send custom signal
docker kill --signal=HUP myapp            # Reload configuration

# Restart policies
docker run -d --restart=always nginx              # Always restart
docker run -d --restart=unless-stopped nginx     # Restart unless manually stopped
docker run -d --restart=on-failure:3 nginx       # Restart on failure, max 3 times

# Update restart policy
docker update --restart=no myapp          # Change restart policy
```

**Comprehensive container management script:**
```bash
#!/bin/bash
# container-lifecycle.sh

CONTAINER_NAME="$1"
ACTION="$2"

manage_container() {
    local container="$1"
    local action="$2"
    
    case "$action" in
        "status")
            echo "Container status:"
            docker inspect "$container" --format '
Name: {{.Name}}
State: {{.State.Status}}
Health: {{.State.Health.Status}}
Started: {{.State.StartedAt}}
Finished: {{.State.FinishedAt}}
Restart Count: {{.RestartCount}}
Exit Code: {{.State.ExitCode}}
'
            ;;
            
        "graceful-stop")
            echo "Gracefully stopping $container..."
            # Send SIGTERM and wait
            docker kill --signal=TERM "$container"
            
            # Wait for graceful shutdown (max 30 seconds)
            timeout=30
            while [ $timeout -gt 0 ]; do
                if [ "$(docker inspect --format='{{.State.Status}}' "$container")" = "exited" ]; then
                    echo "Container stopped gracefully"
                    return 0
                fi
                sleep 1
                ((timeout--))
            done
            
            # Force kill if still running
            echo "Forcing container stop..."
            docker kill "$container"
            ;;
            
        "health-restart")
            echo "Checking health and restarting if needed..."
            health=$(docker inspect --format='{{.State.Health.Status}}' "$container" 2>/dev/null)
            
            if [ "$health" = "unhealthy" ] || [ "$health" = "" ]; then
                echo "Container unhealthy, restarting..."
                docker restart "$container"
                
                # Wait for healthy status
                timeout=60
                while [ $timeout -gt 0 ]; do
                    health=$(docker inspect --format='{{.State.Health.Status}}' "$container" 2>/dev/null)
                    if [ "$health" = "healthy" ]; then
                        echo "Container restarted and healthy"
                        return 0
                    fi
                    sleep 2
                    ((timeout-=2))
                done
                
                echo "Warning: Container not healthy after restart"
            else
                echo "Container is healthy"
            fi
            ;;
            
        "clean-restart")
            echo "Clean restart with data preservation..."
            
            # Backup critical data if needed
            docker exec "$container" tar -czf /tmp/backup.tar.gz /app/data 2>/dev/null || true
            
            # Stop container
            manage_container "$container" "graceful-stop"
            
            # Remove old container
            docker rm "$container"
            
            # Recreate with same configuration
            # (This would need to extract the original docker run command)
            echo "Recreating container..."
            # docker run ... (with original parameters)
            ;;
            
        "logs-archive")
            echo "Archiving logs before container removal..."
            timestamp=$(date +%Y%m%d_%H%M%S)
            docker logs "$container" > "/tmp/${container}_${timestamp}.log" 2>&1
            echo "Logs archived to /tmp/${container}_${timestamp}.log"
            ;;
            
        *)
            echo "Usage: $0 <container_name> <action>"
            echo "Actions: status, graceful-stop, health-restart, clean-restart, logs-archive"
            exit 1
            ;;
    esac
}

if [ $# -ne 2 ]; then
    manage_container "" ""
    exit 1
fi

manage_container "$CONTAINER_NAME" "$ACTION"
```

**Docker Compose lifecycle management:**
```yaml
# docker-compose.yml with lifecycle configuration
version: '3.8'

services:
  app:
    image: myapp:latest
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s
    stop_grace_period: 30s
    stop_signal: SIGTERM
    init: true  # Use proper init process
    environment:
      - SHUTDOWN_TIMEOUT=25  # Application-level timeout
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:15-alpine
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s
    stop_grace_period: 60s  # Allow time for connection cleanup
    volumes:
      - db_data:/var/lib/postgresql/data

volumes:
  db_data:
```

```bash
# Docker Compose lifecycle commands
docker-compose up -d                       # Start all services
docker-compose stop                         # Graceful stop all services
docker-compose down                         # Stop and remove containers
docker-compose down -v                      # Stop, remove containers and volumes
docker-compose restart app                  # Restart specific service
docker-compose kill app                     # Force kill specific service

# Scaling operations
docker-compose up -d --scale app=3          # Scale service to 3 instances
docker-compose stop app                      # Stop all instances of service

# Rolling updates
docker-compose up -d --no-deps app         # Update only app service
```

**Kubernetes lifecycle management:**
```yaml
# Pod with lifecycle management
apiVersion: v1
kind: Pod
metadata:
  name: lifecycle-demo
spec:
  containers:
  - name: app
    image: myapp:latest
    
    # Lifecycle hooks
    lifecycle:
      postStart:
        exec:
          command: ["/bin/sh", "-c", "echo 'Container started' > /tmp/started"]
      preStop:
        exec:
          command: ["/bin/sh", "-c", "graceful-shutdown.sh"]
    
    # Probes for lifecycle management
    livenessProbe:
      httpGet:
        path: /health
        port: 8080
      initialDelaySeconds: 30
      periodSeconds: 10
      failureThreshold: 3
    
    readinessProbe:
      httpGet:
        path: /ready
        port: 8080
      initialDelaySeconds: 5
      periodSeconds: 5
    
    startupProbe:
      httpGet:
        path: /health
        port: 8080
      initialDelaySeconds: 10
      periodSeconds: 10
      failureThreshold: 30
  
  # Grace period for clean shutdown
  terminationGracePeriodSeconds: 30
```

**Application graceful shutdown implementation:**
```javascript
// Node.js graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM received, starting graceful shutdown...');
    
    // Stop accepting new connections
    server.close(async () => {
        console.log('HTTP server closed');
        
        try {
            // Close database connections
            await db.close();
            console.log('Database connections closed');
            
            // Close Redis connections
            await redis.quit();
            console.log('Redis connections closed');
            
            // Finish processing current requests
            await new Promise(resolve => setTimeout(resolve, 5000));
            
            console.log('Graceful shutdown completed');
            process.exit(0);
        } catch (error) {
            console.error('Error during shutdown:', error);
            process.exit(1);
        }
    });
    
    // Force exit after timeout
    setTimeout(() => {
        console.error('Forced shutdown due to timeout');
        process.exit(1);
    }, 25000);
});

// Handle other signals
process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down...');
    process.emit('SIGTERM');
});
```

**Monitoring és alerting lifecycle events:**
```bash
# Monitor container events
docker events --filter container=myapp --format 'table {{.Time}}\t{{.Action}}\t{{.Actor.Attributes.name}}'

# Create alerting script
#!/bin/bash
# container-monitor.sh

docker events --filter type=container --format '{{.Time}} {{.Action}} {{.Actor.Attributes.name}}' | \
while read timestamp action container; do
    case "$action" in
        "die")
            echo "ALERT: Container $container died at $timestamp"
            # Send notification
            curl -X POST webhook_url -d "Container $container failed"
            ;;
        "start")
            echo "INFO: Container $container started at $timestamp"
            ;;
        "stop")
            echo "INFO: Container $container stopped at $timestamp"
            ;;
    esac
done
```

</div>

</details>

</div>

<div class="concept-section myths" data-filter="docker">

<details>
<summary>🧯 <strong>Gyakori tévhitek</strong></summary>

<div>

**"Docker stop mindig graceful"**
- Valóság: SIGTERM után SIGKILL következik default 10 másodperc után
- Alkalmázásnak signal handling-et kell implementálnia

**"Container restart újra alkalmázás state-et"**
- Valóség: Filesystem changes elvesznek, csak volumes és external storage marad meg
- Stateful adatok külön storage-ban tárolandók

**"Restart policy automatikusan mindent megold"**
- Valóség: Health checks és proper application design szükséges
- Restart loop elkerüléséhez exponential backoff implementáció

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="docker">

<details>
<summary>📚 <strong>Mikro-tanulás összefoglaló</strong></summary>

<div>

- **Lifecycle stages**: Created → Running → Stopped → Removed
- **Graceful operations**: Signal handling és timeout management
- **Restart policies**: Automatic failure recovery strategies
- **Health monitoring**: Proactive container health assessment
- **Data persistence**: Volume és external storage considerations
- **Orchestration integration**: Kubernetes lifecycle hooks és probes
- **Monitoring**: Event tracking és alerting setup

</div>

</details>

</div>

<div class="concept-section interview" data-filter="docker medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Junior:**
- Milyen állapotokban lehet egy Docker container?
- Mi a különbség a `docker stop` és `docker kill` között?
- Mire jó a restart policy?

**Medior:**
- Hogyan implementálnál graceful shutdown-t egy Node.js alkalmazásban?
- Milyen stratégiát használnál zero-downtime deployment-hez?
- Hogyan monitorázznál container lifecycle events-eket?

**Senior:**
- Hogyan terveznél enterprise-scale container lifecycle management-et?
- Milyen automation és orchestration stratégiát implementálnál?
- Hogyan kezebnéd stateful applications lifecycle management-jét?

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="docker">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **Kubernetes probes** → Automated health management
- **Service mesh** → Traffic management és circuit breaking
- **Monitoring** → Lifecycle event tracking és alerting
- **CI/CD** → Automated deployment és rollback
- **Backup és recovery** → Data persistence strategies

</div>

</details>

</div>

---

### Rest API integráció {#rest-api-integracio}
Automated testing és monitoring REST API endpoints számára CI/CD pipeline-ban.

**Példa:**
```yaml
# API Testing in CI/CD
name: API Integration Tests

on:
  push:
    branches: [ main, develop ]

jobs:
  api-tests:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:13
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: testdb
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup test environment
      run: |
        docker-compose -f docker-compose.test.yml up -d
        sleep 30  # Wait for services to start
    
    - name: Run API contract tests
      run: |
        # Postman/Newman tests
        npm install -g newman newman-reporter-htmlextra
        newman run postman/api-tests.json \
          --environment postman/test-env.json \
          --reporters cli,htmlextra \
          --reporter-htmlextra-export reports/api-tests.html
    
    - name: Run Pact contract tests
      run: |
        # Consumer contract testing
        npm run test:pact:consumer
        
        # Provider contract verification
        npm run test:pact:provider
    
    - name: Performance testing
      run: |
        # K6 load testing
        docker run --network host -i grafana/k6:latest run - <performance-tests.js
    
    - name: Security testing
      run: |
        # OWASP ZAP API security scan
        docker run -t owasp/zap2docker-weekly zap-api-scan.py \
          -t http://localhost:8080/v3/api-docs \
          -f openapi -J zap-report.json
    
    - name: Upload test results
      uses: actions/upload-artifact@v3
      if: always()
      with:
        name: test-reports
        path: |
          reports/
          zap-report.json
```

**API Testing Scripts:**
```javascript
// performance-tests.js - K6 load test
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 10 },  // Ramp up
    { duration: '5m', target: 50 },  // Stay at 50 users
    { duration: '2m', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests under 500ms
    http_req_failed: ['rate<0.1'],    // Error rate under 10%
  },
};

export default function() {
  // User registration flow
  let registerResponse = http.post('http://localhost:8080/api/users', {
    name: `TestUser${__VU}_${__ITER}`,
    email: `test${__VU}_${__ITER}@example.com`,
    password: 'TestPassword123!'
  }, {
    headers: { 'Content-Type': 'application/json' },
  });

  check(registerResponse, {
    'registration successful': (r) => r.status === 201,
    'response time acceptable': (r) => r.timings.duration < 1000,
  });

  if (registerResponse.status === 201) {
    let userId = registerResponse.json().id;
    
    // User profile fetch
    let profileResponse = http.get(`http://localhost:8080/api/users/${userId}`);
    check(profileResponse, {
      'profile fetch successful': (r) => r.status === 200,
      'profile data complete': (r) => r.json().name !== undefined,
    });
  }

  sleep(1);
}

// Contract tests with Pact
// consumer-pact.test.js
import { PactV3, MatchersV3 } from '@pact-foundation/pact';

const { like, eachLike } = MatchersV3;

describe('User API Consumer', () => {
  const pact = new PactV3({
    consumer: 'UserConsumer',
    provider: 'UserProvider',
  });

  it('should get user list', async () => {
    pact
      .given('users exist')
      .uponReceiving('a request for users')
      .withRequest({
        method: 'GET',
        path: '/api/users',
        headers: {
          'Accept': 'application/json',
        },
      })
      .willRespondWith({
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: eachLike({
          id: like(1),
          name: like('John Doe'),
          email: like('john@example.com'),
          createdAt: like('2023-09-27T10:00:00Z'),
        }),
      });

    await pact.executeTest(async (mockService) => {
      const response = await fetch(`${mockService.url}/api/users`);
      const users = await response.json();
      
      expect(response.status).toBe(200);
      expect(users).toHaveLength(1);
      expect(users[0]).toHaveProperty('id');
      expect(users[0]).toHaveProperty('name');
    });
  });
});
```

<div class="concept-section" data-filter="monitoring medior">

### Monitoring {#monitoring}

<div class="mental-model">
🩺 **Mental Model: Monitoring - A Medical Checkup System**
Képzeld el a monitoring rendszert mint egy fejlett orvosi diagnosztikai rendszert egy kórházban. Ahogy egy beteg állapotát folyamatosan figyelik (szívverés, vérnyomás, oxigén szint), úgy a monitoring is a rendszered "vitális jeleit" figyeli.

**A Monitoring "orvosi eszközei":**
- **Metrics (Prometheus)**: Mint a monitor screenek - számszerű adatok real-time-ban
- **Logs (ELK Stack)**: Mint az orvosi jegyzetek - mi történt és mikor
- **Traces (Jaeger)**: Mint a kontraszt anyagos vizsgálat - követi a request útját
- **Dashboards (Grafana)**: Mint a központi monitor - mindent egy helyen látsz
- **Alerts**: Mint a riasztó rendszer - azonnal szól, ha probléma van

**Three Pillars of Observability:**
1. **Metrics** - "How fast?" (performance numbers)
2. **Logs** - "What happened?" (event records)  
3. **Traces** - "Where is the bottleneck?" (request journey)
</div>

<div class="why-important">
💡 **Miért kritikus a Monitoring?**
- **Proactive problem detection**: Problémák észlelése, mielőtt a user észrevenné
- **Performance optimization**: Bottlenecks azonosítása és optimalizálás
- **Capacity planning**: Mikor kell scale-elni?
- **Troubleshooting**: Gyors root cause analysis
- **SLA compliance**: Service level agreement betartása
- **Business intelligence**: Technical metrics → business insights
- **Cost optimization**: Resource waste azonosítása
- **Security monitoring**: Suspicious activity detection
</div>

<div class="runnable-model">
🚀 **Production-ready monitoring stack:**

**1. Prometheus + Grafana Stack:**
```yaml
# docker-compose.monitoring.yml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:v2.45.0
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus:/etc/prometheus
      - prometheus-data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--storage.tsdb.retention.time=30d'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--web.enable-lifecycle'
      - '--web.enable-admin-api'
    restart: unless-stopped
    networks:
      - monitoring

  grafana:
    image: grafana/grafana:10.0.0
    container_name: grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=${GRAFANA_PASSWORD}
      - GF_SECURITY_DISABLE_GRAVATAR=true
      - GF_SECURITY_COOKIE_SECURE=true
      - GF_SECURITY_STRICT_TRANSPORT_SECURITY=true
      - GF_USERS_ALLOW_SIGN_UP=false
    volumes:
      - grafana-data:/var/lib/grafana
      - ./grafana/provisioning:/etc/grafana/provisioning
    restart: unless-stopped
    networks:
      - monitoring

  alertmanager:
    image: prom/alertmanager:v0.25.0
    container_name: alertmanager
    ports:
      - "9093:9093"
    volumes:
      - ./alertmanager:/etc/alertmanager
      - alertmanager-data:/alertmanager
    command:
      - '--config.file=/etc/alertmanager/alertmanager.yml'
      - '--storage.path=/alertmanager'
      - '--web.external-url=http://localhost:9093'
    restart: unless-stopped
    networks:
      - monitoring

  # System metrics
  node-exporter:
    image: prom/node-exporter:v1.6.0
    container_name: node-exporter
    ports:
      - "9100:9100"
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command:
      - '--path.procfs=/host/proc'
      - '--path.sysfs=/host/sys'
      - '--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)'
    restart: unless-stopped
    networks:
      - monitoring

  # Log aggregation
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.8.0
    container_name: elasticsearch
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    volumes:
      - elasticsearch-data:/usr/share/elasticsearch/data
    ports:
      - "9200:9200"
    restart: unless-stopped
    networks:
      - monitoring

  logstash:
    image: docker.elastic.co/logstash/logstash:8.8.0
    container_name: logstash
    volumes:
      - ./logstash/pipeline:/usr/share/logstash/pipeline
      - ./logstash/config:/usr/share/logstash/config
    environment:
      - "LS_JAVA_OPTS=-Xmx256m -Xms256m"
    depends_on:
      - elasticsearch
    restart: unless-stopped
    networks:
      - monitoring

  kibana:
    image: docker.elastic.co/kibana/kibana:8.8.0
    container_name: kibana
    ports:
      - "5601:5601"
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
      - SERVER_NAME=kibana
    depends_on:
      - elasticsearch
    restart: unless-stopped
    networks:
      - monitoring

  # Distributed tracing
  jaeger:
    image: jaegertracing/all-in-one:1.47
    container_name: jaeger
    environment:
      - COLLECTOR_OTLP_ENABLED=true
    ports:
      - "16686:16686"  # Jaeger UI
      - "14268:14268"  # Jaeger HTTP collector
      - "4317:4317"    # OTLP gRPC receiver
      - "4318:4318"    # OTLP HTTP receiver
    restart: unless-stopped
    networks:
      - monitoring

volumes:
  prometheus-data:
  grafana-data:
  alertmanager-data:
  elasticsearch-data:

networks:
  monitoring:
    driver: bridge
```

**2. Application Instrumentation (Spring Boot):**
```java
@RestController
@Slf4j
public class UserController {
    
    private final MeterRegistry meterRegistry;
    private final UserService userService;
    
    // Custom metrics
    private final Counter userCreatedCounter;
    private final Timer userOperationTimer;
    private final Gauge activeUsersGauge;
    
    public UserController(MeterRegistry meterRegistry, UserService userService) {
        this.meterRegistry = meterRegistry;
        this.userService = userService;
        
        // Business metrics
        this.userCreatedCounter = Counter.builder("users.created.total")
            .description("Total number of users created")
            .tag("service", "user-service")
            .register(meterRegistry);
            
        this.userOperationTimer = Timer.builder("user.operation.duration")
            .description("User operation response time")
            .register(meterRegistry);
            
        this.activeUsersGauge = Gauge.builder("users.active.current")
            .description("Current number of active users")
            .register(meterRegistry, this, UserController::getActiveUserCount);
    }
    
    @PostMapping("/users")
    @Timed(name = "user.creation", description = "User creation timing")
    public ResponseEntity<User> createUser(@RequestBody @Valid CreateUserRequest request) {
        // Distributed tracing
        Span span = tracer.nextSpan().name("create-user").start();
        
        try (Tracer.SpanInScope ws = tracer.withSpanInScope(span)) {
            span.tag("user.email", request.getEmail());
            span.tag("user.type", request.getType());
            
            // Structured logging with correlation ID
            MDC.put("correlationId", span.getTraceId());
            log.info("Creating user - email: {}, type: {}", 
                request.getEmail(), request.getType());
            
            User user = Timer.Sample.start(meterRegistry)
                .stop(userOperationTimer)
                .recordCallable(() -> userService.createUser(request));
            
            // Success metrics
            userCreatedCounter.increment(
                Tags.of(
                    "status", "success",
                    "type", request.getType()
                )
            );
            
            span.tag("user.id", user.getId().toString());
            span.tag("success", "true");
            
            log.info("User created successfully - id: {}, email: {}", 
                user.getId(), user.getEmail());
            
            return ResponseEntity.status(HttpStatus.CREATED).body(user);
            
        } catch (Exception e) {
            // Error metrics and logging
            userCreatedCounter.increment(
                Tags.of(
                    "status", "error",
                    "error.type", e.getClass().getSimpleName(),
                    "type", request.getType()
                )
            );
            
            span.tag("error", e.getMessage());
            span.tag("success", "false");
            
            log.error("Failed to create user - email: {}, error: {}", 
                request.getEmail(), e.getMessage(), e);
            
            throw e;
        } finally {
            span.end();
            MDC.clear();
        }
    }
    
    private double getActiveUserCount() {
        return userService.getActiveUserCount().doubleValue();
    }
}

// Health checks
@Component
public class CustomHealthIndicators {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    
    @Bean
    public HealthIndicator databaseHealthIndicator() {
        return () -> {
            try {
                long userCount = userRepository.count();
                return Health.up()
                    .withDetail("users.total", userCount)
                    .withDetail("database", "connected")
                    .withDetail("query.time", System.currentTimeMillis())
                    .build();
            } catch (Exception e) {
                return Health.down()
                    .withDetail("database", "disconnected")
                    .withDetail("error", e.getMessage())
                    .build();
            }
        };
    }
    
    @Bean
    public HealthIndicator redisHealthIndicator() {
        return () -> {
            try {
                redisTemplate.opsForValue().set("health.check", "ok");
                String result = (String) redisTemplate.opsForValue().get("health.check");
                
                return Health.up()
                    .withDetail("redis", "connected")
                    .withDetail("ping", "ok".equals(result) ? "success" : "failed")
                    .build();
            } catch (Exception e) {
                return Health.down()
                    .withDetail("redis", "disconnected")
                    .withDetail("error", e.getMessage())
                    .build();
            }
        };
    }
}
```

**3. Alert Rules Configuration:**
```yaml
# prometheus/rules.yml
groups:
- name: application.alerts
  rules:
  - alert: HighErrorRate
    expr: (rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m])) * 100 > 5
    for: 5m
    labels:
      severity: critical
      service: "{{ $labels.service }}"
    annotations:
      summary: "High error rate detected"
      description: "Error rate is {{ $value }}% for service {{ $labels.service }}"
      runbook_url: "https://runbooks.example.com/high-error-rate"

  - alert: ResponseTimeHigh
    expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 2
    for: 3m
    labels:
      severity: warning
    annotations:
      summary: "High response time"
      description: "95th percentile response time is {{ $value }}s"

  - alert: ServiceDown
    expr: up == 0
    for: 1m
    labels:
      severity: critical
    annotations:
      summary: "Service {{ $labels.instance }} is down"
      description: "Service {{ $labels.instance }} has been down for more than 1 minute"

- name: infrastructure.alerts
  rules:
  - alert: HighCPUUsage
    expr: 100 - (avg by(instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 85
    for: 10m
    labels:
      severity: warning
    annotations:
      summary: "High CPU usage on {{ $labels.instance }}"
      description: "CPU usage is above 85% for more than 10 minutes"

  - alert: HighMemoryUsage
    expr: (1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100 > 90
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "High memory usage on {{ $labels.instance }}"
      description: "Memory usage is above 90%"

  - alert: DiskSpaceLow
    expr: (1 - (node_filesystem_avail_bytes{fstype!="tmpfs"} / node_filesystem_size_bytes)) * 100 > 90
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "Disk space low on {{ $labels.instance }}"
      description: "Disk usage is above 90% on filesystem {{ $labels.mountpoint }}"
```

**4. Grafana Dashboard as Code:**
```json
{
  "dashboard": {
    "id": null,
    "title": "Application Metrics",
    "tags": ["application", "monitoring"],
    "timezone": "browser",
    "panels": [
      {
        "id": 1,
        "title": "Request Rate",
        "type": "stat",
        "targets": [
          {
            "expr": "sum(rate(http_requests_total[5m]))",
            "refId": "A"
          }
        ],
        "fieldConfig": {
          "defaults": {
            "unit": "reqps",
            "thresholds": {
              "steps": [
                {"color": "green", "value": null},
                {"color": "yellow", "value": 100},
                {"color": "red", "value": 1000}
              ]
            }
          }
        }
      },
      {
        "id": 2,
        "title": "Error Rate",
        "type": "stat",
        "targets": [
          {
            "expr": "(sum(rate(http_requests_total{status=~\"5..\"}[5m])) / sum(rate(http_requests_total[5m]))) * 100",
            "refId": "A"
          }
        ],
        "fieldConfig": {
          "defaults": {
            "unit": "percent",
            "thresholds": {
              "steps": [
                {"color": "green", "value": null},
                {"color": "yellow", "value": 1},
                {"color": "red", "value": 5}
              ]
            }
          }
        }
      }
    ],
    "time": {
      "from": "now-1h",
      "to": "now"
    },
    "refresh": "30s"
  }
}
```
</div>

<div class="myths">
🚫 **Gyakori tévhitek és hibák**

<details>
<summary><strong>Tévhit: "Monitoring drága és lassítja a rendszert"</strong></summary>
<div class="myth-content">
**Valóság:** Modern monitoring tools minimal overhead-del járnak, és a ROI óriási.

**Performance impact számok:**
- **Prometheus metrics**: <1% CPU overhead
- **Structured logging**: 2-5% performance impact
- **Distributed tracing**: 1-3% latency increase (sampling-gal)

**ROI calculation:**
```
Monitoring cost: $500/month
Average incident without monitoring: 4 hours downtime
Average incident with monitoring: 15 minutes downtime

Business impact:
- Revenue loss per hour: $10,000
- Cost savings per incident: $9,375
- Break-even: ~2 incidents per year
```

**Optimization strategies:**
- Metric sampling and aggregation
- Log level configuration (INFO in prod, DEBUG in dev)
- Distributed tracing sampling (1-10% of requests)
- Efficient storage (retention policies, compression)
</div>
</details>

<details>
<summary><strong>Tévhit: "Logs enough for debugging"</strong></summary>
<div class="myth-content">
**Valóság:** Logs csak egy parte az observability-nek. Metrics + Logs + Traces kell.

**Log limitations:**
- High cardinality data expensive to store
- Difficult to aggregate and analyze
- No performance metrics context
- Missing request correlation

**The Three Pillars approach:**
```
Problem: "API slow for specific users"

Logs: "Error: timeout after 30s"
Metrics: "95th percentile latency: 25s"  
Traces: "Database query took 23s in user service"

Combined insight: Database query optimization needed for specific query pattern
```

**Best practice stack:**
- **Metrics**: Aggregated performance data (Prometheus)
- **Logs**: Event records and error details (ELK)
- **Traces**: Request flow and bottlenecks (Jaeger)
- **Dashboards**: Unified view (Grafana)
</div>
</details>

<details>
<summary><strong>Tévhit: "Default metrics elégek"</strong></summary>
<div class="myth-content">
**Valóság:** Business metrics és custom metrics kritikusak a teljes láthatósághoz.

**Default metrics (infrastructure):**
- CPU, Memory, Disk, Network
- HTTP request counts and latencies
- JVM metrics, garbage collection

**Missing: Business context!**
```java
// BAD: Only technical metrics
@GetMapping("/orders")
public List<Order> getOrders() {
    return orderService.getOrders(); // No business metrics
}

// GOOD: Business + Technical metrics
@GetMapping("/orders")
public List<Order> getOrders() {
    Timer.Sample sample = Timer.start(meterRegistry);
    
    try {
        List<Order> orders = orderService.getOrders();
        
        // Business metrics
        meterRegistry.counter("orders.retrieved.total",
            Tags.of("status", "success")).increment();
        meterRegistry.gauge("orders.current.count", orders.size());
        
        return orders;
    } catch (Exception e) {
        meterRegistry.counter("orders.retrieved.total",
            Tags.of("status", "error", "error.type", e.getClass().getSimpleName())).increment();
        throw e;
    } finally {
        sample.stop(Timer.builder("orders.retrieval.time").register(meterRegistry));
    }
}
```

**Business metrics examples:**
- User registration rate
- Order completion rate  
- Revenue per minute
- Feature adoption rate
- Customer satisfaction score
</div>
</details>
</details>

<div class="micro-learning">
🎯 **Micro-learning: The SRE Golden Signals**

**Google SRE's 4 Golden Signals:**
1. **Latency** - How long requests take
2. **Traffic** - How much demand on your system  
3. **Errors** - Rate of failed requests
4. **Saturation** - How "full" your service is

**Prometheus queries for Golden Signals:**
```promql
# 1. Latency (95th percentile)
histogram_quantile(0.95, 
  rate(http_request_duration_seconds_bucket[5m])
)

# 2. Traffic (requests per second)
sum(rate(http_requests_total[5m]))

# 3. Errors (error rate percentage)
(
  sum(rate(http_requests_total{status=~"5.."}[5m])) /
  sum(rate(http_requests_total[5m]))
) * 100

# 4. Saturation (CPU usage)
100 - (avg(irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)
```

**Alert thresholds (starting points):**
- **Latency**: 95th percentile > 2x normal
- **Traffic**: 50% above or below normal
- **Errors**: > 1% error rate
- **Saturation**: > 80% resource utilization

**Pro tip:** Start with these 4 signals, then add business-specific metrics!
</div>

</div>

## Kódrészletek és automatizálás

### Infrastructure as Code (IaC) {#infrastructure-as-code-iac}
```hcl
# Terraform AWS infrastructure
# main.tf
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  
  backend "s3" {
    bucket = "myapp-terraform-state"
    key    = "infrastructure/terraform.tfstate"
    region = "eu-west-1"
  }
}

# VPC and networking
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  
  tags = {
    Name        = "myapp-vpc"
    Environment = var.environment
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  
  tags = {
    Name = "myapp-igw"
  }
}

resource "aws_subnet" "public" {
  count = length(var.availability_zones)
  
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.${count.index + 1}.0/24"
  availability_zone       = var.availability_zones[count.index]
  map_public_ip_on_launch = true
  
  tags = {
    Name = "myapp-public-subnet-${count.index + 1}"
    Type = "public"
  }
}

resource "aws_subnet" "private" {
  count = length(var.availability_zones)
  
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.${count.index + 10}.0/24"
  availability_zone = var.availability_zones[count.index]
  
  tags = {
    Name = "myapp-private-subnet-${count.index + 1}"
    Type = "private"
  }
}

# EKS Cluster
resource "aws_eks_cluster" "main" {
  name     = "myapp-cluster"
  role_arn = aws_iam_role.eks_cluster.arn
  version  = "1.27"
  
  vpc_config {
    subnet_ids              = concat(aws_subnet.public[*].id, aws_subnet.private[*].id)
    endpoint_private_access = true
    endpoint_public_access  = true
    public_access_cidrs     = ["0.0.0.0/0"]
  }
  
  enabled_cluster_log_types = ["api", "audit", "authenticator", "controllerManager", "scheduler"]
  
  depends_on = [
    aws_iam_role_policy_attachment.eks_cluster_policy,
    aws_iam_role_policy_attachment.eks_service_policy,
  ]
  
  tags = {
    Name = "myapp-eks-cluster"
  }
}

# Node groups
resource "aws_eks_node_group" "main" {
  cluster_name    = aws_eks_cluster.main.name
  node_group_name = "myapp-nodes"
  node_role_arn   = aws_iam_role.eks_nodes.arn
  subnet_ids      = aws_subnet.private[*].id
  
  instance_types = ["t3.medium"]
  ami_type       = "AL2_x86_64"
  capacity_type  = "ON_DEMAND"
  
  scaling_config {
    desired_size = 2
    max_size     = 10
    min_size     = 1
  }
  
  update_config {
    max_unavailable_percentage = 25
  }
  
  depends_on = [
    aws_iam_role_policy_attachment.eks_worker_node_policy,
    aws_iam_role_policy_attachment.eks_cni_policy,
    aws_iam_role_policy_attachment.eks_container_registry_policy,
  ]
  
  tags = {
    Name = "myapp-node-group"
  }
}

# RDS Database
resource "aws_db_instance" "main" {
  identifier = "myapp-database"
  
  engine         = "postgres"
  engine_version = "13.13"
  instance_class = "db.t3.micro"
  
  allocated_storage     = 20
  max_allocated_storage = 100
  storage_type          = "gp2"
  storage_encrypted     = true
  
  db_name  = "myapp"
  username = "dbuser"
  password = var.db_password
  
  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name
  
  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "Sun:04:00-Sun:05:00"
  
  skip_final_snapshot = false
  final_snapshot_identifier = "myapp-final-snapshot-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  
  monitoring_interval = 60
  monitoring_role_arn = aws_iam_role.rds_monitoring.arn
  
  tags = {
    Name = "myapp-database"
  }
}

# Application Load Balancer
resource "aws_lb" "main" {
  name               = "myapp-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = aws_subnet.public[*].id
  
  enable_deletion_protection = false
  
  tags = {
    Name = "myapp-alb"
  }
}
```

**Kubernetes Deployment:**
```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  namespace: production
  labels:
    app: myapp
    version: v1
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: myapp
      version: v1
  template:
    metadata:
      labels:
        app: myapp
        version: v1
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/path: "/actuator/prometheus"
        prometheus.io/port: "8080"
    spec:
      serviceAccountName: myapp
      securityContext:
        runAsNonRoot: true
        runAsUser: 1000
        fsGroup: 1000
      containers:
      - name: myapp
        image: myregistry.com/myapp:latest
        imagePullPolicy: Always
        ports:
        - containerPort: 8080
          name: http
          protocol: TCP
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: production
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: myapp-secrets
              key: database-url
        - name: REDIS_URL
          valueFrom:
            configMapKeyRef:
              name: myapp-config
              key: redis-url
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /actuator/health/liveness
            port: 8080
          initialDelaySeconds: 60
          periodSeconds: 30
          timeoutSeconds: 10
          failureThreshold: 3
        readinessProbe:
          httpGet:
            path: /actuator/health/readiness
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
          timeoutSeconds: 5
          failureThreshold: 3
        volumeMounts:
        - name: app-config
          mountPath: /app/config
          readOnly: true
      volumes:
      - name: app-config
        configMap:
          name: myapp-config
      imagePullSecrets:
      - name: registry-secret

---
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
  namespace: production
  labels:
    app: myapp
spec:
  type: ClusterIP
  ports:
  - port: 80
    targetPort: 8080
    protocol: TCP
    name: http
  selector:
    app: myapp

---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-ingress
  namespace: production
  annotations:
    kubernetes.io/ingress.class: "nginx"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/rate-limit: "100"
spec:
  tls:
  - hosts:
    - myapp.com
    secretName: myapp-tls
  rules:
  - host: myapp.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: myapp-service
            port:
              number: 80
```

### Helm Charts
```yaml
# helm/Chart.yaml
apiVersion: v2
name: myapp
description: My Application Helm Chart
version: 1.0.0
appVersion: "1.2.3"

dependencies:
  - name: postgresql
    version: "11.9.13"
    repository: https://charts.bitnami.com/bitnami
    condition: postgresql.enabled
  - name: redis
    version: "17.3.17"
    repository: https://charts.bitnami.com/bitnami
    condition: redis.enabled

# helm/values.yaml
replicaCount: 3

image:
  repository: myregistry.com/myapp
  tag: "latest"
  pullPolicy: Always

service:
  type: ClusterIP
  port: 80
  targetPort: 8080

ingress:
  enabled: true
  className: nginx
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/rate-limit: "100"
  hosts:
    - host: myapp.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: myapp-tls
      hosts:
        - myapp.com

resources:
  requests:
    memory: "512Mi"
    cpu: "250m"
  limits:
    memory: "1Gi"
    cpu: "500m"

autoscaling:
  enabled: true
  minReplicas: 2
  maxReplicas: 10
  targetCPUUtilizationPercentage: 70
  targetMemoryUtilizationPercentage: 80

postgresql:
  enabled: true
  auth:
    postgresPassword: "changeme"
    database: myapp

redis:
  enabled: true
  auth:
    enabled: false

monitoring:
  enabled: true
  serviceMonitor:
    enabled: true
    path: /actuator/prometheus
    interval: 30s

# helm/templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "myapp.fullname" . }}
  labels:
    {{- include "myapp.labels" . | nindent 4 }}
spec:
  {{- if not .Values.autoscaling.enabled }}
  replicas: {{ .Values.replicaCount }}
  {{- end }}
  selector:
    matchLabels:
      {{- include "myapp.selectorLabels" . | nindent 6 }}
  template:
    metadata:
      annotations:
        checksum/config: {{ include (print $.Template.BasePath "/configmap.yaml") . | sha256sum }}
        {{- if .Values.monitoring.enabled }}
        prometheus.io/scrape: "true"
        prometheus.io/path: "/actuator/prometheus"
        prometheus.io/port: "8080"
        {{- end }}
      labels:
        {{- include "myapp.selectorLabels" . | nindent 8 }}
    spec:
      containers:
        - name: {{ .Chart.Name }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag | default .Chart.AppVersion }}"
          imagePullPolicy: {{ .Values.image.pullPolicy }}
          ports:
            - name: http
              containerPort: {{ .Values.service.targetPort }}
              protocol: TCP
          livenessProbe:
            httpGet:
              path: /actuator/health/liveness
              port: http
            initialDelaySeconds: 60
            periodSeconds: 30
          readinessProbe:
            httpGet:
              path: /actuator/health/readiness
              port: http
            initialDelaySeconds: 30
            periodSeconds: 10
          resources:
            {{- toYaml .Values.resources | nindent 12 }}
          env:
            - name: DATABASE_URL
              value: {{ printf "jdbc:postgresql://%s-postgresql:5432/%s" (include "myapp.fullname" .) .Values.postgresql.auth.database }}
            - name: REDIS_URL
              value: {{ printf "redis://%s-redis:6379" (include "myapp.fullname" .) }}
```

## Gyakori hibák

### Manuális Deploy és konfigurációkezelés
Kézi deployment folyamatok és configuration drift problémák.

**Hibás példa:**
```bash
# HIBÁS - Manual deployment steps
# 1. Developer manually SSH into server
ssh user@production-server

# 2. Manual application stop
sudo systemctl stop myapp

# 3. Manual backup (sometimes forgotten)
# sudo cp -r /opt/myapp /opt/myapp-backup-$(date)

# 4. Manual code update
cd /opt/myapp
sudo git pull origin main  # ❌ Direct git pull in production!
sudo chmod +x startup.sh

# 5. Manual dependency install
sudo npm install  # ❌ No lock file consistency!

# 6. Manual configuration changes
sudo nano /etc/myapp/config.properties  # ❌ Manual config editing
# DATABASE_URL=jdbc:postgresql://localhost:5432/myapp
# API_KEY=some-secret-key  # ❌ Hardcoded secrets!

# 7. Manual service restart
sudo systemctl start myapp

# 8. Manual verification (maybe)
curl http://localhost:8080/health  # If remembered...

# Problems:
# - No rollback strategy
# - Configuration drift
# - Human errors
# - No audit trail
# - Inconsistent environments
```

**Helyes megoldás:**
```yaml
# HELYES - Automated deployment pipeline
# deploy.yml - GitHub Actions
name: Production Deployment

on:
  push:
    tags:
      - 'v*'

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v2
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: eu-west-1
        
    - name: Deploy with Helm
      run: |
        # Zero-downtime deployment
        helm upgrade --install myapp ./helm-chart \
          --namespace production \
          --set image.tag=${{ github.ref_name }} \
          --set replicaCount=3 \
          --wait --timeout=300s
          
    - name: Verify deployment
      run: |
        kubectl rollout status deployment/myapp -n production
        
        # Health check with retry
        for i in {1..30}; do
          if curl -f https://myapp.com/actuator/health; then
            echo "Deployment successful!"
            exit 0
          fi
          echo "Waiting for app to be ready..."
          sleep 10
        done
        exit 1
        
    - name: Rollback on failure
      if: failure()
      run: |
        echo "Deployment failed, rolling back..."
        helm rollback myapp -n production
        
    - name: Notify team
      uses: 8398a7/action-slack@v3
      with:
        status: ${{ job.status }}
        channel: '#deployments'
        webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### Nem verziózott Build és release
Inconsistent builds és missing traceability deployment-ek során.

**Hibás példa:**
```dockerfile
# HIBÁS - Inconsistent build environment
FROM node:latest  # ❌ Moving target!

WORKDIR /app
COPY . .

RUN npm install  # ❌ No lock file!
RUN npm run build  # ❌ Build-time variability

CMD ["npm", "start"]
```

```yaml
# HIBÁS - No versioning strategy
# .github/workflows/deploy.yml
- name: Build and deploy
  run: |
    docker build -t myapp:latest .  # ❌ Always "latest"!
    docker push myregistry.com/myapp:latest
    
    # Deploy "latest" - no rollback capability!
    kubectl set image deployment/myapp myapp=myregistry.com/myapp:latest
```

**Helyes megoldás:**
```dockerfile
# HELYES - Reproducible builds
FROM node:18.17.1-alpine AS builder  # ✅ Specific version

WORKDIR /app

# Copy dependency files first (better caching)
COPY package.json package-lock.json ./
RUN npm ci --only=production && npm cache clean --force  # ✅ Exact versions

COPY . .
RUN npm run build

# Production image
FROM node:18.17.1-alpine AS runner

# Non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

WORKDIR /app
COPY --from=builder --chown=nextjs:nodejs /app ./

USER nextjs
EXPOSE 3000

CMD ["npm", "start"]
```

```yaml
# HELYES - Semantic versioning and immutable tags
name: Release Pipeline

on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    outputs:
      version: ${{ steps.version.outputs.version }}
    
    steps:
    - name: Generate semantic version
      id: version
      run: |
        # Generate version based on commits
        VERSION=$(date +%Y%m%d)-${GITHUB_SHA::8}
        echo "version=$VERSION" >> $GITHUB_OUTPUT
        
    - name: Build with version
      run: |
        docker build \
          --build-arg VERSION=${{ steps.version.outputs.version }} \
          --build-arg BUILD_DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ") \
          --build-arg GIT_COMMIT=${GITHUB_SHA} \
          -t myregistry.com/myapp:${{ steps.version.outputs.version }} \
          -t myregistry.com/myapp:latest .
          
    - name: Push versioned images
      run: |
        docker push myregistry.com/myapp:${{ steps.version.outputs.version }}
        docker push myregistry.com/myapp:latest
        
    - name: Create GitHub release
      uses: actions/create-release@v1
      with:
        tag_name: v${{ steps.version.outputs.version }}
        release_name: Release v${{ steps.version.outputs.version }}
        
  deploy:
    needs: release
    runs-on: ubuntu-latest
    
    steps:
    - name: Deploy versioned image
      run: |
        helm upgrade --install myapp ./helm-chart \
          --set image.tag=${{ needs.release.outputs.version }} \
          --set version="${{ needs.release.outputs.version }}" \
          --namespace production \
          --create-namespace
```

### Security integration hiánya
Biztonsági ellenőrzések kihagyása a CI/CD pipeline-ból.

**Hibás példa:**
```yaml
# HIBÁS - No security checks
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Build and push
      run: |
        docker build -t myapp .
        docker push myregistry.com/myapp:latest  # ❌ No security scan!
        
    - name: Deploy
      run: |
        kubectl apply -f k8s/  # ❌ No security policies!
```

**Helyes megoldás:**
```yaml
# HELYES - Security-first pipeline
name: Secure Deployment Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  security-checks:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      
    - name: Run dependency security scan
      run: |
        # Node.js dependencies
        npm audit --audit-level=high
        
        # Java dependencies with OWASP
        if [ -f "pom.xml" ]; then
          mvn org.owasp:dependency-check-maven:check
        fi
        
    - name: Static Application Security Testing (SAST)
      uses: github/codeql-action/init@v2
      with:
        languages: javascript, java
        
    - name: Build application
      run: |
        docker build -t myapp:${{ github.sha }} .
        
    - name: Container security scan
      run: |
        # Trivy vulnerability scanner
        docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
          aquasec/trivy:latest image \
          --severity HIGH,CRITICAL \
          --exit-code 1 \
          myapp:${{ github.sha }}
          
    - name: Infrastructure security scan
      run: |
        # Checkov for Terraform/K8s
        pip install checkov
        checkov -d terraform/ --framework terraform
        checkov -d k8s/ --framework kubernetes
        
    - name: Secrets detection
      uses: trufflesecurity/trufflehog@v3.45.3
      with:
        path: ./
        base: main
        head: HEAD
        
    - name: DAST security testing
      if: github.ref == 'refs/heads/main'
      run: |
        # Deploy to staging first
        kubectl apply -f k8s/ --namespace=staging
        
        # Wait for deployment
        kubectl rollout status deployment/myapp -n staging
        
        # Run OWASP ZAP against staging
        docker run -t owasp/zap2docker-weekly \
          zap-baseline.py -t https://staging.myapp.com \
          -J zap-report.json
          
    - name: Upload security reports
      uses: actions/upload-artifact@v3
      if: always()
      with:
        name: security-reports
        path: |
          zap-report.json
          dependency-check-report.html
          
  deploy:
    needs: security-checks
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    
    steps:
    - name: Deploy to production with security policies
      run: |
        # Apply network policies
        kubectl apply -f k8s/security/network-policies.yaml
        
        # Apply pod security policies
        kubectl apply -f k8s/security/pod-security-policy.yaml
        
        # Deploy with security context
        helm upgrade --install myapp ./helm-chart \
          --set securityContext.runAsNonRoot=true \
          --set securityContext.runAsUser=1000 \
          --set securityContext.readOnlyRootFilesystem=true \
          --namespace production
```

### Monitoring és Observability hiánya
Nincs megfelelő insight a production rendszerekbe.

**Hibás példa:**
```bash
# HIBÁS - No monitoring, reactive debugging
# Problem occurs in production...

# 1. User reports issue
echo "Users report slow response times"

# 2. Manual investigation
ssh user@prod-server
htop  # ❌ Ad-hoc monitoring
tail -f /var/log/myapp.log | grep ERROR  # ❌ Log digging

# 3. Guess-work debugging
# "Maybe it's a memory issue?"
free -h

# "Maybe it's database?"
mysql -e "SHOW PROCESSLIST"

# 4. Reactive fixes
sudo service myapp restart  # ❌ Random restart hope
```

**Helyes megoldás:**
```yaml
# HELYES - Comprehensive observability
# monitoring-stack.yml
version: '3.8'

services:
  # Metrics collection
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus:/etc/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.retention.time=30d'
      - '--web.enable-lifecycle'

  # Visualization
  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      GF_SECURITY_ADMIN_PASSWORD: admin
    volumes:
      - ./grafana/dashboards:/etc/grafana/provisioning/dashboards
      - ./grafana/datasources:/etc/grafana/provisioning/datasources

  # Log aggregation
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.15.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    ports:
      - "9200:9200"

  logstash:
    image: docker.elastic.co/logstash/logstash:7.15.0
    volumes:
      - ./logstash/pipeline:/usr/share/logstash/pipeline
    depends_on:
      - elasticsearch

  kibana:
    image: docker.elastic.co/kibana/kibana:7.15.0
    ports:
      - "5601:5601"
    environment:
      ELASTICSEARCH_HOSTS: http://elasticsearch:9200

  # Distributed tracing
  jaeger:
    image: jaegertracing/all-in-one:latest
    ports:
      - "16686:16686"
      - "14268:14268"
    environment:
      COLLECTOR_OTLP_ENABLED: true

  # Application performance monitoring
  apm-server:
    image: docker.elastic.co/apm/apm-server:7.15.0
    ports:
      - "8200:8200"
    volumes:
      - ./apm-server/apm-server.yml:/usr/share/apm-server/apm-server.yml
```

**Proactive Monitoring Implementation:**
```java
// Application with comprehensive observability
@RestController
@Slf4j
public class UserController {
    
    private final MeterRegistry meterRegistry;
    private final Tracer tracer;
    
    @PostMapping("/users")
    @Timed(name = "user.creation.time", description = "User creation time")
    public ResponseEntity<User> createUser(@RequestBody UserRequest request) {
        
        Span span = tracer.nextSpan().name("create-user").start();
        
        try (Tracer.SpanInScope ws = tracer.withSpanInScope(span)) {
            span.tag("user.type", request.getType());
            
            // Structured logging
            log.info("Creating user - email: {}, type: {}, request_id: {}", 
                request.getEmail(), 
                request.getType(), 
                MDC.get("requestId"));
            
            User user = userService.createUser(request);
            
            // Custom metrics
            meterRegistry.counter("users.created", 
                Tags.of("type", request.getType(), "status", "success")).increment();
                
            span.tag("user.id", user.getId().toString());
            span.tag("success", "true");
            
            return ResponseEntity.status(HttpStatus.CREATED).body(user);
            
        } catch (Exception e) {
            // Error tracking
            log.error("Failed to create user - email: {}, error: {}, request_id: {}", 
                request.getEmail(), 
                e.getMessage(), 
                MDC.get("requestId"), e);
                
            meterRegistry.counter("users.created", 
                Tags.of("type", request.getType(), "status", "error", 
                       "error.type", e.getClass().getSimpleName())).increment();
                       
            span.tag("error", e.getMessage());
            span.tag("success", "false");
            
            throw e;
        } finally {
            span.end();
        }
    }
}

// Alert configuration
@Configuration
public class AlertingConfig {
    
    @Bean
    public MeterRegistryCustomizer<MeterRegistry> alertingCustomizer() {
        return registry -> {
            // High error rate alert
            new AlertRule(registry)
                .name("high-error-rate")
                .condition(meterName -> meterName.startsWith("users.created") && 
                          meterName.getTag("status").equals("error"))
                .threshold(0.05) // 5% error rate
                .duration(Duration.ofMinutes(5))
                .action(this::sendAlert);
                
            // High response time alert  
            new AlertRule(registry)
                .name("high-response-time")
                .condition("user.creation.time")
                .percentile(0.95)
                .threshold(Duration.ofSeconds(2))
                .action(this::sendAlert);
        };
    }
    
    private void sendAlert(Alert alert) {
        // Slack notification
        slackService.sendAlert(alert);
        
        // PagerDuty for critical alerts
        if (alert.getSeverity() == CRITICAL) {
            pagerDutyService.triggerIncident(alert);
        }
    }
}
```

## Interjúkérdések

- **Mi a CI célja és hogyan működik?** — *Continuous Integration: automatikus kód integráció, build és testing minden commit után. Korai hibafeltárás és konfliktus megelőzés.*

- **Hogyan működik a Docker image build és mi a különbség a container és image között?** — *Image: read-only template layerekkel. Container: futó image instance writable layerrel.*

- **Mi a blue-green deployment és mikor használnád?** — *Két identikus production environment. Új verzió a green-re megy, átváltás után blue lesz idle. Zero-downtime deployment.*

- **Hogyan biztosítod a secrets kezelést DevOps pipeline-ban?** — *Vault, AWS Secrets Manager, Kubernetes secrets. Soha hardcode-olt secrets, environment variables vagy mount-olt secrets.*

- **Mi a Infrastructure as Code (IaC) előnye?** — *Verziózott, reprodukálható, auditálható infrastructure. Terraform, CloudFormation. Eliminates configuration drift.*

- **Hogyan implementálnál monitoring-ot egy microservice architektúrában?** — *Prometheus metrics, distributed tracing (Jaeger), centralized logging (ELK), health checks, circuit breakers.*

- **Mi a különbség rolling update és canary deployment között?** — *Rolling: fokozatos instance csere. Canary: kis % forgalom az új verzióra, majd gradual increase.*

- **Hogyan debuggolnál egy production deployment problémát?** — *Logs, metrics, tracing. Rollback first if critical. Post-mortem analysis. Runbook procedures.*

- **Mi a GitOps és előnyei?** — *Git mint single source of truth infrastructure-hez. Pull-based deployment, audit trail, rollback capability.*

- **Hogyan optimalizálnál Docker image size-ot?** — *Multi-stage builds, alpine images, .dockerignore, specific package versions, layer caching.*

- **Mi a service mesh és mikor használnád?** — *Istio, Linkerd. Service-to-service communication management, traffic routing, security policies microservice környezetben.*

- **Hogyan kezeled a database migration-öket CI/CD-ben?** — *Flyway, Liquibase. Versioned, incremental migrations. Rollback strategy. Test migrations staging-ben.*

## Gyakorlati feladat

Tervezz és implementálj komplett DevOps workflow-t egy web alkalmazáshoz:

**Követelmények:**
1. **Application**: Spring Boot REST API + React frontend
2. **CI/CD Pipeline**: GitHub Actions vagy GitLab CI
3. **Containerization**: Docker multi-stage builds
4. **Orchestration**: Kubernetes deployment
5. **Infrastructure**: Terraform AWS/GCP
6. **Monitoring**: Prometheus + Grafana + alerting
7. **Security**: Container scanning, secret management
8. **Database**: PostgreSQL with migrations

**Implementálandó komponensek:**
- Multi-stage Dockerfile optimalizálás
- Helm chart application deployment-hez
- Terraform infrastructure (VPC, EKS, RDS)
- CI/CD pipeline testing → security scan → build → deploy
- Monitoring stack setup és custom metrics
- Blue-green vagy canary deployment strategy
- Disaster recovery és backup automatizálás

**Deliverables:**
- Working CI/CD pipeline demonstrálása
- Infrastructure as Code files
- Monitoring dashboards és alerts
- Security scanning reports
- Documentation és runbooks

*Kapcsolódó gyakorlati feladat: [DevOps Pipeline Setup](/exercises/devops/01-cicd-pipeline)*

---

### Secrets Management {#secrets-management}

<div class="concept-section mental-model" data-filter="iac medior">

<details>
<summary>🧭 <strong>Így gondolj rá</strong></summary>

<div>

A Secrets Management olyan, mint egy **digitális bank széf**:
- **HashiCorp Vault** = **Főszéf** centralized secret storage-dzsel
- **Kubernetes Secrets** = **Kisebb páncélszekrények** application-level secrets-hez
- **Secret rotation** = **Rendszeres jelszóváltoztatás** automated módon
- **Access policies** = **Széf hozzáférési jogok** role-based permissions-ökkel
- **Audit logs** = **Biztonsági kamerák** who accessed what when

Soha **hardcode secrets**, mindig **secure vault**-ból fetch-elni runtime-ban.

</div>

</details>

</div>

<div class="concept-section why-important" data-filter="iac medior">

<details>
<summary>💡 <strong>Miért számít?</strong></summary>

<div>

- **Security compliance**: Sensitive data protection regulatory requirements szerint
- **Access control**: Granular permissions ki mit ér el és mikor
- **Secret rotation**: Automated credential updates security breach risk csökkentéséhez
- **Audit trail**: Complete logging secret access és changes tracking-jéhez

</div>

</details>

</div>

<div class="runnable-model" data-filter="iac">

<details>
<summary><strong>Runnable mental model</strong></summary>

<div>

**HashiCorp Vault setup:**
```yaml
# vault-docker-compose.yml
version: '3.8'

services:
  vault:
    image: vault:latest
    container_name: vault
    ports:
      - "8200:8200"
    environment:
      VAULT_DEV_ROOT_TOKEN_ID: myroot
      VAULT_DEV_LISTEN_ADDRESS: 0.0.0.0:8200
      VAULT_ADDR: http://0.0.0.0:8200
    cap_add:
      - IPC_LOCK
    volumes:
      - vault-data:/vault/data
      - ./vault-config:/vault/config
    command: ["vault", "server", "-dev"]

  vault-ui:
    image: djenriquez/vault-ui:latest
    container_name: vault-ui
    ports:
      - "8000:8000"
    environment:
      VAULT_URL_DEFAULT: http://vault:8200
      VAULT_AUTH_DEFAULT: TOKEN
    depends_on:
      - vault

volumes:
  vault-data:
```

**Vault configuration és secret management:**
```bash
#!/bin/bash
# vault-setup.sh

export VAULT_ADDR='http://localhost:8200'
export VAULT_TOKEN='myroot'

echo "=== Setting up Vault secrets ==="

# Enable secret engines
vault auth enable userpass
vault secrets enable -path=secret kv-v2
vault secrets enable database

# Create policies
vault policy write app-policy - <<EOF
path "secret/data/app/*" {
  capabilities = ["read"]
}

path "database/creds/app-db" {
  capabilities = ["read"]
}

path "auth/token/renew-self" {
  capabilities = ["update"]
}
EOF

vault policy write admin-policy - <<EOF
path "secret/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}

path "auth/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}

path "sys/policies/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}
EOF

# Create users
vault write auth/userpass/users/app-user \
    password=app-password \
    policies=app-policy

vault write auth/userpass/users/admin-user \
    password=admin-password \
    policies=admin-policy

# Store application secrets
vault kv put secret/app/database \
    host=postgres.internal \
    port=5432 \
    username=myapp \
    password=super-secret-db-password

vault kv put secret/app/redis \
    host=redis.internal \
    port=6379 \
    password=redis-auth-token

vault kv put secret/app/api-keys \
    stripe_key=sk_live_abcdef123456 \
    sendgrid_key=SG.xyz789 \
    jwt_secret=ultra-secure-jwt-signing-key

# Database secret engine configuration
vault write database/config/postgres \
    plugin_name=postgresql-database-plugin \
    connection_url="postgresql://{{username}}:{{password}}@postgres:5432/myapp?sslmode=disable" \
    allowed_roles="app-db" \
    username="vault" \
    password="vault-db-password"

# Database role for dynamic credentials
vault write database/roles/app-db \
    db_name=postgres \
    creation_statements="CREATE ROLE \"{{name}}\" WITH LOGIN PASSWORD '{{password}}' VALID UNTIL '{{expiration}}'; GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO \"{{name}}\";" \
    default_ttl="1h" \
    max_ttl="24h"

echo "Vault setup completed!"
```

**Kubernetes integration with Vault:**
```yaml
# vault-k8s-setup.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: vault-auth
  namespace: default

---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: role-tokenreview-binding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: system:auth-delegator
subjects:
- kind: ServiceAccount
  name: vault-auth
  namespace: default

---
# External Secrets Operator
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: vault-backend
  namespace: myapp
spec:
  provider:
    vault:
      server: "http://vault.vault:8200"
      path: "secret"
      version: "v2"
      auth:
        kubernetes:
          mountPath: "kubernetes"
          role: "myapp-role"
          serviceAccountRef:
            name: "myapp-sa"

---
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: app-secrets
  namespace: myapp
spec:
  refreshInterval: 15s
  secretStoreRef:
    name: vault-backend
    kind: SecretStore
  target:
    name: app-secrets
    creationPolicy: Owner
  data:
  - secretKey: database-url
    remoteRef:
      key: app/database
      property: host
  - secretKey: database-password
    remoteRef:
      key: app/database
      property: password
  - secretKey: redis-password
    remoteRef:
      key: app/redis
      property: password
  - secretKey: stripe-key
    remoteRef:
      key: app/api-keys
      property: stripe_key

---
# Vault Agent injector example
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  namespace: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      annotations:
        vault.hashicorp.com/agent-inject: "true"
        vault.hashicorp.com/role: "myapp-role"
        vault.hashicorp.com/agent-inject-secret-database: "secret/data/app/database"
        vault.hashicorp.com/agent-inject-template-database: |
          {{- with secret "secret/data/app/database" -}}
          DATABASE_HOST="{{ .Data.data.host }}"
          DATABASE_PORT="{{ .Data.data.port }}"
          DATABASE_USER="{{ .Data.data.username }}"
          DATABASE_PASSWORD="{{ .Data.data.password }}"
          {{- end }}
      labels:
        app: myapp
    spec:
      serviceAccountName: myapp-sa
      containers:
      - name: myapp
        image: myapp:latest
        ports:
        - containerPort: 8080
        env:
        - name: VAULT_ADDR
          value: "http://vault.vault:8200"
        volumeMounts:
        - name: secrets
          mountPath: /vault/secrets
          readOnly: true
        command:
        - sh
        - -c
        - |
          source /vault/secrets/database
          exec java -jar /app/myapp.jar
      volumes:
      - name: secrets
        emptyDir: {}
```

**Application integration (Spring Boot):**
```java
// VaultConfiguration.java
@Configuration
@EnableVaultRepositories
public class VaultConfiguration {

    @Bean
    public VaultTemplate vaultTemplate() {
        VaultEndpoint vaultEndpoint = VaultEndpoint.create("vault.internal", 8200);
        
        // Kubernetes authentication
        VaultTokenSupplier tokenSupplier = () -> {
            try {
                String jwt = Files.readString(Paths.get("/var/run/secrets/kubernetes.io/serviceaccount/token"));
                
                Map<String, String> requestBody = Map.of(
                    "role", "myapp-role",
                    "jwt", jwt
                );
                
                RestTemplate restTemplate = new RestTemplate();
                ResponseEntity<Map> response = restTemplate.postForEntity(
                    "http://vault.internal:8200/v1/auth/kubernetes/login",
                    requestBody,
                    Map.class
                );
                
                return (String) ((Map) response.getBody().get("auth")).get("client_token");
            } catch (Exception e) {
                throw new RuntimeException("Failed to authenticate with Vault", e);
            }
        };
        
        TokenAuthentication authentication = new TokenAuthentication(tokenSupplier);
        return new VaultTemplate(vaultEndpoint, authentication);
    }
}

// SecretService.java
@Service
public class SecretService {
    
    private final VaultTemplate vaultTemplate;
    
    public SecretService(VaultTemplate vaultTemplate) {
        this.vaultTemplate = vaultTemplate;
    }
    
    public String getDatabasePassword() {
        VaultResponse response = vaultTemplate.read("secret/data/app/database");
        return (String) response.getData().get("password");
    }
    
    public Map<String, Object> getApiKeys() {
        VaultResponse response = vaultTemplate.read("secret/data/app/api-keys");
        return response.getData();
    }
    
    public DatabaseCredentials getDynamicDatabaseCredentials() {
        VaultResponse response = vaultTemplate.read("database/creds/app-db");
        
        return DatabaseCredentials.builder()
            .username((String) response.getData().get("username"))
            .password((String) response.getData().get("password"))
            .leaseId(response.getLeaseId())
            .leaseDuration(response.getLeaseDuration())
            .build();
    }
    
    @Scheduled(fixedRate = 3600000) // 1 hour
    public void rotateSecrets() {
        log.info("Starting secret rotation...");
        
        // Refresh database credentials
        DatabaseCredentials newCreds = getDynamicDatabaseCredentials();
        
        // Update datasource with new credentials
        updateDataSource(newCreds);
        
        log.info("Secret rotation completed");
    }
    
    private void updateDataSource(DatabaseCredentials credentials) {
        // Implementation depends on your connection pool
        // e.g., HikariCP dynamic configuration update
    }
}

// DatabaseCredentials.java
@Data
@Builder
public class DatabaseCredentials {
    private String username;
    private String password;
    private String leaseId;
    private Duration leaseDuration;
}
```

**Secret rotation automation:**
```python
# secret-rotation.py
import hvac
import psycopg2
import logging
from datetime import datetime, timedelta
import schedule
import time

class SecretRotationManager:
    def __init__(self, vault_url, vault_token):
        self.vault_client = hvac.Client(url=vault_url, token=vault_token)
        self.logger = logging.getLogger(__name__)
        
    def rotate_database_password(self, secret_path, db_config):
        """Rotate database password with zero downtime"""
        try:
            # Generate new password
            new_password = self.generate_secure_password()
            
            # Get current credentials
            current_secret = self.vault_client.secrets.kv.v2.read_secret_version(
                path=secret_path
            )
            current_password = current_secret['data']['data']['password']
            username = current_secret['data']['data']['username']
            
            # Update password in database
            self.update_database_password(db_config, username, new_password)
            
            # Update secret in Vault
            secret_data = current_secret['data']['data'].copy()
            secret_data['password'] = new_password
            secret_data['rotated_at'] = datetime.utcnow().isoformat()
            
            self.vault_client.secrets.kv.v2.create_or_update_secret(
                path=secret_path,
                secret=secret_data
            )
            
            # Verify new password works
            self.verify_database_connection(db_config, username, new_password)
            
            self.logger.info(f"Successfully rotated password for {secret_path}")
            
        except Exception as e:
            self.logger.error(f"Failed to rotate password for {secret_path}: {e}")
            # Rollback if necessary
            self.rollback_password_change(db_config, username, current_password)
            raise
    
    def generate_secure_password(self, length=32):
        import secrets
        import string
        
        alphabet = string.ascii_letters + string.digits + "!@#$%^&*"
        return ''.join(secrets.choice(alphabet) for _ in range(length))
    
    def update_database_password(self, db_config, username, new_password):
        """Update password in PostgreSQL"""
        conn = psycopg2.connect(
            host=db_config['host'],
            port=db_config['port'],
            database=db_config['database'],
            user=db_config['admin_user'],
            password=db_config['admin_password']
        )
        
        with conn.cursor() as cursor:
            cursor.execute(
                "ALTER USER %s WITH PASSWORD %s",
                (username, new_password)
            )
        
        conn.commit()
        conn.close()
    
    def verify_database_connection(self, db_config, username, password):
        """Verify new password works"""
        conn = psycopg2.connect(
            host=db_config['host'],
            port=db_config['port'],
            database=db_config['database'],
            user=username,
            password=password
        )
        conn.close()
    
    def rollback_password_change(self, db_config, username, old_password):
        """Rollback password change if verification fails"""
        try:
            self.update_database_password(db_config, username, old_password)
            self.logger.info(f"Rolled back password for {username}")
        except Exception as e:
            self.logger.error(f"Failed to rollback password for {username}: {e}")

# Usage
if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    
    rotation_manager = SecretRotationManager(
        vault_url="http://vault.internal:8200",
        vault_token="s.abc123def456"
    )
    
    db_config = {
        'host': 'postgres.internal',
        'port': 5432,
        'database': 'myapp',
        'admin_user': 'postgres',
        'admin_password': 'admin-password'
    }
    
    # Schedule rotation every 30 days
    schedule.every(30).days.do(
        rotation_manager.rotate_database_password,
        secret_path="app/database",
        db_config=db_config
    )
    
    # Run immediately once for testing
    rotation_manager.rotate_database_password("app/database", db_config)
    
    # Keep running
    while True:
        schedule.run_pending()
        time.sleep(3600)  # Check every hour
```

**CI/CD integration with secrets:**
```yaml
# .github/workflows/deploy-with-secrets.yml
name: Deploy with Vault Secrets

on:
  push:
    branches: [main]

env:
  VAULT_ADDR: https://vault.company.com

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Import secrets from Vault
      uses: hashicorp/vault-action@v2.5.0
      with:
        url: ${{ env.VAULT_ADDR }}
        token: ${{ secrets.VAULT_TOKEN }}
        secrets: |
          secret/data/app/database password | DATABASE_PASSWORD;
          secret/data/app/api-keys stripe_key | STRIPE_API_KEY;
          secret/data/app/docker registry_password | DOCKER_PASSWORD
          
    - name: Build Docker image
      run: |
        echo $DOCKER_PASSWORD | docker login myregistry.com -u deployment-user --password-stdin
        docker build -t myregistry.com/myapp:${{ github.sha }} .
        docker push myregistry.com/myapp:${{ github.sha }}
        
    - name: Deploy to Kubernetes
      run: |
        # Create secret in Kubernetes from Vault
        kubectl create secret generic app-secrets \
          --from-literal=database-password="$DATABASE_PASSWORD" \
          --from-literal=stripe-key="$STRIPE_API_KEY" \
          --dry-run=client -o yaml | kubectl apply -f -
          
        # Deploy application
        kubectl set image deployment/myapp myapp=myregistry.com/myapp:${{ github.sha }}
        kubectl rollout status deployment/myapp
        
    - name: Cleanup
      if: always()
      run: |
        # Clear sensitive environment variables
        unset DATABASE_PASSWORD
        unset STRIPE_API_KEY
        unset DOCKER_PASSWORD
```

</div>

</details>

</div>

<div class="concept-section myths" data-filter="iac">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

❌ **"Kubernetes Secrets elég minden secret-hez"**  
✅ K8s Secrets base64 encoded, nem encrypted. External secret management (Vault) szükséges sensitive data-hoz

❌ **"Environment variables biztonságosak secrets-hez"**  
✅ Env vars process listában láthatók, mounted secrets vagy secret injection biztonságosabb

❌ **"Secret rotation túl komplex"**  
✅ Modern tools automated rotation-t biztosítanak, critical security practice

❌ **"Hardcoded secrets development-ben OK"**  
✅ Development is kell secure practices, credentials leakage prevention mindenhol

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="iac">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Vault basic operations:**
```bash
# Store secret
vault kv put secret/myapp password=secret123

# Read secret
vault kv get secret/myapp

# Generate dynamic credentials
vault read database/creds/myapp-role
```

**K8s secret check:**
```bash
# View secret (base64 encoded)
kubectl get secret app-secrets -o yaml

# Decode secret
kubectl get secret app-secrets -o jsonpath='{.data.password}' | base64 --decode
```

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="iac medior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Miért nem biztonságos secrets-eket environment variables-ben tárolni?**
A: Process list visibility, container inspection lehetősége, logging exposure risk. Mounted files vagy runtime injection biztonságosabb.

**Q: Mi az előnye dynamic secrets-nek static secrets-kel szemben?**
A: Automatic rotation, limited lifetime, audit trail, reduced attack surface. Compromise esetén automatic revocation.

**Q: Hogyan integráljál Vault-ot Kubernetes-szel?**
A: Vault Agent injector, External Secrets Operator, vagy CSI driver. Service account authentication, dynamic secret mounting.

**Q: Mikor rotálnád a secrets-eket?**
A: Regular schedule (30-90 days), after security incident, employee departure, compliance requirements.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="iac">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **Kubernetes** → Secret mounting és injection
- **CI/CD** → Automated secret deployment
- **Security compliance** → Audit és compliance requirements
- **Database management** → Dynamic credential generation
- **Infrastructure as Code** → Secret provisioning automation

</div>

</details>

</div>

---

### Environments {#environments}

<div class="concept-section mental-model" data-filter="pipeline junior">

<details>
<summary>🧭 <strong>Így gondolj rá</strong></summary>

<div>

Az Environments olyan, mint **különböző tesztpályák** autógyártásban:
- **Development** = **Garage workshop** ahol a fejlesztők szabadon kísérleteznek
- **Staging** = **Test track** production-like conditions-ökkel
- **Production** = **Public roads** ahol real users használják az alkalmazást

Minden environment **izolált**, **más konfigurációval**, és **különböző quality gates**-ekkel.

</div>

</details>

</div>

<div class="concept-section why-important" data-filter="pipeline junior">

<details>
<summary>💡 <strong>Miért számít?</strong></summary>

<div>

- **Risk mitigation**: Production deployment előtt multiple validation layers
- **Parallel development**: Különböző features fejlesztése egymás zavarása nélkül
- **Quality assurance**: Progressive validation increasing confidence minden environment-ben
- **Rollback safety**: Staging environment confidence production deployment-hez

</div>

</details>

</div>

<div class="runnable-model" data-filter="pipeline">

<details>
<summary><strong>Runnable mental model</strong></summary>

<div>

**Environment configuration strategy:**
```yaml
# config/environments.yml
environments:
  development:
    purpose: "Local development and feature testing"
    auto_deploy: true
    approval_required: false
    replicas: 1
    resources:
      cpu: "100m"
      memory: "256Mi"
    database:
      instance_type: "db.t3.micro"
      storage: "20GB"
      backup_retention: 1
    monitoring:
      enabled: true
      alert_severity: "warning"
    features:
      debug_mode: true
      verbose_logging: true
      experimental_features: true
      
  staging:
    purpose: "Pre-production testing and validation"
    auto_deploy: true
    approval_required: false
    replicas: 2
    resources:
      cpu: "250m"
      memory: "512Mi"
    database:
      instance_type: "db.t3.small"
      storage: "50GB"
      backup_retention: 3
    monitoring:
      enabled: true
      alert_severity: "critical"
    features:
      debug_mode: false
      verbose_logging: false
      experimental_features: true
    load_testing: true
    security_scanning: true
    
  production:
    purpose: "Live customer-facing environment"
    auto_deploy: false
    approval_required: true
    replicas: 5
    resources:
      cpu: "500m"
      memory: "1Gi"
    database:
      instance_type: "db.t3.large"
      storage: "200GB"
      backup_retention: 30
      read_replicas: 2
    monitoring:
      enabled: true
      alert_severity: "critical"
      on_call_rotation: true
    features:
      debug_mode: false
      verbose_logging: false
      experimental_features: false
    load_balancing: true
    cdn_enabled: true
    security_scanning: true
    penetration_testing: true
```

**Environment-specific deployment pipeline:**
```yaml
# .github/workflows/multi-environment.yml
name: Multi-Environment Deployment

on:
  push:
    branches:
      - main
      - develop
      - 'feature/*'
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  # Development environment - auto deploy feature branches
  deploy-dev:
    if: github.ref == 'refs/heads/develop' || startsWith(github.ref, 'refs/heads/feature/')
    runs-on: ubuntu-latest
    environment:
      name: development
      url: https://dev-${{ github.event.repository.name }}.company.com
      
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Set environment variables
      run: |
        echo "ENVIRONMENT=development" >> $GITHUB_ENV
        echo "NAMESPACE=dev-${{ github.event.repository.name }}" >> $GITHUB_ENV
        echo "SUBDOMAIN=dev" >> $GITHUB_ENV
        
    - name: Build and test
      run: |
        npm ci
        npm run test:unit
        npm run build
        
    - name: Build Docker image
      run: |
        docker build \
          --build-arg ENVIRONMENT=development \
          --tag $REGISTRY/$IMAGE_NAME:dev-${{ github.sha }} \
          .
          
    - name: Deploy to development
      run: |
        helm upgrade --install ${{ github.event.repository.name }}-dev ./helm-chart \
          --namespace $NAMESPACE \
          --create-namespace \
          --set environment=development \
          --set image.tag=dev-${{ github.sha }} \
          --set replicaCount=1 \
          --set ingress.host=$SUBDOMAIN-${{ github.event.repository.name }}.company.com \
          --set resources.requests.cpu=100m \
          --set resources.requests.memory=256Mi \
          --values helm-chart/values-dev.yaml \
          --wait --timeout=300s

  # Staging environment - auto deploy from develop branch  
  deploy-staging:
    if: github.ref == 'refs/heads/develop'
    needs: deploy-dev
    runs-on: ubuntu-latest
    environment:
      name: staging
      url: https://staging-${{ github.event.repository.name }}.company.com
      
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Set environment variables
      run: |
        echo "ENVIRONMENT=staging" >> $GITHUB_ENV
        echo "NAMESPACE=staging" >> $GITHUB_ENV
        
    - name: Integration tests
      run: |
        npm run test:integration
        npm run test:e2e -- --baseUrl=https://dev-${{ github.event.repository.name }}.company.com
        
    - name: Security scanning
      run: |
        npm audit --audit-level=moderate
        docker run --rm -v $PWD:/app securecodewarrior/docker-security-scanner /app
        
    - name: Build production-like image
      run: |
        docker build \
          --build-arg ENVIRONMENT=staging \
          --tag $REGISTRY/$IMAGE_NAME:staging-${{ github.sha }} \
          .
          
    - name: Deploy to staging
      run: |
        helm upgrade --install ${{ github.event.repository.name }}-staging ./helm-chart \
          --namespace staging \
          --create-namespace \
          --set environment=staging \
          --set image.tag=staging-${{ github.sha }} \
          --set replicaCount=2 \
          --set ingress.host=staging-${{ github.event.repository.name }}.company.com \
          --set resources.requests.cpu=250m \
          --set resources.requests.memory=512Mi \
          --values helm-chart/values-staging.yaml \
          --wait --timeout=300s
          
    - name: Load testing
      run: |
        k6 run tests/load/staging-load-test.js
        
    - name: Smoke tests
      run: |
        npm run test:smoke -- --baseUrl=https://staging-${{ github.event.repository.name }}.company.com

  # Production environment - manual approval required
  deploy-production:
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://${{ github.event.repository.name }}.company.com
      
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Set environment variables
      run: |
        echo "ENVIRONMENT=production" >> $GITHUB_ENV
        echo "NAMESPACE=production" >> $GITHUB_ENV
        
    - name: Full test suite
      run: |
        npm ci
        npm run test:all
        npm run test:performance
        
    - name: Security audit
      run: |
        npm audit --audit-level=high
        docker scout cves $REGISTRY/$IMAGE_NAME:latest
        
    - name: Build production image
      run: |
        docker build \
          --build-arg ENVIRONMENT=production \
          --tag $REGISTRY/$IMAGE_NAME:prod-${{ github.sha }} \
          --tag $REGISTRY/$IMAGE_NAME:latest \
          .
          
    - name: Production deployment (Blue-Green)
      run: |
        # Deploy green version
        helm upgrade --install ${{ github.event.repository.name }}-green ./helm-chart \
          --namespace production \
          --create-namespace \
          --set environment=production \
          --set image.tag=prod-${{ github.sha }} \
          --set replicaCount=5 \
          --set ingress.host=${{ github.event.repository.name }}.company.com \
          --set service.selector.version=green \
          --set resources.requests.cpu=500m \
          --set resources.requests.memory=1Gi \
          --values helm-chart/values-production.yaml \
          --wait --timeout=600s
          
        # Health check
        sleep 60
        curl -f https://green-${{ github.event.repository.name }}.company.com/actuator/health
        
        # Switch traffic to green
        kubectl patch service ${{ github.event.repository.name }} -n production \
          -p '{"spec":{"selector":{"version":"green"}}}'
          
        # Cleanup blue deployment after successful switch
        sleep 300  # Wait 5 minutes
        helm uninstall ${{ github.event.repository.name }}-blue -n production || true
        
    - name: Post-deployment verification
      run: |
        # Business critical health checks
        npm run test:critical-path -- --baseUrl=https://${{ github.event.repository.name }}.company.com
        
        # Performance baseline check
        k6 run tests/load/production-baseline.js
        
    - name: Notify stakeholders
      run: |
        # Slack notification
        curl -X POST -H 'Content-type: application/json' \
          --data '{"text":"🚀 Production deployment completed: ${{ github.event.repository.name }}@${{ github.sha }}"}' \
          ${{ secrets.SLACK_WEBHOOK_URL }}
```

**Environment promotion strategy:**
```bash
#!/bin/bash
# promote-environment.sh

set -e

ENVIRONMENT_FROM=${1:-staging}
ENVIRONMENT_TO=${2:-production}
VERSION=${3:-latest}

echo "=== Promoting from $ENVIRONMENT_FROM to $ENVIRONMENT_TO ==="

# Validation checks
validate_environment() {
    local env=$1
    echo "Validating $env environment..."
    
    # Health check
    curl -f "https://$env.myapp.com/actuator/health" || {
        echo "❌ Health check failed for $env"
        exit 1
    }
    
    # Performance check
    RESPONSE_TIME=$(curl -o /dev/null -s -w '%{time_total}' "https://$env.myapp.com/api/users")
    if (( $(echo "$RESPONSE_TIME > 2.0" | bc -l) )); then
        echo "❌ Response time too high: ${RESPONSE_TIME}s"
        exit 1
    fi
    
    # Database connectivity
    kubectl exec -n $env deployment/myapp -- /bin/sh -c \
        "curl -f http://localhost:8080/actuator/health/db" || {
        echo "❌ Database check failed for $env"
        exit 1
    }
    
    echo "✅ $env environment validation passed"
}

# Smoke tests
run_smoke_tests() {
    local env=$1
    echo "Running smoke tests against $env..."
    
    npm run test:smoke -- --baseUrl="https://$env.myapp.com" || {
        echo "❌ Smoke tests failed for $env"
        exit 1
    }
    
    echo "✅ Smoke tests passed for $env"
}

# Environment comparison
compare_environments() {
    echo "Comparing $ENVIRONMENT_FROM and $ENVIRONMENT_TO configurations..."
    
    # Get current versions
    FROM_VERSION=$(kubectl get deployment myapp -n $ENVIRONMENT_FROM -o jsonpath='{.spec.template.spec.containers[0].image}' | cut -d: -f2)
    TO_VERSION=$(kubectl get deployment myapp -n $ENVIRONMENT_TO -o jsonpath='{.spec.template.spec.containers[0].image}' | cut -d: -f2)
    
    echo "Current versions:"
    echo "  $ENVIRONMENT_FROM: $FROM_VERSION"
    echo "  $ENVIRONMENT_TO: $TO_VERSION"
    
    # Compare configurations
    diff <(kubectl get configmap myapp-config -n $ENVIRONMENT_FROM -o yaml) \
         <(kubectl get configmap myapp-config -n $ENVIRONMENT_TO -o yaml) || true
}

# Promotion execution
promote_version() {
    echo "Promoting version $VERSION from $ENVIRONMENT_FROM to $ENVIRONMENT_TO..."
    
    # Update image tag
    kubectl set image deployment/myapp \
        myapp=myregistry.com/myapp:$VERSION \
        -n $ENVIRONMENT_TO
        
    # Wait for rollout
    kubectl rollout status deployment/myapp -n $ENVIRONMENT_TO --timeout=600s
    
    # Verify deployment
    kubectl get pods -n $ENVIRONMENT_TO -l app=myapp
    
    echo "✅ Promotion completed successfully"
}

# Main execution flow
main() {
    echo "Starting environment promotion workflow..."
    
    # Validate source environment
    validate_environment $ENVIRONMENT_FROM
    run_smoke_tests $ENVIRONMENT_FROM
    
    # Compare environments
    compare_environments
    
    # Confirm promotion
    if [ "$ENVIRONMENT_TO" = "production" ]; then
        echo "⚠️  Promoting to PRODUCTION environment"
        read -p "Are you sure you want to continue? (yes/no): " confirmation
        if [ "$confirmation" != "yes" ]; then
            echo "Promotion cancelled"
            exit 0
        fi
    fi
    
    # Execute promotion
    promote_version
    
    # Validate target environment
    sleep 30  # Allow time for startup
    validate_environment $ENVIRONMENT_TO
    run_smoke_tests $ENVIRONMENT_TO
    
    echo "🎉 Environment promotion completed successfully!"
}

# Run main function
main "$@"
```

**Environment-specific configuration management:**
```yaml
# helm-chart/values-dev.yaml
replicaCount: 1
environment: development

image:
  pullPolicy: Always

ingress:
  annotations:
    nginx.ingress.kubernetes.io/auth-type: basic
    nginx.ingress.kubernetes.io/auth-secret: dev-basic-auth

database:
  enabled: true
  persistence:
    size: 1Gi
    
monitoring:
  enabled: true
  alerting:
    enabled: false

autoscaling:
  enabled: false

---
# helm-chart/values-staging.yaml  
replicaCount: 2
environment: staging

image:
  pullPolicy: IfNotPresent
  
resources:
  requests:
    cpu: 250m
    memory: 512Mi
  limits:
    cpu: 500m
    memory: 1Gi

database:
  enabled: true
  persistence:
    size: 10Gi
    storageClass: fast

monitoring:
  enabled: true
  alerting:
    enabled: true
    severity: warning

autoscaling:
  enabled: true
  minReplicas: 2
  maxReplicas: 5

---
# helm-chart/values-production.yaml
replicaCount: 5
environment: production

image:
  pullPolicy: IfNotPresent
  
resources:
  requests:
    cpu: 500m
    memory: 1Gi
  limits:
    cpu: 1000m
    memory: 2Gi

database:
  enabled: true
  persistence:
    size: 100Gi
    storageClass: premium-ssd
  backup:
    enabled: true
    retention: 30

monitoring:
  enabled: true
  alerting:
    enabled: true
    severity: critical
    pagerduty: true

autoscaling:
  enabled: true
  minReplicas: 3
  maxReplicas: 20
  
security:
  networkPolicies: true
  podSecurityPolicy: true
```

</div>

</details>

</div>

<div class="concept-section myths" data-filter="pipeline">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

❌ **"Development environment nem fontos"**  
✅ Dev environment quality közvetlenül befolyásolja a developer productivity-t és code quality-t

❌ **"Staging ugyanaz, mint production"**  
✅ Staging production-like, de nem identical. Different scale, data, és configuration

❌ **"Environment-ek közti promotion automatikus"**  
✅ Minden environment promotion validation és approval gates-ekkel rendelkezik

❌ **"Configuration drift nem probléma"**  
✅ Environment configuration consistency kritikus a predictable deployments-hez

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="pipeline">

<details>
<summary>📚 <strong>5 perces mikro-tanulás</strong></summary>

<div>

**Environment health check:**
```bash
# Quick environment status
kubectl get pods -n production
kubectl get ingress -n production
curl -f https://production.myapp.com/actuator/health
```

**Configuration comparison:**
```bash
# Compare configurations between environments
diff <(kubectl get configmap app-config -n staging -o yaml) \
     <(kubectl get configmap app-config -n production -o yaml)
```

</div>

</details>

</div>

<div class="concept-section interview-pitfalls" data-filter="pipeline junior">

<details>
<summary>💼 <strong>Interjú kérdések</strong></summary>

<div>

**Q: Milyen environment-eket használnál és miért?**
A: Dev (fejlesztés), Staging (pre-prod testing), Production (live users). Minden environment különböző purpose és configuration.

**Q: Hogyan biztosítod az environment consistency-t?**
A: Infrastructure as Code, configuration management, automated deployment pipelines, environment promotion processes.

**Q: Mikor deployoljál automatically vs manually?**
A: Auto deploy dev/staging, manual approval production. Risk vs velocity trade-off based on environment criticality.

**Q: Hogyan kezelnéd az environment-specific configurations-öket?**
A: Separate config files, environment variables, ConfigMaps/Secrets, feature flags, Helm values per environment.

</div>

</details>

</div>

<div class="concept-section connection-map" data-filter="pipeline">

<details>
<summary>🔗 <strong>Kapcsolati térkép</strong></summary>

<div>

**Kapcsolódó fogalmak:**
- **CI/CD pipelines** → Environment promotion automation
- **Configuration management** → Environment-specific settings
- **Infrastructure as Code** → Environment provisioning
- **Testing strategies** → Environment-specific test execution
- **Monitoring** → Environment health és performance tracking

</div>

</details>

</div>

---

## Kapcsolódó témák

- [Git & Verziókezelés](/theory/git) – Version control, branching strategies
- [Tesztelés](/theory/testing) – Automated testing, test automation in CI/CD
- [Szoftver Architektúra](/theory/arch) – Microservices, scalable systems
- [Java Alapok](/theory/java) – Application development best practices
- [Frontend](/theory/frontend) – Frontend build and deployment strategies

## További olvasmányok

- [The DevOps Handbook](https://itrevolution.com/the-devops-handbook/) – DevOps principles and practices
- [Kubernetes Documentation](https://kubernetes.io/docs/) – Container orchestration
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/) – Container optimization
- [Terraform Documentation](https://www.terraform.io/docs) – Infrastructure as Code
- [Prometheus Monitoring](https://prometheus.io/docs/) – Metrics and monitoring
- [The Site Reliability Engineering Book](https://sre.google/sre-book/table-of-contents/) – Google SRE practices
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/) – Cloud architecture best practices
- [CNCF Landscape](https://landscape.cncf.io/) – Cloud native technologies overview
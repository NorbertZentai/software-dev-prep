# CI/CD & DevOps

## Brief Summary

DevOps is a cultural and technological approach to improve collaboration between development and operations teams. CI/CD (Continuous Integration/Continuous Deployment) provides automated pipelines for code integration, testing, and deployment. Modern DevOps stack: Git, Docker, Kubernetes, Jenkins, GitLab CI, GitHub Actions. Infrastructure as Code (IaC) tools: Terraform, Ansible, CloudFormation. Monitoring and observability: Prometheus, Grafana, ELK stack, Jaeger. Containerization and orchestration are fundamental. Main benefits: faster release cycles, automated quality gates, scalable infrastructure. Challenges: cultural change, tooling complexity, security integration, cost optimization.

## Concepts

### Continuous Integration (CI) Fundamentals {#continuous-integration}

<div class="concept-section definition">

📋 **Concept Definition**  
**Practice of frequently integrating code changes** to shared repository with automated verification. **Workflow**: developer commits → automated build → unit tests → integration tests → static analysis → artifact creation. **Build tools**: Jenkins, GitLab CI, GitHub Actions, CircleCI, Travis CI. **Success criteria**: build must complete in <10 minutes, all tests pass, code quality gates met. **Benefits**: early bug detection (shift-left testing), reduced integration conflicts, continuous feedback. **Challenges**: test suite maintenance, flaky tests, build infrastructure costs. **Best practices**: commit daily, keep builds fast, fix broken builds immediately, fail fast on errors.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Early error detection**: Problems identified minutes after commit, not days later
- **Merge conflict elimination**: Frequent integration reduces code conflicts
- **Code quality assurance**: Automated quality checks on every change
- **Team productivity**: Developers immediately know if they broke something

</div>

<div class="runnable-model">

**Runnable mental model**
```yaml
# GITHUB ACTIONS CI WORKFLOW
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
        java-version: [11, 17, 21]
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      with:
        fetch-depth: 0  # Full history for better analysis
      
    - name: Setup Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
        
    - name: Setup Java ${{ matrix.java-version }}
      uses: actions/setup-java@v4
      with:
        java-version: ${{ matrix.java-version }}
        distribution: 'temurin'
        cache: 'maven'
    
    - name: Install dependencies
      run: |
        npm ci
        mvn clean compile
    
    - name: Code quality analysis
      run: |
        npm run lint
        npm run format:check
        mvn checkstyle:check
    
    - name: Security scanning
      run: |
        npm audit --audit-level high
        mvn org.owasp:dependency-check-maven:check
    
    - name: Unit tests
      run: |
        npm test -- --coverage --watchAll=false
        mvn test
    
    - name: Integration tests
      run: |
        npm run test:integration
        mvn verify -Pintegration-tests
    
    - name: Build application
      run: |
        npm run build
        mvn clean package
    
    - name: Upload coverage reports
      uses: codecov/codecov-action@v3
      with:
        files: ./coverage/lcov.info,./target/site/jacoco/jacoco.xml
        fail_ci_if_error: true
    
    - name: Archive artifacts
      uses: actions/upload-artifact@v4
      with:
        name: build-artifacts-${{ matrix.node-version }}-${{ matrix.java-version }}
        path: |
          dist/
          target/*.jar
        retention-days: 30

# GITLAB CI PIPELINE
stages:
  - validate
  - build
  - test
  - security
  - package
  - deploy

variables:
  MAVEN_OPTS: "-Dmaven.repo.local=$CI_PROJECT_DIR/.m2/repository"
  MAVEN_CLI_OPTS: "--batch-mode --errors --fail-at-end --show-version"

cache:
  paths:
    - .m2/repository/
    - node_modules/

validate:
  stage: validate
  image: maven:3.8.6-openjdk-11
  script:
    - mvn $MAVEN_CLI_OPTS validate
    - mvn $MAVEN_CLI_OPTS compile
  only:
    - merge_requests
    - main
    - develop

lint-and-format:
  stage: validate
  image: node:18-alpine
  script:
    - npm ci
    - npm run lint
    - npm run format:check
  artifacts:
    reports:
      junit: lint-results.xml

build:
  stage: build
  image: maven:3.8.6-openjdk-11
  script:
    - mvn $MAVEN_CLI_OPTS clean compile
    - npm ci
    - npm run build
  artifacts:
    paths:
      - target/
      - dist/
    expire_in: 1 hour

unit-tests:
  stage: test
  image: maven:3.8.6-openjdk-11
  services:
    - postgres:13
    - redis:6
  variables:
    POSTGRES_DB: testdb
    POSTGRES_USER: testuser
    POSTGRES_PASSWORD: testpass
  script:
    - mvn $MAVEN_CLI_OPTS test
    - npm run test:coverage
  artifacts:
    reports:
      junit:
        - target/surefire-reports/TEST-*.xml
        - test-results.xml
      coverage_report:
        coverage_format: cobertura
        path: target/site/cobertura/coverage.xml
  coverage: '/Total.*?([0-9]{1,3})%/'

integration-tests:
  stage: test
  image: maven:3.8.6-openjdk-11
  services:
    - docker:dind
  variables:
    DOCKER_DRIVER: overlay2
  script:
    - mvn $MAVEN_CLI_OPTS verify -Pintegration-tests
    - npm run test:e2e
  artifacts:
    reports:
      junit: target/failsafe-reports/TEST-*.xml

security-scan:
  stage: security
  image: owasp/dependency-check:latest
  script:
    - dependency-check.sh --project "MyApp" --scan . --format XML --out .
    - npm audit --audit-level high
  artifacts:
    reports:
      dependency_scanning: dependency-check-report.xml
  allow_failure: false

# JENKINS PIPELINE (Jenkinsfile)
pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'my-registry.com'
        IMAGE_NAME = 'myapp'
        SONAR_TOKEN = credentials('sonar-token')
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    env.GIT_COMMIT_SHORT = sh(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()
                }
            }
        }
        
        stage('Build') {
            parallel {
                stage('Backend') {
                    steps {
                        sh './mvnw clean compile'
                    }
                }
                stage('Frontend') {
                    steps {
                        sh 'npm ci'
                        sh 'npm run build'
                    }
                }
            }
        }
        
        stage('Test') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        sh './mvnw test'
                        sh 'npm run test:unit'
                    }
                    post {
                        always {
                            publishTestResults testResultsPattern: '**/target/surefire-reports/*.xml'
                            publishCoverage adapters: [
                                jacocoAdapter('target/site/jacoco/jacoco.xml')
                            ], sourceFileResolver: sourceFiles('STORE_LAST_BUILD')
                        }
                    }
                }
                stage('Integration Tests') {
                    steps {
                        sh './mvnw verify -Pintegration-tests'
                    }
                }
                stage('Security Tests') {
                    steps {
                        sh 'npm audit'
                        sh './mvnw org.owasp:dependency-check-maven:check'
                    }
                }
            }
        }
        
        stage('Code Quality') {
            when {
                anyOf {
                    branch 'main'
                    changeRequest()
                }
            }
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh './mvnw sonar:sonar -Dsonar.login=${SONAR_TOKEN}'
                }
            }
        }
        
        stage('Quality Gate') {
            when {
                anyOf {
                    branch 'main'
                    changeRequest()
                }
            }
            steps {
                timeout(time: 1, unit: 'HOURS') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        
        stage('Package') {
            when {
                branch 'main'
            }
            steps {
                sh './mvnw clean package -DskipTests'
                sh '''
                    docker build -t ${DOCKER_REGISTRY}/${IMAGE_NAME}:${GIT_COMMIT_SHORT} .
                    docker build -t ${DOCKER_REGISTRY}/${IMAGE_NAME}:latest .
                '''
            }
        }
        
        stage('Deploy to Staging') {
            when {
                branch 'main'
            }
            steps {
                sh '''
                    docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}:${GIT_COMMIT_SHORT}
                    kubectl set image deployment/myapp-staging myapp=${DOCKER_REGISTRY}/${IMAGE_NAME}:${GIT_COMMIT_SHORT} -n staging
                    kubectl rollout status deployment/myapp-staging -n staging
                '''
            }
        }
        
        stage('Production Deployment Approval') {
            when {
                branch 'main'
            }
            steps {
                input message: 'Deploy to production?', 
                      parameters: [
                          choice(name: 'DEPLOY_TO_PROD', 
                                choices: ['No', 'Yes'], 
                                description: 'Choose whether to deploy to production')
                      ]
            }
        }
        
        stage('Deploy to Production') {
            when {
                allOf {
                    branch 'main'
                    environment name: 'DEPLOY_TO_PROD', value: 'Yes'
                }
            }
            steps {
                sh '''
                    kubectl set image deployment/myapp-prod myapp=${DOCKER_REGISTRY}/${IMAGE_NAME}:${GIT_COMMIT_SHORT} -n production
                    kubectl rollout status deployment/myapp-prod -n production
                '''
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            slackSend channel: '#deployments',
                     color: 'good',
                     message: "✅ Pipeline succeeded for ${env.JOB_NAME} - ${env.BUILD_NUMBER}"
        }
        failure {
            slackSend channel: '#deployments',
                     color: 'danger',
                     message: "❌ Pipeline failed for ${env.JOB_NAME} - ${env.BUILD_NUMBER}"
        }
    }
}
```
*Notice: CI pipelines automate build, test, and quality checks to catch issues early and maintain code quality.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Common myths / misconceptions</strong></summary>

<div>

- "CI is just about running tests" → CI includes build validation, security scanning, code quality checks
- "CI slows down development" → Properly configured CI accelerates development by catching issues early
- "CI is only for large teams" → Even solo developers benefit from automated validation and feedback

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Version Control` · `Automated Testing` · `Code Quality` · `Continuous Deployment` · `Pipeline Orchestration`

</div>

### Continuous Deployment (CD) {#continuous-deployment}

<div class="concept-section definition">

📋 **Concept Definition**  
**Automated release of validated changes to production** without manual intervention. **vs Continuous Delivery**: CD deploys automatically, Continuous Delivery requires manual approval. **Pipeline stages**: CI pipeline → staging deployment → automated acceptance tests → production deployment. **Deployment strategies**: blue-green (two environments, instant switch), canary (gradual rollout), rolling update. **Prerequisites**: comprehensive automated tests, robust monitoring, fast rollback mechanisms. **Feature toggles**: deploy code disabled, enable for users incrementally. **Tools**: Spinnaker, ArgoCD, Flux, AWS CodeDeploy. **Risk mitigation**: small batches, feature flags, progressive delivery.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Faster time to market**: Features reach users immediately after development
- **Reduced deployment risk**: Small, frequent deployments are less risky than big releases
- **Immediate feedback**: Real user feedback on new features within hours
- **Elimination of deployment bottlenecks**: No waiting for manual deployment windows

</div>

<div class="runnable-model">

**Runnable mental model**
```yaml
# ADVANCED CD PIPELINE with multiple environments
name: Continuous Deployment

on:
  push:
    branches: [ main ]
  workflow_run:
    workflows: ["Continuous Integration"]
    types: [completed]
    branches: [ main ]

jobs:
  deploy-staging:
    if: ${{ github.event.workflow_run.conclusion == 'success' }}
    runs-on: ubuntu-latest
    environment: staging
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v4
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1
    
    - name: Login to Amazon ECR
      id: login-ecr
      uses: aws-actions/amazon-ecr-login@v2
    
    - name: Build and push Docker image
      env:
        ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
        ECR_REPOSITORY: myapp
        IMAGE_TAG: ${{ github.sha }}
      run: |
        docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
        docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:staging .
        docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
        docker push $ECR_REGISTRY/$ECR_REPOSITORY:staging
    
    - name: Deploy to EKS staging
      env:
        ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
        ECR_REPOSITORY: myapp
        IMAGE_TAG: ${{ github.sha }}
      run: |
        aws eks update-kubeconfig --name staging-cluster --region us-east-1
        kubectl set image deployment/myapp myapp=$ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG -n staging
        kubectl rollout status deployment/myapp -n staging --timeout=300s
    
    - name: Run smoke tests
      run: |
        npm run test:smoke -- --baseUrl=https://staging.myapp.com
    
    - name: Notify Slack
      uses: 8398a7/action-slack@v3
      with:
        status: ${{ job.status }}
        channel: '#deployments'
        webhook_url: ${{ secrets.SLACK_WEBHOOK }}

  production-readiness-check:
    needs: deploy-staging
    runs-on: ubuntu-latest
    outputs:
      deploy-to-prod: ${{ steps.readiness.outputs.ready }}
    
    steps:
    - name: Check production readiness
      id: readiness
      run: |
        # Check if staging deployment is stable
        STAGING_HEALTH=$(curl -s https://staging.myapp.com/health | jq -r '.status')
        
        # Check if there are any critical alerts
        CRITICAL_ALERTS=$(curl -s -H "Authorization: Bearer ${{ secrets.MONITORING_API_TOKEN }}" \
          "https://monitoring.myapp.com/api/alerts?severity=critical" | jq length)
        
        if [[ "$STAGING_HEALTH" == "healthy" && "$CRITICAL_ALERTS" == "0" ]]; then
          echo "ready=true" >> $GITHUB_OUTPUT
        else
          echo "ready=false" >> $GITHUB_OUTPUT
        fi

  deploy-production:
    needs: production-readiness-check
    if: needs.production-readiness-check.outputs.deploy-to-prod == 'true'
    runs-on: ubuntu-latest
    environment: production
    
    steps:
    - name: Deploy to production with canary strategy
      env:
        ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
        ECR_REPOSITORY: myapp
        IMAGE_TAG: ${{ github.sha }}
      run: |
        aws eks update-kubeconfig --name production-cluster --region us-east-1
        
        # Canary deployment - 10% traffic
        kubectl patch deployment myapp-canary \
          -p '{"spec":{"template":{"spec":{"containers":[{"name":"myapp","image":"'$ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG'"}]}}}}' \
          -n production
        
        kubectl rollout status deployment/myapp-canary -n production --timeout=300s
        
        # Wait for canary metrics
        sleep 300
        
        # Check canary metrics
        ERROR_RATE=$(curl -s "https://monitoring.myapp.com/api/query?query=rate(http_requests_total{status=~\"5..\",deployment=\"canary\"}[5m])" | jq -r '.data.result[0].value[1]')
        
        if (( $(echo "$ERROR_RATE < 0.01" | bc -l) )); then
          # Promote canary to full deployment
          kubectl patch deployment myapp \
            -p '{"spec":{"template":{"spec":{"containers":[{"name":"myapp","image":"'$ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG'"}]}}}}' \
            -n production
          
          kubectl rollout status deployment/myapp -n production --timeout=600s
          
          # Scale down canary
          kubectl scale deployment myapp-canary --replicas=0 -n production
        else
          # Rollback canary
          kubectl scale deployment myapp-canary --replicas=0 -n production
          exit 1
        fi

# TERRAFORM INFRASTRUCTURE DEPLOYMENT
name: Infrastructure Deployment

on:
  push:
    paths:
      - 'infrastructure/**'
    branches: [ main ]

jobs:
  terraform:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
    
    - name: Setup Terraform
      uses: hashicorp/setup-terraform@v3
      with:
        terraform_version: 1.5.0
        cli_config_credentials_token: ${{ secrets.TF_API_TOKEN }}
    
    - name: Terraform Format Check
      run: terraform fmt -check -recursive
      working-directory: ./infrastructure
    
    - name: Terraform Init
      run: terraform init
      working-directory: ./infrastructure
    
    - name: Terraform Validate
      run: terraform validate
      working-directory: ./infrastructure
    
    - name: Terraform Plan
      run: terraform plan -out=tfplan
      working-directory: ./infrastructure
      env:
        TF_VAR_environment: production
        TF_VAR_aws_region: us-east-1
    
    - name: Terraform Apply
      if: github.ref == 'refs/heads/main'
      run: terraform apply tfplan
      working-directory: ./infrastructure

# BLUE-GREEN DEPLOYMENT STRATEGY
name: Blue-Green Deployment

jobs:
  deploy-green:
    runs-on: ubuntu-latest
    
    steps:
    - name: Deploy to green environment
      run: |
        # Deploy new version to green environment
        kubectl apply -f k8s/green-deployment.yaml
        kubectl rollout status deployment/myapp-green -n production
        
        # Run comprehensive tests on green
        npm run test:e2e -- --baseUrl=https://green.myapp.com
        npm run test:load -- --baseUrl=https://green.myapp.com
    
    - name: Switch traffic to green
      run: |
        # Switch load balancer to green
        kubectl patch service myapp-service \
          -p '{"spec":{"selector":{"version":"green"}}}' \
          -n production
        
        # Wait for traffic switch
        sleep 60
        
        # Monitor green environment
        HEALTH_CHECK=$(curl -s https://myapp.com/health | jq -r '.status')
        ERROR_RATE=$(curl -s "https://monitoring.myapp.com/api/query?query=rate(http_requests_total{status=~\"5..\"}[5m])" | jq -r '.data.result[0].value[1]')
        
        if [[ "$HEALTH_CHECK" != "healthy" ]] || (( $(echo "$ERROR_RATE > 0.01" | bc -l) )); then
          # Rollback to blue
          kubectl patch service myapp-service \
            -p '{"spec":{"selector":{"version":"blue"}}}' \
            -n production
          exit 1
        fi
    
    - name: Cleanup blue environment
      run: |
        # Keep blue for 24h in case of issues
        kubectl scale deployment myapp-blue --replicas=1 -n production
        
        # Schedule blue cleanup job
        echo "kubectl delete deployment myapp-blue -n production" | at now + 24 hours
```
*Notice: CD pipelines automate deployments with safety checks, monitoring, and rollback capabilities.*

</div>

<div class="concept-section best-practices">

<details>
<summary>✅ <strong>CD best practices</strong></summary>

<div>

- **Automated rollback**: Implement automatic rollback on failure detection
- **Deployment strategies**: Use canary, blue-green, or rolling deployments
- **Environment parity**: Keep staging and production environments identical
- **Monitoring**: Comprehensive monitoring and alerting for deployments
- **Feature flags**: Decouple deployment from feature activation

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Deployment Strategies` · `Infrastructure as Code` · `Monitoring` · `Rollback Mechanisms` · `Environment Management`

</div>

### Docker Containerization {#docker}

<div class="concept-section definition">

📋 **Concept Definition**  
**Containerization platform** packaging application with dependencies into isolated, portable units. **Components**: Docker Engine (daemon), Images (immutable templates), Containers (running instances), Dockerfile (build instructions), Registry (Docker Hub, private registries). **vs VMs**: shares kernel (lighter), process-level isolation, faster startup. **Layered filesystem**: copy-on-write, image layers cached and reused. **Networking**: bridge (default), host (no isolation), overlay (multi-host). **Volumes**: persist data beyond container lifecycle. **Security**: namespaces, cgroups, capabilities, seccomp. **Multi-stage builds**: optimize image size. **Best practices**: minimal base images (Alpine), non-root users, .dockerignore, health checks.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Environment consistency**: "Works on my machine" problems eliminated
- **Dependency isolation**: No more conflicting package versions
- **Scalability**: Easy horizontal scaling and orchestration
- **Resource efficiency**: Lightweight compared to virtual machines

</div>

<div class="runnable-model">

**Runnable mental model**
```dockerfile
# MULTI-STAGE DOCKER BUILD for Java Spring Boot app
# Stage 1: Build stage
FROM maven:3.8.6-openjdk-17-slim AS builder

WORKDIR /app

# Copy dependency files first for better layer caching
COPY pom.xml ./
COPY src/main/resources/application.yml ./src/main/resources/

# Download dependencies (cached if pom.xml doesn't change)
RUN mvn dependency:go-offline -B

# Copy source code and build
COPY src ./src
RUN mvn clean package -DskipTests -B

# Stage 2: Runtime stage
FROM openjdk:17-jre-slim

# Create non-root user for security
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Install necessary packages
RUN apt-get update && apt-get install -y \
    curl \
    dumb-init \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy built jar from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Change ownership to non-root user
RUN chown -R appuser:appuser /app
USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/actuator/health || exit 1

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]
CMD ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]

# NODEJS APPLICATION DOCKERFILE
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Install dumb-init for signal handling
RUN apk add --no-cache dumb-init

# Create app user
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

WORKDIR /app

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

USER nextjs

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s CMD \
    curl -f http://localhost:3000/health || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/server.js"]

# DOCKER COMPOSE for development environment
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
      target: development
    ports:
      - "8080:8080"
      - "5005:5005"  # Debug port
    environment:
      - SPRING_PROFILES_ACTIVE=docker
      - SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/myapp
      - SPRING_REDIS_HOST=redis
      - JAVA_TOOL_OPTIONS=-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005
    volumes:
      - .:/app
      - maven-cache:/root/.m2
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - app-network
    restart: unless-stopped

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: myapp
      POSTGRES_PASSWORD: myapp_password
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U myapp"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    command: redis-server --appendonly yes
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 5
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    networks:
      - app-network

  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus-data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
    networks:
      - app-network

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin123
    volumes:
      - grafana-data:/var/lib/grafana
      - ./monitoring/grafana/dashboards:/etc/grafana/provisioning/dashboards
      - ./monitoring/grafana/datasources:/etc/grafana/provisioning/datasources
    depends_on:
      - prometheus
    networks:
      - app-network

volumes:
  postgres-data:
  redis-data:
  maven-cache:
  prometheus-data:
  grafana-data:

networks:
  app-network:
    driver: bridge

# ADVANCED DOCKERFILE with security best practices
FROM node:18-alpine AS base

# Install security updates
RUN apk update && apk upgrade && apk add --no-cache dumb-init

# Create app directory and user
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001 -G nodejs
WORKDIR /app
RUN chown nodejs:nodejs /app

FROM base AS deps
USER nodejs
COPY --chown=nodejs:nodejs package*.json ./
RUN npm ci --only=production && npm cache clean --force

FROM base AS build
USER nodejs
COPY --chown=nodejs:nodejs package*.json ./
RUN npm ci
COPY --chown=nodejs:nodejs . .
RUN npm run build

FROM base AS runtime
USER nodejs

# Copy production dependencies
COPY --from=deps --chown=nodejs:nodejs /app/node_modules ./node_modules

# Copy built application
COPY --from=build --chown=nodejs:nodejs /app/dist ./dist
COPY --chown=nodejs:nodejs package.json ./

# Security: Don't run as root, limit capabilities
USER nodejs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/index.js"]

# DOCKER SECURITY SCANNING
docker build -t myapp:latest .
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
    aquasec/trivy image myapp:latest

# Container resource limits
docker run -d \
    --name myapp \
    --memory="512m" \
    --cpus="1.0" \
    --restart=unless-stopped \
    --read-only \
    --tmpfs /tmp \
    --security-opt=no-new-privileges:true \
    myapp:latest

# DOCKER REGISTRY operations
# Build and tag
docker build -t myregistry.com/myapp:v1.2.3 .
docker tag myregistry.com/myapp:v1.2.3 myregistry.com/myapp:latest

# Push to registry
docker push myregistry.com/myapp:v1.2.3
docker push myregistry.com/myapp:latest

# Pull and run
docker pull myregistry.com/myapp:v1.2.3
docker run -d -p 8080:8080 myregistry.com/myapp:v1.2.3

# Container debugging
docker exec -it myapp /bin/sh
docker logs myapp --follow --tail=100
docker stats myapp
docker inspect myapp

# Cleanup
docker system prune -a --volumes
docker image prune -a
docker container prune
docker volume prune
```
*Notice: Docker provides consistent, portable, and scalable application packaging with proper security practices.*

</div>

<div class="concept-section pitfalls">

<details>
<summary>⚠️ <strong>Docker pitfalls</strong></summary>

<div>

- **Large image sizes**: Use multi-stage builds and minimal base images
- **Running as root**: Always use non-root users in containers
- **No health checks**: Implement proper health checks for orchestration
- **Ignoring .dockerignore**: Include .dockerignore to reduce build context size

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Container Orchestration` · `Microservices` · `CI/CD Pipelines` · `Infrastructure as Code` · `Security Scanning`

</div>

### Infrastructure as Code (IaC) {#infrastructure-as-code}

<div class="concept-section definition">

📋 **Concept Definition**  
**Managing infrastructure through machine-readable definition files** rather than manual configuration. **Declarative vs Imperative**: declarative (Terraform, CloudFormation - define desired state), imperative (Ansible scripts - define steps). **Key tools**: **Terraform** (multi-cloud, HCL language, state management), **Ansible** (agentless, YAML playbooks, configuration management), **CloudFormation** (AWS native), **Pulumi** (use general-purpose languages). **Benefits**: version control (Git), code review process, automated testing (terraform plan), idempotency. **State management**: remote state (S3, Terraform Cloud), state locking, drift detection. **Modules**: reusable infrastructure components. **Best practices**: immutable infrastructure, separate environments, secrets management.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Reproducible environments**: Create identical infrastructure across dev/staging/prod
- **Version control**: Track infrastructure changes like code changes
- **Automation**: Provision infrastructure automatically in CI/CD pipelines
- **Cost optimization**: Destroy and recreate environments as needed

</div>

<div class="runnable-model">

**Runnable mental model**
```hcl
# TERRAFORM AWS INFRASTRUCTURE
# terraform/main.tf
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  
  backend "s3" {
    bucket = "my-terraform-state"
    key    = "production/terraform.tfstate"
    region = "us-east-1"
    encrypt = true
    dynamodb_table = "terraform-locks"
  }
}

provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Environment = var.environment
      Project     = var.project_name
      ManagedBy   = "terraform"
    }
  }
}

# VPC and Networking
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true
  
  tags = {
    Name = "${var.project_name}-vpc"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  
  tags = {
    Name = "${var.project_name}-igw"
  }
}

# Public subnets for load balancers
resource "aws_subnet" "public" {
  count = length(var.availability_zones)
  
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.public_subnet_cidrs[count.index]
  availability_zone       = var.availability_zones[count.index]
  map_public_ip_on_launch = true
  
  tags = {
    Name = "${var.project_name}-public-${count.index + 1}"
    Type = "public"
  }
}

# Private subnets for applications
resource "aws_subnet" "private" {
  count = length(var.availability_zones)
  
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_subnet_cidrs[count.index]
  availability_zone = var.availability_zones[count.index]
  
  tags = {
    Name = "${var.project_name}-private-${count.index + 1}"
    Type = "private"
  }
}

# EKS Cluster
resource "aws_eks_cluster" "main" {
  name     = "${var.project_name}-cluster"
  role_arn = aws_iam_role.eks_cluster_role.arn
  version  = var.kubernetes_version
  
  vpc_config {
    subnet_ids              = concat(aws_subnet.public[*].id, aws_subnet.private[*].id)
    endpoint_private_access = true
    endpoint_public_access  = true
    public_access_cidrs     = var.allowed_cidr_blocks
  }
  
  encryption_config {
    provider {
      key_arn = aws_kms_key.eks.arn
    }
    resources = ["secrets"]
  }
  
  enabled_cluster_log_types = ["api", "audit", "authenticator", "controllerManager", "scheduler"]
  
  depends_on = [
    aws_iam_role_policy_attachment.eks_cluster_policy,
    aws_iam_role_policy_attachment.eks_vpc_resource_controller,
  ]
}

# EKS Node Group
resource "aws_eks_node_group" "main" {
  cluster_name    = aws_eks_cluster.main.name
  node_group_name = "${var.project_name}-nodes"
  node_role_arn   = aws_iam_role.eks_node_group_role.arn
  subnet_ids      = aws_subnet.private[*].id
  
  instance_types = var.node_instance_types
  ami_type       = "AL2_x86_64"
  capacity_type  = "ON_DEMAND"
  
  scaling_config {
    desired_size = var.node_desired_size
    max_size     = var.node_max_size
    min_size     = var.node_min_size
  }
  
  update_config {
    max_unavailable = 1
  }
  
  launch_template {
    id      = aws_launch_template.eks_nodes.id
    version = aws_launch_template.eks_nodes.latest_version
  }
  
  depends_on = [
    aws_iam_role_policy_attachment.eks_worker_node_policy,
    aws_iam_role_policy_attachment.eks_cni_policy,
    aws_iam_role_policy_attachment.ec2_container_registry_read_only,
  ]
  
  tags = {
    Name = "${var.project_name}-node-group"
  }
}

# RDS Database
resource "aws_db_instance" "main" {
  identifier = "${var.project_name}-db"
  
  engine                 = "postgres"
  engine_version        = "15.4"
  instance_class        = var.db_instance_class
  allocated_storage     = var.db_allocated_storage
  max_allocated_storage = var.db_max_allocated_storage
  storage_type          = "gp3"
  storage_encrypted     = true
  kms_key_id           = aws_kms_key.rds.arn
  
  db_name  = var.db_name
  username = var.db_username
  password = var.db_password
  
  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name
  
  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"
  
  skip_final_snapshot = false
  final_snapshot_identifier = "${var.project_name}-db-final-snapshot-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  
  performance_insights_enabled = true
  monitoring_interval         = 60
  monitoring_role_arn        = aws_iam_role.rds_monitoring.arn
  
  tags = {
    Name = "${var.project_name}-database"
  }
}

# Application Load Balancer
resource "aws_lb" "main" {
  name               = "${var.project_name}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets           = aws_subnet.public[*].id
  
  enable_deletion_protection = var.enable_deletion_protection
  
  access_logs {
    bucket  = aws_s3_bucket.alb_logs.bucket
    prefix  = "alb-logs"
    enabled = true
  }
  
  tags = {
    Name = "${var.project_name}-alb"
  }
}

# terraform/variables.tf
variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
  validation {
    condition     = contains(["dev", "staging", "production"], var.environment)
    error_message = "Environment must be dev, staging, or production."
  }
}

variable "project_name" {
  description = "Project name"
  type        = string
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

# ANSIBLE PLAYBOOK for server configuration
---
# ansible/playbook.yml
- name: Configure web servers
  hosts: web_servers
  become: yes
  vars:
    app_name: "myapp"
    app_user: "{{ app_name }}"
    app_dir: "/opt/{{ app_name }}"
    
  tasks:
    - name: Update package cache
      apt:
        update_cache: yes
        cache_valid_time: 3600
    
    - name: Install required packages
      apt:
        name:
          - nginx
          - docker.io
          - docker-compose
          - python3-pip
          - ufw
        state: present
    
    - name: Create application user
      user:
        name: "{{ app_user }}"
        system: yes
        shell: /bin/bash
        home: "{{ app_dir }}"
        create_home: yes
    
    - name: Configure Docker daemon
      template:
        src: daemon.json.j2
        dest: /etc/docker/daemon.json
        mode: '0644'
      notify: restart docker
    
    - name: Add app user to docker group
      user:
        name: "{{ app_user }}"
        groups: docker
        append: yes
    
    - name: Configure firewall
      ufw:
        rule: allow
        port: "{{ item }}"
      loop:
        - "22"    # SSH
        - "80"    # HTTP
        - "443"   # HTTPS
    
    - name: Enable firewall
      ufw:
        state: enabled
        policy: deny
    
    - name: Configure Nginx
      template:
        src: nginx.conf.j2
        dest: /etc/nginx/sites-available/{{ app_name }}
        mode: '0644'
      notify:
        - test nginx config
        - reload nginx
    
    - name: Enable Nginx site
      file:
        src: /etc/nginx/sites-available/{{ app_name }}
        dest: /etc/nginx/sites-enabled/{{ app_name }}
        state: link
      notify: reload nginx
    
    - name: Remove default Nginx site
      file:
        path: /etc/nginx/sites-enabled/default
        state: absent
      notify: reload nginx
    
    - name: Deploy application
      docker_compose:
        project_src: "{{ app_dir }}"
        state: present
        recreate: smart
      become_user: "{{ app_user }}"
    
  handlers:
    - name: restart docker
      service:
        name: docker
        state: restarted
    
    - name: test nginx config
      command: nginx -t
    
    - name: reload nginx
      service:
        name: nginx
        state: reloaded

# KUBERNETES MANIFESTS
# k8s/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: myapp-production
  labels:
    name: myapp-production
    environment: production

---
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  namespace: myapp-production
  labels:
    app: myapp
    version: v1
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
        version: v1
    spec:
      containers:
      - name: myapp
        image: myregistry.com/myapp:latest
        ports:
        - containerPort: 8080
          name: http
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: database-secret
              key: url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /actuator/health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /actuator/health/readiness
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
        securityContext:
          runAsNonRoot: true
          runAsUser: 1001
          allowPrivilegeEscalation: false
          readOnlyRootFilesystem: true

---
# k8s/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
  namespace: myapp-production
spec:
  selector:
    app: myapp
  ports:
  - name: http
    port: 80
    targetPort: 8080
  type: ClusterIP

---
# k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-ingress
  namespace: myapp-production
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
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
*Notice: Infrastructure as Code enables version-controlled, reproducible, and automated infrastructure management.*

</div>

<div class="concept-section best-practices">

<details>
<summary>✅ <strong>IaC best practices</strong></summary>

<div>

- **Modular design**: Create reusable modules for common infrastructure patterns
- **State management**: Use remote state with locking for team collaboration
- **Environment separation**: Separate state files for different environments
- **Security**: Never hardcode secrets, use parameter stores or secret managers
- **Testing**: Validate infrastructure code with tools like Terratest

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Cloud Platforms` · `Configuration Management` · `Environment Provisioning` · `Cost Optimization` · `Compliance`

</div>

### Kubernetes Orchestration {#kubernetes}

<div class="concept-section definition">

📋 **Concept Definition**  
**Container orchestration platform** for automating deployment, scaling, and management of containerized applications. **Architecture**: Control Plane (API server, scheduler, controller manager, etcd) + Worker Nodes (kubelet, kube-proxy, container runtime). **Core resources**: **Pod** (smallest unit, one or more containers), **Deployment** (declarative updates, replica management), **Service** (stable network endpoint), **ConfigMap/Secret** (configuration), **Ingress** (HTTP routing). **Scheduling**: resource requests/limits, node affinity, taints/tolerations. **Self-healing**: restarts failed pods, replaces nodes, kills unresponsive containers. **Scaling**: Horizontal Pod Autoscaler (HPA based on metrics), Vertical Pod Autoscaler. **Networking**: CNI plugins (Calico, Flannel), NetworkPolicies. **Helm**: package manager for Kubernetes.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Auto-scaling**: Automatically scale applications based on demand
- **Self-healing**: Restart failed containers and replace unhealthy nodes
- **Service discovery**: Built-in networking and load balancing
- **Rolling updates**: Zero-downtime deployments with rollback capabilities

</div>

<div class="runnable-model">

**Runnable mental model**
```yaml
# COMPLETE KUBERNETES APPLICATION STACK

# Namespace for isolation
apiVersion: v1
kind: Namespace
metadata:
  name: ecommerce-prod
  labels:
    environment: production
    team: platform

---
# ConfigMap for application configuration
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: ecommerce-prod
data:
  application.properties: |
    server.port=8080
    management.endpoints.web.exposure.include=health,metrics,prometheus
    logging.level.com.company.ecommerce=INFO
    spring.jpa.hibernate.ddl-auto=validate
  nginx.conf: |
    upstream backend {
        server app-service:8080;
    }
    
    server {
        listen 80;
        location / {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
        
        location /health {
            access_log off;
            return 200 "healthy\n";
        }
    }

---
# Secret for sensitive data
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
  namespace: ecommerce-prod
type: Opaque
data:
  database-url: cG9zdGdyZXNxbDovL3VzZXI6cGFzc0BkYi5leGFtcGxlLmNvbS9teWRi  # base64 encoded
  redis-password: cGFzc3dvcmQxMjM=  # base64 encoded
  jwt-secret: bXlqd3RzZWNyZXRrZXkxMjM=  # base64 encoded

---
# Deployment for the main application
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ecommerce-app
  namespace: ecommerce-prod
  labels:
    app: ecommerce-app
    version: v1.0.0
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
  selector:
    matchLabels:
      app: ecommerce-app
  template:
    metadata:
      labels:
        app: ecommerce-app
        version: v1.0.0
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "8080"
        prometheus.io/path: "/actuator/prometheus"
    spec:
      serviceAccountName: ecommerce-service-account
      containers:
      - name: app
        image: myregistry.com/ecommerce-app:v1.0.0
        ports:
        - containerPort: 8080
          name: http
          protocol: TCP
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: database-url
        - name: REDIS_PASSWORD
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: redis-password
        - name: POD_NAME
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
        - name: POD_IP
          valueFrom:
            fieldRef:
              fieldPath: status.podIP
        volumeMounts:
        - name: config-volume
          mountPath: /app/config
          readOnly: true
        - name: logs-volume
          mountPath: /app/logs
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
            ephemeral-storage: "1Gi"
          limits:
            memory: "1Gi"
            cpu: "500m"
            ephemeral-storage: "2Gi"
        livenessProbe:
          httpGet:
            path: /actuator/health/liveness
            port: 8080
          initialDelaySeconds: 45
          periodSeconds: 10
          timeoutSeconds: 5
          failureThreshold: 3
        readinessProbe:
          httpGet:
            path: /actuator/health/readiness
            port: 8080
          initialDelaySeconds: 15
          periodSeconds: 5
          timeoutSeconds: 3
          failureThreshold: 3
        securityContext:
          runAsNonRoot: true
          runAsUser: 1001
          runAsGroup: 1001
          allowPrivilegeEscalation: false
          readOnlyRootFilesystem: true
          capabilities:
            drop:
            - ALL
      - name: nginx-sidecar
        image: nginx:1.21-alpine
        ports:
        - containerPort: 80
          name: nginx
        volumeMounts:
        - name: nginx-config
          mountPath: /etc/nginx/conf.d
        resources:
          requests:
            memory: "64Mi"
            cpu: "50m"
          limits:
            memory: "128Mi"
            cpu: "100m"
      volumes:
      - name: config-volume
        configMap:
          name: app-config
      - name: nginx-config
        configMap:
          name: app-config
          items:
          - key: nginx.conf
            path: default.conf
      - name: logs-volume
        emptyDir: {}
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 100
            podAffinityTerm:
              labelSelector:
                matchExpressions:
                - key: app
                  operator: In
                  values:
                  - ecommerce-app
              topologyKey: kubernetes.io/hostname
      tolerations:
      - key: "node-type"
        operator: "Equal"
        value: "compute"
        effect: "NoSchedule"

---
# HorizontalPodAutoscaler for auto-scaling
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: ecommerce-app-hpa
  namespace: ecommerce-prod
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: ecommerce-app
  minReplicas: 3
  maxReplicas: 20
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
  - type: Pods
    pods:
      metric:
        name: http_requests_per_second
      target:
        type: AverageValue
        averageValue: "100"
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 10
        periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 60
      policies:
      - type: Percent
        value: 50
        periodSeconds: 30

---
# Service for internal communication
apiVersion: v1
kind: Service
metadata:
  name: ecommerce-app-service
  namespace: ecommerce-prod
  labels:
    app: ecommerce-app
spec:
  selector:
    app: ecommerce-app
  ports:
  - name: http
    port: 8080
    targetPort: 8080
    protocol: TCP
  - name: nginx
    port: 80
    targetPort: 80
    protocol: TCP
  type: ClusterIP
  sessionAffinity: None

---
# Ingress for external access
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ecommerce-app-ingress
  namespace: ecommerce-prod
  annotations:
    kubernetes.io/ingress.class: "nginx"
    nginx.ingress.kubernetes.io/rewrite-target: /
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/rate-limit: "100"
    nginx.ingress.kubernetes.io/rate-limit-window: "1m"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/configuration-snippet: |
      more_set_headers "X-Frame-Options: DENY";
      more_set_headers "X-Content-Type-Options: nosniff";
      more_set_headers "X-XSS-Protection: 1; mode=block";
spec:
  tls:
  - hosts:
    - ecommerce.company.com
    - api.ecommerce.company.com
    secretName: ecommerce-tls
  rules:
  - host: ecommerce.company.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: ecommerce-app-service
            port:
              number: 80
  - host: api.ecommerce.company.com
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: ecommerce-app-service
            port:
              number: 8080

---
# NetworkPolicy for security
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: ecommerce-app-netpol
  namespace: ecommerce-prod
spec:
  podSelector:
    matchLabels:
      app: ecommerce-app
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: ingress-nginx
    - podSelector:
        matchLabels:
          app: ecommerce-app
    ports:
    - protocol: TCP
      port: 8080
    - protocol: TCP
      port: 80
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          name: database
    ports:
    - protocol: TCP
      port: 5432
  - to:
    - namespaceSelector:
        matchLabels:
          name: cache
    ports:
    - protocol: TCP
      port: 6379
  - to: []
    ports:
    - protocol: TCP
      port: 53
    - protocol: UDP
      port: 53

---
# ServiceAccount with RBAC
apiVersion: v1
kind: ServiceAccount
metadata:
  name: ecommerce-service-account
  namespace: ecommerce-prod

---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: ecommerce-role
  namespace: ecommerce-prod
rules:
- apiGroups: [""]
  resources: ["configmaps", "secrets"]
  verbs: ["get", "list"]
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list", "watch"]

---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: ecommerce-rolebinding
  namespace: ecommerce-prod
subjects:
- kind: ServiceAccount
  name: ecommerce-service-account
  namespace: ecommerce-prod
roleRef:
  kind: Role
  name: ecommerce-role
  apiGroup: rbac.authorization.k8s.io

---
# PodDisruptionBudget for availability
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: ecommerce-app-pdb
  namespace: ecommerce-prod
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: ecommerce-app

# HELM CHART STRUCTURE
# Chart.yaml
apiVersion: v2
name: ecommerce-app
description: E-commerce application Helm chart
version: 1.0.0
appVersion: v1.0.0
dependencies:
- name: postgresql
  version: 11.9.13
  repository: https://charts.bitnami.com/bitnami
  condition: postgresql.enabled
- name: redis
  version: 17.3.7
  repository: https://charts.bitnami.com/bitnami
  condition: redis.enabled

# values.yaml (default values)
replicaCount: 3

image:
  repository: myregistry.com/ecommerce-app
  tag: v1.0.0
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 8080

ingress:
  enabled: true
  className: "nginx"
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
  hosts:
    - host: ecommerce.company.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: ecommerce-tls
      hosts:
        - ecommerce.company.com

autoscaling:
  enabled: true
  minReplicas: 3
  maxReplicas: 20
  targetCPUUtilizationPercentage: 70

resources:
  limits:
    cpu: 500m
    memory: 1Gi
  requests:
    cpu: 250m
    memory: 512Mi

postgresql:
  enabled: true
  auth:
    postgresPassword: "postgres123"
    database: "ecommerce"

redis:
  enabled: true
  auth:
    enabled: true
    password: "redis123"

# KUBECTL COMMANDS for management
# Apply configurations
kubectl apply -f namespace.yaml
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml
kubectl apply -f deployment.yaml

# Check deployment status
kubectl get deployments -n ecommerce-prod
kubectl rollout status deployment/ecommerce-app -n ecommerce-prod
kubectl get pods -n ecommerce-prod -l app=ecommerce-app

# Scale deployment
kubectl scale deployment ecommerce-app --replicas=5 -n ecommerce-prod

# Update deployment image
kubectl set image deployment/ecommerce-app app=myregistry.com/ecommerce-app:v1.1.0 -n ecommerce-prod

# Rollback deployment
kubectl rollout undo deployment/ecommerce-app -n ecommerce-prod
kubectl rollout history deployment/ecommerce-app -n ecommerce-prod

# Debug pods
kubectl logs -f deployment/ecommerce-app -n ecommerce-prod
kubectl exec -it pod/ecommerce-app-xxx -n ecommerce-prod -- /bin/bash
kubectl describe pod ecommerce-app-xxx -n ecommerce-prod

# Port forwarding for local testing
kubectl port-forward svc/ecommerce-app-service 8080:8080 -n ecommerce-prod

# Resource monitoring
kubectl top pods -n ecommerce-prod
kubectl top nodes
kubectl get events -n ecommerce-prod --sort-by=.metadata.creationTimestamp

# Cleanup
kubectl delete namespace ecommerce-prod
```
*Notice: Kubernetes provides comprehensive container orchestration with built-in scaling, healing, and networking capabilities.*

</div>

<div class="concept-section pitfalls">

<details>
<summary>⚠️ <strong>Kubernetes pitfalls</strong></summary>

<div>

- **Resource limits**: Always set resource requests and limits to prevent resource starvation
- **Health checks**: Implement proper liveness and readiness probes for reliability
- **Security context**: Run containers as non-root users with minimal privileges
- **RBAC**: Apply principle of least privilege for service accounts and roles

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Container Orchestration` · `Service Mesh` · `Auto-scaling` · `Load Balancing` · `Cloud Native Architecture`

</div>

### Monitoring & Observability {#monitoring}

<div class="concept-section definition">

📋 **Concept Definition**  
**Three pillars of observability**: **Metrics** (time-series numeric data: CPU, latency, request rate), **Logs** (timestamped event records), **Traces** (request flow through distributed system). **Metrics tools**: Prometheus (pull-based, time-series DB), Grafana (visualization), StatsD. **Logging**: ELK stack (Elasticsearch, Logstash, Kibana), Fluentd, Loki. **Tracing**: Jaeger, Zipkin, OpenTelemetry (unified standard). **Key metrics**: RED (Rate, Errors, Duration for services), USE (Utilization, Saturation, Errors for resources). **Alerting**: Alertmanager, PagerDuty, threshold-based and anomaly detection. **SLO/SLI**: Service Level Objectives/Indicators, error budgets. **APM**: Application Performance Monitoring (New Relic, Datadog).

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Proactive problem detection**: Find issues before users do
- **Performance optimization**: Identify bottlenecks and optimization opportunities
- **Incident response**: Quickly diagnose and resolve production issues
- **Capacity planning**: Understand resource usage patterns for scaling decisions

</div>

<div class="runnable-model">

**Runnable mental model**
```yaml
# PROMETHEUS MONITORING STACK

# Prometheus configuration
# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "alert_rules.yml"

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager:9093

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'kubernetes-apiservers'
    kubernetes_sd_configs:
    - role: endpoints
    scheme: https
    tls_config:
      ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
    bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
    relabel_configs:
    - source_labels: [__meta_kubernetes_namespace, __meta_kubernetes_service_name, __meta_kubernetes_endpoint_port_name]
      action: keep
      regex: default;kubernetes;https

  - job_name: 'kubernetes-nodes'
    kubernetes_sd_configs:
    - role: node
    relabel_configs:
    - action: labelmap
      regex: __meta_kubernetes_node_label_(.+)

  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
    - role: pod
    relabel_configs:
    - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
      action: keep
      regex: true
    - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
      action: replace
      target_label: __metrics_path__
      regex: (.+)
    - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]
      action: replace
      regex: ([^:]+)(?::\d+)?;(\d+)
      replacement: $1:$2
      target_label: __address__

  - job_name: 'application'
    static_configs:
      - targets: ['app-service:8080']
    metrics_path: '/actuator/prometheus'
    scrape_interval: 10s

# Alert rules
# alert_rules.yml
groups:
- name: application_alerts
  rules:
  - alert: HighErrorRate
    expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.1
    for: 2m
    labels:
      severity: critical
    annotations:
      summary: "High error rate detected"
      description: "Error rate is {{ $value }} requests per second"

  - alert: HighMemoryUsage
    expr: (container_memory_usage_bytes / container_spec_memory_limit_bytes) > 0.9
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: "High memory usage"
      description: "Memory usage is above 90%"

  - alert: PodCrashLooping
    expr: rate(kube_pod_container_status_restarts_total[15m]) > 0
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "Pod is crash looping"
      description: "Pod {{ $labels.pod }} in namespace {{ $labels.namespace }} is restarting frequently"

# Kubernetes Prometheus deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: prometheus
  namespace: monitoring
spec:
  replicas: 1
  selector:
    matchLabels:
      app: prometheus
  template:
    metadata:
      labels:
        app: prometheus
    spec:
      serviceAccountName: prometheus
      containers:
      - name: prometheus
        image: prom/prometheus:v2.37.0
        args:
          - '--config.file=/etc/prometheus/prometheus.yml'
          - '--storage.tsdb.path=/prometheus'
          - '--web.console.libraries=/etc/prometheus/console_libraries'
          - '--web.console.templates=/etc/prometheus/consoles'
          - '--storage.tsdb.retention.time=30d'
          - '--web.enable-lifecycle'
          - '--web.enable-admin-api'
        ports:
        - containerPort: 9090
        volumeMounts:
        - name: config-volume
          mountPath: /etc/prometheus
        - name: prometheus-data
          mountPath: /prometheus
        resources:
          requests:
            memory: "2Gi"
            cpu: "1000m"
          limits:
            memory: "4Gi"
            cpu: "2000m"
      volumes:
      - name: config-volume
        configMap:
          name: prometheus-config
      - name: prometheus-data
        persistentVolumeClaim:
          claimName: prometheus-pvc

---
# GRAFANA DASHBOARD CONFIGURATION
apiVersion: v1
kind: ConfigMap
metadata:
  name: grafana-dashboard-app
  namespace: monitoring
data:
  app-dashboard.json: |
    {
      "dashboard": {
        "id": null,
        "title": "Application Dashboard",
        "tags": ["application"],
        "style": "dark",
        "timezone": "browser",
        "panels": [
          {
            "id": 1,
            "title": "Request Rate",
            "type": "graph",
            "targets": [
              {
                "expr": "rate(http_requests_total[5m])",
                "legendFormat": "{{ method }} {{ status }}"
              }
            ],
            "yAxes": [
              {
                "label": "requests/sec"
              }
            ]
          },
          {
            "id": 2,
            "title": "Response Time",
            "type": "graph",
            "targets": [
              {
                "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))",
                "legendFormat": "95th percentile"
              },
              {
                "expr": "histogram_quantile(0.50, rate(http_request_duration_seconds_bucket[5m]))",
                "legendFormat": "50th percentile"
              }
            ]
          },
          {
            "id": 3,
            "title": "Error Rate",
            "type": "singlestat",
            "targets": [
              {
                "expr": "rate(http_requests_total{status=~\"5..\"}[5m]) / rate(http_requests_total[5m])",
                "legendFormat": "Error Rate"
              }
            ],
            "thresholds": "0.01,0.05",
            "colorBackground": true
          }
        ]
      }
    }

---
# ELK STACK FOR LOGGING
# Elasticsearch deployment
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: elasticsearch
  namespace: logging
spec:
  serviceName: elasticsearch
  replicas: 3
  selector:
    matchLabels:
      app: elasticsearch
  template:
    metadata:
      labels:
        app: elasticsearch
    spec:
      containers:
      - name: elasticsearch
        image: elasticsearch:8.5.0
        env:
        - name: cluster.name
          value: "elasticsearch-cluster"
        - name: node.name
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
        - name: discovery.seed_hosts
          value: "elasticsearch-0.elasticsearch,elasticsearch-1.elasticsearch,elasticsearch-2.elasticsearch"
        - name: cluster.initial_master_nodes
          value: "elasticsearch-0,elasticsearch-1,elasticsearch-2"
        - name: ES_JAVA_OPTS
          value: "-Xms2g -Xmx2g"
        ports:
        - containerPort: 9200
        - containerPort: 9300
        volumeMounts:
        - name: elasticsearch-data
          mountPath: /usr/share/elasticsearch/data
        resources:
          requests:
            memory: "4Gi"
            cpu: "1000m"
          limits:
            memory: "4Gi"
            cpu: "2000m"
  volumeClaimTemplates:
  - metadata:
      name: elasticsearch-data
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 100Gi

---
# Fluentd for log collection
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: fluentd
  namespace: logging
spec:
  selector:
    matchLabels:
      app: fluentd
  template:
    metadata:
      labels:
        app: fluentd
    spec:
      serviceAccountName: fluentd
      containers:
      - name: fluentd
        image: fluent/fluentd-kubernetes-daemonset:v1-debian-elasticsearch
        env:
        - name: FLUENT_ELASTICSEARCH_HOST
          value: "elasticsearch.logging.svc.cluster.local"
        - name: FLUENT_ELASTICSEARCH_PORT
          value: "9200"
        - name: FLUENT_ELASTICSEARCH_SCHEME
          value: "http"
        volumeMounts:
        - name: varlog
          mountPath: /var/log
        - name: varlibdockercontainers
          mountPath: /var/lib/docker/containers
          readOnly: true
        - name: config-volume
          mountPath: /fluentd/etc/
        resources:
          limits:
            memory: 500Mi
            cpu: 500m
          requests:
            memory: 200Mi
            cpu: 100m
      volumes:
      - name: varlog
        hostPath:
          path: /var/log
      - name: varlibdockercontainers
        hostPath:
          path: /var/lib/docker/containers
      - name: config-volume
        configMap:
          name: fluentd-config

---
# APPLICATION METRICS IN SPRING BOOT
# Application properties for metrics
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  endpoint:
    health:
      show-details: always
    metrics:
      enabled: true
  metrics:
    export:
      prometheus:
        enabled: true
    tags:
      application: ecommerce-app
      environment: production

# Custom metrics in Java application
@Component
public class CustomMetrics {
    
    private final Counter orderCounter;
    private final Timer paymentTimer;
    private final Gauge activeUsers;
    
    public CustomMetrics(MeterRegistry meterRegistry) {
        this.orderCounter = Counter.builder("orders.created")
            .description("Total orders created")
            .tag("status", "success")
            .register(meterRegistry);
            
        this.paymentTimer = Timer.builder("payment.processing.time")
            .description("Payment processing time")
            .register(meterRegistry);
            
        this.activeUsers = Gauge.builder("users.active")
            .description("Currently active users")
            .register(meterRegistry, this, CustomMetrics::getActiveUserCount);
    }
    
    public void recordOrderCreated(String status) {
        orderCounter.increment(Tags.of("status", status));
    }
    
    public Timer.Sample startPaymentTimer() {
        return Timer.start();
    }
    
    public void recordPaymentTime(Timer.Sample sample, String result) {
        sample.stop(Timer.builder("payment.processing.time")
            .tag("result", result)
            .register(meterRegistry));
    }
    
    private Double getActiveUserCount() {
        return userService.getActiveUserCount().doubleValue();
    }
}

# JAEGER DISTRIBUTED TRACING
apiVersion: apps/v1
kind: Deployment
metadata:
  name: jaeger
  namespace: tracing
spec:
  replicas: 1
  selector:
    matchLabels:
      app: jaeger
  template:
    metadata:
      labels:
        app: jaeger
    spec:
      containers:
      - name: jaeger
        image: jaegertracing/all-in-one:1.37
        env:
        - name: COLLECTOR_ZIPKIN_HOST_PORT
          value: ":9411"
        ports:
        - containerPort: 16686
        - containerPort: 14268
        - containerPort: 14250
        - containerPort: 9411
        resources:
          requests:
            memory: "1Gi"
            cpu: "500m"
          limits:
            memory: "2Gi"
            cpu: "1000m"

# OpenTelemetry in Spring Boot application
spring:
  application:
    name: ecommerce-app
  sleuth:
    otel:
      exporter:
        jaeger:
          endpoint: http://jaeger:14268/api/traces
    zipkin:
      base-url: http://jaeger:9411
```
*Notice: Comprehensive monitoring combines metrics, logs, and traces to provide complete system visibility.*

</div>

<div class="concept-section best-practices">

<details>
<summary>✅ <strong>Monitoring best practices</strong></summary>

<div>

- **Three pillars**: Implement metrics, logs, and traces together
- **SLIs/SLOs**: Define Service Level Indicators and Objectives for alerting
- **Correlation IDs**: Track requests across service boundaries
- **Alert fatigue**: Only alert on actionable issues, use runbooks
- **Retention policies**: Balance storage costs with data retention needs

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Alerting Systems` · `Performance Analysis` · `Incident Response` · `Capacity Planning` · `SRE Practices`

</div>

## Concepts

**Continuous Integration (CI)**: Automated practice of frequently integrating code changes with automated builds, tests, and quality checks. Provides fast feedback and prevents integration conflicts through tools like GitHub Actions, GitLab CI, or Jenkins.

**Continuous Deployment (CD)**: Automated deployment of code changes to production after passing all tests and quality gates. Includes deployment strategies like blue-green, canary, and rolling updates with automated rollback capabilities.

**Docker Containerization**: Technology for packaging applications with their dependencies into portable, consistent containers. Enables "build once, run anywhere" approach with multi-stage builds, security scanning, and container registries.

**Infrastructure as Code (IaC)**: Practice of managing infrastructure through code using tools like Terraform, Ansible, or CloudFormation. Enables version-controlled, reproducible, and automated infrastructure provisioning and management.

**Kubernetes Orchestration**: Container orchestration platform providing automated deployment, scaling, and management of containerized applications. Includes features like auto-scaling, self-healing, service discovery, and rolling updates.

**Monitoring & Observability**: Comprehensive system visibility through metrics (Prometheus), logs (ELK stack), and distributed traces (Jaeger). Essential for proactive problem detection, performance optimization, and incident response in production systems.

### Infrastructure as Code (IaC)
- Define infrastructure using code
- Version control for infrastructure
- Reproducible environments
- Tools: Terraform, CloudFormation

## Containerization

### Docker
- Package applications with dependencies
- Consistent environments across stages
- Lightweight and portable
- Container registry for sharing images

### Kubernetes
- Container orchestration platform
- Automatic scaling and load balancing
- Service discovery and networking
- Rolling updates and rollbacks

## CI/CD Pipeline Example

1. **Code Commit**: Developer pushes code
2. **Build**: Compile and package application
3. **Test**: Run unit, integration, and security tests
4. **Deploy to Staging**: Automated deployment for testing
5. **Manual Approval**: Optional gate for production
6. **Deploy to Production**: Automated production deployment
7. **Monitor**: Track application performance

## Monitoring & Observability

### Metrics
- Application performance indicators
- Infrastructure resource usage
- Business metrics

### Logging
- Centralized log aggregation
- Structured logging formats
- Log analysis and alerting

### Tracing
- Track requests across services
- Identify performance bottlenecks
- Distributed system debugging

### Scrum Framework {#scrum-framework}

<div class="concept-section definition">

📋 **Concept Definition**  
**Agile framework** for iterative product development in fixed-length sprints (1-4 weeks). **Three Pillars**: Transparency (everyone sees process/progress), Inspection (frequent check progress), Adaptation (adjust based on inspection). **Five Values**: Commitment, Focus, Openness, Respect, Courage. **Empirical process**: make decisions based on observation and experience, not prediction.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Iterative delivery**: working software every sprint
- **Transparency**: all stakeholders see progress
- **Flexibility**: adapt to changing requirements
- **Team empowerment**: self-organizing cross-functional teams

</div>

<div class="runnable-model">

**Scrum Framework Components**

### **Roles**

**Product Owner**
- Owns the Product Backlog
- Prioritizes features based on business value
- Single point of contact for stakeholders
- Accepts or rejects work results
- Responsible for ROI and product success

**Scrum Master**
- Facilitates Scrum process
- Removes impediments for the team
- Coaches team on Agile practices
- Shields team from external distractions
- Ensures Scrum events happen and are productive

**Development Team**
- Cross-functional (all skills needed to create increment)
- Self-organizing (decide how to do work)
- 3-9 members optimal size
- Collectively accountable for Sprint success
- No sub-teams or hierarchies

### **Events (Ceremonies)**

**Sprint** (1-4 weeks, fixed duration)
- Time-boxed iteration
- Creates potentially shippable product increment
- No changes that endanger Sprint Goal
- Consistent duration for predictability

**Sprint Planning** (max 8h for 1-month sprint)
- What can be delivered this Sprint?
- How will the work be achieved?
- Team pulls items from Product Backlog
- Creates Sprint Backlog and Sprint Goal

**Daily Scrum** (15 minutes, same time/place)
- What did I do yesterday?
- What will I do today?
- What impediments block me?
- NOT a status report - team synchronization
- Scrum Master facilitates, team owns

**Sprint Review** (max 4h for 1-month sprint)
- Demonstrate completed work to stakeholders
- Inspect increment and adapt Product Backlog
- Informal presentation, not a milestone
- Gather feedback for next Sprint
- Update release timeline based on progress

**Sprint Retrospective** (max 3h for 1-month sprint)
- After Sprint Review, before next Planning
- What went well? What didn't? What to improve?
- Team inspects itself and creates improvement plan
- Focus: people, relationships, process, tools
- Most important for continuous improvement

### **Artifacts**

**Product Backlog**
- Ordered list of everything needed in product
- Single source of requirements
- Dynamic - evolves as product and environment evolve
- Items have description, order, estimate, value
- Product Owner responsible for content, ordering

**Sprint Backlog**
- Product Backlog items selected for Sprint
- Plus plan for delivering them
- Forecast by Development Team
- Only Development Team can change during Sprint
- Visible real-time picture of Sprint work

**Increment**
- Sum of all Product Backlog items completed during Sprint
- Plus increments from all previous Sprints
- Must be in usable condition (Definition of Done)
- Must be potentially releasable
- Stakeholder can choose to release or not

### **Additional Concepts**

**Definition of Done (DoD)**
- Shared understanding of "complete"
- Includes: code complete, tested, documented, deployed
- Must meet all DoD criteria to be in Increment
- Increases transparency and quality

**Velocity**
- Amount of work team completes per Sprint
- Measured in story points or ideal hours
- Used for capacity planning
- Improves over time as team matures

**Burndown Chart**
- Visual representation of work remaining vs time
- Sprint Burndown: work in current Sprint
- Release Burndown: work toward release goal
- Helps identify if team is on track

**Sprint Goal**
- Objective set for Sprint
- Provides guidance on why building Increment
- Creates coherence and focus
- Can be renegotiated with Product Owner if needed

</div>

<div class="concept-section best-practices">

<details>
<summary>✅ <strong>Scrum best practices</strong></summary>

<div>

- **Fixed Sprint length**: consistency enables predictability
- **Definition of Done**: clear, agreed-upon completion criteria
- **Protect the team**: Scrum Master shields from external interruptions
- **Respect time-boxes**: events should not exceed maximum duration
- **Empirical process**: make decisions based on data, not assumptions
- **Self-organization**: team decides how to accomplish work
- **Continuous improvement**: Retrospective leads to actionable changes

</div>
</details>

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Common myths / misconceptions</strong></summary>

<div>

- "Scrum Master is a project manager" → Scrum Master is a facilitator, not a manager
- "Daily Scrum is a status update" → It's team synchronization, not reporting to manager
- "Sprint can be extended if work isn't done" → Sprint length is fixed, incomplete work goes to next Sprint
- "Product Owner can change Sprint Backlog mid-Sprint" → Only Development Team modifies Sprint Backlog

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- Can't explain the three roles and their responsibilities
- Don't understand difference between Sprint Review and Retrospective
- Confuse Scrum Master with Project Manager
- Can't describe what happens in each Scrum event
- Don't know what Definition of Done means

</div>
</details>

</div>

<div class="tags">
<span class="tag">agile</span>
<span class="tag">scrum</span>
<span class="tag">project-management</span>
<span class="tag">junior</span>
</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Agile Methodologies` · `Sprint Planning` · `Product Backlog` · `Iterative Development` · `Team Collaboration`

</div>

---

### Docker Containerization {#docker}
<!-- tags: docker, containers, devops, deployment -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Docker is a containerization platform that packages applications with their dependencies into lightweight, portable containers. **Containers** are isolated environments that share the host OS kernel, **Images** are read-only templates for containers, **Dockerfile** defines how to build images, **Docker Compose** manages multi-container applications, and **Registries** store and distribute images. Containers ensure consistent environments across development, testing, and production.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Consistency**: eliminates "works on my machine" problems
- **Portability**: runs anywhere Docker is supported
- **Isolation**: applications don't interfere with each other
- **Efficiency**: lighter than virtual machines, faster startup times

</div>

<div class="runnable-model" data-filter="docker">

**Runnable mental model**
```dockerfile
# 1. DOCKERFILE - Building Container Images

# Multi-stage build for Node.js application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first (for better layer caching)
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Set working directory
WORKDIR /app

# Copy built application from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start application
CMD ["npm", "start"]

# 2. DOCKER COMPOSE - Multi-container Applications

# docker-compose.yml
version: '3.8'

services:
  # Web application
  web:
    build: 
      context: .
      dockerfile: Dockerfile
      target: production
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@db:5432/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    volumes:
      - ./uploads:/app/uploads
    networks:
      - app-network
    restart: unless-stopped
    deploy:
      resources:
        limits:
          cpus: '0.50'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M

  # PostgreSQL database
  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    networks:
      - app-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d myapp"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s

  # Redis cache
  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes --requirepass myredispassword
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"
    networks:
      - app-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "redis-cli", "--raw", "incr", "ping"]
      interval: 30s
      timeout: 3s
      retries: 3

volumes:
  postgres_data:
  redis_data:

networks:
  app-network:
    driver: bridge

# 3. DOCKER COMMANDS - Container Management

# Build and run
docker build -t myapp:latest .
docker run -d --name myapp-container -p 3000:3000 myapp:latest

# Container lifecycle
docker start myapp-container
docker stop myapp-container
docker restart myapp-container
docker rm myapp-container

# Debugging
docker logs -f myapp-container
docker exec -it myapp-container /bin/sh
docker inspect myapp-container

# Docker Compose
docker-compose up -d
docker-compose down
docker-compose logs -f web
docker-compose exec web /bin/sh
```
*Notice: Docker provides consistency across environments but requires security best practices for production use.*

</div>

### Infrastructure as Code (IaC) {#infrastructure-as-code}
<!-- tags: terraform, ansible, infrastructure, automation -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Infrastructure as Code manages and provisions infrastructure through machine-readable definition files. **Terraform** creates and manages cloud resources declaratively, **Ansible** automates configuration management, **CloudFormation** (AWS) and **ARM templates** (Azure) provide cloud-native IaC. **Benefits**: version control, reproducibility, automation, documentation. **Principles**: declarative configuration, idempotency, immutable infrastructure, and infrastructure versioning.*

</div>

<div class="runnable-model" data-filter="terraform">

**Runnable mental model**
```hcl
# 1. TERRAFORM CONFIGURATION

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
    bucket = "my-terraform-state"
    key    = "production/terraform.tfstate"
    region = "us-west-2"
  }
}

provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Environment = var.environment
      Project     = var.project_name
      ManagedBy   = "terraform"
    }
  }
}

# variables.tf
variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

variable "environment" {
  description = "Environment name"
  type        = string
  validation {
    condition     = contains(["dev", "staging", "production"], var.environment)
    error_message = "Environment must be dev, staging, or production."
  }
}

variable "instance_count" {
  description = "Number of EC2 instances"
  type        = number
  default     = 2
}

# 2. VPC AND NETWORKING

# vpc.tf
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  
  tags = {
    Name = "${var.project_name}-vpc"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  
  tags = {
    Name = "${var.project_name}-igw"
  }
}

resource "aws_subnet" "public" {
  count = 2
  
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.${count.index + 1}.0/24"
  availability_zone       = data.aws_availability_zones.available.names[count.index]
  map_public_ip_on_launch = true
  
  tags = {
    Name = "${var.project_name}-public-${count.index + 1}"
    Type = "public"
  }
}

resource "aws_subnet" "private" {
  count = 2
  
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.${count.index + 10}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]
  
  tags = {
    Name = "${var.project_name}-private-${count.index + 1}"
    Type = "private"
  }
}

# 3. SECURITY GROUPS

# security-groups.tf
resource "aws_security_group" "web" {
  name_prefix = "${var.project_name}-web-"
  vpc_id      = aws_vpc.main.id
  
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  tags = {
    Name = "${var.project_name}-web-sg"
  }
}

# 4. EC2 INSTANCES

# ec2.tf
data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]
  
  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
}

resource "aws_launch_template" "web" {
  name_prefix   = "${var.project_name}-web-"
  image_id      = data.aws_ami.amazon_linux.id
  instance_type = "t3.micro"
  
  vpc_security_group_ids = [aws_security_group.web.id]
  
  user_data = base64encode(templatefile("${path.module}/user-data.sh", {
    app_name = var.project_name
  }))
  
  tag_specifications {
    resource_type = "instance"
    tags = {
      Name = "${var.project_name}-web"
    }
  }
}

# 5. AUTO SCALING

# autoscaling.tf
resource "aws_autoscaling_group" "web" {
  name                = "${var.project_name}-asg"
  vpc_zone_identifier = aws_subnet.public[*].id
  min_size            = 1
  max_size            = 5
  desired_capacity    = var.instance_count
  
  launch_template {
    id      = aws_launch_template.web.id
    version = "$Latest"
  }
  
  tag {
    key                 = "Name"
    value               = "${var.project_name}-asg"
    propagate_at_launch = false
  }
}

# 6. LOAD BALANCER

# alb.tf
resource "aws_lb" "main" {
  name               = "${var.project_name}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.web.id]
  subnets            = aws_subnet.public[*].id
  
  enable_deletion_protection = var.environment == "production"
}

resource "aws_lb_target_group" "web" {
  name     = "${var.project_name}-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id
  
  health_check {
    enabled             = true
    healthy_threshold   = 2
    interval            = 30
    matcher             = "200"
    path                = "/health"
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = 5
    unhealthy_threshold = 2
  }
}

# 7. RDS DATABASE

# rds.tf
resource "aws_db_subnet_group" "main" {
  name       = "${var.project_name}-db-subnet-group"
  subnet_ids = aws_subnet.private[*].id
  
  tags = {
    Name = "${var.project_name}-db-subnet-group"
  }
}

resource "aws_db_instance" "main" {
  identifier     = "${var.project_name}-db"
  engine         = "postgres"
  engine_version = "14.9"
  instance_class = "db.t3.micro"
  
  allocated_storage     = 20
  max_allocated_storage = 100
  storage_type          = "gp2"
  storage_encrypted     = true
  
  db_name  = "appdb"
  username = "dbuser"
  password = random_password.db_password.result
  
  vpc_security_group_ids = [aws_security_group.db.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name
  
  backup_retention_period = var.environment == "production" ? 7 : 1
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"
  
  skip_final_snapshot = var.environment != "production"
  deletion_protection = var.environment == "production"
  
  tags = {
    Name = "${var.project_name}-db"
  }
}

resource "random_password" "db_password" {
  length  = 16
  special = true
}

# 8. OUTPUTS

# outputs.tf
output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
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

# 9. TERRAFORM COMMANDS

# Initialize Terraform
terraform init

# Plan changes
terraform plan -var-file="production.tfvars"

# Apply changes
terraform apply -var-file="production.tfvars"

# Show current state
terraform show

# Import existing resource
terraform import aws_instance.example i-1234567890abcdef0

# Destroy infrastructure
terraform destroy -var-file="production.tfvars"
```
*Notice: Infrastructure as Code enables version control and reproducible infrastructure but requires careful state management.*

</div>

### Kubernetes Orchestration {#kubernetes}
<!-- tags: kubernetes, orchestration, containers, scaling -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Kubernetes (K8s) is a container orchestration platform that automates deployment, scaling, and management of containerized applications. **Pods** are the smallest deployable units containing one or more containers, **Services** provide stable network endpoints, **Deployments** manage Pod replicas, **Namespaces** provide resource isolation, **ConfigMaps** and **Secrets** manage configuration data. K8s provides self-healing, horizontal scaling, rolling updates, and service discovery.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Scalability**: automatically scales applications based on demand
- **Self-healing**: restarts failed containers and replaces unhealthy nodes
- **Rolling updates**: deploys new versions without downtime
- **Service discovery**: automatic load balancing and service networking

</div>

<div class="runnable-model" data-filter="kubernetes">

**Runnable mental model**
```yaml
# 1. NAMESPACE AND CONFIGURATION

# namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: myapp-production
  labels:
    environment: production
    team: backend

---
# configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: myapp-config
  namespace: myapp-production
data:
  NODE_ENV: "production"
  LOG_LEVEL: "info"
  API_BASE_URL: "https://api.myapp.com"
  REDIS_HOST: "redis-service"
  DATABASE_HOST: "postgres-service"

---
# secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: myapp-secrets
  namespace: myapp-production
type: Opaque
data:
  # Base64 encoded values
  DATABASE_PASSWORD: cGFzc3dvcmQxMjM=
  JWT_SECRET: bXlzdXBlcnNlY3JldGp3dA==
  REDIS_PASSWORD: cmVkaXNwYXNzMTIz

# 2. DEPLOYMENT

# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
  namespace: myapp-production
  labels:
    app: myapp
    version: v1.0.0
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
        version: v1.0.0
    spec:
      # Security context
      securityContext:
        runAsNonRoot: true
        runAsUser: 1001
        fsGroup: 1001
      
      # Init containers
      initContainers:
      - name: wait-for-db
        image: busybox:1.35
        command: ['sh', '-c']
        args:
        - |
          until nc -z postgres-service 5432; do
            echo "Waiting for database..."
            sleep 2
          done
          echo "Database is ready!"
      
      containers:
      - name: myapp
        image: myapp:v1.0.0
        ports:
        - containerPort: 3000
          name: http
        
        # Environment variables
        env:
        - name: PORT
          value: "3000"
        envFrom:
        - configMapRef:
            name: myapp-config
        - secretRef:
            name: myapp-secrets
        
        # Resource limits
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        
        # Health checks
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
          timeoutSeconds: 5
          failureThreshold: 3
        
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
          timeoutSeconds: 3
          failureThreshold: 3
        
        # Volume mounts
        volumeMounts:
        - name: app-storage
          mountPath: /app/uploads
        - name: logs
          mountPath: /app/logs
      
      volumes:
      - name: app-storage
        persistentVolumeClaim:
          claimName: myapp-pvc
      - name: logs
        emptyDir: {}

# 3. SERVICE

# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
  namespace: myapp-production
  labels:
    app: myapp
spec:
  type: ClusterIP
  ports:
  - port: 80
    targetPort: 3000
    protocol: TCP
    name: http
  selector:
    app: myapp

---
# Load balancer service
apiVersion: v1
kind: Service
metadata:
  name: myapp-loadbalancer
  namespace: myapp-production
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-type: "nlb"
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 3000
    protocol: TCP
  selector:
    app: myapp

# 4. INGRESS

# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-ingress
  namespace: myapp-production
  annotations:
    kubernetes.io/ingress.class: "nginx"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
    nginx.ingress.kubernetes.io/rate-limit: "100"
spec:
  tls:
  - hosts:
    - myapp.com
    - www.myapp.com
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
  - host: www.myapp.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: myapp-service
            port:
              number: 80

# 5. PERSISTENT STORAGE

# pvc.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: myapp-pvc
  namespace: myapp-production
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: fast-ssd
  resources:
    requests:
      storage: 10Gi

---
# Storage class
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp3
  fsType: ext4
  encrypted: "true"
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer

# 6. HORIZONTAL POD AUTOSCALER

# hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp-hpa
  namespace: myapp-production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp-deployment
  minReplicas: 3
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
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 10
        periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
      - type: Percent
        value: 100
        periodSeconds: 15
      - type: Pods
        value: 4
        periodSeconds: 15
      selectPolicy: Max

# 7. NETWORK POLICY

# network-policy.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: myapp-network-policy
  namespace: myapp-production
spec:
  podSelector:
    matchLabels:
      app: myapp
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: ingress-nginx
    ports:
    - protocol: TCP
      port: 3000
  - from:
    - podSelector:
        matchLabels:
          app: monitoring
    ports:
    - protocol: TCP
      port: 3000
  egress:
  - to:
    - podSelector:
        matchLabels:
          app: postgres
    ports:
    - protocol: TCP
      port: 5432
  - to:
    - podSelector:
        matchLabels:
          app: redis
    ports:
    - protocol: TCP
      port: 6379
  - to: []
    ports:
    - protocol: TCP
      port: 53
    - protocol: UDP
      port: 53

# 8. MONITORING AND OBSERVABILITY

# servicemonitor.yaml (for Prometheus)
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: myapp-metrics
  namespace: myapp-production
  labels:
    app: myapp
spec:
  selector:
    matchLabels:
      app: myapp
  endpoints:
  - port: http
    path: /metrics
    interval: 30s

---
# Pod disruption budget
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: myapp-pdb
  namespace: myapp-production
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: myapp

# 9. KUBECTL COMMANDS

# Cluster management
kubectl get nodes
kubectl get pods -n myapp-production
kubectl get services -n myapp-production
kubectl get deployments -n myapp-production

# Apply configurations
kubectl apply -f namespace.yaml
kubectl apply -f .  # Apply all YAML files in directory

# Debugging
kubectl describe pod <pod-name> -n myapp-production
kubectl logs -f <pod-name> -n myapp-production
kubectl exec -it <pod-name> -n myapp-production -- /bin/sh

# Scaling
kubectl scale deployment myapp-deployment --replicas=5 -n myapp-production

# Rolling updates
kubectl set image deployment/myapp-deployment myapp=myapp:v1.1.0 -n myapp-production
kubectl rollout status deployment/myapp-deployment -n myapp-production
kubectl rollout undo deployment/myapp-deployment -n myapp-production

# Port forwarding for debugging
kubectl port-forward service/myapp-service 8080:80 -n myapp-production

# Resource monitoring
kubectl top nodes
kubectl top pods -n myapp-production

# Configuration management
kubectl create secret generic myapp-secrets \
  --from-literal=database-password=secretpass \
  --from-literal=jwt-secret=jwtsecret \
  -n myapp-production

kubectl create configmap myapp-config \
  --from-file=config.properties \
  -n myapp-production
```
*Notice: Kubernetes provides powerful orchestration capabilities but requires understanding of container networking and resource management.*

</div>

### CI/CD Pipelines {#cicd}
<!-- tags: continuous-integration, continuous-deployment, automation, github-actions -->

<div class="concept-section definition">

📋 **Concept Definition**  
*CI/CD (Continuous Integration/Continuous Deployment) automates the software delivery process. **Continuous Integration** automatically builds and tests code changes, **Continuous Deployment** automatically deploys tested changes to production, **Pipelines** define the automated workflow stages, **Artifacts** are build outputs stored for deployment, **Environments** (dev, staging, production) represent different deployment targets. CI/CD reduces manual errors, accelerates delivery, and ensures consistent deployments.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Speed**: faster time to market with automated deployments
- **Quality**: automated testing catches issues early
- **Consistency**: standardized deployment processes
- **Reliability**: reduced human error in deployments

</div>

<div class="runnable-model" data-filter="github-actions">

**Runnable mental model**
```yaml
# 1. GITHUB ACTIONS WORKFLOW

# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  release:
    types: [ published ]

env:
  NODE_VERSION: '18'
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  # Code quality and security checks
  lint-and-security:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run linting
      run: npm run lint
      
    - name: Run security audit
      run: npm audit --audit-level=high
      
    - name: Run dependency check
      uses: snyk/actions/node@master
      env:
        SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

  # Unit and integration tests
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16, 18, 20]
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432
      redis:
        image: redis:7
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 6379:6379
          
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
      
    - name: Run unit tests
      run: npm run test:unit
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
        REDIS_URL: redis://localhost:6379
        
    - name: Run integration tests
      run: npm run test:integration
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
        REDIS_URL: redis://localhost:6379
        
    - name: Generate coverage report
      run: npm run test:coverage
      
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info
        fail_ci_if_error: true

  # End-to-end tests
  e2e-test:
    runs-on: ubuntu-latest
    needs: [lint-and-security, test]
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build application
      run: npm run build
      
    - name: Start application
      run: |
        npm start &
        npx wait-on http://localhost:3000
      env:
        NODE_ENV: test
        
    - name: Run E2E tests
      uses: cypress-io/github-action@v6
      with:
        wait-on: 'http://localhost:3000'
        wait-on-timeout: 120
        browser: chrome
        record: true
        parallel: true
      env:
        CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

  # Build and push Docker image
  build:
    runs-on: ubuntu-latest
    needs: [lint-and-security, test]
    permissions:
      contents: read
      packages: write
    outputs:
      image-digest: ${{ steps.build.outputs.digest }}
      image-tag: ${{ steps.meta.outputs.tags }}
      
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v3
      
    - name: Log in to Container Registry
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
          type=sha,prefix={{branch}}-
          
    - name: Build and push Docker image
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
        
    - name: Sign container image
      uses: sigstore/cosign-installer@v3
      with:
        cosign-release: 'v2.1.1'
    - name: Sign the images
      run: |
        cosign sign --yes ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}@${{ steps.build.outputs.digest }}
      env:
        COSIGN_EXPERIMENTAL: 1

  # Deploy to staging
  deploy-staging:
    runs-on: ubuntu-latest
    needs: [build, e2e-test]
    if: github.ref == 'refs/heads/develop'
    environment: staging
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v4
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-west-2
        
    - name: Deploy to EKS
      run: |
        aws eks update-kubeconfig --region us-west-2 --name staging-cluster
        kubectl set image deployment/myapp-deployment \
          myapp=${{ needs.build.outputs.image-tag }} \
          -n myapp-staging
        kubectl rollout status deployment/myapp-deployment -n myapp-staging
        
    - name: Run smoke tests
      run: |
        kubectl port-forward service/myapp-service 8080:80 -n myapp-staging &
        sleep 10
        curl -f http://localhost:8080/health || exit 1
        
    - name: Notify Slack
      uses: 8398a7/action-slack@v3
      with:
        status: ${{ job.status }}
        text: 'Staging deployment completed for ${{ github.sha }}'
      env:
        SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}

  # Deploy to production
  deploy-production:
    runs-on: ubuntu-latest
    needs: [build, e2e-test]
    if: github.event_name == 'release'
    environment: production
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v4
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-west-2
        
    - name: Deploy to EKS with Blue-Green
      run: |
        aws eks update-kubeconfig --region us-west-2 --name production-cluster
        
        # Deploy to green environment
        kubectl set image deployment/myapp-deployment-green \
          myapp=${{ needs.build.outputs.image-tag }} \
          -n myapp-production
        kubectl rollout status deployment/myapp-deployment-green -n myapp-production
        
        # Health check on green
        kubectl port-forward service/myapp-service-green 8080:80 -n myapp-production &
        sleep 10
        curl -f http://localhost:8080/health || exit 1
        
        # Switch traffic to green
        kubectl patch service myapp-service \
          -p '{"spec":{"selector":{"version":"green"}}}' \
          -n myapp-production
          
        # Scale down blue deployment
        kubectl scale deployment myapp-deployment-blue --replicas=0 -n myapp-production
        
    - name: Run production health check
      run: |
        for i in {1..5}; do
          curl -f https://myapp.com/health && break
          sleep 30
        done
        
    - name: Rollback on failure
      if: failure()
      run: |
        # Switch back to blue
        kubectl patch service myapp-service \
          -p '{"spec":{"selector":{"version":"blue"}}}' \
          -n myapp-production
        kubectl scale deployment myapp-deployment-blue --replicas=3 -n myapp-production

# 2. JENKINS PIPELINE

# Jenkinsfile
pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'your-registry.com'
        IMAGE_NAME = 'myapp'
        KUBECONFIG = credentials('kubeconfig')
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                script {
                    def image = docker.build("${DOCKER_REGISTRY}/${IMAGE_NAME}:${BUILD_NUMBER}")
                }
            }
        }
        
        stage('Test') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        sh 'npm install'
                        sh 'npm run test:unit'
                    }
                }
                stage('Integration Tests') {
                    steps {
                        sh 'npm run test:integration'
                    }
                }
                stage('Security Scan') {
                    steps {
                        sh 'npm audit'
                        sh 'docker run --rm -v $(pwd):/app clair-scanner'
                    }
                }
            }
        }
        
        stage('Deploy to Staging') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    docker.image("${DOCKER_REGISTRY}/${IMAGE_NAME}:${BUILD_NUMBER}").push()
                    sh '''
                        kubectl set image deployment/myapp-deployment \
                            myapp=${DOCKER_REGISTRY}/${IMAGE_NAME}:${BUILD_NUMBER} \
                            -n staging
                        kubectl rollout status deployment/myapp-deployment -n staging
                    '''
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                input message: 'Deploy to production?', ok: 'Deploy'
                script {
                    sh '''
                        kubectl set image deployment/myapp-deployment \
                            myapp=${DOCKER_REGISTRY}/${IMAGE_NAME}:${BUILD_NUMBER} \
                            -n production
                        kubectl rollout status deployment/myapp-deployment -n production
                    '''
                }
            }
        }
    }
    
    post {
        always {
            junit 'test-results.xml'
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'coverage',
                reportFiles: 'index.html',
                reportName: 'Coverage Report'
            ])
        }
        success {
            slackSend(
                color: 'good',
                message: "✅ Build ${BUILD_NUMBER} succeeded"
            )
        }
        failure {
            slackSend(
                color: 'danger',
                message: "❌ Build ${BUILD_NUMBER} failed"
            )
        }
    }
}

# 3. GITLAB CI/CD

# .gitlab-ci.yml
stages:
  - build
  - test
  - security
  - deploy

variables:
  DOCKER_DRIVER: overlay2
  DOCKER_TLS_CERTDIR: "/certs"

build:
  stage: build
  image: docker:latest
  services:
    - docker:dind
  script:
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
  only:
    - main
    - develop

test:unit:
  stage: test
  image: node:18
  services:
    - postgres:15
    - redis:7
  variables:
    DATABASE_URL: "postgresql://postgres:postgres@postgres:5432/test_db"
    REDIS_URL: "redis://redis:6379"
  script:
    - npm ci
    - npm run test:unit
    - npm run test:coverage
  coverage: '/Statements\s*:\s*([^%]+)/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml

security:
  stage: security
  image: docker:stable
  services:
    - docker:dind
  script:
    - docker run --rm -v /var/run/docker.sock:/var/run/docker.sock 
      -v $PWD:/tmp/.cache/ aquasec/trivy 
      image --exit-code 0 --no-progress --format table 
      $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA

deploy:staging:
  stage: deploy
  image: bitnami/kubectl
  script:
    - kubectl config use-context $KUBE_CONTEXT_STAGING
    - kubectl set image deployment/myapp myapp=$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    - kubectl rollout status deployment/myapp
  environment:
    name: staging
    url: https://staging.myapp.com
  only:
    - develop

deploy:production:
  stage: deploy
  image: bitnami/kubectl
  script:
    - kubectl config use-context $KUBE_CONTEXT_PROD
    - kubectl set image deployment/myapp myapp=$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    - kubectl rollout status deployment/myapp
  environment:
    name: production
    url: https://myapp.com
  when: manual
  only:
    - main
```
*Notice: CI/CD pipelines should include security scanning, automated testing, and rollback capabilities for production safety.*

</div>

### Infrastructure as Code (IaC) {#infrastructure-as-code}
<!-- tags: terraform, ansible, cloudformation, infrastructure, automation -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Infrastructure as Code manages and provisions computing infrastructure through machine-readable definition files. **Terraform** provides declarative infrastructure across multiple cloud providers, **Ansible** handles configuration management and application deployment, **CloudFormation** manages AWS resources, **Pulumi** enables infrastructure with programming languages. **Benefits**: version control for infrastructure, reproducible environments, automated provisioning, disaster recovery. **Patterns**: immutable infrastructure, blue-green deployments, canary releases.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Reproducibility**: identical infrastructure across environments
- **Version control**: track changes to infrastructure like code
- **Automation**: eliminate manual configuration errors
- **Disaster recovery**: quickly rebuild entire infrastructure

</div>

<div class="runnable-model" data-filter="infrastructure">

**Runnable mental model**
```hcl
# 1. TERRAFORM - Declarative Infrastructure

# main.tf
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.20"
    }
  }
  
  backend "s3" {
    bucket = "mycompany-terraform-state"
    key    = "infrastructure/terraform.tfstate"
    region = "us-west-2"
  }
}

provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Environment = var.environment
      Project     = var.project_name
      ManagedBy   = "Terraform"
    }
  }
}

# Variables
variable "environment" {
  description = "Environment name"
  type        = string
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

variable "project_name" {
  description = "Project name"
  type        = string
}

variable "availability_zones" {
  description = "Availability zones"
  type        = list(string)
  default     = ["us-west-2a", "us-west-2b", "us-west-2c"]
}

# VPC and Networking
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  
  tags = {
    Name = "${var.project_name}-vpc-${var.environment}"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  
  tags = {
    Name = "${var.project_name}-igw-${var.environment}"
  }
}

resource "aws_subnet" "public" {
  count             = length(var.availability_zones)
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.${count.index + 1}.0/24"
  availability_zone = var.availability_zones[count.index]
  
  map_public_ip_on_launch = true
  
  tags = {
    Name = "${var.project_name}-public-subnet-${count.index + 1}-${var.environment}"
    Type = "Public"
  }
}

resource "aws_subnet" "private" {
  count             = length(var.availability_zones)
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.${count.index + 10}.0/24"
  availability_zone = var.availability_zones[count.index]
  
  tags = {
    Name = "${var.project_name}-private-subnet-${count.index + 1}-${var.environment}"
    Type = "Private"
  }
}

# NAT Gateway for private subnets
resource "aws_eip" "nat" {
  count  = length(var.availability_zones)
  domain = "vpc"
  
  tags = {
    Name = "${var.project_name}-nat-eip-${count.index + 1}-${var.environment}"
  }
}

resource "aws_nat_gateway" "main" {
  count         = length(var.availability_zones)
  allocation_id = aws_eip.nat[count.index].id
  subnet_id     = aws_subnet.public[count.index].id
  
  tags = {
    Name = "${var.project_name}-nat-gateway-${count.index + 1}-${var.environment}"
  }
  
  depends_on = [aws_internet_gateway.main]
}

# Route Tables
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }
  
  tags = {
    Name = "${var.project_name}-public-rt-${var.environment}"
  }
}

resource "aws_route_table" "private" {
  count  = length(var.availability_zones)
  vpc_id = aws_vpc.main.id
  
  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.main[count.index].id
  }
  
  tags = {
    Name = "${var.project_name}-private-rt-${count.index + 1}-${var.environment}"
  }
}

# Route Table Associations
resource "aws_route_table_association" "public" {
  count          = length(aws_subnet.public)
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "private" {
  count          = length(aws_subnet.private)
  subnet_id      = aws_subnet.private[count.index].id
  route_table_id = aws_route_table.private[count.index].id
}

# Security Groups
resource "aws_security_group" "web" {
  name_prefix = "${var.project_name}-web-"
  vpc_id      = aws_vpc.main.id
  
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  tags = {
    Name = "${var.project_name}-web-sg-${var.environment}"
  }
}

resource "aws_security_group" "database" {
  name_prefix = "${var.project_name}-db-"
  vpc_id      = aws_vpc.main.id
  
  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.web.id]
  }
  
  tags = {
    Name = "${var.project_name}-db-sg-${var.environment}"
  }
}

# EKS Cluster
resource "aws_eks_cluster" "main" {
  name     = "${var.project_name}-cluster-${var.environment}"
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
    aws_iam_role_policy_attachment.eks_vpc_resource_controller,
  ]
  
  tags = {
    Name = "${var.project_name}-eks-${var.environment}"
  }
}

# EKS Node Group
resource "aws_eks_node_group" "main" {
  cluster_name    = aws_eks_cluster.main.name
  node_group_name = "${var.project_name}-nodes-${var.environment}"
  node_role_arn   = aws_iam_role.eks_node_group.arn
  subnet_ids      = aws_subnet.private[*].id
  
  capacity_type  = "ON_DEMAND"
  instance_types = ["t3.medium"]
  
  scaling_config {
    desired_size = 2
    max_size     = 4
    min_size     = 1
  }
  
  update_config {
    max_unavailable = 1
  }
  
  depends_on = [
    aws_iam_role_policy_attachment.eks_worker_node_policy,
    aws_iam_role_policy_attachment.eks_cni_policy,
    aws_iam_role_policy_attachment.eks_container_registry_policy,
  ]
  
  tags = {
    Name = "${var.project_name}-eks-nodes-${var.environment}"
  }
}

# RDS Database
resource "aws_db_subnet_group" "main" {
  name       = "${var.project_name}-db-subnet-group-${var.environment}"
  subnet_ids = aws_subnet.private[*].id
  
  tags = {
    Name = "${var.project_name}-db-subnet-group-${var.environment}"
  }
}

resource "aws_db_instance" "main" {
  identifier             = "${var.project_name}-db-${var.environment}"
  engine                 = "postgres"
  engine_version         = "15.4"
  instance_class         = var.environment == "prod" ? "db.t3.medium" : "db.t3.micro"
  allocated_storage      = var.environment == "prod" ? 100 : 20
  max_allocated_storage  = var.environment == "prod" ? 1000 : 100
  
  db_name  = "appdb"
  username = "dbadmin"
  password = random_password.db_password.result
  
  vpc_security_group_ids = [aws_security_group.database.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name
  
  backup_retention_period = var.environment == "prod" ? 7 : 1
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"
  
  skip_final_snapshot = var.environment != "prod"
  deletion_protection = var.environment == "prod"
  
  tags = {
    Name = "${var.project_name}-db-${var.environment}"
  }
}

resource "random_password" "db_password" {
  length  = 16
  special = true
}

# Store DB password in AWS Secrets Manager
resource "aws_secretsmanager_secret" "db_password" {
  name                    = "${var.project_name}-db-password-${var.environment}"
  description             = "Database password for ${var.project_name} ${var.environment}"
  recovery_window_in_days = var.environment == "prod" ? 30 : 0
}

resource "aws_secretsmanager_secret_version" "db_password" {
  secret_id     = aws_secretsmanager_secret.db_password.id
  secret_string = jsonencode({
    username = aws_db_instance.main.username
    password = random_password.db_password.result
    endpoint = aws_db_instance.main.endpoint
    port     = aws_db_instance.main.port
    dbname   = aws_db_instance.main.db_name
  })
}

# Outputs
output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

output "eks_cluster_endpoint" {
  description = "EKS cluster endpoint"
  value       = aws_eks_cluster.main.endpoint
}

output "eks_cluster_name" {
  description = "EKS cluster name"
  value       = aws_eks_cluster.main.name
}

output "database_endpoint" {
  description = "Database endpoint"
  value       = aws_db_instance.main.endpoint
  sensitive   = true
}

# 2. ANSIBLE PLAYBOOKS - Configuration Management

# ansible/playbook.yml
---
- name: Configure Application Servers
  hosts: web_servers
  become: yes
  vars:
    app_name: "myapp"
    app_version: "{{ lookup('env', 'APP_VERSION') | default('latest') }}"
    app_port: 3000
    
  tasks:
    - name: Update system packages
      apt:
        update_cache: yes
        upgrade: dist
        autoremove: yes
      
    - name: Install required packages
      apt:
        name:
          - nginx
          - nodejs
          - npm
          - postgresql-client
          - certbot
          - python3-certbot-nginx
        state: present
        
    - name: Create application user
      user:
        name: "{{ app_name }}"
        shell: /bin/bash
        home: "/home/{{ app_name }}"
        create_home: yes
        system: yes
        
    - name: Create application directories
      file:
        path: "{{ item }}"
        state: directory
        owner: "{{ app_name }}"
        group: "{{ app_name }}"
        mode: '0755'
      loop:
        - "/opt/{{ app_name }}"
        - "/var/log/{{ app_name }}"
        - "/etc/{{ app_name }}"
        
    - name: Deploy application code
      git:
        repo: "{{ app_repo_url }}"
        dest: "/opt/{{ app_name }}"
        version: "{{ app_version }}"
        force: yes
      become_user: "{{ app_name }}"
      notify: restart application
      
    - name: Install Node.js dependencies
      npm:
        path: "/opt/{{ app_name }}"
        production: yes
        ci: yes
      become_user: "{{ app_name }}"
      
    - name: Template application configuration
      template:
        src: app.conf.j2
        dest: "/etc/{{ app_name }}/app.conf"
        owner: "{{ app_name }}"
        group: "{{ app_name }}"
        mode: '0600'
      notify: restart application
      
    - name: Template systemd service
      template:
        src: app.service.j2
        dest: "/etc/systemd/system/{{ app_name }}.service"
        owner: root
        group: root
        mode: '0644'
      notify:
        - reload systemd
        - restart application
        
    - name: Configure nginx
      template:
        src: nginx.conf.j2
        dest: "/etc/nginx/sites-available/{{ app_name }}"
        owner: root
        group: root
        mode: '0644'
      notify: restart nginx
      
    - name: Enable nginx site
      file:
        src: "/etc/nginx/sites-available/{{ app_name }}"
        dest: "/etc/nginx/sites-enabled/{{ app_name }}"
        state: link
      notify: restart nginx
      
    - name: Remove default nginx site
      file:
        path: /etc/nginx/sites-enabled/default
        state: absent
      notify: restart nginx
      
    - name: Start and enable services
      systemd:
        name: "{{ item }}"
        state: started
        enabled: yes
        daemon_reload: yes
      loop:
        - nginx
        - "{{ app_name }}"
        
    - name: Configure firewall
      ufw:
        rule: allow
        port: "{{ item }}"
        proto: tcp
      loop:
        - "22"
        - "80"
        - "443"
        
    - name: Enable firewall
      ufw:
        state: enabled
        policy: deny
        direction: incoming
        
  handlers:
    - name: reload systemd
      systemd:
        daemon_reload: yes
        
    - name: restart application
      systemd:
        name: "{{ app_name }}"
        state: restarted
        
    - name: restart nginx
      systemd:
        name: nginx
        state: restarted

# 3. HELM CHARTS - Kubernetes Application Management

# charts/myapp/Chart.yaml
apiVersion: v2
name: myapp
description: A Helm chart for MyApp
type: application
version: 0.1.0
appVersion: "1.0.0"
dependencies:
  - name: postgresql
    version: 12.x.x
    repository: https://charts.bitnami.com/bitnami
    condition: postgresql.enabled

# charts/myapp/values.yaml
# Default values for myapp
replicaCount: 2

image:
  repository: myregistry/myapp
  pullPolicy: IfNotPresent
  tag: ""

nameOverride: ""
fullnameOverride: ""

service:
  type: ClusterIP
  port: 80
  targetPort: 3000

ingress:
  enabled: true
  className: "nginx"
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/rate-limit: "100"
  hosts:
    - host: myapp.example.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: myapp-tls
      hosts:
        - myapp.example.com

resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 250m
    memory: 256Mi

autoscaling:
  enabled: true
  minReplicas: 2
  maxReplicas: 10
  targetCPUUtilizationPercentage: 80
  targetMemoryUtilizationPercentage: 80

postgresql:
  enabled: true
  auth:
    database: myapp
    username: myapp
  primary:
    persistence:
      enabled: true
      size: 8Gi

monitoring:
  enabled: true
  serviceMonitor:
    enabled: true

# charts/myapp/templates/deployment.yaml
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
              path: /health
              port: http
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /ready
              port: http
            initialDelaySeconds: 5
            periodSeconds: 5
          env:
            - name: NODE_ENV
              value: "production"
            - name: PORT
              value: "{{ .Values.service.targetPort }}"
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: {{ include "myapp.fullname" . }}-db
                  key: url
          resources:
            {{- toYaml .Values.resources | nindent 12 }}
          volumeMounts:
            - name: config
              mountPath: /app/config
              readOnly: true
      volumes:
        - name: config
          configMap:
            name: {{ include "myapp.fullname" . }}-config
```
*Notice: Infrastructure as Code requires careful state management and should include proper backup and disaster recovery procedures.*

</div>

### Monitoring and Observability {#monitoring-observability}
<!-- tags: monitoring, prometheus, grafana, logging, alerting -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Monitoring and observability provide visibility into system health and performance. **Prometheus** collects metrics with pull-based architecture, **Grafana** visualizes data with dashboards, **ELK Stack** (Elasticsearch, Logstash, Kibana) handles log aggregation, **Jaeger** traces distributed requests, **AlertManager** handles notifications. **Three pillars**: metrics (quantitative data), logs (event records), traces (request flow). Modern approach includes **SLIs/SLOs** (Service Level Indicators/Objectives) for reliability.*

</div>

<div class="runnable-model" data-filter="monitoring">

**Runnable mental model**
```yaml
# 1. PROMETHEUS CONFIGURATION

# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s
  external_labels:
    cluster: 'production'
    region: 'us-west-2'

rule_files:
  - "alert_rules.yml"
  - "recording_rules.yml"

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager:9093

scrape_configs:
  # Prometheus itself
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  # Node Exporter (system metrics)
  - job_name: 'node-exporter'
    kubernetes_sd_configs:
      - role: endpoints
        namespaces:
          names:
            - monitoring
    relabel_configs:
      - source_labels: [__meta_kubernetes_service_name]
        action: keep
        regex: node-exporter

  # Application metrics
  - job_name: 'myapp'
    kubernetes_sd_configs:
      - role: endpoints
        namespaces:
          names:
            - default
            - production
    relabel_configs:
      - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_scrape]
        action: keep
        regex: true
      - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_path]
        action: replace
        target_label: __metrics_path__
        regex: (.+)
      - source_labels: [__address__, __meta_kubernetes_service_annotation_prometheus_io_port]
        action: replace
        regex: ([^:]+)(?::\d+)?;(\d+)
        replacement: $1:$2
        target_label: __address__

  # Kubernetes API Server
  - job_name: 'kubernetes-apiservers'
    kubernetes_sd_configs:
      - role: endpoints
    scheme: https
    tls_config:
      ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
    bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
    relabel_configs:
      - source_labels: [__meta_kubernetes_namespace, __meta_kubernetes_service_name, __meta_kubernetes_endpoint_port_name]
        action: keep
        regex: default;kubernetes;https

  # Kubernetes Pods
  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
        action: replace
        target_label: __metrics_path__
        regex: (.+)
      - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]
        action: replace
        regex: ([^:]+)(?::\d+)?;(\d+)
        replacement: $1:$2
        target_label: __address__

# alert_rules.yml
groups:
  - name: application_alerts
    rules:
      - alert: HighErrorRate
        expr: |
          (
            rate(http_requests_total{status=~"5.."}[5m]) /
            rate(http_requests_total[5m])
          ) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"
          description: "Error rate is {{ $value | humanizePercentage }} for {{ $labels.job }}"

      - alert: HighLatency
        expr: |
          histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 0.5
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "High latency detected"
          description: "95th percentile latency is {{ $value }}s for {{ $labels.job }}"

      - alert: ServiceDown
        expr: up == 0
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "Service {{ $labels.job }} is down"
          description: "Service {{ $labels.job }} has been down for more than 2 minutes"

      - alert: HighMemoryUsage
        expr: |
          (
            node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes
          ) / node_memory_MemTotal_bytes > 0.8
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High memory usage"
          description: "Memory usage is {{ $value | humanizePercentage }} on {{ $labels.instance }}"

      - alert: HighCPUUsage
        expr: 100 - (avg by(instance) (rate(node_cpu_seconds_total{mode="idle"}[2m])) * 100) > 80
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High CPU usage"
          description: "CPU usage is {{ $value }}% on {{ $labels.instance }}"

      - alert: DiskSpaceLow
        expr: |
          (
            node_filesystem_avail_bytes{mountpoint="/",fstype!="rootfs"} /
            node_filesystem_size_bytes{mountpoint="/",fstype!="rootfs"}
          ) < 0.1
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Low disk space"
          description: "Disk space is {{ $value | humanizePercentage }} on {{ $labels.instance }}"

# recording_rules.yml
groups:
  - name: application_rules
    interval: 30s
    rules:
      - record: app:http_request_rate
        expr: sum(rate(http_requests_total[1m])) by (job, instance)

      - record: app:http_error_rate
        expr: |
          sum(rate(http_requests_total{status=~"4.."}[1m])) by (job, instance) +
          sum(rate(http_requests_total{status=~"5.."}[1m])) by (job, instance)

      - record: app:http_success_rate
        expr: |
          sum(rate(http_requests_total{status=~"2.."}[1m])) by (job, instance)

      - record: app:response_time_99th
        expr: |
          histogram_quantile(0.99, sum(rate(http_request_duration_seconds_bucket[5m])) by (job, instance, le))

# 2. GRAFANA DASHBOARD CONFIGURATION

# dashboard.json (simplified)
{
  "dashboard": {
    "title": "Application Monitoring",
    "panels": [
      {
        "title": "Request Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "sum(rate(http_requests_total[1m])) by (job)",
            "legendFormat": "{{ job }}"
          }
        ]
      },
      {
        "title": "Error Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "(sum(rate(http_requests_total{status=~\"5..\"}[5m])) / sum(rate(http_requests_total[5m]))) * 100",
            "legendFormat": "Error Rate %"
          }
        ]
      },
      {
        "title": "Response Time",
        "type": "graph",
        "targets": [
          {
            "expr": "histogram_quantile(0.50, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))",
            "legendFormat": "50th percentile"
          },
          {
            "expr": "histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))",
            "legendFormat": "95th percentile"
          },
          {
            "expr": "histogram_quantile(0.99, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))",
            "legendFormat": "99th percentile"
          }
        ]
      }
    ]
  }
}

# 3. ELASTICSEARCH AND KIBANA CONFIGURATION

# docker-compose.yml for ELK Stack
version: '3.8'
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.10.0
    environment:
      - node.name=elasticsearch
      - cluster.name=docker-cluster
      - discovery.type=single-node
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
      - xpack.security.enabled=false
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - esdata:/usr/share/elasticsearch/data
    ports:
      - "9200:9200"

  kibana:
    image: docker.elastic.co/kibana/kibana:8.10.0
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    ports:
      - "5601:5601"
    depends_on:
      - elasticsearch

  logstash:
    image: docker.elastic.co/logstash/logstash:8.10.0
    volumes:
      - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf:ro
    ports:
      - "5044:5044"
    depends_on:
      - elasticsearch

volumes:
  esdata:

# logstash.conf
input {
  beats {
    port => 5044
  }
  
  http {
    port => 8080
    codec => json
  }
}

filter {
  if [fields][log_type] == "application" {
    grok {
      match => { "message" => "%{TIMESTAMP_ISO8601:timestamp} %{LOGLEVEL:level} %{DATA:logger} - %{GREEDYDATA:message}" }
    }
    
    date {
      match => [ "timestamp", "ISO8601" ]
    }
    
    mutate {
      remove_field => [ "host" ]
    }
  }
  
  if [fields][log_type] == "nginx" {
    grok {
      match => { "message" => "%{NGINXACCESS}" }
    }
    
    mutate {
      convert => { "response" => "integer" }
      convert => { "bytes" => "integer" }
    }
    
    geoip {
      source => "clientip"
    }
  }
}

output {
  elasticsearch {
    hosts => ["elasticsearch:9200"]
    index => "logs-%{+YYYY.MM.dd}"
  }
  
  stdout {
    codec => rubydebug
  }
}

# 4. APPLICATION INSTRUMENTATION

# Node.js Express application with metrics
const express = require('express');
const promClient = require('prom-client');
const winston = require('winston');

const app = express();

// Create a Registry to register metrics
const register = new promClient.Registry();

// Add default metrics
promClient.collectDefaultMetrics({
  register,
  prefix: 'myapp_',
});

// Custom metrics
const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});

const httpRequestTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status']
});

const activeConnections = new promClient.Gauge({
  name: 'active_connections',
  help: 'Number of active connections'
});

register.registerMetric(httpRequestDuration);
register.registerMetric(httpRequestTotal);
register.registerMetric(activeConnections);

// Logging configuration
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// Middleware for metrics
app.use((req, res, next) => {
  const start = Date.now();
  
  activeConnections.inc();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route ? req.route.path : req.url;
    
    httpRequestDuration
      .labels(req.method, route, res.statusCode)
      .observe(duration);
      
    httpRequestTotal
      .labels(req.method, route, res.statusCode)
      .inc();
      
    activeConnections.dec();
    
    // Log request
    logger.info('HTTP Request', {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: duration,
      userAgent: req.get('User-Agent'),
      ip: req.ip
    });
  });
  
  next();
});

// Health check endpoints
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/ready', (req, res) => {
  // Check dependencies (database, external services)
  res.status(200).json({ status: 'ready' });
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Error handling
app.use((error, req, res, next) => {
  logger.error('Unhandled error', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method
  });
  
  res.status(500).json({ error: 'Internal server error' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
});

# 5. ALERTMANAGER CONFIGURATION

# alertmanager.yml
global:
  smtp_smarthost: 'smtp.gmail.com:587'
  smtp_from: 'alerts@mycompany.com'
  smtp_auth_username: 'alerts@mycompany.com'
  smtp_auth_password: 'app_password'

route:
  group_by: ['alertname']
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 1h
  receiver: 'web.hook'
  routes:
    - match:
        severity: critical
      receiver: 'critical-alerts'
    - match:
        severity: warning
      receiver: 'warning-alerts'

receivers:
  - name: 'web.hook'
    webhook_configs:
      - url: 'http://slack-webhook:5001/webhook'

  - name: 'critical-alerts'
    email_configs:
      - to: 'oncall@mycompany.com'
        subject: 'CRITICAL: {{ .GroupLabels.alertname }}'
        body: |
          {{ range .Alerts }}
          Alert: {{ .Annotations.summary }}
          Description: {{ .Annotations.description }}
          {{ end }}
    slack_configs:
      - api_url: 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK'
        channel: '#critical-alerts'
        title: 'Critical Alert'
        text: '{{ range .Alerts }}{{ .Annotations.summary }}{{ end }}'

  - name: 'warning-alerts'
    slack_configs:
      - api_url: 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK'
        channel: '#warnings'
        title: 'Warning Alert'
        text: '{{ range .Alerts }}{{ .Annotations.summary }}{{ end }}'

inhibit_rules:
  - source_match:
      severity: 'critical'
    target_match:
      severity: 'warning'
    equal: ['alertname', 'instance']
```
*Notice: Effective monitoring requires defining clear SLIs/SLOs and implementing proper alerting to avoid alert fatigue.*

</div>

### DevSecOps and Security {#devsecops-security}
<!-- tags: security, devsecops, vulnerability, compliance, secrets -->

<div class="concept-section definition">

📋 **Concept Definition**  
*DevSecOps integrates security practices throughout the development lifecycle. **Security scanning** includes SAST (Static Application Security Testing), DAST (Dynamic), SCA (Software Composition Analysis), container scanning. **Secrets management** with HashiCorp Vault, AWS Secrets Manager, Azure Key Vault. **Compliance** automation with policy as code using OPA (Open Policy Agent), Falco for runtime security. **Zero Trust** architecture with service mesh, mTLS, RBAC. Security should be **shifted left** into development phases.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Early detection**: Find vulnerabilities before production
- **Compliance automation**: Meet regulatory requirements consistently
- **Reduced risk**: Minimize security incidents and breaches
- **Cost efficiency**: Fix security issues early in development cycle

</div>

<div class="runnable-model" data-filter="security">

**Runnable mental model**
```yaml
# 1. SECURITY SCANNING IN CI/CD PIPELINE

# .github/workflows/security.yml
name: Security Scan

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 2 * * 1'  # Weekly scan

jobs:
  security-scan:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Full history for better analysis
          
      # SAST - Static Application Security Testing
      - name: Run CodeQL Analysis
        uses: github/codeql-action/init@v2
        with:
          languages: javascript, python, java
          
      - name: Run SAST with Semgrep
        uses: returntocorp/semgrep-action@v1
        with:
          config: >-
            p/security-audit
            p/secrets
            p/owasp-top-ten
            p/cwe-top-25
        env:
          SEMGREP_APP_TOKEN: ${{ secrets.SEMGREP_APP_TOKEN }}
          
      - name: Run Bandit (Python Security)
        run: |
          pip install bandit[toml]
          bandit -r . -f json -o bandit-report.json || true
          
      - name: Run ESLint Security Plugin
        run: |
          npm install eslint eslint-plugin-security
          npx eslint . --ext .js,.ts --format json --output-file eslint-security.json || true
          
      # SCA - Software Composition Analysis
      - name: Run Snyk to check for vulnerabilities
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high --json-file-output=snyk-report.json
          
      - name: OWASP Dependency Check
        uses: dependency-check/Dependency-Check_Action@main
        with:
          project: 'MyApp'
          path: '.'
          format: 'JSON'
          args: >
            --enableRetired
            --enableExperimental
            --nvdApiKey ${{ secrets.NVD_API_KEY }}
            
      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          format: 'sarif'
          output: 'trivy-results.sarif'
          
      # Container Security
      - name: Build Docker image
        run: |
          docker build -t myapp:${{ github.sha }} .
          
      - name: Run Trivy container scan
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: 'myapp:${{ github.sha }}'
          format: 'sarif'
          output: 'trivy-container.sarif'
          
      - name: Run Hadolint (Dockerfile linter)
        uses: hadolint/hadolint-action@v3.1.0
        with:
          dockerfile: Dockerfile
          format: sarif
          output-file: hadolint-results.sarif
          
      # Secrets Detection
      - name: Run GitLeaks
        uses: zricethezav/gitleaks-action@v1.6.0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          
      - name: Run TruffleHog
        run: |
          docker run --rm -v "$PWD:/pwd" trufflesecurity/trufflehog:latest github --repo https://github.com/${{ github.repository }} --json > trufflehog-results.json || true
          
      # Infrastructure Security
      - name: Run Checkov (IaC Security)
        run: |
          pip install checkov
          checkov -d . --framework terraform,kubernetes,dockerfile --output json --output-file checkov-report.json || true
          
      - name: Run tfsec (Terraform Security)
        uses: aquasecurity/tfsec-action@v1.0.3
        with:
          soft_fail: true
          format: sarif
          output: tfsec-results.sarif
          
      # Upload results
      - name: Upload SARIF results to GitHub Security
        uses: github/codeql-action/upload-sarif@v2
        if: always()
        with:
          sarif_file: |
            trivy-results.sarif
            trivy-container.sarif
            hadolint-results.sarif
            tfsec-results.sarif
            
      - name: Upload security reports
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: security-reports
          path: |
            bandit-report.json
            eslint-security.json
            snyk-report.json
            checkov-report.json
            trufflehog-results.json
            
  compliance-check:
    runs-on: ubuntu-latest
    needs: security-scan
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Run Compliance Check
        run: |
          # Custom compliance script
          python scripts/compliance-check.py
          
      - name: Generate Security Report
        run: |
          python scripts/generate-security-report.py

# 2. SECRETS MANAGEMENT WITH VAULT

# vault-config.hcl
storage "consul" {
  address = "127.0.0.1:8500"
  path    = "vault/"
}

listener "tcp" {
  address     = "0.0.0.0:8200"
  tls_disable = false
  tls_cert_file = "/etc/vault/tls/vault.crt"
  tls_key_file  = "/etc/vault/tls/vault.key"
}

seal "awskms" {
  region     = "us-west-2"
  kms_key_id = "alias/vault-unseal-key"
}

api_addr = "https://vault.example.com:8200"
cluster_addr = "https://vault.example.com:8201"

ui = true

# Vault policies
# database-policy.hcl
path "database/creds/myapp-role" {
  capabilities = ["read"]
}

path "secret/data/myapp/*" {
  capabilities = ["read", "list"]
}

# Application integration with Vault
# vault-integration.js
const vault = require('node-vault')({
  apiVersion: 'v1',
  endpoint: process.env.VAULT_ADDR,
  token: process.env.VAULT_TOKEN
});

class SecretsManager {
  constructor() {
    this.vault = vault;
    this.cache = new Map();
    this.renewalIntervals = new Map();
  }

  async getSecret(path) {
    try {
      // Check cache first
      if (this.cache.has(path)) {
        const cached = this.cache.get(path);
        if (Date.now() < cached.expiry) {
          return cached.data;
        }
      }

      const result = await this.vault.read(path);
      
      // Cache with TTL
      const expiry = Date.now() + (result.lease_duration * 1000 * 0.8); // Renew at 80% of lease
      this.cache.set(path, {
        data: result.data,
        expiry,
        leaseId: result.lease_id
      });

      // Set up renewal if needed
      if (result.lease_id) {
        this.scheduleRenewal(path, result.lease_id, result.lease_duration);
      }

      return result.data;
    } catch (error) {
      console.error(`Failed to retrieve secret from ${path}:`, error);
      throw error;
    }
  }

  async getDatabaseCredentials(role) {
    const path = `database/creds/${role}`;
    const creds = await this.getSecret(path);
    return {
      username: creds.username,
      password: creds.password,
      connectionString: `postgresql://${creds.username}:${creds.password}@db:5432/myapp`
    };
  }

  scheduleRenewal(path, leaseId, duration) {
    const renewalTime = duration * 1000 * 0.8; // Renew at 80%
    
    const intervalId = setTimeout(async () => {
      try {
        await this.vault.renew(leaseId);
        console.log(`Renewed lease for ${path}`);
      } catch (error) {
        console.error(`Failed to renew lease for ${path}:`, error);
        this.cache.delete(path);
      }
    }, renewalTime);

    this.renewalIntervals.set(path, intervalId);
  }

  async shutdown() {
    // Clear all renewal intervals
    for (const intervalId of this.renewalIntervals.values()) {
      clearTimeout(intervalId);
    }
    this.renewalIntervals.clear();
    this.cache.clear();
  }
}

module.exports = SecretsManager;

# 3. POLICY AS CODE WITH OPA

# security-policies.rego
package kubernetes.admission

import rego.v1

# Deny containers running as root
deny contains msg if {
    input.request.kind.kind == "Pod"
    some container in input.request.object.spec.containers
    container.securityContext.runAsUser == 0
    msg := "Container must not run as root user"
}

# Require security context
deny contains msg if {
    input.request.kind.kind == "Pod"
    some container in input.request.object.spec.containers
    not container.securityContext
    msg := "Container must have securityContext defined"
}

# Deny privileged containers
deny contains msg if {
    input.request.kind.kind == "Pod"
    some container in input.request.object.spec.containers
    container.securityContext.privileged == true
    msg := "Privileged containers are not allowed"
}

# Require resource limits
deny contains msg if {
    input.request.kind.kind == "Pod"
    some container in input.request.object.spec.containers
    not container.resources.limits
    msg := "Container must have resource limits defined"
}

# Deny latest tag
deny contains msg if {
    input.request.kind.kind == "Pod"
    some container in input.request.object.spec.containers
    endswith(container.image, ":latest")
    msg := "Container images must not use 'latest' tag"
}

# Require specific registries
allowed_registries := [
    "myregistry.com",
    "docker.io/myorg",
    "gcr.io/myproject"
]

deny contains msg if {
    input.request.kind.kind == "Pod"
    some container in input.request.object.spec.containers
    not registry_allowed(container.image)
    msg := sprintf("Container image must be from allowed registry: %v", [allowed_registries])
}

registry_allowed(image) if {
    some registry in allowed_registries
    startswith(image, registry)
}

# Network policies
package kubernetes.networkpolicy

# Deny all by default
deny contains msg if {
    input.request.kind.kind == "NetworkPolicy"
    not input.request.object.spec.policyTypes
    msg := "NetworkPolicy must specify policyTypes"
}

# 4. RUNTIME SECURITY WITH FALCO

# falco_rules.yaml
- rule: Unauthorized Process in Container
  desc: Detect unauthorized processes in containers
  condition: >
    spawned_process and container and
    not proc.name in (authorized_processes) and
    not proc.pname in (authorized_parent_processes)
  output: >
    Unauthorized process in container (user=%user.name container=%container.name 
    image=%container.image.repository:%container.image.tag process=%proc.name 
    parent=%proc.pname cmdline=%proc.cmdline)
  priority: WARNING

- list: authorized_processes
  items: [node, npm, java, python, nginx, apache2, mysqld, postgres]

- list: authorized_parent_processes
  items: [systemd, init, docker-entrypoint, tini]

- rule: File Below /etc Modified
  desc: Detect modifications to files below /etc
  condition: >
    modify and fd.name startswith /etc and
    not proc.name in (package_management_binaries) and
    not proc.name in (editor_binaries)
  output: >
    File below /etc modified (user=%user.name command=%proc.cmdline 
    file=%fd.name container=%container.name image=%container.image.repository)
  priority: WARNING

- rule: Network Connection Outside Cluster
  desc: Detect network connections to external IPs
  condition: >
    outbound and fd.sip not in (private_network_cidrs) and
    not fd.sip in (allowed_external_ips)
  output: >
    Network connection outside cluster (user=%user.name command=%proc.cmdline 
    connection=%fd.name container=%container.name)
  priority: INFO

- list: private_network_cidrs
  items: ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16"]

- list: allowed_external_ips
  items: ["8.8.8.8", "1.1.1.1"]

# 5. ZERO TRUST NETWORK WITH ISTIO

# istio-security.yaml
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: production
spec:
  mtls:
    mode: STRICT

---
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: frontend-access
  namespace: production
spec:
  selector:
    matchLabels:
      app: frontend
  rules:
  - from:
    - source:
        principals: ["cluster.local/ns/production/sa/frontend"]
  - to:
    - operation:
        methods: ["GET", "POST"]
        paths: ["/api/*"]

---
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: database-access
  namespace: production
spec:
  selector:
    matchLabels:
      app: database
  rules:
  - from:
    - source:
        principals: ["cluster.local/ns/production/sa/backend"]
  - to:
    - operation:
        ports: ["5432"]

---
# Request Authentication with JWT
apiVersion: security.istio.io/v1beta1
kind: RequestAuthentication
metadata:
  name: jwt-auth
  namespace: production
spec:
  selector:
    matchLabels:
      app: api
  jwtRules:
  - issuer: "https://auth.mycompany.com"
    jwksUri: "https://auth.mycompany.com/.well-known/jwks.json"
    audiences:
    - "myapp-api"

---
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: require-jwt
  namespace: production
spec:
  selector:
    matchLabels:
      app: api
  rules:
  - from:
    - source:
        requestPrincipals: ["https://auth.mycompany.com/*"]
  - to:
    - operation:
        methods: ["GET", "POST", "PUT", "DELETE"]

# 6. SECURITY COMPLIANCE AUTOMATION

# compliance-check.py
#!/usr/bin/env python3

import json
import sys
import subprocess
from datetime import datetime

class ComplianceChecker:
    def __init__(self):
        self.findings = []
        self.compliance_standards = {
            'SOC2': self.check_soc2_compliance,
            'PCI_DSS': self.check_pci_compliance,
            'GDPR': self.check_gdpr_compliance,
            'HIPAA': self.check_hipaa_compliance
        }

    def check_soc2_compliance(self):
        """Check SOC 2 Type II compliance requirements"""
        findings = []
        
        # Security
        findings.extend(self.check_access_controls())
        findings.extend(self.check_encryption())
        findings.extend(self.check_logging())
        
        # Availability
        findings.extend(self.check_backup_procedures())
        findings.extend(self.check_monitoring())
        
        # Processing Integrity
        findings.extend(self.check_data_validation())
        
        # Confidentiality
        findings.extend(self.check_data_classification())
        
        # Privacy
        findings.extend(self.check_data_retention())
        
        return findings

    def check_access_controls(self):
        """Verify proper access controls are in place"""
        findings = []
        
        # Check RBAC implementation
        try:
            result = subprocess.run(['kubectl', 'get', 'rolebindings', '--all-namespaces', '-o', 'json'], 
                                  capture_output=True, text=True)
            if result.returncode == 0:
                bindings = json.loads(result.stdout)
                if len(bindings['items']) == 0:
                    findings.append({
                        'standard': 'SOC2',
                        'control': 'CC6.1',
                        'finding': 'No RBAC role bindings found',
                        'severity': 'HIGH',
                        'remediation': 'Implement proper RBAC controls'
                    })
        except Exception as e:
            findings.append({
                'standard': 'SOC2',
                'control': 'CC6.1',
                'finding': f'Unable to check RBAC: {str(e)}',
                'severity': 'MEDIUM'
            })
            
        return findings

    def check_encryption(self):
        """Verify encryption at rest and in transit"""
        findings = []
        
        # Check for TLS certificates
        try:
            result = subprocess.run(['kubectl', 'get', 'secrets', '--all-namespaces', 
                                   '--field-selector=type=kubernetes.io/tls', '-o', 'json'],
                                  capture_output=True, text=True)
            if result.returncode == 0:
                secrets = json.loads(result.stdout)
                if len(secrets['items']) == 0:
                    findings.append({
                        'standard': 'SOC2',
                        'control': 'CC6.7',
                        'finding': 'No TLS certificates found',
                        'severity': 'HIGH',
                        'remediation': 'Implement TLS encryption for all communications'
                    })
        except Exception:
            pass
            
        return findings

    def generate_report(self):
        """Generate compliance report"""
        report = {
            'timestamp': datetime.now().isoformat(),
            'standards_checked': list(self.compliance_standards.keys()),
            'total_findings': len(self.findings),
            'findings_by_severity': {
                'CRITICAL': len([f for f in self.findings if f['severity'] == 'CRITICAL']),
                'HIGH': len([f for f in self.findings if f['severity'] == 'HIGH']),
                'MEDIUM': len([f for f in self.findings if f['severity'] == 'MEDIUM']),
                'LOW': len([f for f in self.findings if f['severity'] == 'LOW'])
            },
            'findings': self.findings
        }
        
        with open('compliance-report.json', 'w') as f:
            json.dump(report, f, indent=2)
            
        return report

    def run_all_checks(self):
        """Run all compliance checks"""
        for standard, check_func in self.compliance_standards.items():
            try:
                findings = check_func()
                self.findings.extend(findings)
            except Exception as e:
                self.findings.append({
                    'standard': standard,
                    'finding': f'Check failed: {str(e)}',
                    'severity': 'MEDIUM'
                })

if __name__ == '__main__':
    checker = ComplianceChecker()
    checker.run_all_checks()
    report = checker.generate_report()
    
    # Exit with error if critical findings
    critical_count = report['findings_by_severity']['CRITICAL']
    if critical_count > 0:
        print(f"CRITICAL: {critical_count} critical compliance findings detected")
        sys.exit(1)
    
    print(f"Compliance check completed. {len(checker.findings)} findings total.")
```
*Notice: Security must be integrated throughout the development lifecycle, not added as an afterthought. Regular security assessments and updates are essential.*

</div>

### GitOps and Advanced Deployment Strategies {#gitops-deployment}
<!-- tags: gitops, argocd, flux, deployment, canary, blue-green -->

<div class="concept-section definition">

📋 **Concept Definition**  
*GitOps uses Git repositories as the single source of truth for infrastructure and application configuration. **ArgoCD** and **Flux** are popular GitOps operators for Kubernetes. **Deployment strategies**: Blue-Green (parallel environments), Canary (gradual rollout), Rolling updates, A/B testing. **Progressive delivery** combines feature flags, traffic splitting, automated rollback. GitOps provides **declarative**, **versioned**, **auditable** deployments with automatic drift detection and self-healing.*

</div>

<div class="runnable-model" data-filter="gitops">

**Runnable mental model**
```yaml
# 1. ARGOCD SETUP AND CONFIGURATION

# argocd-install.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: argocd

---
apiVersion: argoproj.io/v1alpha1
kind: ArgoCD
metadata:
  name: argocd
  namespace: argocd
spec:
  server:
    route:
      enabled: true
      tls:
        termination: reencrypt
        insecureEdgeTerminationPolicy: Redirect
    ingress:
      enabled: true
      annotations:
        kubernetes.io/ingress.class: nginx
        cert-manager.io/cluster-issuer: letsencrypt-prod
      hosts:
      - argocd.example.com
      tls:
      - secretName: argocd-server-tls
        hosts:
        - argocd.example.com
  
  dex:
    openShiftOAuth: true
    config: |
      connectors:
      - type: github
        id: github
        name: GitHub
        config:
          clientID: $github-client-id
          clientSecret: $github-client-secret
          orgs:
          - name: myorg
  
  rbac:
    defaultPolicy: 'role:readonly'
    policy: |
      p, role:admin, applications, *, */*, allow
      p, role:admin, clusters, *, *, allow
      p, role:admin, repositories, *, *, allow
      p, role:developer, applications, *, myorg/*, allow
      p, role:developer, applications, sync, myorg/*, allow
      g, myorg:platform-team, role:admin
      g, myorg:developers, role:developer

# Application manifest
# applications/myapp.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: myapp-production
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  project: production
  source:
    repoURL: https://github.com/myorg/myapp-manifests
    targetRevision: HEAD
    path: overlays/production
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
      allowEmpty: false
    syncOptions:
    - CreateNamespace=true
    - PrunePropagationPolicy=foreground
    - PruneLast=true
    retry:
      limit: 5
      backoff:
        duration: 5s
        factor: 2
        maxDuration: 3m
  revisionHistoryLimit: 10

---
# AppProject for RBAC and restrictions
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: production
  namespace: argocd
spec:
  description: Production applications
  sourceRepos:
  - 'https://github.com/myorg/*'
  destinations:
  - namespace: 'production'
    server: https://kubernetes.default.svc
  - namespace: 'monitoring'
    server: https://kubernetes.default.svc
  clusterResourceWhitelist:
  - group: ''
    kind: Namespace
  - group: rbac.authorization.k8s.io
    kind: ClusterRole
  - group: rbac.authorization.k8s.io
    kind: ClusterRoleBinding
  namespaceResourceBlacklist:
  - group: ''
    kind: ResourceQuota
  - group: ''
    kind: LimitRange
  roles:
  - name: production-admin
    description: Admin access to production apps
    policies:
    - p, proj:production:production-admin, applications, *, production/*, allow
    groups:
    - myorg:platform-team

# 2. FLUX GITOPS SETUP

# flux-system/gotk-sync.yaml
apiVersion: source.toolkit.fluxcd.io/v1beta2
kind: GitRepository
metadata:
  name: flux-system
  namespace: flux-system
spec:
  interval: 1m0s
  ref:
    branch: main
  secretRef:
    name: flux-system
  url: https://github.com/myorg/fleet-infra

---
apiVersion: kustomize.toolkit.fluxcd.io/v1beta2
kind: Kustomization
metadata:
  name: flux-system
  namespace: flux-system
spec:
  interval: 10m0s
  path: ./clusters/production
  prune: true
  sourceRef:
    kind: GitRepository
    name: flux-system

# clusters/production/apps.yaml
apiVersion: kustomize.toolkit.fluxcd.io/v1beta2
kind: Kustomization
metadata:
  name: apps
  namespace: flux-system
spec:
  interval: 10m0s
  dependsOn:
    - name: infrastructure
  sourceRef:
    kind: GitRepository
    name: flux-system
  path: ./apps/production
  prune: true
  wait: true
  timeout: 5m
  postBuild:
    substitute:
      cluster_name: "production"
      cluster_region: "us-west-2"

# apps/production/myapp/release.yaml
apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: myapp
  namespace: production
spec:
  interval: 5m
  chart:
    spec:
      chart: myapp
      version: ">=1.0.0 <2.0.0"
      sourceRef:
        kind: HelmRepository
        name: myorg-charts
        namespace: flux-system
  values:
    image:
      tag: "1.2.3"
    replicaCount: 3
    ingress:
      hosts:
        - host: myapp.example.com
          paths:
            - path: /
              pathType: Prefix
  upgrade:
    remediation:
      retries: 3
  rollback:
    cleanupOnFail: true
  test:
    enable: true
  valuesFrom:
    - kind: Secret
      name: myapp-secrets
      valuesKey: values.yaml

# 3. PROGRESSIVE DELIVERY WITH FLAGGER

# flagger-canary.yaml
apiVersion: flagger.app/v1beta1
kind: Canary
metadata:
  name: myapp
  namespace: production
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp
  progressDeadlineSeconds: 60
  service:
    port: 80
    targetPort: 8080
    gateways:
    - myapp-gateway
    hosts:
    - myapp.example.com
  analysis:
    interval: 1m
    threshold: 5
    maxWeight: 50
    stepWeight: 10
    metrics:
    - name: request-success-rate
      thresholdRange:
        min: 99
      interval: 1m
    - name: request-duration
      thresholdRange:
        max: 500
      interval: 30s
    - name: cpu-usage
      thresholdRange:
        max: 80
      interval: 1m
    webhooks:
    - name: load-test
      url: http://flagger-loadtester.test/
      timeout: 5s
      metadata:
        cmd: "hey -z 1m -q 10 -c 2 http://myapp-canary.production:80/"
    - name: integration-test
      url: http://flagger-loadtester.test/
      timeout: 30s
      metadata:
        type: bash
        cmd: |
          curl -sd 'test' http://myapp-canary.production:80/api/info | \
          jq -r .version | grep -E '^[0-9]+\.[0-9]+\.[0-9]+$'

# Blue-Green deployment with Argo Rollouts
# rollout-bluegreen.yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: myapp-bluegreen
  namespace: production
spec:
  replicas: 3
  strategy:
    blueGreen:
      activeService: myapp-active
      previewService: myapp-preview
      autoPromotionEnabled: false
      scaleDownDelaySeconds: 30
      prePromotionAnalysis:
        templates:
        - templateName: success-rate
        args:
        - name: service-name
          value: myapp-preview
      postPromotionAnalysis:
        templates:
        - templateName: success-rate
        args:
        - name: service-name
          value: myapp-active
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
        image: myapp:latest
        ports:
        - containerPort: 8080
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5

---
# Analysis Template
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: success-rate
spec:
  args:
  - name: service-name
  metrics:
  - name: success-rate
    interval: 5m
    count: 3
    successCondition: result[0] >= 0.95
    failureLimit: 2
    provider:
      prometheus:
        address: http://prometheus.monitoring:9090
        query: |
          sum(irate(
            istio_requests_total{reporter="destination",destination_service_name="{{args.service-name}}",response_code!~"5.*"}[5m]
          )) / 
          sum(irate(
            istio_requests_total{reporter="destination",destination_service_name="{{args.service-name}}"}[5m]
          ))

# 4. FEATURE FLAGS INTEGRATION

# feature-flags-controller.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: feature-flags
  namespace: production
data:
  flags.yaml: |
    flags:
      new-checkout-flow:
        enabled: true
        rollout:
          percentage: 25
        targeting:
          rules:
            - variation: true
              conditions:
                - attribute: user_tier
                  operator: in
                  values: ["premium", "enterprise"]
            - variation: false
              conditions:
                - attribute: user_tier
                  operator: in
                  values: ["free"]
        variations:
          true:
            value: true
          false:
            value: false
      
      enhanced-dashboard:
        enabled: false
        rollout:
          percentage: 10
        targeting:
          rules:
            - variation: true
              conditions:
                - attribute: beta_user
                  operator: equals
                  value: true

# Application integration
# feature-flags.js
class FeatureFlagService {
  constructor() {
    this.flags = new Map();
    this.loadFlags();
    this.setupRefresh();
  }

  async loadFlags() {
    try {
      const response = await fetch('/api/feature-flags');
      const data = await response.json();
      this.flags = new Map(Object.entries(data.flags));
    } catch (error) {
      console.error('Failed to load feature flags:', error);
    }
  }

  isEnabled(flagName, context = {}) {
    const flag = this.flags.get(flagName);
    if (!flag || !flag.enabled) {
      return false;
    }

    // Check targeting rules
    if (flag.targeting && flag.targeting.rules) {
      for (const rule of flag.targeting.rules) {
        if (this.evaluateRule(rule, context)) {
          return rule.variation;
        }
      }
    }

    // Check rollout percentage
    if (flag.rollout && flag.rollout.percentage) {
      const hash = this.hashCode(context.userId || '');
      return (hash % 100) < flag.rollout.percentage;
    }

    return false;
  }

  evaluateRule(rule, context) {
    return rule.conditions.every(condition => {
      const value = context[condition.attribute];
      
      switch (condition.operator) {
        case 'equals':
          return value === condition.value;
        case 'in':
          return condition.values.includes(value);
        case 'not_in':
          return !condition.values.includes(value);
        default:
          return false;
      }
    });
  }

  hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  setupRefresh() {
    setInterval(() => {
      this.loadFlags();
    }, 30000); // Refresh every 30 seconds
  }
}

module.exports = FeatureFlagService;

# 5. DEPLOYMENT PIPELINE INTEGRATION

# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]
    tags: ['v*']

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
      
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
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
            
      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          
      - name: Update GitOps repository
        env:
          GITHUB_TOKEN: ${{ secrets.GITOPS_TOKEN }}
        run: |
          # Clone GitOps repo
          git clone https://github.com/myorg/gitops-repo.git
          cd gitops-repo
          
          # Update image tag
          sed -i "s/tag: .*/tag: \"${{ steps.meta.outputs.version }}\"/g" \
            apps/production/myapp/values.yaml
            
          # Commit and push
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add .
          git commit -m "Update myapp to ${{ steps.meta.outputs.version }}"
          git push
          
      - name: Wait for deployment
        run: |
          # Wait for ArgoCD to sync
          argocd app wait myapp-production --timeout 600
          
      - name: Run smoke tests
        run: |
          # Wait for rollout
          kubectl rollout status deployment/myapp -n production --timeout=300s
          
          # Run smoke tests
          curl -f https://myapp.example.com/health || exit 1
          
      - name: Notify deployment
        if: always()
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: |
            Deployment ${{ job.status }}
            Version: ${{ steps.meta.outputs.version }}
            Environment: Production
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```
*Notice: GitOps requires proper Git workflow practices and should include automated testing and validation of configuration changes.*

</div>

### Cloud-Native Architecture and Microservices {#cloud-native-microservices}
<!-- tags: microservices, cloud-native, service-mesh, api-gateway, event-driven -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Cloud-native architecture leverages containerization, microservices, and orchestration for scalable applications. **Microservices** decompose applications into independently deployable services. **Service mesh** (Istio, Linkerd) handles service-to-service communication, load balancing, security. **API Gateway** manages external requests, authentication, rate limiting. **Event-driven architecture** with message brokers (Kafka, RabbitMQ). **Twelve-Factor App** principles guide cloud-native design. Key patterns: Circuit Breaker, Bulkhead, Saga, CQRS.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Scalability**: Independent scaling of services
- **Resilience**: Fault isolation and graceful degradation
- **Development velocity**: Teams can work independently
- **Technology diversity**: Best tool for each service

</div>

<div class="runnable-model" data-filter="cloud-native">

**Runnable mental model**
```yaml
# 1. MICROSERVICES ARCHITECTURE SETUP

# API Gateway with Kong
apiVersion: v1
kind: Service
metadata:
  name: kong-gateway
  namespace: gateway
spec:
  type: LoadBalancer
  ports:
  - name: http
    port: 80
    targetPort: 8000
  - name: https
    port: 443
    targetPort: 8443
  - name: admin
    port: 8001
    targetPort: 8001
  selector:
    app: kong

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kong-gateway
  namespace: gateway
spec:
  replicas: 2
  selector:
    matchLabels:
      app: kong
  template:
    metadata:
      labels:
        app: kong
    spec:
      containers:
      - name: kong
        image: kong:3.4
        env:
        - name: KONG_DATABASE
          value: "off"
        - name: KONG_DECLARATIVE_CONFIG
          value: "/kong/declarative/kong.yml"
        - name: KONG_PROXY_ACCESS_LOG
          value: "/dev/stdout"
        - name: KONG_ADMIN_ACCESS_LOG
          value: "/dev/stdout"
        - name: KONG_PROXY_ERROR_LOG
          value: "/dev/stderr"
        - name: KONG_ADMIN_ERROR_LOG
          value: "/dev/stderr"
        - name: KONG_ADMIN_LISTEN
          value: "0.0.0.0:8001"
        ports:
        - containerPort: 8000
        - containerPort: 8443
        - containerPort: 8001
        volumeMounts:
        - name: kong-config
          mountPath: /kong/declarative
        livenessProbe:
          httpGet:
            path: /status
            port: 8001
          initialDelaySeconds: 30
        readinessProbe:
          httpGet:
            path: /status
            port: 8001
          initialDelaySeconds: 10
      volumes:
      - name: kong-config
        configMap:
          name: kong-declarative-config

---
# Kong Configuration
apiVersion: v1
kind: ConfigMap
metadata:
  name: kong-declarative-config
  namespace: gateway
data:
  kong.yml: |
    _format_version: "3.0"
    
    services:
    - name: user-service
      url: http://user-service.production:8080
      routes:
      - name: user-routes
        paths:
        - /api/users
        - /api/auth
        methods:
        - GET
        - POST
        - PUT
        - DELETE
        plugins:
        - name: rate-limiting
          config:
            minute: 100
            hour: 1000
        - name: jwt
          config:
            secret_is_base64: false
        - name: cors
          config:
            origins:
            - "https://myapp.example.com"
            credentials: true
    
    - name: order-service
      url: http://order-service.production:8080
      routes:
      - name: order-routes
        paths:
        - /api/orders
        methods:
        - GET
        - POST
        - PUT
        plugins:
        - name: rate-limiting
          config:
            minute: 200
            hour: 2000
        - name: request-size-limiting
          config:
            allowed_payload_size: 10
    
    - name: payment-service
      url: http://payment-service.production:8080
      routes:
      - name: payment-routes
        paths:
        - /api/payments
        methods:
        - POST
        plugins:
        - name: rate-limiting
          config:
            minute: 50
            hour: 500
        - name: ip-restriction
          config:
            deny:
            - "192.168.1.0/24"
    
    plugins:
    - name: prometheus
      config:
        per_consumer: true

# 2. SERVICE MESH WITH ISTIO

# Istio Gateway
apiVersion: networking.istio.io/v1beta1
kind: Gateway
metadata:
  name: myapp-gateway
  namespace: production
spec:
  selector:
    istio: ingressgateway
  servers:
  - port:
      number: 443
      name: https
      protocol: HTTPS
    tls:
      mode: SIMPLE
      credentialName: myapp-tls-secret
    hosts:
    - myapp.example.com
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - myapp.example.com
    tls:
      httpsRedirect: true

---
# Virtual Service for traffic routing
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: myapp-vs
  namespace: production
spec:
  hosts:
  - myapp.example.com
  gateways:
  - myapp-gateway
  http:
  - match:
    - uri:
        prefix: /api/users
    route:
    - destination:
        host: user-service
        port:
          number: 8080
      weight: 90
    - destination:
        host: user-service-v2
        port:
          number: 8080
      weight: 10
    fault:
      delay:
        percentage:
          value: 0.1
        fixedDelay: 5s
    retries:
      attempts: 3
      perTryTimeout: 2s
  
  - match:
    - uri:
        prefix: /api/orders
    route:
    - destination:
        host: order-service
        port:
          number: 8080
    timeout: 10s
  
  - match:
    - uri:
        prefix: /api/payments
    route:
    - destination:
        host: payment-service
        port:
          number: 8080
    headers:
      request:
        add:
          x-payment-source: "api-gateway"

---
# Destination Rules for load balancing
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: user-service-dr
  namespace: production
spec:
  host: user-service
  trafficPolicy:
    loadBalancer:
      simple: LEAST_CONN
    connectionPool:
      tcp:
        maxConnections: 100
      http:
        http1MaxPendingRequests: 50
        maxRequestsPerConnection: 2
    circuitBreaker:
      consecutiveGatewayErrors: 5
      interval: 30s
      baseEjectionTime: 30s
      maxEjectionPercent: 50
      minHealthPercent: 50
  subsets:
  - name: v1
    labels:
      version: v1
  - name: v2
    labels:
      version: v2

# 3. EVENT-DRIVEN ARCHITECTURE WITH KAFKA

# Kafka Cluster
apiVersion: kafka.strimzi.io/v1beta2
kind: Kafka
metadata:
  name: kafka-cluster
  namespace: kafka
spec:
  kafka:
    version: 3.5.0
    replicas: 3
    listeners:
    - name: plain
      port: 9092
      type: internal
      tls: false
    - name: tls
      port: 9093
      type: internal
      tls: true
    - name: external
      port: 9094
      type: nodeport
      tls: false
    config:
      offsets.topic.replication.factor: 3
      transaction.state.log.replication.factor: 3
      transaction.state.log.min.isr: 2
      default.replication.factor: 3
      min.insync.replicas: 2
      inter.broker.protocol.version: "3.5"
    storage:
      type: jbod
      volumes:
      - id: 0
        type: persistent-claim
        size: 100Gi
        deleteClaim: false
    resources:
      requests:
        memory: 2Gi
        cpu: 1000m
      limits:
        memory: 4Gi
        cpu: 2000m
  zookeeper:
    replicas: 3
    storage:
      type: persistent-claim
      size: 10Gi
      deleteClaim: false
    resources:
      requests:
        memory: 512Mi
        cpu: 500m
      limits:
        memory: 1Gi
        cpu: 1000m
  entityOperator:
    topicOperator: {}
    userOperator: {}

---
# Kafka Topics
apiVersion: kafka.strimzi.io/v1beta2
kind: KafkaTopic
metadata:
  name: user-events
  namespace: kafka
  labels:
    strimzi.io/cluster: kafka-cluster
spec:
  partitions: 6
  replicas: 3
  config:
    retention.ms: 604800000  # 7 days
    segment.ms: 3600000     # 1 hour
    cleanup.policy: delete

---
apiVersion: kafka.strimzi.io/v1beta2
kind: KafkaTopic
metadata:
  name: order-events
  namespace: kafka
spec:
  partitions: 12
  replicas: 3
  config:
    retention.ms: 2592000000  # 30 days
    cleanup.policy: compact

# 4. MICROSERVICE IMPLEMENTATION EXAMPLE

# User Service
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: user-service
      version: v1
  template:
    metadata:
      labels:
        app: user-service
        version: v1
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "8080"
        prometheus.io/path: "/metrics"
    spec:
      serviceAccountName: user-service
      containers:
      - name: user-service
        image: myregistry/user-service:1.2.3
        ports:
        - containerPort: 8080
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: user-db-secret
              key: connection-string
        - name: KAFKA_BROKERS
          value: "kafka-cluster-kafka-bootstrap.kafka:9092"
        - name: REDIS_URL
          value: "redis://redis-cluster.cache:6379"
        - name: JAEGER_AGENT_HOST
          value: "jaeger-agent.tracing"
        - name: SERVICE_NAME
          value: "user-service"
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
        securityContext:
          runAsNonRoot: true
          runAsUser: 1000
          allowPrivilegeEscalation: false
          readOnlyRootFilesystem: true
        volumeMounts:
        - name: tmp
          mountPath: /tmp
        - name: cache
          mountPath: /app/cache
      volumes:
      - name: tmp
        emptyDir: {}
      - name: cache
        emptyDir: {}

---
# Service Account with RBAC
apiVersion: v1
kind: ServiceAccount
metadata:
  name: user-service
  namespace: production

---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: user-service-role
  namespace: production
rules:
- apiGroups: [""]
  resources: ["configmaps", "secrets"]
  verbs: ["get", "list"]

---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: user-service-binding
  namespace: production
subjects:
- kind: ServiceAccount
  name: user-service
  namespace: production
roleRef:
  kind: Role
  name: user-service-role
  apiGroup: rbac.authorization.k8s.io

# 5. APPLICATION CODE PATTERNS

# Event-driven microservice with Node.js
// user-service/src/app.js
const express = require('express');
const { Kafka } = require('kafkajs');
const redis = require('redis');
const promClient = require('prom-client');
const opentracing = require('opentracing');
const jaeger = require('jaeger-client');

class UserService {
  constructor() {
    this.app = express();
    this.setupMetrics();
    this.setupTracing();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupKafka();
    this.setupRedis();
  }

  setupMetrics() {
    this.register = new promClient.Registry();
    promClient.collectDefaultMetrics({ register: this.register });

    this.httpRequestDuration = new promClient.Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'route', 'status_code'],
      buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
    });

    this.kafkaMessagesProduced = new promClient.Counter({
      name: 'kafka_messages_produced_total',
      help: 'Total number of Kafka messages produced',
      labelNames: ['topic']
    });

    this.register.registerMetric(this.httpRequestDuration);
    this.register.registerMetric(this.kafkaMessagesProduced);
  }

  setupTracing() {
    const config = {
      serviceName: 'user-service',
      reporter: {
        agentHost: process.env.JAEGER_AGENT_HOST || 'localhost',
        agentPort: 6832,
      },
      sampler: {
        type: 'const',
        param: 1,
      },
    };
    
    const tracer = jaeger.initTracer(config);
    opentracing.initGlobalTracer(tracer);
    this.tracer = tracer;
  }

  setupMiddleware() {
    this.app.use(express.json());
    this.app.use(this.metricsMiddleware.bind(this));
    this.app.use(this.tracingMiddleware.bind(this));
  }

  metricsMiddleware(req, res, next) {
    const start = Date.now();
    
    res.on('finish', () => {
      const duration = (Date.now() - start) / 1000;
      this.httpRequestDuration
        .labels(req.method, req.route?.path || req.path, res.statusCode)
        .observe(duration);
    });
    
    next();
  }

  tracingMiddleware(req, res, next) {
    const span = this.tracer.startSpan(`${req.method} ${req.path}`);
    span.setTag(opentracing.Tags.HTTP_METHOD, req.method);
    span.setTag(opentracing.Tags.HTTP_URL, req.url);
    
    req.span = span;
    
    res.on('finish', () => {
      span.setTag(opentracing.Tags.HTTP_STATUS_CODE, res.statusCode);
      if (res.statusCode >= 400) {
        span.setTag(opentracing.Tags.ERROR, true);
      }
      span.finish();
    });
    
    next();
  }

  setupRoutes() {
    // Health checks
    this.app.get('/health', (req, res) => {
      res.json({ status: 'healthy', timestamp: new Date().toISOString() });
    });

    this.app.get('/ready', async (req, res) => {
      try {
        // Check dependencies
        await this.redis.ping();
        await this.kafka.admin().listTopics();
        res.json({ status: 'ready' });
      } catch (error) {
        res.status(503).json({ status: 'not ready', error: error.message });
      }
    });

    // Metrics endpoint
    this.app.get('/metrics', async (req, res) => {
      res.set('Content-Type', this.register.contentType);
      res.end(await this.register.metrics());
    });

    // User endpoints
    this.app.post('/api/users', this.createUser.bind(this));
    this.app.get('/api/users/:id', this.getUser.bind(this));
    this.app.put('/api/users/:id', this.updateUser.bind(this));
    this.app.delete('/api/users/:id', this.deleteUser.bind(this));
  }

  async setupKafka() {
    this.kafka = new Kafka({
      clientId: 'user-service',
      brokers: process.env.KAFKA_BROKERS.split(','),
      retry: {
        initialRetryTime: 100,
        retries: 8
      }
    });

    this.producer = this.kafka.producer({
      maxInFlightRequests: 1,
      idempotent: true,
      transactionTimeout: 30000
    });

    await this.producer.connect();
  }

  async setupRedis() {
    this.redis = redis.createClient({
      url: process.env.REDIS_URL
    });
    
    await this.redis.connect();
  }

  async createUser(req, res) {
    const span = req.span.tracer().startSpan('create_user', { childOf: req.span });
    
    try {
      const userData = req.body;
      
      // Validate input
      if (!userData.email || !userData.name) {
        return res.status(400).json({ error: 'Email and name are required' });
      }

      // Create user in database
      const user = await this.userRepository.create(userData);
      
      // Publish event
      await this.publishUserEvent('user.created', user);
      
      // Cache user data
      await this.redis.setEx(`user:${user.id}`, 3600, JSON.stringify(user));
      
      res.status(201).json(user);
    } catch (error) {
      span.setTag(opentracing.Tags.ERROR, true);
      span.log({ error: error.message });
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      span.finish();
    }
  }

  async publishUserEvent(eventType, userData) {
    const event = {
      id: require('uuid').v4(),
      type: eventType,
      timestamp: new Date().toISOString(),
      data: userData,
      version: '1.0'
    };

    await this.producer.send({
      topic: 'user-events',
      messages: [{
        key: userData.id.toString(),
        value: JSON.stringify(event),
        partition: userData.id % 6, // Distribute across partitions
        headers: {
          'event-type': eventType,
          'content-type': 'application/json'
        }
      }]
    });

    this.kafkaMessagesProduced.labels('user-events').inc();
  }

  async start() {
    const port = process.env.PORT || 8080;
    this.server = this.app.listen(port, () => {
      console.log(`User service listening on port ${port}`);
    });

    // Graceful shutdown
    process.on('SIGTERM', this.shutdown.bind(this));
    process.on('SIGINT', this.shutdown.bind(this));
  }

  async shutdown() {
    console.log('Shutting down gracefully...');
    
    if (this.server) {
      this.server.close();
    }
    
    if (this.producer) {
      await this.producer.disconnect();
    }
    
    if (this.redis) {
      await this.redis.disconnect();
    }
    
    if (this.tracer) {
      this.tracer.close();
    }
    
    process.exit(0);
  }
}

// Circuit Breaker implementation
class CircuitBreaker {
  constructor(options = {}) {
    this.failureThreshold = options.failureThreshold || 5;
    this.resetTimeout = options.resetTimeout || 60000;
    this.monitoringPeriod = options.monitoringPeriod || 10000;
    
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.nextAttempt = Date.now();
  }

  async call(fn) {
    if (this.state === 'OPEN') {
      if (Date.now() < this.nextAttempt) {
        throw new Error('Circuit breaker is OPEN');
      } else {
        this.state = 'HALF_OPEN';
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }

  onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();

    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.resetTimeout;
    }
  }
}

module.exports = { UserService, CircuitBreaker };

# 6. DISTRIBUTED TRACING CONFIGURATION

# Jaeger deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: jaeger
  namespace: tracing
spec:
  replicas: 1
  selector:
    matchLabels:
      app: jaeger
  template:
    metadata:
      labels:
        app: jaeger
    spec:
      containers:
      - name: jaeger
        image: jaegertracing/all-in-one:1.48
        env:
        - name: COLLECTOR_ZIPKIN_HOST_PORT
          value: ":9411"
        ports:
        - containerPort: 5775
          protocol: UDP
        - containerPort: 6831
          protocol: UDP
        - containerPort: 6832
          protocol: UDP
        - containerPort: 5778
          protocol: TCP
        - containerPort: 16686
          protocol: TCP
        - containerPort: 14268
          protocol: TCP
        - containerPort: 14250
          protocol: TCP
        - containerPort: 9411
          protocol: TCP
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
```
*Notice: Cloud-native architecture requires careful consideration of service boundaries, data consistency, and operational complexity.*

</div>

### Advanced Cloud Platforms and Multi-Cloud Strategy {#cloud-platforms}
<!-- tags: aws, azure, gcp, multi-cloud, cloud-native, serverless -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Advanced cloud platforms provide comprehensive infrastructure and services for scalable applications. **Amazon Web Services (AWS)** offers extensive compute, storage, and managed services, **Microsoft Azure** integrates with enterprise tools and hybrid cloud, **Google Cloud Platform (GCP)** excels in data analytics and machine learning. **Multi-cloud strategy** distributes workloads across providers for resilience and cost optimization, **serverless computing** enables event-driven architectures without infrastructure management, **edge computing** brings processing closer to users.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Scalability**: Automatic scaling based on demand
- **Reliability**: High availability across multiple regions
- **Cost optimization**: Pay-per-use and reserved instance pricing
- **Innovation**: Access to cutting-edge managed services

</div>

<div class="runnable-model" data-filter="cloud-platforms">

**Runnable mental model**
```yaml
# 1. AWS INFRASTRUCTURE WITH TERRAFORM

# providers.tf
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  
  backend "s3" {
    bucket         = "myapp-terraform-state"
    key            = "production/terraform.tfstate"
    region         = "us-west-2"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}

provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Environment = var.environment
      Project     = var.project_name
      ManagedBy   = "terraform"
    }
  }
}

# variables.tf
variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

variable "environment" {
  description = "Environment name"
  type        = string
  validation {
    condition     = contains(["dev", "staging", "production"], var.environment)
    error_message = "Environment must be dev, staging, or production."
  }
}

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "myapp"
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

# vpc.tf
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true
  
  tags = {
    Name = "${var.project_name}-${var.environment}-vpc"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  
  tags = {
    Name = "${var.project_name}-${var.environment}-igw"
  }
}

resource "aws_subnet" "public" {
  count = 3
  
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.${count.index + 1}.0/24"
  availability_zone       = data.aws_availability_zones.available.names[count.index]
  map_public_ip_on_launch = true
  
  tags = {
    Name = "${var.project_name}-${var.environment}-public-${count.index + 1}"
    Type = "public"
  }
}

resource "aws_subnet" "private" {
  count = 3
  
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.${count.index + 10}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]
  
  tags = {
    Name = "${var.project_name}-${var.environment}-private-${count.index + 1}"
    Type = "private"
  }
}

resource "aws_nat_gateway" "main" {
  count = 3
  
  allocation_id = aws_eip.nat[count.index].id
  subnet_id     = aws_subnet.public[count.index].id
  
  tags = {
    Name = "${var.project_name}-${var.environment}-nat-${count.index + 1}"
  }
}

resource "aws_eip" "nat" {
  count = 3
  
  domain = "vpc"
  
  tags = {
    Name = "${var.project_name}-${var.environment}-eip-${count.index + 1}"
  }
}

# Route tables
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }
  
  tags = {
    Name = "${var.project_name}-${var.environment}-public-rt"
  }
}

resource "aws_route_table" "private" {
  count = 3
  
  vpc_id = aws_vpc.main.id
  
  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.main[count.index].id
  }
  
  tags = {
    Name = "${var.project_name}-${var.environment}-private-rt-${count.index + 1}"
  }
}

resource "aws_route_table_association" "public" {
  count = 3
  
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "private" {
  count = 3
  
  subnet_id      = aws_subnet.private[count.index].id
  route_table_id = aws_route_table.private[count.index].id
}

data "aws_availability_zones" "available" {
  state = "available"
}

# eks.tf
resource "aws_eks_cluster" "main" {
  name     = "${var.project_name}-${var.environment}"
  role_arn = aws_iam_role.eks_cluster.arn
  version  = "1.28"
  
  vpc_config {
    subnet_ids              = concat(aws_subnet.public[*].id, aws_subnet.private[*].id)
    endpoint_private_access = true
    endpoint_public_access  = true
    public_access_cidrs     = ["0.0.0.0/0"]
  }
  
  encryption_config {
    provider {
      key_arn = aws_kms_key.eks.arn
    }
    resources = ["secrets"]
  }
  
  enabled_cluster_log_types = ["api", "audit", "authenticator", "controllerManager", "scheduler"]
  
  depends_on = [
    aws_iam_role_policy_attachment.eks_cluster_policy,
    aws_iam_role_policy_attachment.eks_vpc_resource_controller,
  ]
  
  tags = {
    Name = "${var.project_name}-${var.environment}-eks"
  }
}

resource "aws_eks_node_group" "main" {
  cluster_name    = aws_eks_cluster.main.name
  node_group_name = "main"
  node_role_arn   = aws_iam_role.eks_node_group.arn
  subnet_ids      = aws_subnet.private[*].id
  
  capacity_type  = "ON_DEMAND"
  instance_types = ["t3.medium"]
  
  scaling_config {
    desired_size = 3
    max_size     = 10
    min_size     = 1
  }
  
  update_config {
    max_unavailable = 1
  }
  
  remote_access {
    ec2_ssh_key               = aws_key_pair.eks_nodes.key_name
    source_security_group_ids = [aws_security_group.eks_nodes.id]
  }
  
  depends_on = [
    aws_iam_role_policy_attachment.eks_worker_node_policy,
    aws_iam_role_policy_attachment.eks_cni_policy,
    aws_iam_role_policy_attachment.eks_container_registry_policy,
  ]
  
  tags = {
    Name = "${var.project_name}-${var.environment}-nodegroup"
  }
}

# Security Groups
resource "aws_security_group" "eks_cluster" {
  name_prefix = "${var.project_name}-${var.environment}-eks-cluster"
  vpc_id      = aws_vpc.main.id
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  tags = {
    Name = "${var.project_name}-${var.environment}-eks-cluster-sg"
  }
}

resource "aws_security_group" "eks_nodes" {
  name_prefix = "${var.project_name}-${var.environment}-eks-nodes"
  vpc_id      = aws_vpc.main.id
  
  ingress {
    from_port = 22
    to_port   = 22
    protocol  = "tcp"
    cidr_blocks = [var.vpc_cidr]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  tags = {
    Name = "${var.project_name}-${var.environment}-eks-nodes-sg"
  }
}

# RDS Database
resource "aws_db_subnet_group" "main" {
  name       = "${var.project_name}-${var.environment}-db-subnet-group"
  subnet_ids = aws_subnet.private[*].id
  
  tags = {
    Name = "${var.project_name}-${var.environment}-db-subnet-group"
  }
}

resource "aws_db_instance" "main" {
  identifier = "${var.project_name}-${var.environment}-db"
  
  engine         = "postgres"
  engine_version = "15.4"
  instance_class = "db.t3.micro"
  
  allocated_storage     = 20
  max_allocated_storage = 100
  storage_type          = "gp3"
  storage_encrypted     = true
  kms_key_id           = aws_kms_key.rds.arn
  
  db_name  = "myapp"
  username = "admin"
  password = random_password.db_password.result
  
  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name
  
  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"
  
  skip_final_snapshot = var.environment != "production"
  deletion_protection = var.environment == "production"
  
  performance_insights_enabled = true
  monitoring_interval         = 60
  monitoring_role_arn        = aws_iam_role.rds_monitoring.arn
  
  tags = {
    Name = "${var.project_name}-${var.environment}-db"
  }
}

resource "random_password" "db_password" {
  length  = 16
  special = true
}

resource "aws_security_group" "rds" {
  name_prefix = "${var.project_name}-${var.environment}-rds"
  vpc_id      = aws_vpc.main.id
  
  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.eks_nodes.id]
  }
  
  tags = {
    Name = "${var.project_name}-${var.environment}-rds-sg"
  }
}

# 2. AZURE INFRASTRUCTURE

# main.tf (Azure)
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {
    key_vault {
      purge_soft_delete_on_destroy = true
    }
  }
}

# Resource Group
resource "azurerm_resource_group" "main" {
  name     = "${var.project_name}-${var.environment}-rg"
  location = var.azure_region
  
  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}

# Virtual Network
resource "azurerm_virtual_network" "main" {
  name                = "${var.project_name}-${var.environment}-vnet"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  
  tags = {
    Environment = var.environment
  }
}

resource "azurerm_subnet" "aks" {
  name                 = "aks-subnet"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.0.1.0/24"]
}

resource "azurerm_subnet" "database" {
  name                 = "database-subnet"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.0.2.0/24"]
  
  delegation {
    name = "database-delegation"
    service_delegation {
      name = "Microsoft.DBforPostgreSQL/flexibleServers"
      actions = [
        "Microsoft.Network/virtualNetworks/subnets/join/action",
      ]
    }
  }
}

# Azure Kubernetes Service
resource "azurerm_kubernetes_cluster" "main" {
  name                = "${var.project_name}-${var.environment}-aks"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  dns_prefix          = "${var.project_name}-${var.environment}"
  
  kubernetes_version = "1.28.0"
  
  default_node_pool {
    name                = "default"
    node_count          = 3
    vm_size             = "Standard_D2s_v3"
    vnet_subnet_id      = azurerm_subnet.aks.id
    enable_auto_scaling = true
    min_count          = 1
    max_count          = 10
    
    upgrade_settings {
      max_surge = "33%"
    }
  }
  
  identity {
    type = "SystemAssigned"
  }
  
  network_profile {
    network_plugin = "azure"
    service_cidr   = "10.1.0.0/16"
    dns_service_ip = "10.1.0.10"
  }
  
  oms_agent {
    log_analytics_workspace_id = azurerm_log_analytics_workspace.main.id
  }
  
  azure_policy_enabled = true
  
  tags = {
    Environment = var.environment
  }
}

# PostgreSQL Flexible Server
resource "azurerm_postgresql_flexible_server" "main" {
  name                   = "${var.project_name}-${var.environment}-postgres"
  resource_group_name    = azurerm_resource_group.main.name
  location               = azurerm_resource_group.main.location
  version                = "15"
  delegated_subnet_id    = azurerm_subnet.database.id
  private_dns_zone_id    = azurerm_private_dns_zone.postgres.id
  administrator_login    = "adminuser"
  administrator_password = random_password.postgres_password.result
  zone                   = "1"
  
  storage_mb = 32768
  
  sku_name = "GP_Standard_D2s_v3"
  
  backup_retention_days        = 7
  geo_redundant_backup_enabled = var.environment == "production"
  
  high_availability {
    mode                      = var.environment == "production" ? "ZoneRedundant" : "Disabled"
    standby_availability_zone = var.environment == "production" ? "2" : null
  }
  
  depends_on = [azurerm_private_dns_zone_virtual_network_link.postgres]
  
  tags = {
    Environment = var.environment
  }
}

resource "azurerm_private_dns_zone" "postgres" {
  name                = "${var.project_name}-${var.environment}.postgres.database.azure.com"
  resource_group_name = azurerm_resource_group.main.name
}

resource "azurerm_private_dns_zone_virtual_network_link" "postgres" {
  name                  = "${var.project_name}-${var.environment}-postgres-vnet-link"
  private_dns_zone_name = azurerm_private_dns_zone.postgres.name
  virtual_network_id    = azurerm_virtual_network.main.id
  resource_group_name   = azurerm_resource_group.main.name
}

resource "random_password" "postgres_password" {
  length  = 16
  special = true
}

# Azure Container Registry
resource "azurerm_container_registry" "main" {
  name                = "${var.project_name}${var.environment}acr"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = "Premium"
  admin_enabled       = false
  
  identity {
    type = "SystemAssigned"
  }
  
  network_rule_set {
    default_action = "Deny"
    
    virtual_network {
      action    = "Allow"
      subnet_id = azurerm_subnet.aks.id
    }
  }
  
  tags = {
    Environment = var.environment
  }
}

# 3. GOOGLE CLOUD PLATFORM INFRASTRUCTURE

# main.tf (GCP)
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
}

provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_region
}

# VPC Network
resource "google_compute_network" "main" {
  name                    = "${var.project_name}-${var.environment}-vpc"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "gke" {
  name          = "${var.project_name}-${var.environment}-gke-subnet"
  ip_cidr_range = "10.0.0.0/24"
  region        = var.gcp_region
  network       = google_compute_network.main.id
  
  secondary_ip_range {
    range_name    = "gke-pods"
    ip_cidr_range = "10.1.0.0/16"
  }
  
  secondary_ip_range {
    range_name    = "gke-services"
    ip_cidr_range = "10.2.0.0/16"
  }
}

# Google Kubernetes Engine
resource "google_container_cluster" "main" {
  name     = "${var.project_name}-${var.environment}-gke"
  location = var.gcp_region
  
  remove_default_node_pool = true
  initial_node_count       = 1
  
  network    = google_compute_network.main.name
  subnetwork = google_compute_subnetwork.gke.name
  
  ip_allocation_policy {
    cluster_secondary_range_name  = "gke-pods"
    services_secondary_range_name = "gke-services"
  }
  
  private_cluster_config {
    enable_private_nodes    = true
    enable_private_endpoint = false
    master_ipv4_cidr_block  = "172.16.0.0/28"
  }
  
  workload_identity_config {
    workload_pool = "${var.gcp_project_id}.svc.id.goog"
  }
  
  addons_config {
    http_load_balancing {
      disabled = false
    }
    
    horizontal_pod_autoscaling {
      disabled = false
    }
    
    network_policy_config {
      disabled = false
    }
  }
  
  network_policy {
    enabled = true
  }
}

resource "google_container_node_pool" "main" {
  name       = "${var.project_name}-${var.environment}-node-pool"
  location   = var.gcp_region
  cluster    = google_container_cluster.main.name
  node_count = 1
  
  autoscaling {
    min_node_count = 1
    max_node_count = 10
  }
  
  node_config {
    preemptible  = var.environment != "production"
    machine_type = "e2-medium"
    
    service_account = google_service_account.gke_nodes.email
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]
    
    workload_metadata_config {
      mode = "GKE_METADATA"
    }
  }
  
  management {
    auto_repair  = true
    auto_upgrade = true
  }
  
  upgrade_settings {
    max_surge       = 1
    max_unavailable = 0
  }
}

# Cloud SQL PostgreSQL
resource "google_sql_database_instance" "main" {
  name             = "${var.project_name}-${var.environment}-postgres"
  database_version = "POSTGRES_15"
  region           = var.gcp_region
  
  settings {
    tier              = "db-f1-micro"
    availability_type = var.environment == "production" ? "REGIONAL" : "ZONAL"
    disk_size         = 20
    disk_type         = "PD_SSD"
    disk_autoresize   = true
    
    backup_configuration {
      enabled    = true
      start_time = "03:00"
      
      point_in_time_recovery_enabled = true
    }
    
    ip_configuration {
      ipv4_enabled    = false
      private_network = google_compute_network.main.id
      require_ssl     = true
    }
    
    database_flags {
      name  = "log_statement"
      value = "all"
    }
  }
  
  depends_on = [google_service_networking_connection.private_vpc_connection]
}

resource "google_service_networking_connection" "private_vpc_connection" {
  network                 = google_compute_network.main.id
  service                 = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [google_compute_global_address.private_ip_address.name]
}

resource "google_compute_global_address" "private_ip_address" {
  name          = "${var.project_name}-${var.environment}-private-ip"
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  prefix_length = 16
  network       = google_compute_network.main.id
}

# 4. MULTI-CLOUD STRATEGY IMPLEMENTATION

# Multi-cloud deployment orchestration
# deploy.sh
#!/bin/bash
set -e

ENVIRONMENT=${1:-staging}
DEPLOY_TARGET=${2:-all}

echo "Deploying to environment: $ENVIRONMENT"
echo "Deploy target: $DEPLOY_TARGET"

# Load environment configuration
source "./config/${ENVIRONMENT}.env"

deploy_aws() {
    echo "Deploying to AWS..."
    cd aws/
    terraform init
    terraform plan -var="environment=$ENVIRONMENT"
    terraform apply -auto-approve -var="environment=$ENVIRONMENT"
    
    # Update kubeconfig for EKS
    aws eks update-kubeconfig --region $AWS_REGION --name "${PROJECT_NAME}-${ENVIRONMENT}"
    
    # Deploy applications
    kubectl apply -f ../k8s/aws/
    cd ..
}

deploy_azure() {
    echo "Deploying to Azure..."
    cd azure/
    terraform init
    terraform plan -var="environment=$ENVIRONMENT"
    terraform apply -auto-approve -var="environment=$ENVIRONMENT"
    
    # Update kubeconfig for AKS
    az aks get-credentials --resource-group "${PROJECT_NAME}-${ENVIRONMENT}-rg" --name "${PROJECT_NAME}-${ENVIRONMENT}-aks"
    
    # Deploy applications
    kubectl apply -f ../k8s/azure/
    cd ..
}

deploy_gcp() {
    echo "Deploying to GCP..."
    cd gcp/
    terraform init
    terraform plan -var="environment=$ENVIRONMENT"
    terraform apply -auto-approve -var="environment=$ENVIRONMENT"
    
    # Update kubeconfig for GKE
    gcloud container clusters get-credentials "${PROJECT_NAME}-${ENVIRONMENT}-gke" --region $GCP_REGION
    
    # Deploy applications
    kubectl apply -f ../k8s/gcp/
    cd ..
}

case $DEPLOY_TARGET in
    aws)
        deploy_aws
        ;;
    azure)
        deploy_azure
        ;;
    gcp)
        deploy_gcp
        ;;
    all)
        deploy_aws
        deploy_azure
        deploy_gcp
        ;;
    *)
        echo "Unknown deploy target: $DEPLOY_TARGET"
        echo "Available targets: aws, azure, gcp, all"
        exit 1
        ;;
esac

echo "Deployment completed successfully!"

# Multi-cloud monitoring setup
# monitoring/multi-cloud-monitoring.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
  namespace: monitoring
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
      evaluation_interval: 15s
    
    rule_files:
      - "/etc/prometheus/rules/*.yml"
    
    scrape_configs:
    # AWS EKS monitoring
    - job_name: 'kubernetes-aws'
      kubernetes_sd_configs:
      - role: pod
        namespaces:
          names: ['default', 'kube-system']
      relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
        action: replace
        target_label: __metrics_path__
        regex: (.+)
      - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]
        action: replace
        regex: ([^:]+)(?::\d+)?;(\d+)
        replacement: $1:$2
        target_label: __address__
      - action: labelmap
        regex: __meta_kubernetes_pod_label_(.+)
      - source_labels: [__meta_kubernetes_namespace]
        action: replace
        target_label: kubernetes_namespace
      - source_labels: [__meta_kubernetes_pod_name]
        action: replace
        target_label: kubernetes_pod_name
      - action: replace
        target_label: cloud_provider
        replacement: aws
    
    # Azure AKS monitoring
    - job_name: 'kubernetes-azure'
      kubernetes_sd_configs:
      - role: pod
        namespaces:
          names: ['default', 'kube-system']
      relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
      - action: replace
        target_label: cloud_provider
        replacement: azure
    
    # GCP GKE monitoring
    - job_name: 'kubernetes-gcp'
      kubernetes_sd_configs:
      - role: pod
        namespaces:
          names: ['default', 'kube-system']
      relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
      - action: replace
        target_label: cloud_provider
        replacement: gcp
    
    # External cloud services monitoring
    - job_name: 'aws-cloudwatch'
      ec2_sd_configs:
      - region: us-west-2
        port: 9100
      relabel_configs:
      - source_labels: [__meta_ec2_tag_monitoring]
        action: keep
        regex: enabled
    
    alerting:
      alertmanagers:
      - static_configs:
        - targets: ['alertmanager:9093']

---
# Cross-cloud service mesh configuration
# istio/multi-cloud-gateway.yaml
apiVersion: networking.istio.io/v1beta1
kind: Gateway
metadata:
  name: multi-cloud-gateway
  namespace: istio-system
spec:
  selector:
    istio: ingressgateway
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - myapp.example.com
    tls:
      httpsRedirect: true
  - port:
      number: 443
      name: https
      protocol: HTTPS
    tls:
      mode: SIMPLE
      credentialName: myapp-tls
    hosts:
    - myapp.example.com

---
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: multi-cloud-routing
  namespace: default
spec:
  hosts:
  - myapp.example.com
  gateways:
  - istio-system/multi-cloud-gateway
  http:
  - match:
    - headers:
        x-user-region:
          exact: us-west
    route:
    - destination:
        host: app-service-aws.default.svc.cluster.local
        port:
          number: 80
      weight: 100
  - match:
    - headers:
        x-user-region:
          exact: eu-west
    route:
    - destination:
        host: app-service-azure.default.svc.cluster.local
        port:
          number: 80
      weight: 100
  - match:
    - headers:
        x-user-region:
          exact: asia-pacific
    route:
    - destination:
        host: app-service-gcp.default.svc.cluster.local
        port:
          number: 80
      weight: 100
  - route:
    - destination:
        host: app-service-aws.default.svc.cluster.local
        port:
          number: 80
      weight: 34
    - destination:
        host: app-service-azure.default.svc.cluster.local
        port:
          number: 80
      weight: 33
    - destination:
        host: app-service-gcp.default.svc.cluster.local
        port:
          number: 80
      weight: 33
```
*Notice: Multi-cloud strategies require careful coordination of networking, security, and data synchronization across providers.*

</div>

### Advanced Site Reliability Engineering (SRE) {#sre-practices}
<!-- tags: sre, reliability, observability, incident-management, chaos-engineering -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Site Reliability Engineering ensures system reliability through engineering practices. **Service Level Objectives (SLOs)** define reliability targets, **Service Level Indicators (SLIs)** measure system performance, **Error budgets** balance reliability with feature velocity. **Incident management** handles outages systematically, **post-mortems** capture lessons learned, **chaos engineering** proactively tests system resilience, **toil reduction** automates repetitive operational work.*

</div>

<div class="runnable-model" data-filter="sre">

**Runnable mental model**
```yaml
# 1. SLO/SLI CONFIGURATION AND MONITORING

# slo-config.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: slo-config
  namespace: monitoring
data:
  slo-definitions.yaml: |
    services:
      - name: "api-service"
        slos:
          - name: "availability"
            description: "API service should be available 99.9% of the time"
            sli:
              type: "ratio"
              numerator: "sum(rate(http_requests_total{job='api-service',code!~'5..'}[5m]))"
              denominator: "sum(rate(http_requests_total{job='api-service'}[5m]))"
            target: 0.999
            error_budget_policy:
              - type: "burn_rate"
                threshold: 2.0
                short_window: "5m"
                long_window: "1h"
                severity: "critical"
              - type: "burn_rate"
                threshold: 1.5
                short_window: "30m"
                long_window: "6h"
                severity: "warning"
          
          - name: "latency"
            description: "95% of requests should complete within 500ms"
            sli:
              type: "histogram"
              metric: "http_request_duration_seconds"
              percentile: 0.95
            target: 0.5
            error_budget_policy:
              - type: "threshold"
                threshold: 0.8
                duration: "10m"
                severity: "warning"
              - type: "threshold"
                threshold: 1.0
                duration: "5m"
                severity: "critical"
      
      - name: "database"
        slos:
          - name: "availability"
            description: "Database should be available 99.95% of the time"
            sli:
              type: "ratio"
              numerator: "up{job='postgres-exporter'}"
              denominator: "1"
            target: 0.9995
          
          - name: "query_performance"
            description: "95% of database queries should complete within 100ms"
            sli:
              type: "histogram"
              metric: "pg_stat_user_tables_seq_tup_read"
              percentile: 0.95
            target: 0.1

# Prometheus rules for SLO monitoring
# monitoring/slo-rules.yaml
groups:
- name: slo.rules
  interval: 30s
  rules:
  # API Service Availability SLI
  - record: sli:http_requests:rate5m
    expr: |
      sum(rate(http_requests_total{job="api-service"}[5m])) by (job)
  
  - record: sli:http_requests_errors:rate5m
    expr: |
      sum(rate(http_requests_total{job="api-service",code=~"5.."}[5m])) by (job)
  
  - record: sli:http_requests:availability
    expr: |
      (
        sli:http_requests:rate5m - sli:http_requests_errors:rate5m
      ) / sli:http_requests:rate5m
  
  # API Service Latency SLI
  - record: sli:http_request_latency:p95
    expr: |
      histogram_quantile(0.95, 
        sum(rate(http_request_duration_seconds_bucket{job="api-service"}[5m])) by (le, job)
      )
  
  # Database Availability SLI
  - record: sli:database:availability
    expr: |
      up{job="postgres-exporter"}
  
  # Error Budget Burn Rate Calculations
  - record: slo:api_availability:error_budget_burn_rate_5m
    expr: |
      (1 - sli:http_requests:availability) / (1 - 0.999)
  
  - record: slo:api_availability:error_budget_burn_rate_1h
    expr: |
      (1 - avg_over_time(sli:http_requests:availability[1h])) / (1 - 0.999)

# SLO Dashboard configuration
# grafana/slo-dashboard.json
{
  "dashboard": {
    "title": "SLO Dashboard",
    "panels": [
      {
        "title": "API Service Availability SLO",
        "type": "stat",
        "targets": [
          {
            "expr": "sli:http_requests:availability * 100",
            "legendFormat": "Current Availability %"
          }
        ],
        "thresholds": [
          {"color": "red", "value": 99.8},
          {"color": "yellow", "value": 99.9},
          {"color": "green", "value": 99.95}
        ]
      },
      {
        "title": "Error Budget Burn Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "slo:api_availability:error_budget_burn_rate_5m",
            "legendFormat": "5m burn rate"
          },
          {
            "expr": "slo:api_availability:error_budget_burn_rate_1h",
            "legendFormat": "1h burn rate"
          }
        ]
      },
      {
        "title": "Remaining Error Budget",
        "type": "bargauge",
        "targets": [
          {
            "expr": "1 - (1 - avg_over_time(sli:http_requests:availability[30d])) / (1 - 0.999)",
            "legendFormat": "30-day Error Budget Remaining"
          }
        ]
      }
    ]
  }
}

# 2. INCIDENT MANAGEMENT AUTOMATION

# incident-management/incident-webhook.py
import json
import requests
import os
from datetime import datetime
from typing import Dict, Any

class IncidentManager:
    def __init__(self):
        self.slack_webhook = os.environ.get('SLACK_WEBHOOK_URL')
        self.pagerduty_token = os.environ.get('PAGERDUTY_TOKEN')
        self.jira_url = os.environ.get('JIRA_URL')
        self.jira_token = os.environ.get('JIRA_TOKEN')
    
    def handle_alert(self, alert_data: Dict[str, Any]) -> None:
        """Process incoming alert and trigger incident response"""
        severity = self.determine_severity(alert_data)
        incident_id = self.create_incident(alert_data, severity)
        
        if severity in ['critical', 'high']:
            self.trigger_pagerduty(alert_data, incident_id)
            self.create_war_room(alert_data, incident_id)
        
        self.notify_slack(alert_data, incident_id, severity)
        self.create_jira_ticket(alert_data, incident_id, severity)
        
        return incident_id
    
    def determine_severity(self, alert_data: Dict[str, Any]) -> str:
        """Determine incident severity based on alert data"""
        alert_name = alert_data.get('alertname', '')
        labels = alert_data.get('labels', {})
        
        # Critical severity conditions
        if 'HighErrorRate' in alert_name and float(labels.get('error_rate', 0)) > 10:
            return 'critical'
        elif 'ServiceDown' in alert_name:
            return 'critical'
        elif 'DatabaseDown' in alert_name:
            return 'critical'
        
        # High severity conditions
        elif 'HighLatency' in alert_name and float(labels.get('latency', 0)) > 2:
            return 'high'
        elif 'HighMemoryUsage' in alert_name and float(labels.get('usage', 0)) > 90:
            return 'high'
        
        # Medium severity conditions
        elif 'ModerateCPUUsage' in alert_name:
            return 'medium'
        
        return 'low'
    
    def create_incident(self, alert_data: Dict[str, Any], severity: str) -> str:
        """Create incident record"""
        incident_id = f"INC-{datetime.now().strftime('%Y%m%d-%H%M%S')}"
        
        incident_record = {
            'id': incident_id,
            'title': alert_data.get('alertname', 'Unknown Alert'),
            'description': alert_data.get('annotations', {}).get('description', ''),
            'severity': severity,
            'status': 'open',
            'created_at': datetime.now().isoformat(),
            'affected_services': self.extract_affected_services(alert_data),
            'alert_data': alert_data
        }
        
        # Store incident in database or file system
        self.store_incident(incident_record)
        
        return incident_id
    
    def trigger_pagerduty(self, alert_data: Dict[str, Any], incident_id: str) -> None:
        """Trigger PagerDuty alert for high-severity incidents"""
        if not self.pagerduty_token:
            return
            
        payload = {
            "routing_key": self.pagerduty_token,
            "event_action": "trigger",
            "dedup_key": incident_id,
            "payload": {
                "summary": f"[{incident_id}] {alert_data.get('alertname')}",
                "source": alert_data.get('labels', {}).get('instance', 'unknown'),
                "severity": "critical",
                "custom_details": alert_data
            }
        }
        
        response = requests.post(
            'https://events.pagerduty.com/v2/enqueue',
            json=payload,
            headers={'Content-Type': 'application/json'}
        )
        
        if response.status_code != 202:
            print(f"Failed to trigger PagerDuty: {response.text}")
    
    def create_war_room(self, alert_data: Dict[str, Any], incident_id: str) -> None:
        """Create Slack war room for critical incidents"""
        if not self.slack_webhook:
            return
            
        channel_name = f"incident-{incident_id.lower()}"
        
        # Create Slack channel (requires Slack API, not webhook)
        # This is a simplified example
        war_room_message = {
            "text": f"🚨 War Room Created for {incident_id}",
            "attachments": [
                {
                    "color": "danger",
                    "title": f"Incident: {alert_data.get('alertname')}",
                    "fields": [
                        {
                            "title": "Incident ID",
                            "value": incident_id,
                            "short": True
                        },
                        {
                            "title": "Severity",
                            "value": "CRITICAL",
                            "short": True
                        },
                        {
                            "title": "Affected Services",
                            "value": ", ".join(self.extract_affected_services(alert_data)),
                            "short": False
                        }
                    ],
                    "actions": [
                        {
                            "type": "button",
                            "text": "Join War Room",
                            "url": f"https://slack.com/app_redirect?channel={channel_name}"
                        }
                    ]
                }
            ]
        }
        
        requests.post(self.slack_webhook, json=war_room_message)
    
    def notify_slack(self, alert_data: Dict[str, Any], incident_id: str, severity: str) -> None:
        """Send Slack notification"""
        if not self.slack_webhook:
            return
            
        color_map = {
            'critical': 'danger',
            'high': 'warning', 
            'medium': 'good',
            'low': '#36a64f'
        }
        
        message = {
            "text": f"🔔 New Incident: {incident_id}",
            "attachments": [
                {
                    "color": color_map.get(severity, 'good'),
                    "title": alert_data.get('alertname', 'Unknown Alert'),
                    "title_link": f"https://grafana.example.com/alerting/{incident_id}",
                    "fields": [
                        {
                            "title": "Severity",
                            "value": severity.upper(),
                            "short": True
                        },
                        {
                            "title": "Instance", 
                            "value": alert_data.get('labels', {}).get('instance', 'unknown'),
                            "short": True
                        },
                        {
                            "title": "Description",
                            "value": alert_data.get('annotations', {}).get('description', 'No description'),
                            "short": False
                        }
                    ],
                    "footer": "Incident Management System",
                    "ts": int(datetime.now().timestamp())
                }
            ]
        }
        
        response = requests.post(self.slack_webhook, json=message)
        
        if response.status_code != 200:
            print(f"Failed to send Slack notification: {response.text}")
    
    def extract_affected_services(self, alert_data: Dict[str, Any]) -> list:
        """Extract affected services from alert data"""
        labels = alert_data.get('labels', {})
        services = []
        
        if 'job' in labels:
            services.append(labels['job'])
        if 'service' in labels:
            services.append(labels['service'])
        
        return list(set(services)) if services else ['unknown']
    
    def store_incident(self, incident_record: Dict[str, Any]) -> None:
        """Store incident record (implement based on your storage solution)"""
        # This could be a database, file system, or external API
        print(f"Storing incident: {json.dumps(incident_record, indent=2)}")

# Flask webhook endpoint
from flask import Flask, request, jsonify

app = Flask(__name__)
incident_manager = IncidentManager()

@app.route('/webhook/alert', methods=['POST'])
def handle_alert_webhook():
    """Handle incoming alert webhooks from Prometheus Alertmanager"""
    try:
        alert_data = request.json
        
        # Process each alert in the payload
        for alert in alert_data.get('alerts', []):
            incident_id = incident_manager.handle_alert(alert)
            print(f"Created incident: {incident_id}")
        
        return jsonify({'status': 'success'}), 200
        
    except Exception as e:
        print(f"Error processing alert: {str(e)}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)

# 3. CHAOS ENGINEERING WITH LITMUS

# chaos-experiments/pod-delete.yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: pod-delete-chaos
  namespace: default
spec:
  engineState: 'active'
  appinfo:
    appns: 'default'
    applabel: 'app=myapp'
    appkind: 'deployment'
  chaosServiceAccount: litmus-admin
  experiments:
  - name: pod-delete
    spec:
      components:
        env:
        - name: TOTAL_CHAOS_DURATION
          value: '60'
        - name: CHAOS_INTERVAL
          value: '10'
        - name: FORCE
          value: 'false'
        - name: PODS_AFFECTED_PERC
          value: '50'
      probe:
      - name: "app-health-check"
        type: "httpProbe"
        mode: "Continuous"
        runProperties:
          probeTimeout: 5
          retry: 3
          interval: 2
          probePollingInterval: 2
        httpProbe/inputs:
          url: "http://myapp-service:80/health"
          insecureSkipTLS: false
          method:
            get:
              criteria: "=="
              responseCode: "200"

---
# Network chaos experiment
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: network-latency-chaos
  namespace: default
spec:
  engineState: 'active'
  appinfo:
    appns: 'default'
    applabel: 'app=myapp'
    appkind: 'deployment'
  chaosServiceAccount: litmus-admin
  experiments:
  - name: pod-network-latency
    spec:
      components:
        env:
        - name: TARGET_CONTAINER
          value: 'myapp'
        - name: NETWORK_INTERFACE
          value: 'eth0'
        - name: NETWORK_LATENCY
          value: '2000'
        - name: TOTAL_CHAOS_DURATION
          value: '120'
        - name: PODS_AFFECTED_PERC
          value: '25'
        - name: LIB
          value: 'pumba'
      probe:
      - name: "latency-check"
        type: "cmdProbe"
        mode: "Edge"
        runProperties:
          probeTimeout: 10
          retry: 3
          interval: 5
        cmdProbe/inputs:
          command: "curl -w '%{time_total}' -o /dev/null -s http://myapp-service:80/api/health"
          comparator:
            type: "float"
            criteria: "<"
            value: "5.0"

# Chaos experiment automation script
# chaos-engineering/chaos-scheduler.py
import subprocess
import yaml
import time
import requests
from datetime import datetime, timedelta

class ChaosScheduler:
    def __init__(self):
        self.experiments = [
            {
                'name': 'pod-delete-chaos',
                'schedule': 'weekly',
                'day': 'tuesday',
                'time': '14:00',
                'pre_checks': ['health_check', 'traffic_check'],
                'post_checks': ['recovery_check', 'performance_check']
            },
            {
                'name': 'network-latency-chaos',
                'schedule': 'bi-weekly',
                'day': 'thursday',
                'time': '15:00',
                'pre_checks': ['health_check'],
                'post_checks': ['latency_check']
            }
        ]
    
    def run_experiment(self, experiment_name: str) -> bool:
        """Run a specific chaos experiment"""
        print(f"Starting chaos experiment: {experiment_name}")
        
        # Apply the chaos experiment
        result = subprocess.run([
            'kubectl', 'apply', '-f', f'chaos-experiments/{experiment_name}.yaml'
        ], capture_output=True, text=True)
        
        if result.returncode != 0:
            print(f"Failed to start experiment: {result.stderr}")
            return False
        
        # Wait for experiment to start
        time.sleep(30)
        
        # Monitor experiment progress
        self.monitor_experiment(experiment_name)
        
        return True
    
    def monitor_experiment(self, experiment_name: str) -> None:
        """Monitor chaos experiment execution"""
        start_time = datetime.now()
        timeout = timedelta(minutes=10)
        
        while datetime.now() - start_time < timeout:
            result = subprocess.run([
                'kubectl', 'get', 'chaosengine', experiment_name, '-o', 'yaml'
            ], capture_output=True, text=True)
            
            if result.returncode == 0:
                engine_status = yaml.safe_load(result.stdout)
                status = engine_status.get('status', {}).get('engineStatus', '')
                
                if status == 'completed':
                    print(f"Experiment {experiment_name} completed successfully")
                    break
                elif status == 'failed':
                    print(f"Experiment {experiment_name} failed")
                    break
                else:
                    print(f"Experiment {experiment_name} status: {status}")
            
            time.sleep(30)
    
    def run_pre_checks(self, checks: list) -> bool:
        """Run pre-experiment validation checks"""
        for check in checks:
            if check == 'health_check':
                if not self.health_check():
                    return False
            elif check == 'traffic_check':
                if not self.traffic_check():
                    return False
        return True
    
    def run_post_checks(self, checks: list) -> bool:
        """Run post-experiment validation checks"""
        for check in checks:
            if check == 'recovery_check':
                if not self.recovery_check():
                    return False
            elif check == 'performance_check':
                if not self.performance_check():
                    return False
            elif check == 'latency_check':
                if not self.latency_check():
                    return False
        return True
    
    def health_check(self) -> bool:
        """Check application health"""
        try:
            response = requests.get('http://myapp-service:80/health', timeout=10)
            return response.status_code == 200
        except:
            return False
    
    def traffic_check(self) -> bool:
        """Check if traffic is within acceptable limits"""
        # Query Prometheus for current traffic
        try:
            query = 'sum(rate(http_requests_total[5m]))'
            response = requests.get(
                'http://prometheus:9090/api/v1/query',
                params={'query': query}
            )
            
            if response.status_code == 200:
                data = response.json()
                current_rps = float(data['data']['result'][0]['value'][1])
                return current_rps < 1000  # Don't run chaos during high traffic
            
        except:
            pass
        
        return False
    
    def recovery_check(self) -> bool:
        """Check if system recovered after chaos"""
        # Wait for system to stabilize
        time.sleep(60)
        
        # Check if all pods are ready
        result = subprocess.run([
            'kubectl', 'get', 'pods', '-l', 'app=myapp', '-o', 'json'
        ], capture_output=True, text=True)
        
        if result.returncode == 0:
            pods_data = yaml.safe_load(result.stdout)
            pods = pods_data.get('items', [])
            
            ready_pods = sum(1 for pod in pods 
                           if pod.get('status', {}).get('phase') == 'Running')
            
            return ready_pods >= 2  # At least 2 pods should be running
        
        return False
    
    def performance_check(self) -> bool:
        """Check if performance is within acceptable limits"""
        try:
            # Check response time
            response = requests.get('http://myapp-service:80/api/health', timeout=5)
            return response.elapsed.total_seconds() < 1.0
        except:
            return False
    
    def latency_check(self) -> bool:
        """Check network latency after network chaos"""
        try:
            response = requests.get('http://myapp-service:80/api/health', timeout=3)
            return response.elapsed.total_seconds() < 2.0
        except:
            return False

if __name__ == '__main__':
    scheduler = ChaosScheduler()
    
    for experiment in scheduler.experiments:
        print(f"Running experiment: {experiment['name']}")
        
        if scheduler.run_pre_checks(experiment['pre_checks']):
            success = scheduler.run_experiment(experiment['name'])
            
            if success:
                scheduler.run_post_checks(experiment['post_checks'])
            else:
                print(f"Experiment {experiment['name']} failed")
        else:
            print(f"Pre-checks failed for {experiment['name']}, skipping")
```
*Notice: SRE practices require balancing reliability with feature velocity. Implement gradually and measure impact.*

</div>

## Best Practices

1. **Automate everything**: Build, test, deploy, monitoring
2. **Version control**: Code, configuration, infrastructure
3. **Fast feedback**: Quick build and test cycles
4. **Environment parity**: Development matches production
5. **Immutable infrastructure**: Replace rather than modify
6. **Monitoring**: Comprehensive observability and alerting
7. **Security**: Integrate security into the pipeline (DevSecOps)
8. **Documentation**: Keep runbooks and procedures updated
9. **GitOps**: Declarative infrastructure and application management
10. **Progressive delivery**: Gradual rollouts with automated validation
11. **Service mesh**: Secure and observable service communication
12. **Event-driven design**: Loose coupling with message-driven architecture

### Advanced Container Orchestration and Platform Engineering {#platform-engineering}
<!-- tags: kubernetes, operators, platform-engineering, service-mesh, gitops -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Platform engineering creates developer-friendly infrastructure abstractions. **Kubernetes operators** manage complex applications declaratively, **custom resources** extend Kubernetes functionality, **service mesh** provides secure service-to-service communication, **platform APIs** abstract infrastructure complexity. **Internal developer platforms** standardize deployment workflows, **golden paths** provide opinionated best practices, **self-service infrastructure** enables developer autonomy.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Developer productivity**: Simplified deployment and operations
- **Standardization**: Consistent practices across teams
- **Reliability**: Automated operations and self-healing systems
- **Security**: Built-in security policies and compliance

</div>

<div class="runnable-model" data-filter="platform-engineering">

**Runnable mental model**
```yaml
# 1. KUBERNETES OPERATOR DEVELOPMENT

# Custom Resource Definition (CRD)
# api/v1/application_types.go
package v1

import (
    metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// ApplicationSpec defines the desired state of Application
type ApplicationSpec struct {
    // Image is the container image to deploy
    Image string `json:"image"`
    
    // Replicas is the number of pod replicas
    Replicas int32 `json:"replicas"`
    
    // Port is the container port
    Port int32 `json:"port"`
    
    // Environment variables
    Environment []EnvVar `json:"environment,omitempty"`
    
    // Database configuration
    Database *DatabaseConfig `json:"database,omitempty"`
    
    // Ingress configuration
    Ingress *IngressConfig `json:"ingress,omitempty"`
    
    // Monitoring configuration
    Monitoring *MonitoringConfig `json:"monitoring,omitempty"`
}

type EnvVar struct {
    Name  string `json:"name"`
    Value string `json:"value"`
}

type DatabaseConfig struct {
    Type     string `json:"type"` // postgres, mysql, mongodb
    Host     string `json:"host"`
    Port     int32  `json:"port"`
    Name     string `json:"name"`
    Username string `json:"username"`
    Password string `json:"password"`
}

type IngressConfig struct {
    Host        string            `json:"host"`
    Path        string            `json:"path,omitempty"`
    TLS         bool              `json:"tls,omitempty"`
    Annotations map[string]string `json:"annotations,omitempty"`
}

type MonitoringConfig struct {
    Enabled     bool   `json:"enabled"`
    MetricsPath string `json:"metricsPath,omitempty"`
    MetricsPort int32  `json:"metricsPort,omitempty"`
}

// ApplicationStatus defines the observed state of Application
type ApplicationStatus struct {
    // Phase represents the current phase of the application
    Phase ApplicationPhase `json:"phase,omitempty"`
    
    // Conditions represent the latest available observations
    Conditions []metav1.Condition `json:"conditions,omitempty"`
    
    // DeployedReplicas is the number of currently deployed replicas
    DeployedReplicas int32 `json:"deployedReplicas,omitempty"`
    
    // URL is the publicly accessible URL
    URL string `json:"url,omitempty"`
    
    // DatabaseStatus represents database connection status
    DatabaseStatus string `json:"databaseStatus,omitempty"`
}

type ApplicationPhase string

const (
    ApplicationPhasePending   ApplicationPhase = "Pending"
    ApplicationPhaseDeploying ApplicationPhase = "Deploying"
    ApplicationPhaseReady     ApplicationPhase = "Ready"
    ApplicationPhaseFailed    ApplicationPhase = "Failed"
)

//+kubebuilder:object:root=true
//+kubebuilder:subresource:status
//+kubebuilder:printcolumn:name="Phase",type=string,JSONPath=`.status.phase`
//+kubebuilder:printcolumn:name="Replicas",type=integer,JSONPath=`.status.deployedReplicas`
//+kubebuilder:printcolumn:name="URL",type=string,JSONPath=`.status.url`

// Application is the Schema for the applications API
type Application struct {
    metav1.TypeMeta   `json:",inline"`
    metav1.ObjectMeta `json:"metadata,omitempty"`

    Spec   ApplicationSpec   `json:"spec,omitempty"`
    Status ApplicationStatus `json:"status,omitempty"`
}

//+kubebuilder:object:root=true

// ApplicationList contains a list of Application
type ApplicationList struct {
    metav1.TypeMeta `json:",inline"`
    metav1.ListMeta `json:"metadata,omitempty"`
    Items           []Application `json:"items"`
}

# Operator Controller Logic
# controllers/application_controller.go
package controllers

import (
    "context"
    "fmt"
    "time"

    appsv1 "k8s.io/api/apps/v1"
    corev1 "k8s.io/api/core/v1"
    networkingv1 "k8s.io/api/networking/v1"
    metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
    "k8s.io/apimachinery/pkg/runtime"
    "k8s.io/apimachinery/pkg/util/intstr"
    ctrl "sigs.k8s.io/controller-runtime"
    "sigs.k8s.io/controller-runtime/pkg/client"
    "sigs.k8s.io/controller-runtime/pkg/log"

    appv1 "github.com/example/app-operator/api/v1"
)

// ApplicationReconciler reconciles an Application object
type ApplicationReconciler struct {
    client.Client
    Scheme *runtime.Scheme
}

//+kubebuilder:rbac:groups=app.example.com,resources=applications,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=app.example.com,resources=applications/status,verbs=get;update;patch
//+kubebuilder:rbac:groups=apps,resources=deployments,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=core,resources=services,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=networking.k8s.io,resources=ingresses,verbs=get;list;watch;create;update;patch;delete

func (r *ApplicationReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
    log := log.FromContext(ctx)

    // Fetch the Application instance
    var app appv1.Application
    if err := r.Get(ctx, req.NamespacedName, &app); err != nil {
        log.Error(err, "unable to fetch Application")
        return ctrl.Result{}, client.IgnoreNotFound(err)
    }

    // Update status to Deploying
    app.Status.Phase = appv1.ApplicationPhaseDeploying
    if err := r.Status().Update(ctx, &app); err != nil {
        log.Error(err, "unable to update Application status")
        return ctrl.Result{}, err
    }

    // Reconcile Deployment
    if err := r.reconcileDeployment(ctx, &app); err != nil {
        log.Error(err, "unable to reconcile Deployment")
        app.Status.Phase = appv1.ApplicationPhaseFailed
        r.Status().Update(ctx, &app)
        return ctrl.Result{}, err
    }

    // Reconcile Service
    if err := r.reconcileService(ctx, &app); err != nil {
        log.Error(err, "unable to reconcile Service")
        app.Status.Phase = appv1.ApplicationPhaseFailed
        r.Status().Update(ctx, &app)
        return ctrl.Result{}, err
    }

    // Reconcile Ingress if configured
    if app.Spec.Ingress != nil {
        if err := r.reconcileIngress(ctx, &app); err != nil {
            log.Error(err, "unable to reconcile Ingress")
            app.Status.Phase = appv1.ApplicationPhaseFailed
            r.Status().Update(ctx, &app)
            return ctrl.Result{}, err
        }
    }

    // Check deployment status
    deployment := &appsv1.Deployment{}
    if err := r.Get(ctx, client.ObjectKey{
        Namespace: app.Namespace,
        Name:      app.Name,
    }, deployment); err != nil {
        return ctrl.Result{}, err
    }

    // Update Application status
    app.Status.DeployedReplicas = deployment.Status.ReadyReplicas
    
    if deployment.Status.ReadyReplicas == app.Spec.Replicas {
        app.Status.Phase = appv1.ApplicationPhaseReady
        if app.Spec.Ingress != nil {
            app.Status.URL = fmt.Sprintf("https://%s%s", 
                app.Spec.Ingress.Host, 
                app.Spec.Ingress.Path)
        }
    } else {
        app.Status.Phase = appv1.ApplicationPhaseDeploying
    }

    if err := r.Status().Update(ctx, &app); err != nil {
        log.Error(err, "unable to update Application status")
        return ctrl.Result{}, err
    }

    // Requeue after 30 seconds if not ready
    if app.Status.Phase != appv1.ApplicationPhaseReady {
        return ctrl.Result{RequeueAfter: time.Second * 30}, nil
    }

    return ctrl.Result{}, nil
}

func (r *ApplicationReconciler) reconcileDeployment(ctx context.Context, app *appv1.Application) error {
    deployment := &appsv1.Deployment{
        ObjectMeta: metav1.ObjectMeta{
            Name:      app.Name,
            Namespace: app.Namespace,
        },
        Spec: appsv1.DeploymentSpec{
            Replicas: &app.Spec.Replicas,
            Selector: &metav1.LabelSelector{
                MatchLabels: map[string]string{
                    "app": app.Name,
                },
            },
            Template: corev1.PodTemplateSpec{
                ObjectMeta: metav1.ObjectMeta{
                    Labels: map[string]string{
                        "app": app.Name,
                    },
                },
                Spec: corev1.PodSpec{
                    Containers: []corev1.Container{
                        {
                            Name:  app.Name,
                            Image: app.Spec.Image,
                            Ports: []corev1.ContainerPort{
                                {
                                    ContainerPort: app.Spec.Port,
                                },
                            },
                            Env: r.buildEnvVars(app),
                            Resources: corev1.ResourceRequirements{
                                Requests: corev1.ResourceList{
                                    corev1.ResourceCPU:    resource.MustParse("100m"),
                                    corev1.ResourceMemory: resource.MustParse("128Mi"),
                                },
                                Limits: corev1.ResourceList{
                                    corev1.ResourceCPU:    resource.MustParse("500m"),
                                    corev1.ResourceMemory: resource.MustParse("512Mi"),
                                },
                            },
                        },
                    },
                },
            },
        },
    }

    // Set owner reference
    if err := ctrl.SetControllerReference(app, deployment, r.Scheme); err != nil {
        return err
    }

    // Create or update deployment
    if err := r.Client.Create(ctx, deployment); err != nil {
        if errors.IsAlreadyExists(err) {
            return r.Client.Update(ctx, deployment)
        }
        return err
    }

    return nil
}

func (r *ApplicationReconciler) buildEnvVars(app *appv1.Application) []corev1.EnvVar {
    envVars := []corev1.EnvVar{}

    // Add user-defined environment variables
    for _, env := range app.Spec.Environment {
        envVars = append(envVars, corev1.EnvVar{
            Name:  env.Name,
            Value: env.Value,
        })
    }

    // Add database environment variables if configured
    if app.Spec.Database != nil {
        envVars = append(envVars, []corev1.EnvVar{
            {
                Name:  "DB_TYPE",
                Value: app.Spec.Database.Type,
            },
            {
                Name:  "DB_HOST",
                Value: app.Spec.Database.Host,
            },
            {
                Name:  "DB_PORT",
                Value: fmt.Sprintf("%d", app.Spec.Database.Port),
            },
            {
                Name:  "DB_NAME",
                Value: app.Spec.Database.Name,
            },
            {
                Name:  "DB_USERNAME",
                Value: app.Spec.Database.Username,
            },
            {
                Name:  "DB_PASSWORD",
                Value: app.Spec.Database.Password,
            },
        }...)
    }

    return envVars
}

# 2. INTERNAL DEVELOPER PLATFORM CONFIGURATION

# platform-config.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: platform-config
  namespace: platform-system
data:
  platform.yaml: |
    platform:
      name: "MyCompany Developer Platform"
      version: "1.0.0"
      
    environments:
      - name: development
        cluster: dev-cluster
        namespace_template: "{{.team}}-{{.app}}-dev"
        resource_quotas:
          cpu: "2"
          memory: "4Gi"
          storage: "10Gi"
        
      - name: staging
        cluster: staging-cluster
        namespace_template: "{{.team}}-{{.app}}-staging"
        resource_quotas:
          cpu: "4"
          memory: "8Gi"
          storage: "20Gi"
        approval_required: false
        
      - name: production
        cluster: prod-cluster
        namespace_template: "{{.team}}-{{.app}}-prod"
        resource_quotas:
          cpu: "8"
          memory: "16Gi"
          storage: "50Gi"
        approval_required: true
        approvers: ["platform-team", "security-team"]
    
    golden_paths:
      web_application:
        description: "Standard web application with database"
        template_repo: "https://github.com/company/web-app-template"
        components:
          - frontend: 
              framework: "react"
              build_tool: "vite"
          - backend:
              framework: "express"
              database: "postgresql"
          - monitoring:
              enabled: true
              tools: ["prometheus", "grafana"]
          - security:
              scanning: true
              policies: ["standard-security-policy"]
      
      microservice:
        description: "Microservice with gRPC/REST APIs"
        template_repo: "https://github.com/company/microservice-template"
        components:
          - api:
              protocols: ["grpc", "rest"]
              authentication: "oauth2"
          - database:
              type: "postgresql"
              migrations: true
          - messaging:
              broker: "kafka"
              topics: ["events", "commands"]
    
    policies:
      resource_limits:
        cpu_max: "8"
        memory_max: "16Gi"
        storage_max: "100Gi"
      
      security:
        container_scanning: true
        vulnerability_threshold: "high"
        network_policies: true
        pod_security_standards: "restricted"
      
      compliance:
        data_classification: true
        audit_logging: true
        backup_retention: "30d"

# Developer Portal API
# api/platform-api.py
from flask import Flask, request, jsonify
from kubernetes import client, config
import yaml
import git
import os
import subprocess

app = Flask(__name__)

class PlatformAPI:
    def __init__(self):
        config.load_incluster_config()
        self.k8s_client = client.ApiClient()
        self.apps_v1 = client.AppsV1Api()
        self.core_v1 = client.CoreV1Api()
        
    def create_application(self, app_spec):
        """Create new application using golden path template"""
        golden_path = app_spec.get('golden_path', 'web_application')
        
        # Clone template repository
        template_repo = self.get_golden_path_template(golden_path)
        local_path = f"/tmp/{app_spec['name']}"
        
        repo = git.Repo.clone_from(template_repo, local_path)
        
        # Customize template
        self.customize_template(local_path, app_spec)
        
        # Create namespace
        namespace = self.create_namespace(app_spec)
        
        # Deploy application
        self.deploy_application(app_spec, namespace)
        
        # Setup monitoring
        self.setup_monitoring(app_spec, namespace)
        
        # Setup CI/CD pipeline
        self.setup_pipeline(app_spec)
        
        return {
            'status': 'success',
            'namespace': namespace,
            'git_repo': f"https://git.company.com/{app_spec['team']}/{app_spec['name']}",
            'pipeline_url': f"https://ci.company.com/{app_spec['team']}/{app_spec['name']}"
        }
    
    def get_golden_path_template(self, golden_path):
        """Get template repository URL for golden path"""
        templates = {
            'web_application': 'https://github.com/company/web-app-template',
            'microservice': 'https://github.com/company/microservice-template',
            'data_pipeline': 'https://github.com/company/data-pipeline-template'
        }
        return templates.get(golden_path)
    
    def customize_template(self, template_path, app_spec):
        """Customize template based on application specification"""
        # Replace placeholders in template files
        for root, dirs, files in os.walk(template_path):
            for file in files:
                if file.endswith(('.yaml', '.yml', '.json', '.md')):
                    file_path = os.path.join(root, file)
                    with open(file_path, 'r') as f:
                        content = f.read()
                    
                    # Replace placeholders
                    content = content.replace('{{APP_NAME}}', app_spec['name'])
                    content = content.replace('{{TEAM_NAME}}', app_spec['team'])
                    content = content.replace('{{ENVIRONMENT}}', app_spec.get('environment', 'development'))
                    
                    with open(file_path, 'w') as f:
                        f.write(content)
    
    def create_namespace(self, app_spec):
        """Create Kubernetes namespace for application"""
        namespace_name = f"{app_spec['team']}-{app_spec['name']}-{app_spec.get('environment', 'dev')}"
        
        namespace = client.V1Namespace(
            metadata=client.V1ObjectMeta(
                name=namespace_name,
                labels={
                    'team': app_spec['team'],
                    'app': app_spec['name'],
                    'environment': app_spec.get('environment', 'development'),
                    'managed-by': 'platform'
                }
            )
        )
        
        try:
            self.core_v1.create_namespace(body=namespace)
        except client.ApiException as e:
            if e.status == 409:  # Namespace already exists
                pass
            else:
                raise
        
        # Apply resource quotas
        self.apply_resource_quotas(namespace_name, app_spec.get('environment', 'development'))
        
        return namespace_name
    
    def deploy_application(self, app_spec, namespace):
        """Deploy application using custom Application CRD"""
        application_manifest = {
            'apiVersion': 'app.example.com/v1',
            'kind': 'Application',
            'metadata': {
                'name': app_spec['name'],
                'namespace': namespace
            },
            'spec': {
                'image': app_spec.get('image', f"registry.company.com/{app_spec['team']}/{app_spec['name']}:latest"),
                'replicas': app_spec.get('replicas', 2),
                'port': app_spec.get('port', 8080),
                'environment': app_spec.get('environment_vars', []),
                'database': app_spec.get('database'),
                'ingress': app_spec.get('ingress'),
                'monitoring': {
                    'enabled': True,
                    'metricsPath': '/metrics',
                    'metricsPort': 9090
                }
            }
        }
        
        # Apply the Application custom resource
        subprocess.run([
            'kubectl', 'apply', '-f', '-'
        ], input=yaml.dump(application_manifest), text=True)

platform_api = PlatformAPI()

@app.route('/api/applications', methods=['POST'])
def create_application():
    """Create new application"""
    app_spec = request.json
    
    # Validate required fields
    required_fields = ['name', 'team', 'golden_path']
    for field in required_fields:
        if field not in app_spec:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    try:
        result = platform_api.create_application(app_spec)
        return jsonify(result), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/applications', methods=['GET'])
def list_applications():
    """List all applications"""
    try:
        # Get all Application custom resources
        applications = []
        
        # This would query the custom Application resources
        # For now, return mock data
        applications = [
            {
                'name': 'web-frontend',
                'team': 'frontend-team',
                'environment': 'production',
                'status': 'Ready',
                'url': 'https://app.company.com'
            }
        ]
        
        return jsonify(applications), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/golden-paths', methods=['GET'])
def list_golden_paths():
    """List available golden paths"""
    golden_paths = [
        {
            'name': 'web_application',
            'description': 'Standard web application with database',
            'components': ['frontend', 'backend', 'database', 'monitoring']
        },
        {
            'name': 'microservice',
            'description': 'Microservice with gRPC/REST APIs',
            'components': ['api', 'database', 'messaging', 'monitoring']
        },
        {
            'name': 'data_pipeline',
            'description': 'Data processing pipeline',
            'components': ['ingestion', 'processing', 'storage', 'monitoring']
        }
    ]
    
    return jsonify(golden_paths), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)

# 3. GITOPS WORKFLOW WITH ARGOCD

# argocd/application-template.yaml
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: team-applications
  namespace: argocd
spec:
  generators:
  - git:
      repoURL: https://git.company.com/platform/app-configs
      revision: HEAD
      directories:
      - path: "apps/*"
  template:
    metadata:
      name: '{{path.basename}}'
      namespace: argocd
      labels:
        app: '{{path.basename}}'
      annotations:
        argocd.argoproj.io/sync-wave: "0"
    spec:
      project: default
      source:
        repoURL: https://git.company.com/platform/app-configs
        targetRevision: HEAD
        path: '{{path}}'
        helm:
          valueFiles:
          - values.yaml
          - values-{{.Values.environment}}.yaml
      destination:
        server: https://kubernetes.default.svc
        namespace: '{{path.basename}}'
      syncPolicy:
        automated:
          prune: true
          selfHeal: true
          allowEmpty: false
        syncOptions:
        - CreateNamespace=true
        - PrunePropagationPolicy=foreground
        - PruneLast=true
        retry:
          limit: 5
          backoff:
            duration: 5s
            factor: 2
            maxDuration: 3m

# Progressive delivery with Argo Rollouts
# argocd/rollout-strategy.yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: web-frontend
  namespace: frontend-team-web-prod
spec:
  replicas: 10
  strategy:
    canary:
      maxSurge: "25%"
      maxUnavailable: 0
      analysis:
        templates:
        - templateName: success-rate
        startingStep: 2
        args:
        - name: service-name
          value: web-frontend
      steps:
      - setWeight: 10
      - pause: {duration: 30s}
      - setWeight: 20
      - pause: {duration: 30s}
      - analysis:
          templates:
          - templateName: success-rate
          args:
          - name: service-name
            value: web-frontend
      - setWeight: 40
      - pause: {duration: 1m}
      - setWeight: 60
      - pause: {duration: 1m}
      - setWeight: 80
      - pause: {duration: 1m}
      trafficRouting:
        istio:
          virtualService:
            name: web-frontend-vs
            routes:
            - primary
          destinationRule:
            name: web-frontend-dr
            canarySubsetName: canary
            stableSubsetName: stable
  selector:
    matchLabels:
      app: web-frontend
  template:
    metadata:
      labels:
        app: web-frontend
    spec:
      containers:
      - name: web-frontend
        image: registry.company.com/frontend-team/web-frontend:v1.2.0
        ports:
        - name: http
          containerPort: 8080
          protocol: TCP
        resources:
          requests:
            memory: 32Mi
            cpu: 5m
          limits:
            memory: 128Mi
            cpu: 100m

---
# Analysis template for success rate
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: success-rate
  namespace: frontend-team-web-prod
spec:
  args:
  - name: service-name
  metrics:
  - name: success-rate
    interval: 60s
    count: 5
    successCondition: result[0] >= 0.95
    failureLimit: 3
    provider:
      prometheus:
        address: http://prometheus.monitoring:9090
        query: |
          sum(rate(
            http_requests_total{job="{{args.service-name}}",code!~"5.."}[5m]
          )) /
          sum(rate(
            http_requests_total{job="{{args.service-name}}"}[5m]
          ))
  - name: avg-response-time
    interval: 60s
    count: 5
    successCondition: result[0] <= 1000
    failureLimit: 3
    provider:
      prometheus:
        address: http://prometheus.monitoring:9090
        query: |
          histogram_quantile(0.95,
            sum(rate(
              http_request_duration_seconds_bucket{job="{{args.service-name}}"}[5m]
            )) by (le)
          ) * 1000
```
*Notice: Platform engineering requires balancing developer autonomy with operational control. Start simple and evolve based on team needs.*

</div>

### Advanced Security and Compliance Automation {#security-compliance}
<!-- tags: devsecops, security-scanning, compliance, policy-as-code, zero-trust -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Security and compliance automation integrates security practices throughout the development lifecycle. **DevSecOps** embeds security in CI/CD pipelines, **policy as code** enforces security rules automatically, **vulnerability scanning** identifies security issues early, **compliance automation** ensures regulatory adherence. **Zero-trust architecture** assumes no implicit trust, **secret management** secures sensitive data, **security monitoring** detects threats in real-time.*

</div>

<div class="runnable-model" data-filter="security-compliance">

**Runnable mental model**
```yaml
# 1. SECURITY SCANNING PIPELINE

# .github/workflows/security-scan.yml
name: Security Scanning Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    permissions:
      security-events: write
      contents: read
      
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    # Dependency scanning
    - name: Dependency Check
      uses: dependency-check/Dependency-Check_Action@main
      with:
        project: 'MyProject'
        path: '.'
        format: 'SARIF'
        output: 'dependency-check-report.sarif'
        
    - name: Upload Dependency Check results
      uses: github/codeql-action/upload-sarif@v2
      with:
        sarif_file: dependency-check-report.sarif
        
    # Secret scanning
    - name: Secret Detection
      uses: trufflesecurity/trufflehog@main
      with:
        path: ./
        base: main
        head: HEAD
        extra_args: --debug --only-verified
        
    # Static Application Security Testing (SAST)
    - name: CodeQL Analysis
      uses: github/codeql-action/init@v2
      with:
        languages: javascript, typescript
        
    - name: Autobuild
      uses: github/codeql-action/autobuild@v2
      
    - name: Perform CodeQL Analysis
      uses: github/codeql-action/analyze@v2
      
    # Container security scanning
    - name: Build Docker image
      run: docker build -t myapp:${{ github.sha }} .
      
    - name: Trivy vulnerability scanner
      uses: aquasecurity/trivy-action@master
      with:
        image-ref: 'myapp:${{ github.sha }}'
        format: 'sarif'
        output: 'trivy-results.sarif'
        
    - name: Upload Trivy scan results
      uses: github/codeql-action/upload-sarif@v2
      with:
        sarif_file: 'trivy-results.sarif'
        
    # Infrastructure as Code scanning
    - name: Checkov IaC Security Scan
      uses: bridgecrewio/checkov-action@master
      with:
        directory: infrastructure/
        framework: terraform
        output_format: sarif
        output_file_path: checkov-report.sarif
        
    - name: Upload Checkov results
      uses: github/codeql-action/upload-sarif@v2
      with:
        sarif_file: checkov-report.sarif

# 2. POLICY AS CODE WITH OPEN POLICY AGENT (OPA)

# policies/kubernetes-security.rego
package kubernetes.security

import future.keywords.if
import future.keywords.in

# Deny containers running as root
deny[msg] if {
    input.kind == "Pod"
    container := input.spec.containers[_]
    container.securityContext.runAsUser == 0
    msg := sprintf("Container %s is running as root user", [container.name])
}

# Require security contexts
deny[msg] if {
    input.kind == "Pod"
    container := input.spec.containers[_]
    not container.securityContext
    msg := sprintf("Container %s missing security context", [container.name])
}

# Deny privileged containers
deny[msg] if {
    input.kind == "Pod"
    container := input.spec.containers[_]
    container.securityContext.privileged == true
    msg := sprintf("Container %s is running in privileged mode", [container.name])
}

# Require resource limits
deny[msg] if {
    input.kind == "Pod"
    container := input.spec.containers[_]
    not container.resources.limits.memory
    msg := sprintf("Container %s missing memory limit", [container.name])
}

deny[msg] if {
    input.kind == "Pod"
    container := input.spec.containers[_]
    not container.resources.limits.cpu
    msg := sprintf("Container %s missing CPU limit", [container.name])
}

# Require read-only root filesystem
deny[msg] if {
    input.kind == "Pod"
    container := input.spec.containers[_]
    not container.securityContext.readOnlyRootFilesystem == true
    msg := sprintf("Container %s root filesystem is not read-only", [container.name])
}

# Network policy requirements
deny[msg] if {
    input.kind == "Namespace"
    namespace := input.metadata.name
    not has_network_policy(namespace)
    msg := sprintf("Namespace %s missing network policy", [namespace])
}

has_network_policy(namespace) if {
    # This would check if NetworkPolicy exists for the namespace
    # Implementation depends on data source
    true
}

# Image security policies
deny[msg] if {
    input.kind == "Pod"
    container := input.spec.containers[_]
    image := container.image
    not starts_with(image, "registry.company.com/")
    msg := sprintf("Container %s using unauthorized registry: %s", [container.name, image])
}

deny[msg] if {
    input.kind == "Pod"
    container := input.spec.containers[_]
    image := container.image
    ends_with(image, ":latest")
    msg := sprintf("Container %s using latest tag: %s", [container.name, image])
}

# Service account policies
deny[msg] if {
    input.kind == "Pod"
    input.spec.serviceAccountName == "default"
    msg := "Pod using default service account"
}

# Gatekeeper constraint template
# gatekeeper/security-policies.yaml
apiVersion: templates.gatekeeper.sh/v1beta1
kind: ConstraintTemplate
metadata:
  name: k8srequiredsecuritycontext
spec:
  crd:
    spec:
      names:
        kind: K8sRequiredSecurityContext
      validation:
        type: object
        properties:
          runAsNonRoot:
            type: boolean
          readOnlyRootFilesystem:
            type: boolean
          allowPrivilegeEscalation:
            type: boolean
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |
        package k8srequiredsecuritycontext

        violation[{"msg": msg}] {
          container := input.review.object.spec.containers[_]
          not container.securityContext.runAsNonRoot
          msg := sprintf("Container %v is missing runAsNonRoot security context", [container.name])
        }

        violation[{"msg": msg}] {
          container := input.review.object.spec.containers[_]
          not container.securityContext.readOnlyRootFilesystem
          msg := sprintf("Container %v is missing readOnlyRootFilesystem security context", [container.name])
        }

        violation[{"msg": msg}] {
          container := input.review.object.spec.containers[_]
          container.securityContext.allowPrivilegeEscalation != false
          msg := sprintf("Container %v allows privilege escalation", [container.name])
        }

---
# Apply security constraints
apiVersion: config.gatekeeper.sh/v1alpha1
kind: K8sRequiredSecurityContext
metadata:
  name: must-have-security-context
spec:
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Pod"]
    excludedNamespaces: ["kube-system", "gatekeeper-system"]
  parameters:
    runAsNonRoot: true
    readOnlyRootFilesystem: true
    allowPrivilegeEscalation: false

# 3. SECRET MANAGEMENT WITH VAULT

# vault/vault-config.hcl
storage "consul" {
  address = "consul:8500"
  path    = "vault/"
}

listener "tcp" {
  address     = "0.0.0.0:8200"
  tls_cert_file = "/vault/tls/server.crt"
  tls_key_file  = "/vault/tls/server.key"
  tls_disable = false
}

api_addr = "https://vault.company.com:8200"
cluster_addr = "https://vault.company.com:8201"

ui = true

# Vault Kubernetes authentication
auth "kubernetes" {
  kubernetes_host = "https://kubernetes.default.svc"
  token_reviewer_jwt = "/var/run/secrets/kubernetes.io/serviceaccount/token"
  kubernetes_ca_cert = "/var/run/secrets/kubernetes.io/serviceaccount/ca.crt"
}

# Database secrets engine
path "database/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}

# Application secrets
path "secret/myapp/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}

# Vault Agent configuration for Kubernetes
# vault/vault-agent-config.hcl
pid_file = "/tmp/vault-agent.pid"

vault {
  address = "https://vault.company.com:8200"
  ca_cert = "/vault/tls/ca.crt"
}

auto_auth {
  method "kubernetes" {
    mount_path = "auth/kubernetes"
    config = {
      role = "myapp-role"
    }
  }

  sink "file" {
    config = {
      path = "/tmp/vault-token"
    }
  }
}

template {
  source      = "/vault/templates/database.tpl"
  destination = "/vault/secrets/database.env"
  perms       = 0644
  command     = "restart myapp"
}

template {
  source      = "/vault/templates/api-keys.tpl"
  destination = "/vault/secrets/api-keys.json"
  perms       = 0644
  command     = "reload myapp"
}

# Database template
# vault/templates/database.tpl
{% raw %}{{- with secret "database/creds/myapp-role" -}}
export DB_USERNAME="{{ .Data.username }}"
export DB_PASSWORD="{{ .Data.password }}"
export DB_HOST="postgres.company.com"
export DB_PORT="5432"
export DB_NAME="myapp"
{{- end }}{% endraw %}

# External Secrets Operator configuration
# secrets/external-secret.yaml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: vault-secret
  namespace: myapp
spec:
  refreshInterval: 15s
  secretStoreRef:
    name: vault-backend
    kind: SecretStore
  target:
    name: myapp-secret
    creationPolicy: Owner
  data:
  - secretKey: username
    remoteRef:
      key: database/creds/myapp-role
      property: username
  - secretKey: password
    remoteRef:
      key: database/creds/myapp-role
      property: password
  - secretKey: api-key
    remoteRef:
      key: secret/myapp/api
      property: key

---
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: vault-backend
  namespace: myapp
spec:
  provider:
    vault:
      server: "https://vault.company.com:8200"
      path: "secret"
      version: "v2"
      auth:
        kubernetes:
          mountPath: "kubernetes"
          role: "myapp-role"
          serviceAccountRef:
            name: "myapp-sa"

# 4. COMPLIANCE AUTOMATION

# compliance/compliance-scan.py
#!/usr/bin/env python3
"""
Compliance scanning and reporting automation
"""

import json
import yaml
import subprocess
import requests
from datetime import datetime
from typing import Dict, List, Any

class ComplianceScanner:
    def __init__(self):
        self.standards = {
            'SOC2': {
                'controls': [
                    'access_control',
                    'encryption_at_rest',
                    'encryption_in_transit',
                    'audit_logging',
                    'vulnerability_management'
                ]
            },
            'PCI_DSS': {
                'controls': [
                    'network_segmentation',
                    'access_control',
                    'encryption',
                    'security_monitoring',
                    'vulnerability_scanning'
                ]
            },
            'GDPR': {
                'controls': [
                    'data_classification',
                    'data_retention',
                    'access_control',
                    'encryption',
                    'audit_logging'
                ]
            }
        }
    
    def scan_kubernetes_compliance(self, namespace: str = None) -> Dict[str, Any]:
        """Scan Kubernetes cluster for compliance violations"""
        results = {
            'timestamp': datetime.now().isoformat(),
            'namespace': namespace,
            'violations': [],
            'controls_status': {}
        }
        
        # Check Pod Security Standards
        pod_violations = self.check_pod_security_standards(namespace)
        results['violations'].extend(pod_violations)
        
        # Check Network Policies
        network_violations = self.check_network_policies(namespace)
        results['violations'].extend(network_violations)
        
        # Check RBAC
        rbac_violations = self.check_rbac_compliance(namespace)
        results['violations'].extend(rbac_violations)
        
        # Check Secret Management
        secret_violations = self.check_secret_management(namespace)
        results['violations'].extend(secret_violations)
        
        # Check Resource Quotas
        quota_violations = self.check_resource_quotas(namespace)
        results['violations'].extend(quota_violations)
        
        # Generate compliance scores
        results['compliance_scores'] = self.calculate_compliance_scores(results['violations'])
        
        return results
    
    def check_pod_security_standards(self, namespace: str) -> List[Dict[str, Any]]:
        """Check Pod Security Standards compliance"""
        violations = []
        
        cmd = ['kubectl', 'get', 'pods', '-o', 'json']
        if namespace:
            cmd.extend(['-n', namespace])
        
        try:
            result = subprocess.run(cmd, capture_output=True, text=True, check=True)
            pods_data = json.loads(result.stdout)
            
            for pod in pods_data.get('items', []):
                pod_name = pod['metadata']['name']
                pod_namespace = pod['metadata']['namespace']
                
                # Check security context
                for container in pod['spec'].get('containers', []):
                    security_context = container.get('securityContext', {})
                    
                    if not security_context.get('runAsNonRoot'):
                        violations.append({
                            'type': 'pod_security',
                            'severity': 'high',
                            'resource': f"{pod_namespace}/{pod_name}",
                            'container': container['name'],
                            'violation': 'Container not running as non-root user',
                            'control': 'access_control'
                        })
                    
                    if not security_context.get('readOnlyRootFilesystem'):
                        violations.append({
                            'type': 'pod_security',
                            'severity': 'medium',
                            'resource': f"{pod_namespace}/{pod_name}",
                            'container': container['name'],
                            'violation': 'Container root filesystem not read-only',
                            'control': 'access_control'
                        })
                    
                    if security_context.get('privileged'):
                        violations.append({
                            'type': 'pod_security',
                            'severity': 'critical',
                            'resource': f"{pod_namespace}/{pod_name}",
                            'container': container['name'],
                            'violation': 'Container running in privileged mode',
                            'control': 'access_control'
                        })
        
        except subprocess.CalledProcessError as e:
            print(f"Error checking pod security: {e}")
        
        return violations
    
    def check_network_policies(self, namespace: str) -> List[Dict[str, Any]]:
        """Check Network Policy compliance"""
        violations = []
        
        # Get all namespaces or specific namespace
        namespaces_to_check = []
        if namespace:
            namespaces_to_check = [namespace]
        else:
            cmd = ['kubectl', 'get', 'namespaces', '-o', 'json']
            try:
                result = subprocess.run(cmd, capture_output=True, text=True, check=True)
                ns_data = json.loads(result.stdout)
                namespaces_to_check = [ns['metadata']['name'] for ns in ns_data.get('items', [])]
            except subprocess.CalledProcessError:
                pass
        
        # Check each namespace for network policies
        for ns in namespaces_to_check:
            if ns in ['kube-system', 'kube-public', 'kube-node-lease']:
                continue
                
            cmd = ['kubectl', 'get', 'networkpolicies', '-n', ns, '-o', 'json']
            try:
                result = subprocess.run(cmd, capture_output=True, text=True, check=True)
                policies_data = json.loads(result.stdout)
                
                if not policies_data.get('items'):
                    violations.append({
                        'type': 'network_policy',
                        'severity': 'high',
                        'resource': f"namespace/{ns}",
                        'violation': 'Namespace missing network policies',
                        'control': 'network_segmentation'
                    })
            
            except subprocess.CalledProcessError:
                pass
        
        return violations
    
    def check_rbac_compliance(self, namespace: str) -> List[Dict[str, Any]]:
        """Check RBAC compliance"""
        violations = []
        
        # Check for overly permissive cluster role bindings
        cmd = ['kubectl', 'get', 'clusterrolebindings', '-o', 'json']
        try:
            result = subprocess.run(cmd, capture_output=True, text=True, check=True)
            crb_data = json.loads(result.stdout)
            
            for binding in crb_data.get('items', []):
                if binding['roleRef']['name'] == 'cluster-admin':
                    for subject in binding.get('subjects', []):
                        if subject.get('kind') == 'User' and subject.get('name') != 'system:admin':
                            violations.append({
                                'type': 'rbac',
                                'severity': 'critical',
                                'resource': f"clusterrolebinding/{binding['metadata']['name']}",
                                'violation': f"User {subject['name']} has cluster-admin privileges",
                                'control': 'access_control'
                            })
        
        except subprocess.CalledProcessError:
            pass
        
        return violations
    
    def generate_compliance_report(self, scan_results: Dict[str, Any]) -> str:
        """Generate compliance report"""
        report = f"""
# Compliance Scan Report

**Scan Date:** {scan_results['timestamp']}
**Namespace:** {scan_results.get('namespace', 'All namespaces')}

## Executive Summary

Total Violations: {len(scan_results['violations'])}

### Severity Breakdown
"""
        
        severity_counts = {}
        for violation in scan_results['violations']:
            severity = violation['severity']
            severity_counts[severity] = severity_counts.get(severity, 0) + 1
        
        for severity, count in severity_counts.items():
            report += f"- {severity.title()}: {count}\n"
        
        report += "\n## Compliance Scores\n\n"
        
        for standard, score in scan_results['compliance_scores'].items():
            report += f"- {standard}: {score:.1f}%\n"
        
        report += "\n## Detailed Violations\n\n"
        
        for violation in scan_results['violations']:
            report += f"### {violation['type'].title()} - {violation['severity'].title()}\n"
            report += f"**Resource:** {violation['resource']}\n"
            report += f"**Violation:** {violation['violation']}\n"
            report += f"**Control:** {violation['control']}\n\n"
        
        return report
    
    def calculate_compliance_scores(self, violations: List[Dict[str, Any]]) -> Dict[str, float]:
        """Calculate compliance scores for each standard"""
        scores = {}
        
        for standard, config in self.standards.items():
            total_controls = len(config['controls'])
            violated_controls = set()
            
            for violation in violations:
                if violation['control'] in config['controls']:
                    violated_controls.add(violation['control'])
            
            compliant_controls = total_controls - len(violated_controls)
            score = (compliant_controls / total_controls) * 100
            scores[standard] = score
        
        return scores

def main():
    scanner = ComplianceScanner()
    
    # Scan compliance
    results = scanner.scan_kubernetes_compliance()
    
    # Generate report
    report = scanner.generate_compliance_report(results)
    
    # Save report
    with open(f"compliance-report-{datetime.now().strftime('%Y%m%d-%H%M%S')}.md", 'w') as f:
        f.write(report)
    
    # Save raw results
    with open(f"compliance-results-{datetime.now().strftime('%Y%m%d-%H%M%S')}.json", 'w') as f:
        json.dump(results, f, indent=2)
    
    print(f"Compliance scan completed. Found {len(results['violations'])} violations.")
    print(f"Report saved to compliance-report-{datetime.now().strftime('%Y%m%d-%H%M%S')}.md")

if __name__ == '__main__':
    main()

# Automated compliance remediation
# compliance/auto-remediation.yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: compliance-remediation
  namespace: platform-system
spec:
  schedule: "0 2 * * *"  # Run daily at 2 AM
  jobTemplate:
    spec:
      template:
        spec:
          serviceAccountName: compliance-remediation
          containers:
          - name: remediation
            image: compliance-tool:latest
            command:
            - /bin/sh
            - -c
            - |
              # Auto-remediate common compliance violations
              
              # Add network policies to namespaces without them
              for ns in $(kubectl get ns -o name | grep -v kube-); do
                if ! kubectl get networkpolicy -n ${ns#namespace/} --no-headers 2>/dev/null | grep -q .; then
                  kubectl apply -f - <<EOF
              apiVersion: networking.k8s.io/v1
              kind: NetworkPolicy
              metadata:
                name: default-deny-all
                namespace: ${ns#namespace/}
              spec:
                podSelector: {}
                policyTypes:
                - Ingress
                - Egress
              EOF
                fi
              done
              
              # Update pods with missing security contexts
              kubectl get pods --all-namespaces -o json | \
                jq -r '.items[] | select(.spec.containers[].securityContext.runAsNonRoot != true) | "\(.metadata.namespace) \(.metadata.name)"' | \
                while read namespace pod; do
                  echo "Flagging pod $namespace/$pod for security context update"
                  kubectl annotate pod $pod -n $namespace compliance.company.com/needs-security-update=true
                done
          restartPolicy: OnFailure
```
*Notice: Security and compliance automation should be implemented progressively with proper testing and validation processes.*

</div>

### Advanced Monitoring and Observability Strategies {#advanced-monitoring}
<!-- tags: observability, metrics, logs, traces, alerting, performance -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Advanced monitoring provides comprehensive system visibility through multiple data sources. **Metrics** track quantitative measurements over time, **logs** capture discrete events and errors, **traces** follow requests through distributed systems. **Observability** combines all three pillars for deep system understanding, **synthetic monitoring** proactively tests user journeys, **anomaly detection** identifies unusual patterns, **distributed tracing** reveals performance bottlenecks across services.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Proactive issue detection**: Identify problems before users are affected
- **Performance optimization**: Data-driven performance improvements
- **Root cause analysis**: Quickly diagnose complex distributed system issues
- **Business insights**: Understand user behavior and system usage patterns

</div>

<div class="runnable-model" data-filter="advanced-monitoring">

**Runnable mental model**
```yaml
# 1. COMPREHENSIVE OBSERVABILITY STACK

# monitoring/observability-stack.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: observability
  labels:
    observability: enabled

---
# Prometheus Configuration
apiVersion: monitoring.coreos.com/v1
kind: Prometheus
metadata:
  name: prometheus
  namespace: observability
spec:
  replicas: 2
  retention: 30d
  storage:
    volumeClaimTemplate:
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 50Gi
        storageClassName: fast-ssd
  
  serviceMonitorSelector:
    matchLabels:
      team: platform
  
  ruleSelector:
    matchLabels:
      prometheus: main
  
  resources:
    requests:
      memory: "2Gi"
      cpu: "1"
    limits:
      memory: "4Gi"
      cpu: "2"

---
# Advanced Alerting Rules
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: advanced-alerting-rules
  namespace: observability
  labels:
    prometheus: main
spec:
  groups:
  - name: application.rules
    interval: 30s
    rules:
    # High Error Rate Alert
    - alert: HighErrorRate
      expr: |
        (
          rate(http_requests_total{code=~"5.."}[5m]) /
          rate(http_requests_total[5m])
        ) > 0.05
      for: 5m
      labels:
        severity: critical
        team: "{{ $labels.team }}"
      annotations:
        summary: "High error rate detected for {{ $labels.service }}"
        description: "Error rate is {{ $value | humanizePercentage }}"

    # High Latency Alert
    - alert: HighLatency
      expr: |
        histogram_quantile(0.95, 
          rate(http_request_duration_seconds_bucket[5m])
        ) > 1.0
      for: 10m
      labels:
        severity: warning
      annotations:
        summary: "High latency detected"
        description: "95th percentile latency is {{ $value }}s"

# 2. DISTRIBUTED TRACING SETUP

# tracing/jaeger-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: jaeger
  namespace: observability
spec:
  replicas: 1
  selector:
    matchLabels:
      app: jaeger
  template:
    metadata:
      labels:
        app: jaeger
    spec:
      containers:
      - name: jaeger
        image: jaegertracing/all-in-one:1.48
        ports:
        - containerPort: 16686
          name: ui
        - containerPort: 14268
          name: collector
        env:
        - name: SPAN_STORAGE_TYPE
          value: "elasticsearch"
        - name: ES_SERVER_URLS
          value: "http://elasticsearch:9200"
        resources:
          requests:
            memory: "256Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "200m"

# 3. CUSTOM METRICS COLLECTION

# monitoring/custom-metrics.py
from prometheus_client import Counter, Histogram, Gauge, start_http_server
import time
import random
from functools import wraps

# Initialize Prometheus metrics
REQUEST_COUNT = Counter(
    'http_requests_total', 
    'Total HTTP requests',
    ['method', 'endpoint', 'status_code']
)

REQUEST_LATENCY = Histogram(
    'http_request_duration_seconds',
    'HTTP request latency',
    ['method', 'endpoint']
)

BUSINESS_METRICS = Counter(
    'business_events_total',
    'Business events',
    ['event_type', 'product']
)

class MetricsCollector:
    def track_request(self, method: str, endpoint: str):
        """Decorator to track HTTP requests"""
        def decorator(func):
            @wraps(func)
            def wrapper(*args, **kwargs):
                start_time = time.time()
                status_code = 500
                
                try:
                    result = func(*args, **kwargs)
                    status_code = 200
                    return result
                except Exception:
                    status_code = 500
                    raise
                finally:
                    REQUEST_COUNT.labels(
                        method=method,
                        endpoint=endpoint,
                        status_code=status_code
                    ).inc()
                    
                    REQUEST_LATENCY.labels(
                        method=method,
                        endpoint=endpoint
                    ).observe(time.time() - start_time)
            
            return wrapper
        return decorator
    
    def track_business_event(self, event_type: str, product: str):
        """Track business-specific events"""
        BUSINESS_METRICS.labels(
            event_type=event_type,
            product=product
        ).inc()

# Example usage
metrics = MetricsCollector()

@metrics.track_request('POST', '/api/users')
def create_user(user_data):
    # Simulate user creation
    time.sleep(random.uniform(0.1, 0.5))
    
    # Track business event
    metrics.track_business_event('user_registration', 'platform')
    
    return {'status': 'created', 'user_id': 'user_123'}

if __name__ == '__main__':
    # Start metrics server
    start_http_server(8000)
    print("Metrics server started on port 8000")
```
*Notice: Advanced monitoring requires careful balance between visibility and overhead. Implement incrementally and focus on actionable metrics.*

</div>

## Best Practices

1. **Automate everything**: Build, test, deploy, monitoring
2. **Version control**: Code, configuration, infrastructure
3. **Fast feedback**: Quick build and test cycles
4. **Environment parity**: Development matches production
5. **Immutable infrastructure**: Replace rather than modify
6. **Monitoring**: Comprehensive observability and alerting
7. **Security**: Integrate security into the pipeline (DevSecOps)
8. **Documentation**: Keep runbooks and procedures updated
9. **GitOps**: Declarative infrastructure and application management
10. **Progressive delivery**: Gradual rollouts with automated validation
11. **Service mesh**: Secure and observable service communication
12. **Event-driven design**: Loose coupling with message-driven architecture

## Summary

Modern DevOps practices integrate development and operations for faster, more reliable software delivery. This comprehensive guide covers the complete DevOps lifecycle from foundational concepts to advanced enterprise practices.

**Core DevOps Foundations**: Continuous Integration and Continuous Deployment (CI/CD) pipelines automate build, test, and deployment processes. Infrastructure as Code (IaC) with Terraform and Ansible manages infrastructure declaratively. Containerization with Docker and orchestration with Kubernetes enable scalable, portable applications.

**Advanced Cloud Integration**: Multi-cloud strategies with AWS, Azure, and Google Cloud Platform provide resilience and cost optimization. Advanced container orchestration includes custom Kubernetes operators, service mesh implementation, and GitOps workflows with ArgoCD.

**Site Reliability Engineering**: SLO/SLI monitoring ensures reliability targets, comprehensive incident management handles outages systematically, chaos engineering proactively tests system resilience, and error budget management balances reliability with feature velocity.

**Platform Engineering**: Internal developer platforms abstract infrastructure complexity, golden paths provide opinionated best practices, custom Kubernetes operators manage complex applications, and self-service infrastructure enables developer autonomy.

**Security and Compliance**: DevSecOps integrates security throughout development lifecycle, policy as code enforces security rules automatically, comprehensive vulnerability scanning, secret management with Vault, and automated compliance monitoring.

**Advanced Observability**: Multi-pillar observability combines metrics, logs, and traces for comprehensive system visibility. Advanced alerting strategies with intelligent routing, custom application instrumentation, distributed tracing for complex systems, and business metrics integration.

The ecosystem encompasses professional-grade practices including automated testing pipelines, infrastructure automation, security integration, monitoring and alerting, incident response procedures, and compliance frameworks that enable organizations to deliver software reliably at scale while maintaining security and operational excellence.
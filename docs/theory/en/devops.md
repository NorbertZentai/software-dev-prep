# CI/CD & DevOps

## Brief Summary

DevOps is a cultural and technological approach to improve collaboration between development and operations teams. CI/CD (Continuous Integration/Continuous Deployment) provides automated pipelines for code integration, testing, and deployment. Modern DevOps stack: Git, Docker, Kubernetes, Jenkins, GitLab CI, GitHub Actions. Infrastructure as Code (IaC) tools: Terraform, Ansible, CloudFormation. Monitoring and observability: Prometheus, Grafana, ELK stack, Jaeger. Containerization and orchestration are fundamental. Main benefits: faster release cycles, automated quality gates, scalable infrastructure. Challenges: cultural change, tooling complexity, security integration, cost optimization.

## Concepts

### Continuous Integration (CI) Fundamentals {#continuous-integration}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Imagine CI as a dishwasher in a kitchen: every plate (commit) goes through an automatic program (CI pipeline) with washing, rinsing, and drying (build, test, validate) to ensure clean plates (working code) before going to the cabinet (main branch).*

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

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Continuous Deployment is like an automated production line: once a product (code) passes all quality checks, it automatically moves to the shipping dock (production) without human intervention.*

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

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Docker is like a shipping container: your application and all its dependencies are packaged together, so it runs the same way whether it's on your laptop, staging server, or production cluster.*

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

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Infrastructure as Code is like having architectural blueprints for a building: you can recreate the exact same structure anywhere, track changes to the design, and collaborate on modifications.*

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

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Kubernetes is like an intelligent city manager: it automatically assigns housing (pods) to neighborhoods (nodes), manages traffic (networking), ensures services are running (health checks), and scales resources based on demand.*

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

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*Monitoring is like having a comprehensive health monitoring system for your body: metrics are vital signs (heart rate, temperature), logs are symptoms (what hurts), and traces are medical scans (how systems interact).*

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

## Best Practices

1. **Automate everything**: Build, test, deploy, monitoring
2. **Version control**: Code, configuration, infrastructure
3. **Fast feedback**: Quick build and test cycles
4. **Environment parity**: Development matches production
5. **Monitoring**: Comprehensive observability
6. **Security**: Security scanning in pipeline
7. **Documentation**: Runbooks and procedures
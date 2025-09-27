# CI/CD & DevOps

## Rövid összefoglaló

A DevOps kulturális és technológiai megközelítés a fejlesztési és üzemeltetési csapatok közötti együttműködés javítására. CI/CD (Continuous Integration/Continuous Deployment) automatizált pipeline-okat biztosít a kód integrációjához, teszteléséhez és telepítéséhez. Modern DevOps stack: Git, Docker, Kubernetes, Jenkins, GitLab CI, GitHub Actions. Infrastructure as Code (IaC) tools: Terraform, Ansible, CloudFormation. Monitoring és observability: Prometheus, Grafana, ELK stack, Jaeger. Containerizáció és orchestration alapvető. Fő előnyök: gyorsabb release ciklusok, automatizált quality gates, scalable infrastructure. Kihívások: kulturális változás, tooling komplexitás, security integration, cost optimization.

## Fogalmak

### CI/CD Pipeline {#ci-cd-pipeline}
Automated workflow που integrálja, teszteli és telepíti a kód változásokat. Build → Test → Deploy → Monitor ciklus.

**Példa:**
```yaml
# .github/workflows/ci-cd.yml - GitHub Actions
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
      
    - name: Run linting
      run: npm run lint
      
    - name: Run unit tests
      run: npm run test:unit
      
    - name: Run integration tests
      run: npm run test:integration
      
    - name: Generate test coverage
      run: npm run coverage
      
    - name: Upload coverage reports
      uses: codecov/codecov-action@v3

  build:
    needs: test
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      
    - name: Build Docker image
      run: |
        docker build -t myapp:${{ github.sha }} .
        docker tag myapp:${{ github.sha }} myapp:latest
        
    - name: Security scan
      run: |
        docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
          -v $HOME/Library/Caches:/root/.cache/ \
          aquasec/trivy:latest image myapp:${{ github.sha }}
    
    - name: Push to registry
      if: github.ref == 'refs/heads/main'
      env:
        DOCKER_REGISTRY: ${{ secrets.DOCKER_REGISTRY }}
        DOCKER_USERNAME: ${{ secrets.DOCKER_USERNAME }}
        DOCKER_PASSWORD: ${{ secrets.DOCKER_PASSWORD }}
      run: |
        echo $DOCKER_PASSWORD | docker login $DOCKER_REGISTRY -u $DOCKER_USERNAME --password-stdin
        docker push myapp:${{ github.sha }}
        docker push myapp:latest

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Deploy to staging
      run: |
        kubectl set image deployment/myapp myapp=myapp:${{ github.sha }} -n staging
        kubectl rollout status deployment/myapp -n staging
        
    - name: Run smoke tests
      run: |
        curl -f https://staging.myapp.com/health || exit 1
        npm run test:e2e -- --env=staging
        
    - name: Deploy to production
      if: success()
      run: |
        kubectl set image deployment/myapp myapp=myapp:${{ github.sha }} -n production
        kubectl rollout status deployment/myapp -n production
```

Magyarázat: CI/CD pipeline automatizálja a teljes deployment folyamatot quality gate-ekkel és monitoring-gal.

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

### Docker {#docker}
Containerizációs platform, amely egységes futtatási környezetet biztosít alkalmazásoknak.

**Példa:**
```dockerfile
# Multi-stage Dockerfile - Spring Boot alkalmazáshoz
FROM maven:3.8.4-openjdk-11 AS builder

WORKDIR /app
COPY pom.xml .
COPY src ./src

# Maven dependency caching
RUN mvn dependency:go-offline -B

# Build application
RUN mvn clean package -DskipTests -B

# Production image
FROM openjdk:11-jre-slim

# Non-root user for security
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Install security updates
RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy JAR from builder stage
COPY --from=builder /app/target/*.jar app.jar
COPY --chown=appuser:appuser --from=builder /app/target/*.jar app.jar

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:8080/actuator/health || exit 1

# Switch to non-root user
USER appuser

# JVM tuning and application startup
EXPOSE 8080
ENTRYPOINT ["java", \
    "-XX:+UseContainerSupport", \
    "-XX:MaxRAMPercentage=75.0", \
    "-XX:+UseG1GC", \
    "-XX:+UnlockExperimentalVMOptions", \
    "-XX:+UseCGroupMemoryLimitForHeap", \
    "-Djava.security.egd=file:/dev/./urandom", \
    "-jar", "app.jar"]

# Node.js React alkalmazáshoz
FROM node:18-alpine AS deps

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine AS runner

# Custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built app
COPY --from=builder /app/build /usr/share/nginx/html

# Security headers
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
        add_header X-Content-Type-Options nosniff; \
        add_header X-Frame-Options DENY; \
        add_header X-XSS-Protection "1; mode=block"; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Docker Compose development environment:**
```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=development
      - DATABASE_URL=jdbc:postgresql://db:5432/myapp
      - REDIS_URL=redis://redis:6379
    volumes:
      - ./src:/app/src
      - maven-cache:/root/.m2
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    networks:
      - app-network

  db:
    image: postgres:13-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d myapp"]
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
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - app
    networks:
      - app-network

volumes:
  postgres-data:
  redis-data:
  maven-cache:

networks:
  app-network:
    driver: bridge
```

Magyarázat: Docker multi-stage build-eket és compose-ot használ efficient containerization-hez.

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

### Monitoring {#monitoring}
Rendszer teljesítmény, health és business metrics követése real-time dashboardokkal és alerting-gel.

**Példa:**
```yaml
# Prometheus + Grafana monitoring stack
# docker-compose.monitoring.yml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
      - ./prometheus/rules.yml:/etc/prometheus/rules.yml
      - prometheus-data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--web.enable-lifecycle'
      - '--web.enable-admin-api'

  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin123
    volumes:
      - grafana-data:/var/lib/grafana
      - ./grafana/datasources:/etc/grafana/provisioning/datasources
      - ./grafana/dashboards:/etc/grafana/provisioning/dashboards

  alertmanager:
    image: prom/alertmanager:latest
    container_name: alertmanager
    ports:
      - "9093:9093"
    volumes:
      - ./alertmanager/alertmanager.yml:/etc/alertmanager/alertmanager.yml

  node-exporter:
    image: prom/node-exporter:latest
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

volumes:
  prometheus-data:
  grafana-data:
```

**Prometheus configuration:**
```yaml
# prometheus/prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "rules.yml"

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

  # Node metrics
  - job_name: 'node'
    static_configs:
      - targets: ['node-exporter:9100']

  # Application metrics
  - job_name: 'myapp'
    scrape_interval: 5s
    metrics_path: '/actuator/prometheus'
    static_configs:
      - targets: ['app:8080']
    relabel_configs:
      - source_labels: [__address__]
        target_label: instance
        regex: '(.*):(.*)'
        replacement: '${1}'

  # Kubernetes pods (if running in K8s)
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
```

**Alert Rules:**
```yaml
# prometheus/rules.yml
groups:
- name: application.rules
  rules:
  - alert: HighErrorRate
    expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.1
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "High error rate detected"
      description: "Error rate is {{ $value }} for {{ $labels.instance }}"

  - alert: HighResponseTime
    expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 0.5
    for: 2m
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

- name: infrastructure.rules
  rules:
  - alert: HighCPUUsage
    expr: 100 - (avg by(instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: "High CPU usage on {{ $labels.instance }}"

  - alert: HighMemoryUsage
    expr: (node_memory_MemTotal_bytes - node_memory_MemFree_bytes - node_memory_Buffers_bytes - node_memory_Cached_bytes) / node_memory_MemTotal_bytes * 100 > 85
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: "High memory usage on {{ $labels.instance }}"

  - alert: DiskSpaceLow
    expr: (node_filesystem_avail_bytes / node_filesystem_size_bytes) * 100 < 10
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "Disk space low on {{ $labels.instance }}"
```

**Application Metrics Implementation:**
```java
// Spring Boot application with Micrometer
@RestController
@Timed(name = "user.controller", description = "User controller timing")
public class UserController {
    
    private final Counter userCreatedCounter;
    private final Timer userSearchTimer;
    private final Gauge activeUsersGauge;
    private final MeterRegistry meterRegistry;
    
    public UserController(MeterRegistry meterRegistry, UserService userService) {
        this.meterRegistry = meterRegistry;
        
        this.userCreatedCounter = Counter.builder("users.created")
            .description("Number of users created")
            .tag("service", "user-service")
            .register(meterRegistry);
            
        this.userSearchTimer = Timer.builder("users.search.time")
            .description("User search response time")
            .register(meterRegistry);
            
        this.activeUsersGauge = Gauge.builder("users.active")
            .description("Number of active users")
            .register(meterRegistry, this, UserController::getActiveUserCount);
    }
    
    @PostMapping("/users")
    @Timed(name = "user.creation", description = "User creation timing")
    public ResponseEntity<User> createUser(@RequestBody @Valid CreateUserRequest request) {
        try {
            User user = userService.createUser(request);
            userCreatedCounter.increment(Tags.of("status", "success"));
            return ResponseEntity.status(HttpStatus.CREATED).body(user);
        } catch (Exception e) {
            userCreatedCounter.increment(Tags.of("status", "error", "error.type", e.getClass().getSimpleName()));
            throw e;
        }
    }
    
    @GetMapping("/users/search")
    public ResponseEntity<List<User>> searchUsers(@RequestParam String query) {
        return Timer.Sample.start(meterRegistry)
            .stop(userSearchTimer)
            .recordCallable(() -> {
                List<User> users = userService.searchUsers(query);
                meterRegistry.counter("users.search.results", 
                    Tags.of("result.count", String.valueOf(users.size()))).increment();
                return ResponseEntity.ok(users);
            });
    }
    
    private double getActiveUserCount() {
        return userService.getActiveUserCount().doubleValue();
    }
    
    // Custom health indicator
    @Component
    public static class DatabaseHealthIndicator implements HealthIndicator {
        
        @Autowired
        private UserRepository userRepository;
        
        @Override
        public Health health() {
            try {
                long userCount = userRepository.count();
                return Health.up()
                    .withDetail("users.total", userCount)
                    .withDetail("database", "connected")
                    .build();
            } catch (Exception e) {
                return Health.down()
                    .withDetail("database", "disconnected")
                    .withException(e)
                    .build();
            }
        }
    }
}

// Custom metrics configuration
@Configuration
public class MetricsConfig {
    
    @Bean
    public TimedAspect timedAspect(MeterRegistry registry) {
        return new TimedAspect(registry);
    }
    
    @Bean
    public MeterRegistryCustomizer<MeterRegistry> configurer() {
        return (registry) -> registry.config()
            .commonTags("application", "user-service", "version", "1.2.3");
    }
}
```

Magyarázat: Comprehensive monitoring setup-pal metrikák, alerting és dashboards használatával.

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
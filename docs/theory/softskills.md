# Soft Skills - Szakmai Kompetenciák

## Bevezetés

A technikai tudás mellett a soft skillek legalább olyan fontosak egy szoftverfejlesztő karrierjében. Ezek a készségek határozzák meg, hogy mennyire vagy hatékony a csapatmunkában, kommunikációban és probléma-megoldásban.

## Kommunikációs készségek

### 1. Írásbeli kommunikáció

#### Code Review-k
```markdown
## Jó példa - konstruktív feedback

### Pozitív észrevételek:
- ✅ Jól strukturált kód, könnyen követhető logika
- ✅ Megfelelő nevezéktan használata
- ✅ Tesztek lefedik a funkcionalitást

### Fejlesztési javaslatok:
- 🔧 **Performance**: A `findAll()` metódus optimalizálható lenne pagination-nel
- 🔧 **Security**: Az user input validáció hiányzik a 45. sorból
- 🔧 **Code style**: Consider extracting the complex logic in lines 67-89 into a separate method

### Kérdések:
- ❓ Mi volt a döntési szempont az ArrayList választásánál a LinkedList helyett?
```

#### Dokumentáció írása
```markdown
# User Service API

## Overview
A User Service felel a felhasználók kezeléséért az alkalmazásban.

## Endpoints

### POST /api/users
Új felhasználó létrehozása.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response:**
- `201 Created`: Sikeres létrehozás
- `400 Bad Request`: Hibás adatok
- `409 Conflict`: Email már létezik

**Example:**
```bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

## Error Handling
Minden hiba JSON formátumban érkezik:
```json
{
  "error": "VALIDATION_ERROR",
  "message": "Email is required",
  "timestamp": "2025-01-15T10:30:00Z"
}
```
```

#### Email kommunikáció
```
Subject: [URGENT] Production Issue - User Registration Service Down

Hi Team,

**Issue Summary:**
The user registration service is currently experiencing downtime affecting new user sign-ups.

**Impact:**
- ~50% of registration attempts are failing
- Error rate spike started at 14:30 UTC
- Approximately 200 affected users in the last 30 minutes

**Current Status:**
- Issue identified: Database connection pool exhaustion
- Temporary mitigation: Increased connection pool size from 10 to 25
- Full fix in progress: Optimizing long-running queries

**Next Steps:**
- [ ] Deploy query optimization (ETA: 16:00 UTC)
- [ ] Monitor error rates for next 2 hours
- [ ] Post-mortem meeting scheduled for tomorrow 10:00

I'll keep everyone updated every 30 minutes until resolved.

Best regards,
[Your Name]
Senior Developer
```

### 2. Szóbeli kommunikáció

#### Daily Standup
```
"Tegnap befejeztem az user authentication feature backend részét. 
Ma a frontend integrációval foglalkozok és a unit teszteket írom meg. 
Van egy blocker: nem tudom elérni a testing environment-et, 
szükségem lenne DevOps támogatásra."
```

#### Technical Presentation
```markdown
# Microservices Migration Strategy

## Agenda (15 minutes)
1. Current monolith challenges (3 min)
2. Proposed microservices architecture (5 min)
3. Migration plan & timeline (4 min)
4. Questions & Discussion (3 min)

## Current Challenges
- 30-minute deployment time
- Difficulty scaling individual components
- Technology lock-in (Java 8, Spring 4)

## Proposed Solution
[Show architecture diagram]
- User Service: Authentication & user management
- Product Service: Catalog & inventory
- Order Service: Shopping cart & checkout

## Benefits
- Independent deployments (5 min vs 30 min)
- Technology diversity
- Better fault isolation

## Migration Plan
- Phase 1: Extract User Service (Sprint 1-2)
- Phase 2: Extract Product Service (Sprint 3-4)
- Phase 3: Extract Order Service (Sprint 5-6)

## Questions?
```

## Csapatmunka és Kollaboráció

### 1. Conflict Resolution

#### Technikai vita esetén:
```
"Értem a Docker melletti érveidet, és valóban jó pontokat hoztál fel 
a container orchestration kapcsán. 

Az én aggályom főleg a team jelenlegi Kubernetes tapasztalatára 
vonatkozik - csak két embernek van production experience.

Mit gondolsz arról, ha egy proof of concept-et készítünk mindkét 
megoldással, és mérjük az implementation complexity-t és a learning curve-öt?"
```

#### Munka elosztás során:
```
"Látom, hogy mindketten a frontend feladatot szeretnénk, ami érthető. 
Javaslom, hogy osszuk fel: te foglalkozol a komponens architektúrával 
és én a state management-tel. 

Így mindketten tanulunk, és a projekt is jobban halad. Mit gondolsz?"
```

### 2. Mentoring és Knowledge Sharing

#### Junior fejlesztő segítése:
```
"Jó kérdés! A dependency injection első ránézésre bonyolult lehet.

Gondoljunk rá úgy, mint egy étterem: 
- A szakács (service) nem megy el bevásárolni (dependency)
- A felszolgáló (framework) hozza a hozzávalókat
- A szakács csak a főzésre koncentrál

Itt van egy egyszerű példa:

[Kód példa bemutatása]

Szeretnéd, ha együtt végigmennénk egy valós projekten?"
```

#### Tech talk tartása:
```markdown
# "Testing Strategies That Actually Work"

## Target Audience: 
Mid-level developers struggling with test maintenance

## Key Takeaways:
1. Write tests that fail for the right reasons
2. Test behavior, not implementation
3. Use the test pyramid, but adapt it to your context

## Interactive Elements:
- Live coding session: Refactoring a brittle test
- Audience poll: "What's your biggest testing pain point?"
- Q&A with real examples from our codebase
```

## Problémamegoldó gondolkodás

### 1. Systematic Debugging

```markdown
# Debugging Checklist

## 1. Reproduce the Issue
- [ ] Can you consistently reproduce the bug?
- [ ] What are the exact steps?
- [ ] What environment (dev, staging, prod)?

## 2. Gather Information
- [ ] Check logs (application, system, network)
- [ ] Monitor metrics (CPU, memory, DB connections)
- [ ] Interview users who reported the issue

## 3. Form Hypotheses
- [ ] List 3-5 possible causes
- [ ] Rank by likelihood
- [ ] Plan verification steps for each

## 4. Test Hypotheses
- [ ] Start with most likely cause
- [ ] Use scientific method: change one variable at a time
- [ ] Document what you tried

## 5. Implement & Verify Fix
- [ ] Apply minimal necessary change
- [ ] Test in isolated environment first
- [ ] Monitor after deployment
```

### 2. Root Cause Analysis

```markdown
# 5 Whys Analysis - Production Outage

**Problem:** User registration service went down for 2 hours

**Why 1:** Why did the service go down?
→ Database connection pool was exhausted

**Why 2:** Why was the connection pool exhausted?
→ Long-running queries weren't releasing connections

**Why 3:** Why were queries running long?
→ Missing index on user_email column after recent migration

**Why 4:** Why was the index missing?
→ Migration script didn't include all necessary indexes

**Why 5:** Why didn't the migration script include the index?
→ Code review process didn't catch the missing index

**Root Cause:** Incomplete code review checklist for database migrations

**Action Items:**
1. Add database performance review to checklist
2. Implement query performance monitoring
3. Require DBA review for all schema changes
```

## Időmenedzsment és Produktivitás

### 1. Task Prioritization

#### MoSCoW Method
```markdown
# Sprint Planning - User Dashboard Feature

## Must Have (Critical for release)
- [ ] User login/logout functionality
- [ ] Basic profile viewing
- [ ] Password reset

## Should Have (Important but not critical)
- [ ] Profile picture upload
- [ ] Email preferences
- [ ] Activity history

## Could Have (Nice to have)
- [ ] Dark mode toggle
- [ ] Keyboard shortcuts
- [ ] Advanced filtering

## Won't Have (Future releases)
- [ ] Social media integration
- [ ] Advanced analytics dashboard
```

#### Eisenhower Matrix
```markdown
|                | Urgent        | Not Urgent    |
|----------------|---------------|---------------|
| **Important**  | Production bugs| Architecture planning |
|                | Security issues| Code refactoring |
| **Not Important** | Some meetings | Email notifications |
|                | Slack notifications | Nice-to-have features |
```

### 2. Time Blocking

```
Calendar blocking example:
09:00-11:00 - Deep work: Core feature development
11:00-11:15 - Break
11:15-12:00 - Code review and email
12:00-13:00 - Lunch
13:00-14:00 - Meetings
14:00-16:00 - Deep work: Bug fixes and testing
16:00-17:00 - Planning and documentation
17:00-17:30 - Team sync and tomorrow's planning
```

## Vezetési és Mentori Készségek

### 1. Technical Leadership

#### Architecture Decision Record (ADR)
```markdown
# ADR-001: Choose React over Angular for Frontend

## Status
Accepted

## Context
We need to choose a frontend framework for our new user dashboard.
Team has mixed experience with both React and Angular.

## Decision
We will use React for the following reasons:

## Consequences
**Positive:**
- Easier to hire React developers
- Better performance for our use case
- More flexible component architecture

**Negative:**
- Need to train 2 team members
- Less opinionated structure requires more decisions

## Alternatives Considered
- Angular: More structured but steeper learning curve
- Vue.js: Good option but less team familiarity
```

### 2. Project Management

#### Sprint Retrospective Facilitation
```markdown
# Sprint Retrospective Agenda

## Check-in (5 min)
How are you feeling about the last sprint? (1-10 scale)

## What Went Well (10 min)
- Deployment pipeline improvements saved 30 min per release
- New junior developer integrated quickly
- Client feedback was very positive

## What Could Be Improved (10 min)
- Too many production bugs slipped through
- Code review process took too long
- Communication with stakeholders was unclear

## Action Items (10 min)
1. **Increase test coverage** - Owner: Alice, Due: Next sprint
2. **Streamline code review** - Owner: Bob, Due: This week
3. **Weekly stakeholder updates** - Owner: Charlie, Due: Ongoing

## Closing (5 min)
Rate this retrospective (1-5) and one word feeling
```

## Önfejlesztés és Karrier

### 1. Continuous Learning

#### Personal Development Plan
```markdown
# 2025 Learning Goals

## Technical Goals
- [ ] Learn Kubernetes (Q1)
  - Complete CKA certification
  - Deploy personal project to K8s
- [ ] Master distributed systems (Q2)
  - Read "Designing Data-Intensive Applications"
  - Implement event sourcing pattern

## Soft Skills Goals
- [ ] Improve public speaking (Q1)
  - Give 2 tech talks at meetups
  - Join Toastmasters group
- [ ] Develop mentoring skills (Q2)
  - Mentor 2 junior developers
  - Complete mentoring training course

## Measurements
- Monthly reflection and adjustment
- Quarterly goal review with manager
- Track completed courses and certifications
```

### 2. Networking

#### Conference Networking
```
"Hi! I'm John from Company X. I really enjoyed your talk on microservices patterns.

I've been working on a similar challenge with service discovery in our Kubernetes environment. 

Have you experimented with service mesh solutions like Istio? 
I'd love to hear your thoughts over coffee if you have a few minutes."
```

#### LinkedIn Engagement
```
"Great article on testing strategies! I especially appreciated the point about testing behavior vs implementation.

In our team, we've seen similar issues with brittle tests. We solved it by introducing contract testing with Pact. 

Have you experimented with contract testing? Would be interested in your perspective."
```

## Interjú Készségek

### 1. Technical Interview

#### Problem-solving approach:
```
"Let me make sure I understand the problem correctly:
- We need to find the longest palindromic substring
- Input is a string of length n
- We want optimal time and space complexity

Let me think through a few approaches:
1. Brute force: Check every substring O(n³)
2. Expand around centers: O(n²) time, O(1) space
3. Dynamic programming: O(n²) time and space

I'll start with the expand around centers approach as it's efficient and intuitive.

[Implements solution while explaining thought process]

Let me trace through an example to verify:
Input: 'babad'
- Center at 'b': 'b' (length 1)
- Center at 'a': 'bab' (length 3)
..."
```

### 2. Behavioral Interview

#### STAR Method példa:
```
Situation: "In my previous role, our main application was experiencing frequent production outages, about 2-3 times per week."

Task: "As the senior developer, I was asked to investigate and implement a solution to improve system reliability."

Action: "I conducted a thorough analysis of our logs and identified that 80% of outages were caused by memory leaks. I:
- Implemented comprehensive monitoring with alerts
- Added automated testing for memory leaks in our CI pipeline
- Organized knowledge sharing sessions on memory management best practices
- Created a debugging runbook for on-call engineers"

Result: "Within two months, we reduced production outages by 90%. The system uptime improved from 95% to 99.5%, and the mean time to recovery dropped from 2 hours to 20 minutes."
```

## Remote Work Skills

### 1. Asynchronous Communication
```markdown
# Daily Update - [Date]

## Yesterday's Achievements
- ✅ Completed user authentication API endpoints
- ✅ Fixed 3 critical bugs from yesterday's review
- ✅ Updated documentation for new features

## Today's Plan
- 🎯 Integrate frontend with auth API
- 🎯 Write unit tests for authentication service
- 🎯 Code review for Sarah's payment feature

## Blockers & Help Needed
- ❓ Need clarification on password policy requirements
- 🚫 Staging environment is down - affects testing
- 📞 Need 15-min sync with product owner on user flows

## Notes
- Frontend integration might take longer than estimated due to API changes
- Available for meetings between 2-4 PM UTC
```

### 2. Virtual Meeting Best Practices
```markdown
# Meeting Preparation Checklist

## Before Meeting
- [ ] Test audio/video setup
- [ ] Prepare agenda and share 24h in advance
- [ ] Review relevant documents/code
- [ ] Set up screen sharing if needed

## During Meeting
- [ ] Mute when not speaking
- [ ] Use "raise hand" feature for questions
- [ ] Take notes in shared document
- [ ] Summarize action items before ending

## After Meeting
- [ ] Send meeting notes within 2 hours
- [ ] Update project management tools
- [ ] Follow up on action items
```

## Következő lépések

### Skill Assessment
Értékeld magad 1-10 skálán:
- [ ] Írásbeli kommunikáció
- [ ] Szóbeli kommunikáció
- [ ] Csapatmunka
- [ ] Konfliktuskezelés
- [ ] Problémamegoldás
- [ ] Időmenedzsment
- [ ] Vezetői készségek
- [ ] Mentoring
- [ ] Networking

### Development Plan
1. **Válassz 2-3 területet** fejlesztésre
2. **Állíts fel konkrét célokat** (SMART kritériumok)
3. **Keress mentort vagy coach-ot**
4. **Gyakorolj rendszeresen** (pl. Toastmasters, meetup-ok)
5. **Kérj feedbacket** kollégáktól és vezetőktől
6. **Reflektálj havonta** a fejlődésedre

### Gyakorlási lehetőségek
- Code review-k írása és fogadása
- Tech talk tartása belső meetup-on
- Mentorálj egy junior fejlesztőt
- Vegyél részt open source projektekben
- Írj technikai blog post-okat
- Vezess egy kis projektet vagy funkciót
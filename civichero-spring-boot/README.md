# CivicHero AI - Enterprise Full Stack Java Web Application

**Tagline:** *"AI Powered Hyperlocal Community Problem Solver"*

Built strictly on **Java 21**, **Spring Boot 3.2+**, **Spring Security (JWT)**, **Spring Data JPA (Hibernate)**, **Thymeleaf**, **Bootstrap 5**, **Google Gemini AI API**, **MySQL**, and **Docker**.

---

## 🏛️ System Architecture & Clean Architecture Principles

The project is structured according to **Clean Architecture** and **Domain-Driven Design (DDD)** boundaries:

```
com.civichero
├── config/             # Spring Security, WebSocket, JWT Auth Filters, OpenAPI
├── controller/         # Spring MVC Thymeleaf Controllers & REST API Endpoints
├── dto/                # Data Transfer Objects (ComplaintSubmissionDto, AuthRequestDto)
├── entity/             # JPA Entities (User, Officer, Complaint, AIAnalysis, Department)
├── exception/          # GlobalExceptionHandler (@ControllerAdvice), Custom Exceptions
├── repository/         # Spring Data JPA Repositories (ComplaintRepo, UserRepo, etc.)
├── security/           # JWT Token Provider, UserDetailsService, Role Guards
├── service/            # Business Logic, GeminiAIService, ComplaintWorkflowService
└── util/               # GeolocationCalculator, FileUploadHelper, QRGenerator
```

---

## 📊 Database Entity Relationship (ER) Diagram

```
+-------------------+       +-----------------------+       +---------------------+
|       USERS       |       |      COMPLAINTS       |       |     DEPARTMENTS     |
+-------------------+       +-----------------------+       +---------------------+
| id (PK)           |1     *| id (PK)               |*     1| id (PK)             |
| mobile_number(UQ) |-------| complaint_code (UQ)   |-------| name (UQ)           |
| name              |       | title, description    |       | code                |
| reward_points     |       | category_slug         |       | avg_resolution_hrs  |
+-------------------+       | latitude, longitude   |       +---------------------+
                            | status, priority      |                  |1
                            | citizen_id (FK)       |                  |
                            | department_id (FK)    |                  |
                            | assigned_officer (FK) |                  |*
                            +-----------------------+       +---------------------+
                                 |1          |1             |      OFFICERS       |
                                 |           |              +---------------------+
                                1|          *|              | id (PK)             |
                   +-------------+           +------------+ | badge_number (UQ)   |
                   |                                      | | email (UQ)          |
                   v                                      v | role                |
        +---------------------+                +--------------------+ | department_id (FK)  |
        |     AI_ANALYSIS     |                |  COMPLAINT_MEDIA   | +---------------------+
        +---------------------+                +--------------------+
        | id (PK)             |                | id (PK)            |
        | complaint_id (FK/UQ)|                | complaint_id (FK)  |
        | detected_issue      |                | media_url          |
        | severity_score      |                | media_type         |
        | confidence_score    |                +--------------------+
        | predicted_department|
        +---------------------+
```

---

## 🚀 Quickstart Guide (IntelliJ IDEA / Eclipse)

### Prerequisite Checklist
1. **Java Development Kit (JDK) 21** installed (`java -version`).
2. **Apache Maven 3.8+** installed (`mvn -v`).
3. **MySQL Server 8.0+** running on `localhost:3306`.

### Step 1: Database Setup
Execute the SQL script located at `sql/database_schema.sql` in your MySQL console or Workbench:
```bash
mysql -u root -p < sql/database_schema.sql
```

### Step 2: Configure Environment Secrets
Open `src/main/resources/application.properties` and verify your MySQL credentials and Google Gemini API Key:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/civichero_db?useSSL=false&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=yourpassword
gemini.api.key=YOUR_ACTUAL_GEMINI_API_KEY
```

### Step 3: Build & Run in IntelliJ IDEA
1. Open IntelliJ IDEA -> **File -> Open** -> Select the `civichero-spring-boot` folder.
2. IntelliJ will automatically detect `pom.xml` and download Maven dependencies.
3. Locate `src/main/java/com/civichero/CivicHeroApplication.java`.
4. Right click -> **Run 'CivicHeroApplication'**.
5. Access the portals:
   - **Citizen Web Portal:** `http://localhost:8080/`
   - **Officer Dashboard:** `http://localhost:8080/officer`
   - **Admin Command Center:** `http://localhost:8080/admin`
   - **Swagger REST Docs:** `http://localhost:8080/swagger-ui.html`

---

## 🐳 Docker & Docker Compose Deployment

To boot the entire enterprise stack (Spring Boot 3 + MySQL 8 Container) non-interactively:

```bash
cd docker
docker-compose up --build -d
```
App will be live at `http://localhost:8080/`.

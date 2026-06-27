-- ============================================================================
-- CIVICHERO AI ENTERPRISE NORMALIZED DATABASE SCHEMA (MySQL 8+)
-- ============================================================================
-- ER DIAGRAM ENTITY RELATIONSHIPS:
-- [users] 1 -- * [complaints] (Citizen submits complaints)
-- [departments] 1 -- * [officers] (Department employs officers)
-- [departments] 1 -- * [complaints] (Department handles complaint category)
-- [officers] 1 -- * [complaints] (Officer is assigned to resolve complaints)
-- [complaints] 1 -- 1 [ai_analysis] (Complaint has automated Gemini AI analysis)
-- [complaints] 1 -- * [complaint_images] (Multiple before & work images)
-- [complaints] 1 -- * [timeline_events] (Audit trail of status transitions)
-- [complaints] 1 -- * [comments] (Citizen & Officer dialogue)
-- [users] 1 -- * [rewards] (Citizen earns civic points)

CREATE DATABASE IF NOT EXISTS civichero_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE civichero_db;

-- 1. ROLES & PERMISSIONS
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- 2. DEPARTMENTS
CREATE TABLE IF NOT EXISTS departments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(20) NOT NULL UNIQUE,
    head_officer_name VARCHAR(100),
    contact_email VARCHAR(100),
    contact_phone VARCHAR(20),
    avg_resolution_hours INT DEFAULT 24
) ENGINE=InnoDB;

-- 3. USERS (CITIZENS)
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    public_id VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    mobile_number VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(100),
    preferred_language VARCHAR(20) DEFAULT 'en',
    reward_points INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_mobile (mobile_number)
) ENGINE=InnoDB;

-- 4. OFFICERS & SUPERVISORS
CREATE TABLE IF NOT EXISTS officers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    badge_number VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(30) NOT NULL DEFAULT 'ROLE_OFFICER',
    department_id BIGINT,
    assigned_zone VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    INDEX idx_officer_email (email)
) ENGINE=InnoDB;

-- 5. COMPLAINT CATEGORIES
CREATE TABLE IF NOT EXISTS categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(80) NOT NULL UNIQUE,
    name VARCHAR(120) NOT NULL,
    category_group VARCHAR(50) NOT NULL,
    icon_class VARCHAR(50),
    color_theme VARCHAR(50),
    department_id BIGINT,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 6. COMPLAINTS
CREATE TABLE IF NOT EXISTS complaints (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    complaint_code VARCHAR(40) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    category_slug VARCHAR(80) NOT NULL,
    citizen_id BIGINT,
    is_anonymous BOOLEAN DEFAULT FALSE,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    address_text TEXT NOT NULL,
    priority VARCHAR(20) DEFAULT 'MEDIUM',
    status VARCHAR(30) DEFAULT 'SUBMITTED',
    department_id BIGINT,
    assigned_officer_id BIGINT,
    assigned_team VARCHAR(100),
    expected_resolution_hours INT DEFAULT 24,
    rejection_reason TEXT,
    closure_otp VARCHAR(10),
    citizen_rating INT,
    feedback_text TEXT,
    community_votes INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (citizen_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    FOREIGN KEY (assigned_officer_id) REFERENCES officers(id) ON DELETE SET NULL,
    INDEX idx_status_cat (status, category_slug),
    INDEX idx_location (latitude, longitude)
) ENGINE=InnoDB;

-- 7. AI ANALYSIS RESULTS (1-to-1 with Complaints)
CREATE TABLE IF NOT EXISTS ai_analysis (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    complaint_id BIGINT NOT NULL UNIQUE,
    detected_issue VARCHAR(200),
    detected_category VARCHAR(100),
    severity_score INT, -- 1-100
    confidence_score INT, -- 1-100
    ai_summary TEXT,
    predicted_department VARCHAR(100),
    is_duplicate BOOLEAN DEFAULT FALSE,
    duplicate_of_id BIGINT,
    is_fake_image BOOLEAN DEFAULT FALSE,
    is_spam BOOLEAN DEFAULT FALSE,
    raw_gemini_response JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (complaint_id) REFERENCES complaints(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 8. COMPLAINT IMAGES & VIDEOS
CREATE TABLE IF NOT EXISTS complaint_media (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    complaint_id BIGINT NOT NULL,
    media_url VARCHAR(500) NOT NULL,
    media_type VARCHAR(20) DEFAULT 'BEFORE', -- 'BEFORE', 'AFTER', 'VIDEO'
    file_size_bytes BIGINT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (complaint_id) REFERENCES complaints(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 9. TIMELINE AUDIT EVENTS
CREATE TABLE IF NOT EXISTS timeline_events (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    complaint_id BIGINT NOT NULL,
    status VARCHAR(30) NOT NULL,
    note TEXT,
    actor_name VARCHAR(100) NOT NULL,
    event_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (complaint_id) REFERENCES complaints(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 10. COMMENTS
CREATE TABLE IF NOT EXISTS comments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    complaint_id BIGINT NOT NULL,
    author_name VARCHAR(100) NOT NULL,
    comment_text TEXT NOT NULL,
    is_officer BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (complaint_id) REFERENCES complaints(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 11. OTP VERIFICATION LOG
CREATE TABLE IF NOT EXISTS otp_records (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    mobile_number VARCHAR(15) NOT NULL,
    otp_code VARCHAR(10) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_otp_lookup (mobile_number, otp_code)
) ENGINE=InnoDB;

-- SEED INITIAL DEPARTMENTS
INSERT IGNORE INTO departments (id, name, code) VALUES
(1, 'Solid Waste Management', 'SWM'),
(2, 'Water Supply & Sewerage Board', 'WSSB'),
(3, 'Public Works Department (Roads)', 'PWD-R'),
(4, 'Underground Drainage & Sewerage', 'UDS'),
(5, 'Street Lighting & Electrical Dept', 'SLED'),
(6, 'Horticulture & Parks Dept', 'HPD'),
(7, 'Public Health & Sanitation', 'PHS'),
(8, 'Town Planning & Illegal Construction', 'TPIC'),
(9, 'Environmental & Pollution Control', 'EPCB');

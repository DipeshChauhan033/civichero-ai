package com.civichero.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "departments")
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false, unique = true, length = 20)
    private String code;

    @Column(name = "head_officer_name")
    private String headOfficerName;

    @Column(name = "contact_email")
    private String contactEmail;

    @Column(name = "contact_phone")
    private String contactPhone;

    @Column(name = "avg_resolution_hours")
    private Integer avgResolutionHours = 24;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getHeadOfficerName() { return headOfficerName; }
    public void setHeadOfficerName(String headOfficerName) { this.headOfficerName = headOfficerName; }
    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }
    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }
    public Integer getAvgResolutionHours() { return avgResolutionHours; }
    public void setAvgResolutionHours(Integer avgResolutionHours) { this.avgResolutionHours = avgResolutionHours; }
}

package com.civichero.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "complaints")
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "complaint_code", nullable = false, unique = true)
    private String complaintCode;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "category_slug", nullable = false)
    private String categorySlug;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "citizen_id")
    private User citizen;

    @Column(name = "is_anonymous")
    private Boolean isAnonymous = false;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    @Column(name = "address_text", columnDefinition = "TEXT", nullable = false)
    private String addressText;

    private String priority = "MEDIUM";

    private String status = "SUBMITTED";

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "department_id")
    private Department department;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "assigned_officer_id")
    private Officer assignedOfficer;

    @Column(name = "assigned_team")
    private String assignedTeam;

    @Column(name = "expected_resolution_hours")
    private Integer expectedResolutionHours = 24;

    @Column(name = "rejection_reason", columnDefinition = "TEXT")
    private String rejectionReason;

    @Column(name = "closure_otp", length = 10)
    private String closureOtp;

    @Column(name = "citizen_rating")
    private Integer citizenRating;

    @Column(name = "feedback_text", columnDefinition = "TEXT")
    private String feedbackText;

    @Column(name = "community_votes")
    private Integer communityVotes = 1;

    @OneToOne(mappedBy = "complaint", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private AIAnalysis aiAnalysis;

    @OneToMany(mappedBy = "complaint", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<ComplaintMedia> mediaList = new ArrayList<>();

    @OneToMany(mappedBy = "complaint", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<TimelineEvent> timeline = new ArrayList<>();

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (complaintCode == null) {
            complaintCode = "CMP-" + LocalDateTime.now().getYear() + "-" + (int)(1000 + Math.random()*9000);
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getComplaintCode() { return complaintCode; }
    public void setComplaintCode(String code) { this.complaintCode = code; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String desc) { this.description = desc; }
    public String getCategorySlug() { return categorySlug; }
    public void setCategorySlug(String slug) { this.categorySlug = slug; }
    public User getCitizen() { return citizen; }
    public void setCitizen(User citizen) { this.citizen = citizen; }
    public Boolean getIsAnonymous() { return isAnonymous; }
    public void setIsAnonymous(Boolean anon) { isAnonymous = anon; }
    public Double getLatitude() { return latitude; }
    public void setLatitude(Double lat) { this.latitude = lat; }
    public Double getLongitude() { return longitude; }
    public void setLongitude(Double lng) { this.longitude = lng; }
    public String getAddressText() { return addressText; }
    public void setAddressText(String addr) { this.addressText = addr; }
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Department getDepartment() { return department; }
    public void setDepartment(Department dept) { this.department = dept; }
    public Officer getAssignedOfficer() { return assignedOfficer; }
    public void setAssignedOfficer(Officer officer) { this.assignedOfficer = officer; }
    public String getAssignedTeam() { return assignedTeam; }
    public void setAssignedTeam(String team) { this.assignedTeam = team; }
    public Integer getExpectedResolutionHours() { return expectedResolutionHours; }
    public void setExpectedResolutionHours(Integer hrs) { this.expectedResolutionHours = hrs; }
    public String getRejectionReason() { return rejectionReason; }
    public void setRejectionReason(String reason) { this.rejectionReason = reason; }
    public String getClosureOtp() { return closureOtp; }
    public void setClosureOtp(String otp) { this.closureOtp = otp; }
    public Integer getCitizenRating() { return citizenRating; }
    public void setCitizenRating(Integer rating) { this.citizenRating = rating; }
    public String getFeedbackText() { return feedbackText; }
    public void setFeedbackText(String text) { this.feedbackText = text; }
    public Integer getCommunityVotes() { return communityVotes; }
    public void setCommunityVotes(Integer votes) { this.communityVotes = votes; }
    public AIAnalysis getAiAnalysis() { return aiAnalysis; }
    public void setAiAnalysis(AIAnalysis ai) { this.aiAnalysis = ai; }
    public List<ComplaintMedia> getMediaList() { return mediaList; }
    public void setMediaList(List<ComplaintMedia> list) { this.mediaList = list; }
    public List<TimelineEvent> getTimeline() { return timeline; }
    public void setTimeline(List<TimelineEvent> timeline) { this.timeline = timeline; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime time) { this.createdAt = time; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime time) { this.updatedAt = time; }
}

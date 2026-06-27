package com.civichero.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ai_analysis")
public class AIAnalysis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "complaint_id", nullable = false)
    @JsonIgnore
    private Complaint complaint;

    @Column(name = "detected_issue")
    private String detectedIssue;

    @Column(name = "detected_category")
    private String detectedCategory;

    @Column(name = "severity_score")
    private Integer severityScore; // 1-100

    @Column(name = "confidence_score")
    private Integer confidenceScore; // 1-100

    @Column(name = "ai_summary", columnDefinition = "TEXT")
    private String aiSummary;

    @Column(name = "predicted_department")
    private String predictedDepartment;

    @Column(name = "is_duplicate")
    private Boolean isDuplicate = false;

    @Column(name = "duplicate_of_id")
    private Long duplicateOfId;

    @Column(name = "is_fake_image")
    private Boolean isFakeImage = false;

    @Column(name = "is_spam")
    private Boolean isSpam = false;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Complaint getComplaint() { return complaint; }
    public void setComplaint(Complaint complaint) { this.complaint = complaint; }
    public String getDetectedIssue() { return detectedIssue; }
    public void setDetectedIssue(String issue) { this.detectedIssue = issue; }
    public String getDetectedCategory() { return detectedCategory; }
    public void setDetectedCategory(String cat) { this.detectedCategory = cat; }
    public Integer getSeverityScore() { return severityScore; }
    public void setSeverityScore(Integer score) { this.severityScore = score; }
    public Integer getConfidenceScore() { return confidenceScore; }
    public void setConfidenceScore(Integer score) { this.confidenceScore = score; }
    public String getAiSummary() { return aiSummary; }
    public void setAiSummary(String summary) { this.aiSummary = summary; }
    public String getPredictedDepartment() { return predictedDepartment; }
    public void setPredictedDepartment(String dept) { this.predictedDepartment = dept; }
    public Boolean getIsDuplicate() { return isDuplicate; }
    public void setIsDuplicate(Boolean dup) { isDuplicate = dup; }
    public Long getDuplicateOfId() { return duplicateOfId; }
    public void setDuplicateOfId(Long id) { this.duplicateOfId = id; }
    public Boolean getIsFakeImage() { return isFakeImage; }
    public void setIsFakeImage(Boolean fake) { isFakeImage = fake; }
    public Boolean getIsSpam() { return isSpam; }
    public void setIsSpam(Boolean spam) { isSpam = spam; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime time) { this.createdAt = time; }
}

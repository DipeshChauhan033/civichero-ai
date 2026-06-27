package com.civichero.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "timeline_events")
public class TimelineEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "complaint_id", nullable = false)
    @JsonIgnore
    private Complaint complaint;

    @Column(nullable = false, length = 30)
    private String status;

    @Column(columnDefinition = "TEXT")
    private String note;

    @Column(name = "actor_name", nullable = false)
    private String actorName;

    @Column(name = "event_timestamp", updatable = false)
    private LocalDateTime eventTimestamp = LocalDateTime.now();

    public TimelineEvent() {}
    public TimelineEvent(Complaint cmp, String status, String note, String actor) {
        this.complaint = cmp;
        this.status = status;
        this.note = note;
        this.actorName = actor;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Complaint getComplaint() { return complaint; }
    public void setComplaint(Complaint cmp) { this.complaint = cmp; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }
    public String getActorName() { return actorName; }
    public void setActorName(String actor) { this.actorName = actor; }
    public LocalDateTime getEventTimestamp() { return eventTimestamp; }
    public void setEventTimestamp(LocalDateTime time) { this.eventTimestamp = time; }
}

package com.kithvin.alumni.domain;

import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A VolunteerOP.
 */
@Entity
@Table(name = "volunteer_op")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class VolunteerOP implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "volunteer_name")
    private String volunteerName;

    @Column(name = "date_and_time")
    private String dateAndTime;

    @Column(name = "location")
    private String location;

    @Column(name = "time_duration")
    private String timeDuration;

    @Column(name = "description")
    private String description;

    @Column(name = "member")
    private String member;

    @Column(name = "volunteer_op_coordinator")
    private String volunteerOpCoordinator;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public VolunteerOP id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVolunteerName() {
        return this.volunteerName;
    }

    public VolunteerOP volunteerName(String volunteerName) {
        this.setVolunteerName(volunteerName);
        return this;
    }

    public void setVolunteerName(String volunteerName) {
        this.volunteerName = volunteerName;
    }

    public String getDateAndTime() {
        return this.dateAndTime;
    }

    public VolunteerOP dateAndTime(String dateAndTime) {
        this.setDateAndTime(dateAndTime);
        return this;
    }

    public void setDateAndTime(String dateAndTime) {
        this.dateAndTime = dateAndTime;
    }

    public String getLocation() {
        return this.location;
    }

    public VolunteerOP location(String location) {
        this.setLocation(location);
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getTimeDuration() {
        return this.timeDuration;
    }

    public VolunteerOP timeDuration(String timeDuration) {
        this.setTimeDuration(timeDuration);
        return this;
    }

    public void setTimeDuration(String timeDuration) {
        this.timeDuration = timeDuration;
    }

    public String getDescription() {
        return this.description;
    }

    public VolunteerOP description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMember() {
        return this.member;
    }

    public VolunteerOP member(String member) {
        this.setMember(member);
        return this;
    }

    public void setMember(String member) {
        this.member = member;
    }

    public String getVolunteerOpCoordinator() {
        return this.volunteerOpCoordinator;
    }

    public VolunteerOP volunteerOpCoordinator(String volunteerOpCoordinator) {
        this.setVolunteerOpCoordinator(volunteerOpCoordinator);
        return this;
    }

    public void setVolunteerOpCoordinator(String volunteerOpCoordinator) {
        this.volunteerOpCoordinator = volunteerOpCoordinator;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof VolunteerOP)) {
            return false;
        }
        return getId() != null && getId().equals(((VolunteerOP) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "VolunteerOP{" +
            "id=" + getId() +
            ", volunteerName='" + getVolunteerName() + "'" +
            ", dateAndTime='" + getDateAndTime() + "'" +
            ", location='" + getLocation() + "'" +
            ", timeDuration='" + getTimeDuration() + "'" +
            ", description='" + getDescription() + "'" +
            ", member='" + getMember() + "'" +
            ", volunteerOpCoordinator='" + getVolunteerOpCoordinator() + "'" +
            "}";
    }
}

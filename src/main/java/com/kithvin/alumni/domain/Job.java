package com.kithvin.alumni.domain;

import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Job.
 */
@Entity
@Table(name = "job")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Job implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "job_name")
    private String jobName;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "location")
    private String location;

    @Column(name = "salary_details")
    private String salaryDetails;

    @Column(name = "job_description")
    private String jobDescription;

    @Column(name = "expire_date")
    private String expireDate;

    @Column(name = "job_apply_method")
    private String jobApplyMethod;

    @Column(name = "file_upload")
    private String fileUpload;

    @Column(name = "email")
    private String email;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Job id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJobName() {
        return this.jobName;
    }

    public Job jobName(String jobName) {
        this.setJobName(jobName);
        return this;
    }

    public void setJobName(String jobName) {
        this.jobName = jobName;
    }

    public String getCompanyName() {
        return this.companyName;
    }

    public Job companyName(String companyName) {
        this.setCompanyName(companyName);
        return this;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getLocation() {
        return this.location;
    }

    public Job location(String location) {
        this.setLocation(location);
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getSalaryDetails() {
        return this.salaryDetails;
    }

    public Job salaryDetails(String salaryDetails) {
        this.setSalaryDetails(salaryDetails);
        return this;
    }

    public void setSalaryDetails(String salaryDetails) {
        this.salaryDetails = salaryDetails;
    }

    public String getJobDescription() {
        return this.jobDescription;
    }

    public Job jobDescription(String jobDescription) {
        this.setJobDescription(jobDescription);
        return this;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }

    public String getExpireDate() {
        return this.expireDate;
    }

    public Job expireDate(String expireDate) {
        this.setExpireDate(expireDate);
        return this;
    }

    public void setExpireDate(String expireDate) {
        this.expireDate = expireDate;
    }

    public String getJobApplyMethod() {
        return this.jobApplyMethod;
    }

    public Job jobApplyMethod(String jobApplyMethod) {
        this.setJobApplyMethod(jobApplyMethod);
        return this;
    }

    public void setJobApplyMethod(String jobApplyMethod) {
        this.jobApplyMethod = jobApplyMethod;
    }

    public String getFileUpload() {
        return this.fileUpload;
    }

    public Job fileUpload(String fileUpload) {
        this.setFileUpload(fileUpload);
        return this;
    }

    public void setFileUpload(String fileUpload) {
        this.fileUpload = fileUpload;
    }

    public String getEmail() {
        return this.email;
    }

    public Job email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Job)) {
            return false;
        }
        return getId() != null && getId().equals(((Job) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Job{" +
            "id=" + getId() +
            ", jobName='" + getJobName() + "'" +
            ", companyName='" + getCompanyName() + "'" +
            ", location='" + getLocation() + "'" +
            ", salaryDetails='" + getSalaryDetails() + "'" +
            ", jobDescription='" + getJobDescription() + "'" +
            ", expireDate='" + getExpireDate() + "'" +
            ", jobApplyMethod='" + getJobApplyMethod() + "'" +
            ", fileUpload='" + getFileUpload() + "'" +
            ", email='" + getEmail() + "'" +
            "}";
    }
}

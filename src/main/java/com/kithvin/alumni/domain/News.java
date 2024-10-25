package com.kithvin.alumni.domain;

import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A News.
 */
@Entity
@Table(name = "news")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class News implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "author_name")
    private String authorName;

    @Column(name = "title")
    private String title;

    @Column(name = "publish_date")
    private String publishDate;

    @Column(name = "cover_area")
    private String coverArea;

    @Column(name = "jhi_group")
    private String group;

    @Column(name = "expire_date")
    private String expireDate;

    @Column(name = "file_upload")
    private String fileUpload;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public News id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAuthorName() {
        return this.authorName;
    }

    public News authorName(String authorName) {
        this.setAuthorName(authorName);
        return this;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public String getTitle() {
        return this.title;
    }

    public News title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPublishDate() {
        return this.publishDate;
    }

    public News publishDate(String publishDate) {
        this.setPublishDate(publishDate);
        return this;
    }

    public void setPublishDate(String publishDate) {
        this.publishDate = publishDate;
    }

    public String getCoverArea() {
        return this.coverArea;
    }

    public News coverArea(String coverArea) {
        this.setCoverArea(coverArea);
        return this;
    }

    public void setCoverArea(String coverArea) {
        this.coverArea = coverArea;
    }

    public String getGroup() {
        return this.group;
    }

    public News group(String group) {
        this.setGroup(group);
        return this;
    }

    public void setGroup(String group) {
        this.group = group;
    }

    public String getExpireDate() {
        return this.expireDate;
    }

    public News expireDate(String expireDate) {
        this.setExpireDate(expireDate);
        return this;
    }

    public void setExpireDate(String expireDate) {
        this.expireDate = expireDate;
    }

    public String getFileUpload() {
        return this.fileUpload;
    }

    public News fileUpload(String fileUpload) {
        this.setFileUpload(fileUpload);
        return this;
    }

    public void setFileUpload(String fileUpload) {
        this.fileUpload = fileUpload;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof News)) {
            return false;
        }
        return getId() != null && getId().equals(((News) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "News{" +
            "id=" + getId() +
            ", authorName='" + getAuthorName() + "'" +
            ", title='" + getTitle() + "'" +
            ", publishDate='" + getPublishDate() + "'" +
            ", coverArea='" + getCoverArea() + "'" +
            ", group='" + getGroup() + "'" +
            ", expireDate='" + getExpireDate() + "'" +
            ", fileUpload='" + getFileUpload() + "'" +
            "}";
    }
}

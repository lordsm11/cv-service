package com.devakt.cv.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Experience.
 */
@Entity
@Table(name = "experience")
public class Experience implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "location")
    private String location;

    @Column(name = "from_date")
    private String fromDate;

    @Column(name = "to_date")
    private String toDate;

    @Column(name = "client")
    private String client;

    @Column(name = "env_technique")
    private String envTechnique;

    @Column(name = "detail")
    private String detail;

    @OneToMany(mappedBy = "experience")
    private Set<Task> tasks = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("experiences")
    private Person person;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Experience title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLocation() {
        return location;
    }

    public Experience location(String location) {
        this.location = location;
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getFromDate() {
        return fromDate;
    }

    public Experience fromDate(String fromDate) {
        this.fromDate = fromDate;
        return this;
    }

    public void setFromDate(String fromDate) {
        this.fromDate = fromDate;
    }

    public String getToDate() {
        return toDate;
    }

    public Experience toDate(String toDate) {
        this.toDate = toDate;
        return this;
    }

    public void setToDate(String toDate) {
        this.toDate = toDate;
    }

    public String getClient() {
        return client;
    }

    public Experience client(String client) {
        this.client = client;
        return this;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public String getEnvTechnique() {
        return envTechnique;
    }

    public Experience envTechnique(String envTechnique) {
        this.envTechnique = envTechnique;
        return this;
    }

    public void setEnvTechnique(String envTechnique) {
        this.envTechnique = envTechnique;
    }

    public String getDetail() {
        return detail;
    }

    public Experience detail(String detail) {
        this.detail = detail;
        return this;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public Set<Task> getTasks() {
        return tasks;
    }

    public Experience tasks(Set<Task> tasks) {
        this.tasks = tasks;
        return this;
    }

    public Experience addTask(Task task) {
        this.tasks.add(task);
        task.setExperience(this);
        return this;
    }

    public Experience removeTask(Task task) {
        this.tasks.remove(task);
        task.setExperience(null);
        return this;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
    }

    public Person getPerson() {
        return person;
    }

    public Experience person(Person person) {
        this.person = person;
        return this;
    }

    public void setPerson(Person person) {
        this.person = person;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Experience experience = (Experience) o;
        if (experience.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), experience.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Experience{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", location='" + getLocation() + "'" +
            ", fromDate='" + getFromDate() + "'" +
            ", toDate='" + getToDate() + "'" +
            ", client='" + getClient() + "'" +
            ", envTechnique='" + getEnvTechnique() + "'" +
            ", detail='" + getDetail() + "'" +
            "}";
    }
}

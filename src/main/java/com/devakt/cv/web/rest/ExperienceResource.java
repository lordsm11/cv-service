package com.devakt.cv.web.rest;
import com.devakt.cv.domain.Experience;
import com.devakt.cv.repository.ExperienceRepository;
import com.devakt.cv.web.rest.errors.BadRequestAlertException;
import com.devakt.cv.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Experience.
 */
@RestController
@RequestMapping("/api")
public class ExperienceResource {

    private final Logger log = LoggerFactory.getLogger(ExperienceResource.class);

    private static final String ENTITY_NAME = "experience";

    private final ExperienceRepository experienceRepository;

    public ExperienceResource(ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    /**
     * POST  /experiences : Create a new experience.
     *
     * @param experience the experience to create
     * @return the ResponseEntity with status 201 (Created) and with body the new experience, or with status 400 (Bad Request) if the experience has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/experiences")
    public ResponseEntity<Experience> createExperience(@RequestBody Experience experience) throws URISyntaxException {
        log.debug("REST request to save Experience : {}", experience);
        if (experience.getId() != null) {
            throw new BadRequestAlertException("A new experience cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Experience result = experienceRepository.save(experience);
        return ResponseEntity.created(new URI("/api/experiences/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /experiences : Updates an existing experience.
     *
     * @param experience the experience to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated experience,
     * or with status 400 (Bad Request) if the experience is not valid,
     * or with status 500 (Internal Server Error) if the experience couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/experiences")
    public ResponseEntity<Experience> updateExperience(@RequestBody Experience experience) throws URISyntaxException {
        log.debug("REST request to update Experience : {}", experience);
        if (experience.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Experience result = experienceRepository.save(experience);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, experience.getId().toString()))
            .body(result);
    }

    /**
     * GET  /experiences : get all the experiences.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of experiences in body
     */
    @GetMapping("/experiences")
    public List<Experience> getAllExperiences() {
        log.debug("REST request to get all Experiences");
        return experienceRepository.findAll();
    }

    /**
     * GET  /experiences/:id : get the "id" experience.
     *
     * @param id the id of the experience to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the experience, or with status 404 (Not Found)
     */
    @GetMapping("/experiences/{id}")
    public ResponseEntity<Experience> getExperience(@PathVariable Long id) {
        log.debug("REST request to get Experience : {}", id);
        Optional<Experience> experience = experienceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(experience);
    }

    /**
     * DELETE  /experiences/:id : delete the "id" experience.
     *
     * @param id the id of the experience to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/experiences/{id}")
    public ResponseEntity<Void> deleteExperience(@PathVariable Long id) {
        log.debug("REST request to delete Experience : {}", id);
        experienceRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

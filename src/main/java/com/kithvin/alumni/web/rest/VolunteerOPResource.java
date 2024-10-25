package com.kithvin.alumni.web.rest;

import com.kithvin.alumni.domain.VolunteerOP;
import com.kithvin.alumni.repository.VolunteerOPRepository;
import com.kithvin.alumni.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.kithvin.alumni.domain.VolunteerOP}.
 */
@RestController
@RequestMapping("/api/volunteer-ops")
@Transactional
public class VolunteerOPResource {

    private final Logger log = LoggerFactory.getLogger(VolunteerOPResource.class);

    private static final String ENTITY_NAME = "volunteerOP";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VolunteerOPRepository volunteerOPRepository;

    public VolunteerOPResource(VolunteerOPRepository volunteerOPRepository) {
        this.volunteerOPRepository = volunteerOPRepository;
    }

    /**
     * {@code POST  /volunteer-ops} : Create a new volunteerOP.
     *
     * @param volunteerOP the volunteerOP to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new volunteerOP, or with status {@code 400 (Bad Request)} if the volunteerOP has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<VolunteerOP> createVolunteerOP(@RequestBody VolunteerOP volunteerOP) throws URISyntaxException {
        log.debug("REST request to save VolunteerOP : {}", volunteerOP);
        if (volunteerOP.getId() != null) {
            throw new BadRequestAlertException("A new volunteerOP cannot already have an ID", ENTITY_NAME, "idexists");
        }
        volunteerOP = volunteerOPRepository.save(volunteerOP);
        return ResponseEntity.created(new URI("/api/volunteer-ops/" + volunteerOP.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, volunteerOP.getId().toString()))
            .body(volunteerOP);
    }

    /**
     * {@code PUT  /volunteer-ops/:id} : Updates an existing volunteerOP.
     *
     * @param id the id of the volunteerOP to save.
     * @param volunteerOP the volunteerOP to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated volunteerOP,
     * or with status {@code 400 (Bad Request)} if the volunteerOP is not valid,
     * or with status {@code 500 (Internal Server Error)} if the volunteerOP couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<VolunteerOP> updateVolunteerOP(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody VolunteerOP volunteerOP
    ) throws URISyntaxException {
        log.debug("REST request to update VolunteerOP : {}, {}", id, volunteerOP);
        if (volunteerOP.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, volunteerOP.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!volunteerOPRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        volunteerOP = volunteerOPRepository.save(volunteerOP);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, volunteerOP.getId().toString()))
            .body(volunteerOP);
    }

    /**
     * {@code PATCH  /volunteer-ops/:id} : Partial updates given fields of an existing volunteerOP, field will ignore if it is null
     *
     * @param id the id of the volunteerOP to save.
     * @param volunteerOP the volunteerOP to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated volunteerOP,
     * or with status {@code 400 (Bad Request)} if the volunteerOP is not valid,
     * or with status {@code 404 (Not Found)} if the volunteerOP is not found,
     * or with status {@code 500 (Internal Server Error)} if the volunteerOP couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<VolunteerOP> partialUpdateVolunteerOP(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody VolunteerOP volunteerOP
    ) throws URISyntaxException {
        log.debug("REST request to partial update VolunteerOP partially : {}, {}", id, volunteerOP);
        if (volunteerOP.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, volunteerOP.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!volunteerOPRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<VolunteerOP> result = volunteerOPRepository
            .findById(volunteerOP.getId())
            .map(existingVolunteerOP -> {
                if (volunteerOP.getVolunteerName() != null) {
                    existingVolunteerOP.setVolunteerName(volunteerOP.getVolunteerName());
                }
                if (volunteerOP.getDateAndTime() != null) {
                    existingVolunteerOP.setDateAndTime(volunteerOP.getDateAndTime());
                }
                if (volunteerOP.getLocation() != null) {
                    existingVolunteerOP.setLocation(volunteerOP.getLocation());
                }
                if (volunteerOP.getTimeDuration() != null) {
                    existingVolunteerOP.setTimeDuration(volunteerOP.getTimeDuration());
                }
                if (volunteerOP.getDescription() != null) {
                    existingVolunteerOP.setDescription(volunteerOP.getDescription());
                }
                if (volunteerOP.getMember() != null) {
                    existingVolunteerOP.setMember(volunteerOP.getMember());
                }
                if (volunteerOP.getVolunteerOpCoordinator() != null) {
                    existingVolunteerOP.setVolunteerOpCoordinator(volunteerOP.getVolunteerOpCoordinator());
                }

                return existingVolunteerOP;
            })
            .map(volunteerOPRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, volunteerOP.getId().toString())
        );
    }

    /**
     * {@code GET  /volunteer-ops} : get all the volunteerOPS.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of volunteerOPS in body.
     */
    @GetMapping("")
    public ResponseEntity<List<VolunteerOP>> getAllVolunteerOPS(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of VolunteerOPS");
        Page<VolunteerOP> page = volunteerOPRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /volunteer-ops/:id} : get the "id" volunteerOP.
     *
     * @param id the id of the volunteerOP to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the volunteerOP, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<VolunteerOP> getVolunteerOP(@PathVariable("id") Long id) {
        log.debug("REST request to get VolunteerOP : {}", id);
        Optional<VolunteerOP> volunteerOP = volunteerOPRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(volunteerOP);
    }

    /**
     * {@code DELETE  /volunteer-ops/:id} : delete the "id" volunteerOP.
     *
     * @param id the id of the volunteerOP to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVolunteerOP(@PathVariable("id") Long id) {
        log.debug("REST request to delete VolunteerOP : {}", id);
        volunteerOPRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}

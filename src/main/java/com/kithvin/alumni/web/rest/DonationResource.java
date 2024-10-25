package com.kithvin.alumni.web.rest;

import com.kithvin.alumni.domain.Donation;
import com.kithvin.alumni.repository.DonationRepository;
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
 * REST controller for managing {@link com.kithvin.alumni.domain.Donation}.
 */
@RestController
@RequestMapping("/api/donations")
@Transactional
public class DonationResource {

    private final Logger log = LoggerFactory.getLogger(DonationResource.class);

    private static final String ENTITY_NAME = "donation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DonationRepository donationRepository;

    public DonationResource(DonationRepository donationRepository) {
        this.donationRepository = donationRepository;
    }

    /**
     * {@code POST  /donations} : Create a new donation.
     *
     * @param donation the donation to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new donation, or with status {@code 400 (Bad Request)} if the donation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Donation> createDonation(@RequestBody Donation donation) throws URISyntaxException {
        log.debug("REST request to save Donation : {}", donation);
        if (donation.getId() != null) {
            throw new BadRequestAlertException("A new donation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        donation = donationRepository.save(donation);
        return ResponseEntity.created(new URI("/api/donations/" + donation.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, donation.getId().toString()))
            .body(donation);
    }

    /**
     * {@code PUT  /donations/:id} : Updates an existing donation.
     *
     * @param id the id of the donation to save.
     * @param donation the donation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated donation,
     * or with status {@code 400 (Bad Request)} if the donation is not valid,
     * or with status {@code 500 (Internal Server Error)} if the donation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Donation> updateDonation(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Donation donation
    ) throws URISyntaxException {
        log.debug("REST request to update Donation : {}, {}", id, donation);
        if (donation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, donation.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!donationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        donation = donationRepository.save(donation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, donation.getId().toString()))
            .body(donation);
    }

    /**
     * {@code PATCH  /donations/:id} : Partial updates given fields of an existing donation, field will ignore if it is null
     *
     * @param id the id of the donation to save.
     * @param donation the donation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated donation,
     * or with status {@code 400 (Bad Request)} if the donation is not valid,
     * or with status {@code 404 (Not Found)} if the donation is not found,
     * or with status {@code 500 (Internal Server Error)} if the donation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Donation> partialUpdateDonation(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Donation donation
    ) throws URISyntaxException {
        log.debug("REST request to partial update Donation partially : {}, {}", id, donation);
        if (donation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, donation.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!donationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Donation> result = donationRepository
            .findById(donation.getId())
            .map(existingDonation -> {
                if (donation.getDonationName() != null) {
                    existingDonation.setDonationName(donation.getDonationName());
                }
                if (donation.getContactDetails() != null) {
                    existingDonation.setContactDetails(donation.getContactDetails());
                }
                if (donation.getBillingAddress() != null) {
                    existingDonation.setBillingAddress(donation.getBillingAddress());
                }
                if (donation.getAmount() != null) {
                    existingDonation.setAmount(donation.getAmount());
                }
                if (donation.getDescription() != null) {
                    existingDonation.setDescription(donation.getDescription());
                }
                if (donation.getDonationType() != null) {
                    existingDonation.setDonationType(donation.getDonationType());
                }
                if (donation.getDateAndTime() != null) {
                    existingDonation.setDateAndTime(donation.getDateAndTime());
                }
                if (donation.getEmail() != null) {
                    existingDonation.setEmail(donation.getEmail());
                }

                return existingDonation;
            })
            .map(donationRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, donation.getId().toString())
        );
    }

    /**
     * {@code GET  /donations} : get all the donations.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of donations in body.
     */
    @GetMapping("")
    public ResponseEntity<List<Donation>> getAllDonations(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Donations");
        Page<Donation> page = donationRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /donations/:id} : get the "id" donation.
     *
     * @param id the id of the donation to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the donation, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Donation> getDonation(@PathVariable("id") Long id) {
        log.debug("REST request to get Donation : {}", id);
        Optional<Donation> donation = donationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(donation);
    }

    /**
     * {@code DELETE  /donations/:id} : delete the "id" donation.
     *
     * @param id the id of the donation to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDonation(@PathVariable("id") Long id) {
        log.debug("REST request to delete Donation : {}", id);
        donationRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}

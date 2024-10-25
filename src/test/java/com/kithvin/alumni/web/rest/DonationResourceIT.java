package com.kithvin.alumni.web.rest;

import static com.kithvin.alumni.domain.DonationAsserts.*;
import static com.kithvin.alumni.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kithvin.alumni.IntegrationTest;
import com.kithvin.alumni.domain.Donation;
import com.kithvin.alumni.repository.DonationRepository;
import jakarta.persistence.EntityManager;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link DonationResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DonationResourceIT {

    private static final String DEFAULT_DONATION_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DONATION_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CONTACT_DETAILS = "AAAAAAAAAA";
    private static final String UPDATED_CONTACT_DETAILS = "BBBBBBBBBB";

    private static final String DEFAULT_BILLING_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_BILLING_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_AMOUNT = "AAAAAAAAAA";
    private static final String UPDATED_AMOUNT = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_DONATION_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_DONATION_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_DATE_AND_TIME = "AAAAAAAAAA";
    private static final String UPDATED_DATE_AND_TIME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/donations";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private DonationRepository donationRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDonationMockMvc;

    private Donation donation;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Donation createEntity(EntityManager em) {
        Donation donation = new Donation()
            .donationName(DEFAULT_DONATION_NAME)
            .contactDetails(DEFAULT_CONTACT_DETAILS)
            .billingAddress(DEFAULT_BILLING_ADDRESS)
            .amount(DEFAULT_AMOUNT)
            .description(DEFAULT_DESCRIPTION)
            .donationType(DEFAULT_DONATION_TYPE)
            .dateAndTime(DEFAULT_DATE_AND_TIME)
            .email(DEFAULT_EMAIL);
        return donation;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Donation createUpdatedEntity(EntityManager em) {
        Donation donation = new Donation()
            .donationName(UPDATED_DONATION_NAME)
            .contactDetails(UPDATED_CONTACT_DETAILS)
            .billingAddress(UPDATED_BILLING_ADDRESS)
            .amount(UPDATED_AMOUNT)
            .description(UPDATED_DESCRIPTION)
            .donationType(UPDATED_DONATION_TYPE)
            .dateAndTime(UPDATED_DATE_AND_TIME)
            .email(UPDATED_EMAIL);
        return donation;
    }

    @BeforeEach
    public void initTest() {
        donation = createEntity(em);
    }

    @Test
    @Transactional
    void createDonation() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Donation
        var returnedDonation = om.readValue(
            restDonationMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(donation)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            Donation.class
        );

        // Validate the Donation in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertDonationUpdatableFieldsEquals(returnedDonation, getPersistedDonation(returnedDonation));
    }

    @Test
    @Transactional
    void createDonationWithExistingId() throws Exception {
        // Create the Donation with an existing ID
        donation.setId(1L);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDonationMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(donation)))
            .andExpect(status().isBadRequest());

        // Validate the Donation in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllDonations() throws Exception {
        // Initialize the database
        donationRepository.saveAndFlush(donation);

        // Get all the donationList
        restDonationMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(donation.getId().intValue())))
            .andExpect(jsonPath("$.[*].donationName").value(hasItem(DEFAULT_DONATION_NAME)))
            .andExpect(jsonPath("$.[*].contactDetails").value(hasItem(DEFAULT_CONTACT_DETAILS)))
            .andExpect(jsonPath("$.[*].billingAddress").value(hasItem(DEFAULT_BILLING_ADDRESS)))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].donationType").value(hasItem(DEFAULT_DONATION_TYPE)))
            .andExpect(jsonPath("$.[*].dateAndTime").value(hasItem(DEFAULT_DATE_AND_TIME)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)));
    }

    @Test
    @Transactional
    void getDonation() throws Exception {
        // Initialize the database
        donationRepository.saveAndFlush(donation);

        // Get the donation
        restDonationMockMvc
            .perform(get(ENTITY_API_URL_ID, donation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(donation.getId().intValue()))
            .andExpect(jsonPath("$.donationName").value(DEFAULT_DONATION_NAME))
            .andExpect(jsonPath("$.contactDetails").value(DEFAULT_CONTACT_DETAILS))
            .andExpect(jsonPath("$.billingAddress").value(DEFAULT_BILLING_ADDRESS))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.donationType").value(DEFAULT_DONATION_TYPE))
            .andExpect(jsonPath("$.dateAndTime").value(DEFAULT_DATE_AND_TIME))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL));
    }

    @Test
    @Transactional
    void getNonExistingDonation() throws Exception {
        // Get the donation
        restDonationMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingDonation() throws Exception {
        // Initialize the database
        donationRepository.saveAndFlush(donation);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the donation
        Donation updatedDonation = donationRepository.findById(donation.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedDonation are not directly saved in db
        em.detach(updatedDonation);
        updatedDonation
            .donationName(UPDATED_DONATION_NAME)
            .contactDetails(UPDATED_CONTACT_DETAILS)
            .billingAddress(UPDATED_BILLING_ADDRESS)
            .amount(UPDATED_AMOUNT)
            .description(UPDATED_DESCRIPTION)
            .donationType(UPDATED_DONATION_TYPE)
            .dateAndTime(UPDATED_DATE_AND_TIME)
            .email(UPDATED_EMAIL);

        restDonationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedDonation.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedDonation))
            )
            .andExpect(status().isOk());

        // Validate the Donation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedDonationToMatchAllProperties(updatedDonation);
    }

    @Test
    @Transactional
    void putNonExistingDonation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        donation.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDonationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, donation.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(donation))
            )
            .andExpect(status().isBadRequest());

        // Validate the Donation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDonation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        donation.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDonationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(donation))
            )
            .andExpect(status().isBadRequest());

        // Validate the Donation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDonation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        donation.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDonationMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(donation)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Donation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDonationWithPatch() throws Exception {
        // Initialize the database
        donationRepository.saveAndFlush(donation);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the donation using partial update
        Donation partialUpdatedDonation = new Donation();
        partialUpdatedDonation.setId(donation.getId());

        partialUpdatedDonation
            .donationName(UPDATED_DONATION_NAME)
            .billingAddress(UPDATED_BILLING_ADDRESS)
            .amount(UPDATED_AMOUNT)
            .email(UPDATED_EMAIL);

        restDonationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDonation.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedDonation))
            )
            .andExpect(status().isOk());

        // Validate the Donation in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertDonationUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedDonation, donation), getPersistedDonation(donation));
    }

    @Test
    @Transactional
    void fullUpdateDonationWithPatch() throws Exception {
        // Initialize the database
        donationRepository.saveAndFlush(donation);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the donation using partial update
        Donation partialUpdatedDonation = new Donation();
        partialUpdatedDonation.setId(donation.getId());

        partialUpdatedDonation
            .donationName(UPDATED_DONATION_NAME)
            .contactDetails(UPDATED_CONTACT_DETAILS)
            .billingAddress(UPDATED_BILLING_ADDRESS)
            .amount(UPDATED_AMOUNT)
            .description(UPDATED_DESCRIPTION)
            .donationType(UPDATED_DONATION_TYPE)
            .dateAndTime(UPDATED_DATE_AND_TIME)
            .email(UPDATED_EMAIL);

        restDonationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDonation.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedDonation))
            )
            .andExpect(status().isOk());

        // Validate the Donation in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertDonationUpdatableFieldsEquals(partialUpdatedDonation, getPersistedDonation(partialUpdatedDonation));
    }

    @Test
    @Transactional
    void patchNonExistingDonation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        donation.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDonationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, donation.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(donation))
            )
            .andExpect(status().isBadRequest());

        // Validate the Donation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDonation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        donation.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDonationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(donation))
            )
            .andExpect(status().isBadRequest());

        // Validate the Donation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDonation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        donation.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDonationMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(donation)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Donation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDonation() throws Exception {
        // Initialize the database
        donationRepository.saveAndFlush(donation);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the donation
        restDonationMockMvc
            .perform(delete(ENTITY_API_URL_ID, donation.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return donationRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected Donation getPersistedDonation(Donation donation) {
        return donationRepository.findById(donation.getId()).orElseThrow();
    }

    protected void assertPersistedDonationToMatchAllProperties(Donation expectedDonation) {
        assertDonationAllPropertiesEquals(expectedDonation, getPersistedDonation(expectedDonation));
    }

    protected void assertPersistedDonationToMatchUpdatableProperties(Donation expectedDonation) {
        assertDonationAllUpdatablePropertiesEquals(expectedDonation, getPersistedDonation(expectedDonation));
    }
}

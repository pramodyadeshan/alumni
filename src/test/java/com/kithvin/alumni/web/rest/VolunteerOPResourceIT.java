package com.kithvin.alumni.web.rest;

import static com.kithvin.alumni.domain.VolunteerOPAsserts.*;
import static com.kithvin.alumni.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kithvin.alumni.IntegrationTest;
import com.kithvin.alumni.domain.VolunteerOP;
import com.kithvin.alumni.repository.VolunteerOPRepository;
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
 * Integration tests for the {@link VolunteerOPResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class VolunteerOPResourceIT {

    private static final String DEFAULT_VOLUNTEER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_VOLUNTEER_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DATE_AND_TIME = "AAAAAAAAAA";
    private static final String UPDATED_DATE_AND_TIME = "BBBBBBBBBB";

    private static final String DEFAULT_LOCATION = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION = "BBBBBBBBBB";

    private static final String DEFAULT_TIME_DURATION = "AAAAAAAAAA";
    private static final String UPDATED_TIME_DURATION = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_MEMBER = "AAAAAAAAAA";
    private static final String UPDATED_MEMBER = "BBBBBBBBBB";

    private static final String DEFAULT_VOLUNTEER_OP_COORDINATOR = "AAAAAAAAAA";
    private static final String UPDATED_VOLUNTEER_OP_COORDINATOR = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/volunteer-ops";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private VolunteerOPRepository volunteerOPRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVolunteerOPMockMvc;

    private VolunteerOP volunteerOP;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VolunteerOP createEntity(EntityManager em) {
        VolunteerOP volunteerOP = new VolunteerOP()
            .volunteerName(DEFAULT_VOLUNTEER_NAME)
            .dateAndTime(DEFAULT_DATE_AND_TIME)
            .location(DEFAULT_LOCATION)
            .timeDuration(DEFAULT_TIME_DURATION)
            .description(DEFAULT_DESCRIPTION)
            .member(DEFAULT_MEMBER)
            .volunteerOpCoordinator(DEFAULT_VOLUNTEER_OP_COORDINATOR);
        return volunteerOP;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VolunteerOP createUpdatedEntity(EntityManager em) {
        VolunteerOP volunteerOP = new VolunteerOP()
            .volunteerName(UPDATED_VOLUNTEER_NAME)
            .dateAndTime(UPDATED_DATE_AND_TIME)
            .location(UPDATED_LOCATION)
            .timeDuration(UPDATED_TIME_DURATION)
            .description(UPDATED_DESCRIPTION)
            .member(UPDATED_MEMBER)
            .volunteerOpCoordinator(UPDATED_VOLUNTEER_OP_COORDINATOR);
        return volunteerOP;
    }

    @BeforeEach
    public void initTest() {
        volunteerOP = createEntity(em);
    }

    @Test
    @Transactional
    void createVolunteerOP() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the VolunteerOP
        var returnedVolunteerOP = om.readValue(
            restVolunteerOPMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(volunteerOP)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            VolunteerOP.class
        );

        // Validate the VolunteerOP in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertVolunteerOPUpdatableFieldsEquals(returnedVolunteerOP, getPersistedVolunteerOP(returnedVolunteerOP));
    }

    @Test
    @Transactional
    void createVolunteerOPWithExistingId() throws Exception {
        // Create the VolunteerOP with an existing ID
        volunteerOP.setId(1L);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restVolunteerOPMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(volunteerOP)))
            .andExpect(status().isBadRequest());

        // Validate the VolunteerOP in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllVolunteerOPS() throws Exception {
        // Initialize the database
        volunteerOPRepository.saveAndFlush(volunteerOP);

        // Get all the volunteerOPList
        restVolunteerOPMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(volunteerOP.getId().intValue())))
            .andExpect(jsonPath("$.[*].volunteerName").value(hasItem(DEFAULT_VOLUNTEER_NAME)))
            .andExpect(jsonPath("$.[*].dateAndTime").value(hasItem(DEFAULT_DATE_AND_TIME)))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION)))
            .andExpect(jsonPath("$.[*].timeDuration").value(hasItem(DEFAULT_TIME_DURATION)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].member").value(hasItem(DEFAULT_MEMBER)))
            .andExpect(jsonPath("$.[*].volunteerOpCoordinator").value(hasItem(DEFAULT_VOLUNTEER_OP_COORDINATOR)));
    }

    @Test
    @Transactional
    void getVolunteerOP() throws Exception {
        // Initialize the database
        volunteerOPRepository.saveAndFlush(volunteerOP);

        // Get the volunteerOP
        restVolunteerOPMockMvc
            .perform(get(ENTITY_API_URL_ID, volunteerOP.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(volunteerOP.getId().intValue()))
            .andExpect(jsonPath("$.volunteerName").value(DEFAULT_VOLUNTEER_NAME))
            .andExpect(jsonPath("$.dateAndTime").value(DEFAULT_DATE_AND_TIME))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION))
            .andExpect(jsonPath("$.timeDuration").value(DEFAULT_TIME_DURATION))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.member").value(DEFAULT_MEMBER))
            .andExpect(jsonPath("$.volunteerOpCoordinator").value(DEFAULT_VOLUNTEER_OP_COORDINATOR));
    }

    @Test
    @Transactional
    void getNonExistingVolunteerOP() throws Exception {
        // Get the volunteerOP
        restVolunteerOPMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingVolunteerOP() throws Exception {
        // Initialize the database
        volunteerOPRepository.saveAndFlush(volunteerOP);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the volunteerOP
        VolunteerOP updatedVolunteerOP = volunteerOPRepository.findById(volunteerOP.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedVolunteerOP are not directly saved in db
        em.detach(updatedVolunteerOP);
        updatedVolunteerOP
            .volunteerName(UPDATED_VOLUNTEER_NAME)
            .dateAndTime(UPDATED_DATE_AND_TIME)
            .location(UPDATED_LOCATION)
            .timeDuration(UPDATED_TIME_DURATION)
            .description(UPDATED_DESCRIPTION)
            .member(UPDATED_MEMBER)
            .volunteerOpCoordinator(UPDATED_VOLUNTEER_OP_COORDINATOR);

        restVolunteerOPMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedVolunteerOP.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedVolunteerOP))
            )
            .andExpect(status().isOk());

        // Validate the VolunteerOP in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedVolunteerOPToMatchAllProperties(updatedVolunteerOP);
    }

    @Test
    @Transactional
    void putNonExistingVolunteerOP() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        volunteerOP.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVolunteerOPMockMvc
            .perform(
                put(ENTITY_API_URL_ID, volunteerOP.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(volunteerOP))
            )
            .andExpect(status().isBadRequest());

        // Validate the VolunteerOP in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchVolunteerOP() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        volunteerOP.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVolunteerOPMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(volunteerOP))
            )
            .andExpect(status().isBadRequest());

        // Validate the VolunteerOP in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamVolunteerOP() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        volunteerOP.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVolunteerOPMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(volunteerOP)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the VolunteerOP in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateVolunteerOPWithPatch() throws Exception {
        // Initialize the database
        volunteerOPRepository.saveAndFlush(volunteerOP);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the volunteerOP using partial update
        VolunteerOP partialUpdatedVolunteerOP = new VolunteerOP();
        partialUpdatedVolunteerOP.setId(volunteerOP.getId());

        partialUpdatedVolunteerOP
            .volunteerName(UPDATED_VOLUNTEER_NAME)
            .dateAndTime(UPDATED_DATE_AND_TIME)
            .location(UPDATED_LOCATION)
            .timeDuration(UPDATED_TIME_DURATION)
            .member(UPDATED_MEMBER);

        restVolunteerOPMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedVolunteerOP.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedVolunteerOP))
            )
            .andExpect(status().isOk());

        // Validate the VolunteerOP in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertVolunteerOPUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedVolunteerOP, volunteerOP),
            getPersistedVolunteerOP(volunteerOP)
        );
    }

    @Test
    @Transactional
    void fullUpdateVolunteerOPWithPatch() throws Exception {
        // Initialize the database
        volunteerOPRepository.saveAndFlush(volunteerOP);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the volunteerOP using partial update
        VolunteerOP partialUpdatedVolunteerOP = new VolunteerOP();
        partialUpdatedVolunteerOP.setId(volunteerOP.getId());

        partialUpdatedVolunteerOP
            .volunteerName(UPDATED_VOLUNTEER_NAME)
            .dateAndTime(UPDATED_DATE_AND_TIME)
            .location(UPDATED_LOCATION)
            .timeDuration(UPDATED_TIME_DURATION)
            .description(UPDATED_DESCRIPTION)
            .member(UPDATED_MEMBER)
            .volunteerOpCoordinator(UPDATED_VOLUNTEER_OP_COORDINATOR);

        restVolunteerOPMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedVolunteerOP.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedVolunteerOP))
            )
            .andExpect(status().isOk());

        // Validate the VolunteerOP in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertVolunteerOPUpdatableFieldsEquals(partialUpdatedVolunteerOP, getPersistedVolunteerOP(partialUpdatedVolunteerOP));
    }

    @Test
    @Transactional
    void patchNonExistingVolunteerOP() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        volunteerOP.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVolunteerOPMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, volunteerOP.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(volunteerOP))
            )
            .andExpect(status().isBadRequest());

        // Validate the VolunteerOP in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchVolunteerOP() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        volunteerOP.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVolunteerOPMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(volunteerOP))
            )
            .andExpect(status().isBadRequest());

        // Validate the VolunteerOP in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamVolunteerOP() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        volunteerOP.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVolunteerOPMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(volunteerOP)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the VolunteerOP in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteVolunteerOP() throws Exception {
        // Initialize the database
        volunteerOPRepository.saveAndFlush(volunteerOP);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the volunteerOP
        restVolunteerOPMockMvc
            .perform(delete(ENTITY_API_URL_ID, volunteerOP.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return volunteerOPRepository.count();
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

    protected VolunteerOP getPersistedVolunteerOP(VolunteerOP volunteerOP) {
        return volunteerOPRepository.findById(volunteerOP.getId()).orElseThrow();
    }

    protected void assertPersistedVolunteerOPToMatchAllProperties(VolunteerOP expectedVolunteerOP) {
        assertVolunteerOPAllPropertiesEquals(expectedVolunteerOP, getPersistedVolunteerOP(expectedVolunteerOP));
    }

    protected void assertPersistedVolunteerOPToMatchUpdatableProperties(VolunteerOP expectedVolunteerOP) {
        assertVolunteerOPAllUpdatablePropertiesEquals(expectedVolunteerOP, getPersistedVolunteerOP(expectedVolunteerOP));
    }
}

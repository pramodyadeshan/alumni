package com.kithvin.alumni.web.rest;

import static com.kithvin.alumni.domain.NewsAsserts.*;
import static com.kithvin.alumni.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kithvin.alumni.IntegrationTest;
import com.kithvin.alumni.domain.News;
import com.kithvin.alumni.repository.NewsRepository;
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
 * Integration tests for the {@link NewsResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class NewsResourceIT {

    private static final String DEFAULT_AUTHOR_NAME = "AAAAAAAAAA";
    private static final String UPDATED_AUTHOR_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_PUBLISH_DATE = "AAAAAAAAAA";
    private static final String UPDATED_PUBLISH_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_COVER_AREA = "AAAAAAAAAA";
    private static final String UPDATED_COVER_AREA = "BBBBBBBBBB";

    private static final String DEFAULT_GROUP = "AAAAAAAAAA";
    private static final String UPDATED_GROUP = "BBBBBBBBBB";

    private static final String DEFAULT_EXPIRE_DATE = "AAAAAAAAAA";
    private static final String UPDATED_EXPIRE_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_FILE_UPLOAD = "AAAAAAAAAA";
    private static final String UPDATED_FILE_UPLOAD = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/news";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private NewsRepository newsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNewsMockMvc;

    private News news;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static News createEntity(EntityManager em) {
        News news = new News()
            .authorName(DEFAULT_AUTHOR_NAME)
            .title(DEFAULT_TITLE)
            .publishDate(DEFAULT_PUBLISH_DATE)
            .coverArea(DEFAULT_COVER_AREA)
            .group(DEFAULT_GROUP)
            .expireDate(DEFAULT_EXPIRE_DATE)
            .fileUpload(DEFAULT_FILE_UPLOAD);
        return news;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static News createUpdatedEntity(EntityManager em) {
        News news = new News()
            .authorName(UPDATED_AUTHOR_NAME)
            .title(UPDATED_TITLE)
            .publishDate(UPDATED_PUBLISH_DATE)
            .coverArea(UPDATED_COVER_AREA)
            .group(UPDATED_GROUP)
            .expireDate(UPDATED_EXPIRE_DATE)
            .fileUpload(UPDATED_FILE_UPLOAD);
        return news;
    }

    @BeforeEach
    public void initTest() {
        news = createEntity(em);
    }

    @Test
    @Transactional
    void createNews() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the News
        var returnedNews = om.readValue(
            restNewsMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(news)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            News.class
        );

        // Validate the News in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertNewsUpdatableFieldsEquals(returnedNews, getPersistedNews(returnedNews));
    }

    @Test
    @Transactional
    void createNewsWithExistingId() throws Exception {
        // Create the News with an existing ID
        news.setId(1L);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restNewsMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(news)))
            .andExpect(status().isBadRequest());

        // Validate the News in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllNews() throws Exception {
        // Initialize the database
        newsRepository.saveAndFlush(news);

        // Get all the newsList
        restNewsMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(news.getId().intValue())))
            .andExpect(jsonPath("$.[*].authorName").value(hasItem(DEFAULT_AUTHOR_NAME)))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].publishDate").value(hasItem(DEFAULT_PUBLISH_DATE)))
            .andExpect(jsonPath("$.[*].coverArea").value(hasItem(DEFAULT_COVER_AREA)))
            .andExpect(jsonPath("$.[*].group").value(hasItem(DEFAULT_GROUP)))
            .andExpect(jsonPath("$.[*].expireDate").value(hasItem(DEFAULT_EXPIRE_DATE)))
            .andExpect(jsonPath("$.[*].fileUpload").value(hasItem(DEFAULT_FILE_UPLOAD)));
    }

    @Test
    @Transactional
    void getNews() throws Exception {
        // Initialize the database
        newsRepository.saveAndFlush(news);

        // Get the news
        restNewsMockMvc
            .perform(get(ENTITY_API_URL_ID, news.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(news.getId().intValue()))
            .andExpect(jsonPath("$.authorName").value(DEFAULT_AUTHOR_NAME))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.publishDate").value(DEFAULT_PUBLISH_DATE))
            .andExpect(jsonPath("$.coverArea").value(DEFAULT_COVER_AREA))
            .andExpect(jsonPath("$.group").value(DEFAULT_GROUP))
            .andExpect(jsonPath("$.expireDate").value(DEFAULT_EXPIRE_DATE))
            .andExpect(jsonPath("$.fileUpload").value(DEFAULT_FILE_UPLOAD));
    }

    @Test
    @Transactional
    void getNonExistingNews() throws Exception {
        // Get the news
        restNewsMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingNews() throws Exception {
        // Initialize the database
        newsRepository.saveAndFlush(news);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the news
        News updatedNews = newsRepository.findById(news.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedNews are not directly saved in db
        em.detach(updatedNews);
        updatedNews
            .authorName(UPDATED_AUTHOR_NAME)
            .title(UPDATED_TITLE)
            .publishDate(UPDATED_PUBLISH_DATE)
            .coverArea(UPDATED_COVER_AREA)
            .group(UPDATED_GROUP)
            .expireDate(UPDATED_EXPIRE_DATE)
            .fileUpload(UPDATED_FILE_UPLOAD);

        restNewsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedNews.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedNews))
            )
            .andExpect(status().isOk());

        // Validate the News in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedNewsToMatchAllProperties(updatedNews);
    }

    @Test
    @Transactional
    void putNonExistingNews() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        news.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNewsMockMvc
            .perform(put(ENTITY_API_URL_ID, news.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(news)))
            .andExpect(status().isBadRequest());

        // Validate the News in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchNews() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        news.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNewsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(news))
            )
            .andExpect(status().isBadRequest());

        // Validate the News in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamNews() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        news.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNewsMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(news)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the News in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateNewsWithPatch() throws Exception {
        // Initialize the database
        newsRepository.saveAndFlush(news);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the news using partial update
        News partialUpdatedNews = new News();
        partialUpdatedNews.setId(news.getId());

        partialUpdatedNews
            .authorName(UPDATED_AUTHOR_NAME)
            .title(UPDATED_TITLE)
            .publishDate(UPDATED_PUBLISH_DATE)
            .expireDate(UPDATED_EXPIRE_DATE)
            .fileUpload(UPDATED_FILE_UPLOAD);

        restNewsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedNews.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedNews))
            )
            .andExpect(status().isOk());

        // Validate the News in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertNewsUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedNews, news), getPersistedNews(news));
    }

    @Test
    @Transactional
    void fullUpdateNewsWithPatch() throws Exception {
        // Initialize the database
        newsRepository.saveAndFlush(news);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the news using partial update
        News partialUpdatedNews = new News();
        partialUpdatedNews.setId(news.getId());

        partialUpdatedNews
            .authorName(UPDATED_AUTHOR_NAME)
            .title(UPDATED_TITLE)
            .publishDate(UPDATED_PUBLISH_DATE)
            .coverArea(UPDATED_COVER_AREA)
            .group(UPDATED_GROUP)
            .expireDate(UPDATED_EXPIRE_DATE)
            .fileUpload(UPDATED_FILE_UPLOAD);

        restNewsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedNews.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedNews))
            )
            .andExpect(status().isOk());

        // Validate the News in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertNewsUpdatableFieldsEquals(partialUpdatedNews, getPersistedNews(partialUpdatedNews));
    }

    @Test
    @Transactional
    void patchNonExistingNews() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        news.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNewsMockMvc
            .perform(patch(ENTITY_API_URL_ID, news.getId()).contentType("application/merge-patch+json").content(om.writeValueAsBytes(news)))
            .andExpect(status().isBadRequest());

        // Validate the News in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchNews() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        news.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNewsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(news))
            )
            .andExpect(status().isBadRequest());

        // Validate the News in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamNews() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        news.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNewsMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(news)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the News in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteNews() throws Exception {
        // Initialize the database
        newsRepository.saveAndFlush(news);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the news
        restNewsMockMvc
            .perform(delete(ENTITY_API_URL_ID, news.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return newsRepository.count();
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

    protected News getPersistedNews(News news) {
        return newsRepository.findById(news.getId()).orElseThrow();
    }

    protected void assertPersistedNewsToMatchAllProperties(News expectedNews) {
        assertNewsAllPropertiesEquals(expectedNews, getPersistedNews(expectedNews));
    }

    protected void assertPersistedNewsToMatchUpdatableProperties(News expectedNews) {
        assertNewsAllUpdatablePropertiesEquals(expectedNews, getPersistedNews(expectedNews));
    }
}

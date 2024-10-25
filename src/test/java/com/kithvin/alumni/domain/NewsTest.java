package com.kithvin.alumni.domain;

import static com.kithvin.alumni.domain.NewsTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.kithvin.alumni.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class NewsTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(News.class);
        News news1 = getNewsSample1();
        News news2 = new News();
        assertThat(news1).isNotEqualTo(news2);

        news2.setId(news1.getId());
        assertThat(news1).isEqualTo(news2);

        news2 = getNewsSample2();
        assertThat(news1).isNotEqualTo(news2);
    }
}

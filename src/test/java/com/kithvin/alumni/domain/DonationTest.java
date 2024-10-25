package com.kithvin.alumni.domain;

import static com.kithvin.alumni.domain.DonationTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.kithvin.alumni.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DonationTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Donation.class);
        Donation donation1 = getDonationSample1();
        Donation donation2 = new Donation();
        assertThat(donation1).isNotEqualTo(donation2);

        donation2.setId(donation1.getId());
        assertThat(donation1).isEqualTo(donation2);

        donation2 = getDonationSample2();
        assertThat(donation1).isNotEqualTo(donation2);
    }
}

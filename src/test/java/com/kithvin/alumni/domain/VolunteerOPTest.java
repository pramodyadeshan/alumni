package com.kithvin.alumni.domain;

import static com.kithvin.alumni.domain.VolunteerOPTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.kithvin.alumni.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class VolunteerOPTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VolunteerOP.class);
        VolunteerOP volunteerOP1 = getVolunteerOPSample1();
        VolunteerOP volunteerOP2 = new VolunteerOP();
        assertThat(volunteerOP1).isNotEqualTo(volunteerOP2);

        volunteerOP2.setId(volunteerOP1.getId());
        assertThat(volunteerOP1).isEqualTo(volunteerOP2);

        volunteerOP2 = getVolunteerOPSample2();
        assertThat(volunteerOP1).isNotEqualTo(volunteerOP2);
    }
}

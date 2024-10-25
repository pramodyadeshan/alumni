package com.kithvin.alumni.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class VolunteerOPTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static VolunteerOP getVolunteerOPSample1() {
        return new VolunteerOP()
            .id(1L)
            .volunteerName("volunteerName1")
            .dateAndTime("dateAndTime1")
            .location("location1")
            .timeDuration("timeDuration1")
            .description("description1")
            .member("member1")
            .volunteerOpCoordinator("volunteerOpCoordinator1");
    }

    public static VolunteerOP getVolunteerOPSample2() {
        return new VolunteerOP()
            .id(2L)
            .volunteerName("volunteerName2")
            .dateAndTime("dateAndTime2")
            .location("location2")
            .timeDuration("timeDuration2")
            .description("description2")
            .member("member2")
            .volunteerOpCoordinator("volunteerOpCoordinator2");
    }

    public static VolunteerOP getVolunteerOPRandomSampleGenerator() {
        return new VolunteerOP()
            .id(longCount.incrementAndGet())
            .volunteerName(UUID.randomUUID().toString())
            .dateAndTime(UUID.randomUUID().toString())
            .location(UUID.randomUUID().toString())
            .timeDuration(UUID.randomUUID().toString())
            .description(UUID.randomUUID().toString())
            .member(UUID.randomUUID().toString())
            .volunteerOpCoordinator(UUID.randomUUID().toString());
    }
}

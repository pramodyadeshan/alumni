package com.kithvin.alumni.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class EventTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Event getEventSample1() {
        return new Event()
            .id(1L)
            .eventName("eventName1")
            .dateAndTime("dateAndTime1")
            .location("location1")
            .eventType("eventType1")
            .description("description1")
            .targetAudience("targetAudience1")
            .eventCoordinator("eventCoordinator1");
    }

    public static Event getEventSample2() {
        return new Event()
            .id(2L)
            .eventName("eventName2")
            .dateAndTime("dateAndTime2")
            .location("location2")
            .eventType("eventType2")
            .description("description2")
            .targetAudience("targetAudience2")
            .eventCoordinator("eventCoordinator2");
    }

    public static Event getEventRandomSampleGenerator() {
        return new Event()
            .id(longCount.incrementAndGet())
            .eventName(UUID.randomUUID().toString())
            .dateAndTime(UUID.randomUUID().toString())
            .location(UUID.randomUUID().toString())
            .eventType(UUID.randomUUID().toString())
            .description(UUID.randomUUID().toString())
            .targetAudience(UUID.randomUUID().toString())
            .eventCoordinator(UUID.randomUUID().toString());
    }
}

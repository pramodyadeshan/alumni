package com.kithvin.alumni.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class JobTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Job getJobSample1() {
        return new Job()
            .id(1L)
            .jobName("jobName1")
            .companyName("companyName1")
            .location("location1")
            .salaryDetails("salaryDetails1")
            .jobDescription("jobDescription1")
            .expireDate("expireDate1")
            .jobApplyMethod("jobApplyMethod1")
            .fileUpload("fileUpload1")
            .email("email1");
    }

    public static Job getJobSample2() {
        return new Job()
            .id(2L)
            .jobName("jobName2")
            .companyName("companyName2")
            .location("location2")
            .salaryDetails("salaryDetails2")
            .jobDescription("jobDescription2")
            .expireDate("expireDate2")
            .jobApplyMethod("jobApplyMethod2")
            .fileUpload("fileUpload2")
            .email("email2");
    }

    public static Job getJobRandomSampleGenerator() {
        return new Job()
            .id(longCount.incrementAndGet())
            .jobName(UUID.randomUUID().toString())
            .companyName(UUID.randomUUID().toString())
            .location(UUID.randomUUID().toString())
            .salaryDetails(UUID.randomUUID().toString())
            .jobDescription(UUID.randomUUID().toString())
            .expireDate(UUID.randomUUID().toString())
            .jobApplyMethod(UUID.randomUUID().toString())
            .fileUpload(UUID.randomUUID().toString())
            .email(UUID.randomUUID().toString());
    }
}

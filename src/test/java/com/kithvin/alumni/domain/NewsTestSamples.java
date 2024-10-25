package com.kithvin.alumni.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class NewsTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static News getNewsSample1() {
        return new News()
            .id(1L)
            .authorName("authorName1")
            .title("title1")
            .publishDate("publishDate1")
            .coverArea("coverArea1")
            .group("group1")
            .expireDate("expireDate1")
            .fileUpload("fileUpload1");
    }

    public static News getNewsSample2() {
        return new News()
            .id(2L)
            .authorName("authorName2")
            .title("title2")
            .publishDate("publishDate2")
            .coverArea("coverArea2")
            .group("group2")
            .expireDate("expireDate2")
            .fileUpload("fileUpload2");
    }

    public static News getNewsRandomSampleGenerator() {
        return new News()
            .id(longCount.incrementAndGet())
            .authorName(UUID.randomUUID().toString())
            .title(UUID.randomUUID().toString())
            .publishDate(UUID.randomUUID().toString())
            .coverArea(UUID.randomUUID().toString())
            .group(UUID.randomUUID().toString())
            .expireDate(UUID.randomUUID().toString())
            .fileUpload(UUID.randomUUID().toString());
    }
}

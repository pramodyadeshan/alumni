package com.kithvin.alumni.repository;

import com.kithvin.alumni.domain.VolunteerOP;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the VolunteerOP entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VolunteerOPRepository extends JpaRepository<VolunteerOP, Long> {}

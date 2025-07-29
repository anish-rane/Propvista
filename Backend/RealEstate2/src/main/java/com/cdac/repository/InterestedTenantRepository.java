package com.cdac.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.entity.InterestedTenant;


@Repository
public interface InterestedTenantRepository extends JpaRepository<InterestedTenant, Long> {

}

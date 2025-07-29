package com.cdac.repository;

import java.util.List;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.entity.Property;
import com.cdac.entity.User;


@Repository
@SpringBootApplication
public interface PropertyRepository extends JpaRepository<Property, Long> {
	List<Property> findByOwnerName(String ownerName);
}

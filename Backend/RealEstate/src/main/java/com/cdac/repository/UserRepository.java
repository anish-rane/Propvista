package com.cdac.repository;

import java.util.Optional;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.entity.User;

@Repository

public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByEmail(String email);
}

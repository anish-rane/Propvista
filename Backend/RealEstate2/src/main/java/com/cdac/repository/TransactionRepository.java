package com.cdac.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.entity.Transaction;


@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
//	Transaction findbyid(Long id);
}

package com.cdac.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.entity.Transaction;
import com.cdac.repository.TransactionRepository;

@Service
public class TransactionService {
	@Autowired
	private TransactionRepository transactionRepository;
	
	public List<Transaction> getAllTransactions(){
		return transactionRepository.findAll();
	}
	
	public Transaction getTransactionByID(Long id) {
		return transactionRepository.findById(id).orElse(null);
	}
	
	public Transaction saveTransaction(Transaction transaction) {
		return transactionRepository.save(transaction);
	}
	
	public void deleteTransactions(Long id) {
		transactionRepository.deleteById(id);
	}
}

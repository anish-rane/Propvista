package com.cdac.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.entity.Transaction;
import com.cdac.service.TransactionService;

@RestController
@RequestMapping("/transactions")
@CrossOrigin(origins="http://localhost:5173")
public class TransactionController {
	@Autowired
	private TransactionService transactionService;
	
	@GetMapping("/getall")
	public List<Transaction> getAllTransactions(){
		return transactionService.getAllTransactions();
	}
	
	@GetMapping("/{id}")
	public Transaction getTransactionById(@PathVariable Long id) {
		return transactionService.getTransactionByID(id);
	}
	
	@PostMapping("/save")
	public Transaction createTransaction(@RequestBody Transaction transaction) {
		return transactionService.saveTransaction(transaction);
	}
	@DeleteMapping("/{id}")
	public void deletetransaction(@PathVariable Long id) {
		transactionService.deleteTransactions(id);
	}
	
//	@PutMapping("/update-status/{id}")
//    public ResponseEntity<String> updateTransactionStatus(
//            @PathVariable Long id,
//            @RequestParam String status) {
//
//        Transaction transaction = transactionService.getTransactionByID(id);
//        if (transaction == null) {
//            return ResponseEntity.notFound().build();
//        }
//
//        transaction.setStatus(status); // e.g., "pending", "approved", "rejected"
//        transactionService.saveTransaction(transaction);
//
//        if ("approved".equalsIgnoreCase(status)) {
//            // Placeholder: Send message to client
//            // You can implement actual notification logic here
//            System.out.println("Notify client: Transaction approved for client ID " + transaction.getClientId());
//        }
//
//        return ResponseEntity.ok("Transaction status updated to " + status);
//    }
}

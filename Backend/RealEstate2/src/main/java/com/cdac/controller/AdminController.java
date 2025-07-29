package com.cdac.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.entity.User;
import com.cdac.service.UserService;

import jakarta.validation.Valid;

@CrossOrigin("http://localhost:5173/")
@RestController
@RequestMapping("/admin")
public class AdminController {
	@Autowired
	private UserService userservice;
	
	@GetMapping("/users")
	public ResponseEntity<List<User>> getAllUser(){
		return ResponseEntity.ok(userservice.findAll());
	}
	
	@GetMapping("/users/{id}")
	public Optional<Object> getUserById(@PathVariable Long id){
		Optional<User> user= userservice.findById(id);
		return user.map(ResponseEntity::ok);
	}
	
	@GetMapping("/email/{email}")
	public ResponseEntity<User> findByEmail(@PathVariable String email){
		return userservice.findByEmail(email).map(agent ->ResponseEntity.ok().body(agent)).orElse(ResponseEntity.notFound().build());
	}
	
	 @PostMapping("/users")
//   @CrossOrigin(origins = "http://localhost:3000")
   public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
       return ResponseEntity.ok(userservice.saveUser(user));
   }
	 
	 @PutMapping("/users/{id}")
	    //@CrossOrigin(origins = "http://localhost:3000")
	 public ResponseEntity<?> updateUser(@PathVariable Long id, @Valid @RequestBody User updatedUser) {
		 Optional<User> user = userservice.findById(id);

	     if (user.isPresent()) {
	            User existingUser = user.get();
	            existingUser.setFirstName(updatedUser.getFirstName());
	            existingUser.setLastName(updatedUser.getLastName());
	            existingUser.setMobileNumber(updatedUser.getMobileNumber());
	            existingUser.setEmail(updatedUser.getEmail());
	            existingUser.setPassword(updatedUser.getPassword());
	            existingUser.setRole(updatedUser.getRole());

	            userservice.saveUser(existingUser);
	            return ResponseEntity.ok(existingUser);
	        } else {
	            return ResponseEntity.status(404).body("User not found");
	        }
	    }
	 @DeleteMapping("/users/{id}")
	 public ResponseEntity<?> deleteUser(@PathVariable Long id){
		 Optional<User> user= userservice.findById(id);
		 if(user.isPresent()) {
			 userservice.deleteUserByID(id);
			 return ResponseEntity.ok("user deleted Successfully");
		 }
		 return ResponseEntity.status(404).body("user not found");
	 }
	
	
}

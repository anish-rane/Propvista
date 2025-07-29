package com.cdac.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.entity.User;
import com.cdac.service.UserService;

import jakarta.validation.Valid;

@CrossOrigin(origins="http://localhost:5173")
@RestController
@RequestMapping("/users")
public class UserController {
	@Autowired
	private UserService userservice;
	
	@PostMapping("/login")
//	@CrossOrigin(origins="http://localhost:5173")
	public ResponseEntity<?> login(@Valid @RequestBody User user){
		Optional<User> existingUser= userservice.findByEmail(user.getEmail());
		if(existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword()) && existingUser.get().getRole().equals(user.getRole())) {
			Map<String,Object> response= new HashMap<>();
			response.put("email", existingUser.get().getEmail());
			response.put("role", existingUser.get().getRole());
			response.put("firstName", existingUser.get().getFirstName());
			response.put("lastName", existingUser.get().getLastName());
			response.put("mobileNumber", existingUser.get().getMobileNumber());

			return ResponseEntity.ok(response);
		}
		return ResponseEntity.status(401).body("Invalid email or password");
	}
	
	@PostMapping("/register")
//	@CrossOrigin(origins="http://localhost:5173/")
	public ResponseEntity<User> register(@Valid @RequestBody User user){
		return ResponseEntity.ok(userservice.saveUser(user));
	}
}

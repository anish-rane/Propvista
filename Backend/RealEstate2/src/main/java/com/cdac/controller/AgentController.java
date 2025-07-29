package com.cdac.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.entity.InterestedTenant;
import com.cdac.repository.InterestedTenantRepository;

@RestController
@RequestMapping("/agents")
@CrossOrigin(origins="http://localhost:5173")
public class AgentController {
	@Autowired
	private InterestedTenantRepository interestedTenantRepository;
	
	@GetMapping("/interested-tenants")
	public ResponseEntity<List<InterestedTenant>> getInterestedTenants(){
		try {
			List<InterestedTenant> tenants= interestedTenantRepository.findAll();
			return ResponseEntity.ok(tenants);
		}catch(Exception e) {
			return ResponseEntity.badRequest().body(null);
		}
	}
	
	@PostMapping("/interested-tenants")
	public ResponseEntity<?> addInterestedTenant(@RequestBody InterestedTenant tenantData){
		try {
			InterestedTenant savedTenant = interestedTenantRepository.save(tenantData);
			return ResponseEntity.ok(savedTenant);
		}catch(Exception e) {
			return ResponseEntity.badRequest().body("Error saving interested tenant: " + e.getMessage());
		}
	}
}

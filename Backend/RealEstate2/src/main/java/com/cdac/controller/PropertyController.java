package com.cdac.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cdac.entity.Property;
import com.cdac.entity.User;
import com.cdac.repository.PropertyRepository;
import com.cdac.repository.UserRepository;
import com.cdac.service.PropertyService;
import com.cdac.service.UserService;

import lombok.AllArgsConstructor;

@CrossOrigin(origins="http://localhost:5173")
@RestController
@RequestMapping("/properties")
public class PropertyController {
	
	@Autowired 
	private final PropertyService propertyService;
	
	@Autowired 
	private final UserService userService;
	
	
	
	public PropertyController(PropertyService propertyService, UserService userService) {
		super();
		this.propertyService = propertyService;
		this.userService = userService;
	}
	@PostMapping("/create")
	public ResponseEntity<?> createProperty(
	        @RequestParam("email") String email,
	        @RequestParam("imageUrl") MultipartFile imageFile,
	        @RequestParam("bhkType") String bhkType,
	        @RequestParam("propertyType") String propertyType,
	        @RequestParam("depositPrice") double depositPrice,
	        @RequestParam("location") String location,
	        @RequestParam("description") String description,
	        @RequestParam("ownerName") String ownerName,
	        @RequestParam("ownerContact") Long ownerContact,
	        @RequestParam("propertyStatus") String propertyStatus) {

	    Optional<User> user = userService.findByEmail(email);
	    if (user.isPresent() && "agent".equalsIgnoreCase(user.get().getRole())) {
	        try {
	            Property property = new Property();
	            property.setImageUrl(imageFile.getBytes());
	            property.setBhkType(bhkType);
	            property.setPropertyType(propertyType);
	            property.setDepositPrice(depositPrice);
	            property.setLocation(location);
	            property.setDescription(description);
	            property.setOwnerName(ownerName);
	            property.setOwnerContact(ownerContact);
	            property.setPropertyStatus(propertyStatus);

	            Property savedProperty = propertyService.saveProperty(property);
	            return ResponseEntity.ok(savedProperty.getId());

	        } catch (IOException e) {
	            return ResponseEntity.status(500).body("Error processing the file");
	        }
	    }
	    return ResponseEntity.status(403).body("Unauthorized to create property listing");
	}

	
	
	
	
}

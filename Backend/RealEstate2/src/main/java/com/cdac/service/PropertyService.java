package com.cdac.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.entity.Property;
import com.cdac.repository.PropertyRepository;

import jakarta.transaction.Transactional;

@Service
public class PropertyService {
	@Autowired
	private PropertyRepository propertyRepository;
	
	@Transactional
	public Property savePropertyImage(String bhkType, String propertyType, double depositPrice, String location, String description,
	                                  String ownerName, Long ownerContact, String propertyStatus, byte[] image) {
	    Property property = new Property();
	    property.setBhkType(bhkType);
	    property.setPropertyType(propertyType);
	    property.setDepositPrice(depositPrice);
	    property.setLocation(location);
	    property.setDescription(description);
	    property.setOwnerName(ownerName);
	    property.setOwnerContact(ownerContact);
	    property.setPropertyStatus(propertyStatus);
	    property.setImageUrl(image);

	    return propertyRepository.save(property);
	}

	
	public Property saveProperty(Property property) {
		return propertyRepository.save(property);
	}
	
	public Optional<Property> findById(Long id){
		return propertyRepository.findById(id);
	}
	
	public List<Property> findAll(){
		return propertyRepository.findAll();
	}
	
	public void deletePropertyById(Long id) {
		propertyRepository.deleteById(id);
	}
	
	public List<Property> getPropertiesByOwnerName(String ownerName){
		return propertyRepository.findByOwnerName(ownerName);
	}

}

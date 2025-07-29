package com.cdac.entity;

import java.io.Serializable;

import com.cdac.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
//import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Propertys")
@Getter
@Setter
public class Property implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Lob
	@Column(columnDefinition = "LONGBLOB")  // Use LONGBLOB for large binary data
	private byte[] imageUrl;
	
	@Column(length=35)
	@NotNull
	@NotBlank(message="BHK type required")
	@Pattern(regexp = "^[0-9]+[BHK]{3}$", message = "BHK type should be in a valid format like '2BHK', '3BHK'")
	private String bhkType;
	
	@Column(nullable = false, length = 10)
    @NotBlank(message = "Property type is required")
    @Pattern(regexp = "^(Apartment|House|Villa|Land|Commercial)$", message = "Property type must be one of the following: Apartment, House, Villa, Land, Commercial")
    private String propertyType;
	
	@Column(nullable=false)
	@Min(value=0,message="Deposite price must be a Positive nummber")
	private double depositPrice;
	
	@Column(nullable=false,length=80)
	@NotBlank(message="location is required")
	private String location;
	
	@Column(nullable = false)
	private String description;
	
	@Column(nullable=false,length=30)
	@NotBlank(message="Owner name is required")
	private String ownerName;
	
	@Column(unique = true, nullable = false, length = 10)
    private Long ownerContact;
	
	@Column(unique=true,length=10)
	@NotBlank(message="Property status is required")
	@Pattern(regexp="^(Available|Sold|Rented)$",message = "Property status must be 'Available', 'Sold', or 'Rented'")
	private String propertyStatus;
	
}

package com.cdac.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "interested_tenants")
@Getter
@Setter
public class InterestedTenant {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="last_name",nullable=false,length=30)
	private String name;
	
	@Column(unique=true,nullable=false,length=10)
	private Long mobileNumber;
	
	@Column(nullable=false,length=25)
	@Email(message="Email is not valid", regexp="^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$")
	@NotEmpty(message="Email cannot be empty")
	private String email;
	
	@Column(unique=true,nullable=false,length=10)
	private Long propertyId;
	
	@Column(name = "status", nullable = false, length = 15)
	private String status = "Pending"; 
	
}

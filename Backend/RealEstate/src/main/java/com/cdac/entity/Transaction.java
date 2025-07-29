package com.cdac.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Transactions")
@Getter
@Setter
public class Transaction {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable=false,length=20)
	private String clientName;
	
	@Column(nullable=false,length=20)
	private String agentName;
	
	@Column(nullable=false)
	@NotNull(message="Date is required")
	@PastOrPresent(message="Data must be in past or present")
	private LocalDate date;
	
	@Column(nullable=false,length=100)
	@NotBlank(message="location is required")
	private String location;
	
	@Column(nullable = false, length = 10)
    @NotBlank(message = "Property type is required")
    @Pattern(regexp = "^(Apartment|House|Villa|Land|Commercial)$", message = "Property type must be one of the following: Apartment, House, Villa, Land, Commercial")
    private String propertyType;
	
	@Column(nullable=false,length=10)
	@NotBlank(message="Deal type is required")
	@Pattern(regexp="^(Sale|Rent|Lease)$",message="Deal type must be one of the following: Sale, Rent, Lease")
	private String dealType;
	
	@Column(nullable=false)
	@NotNull(message="Trasaction amount is required")
	@Min(value=0,message="Transaction amount must be a positive number")
	private Double transactionAmount;
	
	
}

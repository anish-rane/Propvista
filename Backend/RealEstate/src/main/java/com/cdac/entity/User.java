package com.cdac.entity;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")

public class User{
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="first_name",nullable=false,length=30)
	private String firstName;
	
	@Column(name="last_name",nullable=false,length=30)
	private String lastName;
	
	@Column(unique=true,nullable=false,length=10)
	private Long mobileNumber;
	
	@Column(unique=true,nullable=false,length=25)
	@Email(message="Email is not valid", regexp="^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$")
	@NotEmpty(message="Email cannot be empty")
	private String email;
	
	@NotEmpty(message ="Password cannot be empty")
	@Column(nullable=false,length=100)
	@Pattern(
		    regexp = "^(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$",
		    message = "Password must be at least 8 characters long, contain one uppercase letter, and one special character"
		)
	private String password;
	
	@Column(nullable=false,length=10)
	private String role;

	@Override
	public String toString() {
		return "User [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", mobileNumber="
				+ mobileNumber + ", email=" + email + ", password=" + password + ", role=" + role + "]";
	}

	public static Object withDefaultPasswordEncoder() {
		// TODO Auto-generated method stub
		return null;
	}
}

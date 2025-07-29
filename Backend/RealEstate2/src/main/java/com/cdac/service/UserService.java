package com.cdac.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.entity.User;
import com.cdac.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	
	public Optional<User> findByEmail(String email){
        return userRepository.findByEmail(email);
    }
	
	public List<User> findAll(){
		return userRepository.findAll();
	}
	
	public Optional<User> findById(Long id){
		return userRepository.findById(id);
	}
	
	public User saveUser(User user) {
		return userRepository.save(user);
	}
	
	public void deleteUserByID(long id) {
		userRepository.deleteById(id);
	}
}

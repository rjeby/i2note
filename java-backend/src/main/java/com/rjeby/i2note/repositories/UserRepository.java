package com.rjeby.i2note.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rjeby.i2note.models.User;

public interface  UserRepository extends JpaRepository<User, Integer> {
    
}

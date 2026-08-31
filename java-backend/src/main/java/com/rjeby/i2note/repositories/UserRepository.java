package com.rjeby.i2note.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rjeby.i2note.models.User;

public interface  UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
}

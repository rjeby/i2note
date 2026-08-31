package com.rjeby.i2note.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rjeby.i2note.models.Tag;

public interface TagRepository extends JpaRepository<Tag, Integer> {
    Optional<Tag> findByContent(String content);
}

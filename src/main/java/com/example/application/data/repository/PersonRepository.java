package com.example.application.data.repository;

import java.util.UUID;
import com.example.application.data.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, UUID> {

}

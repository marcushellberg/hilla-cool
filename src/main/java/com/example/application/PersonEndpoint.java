package com.example.application;

import java.util.List;
import com.example.application.data.entity.Person;
import com.example.application.data.repository.PersonRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;

@Endpoint
@AnonymousAllowed
public class PersonEndpoint {

  private PersonRepository repo;

  PersonEndpoint(PersonRepository repo) {
    this.repo = repo;
  }

  public List<Person> getPeople() {
    return repo.findAll();
  }
}

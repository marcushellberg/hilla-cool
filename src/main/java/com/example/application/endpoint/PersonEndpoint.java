package com.example.application.endpoint;

import java.time.Duration;
import java.util.List;
import com.example.application.data.entity.Person;
import com.example.application.data.repository.PersonRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import reactor.core.publisher.Flux;

@Endpoint
@AnonymousAllowed
public class PersonEndpoint {

  private PersonRepository repo;

  PersonEndpoint(PersonRepository repo) {
    this.repo = repo;
  }


  public List<Person> findAll() {
    return repo.findAll();
  }

  public Person save(Person p) {
    return repo.save(p);
  }

  public Flux<String> getNames() {
    return Flux.just("Barry", "Lettie", "Cora").delayElements(Duration.ofSeconds(2));
  }
}

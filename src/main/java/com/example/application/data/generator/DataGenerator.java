package com.example.application.data.generator;

import java.time.LocalDateTime;
import java.util.Random;
import com.example.application.data.entity.Person;
import com.example.application.data.repository.PersonRepository;
import com.vaadin.exampledata.DataType;
import com.vaadin.exampledata.ExampleDataGenerator;
import com.vaadin.flow.spring.annotation.SpringComponent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

@SpringComponent
public class DataGenerator {

    @Bean
    public CommandLineRunner loadData(PersonRepository contactRepository) {

        return args -> {
            Logger logger = LoggerFactory.getLogger(getClass());
            if (contactRepository.count() != 0L) {
                logger.info("Using existing database");
                return;
            }
            int seed = 123;

            logger.info("Generating demo data");

            logger.info("... generating 50 Person entities...");
            ExampleDataGenerator<Person> contactGenerator = new ExampleDataGenerator<>(Person.class,
                    LocalDateTime.now());
            contactGenerator.setData(Person::setFirstName, DataType.FIRST_NAME);
            contactGenerator.setData(Person::setLastName, DataType.LAST_NAME);
            contactGenerator.setData(Person::setEmail, DataType.EMAIL);

            Random r = new Random(seed);
            contactRepository.saveAll(contactGenerator.create(50, seed));

            logger.info("Generated demo data");
        };
    }

}

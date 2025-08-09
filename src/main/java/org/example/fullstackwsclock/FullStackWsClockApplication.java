package org.example.fullstackwsclock;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class FullStackWsClockApplication {

    public static void main(String[] args) {
        SpringApplication.run(FullStackWsClockApplication.class, args);
    }

}

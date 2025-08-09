package org.example.fullstackwsclock;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class TimestampPublisher {

    private final SimpMessagingTemplate messagingTemplate;
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public TimestampPublisher(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @Scheduled(fixedRate = 1000) // every 1 second
    public void publishTimestamp() {
        String currentTime = LocalDateTime.now().format(formatter);
        messagingTemplate.convertAndSend("/topic/timestamp", currentTime);
    }
}

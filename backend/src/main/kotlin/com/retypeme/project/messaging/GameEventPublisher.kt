package com.retypeme.project.messaging

import org.slf4j.LoggerFactory
import org.springframework.context.ApplicationEventPublisher
import org.springframework.stereotype.Component


@Component
class GameEventPublisher(private val applicationEventPublisher: ApplicationEventPublisher) {

    private val logger = LoggerFactory.getLogger(GameEventPublisher::class.java)

    fun publishRaceCreated(id: String, users: MutableList<String>) {
        logger.info("publishRaceReady session id: $id users: $users")
        applicationEventPublisher.publishEvent(RaceCreatedEvent(this, id, users))
    }

    fun publishRaceReady(id: String, users: MutableList<String>) {
        logger.info("publishRaceReady session id: $id users: $users")
        applicationEventPublisher.publishEvent(RaceReadyEvent(this, id, users))
    }

    fun publishWinnerFinished(sessionId: String, winnerId: String) {
        logger.info("publishWinnerFinished session id: $sessionId winnerId: $winnerId")
        applicationEventPublisher.publishEvent(WinnerFinishedEvent(this, sessionId, winnerId))
    }
}
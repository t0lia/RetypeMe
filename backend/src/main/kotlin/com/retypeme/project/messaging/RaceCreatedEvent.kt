package com.retypeme.project.messaging

import org.springframework.context.ApplicationEvent

/**
 * This event when Session is ready to start
 */
class RaceCreatedEvent(
    source: GameEventPublisher,
    val id: String,
    val users: MutableList<String>
) : ApplicationEvent(source)
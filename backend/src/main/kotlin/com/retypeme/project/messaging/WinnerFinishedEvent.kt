package com.retypeme.project.messaging

import org.springframework.context.ApplicationEvent


/**
 * This event when Session is ready to start
 */
class WinnerFinishedEvent(
    source: GameEventPublisher,
    val sessionId: String,
    val winnerId: String
) : ApplicationEvent(source)
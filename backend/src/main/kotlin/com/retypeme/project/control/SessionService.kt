package com.retypeme.project.control

import com.retypeme.project.messaging.GameEventPublisher
import com.retypeme.project.model.JoinSessionResponse
import com.retypeme.project.model.SessionResponse
import org.springframework.stereotype.Service

@Service
class SessionService(
    private val repository: SessionRepository,
    private val gameEventPublisher: GameEventPublisher
) {

    fun createSession(players: Int): SessionResponse {
        return SessionResponse(repository.createSession(players).id)
    }

    fun joinSession(sessionId: String, userId: String?): JoinSessionResponse {
        val session = repository.getSessionById(sessionId)

        if (session.isFull()) {
            throw SessionStartedException("Session is full")
        }

        val result = repository.joinSession(sessionId, userId)

        if (session.isFull()) {
            gameEventPublisher.publishRaceReady(sessionId, session.users)
        }

        return JoinSessionResponse(sessionId, result)
    }

    fun getAllSessions(): List<SessionResponse> {
        return repository.getAllSessions()
            .map { session -> SessionResponse(session.id, session.users) }
    }

    fun getSessionById(id: String): SessionResponse {
        val session = repository.getSessionById(id)
        return SessionResponse(session.id, session.users)
    }

}
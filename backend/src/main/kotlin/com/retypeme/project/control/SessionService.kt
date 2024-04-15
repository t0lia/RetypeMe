package com.retypeme.project.control

import com.retypeme.project.messaging.GameEventPublisher
import com.retypeme.project.model.SessionResponse
import org.springframework.stereotype.Service

@Service
class SessionService(
    private val repository: SessionRepository,
    private val gameEventPublisher: GameEventPublisher
) {

    fun createSession(players: Int, chain: Int): SessionResponse {
        val session: Session = repository.createSession(players, chain)

        gameEventPublisher.publishRaceCreated(session.id, chain, session.players)
        return SessionResponse(session.id)
    }

    fun getAllSessions(): List<SessionResponse> {
        return repository.getAllSessions()
            .map { session -> SessionResponse(session.id, session.players) }
    }

    fun getSessionById(id: String): SessionResponse {
        val session: Session = repository.getSessionById(id)
        return SessionResponse(session.id, session.chain, session.players)
    }

}
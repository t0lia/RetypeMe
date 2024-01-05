package com.retypeme.backend.service

import com.retypeme.backend.conroller.websock.model.SessionStat
import com.retypeme.backend.conroller.websock.model.UserStat
import com.retypeme.backend.model.JoinSessionResponse
import com.retypeme.backend.model.Session
import com.retypeme.backend.model.SessionResponse
import com.retypeme.backend.repository.SessionRepository
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.stereotype.Service

@Service
class SessionService(
    private val simpMessagingTemplate: SimpMessagingTemplate,
    private val repository: SessionRepository,
    private val countDownService: CountDownService
) {

    fun getRepository(): SessionRepository {
        return repository
    }

    fun createSession(players: Int): SessionResponse {
        return SessionResponse(repository.createSession(players).id)
    }

    fun joinSession(sessionId: String): JoinSessionResponse {
        val result = repository.joinSession(sessionId)
        val session = repository.getSessionById(sessionId)

        if (session.users.count() >= session.players) {
            countDownService.submit(sessionId)
        }

        return JoinSessionResponse(sessionId, result.userId)
    }


    fun getAllSessions(): List<SessionResponse> {
        return repository.getAllSessions()
            .map { session -> SessionResponse(session.id, session.users.map { it.id }) }
    }

    fun getSessionById(id: String): SessionResponse {
        val session = repository.getSessionById(id)
        return SessionResponse(session.id, session.users.map { it.id })
    }

    fun updateProgress(userStat: UserStat): SessionStat {
        repository.updateProgress(userStat.sessionId, userStat.userId, userStat.progress)
        return getStat(userStat.sessionId)
    }

    fun start(sessionId: String, text:String): Unit {
        repository.start(sessionId, text)

    }

    fun getStat(sessionId: String): SessionStat {
        val session: Session = repository.getSessionById(sessionId)
        return SessionStat(session.id, session.users)
    }

}
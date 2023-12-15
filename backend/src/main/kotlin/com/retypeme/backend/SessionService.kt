package com.retypeme.backend

import com.retypeme.backend.model.JoinSessionResponse
import com.retypeme.backend.model.SessionResponse
import org.springframework.stereotype.Service

@Service
class SessionService {

    private val sessionMap = mutableMapOf<String, Session>()

    fun createSession(): SessionResponse {
        val session = Session()
        session.id = java.util.UUID.randomUUID().toString()
        sessionMap[session.id!!] = session
        return SessionResponse(session.id!!)
    }

    fun joinSession(sessionId: String): JoinSessionResponse {
        val session = sessionMap[sessionId] ?: throw Exception("Session not found")
        val user = User()
        user.id = java.util.UUID.randomUUID().toString()
        session.users.add(user)
        return JoinSessionResponse(sessionId, user.id!!)
    }

    fun getAllSessions(): List<SessionResponse> {
        return sessionMap.values.map { SessionResponse(it.id!!, it.users.map { it.id!! }) }
    }

    fun getSessionById(id: String): SessionResponse {
        val session = sessionMap[id] ?: throw Exception("Session not found")
        return SessionResponse(session.id!!, session.users.map { it.id!! })
    }

}
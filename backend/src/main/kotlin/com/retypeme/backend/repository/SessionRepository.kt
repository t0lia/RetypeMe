package com.retypeme.backend.repository

import com.retypeme.backend.model.*
import org.springframework.stereotype.Component
import java.util.UUID.randomUUID

@Component
class SessionRepository(private val openSessions: MutableMap<String, Session> = mutableMapOf()) {

    fun createSession(players: Int): Session {
        val session = Session(randomUUID().toString(), players)
        openSessions[session.id] = session
        return session
    }

    fun joinSession(sessionId: String): SessionUser {
        val user = User(randomUUID().toString(), 0)
        getSessionById(sessionId).users.add(user)
        return SessionUser(sessionId, user.id)
    }

    fun getAllSessions(): List<Session> {
        return openSessions.values.map { it }
    }

    fun getSessionById(id: String): Session {
        return openSessions[id] ?: throw Exception("Session not found")
    }

    fun updateProgress(sessionId: String, userId: String, progress: Int): Unit {
        val session = getSessionById(sessionId)
        val user: User = session.users.find { u -> u.id == userId } ?: throw Exception("User not found")
        user.progress = progress
    }
}
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
        val user = User(randomUUID().toString(), 0, 0)
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
        val session: Session = getSessionById(sessionId)
        val user: User = session.users.find { u -> u.id == userId } ?: throw Exception("User not found")
        if (user.progress < 100) {
            updateUser(user, progress, session)
        }
    }

    private fun updateUser(user: User, progress: Int, session: Session) {
        user.progress = progress
        if (progress == 100) {
            user.place = session.users.count { u -> u.progress == 100 }
        }
    }
}
package com.retypeme.project.control

import org.springframework.stereotype.Component
import java.util.UUID.randomUUID

@Component
class SessionRepository {

    private val openSessions: MutableMap<String, Session> = mutableMapOf()

    fun createSession(players: Int): Session {
        val session = Session(randomUUID().toString(), players)
        openSessions[session.id] = session
        return session
    }

    fun joinSession(sessionId: String, userId: String?): String {
        val session = getSessionById(sessionId)

        if (userId != null && session.users.contains(userId)) {
            return userId
        }

        val result = userId ?: randomUUID().toString()
        session.users.add(result)
        return result
    }

    fun getAllSessions(): List<Session> {
        return openSessions.values.map { it }
    }

    fun getSessionById(id: String): Session {
        return openSessions[id] ?: throw Exception("Session not found")
    }

}
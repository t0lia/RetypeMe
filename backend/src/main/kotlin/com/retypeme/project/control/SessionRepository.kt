package com.retypeme.project.control

import org.springframework.stereotype.Component
import kotlin.random.Random

@Component
class SessionRepository {

    private val openSessions: MutableMap<String, Session> = mutableMapOf()

    fun createSession(players: Int, chain: Int): Session {
        var sessionId: String
        do {
            sessionId = Random.nextInt(11111, 99999).toString()
        } while (openSessions.containsKey(sessionId))

        val session = Session(sessionId, chain, players)
        openSessions[sessionId] = session
        return session
    }

    fun getAllSessions(): List<Session> {
        return openSessions.values.map { it }
    }

    fun getSessionById(id: String): Session {
        return openSessions[id] ?: throw Exception("Session not found")
    }

}
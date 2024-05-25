package com.retypeme.project.control

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.redis.core.HashOperations
import org.springframework.data.redis.core.RedisTemplate
import org.springframework.stereotype.Repository
import kotlin.random.Random

@Repository
class SessionRepository(@Autowired val redisTemplate: RedisTemplate<String, Session>) {

    private val hashOps: HashOperations<String, String, Session> by lazy {
        redisTemplate.opsForHash()
    }

    fun createSession(players: Int, chain: Int): Session {
        var sessionId: String
        do {
            sessionId = Random.nextInt(11111, 99999).toString()
        } while (hashOps.hasKey("sessions", sessionId))

        val session = Session(sessionId, chain, players)
        hashOps.put("sessions", sessionId, session)
        return session
    }

    fun getAllSessions(): List<Session> {
        return hashOps.entries("sessions").values.toList()
    }

    fun getSessionById(id: String): Session {
        return hashOps.get("sessions", id) ?: throw Exception("Session not found")
    }

}
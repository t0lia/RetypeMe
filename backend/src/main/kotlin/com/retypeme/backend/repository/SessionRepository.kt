package com.retypeme.backend.repository

import com.retypeme.backend.model.*
import com.retypeme.backend.service.DateTimeProvider
import org.springframework.stereotype.Component
import java.time.LocalDateTime
import java.time.ZoneOffset.UTC
import java.util.UUID.randomUUID

@Component
class SessionRepository(private val dateTimeProvider: DateTimeProvider) {

    private val openSessions: MutableMap<String, Session> = mutableMapOf()

    fun createSession(players: Int): Session {
        val now: LocalDateTime = dateTimeProvider.now()
        val session = Session(randomUUID().toString(), "", null, now, players)
        openSessions[session.id] = session
        return session
    }

    fun joinSession(sessionId: String): SessionUser {
        val user = User(randomUUID().toString(), 0, 0, 0)
        getSessionById(sessionId).users.add(user)
        return SessionUser(sessionId, user.id)
    }

    fun getAllSessions(): List<Session> {
        return openSessions.values.map { it }
    }

    fun getSessionById(id: String): Session {
        return openSessions[id] ?: throw Exception("Session not found")
    }

    fun start(sessionId: String, text: String): Unit {
        val session: Session = getSessionById(sessionId)
        session.startedAt = dateTimeProvider.now()
        session.text = text
    }

    fun updateProgress(sessionId: String, userId: String, progress: Int): Unit {
        val session: Session = getSessionById(sessionId)
        val user: User = session.users.find { u -> u.id == userId } ?: throw Exception("User not found")
        if (user.progress < 100) {
            updateUser(user, progress, session)
        }
    }

    private fun updateUser(user: User, progress: Int, session: Session) {
        session.updatedAt = dateTimeProvider.now()
        user.progress = progress
        user.cpm = evalCpm(session, progress)

        if (progress == 100) {
            user.place = session.users.count { u -> u.progress == 100 }
        }
    }

    private fun evalCpm(session: Session, progress: Int): Int {
        val typedChars: Int = (session.text.length * progress) / 100
        val time: Long = session.updatedAt.toEpochSecond(UTC) - session.startedAt!!.toEpochSecond(UTC)
        return ((typedChars * 60) / time).toInt()
    }
}
package com.retypeme.project.racing.repository

import com.retypeme.project.messaging.GameEventPublisher
import com.retypeme.project.racing.model.Race
import com.retypeme.project.racing.controller.DriverMetrics
import com.retypeme.project.racing.service.DateTimeProvider
import org.springframework.stereotype.Component
import java.time.LocalDateTime
import java.time.ZoneOffset.UTC

const val JOINED = "joined"
const val REGISTERED = "registered"

@Component
class RaceRepository(
    private val dateTimeProvider: DateTimeProvider,
    private val gameEventPublisher: GameEventPublisher
) {

    private val openRaces: MutableMap<String, Race> = mutableMapOf()

    fun createRace(id: String, users: Int): Race {
        val now: LocalDateTime = dateTimeProvider.now()
        val usersList: MutableList<DriverMetrics> = mutableListOf()
        val session = Race(id, "", users, null, now, usersList)
        openRaces[session.id] = session
        return session
    }

    fun getSessionById(id: String): Race {
        return openRaces[id] ?: throw Exception("Session not found")
    }

    fun start(sessionId: String, text: String): Unit {
        val session: Race = getSessionById(sessionId)
        session.startedAt = dateTimeProvider.now()
        session.text = text
    }

    fun updateRegistration(sessionId: String, userId: String, walletId: String, state: String): Unit {
        val race: Race = getSessionById(sessionId)
        if (state == JOINED) {
            join(sessionId, userId, walletId)
        }
        if (state == REGISTERED) {
            register(race, userId, sessionId)
        }
    }

    private fun register(race: Race, userId: String, sessionId: String) {
        val user: DriverMetrics =
            race.users.find { u -> u.userId == userId && u.state == JOINED } ?: throw Exception("User not found")
        user.state = REGISTERED;
        if (race.isReady()) {
            gameEventPublisher.publishRaceReady(
                sessionId, race.users.map { u -> u.userId }.toMutableList()
            )
        }
    }

    fun join(sessionId: String, userId: String, walletId: String): Unit {
        val session = getSessionById(sessionId)

        if (session.users.map { u -> u.userId }.contains(userId)) {
            val user: DriverMetrics = session.users.find { u -> u.userId == userId } ?: throw Exception("User not found")
            user.walletId = walletId
        } else {
            session.users.add(DriverMetrics(sessionId, userId, walletId, 0, 0, 0, JOINED))
        }
    }

    fun updateProgress(sessionId: String, userId: String, progress: Int): Unit {
        val race: Race = getSessionById(sessionId)
        val user: DriverMetrics = race.users.find { u -> u.userId == userId } ?: throw Exception("User not found")
        if (user.progress < 100) {
            updateUser(user, progress, race)
        }
    }

    private fun updateUser(user: DriverMetrics, progress: Int, session: Race) {
        session.updatedAt = dateTimeProvider.now()
        user.progress = progress
        user.cpm = evalCpm(session, progress)

        if (progress == 100) {
            user.place = session.users.count { u -> u.progress == 100 }
            if (user.place == 1 && user.walletId.isNotEmpty() && user.walletId.startsWith("0x")) {
                gameEventPublisher.publishWinnerFinished(session.id, user.userId)
            }
        }
    }

    private fun evalCpm(session: Race, progress: Int): Int {
        val typedChars: Int = (session.text.length * progress) / 100
        val time: Long = session.updatedAt.toEpochSecond(UTC) - session.startedAt!!.toEpochSecond(UTC)
        return ((typedChars * 60) / time).toInt()
    }
}
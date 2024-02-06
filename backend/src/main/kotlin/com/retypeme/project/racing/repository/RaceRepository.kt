package com.retypeme.project.racing.repository

import com.retypeme.project.messaging.GameEventPublisher
import com.retypeme.project.racing.model.Race
import com.retypeme.project.racing.controller.RacerStat
import com.retypeme.project.racing.service.DateTimeProvider
import org.springframework.stereotype.Component
import java.time.LocalDateTime
import java.time.ZoneOffset.UTC

@Component
class RaceRepository(
    private val dateTimeProvider: DateTimeProvider,
    private val gameEventPublisher: GameEventPublisher
) {

    private val openRaces: MutableMap<String, Race> = mutableMapOf()

    fun createRace(id: String, users: MutableList<String>): Race {
        val now: LocalDateTime = dateTimeProvider.now()
        val usersList: MutableList<RacerStat> = users.map { RacerStat(it, 0, 0, 0, "new") }.toMutableList()
        val session = Race(id, "", null, now, usersList)
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

    fun updateRegistration(sessionId: String, userId: String, state: String): Unit {
        val race: Race = getSessionById(sessionId)
        if (state == "joined") {
            join(sessionId, userId)
        }
        if (state == "registered") {
            register(race, userId, sessionId)
        }
    }

    private fun register(race: Race, userId: String, sessionId: String) {
        val user: RacerStat = race.users.find { u -> u.id == userId && u.state == "joined" }
            ?: throw Exception("User not found")
        user.state = "registered";
        if (race.users.all { u -> u.state == "registered" }) {
            gameEventPublisher.publishRaceReady(
                sessionId, race.users.map { u -> u.id }.toMutableList()
            )
        }
    }

    fun join(sessionId: String, userId: String): Unit {
        val session = getSessionById(sessionId)

        // don't join second time
        if (session.users.map { u -> u.id }.contains(userId)) {
            return
        }
        session.users.add(RacerStat(userId, 0, 0, 0, "joined"))
    }

    fun updateProgress(sessionId: String, userId: String, progress: Int): Unit {
        val race: Race = getSessionById(sessionId)
        val user: RacerStat = race.users.find { u -> u.id == userId } ?: throw Exception("User not found")
        if (user.progress < 100) {
            updateUser(user, progress, race)
        }
    }

    private fun updateUser(user: RacerStat, progress: Int, session: Race) {
        session.updatedAt = dateTimeProvider.now()
        user.progress = progress
        user.cpm = evalCpm(session, progress)

        if (progress == 100) {
            user.place = session.users.count { u -> u.progress == 100 }
            if (user.place == 1) {
                gameEventPublisher.publishWinnerFinished(session.id, user.id)
            }
        }
    }

    private fun evalCpm(session: Race, progress: Int): Int {
        val typedChars: Int = (session.text.length * progress) / 100
        val time: Long = session.updatedAt.toEpochSecond(UTC) - session.startedAt!!.toEpochSecond(UTC)
        return ((typedChars * 60) / time).toInt()
    }

}
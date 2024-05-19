package com.retypeme.project.racing.repository

import com.retypeme.project.chain.ChainService
import com.retypeme.project.messaging.GameEventPublisher
import com.retypeme.project.racing.model.Race
import com.retypeme.project.racing.controller.DriverMetrics
import com.retypeme.project.racing.service.DateTimeProvider
import com.retypeme.project.statistic.service.LeaderboardService
import com.retypeme.project.statistic.service.StatisticService
import org.springframework.stereotype.Component
import java.time.LocalDateTime
import java.time.ZoneOffset.UTC

const val JOINED = "joined"
const val REGISTERED = "registered"

@Component
class RaceRepository(
    private val dateTimeProvider: DateTimeProvider,
    private val gameEventPublisher: GameEventPublisher,
    private val chainService: ChainService,
    private val userStatisticService: StatisticService,
    private val leaderboardService: LeaderboardService
) {

    private val openRaces: MutableMap<String, Race> = mutableMapOf()

    fun createRace(id: String, chain: Int, users: Int): Race {
        val now: LocalDateTime = dateTimeProvider.now()
        val usersList: MutableList<DriverMetrics> = mutableListOf()
        val session = Race(id, chain, "", users, null, now, usersList)
        openRaces[session.id] = session
        return session
    }

    fun getSessionById(id: String): Race {
        return openRaces[id] ?: throw Exception("Session not found")
    }

    fun start(sessionId: String, text: String) {
        val session: Race = getSessionById(sessionId)
        session.startedAt = dateTimeProvider.now()
        session.text = text
    }

    fun updateRegistration(
        sessionId: String,
        chain: Int,
        userId: String,
        walletId: String,
        state: String
    ): List<String> {
        val race: Race = getSessionById(sessionId)
        if (race.chain != chain) {
            val expected = chainService.getChainById(race.chain).name
            val actual = chainService.getChainById(chain).name
            val msg = "Session is created for different chain, expected: $expected, got: $actual"
            return mutableListOf(msg)
        }
        if (state == JOINED) {
            join(sessionId, userId, walletId)
        }
        if (state == REGISTERED) {
            register(race, userId, sessionId)
        }
        return mutableListOf()
    }

    private fun register(race: Race, userId: String, sessionId: String) {
        val user: DriverMetrics =
            race.users.find { u -> u.userId == userId && u.state == JOINED } ?: throw Exception("User not found")
        user.state = REGISTERED
        if (race.isReady()) {
            gameEventPublisher.publishRaceReady(
                sessionId, race.users.map { u -> u.userId }.toMutableList()
            )
        }
    }

    fun join(sessionId: String, userId: String, walletId: String) {
        val session = getSessionById(sessionId)
        if (session.users.map { u -> u.userId }.contains(userId)) {
            val user: DriverMetrics =
                session.users.find { u -> u.userId == userId } ?: throw Exception("User not found")
            user.walletId = walletId
        } else {
            session.users.add(DriverMetrics(sessionId, userId, walletId, 0, 0, 0, JOINED))
        }
    }

    fun updateProgress(sessionId: String, userId: String, progress: Int) {
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
                gameEventPublisher.publishWinnerFinished(session.id, user.walletId)
            }

            val duelDate = session.startedAt?.toLocalDate()
            if (duelDate != null) {
                val won = user.place == 1
                userStatisticService.updateUserStatistic(user.walletId, user.cpm.toDouble(), won)
                leaderboardService.addUserScore(user.walletId, user.cpm.toDouble())
            }
        }
    }

    private fun evalCpm(session: Race, progress: Int): Int {
        val typedChars: Int = (session.text.length * progress) / 100
        val time: Long = session.updatedAt.toEpochSecond(UTC) - session.startedAt!!.toEpochSecond(UTC)
        return ((typedChars * 60) / time).toInt()
    }
}

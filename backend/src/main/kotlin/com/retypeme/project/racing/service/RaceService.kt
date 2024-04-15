package com.retypeme.project.racing.service

import com.retypeme.project.messaging.RaceCreatedEvent
import com.retypeme.project.racing.controller.RaceStatistic
import com.retypeme.project.racing.controller.RacerRegistrationIncomingInfo
import com.retypeme.project.racing.controller.DriverMetrics
import com.retypeme.project.racing.model.Race
import com.retypeme.project.racing.repository.RaceRepository
import org.springframework.context.event.EventListener
import org.springframework.stereotype.Service

@Service
class RaceService(private val repository: RaceRepository) {


    @EventListener
    fun onSessionReady(event: RaceCreatedEvent) {
        repository.createRace(event.id, event.chain, event.userCount)
    }

    fun updateRegistration(info: RacerRegistrationIncomingInfo): RaceStatistic {
        val errors: List<String> =
            repository.updateRegistration(info.sessionId, info.chain, info.userId, info.walletId, info.state)
        if (errors.isEmpty()) {
            return getRegistration(info.sessionId)
        }
        return getError(errors, info.sessionId)
    }

    fun updateProgress(driverMetrics: DriverMetrics): RaceStatistic {
        repository.updateProgress(driverMetrics.sessionId, driverMetrics.userId, driverMetrics.progress)
        return getStat(driverMetrics.sessionId)
    }

    fun getError(errors: List<String>, sessionId: String): RaceStatistic {
        return RaceStatistic(sessionId, errors = errors)
    }

    fun getRegistration(sessionId: String): RaceStatistic {
        val session: Race = repository.getSessionById(sessionId)
        return RaceStatistic(session.id, session.users)
    }

    fun getStat(sessionId: String): RaceStatistic {
        val session: Race = repository.getSessionById(sessionId)
        return RaceStatistic(session.id, session.users)
    }

}
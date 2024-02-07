package com.retypeme.project.racing.service

import com.retypeme.project.messaging.RaceCreatedEvent
import com.retypeme.project.racing.model.Race
import com.retypeme.project.racing.repository.RaceRepository
import com.retypeme.project.racing.controller.RaceStat
import com.retypeme.project.racing.controller.RacerIncomingStat
import com.retypeme.project.racing.controller.RacerRegistrationIncomingInfo
import org.springframework.context.event.EventListener
import org.springframework.stereotype.Service

@Service
class RaceService(private val repository: RaceRepository) {


    @EventListener
    fun onSessionReady(event: RaceCreatedEvent) {
        repository.createRace(event.id, event.userCount)
    }

    fun updateRegistration(info: RacerRegistrationIncomingInfo): RaceStat {
        repository.updateRegistration(info.sessionId, info.userId, info.walletId, info.state)
        return getRegistration(info.sessionId)
    }

    fun updateProgress(userStat: RacerIncomingStat): RaceStat {
        repository.updateProgress(userStat.sessionId, userStat.userId, userStat.progress)
        return getStat(userStat.sessionId)
    }

    fun getRegistration(sessionId: String): RaceStat {
        val session: Race = repository.getSessionById(sessionId)
        return RaceStat(session.id, session.users)
    }

    fun getStat(sessionId: String): RaceStat {
        val session: Race = repository.getSessionById(sessionId)
        return RaceStat(session.id, session.users)
    }

}
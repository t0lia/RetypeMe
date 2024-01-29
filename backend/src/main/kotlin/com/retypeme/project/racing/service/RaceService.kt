package com.retypeme.project.racing.service

import com.retypeme.project.messaging.RaceReadyEvent
import com.retypeme.project.racing.model.Race
import com.retypeme.project.racing.repository.RaceRepository
import com.retypeme.project.racing.controller.RaceStat
import com.retypeme.project.racing.controller.RacerIncomingStat
import org.springframework.context.event.EventListener
import org.springframework.stereotype.Service

@Service
class RaceService(private val repository: RaceRepository) {


    @EventListener
    fun onSessionReady(event: RaceReadyEvent) {
        repository.createRace(event.id, event.users)
    }

    fun updateProgress(userStat: RacerIncomingStat): RaceStat {
        repository.updateProgress(userStat.sessionId, userStat.userId, userStat.progress)
        return getStat(userStat.sessionId)
    }

    fun getStat(sessionId: String): RaceStat {
        val session: Race = repository.getSessionById(sessionId)
        return RaceStat(session.id, session.users)
    }

}
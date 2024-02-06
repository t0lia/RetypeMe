package com.retypeme.project.racing.service

import com.retypeme.project.messaging.RaceCreatedEvent
import com.retypeme.project.messaging.RaceReadyEvent
import com.retypeme.project.racing.model.CountDown
import com.retypeme.project.racing.repository.RaceRepository
import org.springframework.context.event.EventListener
import org.springframework.stereotype.Service
import java.util.concurrent.ConcurrentHashMap

private const val COUNTDOWN_INITIAL = 3

@Service
class CountDownService(
    private val textGenerator: TextGenerator,
    private val sessionRepository: RaceRepository
) {

    private val countMap: MutableMap<String, Int> = ConcurrentHashMap<String, Int>()

    @EventListener
    fun onSessionReady(event: RaceReadyEvent) {
        countMap[event.id] = COUNTDOWN_INITIAL
    }

    fun countDown(): List<CountDown> {
        if (countMap.isEmpty()) {
            return emptyList()
        }
        val sessions: MutableSet<String> = countMap.keys
        return sessions.map(::countDownSession)
    }

    private fun countDownSession(sessionId: String): CountDown {
        val count: Int = countMap[sessionId] ?: 0
        countMap[sessionId] = count - 1
        if (count <= 0) {
            val text = textGenerator.generateText()
            sessionRepository.start(sessionId, text)
            countMap.remove(sessionId)
            return CountDown(sessionId, text, 0)
        }
        return CountDown(sessionId, "", count)
    }
}
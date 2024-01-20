package com.retypeme.project.common.service

import com.retypeme.project.racing.model.CountDown
import com.retypeme.project.common.repository.SessionRepository
import org.springframework.stereotype.Service
import java.util.concurrent.ConcurrentHashMap

private const val COUNTDOWN_INITIAL = 3

@Service
class CountDownService(
    private val textGenerator: TextGenerator,
    private val sessionRepository: SessionRepository
) {

    private val countMap: MutableMap<String, Int> = ConcurrentHashMap<String, Int>()

    fun submit(sessionId: String) {
        countMap[sessionId] = COUNTDOWN_INITIAL
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
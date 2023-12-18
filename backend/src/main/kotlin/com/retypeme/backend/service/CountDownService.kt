package com.retypeme.backend.service

import com.retypeme.backend.conroller.websock.model.CountDown
import org.springframework.stereotype.Service

private const val COUNTDOWN_INITIAL = 5

@Service
class CountDownService {

    private val countMap: MutableMap<String, Int> = mutableMapOf()

    fun submit(sessionId: String) {
        countMap[sessionId] = COUNTDOWN_INITIAL
    }

    fun countDown(): List<CountDown> {
        val sessions: MutableSet<String> = countMap.keys
        return sessions.map(::handleSession)
    }

    private fun handleSession(sessionId: String): CountDown {
        val count: Int = countMap[sessionId] ?: 0
        countMap[sessionId] = count - 1
        if (count <= 0) {
            countMap.remove(sessionId)
        }
        return CountDown(sessionId, count)
    }
}
package com.retypeme.backend.service

import com.retypeme.backend.conroller.websock.model.CountDown
import org.springframework.stereotype.Service
import java.util.concurrent.ConcurrentHashMap

private const val COUNTDOWN_INITIAL = 3

@Service
class CountDownService {

    // concurrent hash map
    private val countMap: MutableMap<String, Int> = ConcurrentHashMap<String, Int>()

    fun submit(sessionId: String) {
        countMap[sessionId] = COUNTDOWN_INITIAL
    }

    fun countDown(): List<CountDown> {
        if(countMap.isEmpty()) {
            return emptyList()
        }
        val sessions: MutableSet<String> = countMap.keys
        return sessions.map(::handleSession)
    }

    private fun handleSession(sessionId: String): CountDown {
        val count: Int = countMap[sessionId] ?: 0
        countMap[sessionId] = count - 1
        if (count < 0) {
            countMap.remove(sessionId)
        }
        return CountDown(sessionId, count)
    }
}
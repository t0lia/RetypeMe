package com.retypeme.project.racing.model

import com.retypeme.project.racing.controller.RacerStat
import com.retypeme.project.racing.repository.REGISTERED
import java.time.LocalDateTime

class Race(
    val id: String,
    var text: String,
    val capacity: Int,
    var startedAt: LocalDateTime?,
    var updatedAt: LocalDateTime,
    val users: MutableList<RacerStat> = mutableListOf()
) {
    fun isReady(): Boolean {
        return users.all { u -> u.state == REGISTERED } && users.size == capacity
    }

    fun isFinished(): Boolean {
        return users.all { it.progress == 100 }
    }
}
package com.retypeme.project.racing.model

import com.retypeme.project.racing.controller.RacerStat
import java.time.LocalDateTime

class Race(
    val id: String,
    var text: String,
    var startedAt: LocalDateTime?,
    var updatedAt: LocalDateTime,
    val users: MutableList<RacerStat> = mutableListOf()) {

    fun isFinished(): Boolean {
        return users.all { it.progress == 100 }
    }
}
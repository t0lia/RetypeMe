package com.retypeme.backend.model

import java.time.LocalDateTime

class Session(
    val id: String,
    var text: String,
    var startedAt: LocalDateTime?,
    var updatedAt: LocalDateTime,
    val players: Int,
    val users: MutableList<User> = mutableListOf()) {

    fun isFinished(): Boolean {
        return users.all { it.progress == 100 }
    }
}
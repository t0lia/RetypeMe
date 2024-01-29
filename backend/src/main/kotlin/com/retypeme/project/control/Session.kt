package com.retypeme.project.control

class Session(
    val id: String,
    private val players: Int,
    val users: MutableList<String> = mutableListOf()
) {
    fun isFull(): Boolean {
        return users.count() >= players
    }
}
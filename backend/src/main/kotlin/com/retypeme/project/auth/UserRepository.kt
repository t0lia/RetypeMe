package com.retypeme.project.auth

import org.springframework.stereotype.Repository
import java.util.concurrent.ConcurrentHashMap


@Repository
class UserRepository {
    private val users: MutableMap<String, User> = ConcurrentHashMap()

    fun getUser(id: String): User = users.computeIfAbsent(id) { User(it) }
}
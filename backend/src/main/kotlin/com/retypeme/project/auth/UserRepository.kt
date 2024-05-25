package com.retypeme.project.auth

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.redis.core.HashOperations
import org.springframework.data.redis.core.RedisTemplate
import org.springframework.stereotype.Repository

@Repository
class UserRepository(@Autowired val redisTemplate: RedisTemplate<String, User>) {

    private val hashOps: HashOperations<String, String, User> by lazy {
        redisTemplate.opsForHash()
    }

    fun getUser(id: String): User {
        return hashOps.get("users", id) ?: User(id).also { hashOps.put("users", id, it) }
    }
}
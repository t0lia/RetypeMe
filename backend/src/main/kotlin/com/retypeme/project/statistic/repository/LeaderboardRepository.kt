package com.retypeme.project.statistic.repository

import com.retypeme.project.statistic.model.LeaderboardItemModel
import org.springframework.data.redis.core.RedisTemplate
import org.springframework.data.redis.core.ZSetOperations
import org.springframework.stereotype.Repository

interface LeaderboardRepository {
    fun addUserScore(userId: String, score: Double)
    fun getTopUsers(limit: Int): List<LeaderboardItemModel>
}

@Repository
class LeaderboardRepositoryImpl(private val redisTemplate: RedisTemplate<String, String>) : LeaderboardRepository {

    private val leaderboardKey = "leaderboard"

    private val zSetOps: ZSetOperations<String, String> by lazy {
        redisTemplate.opsForZSet()
    }

    override fun addUserScore(userId: String, score: Double) {
        val existingScore = zSetOps.score(leaderboardKey, userId)
        if (existingScore == null || score > existingScore) {
            zSetOps.add(leaderboardKey, userId, score)
        }
    }

    override fun getTopUsers(limit: Int): List<LeaderboardItemModel> {
        val topUsers = zSetOps.reverseRangeWithScores(leaderboardKey, 0, (limit - 1).toLong())
        return topUsers?.map { LeaderboardItemModel(it.value ?: "", it.score ?: 0.0) } ?: emptyList()
    }
}

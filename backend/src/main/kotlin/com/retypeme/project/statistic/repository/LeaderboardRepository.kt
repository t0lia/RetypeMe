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
class LeaderboardRepositoryImpl(private val redisTemplate: RedisTemplate<String, LeaderboardItemModel>) :
    LeaderboardRepository {

    private val leaderboardKey = "leaderboard"

    override fun addUserScore(userId: String, score: Double) {
        val zSetOps: ZSetOperations<String, LeaderboardItemModel> = redisTemplate.opsForZSet()
        val existingScore = zSetOps.score(leaderboardKey, userId)

        if (existingScore == null || score > existingScore) {
            zSetOps.add(leaderboardKey, LeaderboardItemModel(userId, score), score)
        }
    }

    override fun getTopUsers(limit: Int): List<LeaderboardItemModel> {
        val zSetOps: ZSetOperations<String, LeaderboardItemModel> = redisTemplate.opsForZSet()
        val topUsers: MutableSet<ZSetOperations.TypedTuple<LeaderboardItemModel>> =
            zSetOps.reverseRangeWithScores(leaderboardKey, 0, (limit - 1).toLong()) ?: return emptyList()

        return topUsers.map { it.value!! }
    }
}
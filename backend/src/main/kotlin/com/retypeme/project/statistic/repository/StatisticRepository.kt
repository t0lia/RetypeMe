package com.retypeme.project.statistic.repository

import com.retypeme.project.statistic.model.StatisticModel
import org.springframework.data.redis.core.RedisTemplate
import org.springframework.stereotype.Repository


interface StatisticRepository {
    fun save(statistic: StatisticModel)
    fun findById(userId: String): StatisticModel?
    fun findAll(): List<StatisticModel>
}


@Repository
class StatisticRepositoryImpl(private val redisTemplate: RedisTemplate<String, Any>) : StatisticRepository {

    private val hashKey = "statistic"

    override fun save(statistic: StatisticModel) {
        redisTemplate.opsForHash<String, StatisticModel>().put(hashKey, statistic.userId.lowercase(), statistic)
    }

    override fun findById(userId: String): StatisticModel? {
        return redisTemplate.opsForHash<String, StatisticModel>().get(hashKey, userId.lowercase())
    }

    override fun findAll(): List<StatisticModel> {
        return redisTemplate.opsForHash<String, StatisticModel>().values(hashKey)
    }
}
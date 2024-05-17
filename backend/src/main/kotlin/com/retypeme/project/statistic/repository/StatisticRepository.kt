package com.retypeme.project.statistic.repository

import com.retypeme.project.statistic.model.Statistic
import org.springframework.stereotype.Repository
import java.util.concurrent.ConcurrentHashMap


interface StatisticRepository {
    fun save(userStatistic: Statistic)
    fun findById(userId: String): Statistic?
    fun findAll(): List<Statistic>
}

@Repository
class UserStatisticRepositoryImpl : StatisticRepository {
    private val userStatistics = ConcurrentHashMap<String, Statistic>()

    override fun save(userStatistic: Statistic) {
        userStatistics[userStatistic.userId] = userStatistic
    }

    override fun findById(userId: String): Statistic? {
        return userStatistics[userId]
    }

    override fun findAll(): List<Statistic> {
        return userStatistics.values.toList()
    }
}

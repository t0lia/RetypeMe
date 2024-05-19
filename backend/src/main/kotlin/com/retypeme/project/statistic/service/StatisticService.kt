package com.retypeme.project.statistic.service

import com.retypeme.project.statistic.model.StatisticModel
import com.retypeme.project.statistic.repository.StatisticRepository
import org.springframework.stereotype.Service

@Service
class StatisticService(private val userStatisticRepository: StatisticRepository) {

    fun updateUserStatistic(userId: String, speed: Double, won: Boolean) {
        val existingStatisticModel = userStatisticRepository.findById(userId)

        val completedDuels = (existingStatisticModel?.completedDuels ?: 0) + 1
        val totalSpeed = (existingStatisticModel?.averageSpeed ?: 0.0) * (completedDuels - 1) + speed
        val averageSpeed = totalSpeed / completedDuels
        val maxSpeed = maxOf(existingStatisticModel?.maxSpeed ?: 0.0, speed)
        val totalReward = maxOf(existingStatisticModel?.totalReward ?: 0.0, speed)
        val overallWinsInDuels =
            if (won) (existingStatisticModel?.overallWinsInDuels ?: 0) + 1 else (existingStatisticModel?.overallWinsInDuels ?: 0)
        var topSpeeds = (existingStatisticModel?.topSpeeds ?: mutableListOf()).toMutableList()
        topSpeeds.add(speed)
        topSpeeds.sortDescending()
        if (topSpeeds.size > 10) {
            topSpeeds = topSpeeds.take(10).toMutableList()
        }

        val newStatisticModel = StatisticModel(
            userId = userId,
            completedDuels = completedDuels,
            averageSpeed = averageSpeed,
            totalReward = totalReward,
            overallWinsInDuels = overallWinsInDuels,
            maxSpeed = maxSpeed,
            topSpeeds = topSpeeds
        )

        userStatisticRepository.save(newStatisticModel)
    }


    fun createStatistic(statistic: StatisticModel) {
        userStatisticRepository.save(statistic)
    }

    fun getUserStatistic(userId: String): StatisticModel? {
        return userStatisticRepository.findById(userId)
    }
}

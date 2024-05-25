package com.retypeme.project.statistic.service

import com.retypeme.project.statistic.model.StatisticModel
import com.retypeme.project.statistic.repository.StatisticRepository
import org.springframework.stereotype.Service

@Service
class StatisticService(private val userStatisticRepository: StatisticRepository) {

    fun updateUserStatistic(userId: String, speed: Double) {
        val existingStatisticModel = userStatisticRepository.findById(userId)

        val completedDuels = (existingStatisticModel?.completedDuels ?: 0) + 1
        val totalSpeed = (existingStatisticModel?.averageSpeed ?: 0.0) * (completedDuels - 1) + speed
        val averageSpeed = totalSpeed / completedDuels
        val maxSpeed = maxOf(existingStatisticModel?.maxSpeed ?: 0.0, speed)
        val totalReward = existingStatisticModel?.totalReward ?: 0
        val overallWinsInDuels = existingStatisticModel?.overallWinsInDuels ?: 0
        val topSpeeds = existingStatisticModel?.let { getTopSpeeds(it, speed) } ?: mutableListOf()

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

    private fun getTopSpeeds(existingStatisticModel: StatisticModel, speed: Double): MutableList<Double> {
        var topSpeeds = existingStatisticModel.topSpeeds.toMutableList()
        topSpeeds.add(speed)
        topSpeeds.sortDescending()
        if (topSpeeds.size > 10) {
            topSpeeds = topSpeeds.take(10).toMutableList()
        }
        return topSpeeds
    }

    fun createStatistic(statistic: StatisticModel) {
        userStatisticRepository.save(statistic)
    }

    fun getUserStatistic(userId: String): StatisticModel? {
        return userStatisticRepository.findById(userId)
    }
}

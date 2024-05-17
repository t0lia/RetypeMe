package com.retypeme.project.statistic.service

import com.retypeme.project.statistic.model.Statistic
import com.retypeme.project.statistic.repository.StatisticRepository
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class StatisticService(private val userStatisticRepository: StatisticRepository) {

    fun updateUserStatistic(userId: String, speed: Double, won: Boolean, duelDate: LocalDate) {
        val userStatistic = userStatisticRepository.findById(userId) ?: Statistic(userId, firstDuelDate = duelDate)

        userStatistic.completedDuels++
        userStatistic.averageSpeed =
            ((userStatistic.averageSpeed * (userStatistic.completedDuels - 1)) + speed) / userStatistic.completedDuels
        if (speed > userStatistic.bestSpeed) {
            userStatistic.bestSpeed = speed
        }
        if (speed > userStatistic.maxSpeed) {
            userStatistic.maxSpeed = speed
        }
        if (won) {
            userStatistic.wins++
        }
        userStatistic.topSpeeds.add(speed)
        userStatistic.topSpeeds.sortDescending()
        if (userStatistic.topSpeeds.size > 10) {
            userStatistic.topSpeeds = userStatistic.topSpeeds.take(10).toMutableList()
        }

        userStatisticRepository.save(userStatistic)
    }

    fun getUserStatistic(userId: String): Statistic? {
        return userStatisticRepository.findById(userId)
    }
}

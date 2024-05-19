package com.retypeme.project.statistic.service

import com.retypeme.project.model.LeaderboardItem
import com.retypeme.project.statistic.model.LeaderboardItemModel
import com.retypeme.project.statistic.repository.LeaderboardRepository
import org.springframework.stereotype.Service

@Service
class LeaderboardService(private val leaderboardRepository: LeaderboardRepository) {

    fun addUserScore(userId: String, score: Double) {
        leaderboardRepository.addUserScore(userId, score)
    }

    fun getTopUsers(limit: Int): List<LeaderboardItemModel> {
        return leaderboardRepository.getTopUsers(limit)
    }
}
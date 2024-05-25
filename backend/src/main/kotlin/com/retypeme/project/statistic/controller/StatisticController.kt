package com.retypeme.project.racing.controller

import com.retypeme.project.api.StatisticsApi
import com.retypeme.project.model.LeaderboardItem
import com.retypeme.project.model.Statistic
import com.retypeme.project.statistic.model.LeaderboardItemModel
import com.retypeme.project.statistic.model.StatisticModel
import com.retypeme.project.statistic.service.LeaderboardService
import com.retypeme.project.statistic.service.StatisticService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.math.BigInteger

@RestController
@RequestMapping("/statistics")
class StatisticController(
    private val userStatisticService: StatisticService,
    private val leaderboardService: LeaderboardService
) : StatisticsApi {

    @GetMapping("/{userId}")

    override fun getStatistics(@PathVariable userId: String): ResponseEntity<Statistic> {
        val body = userStatisticService.getUserStatistic(userId)
        return ResponseEntity(convertStatisticModel(body!!), HttpStatus.OK)
    }

    @PostMapping
    override fun createStatistic(@RequestBody statistic: Statistic): ResponseEntity<Statistic> {
        userStatisticService.createStatistic(convertStatistic(statistic))
        return ResponseEntity(statistic, HttpStatus.CREATED)
    }

    @PostMapping("/leaderboard")
    override fun createLeaderboardItem(@RequestBody leaderboardItem: LeaderboardItem): ResponseEntity<LeaderboardItem> {
        leaderboardService.addUserScore(leaderboardItem.userId!!, leaderboardItem.speed!!)
        return ResponseEntity(leaderboardItem, HttpStatus.CREATED)
    }

    @GetMapping("/leaderboard")
    override fun getLeaderboard(@RequestParam limit: Int): ResponseEntity<List<LeaderboardItem>> {
        val body = leaderboardService.getTopUsers(limit).map { convertLeaderboardItemModel(it) }
        return ResponseEntity(body, HttpStatus.OK)
    }

    fun convertStatistic(statistic: Statistic): StatisticModel {
        return StatisticModel(
            userId = statistic.userId!!,
            completedDuels = statistic.completedDuels!!,
            averageSpeed = statistic.averageSpeed!!,
            totalReward = BigInteger(statistic.totalReward!!),
            overallWinsInDuels = statistic.overallWinsInDuels!!,
            maxSpeed = statistic.maxSpeed!!,
            topSpeeds = statistic.topSpeeds?.toMutableList() ?: mutableListOf()
        )
    }

    fun convertStatisticModel(statisticModel: StatisticModel): Statistic {
        return Statistic(
            userId = statisticModel.userId,
            completedDuels = statisticModel.completedDuels,
            averageSpeed = statisticModel.averageSpeed,
            totalReward = statisticModel.totalReward.toString(),
            overallWinsInDuels = statisticModel.overallWinsInDuels,
            maxSpeed = statisticModel.maxSpeed,
            topSpeeds = statisticModel.topSpeeds
        )
    }

    fun convertLeaderboardItem(leaderboard: LeaderboardItem): LeaderboardItemModel {
        return LeaderboardItemModel(
            userId = leaderboard.userId!!,
            speed = leaderboard.speed!!
        )
    }

    fun convertLeaderboardItemModel(leaderboardModel: LeaderboardItemModel): LeaderboardItem {
        return LeaderboardItem(
            userId = leaderboardModel.userId,
            speed = leaderboardModel.speed
        )
    }


}
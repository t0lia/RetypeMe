package com.retypeme.project.racing.controller

import com.retypeme.project.statistic.model.Statistic
import com.retypeme.project.statistic.service.StatisticService
import org.springframework.web.bind.annotation.*
import java.time.LocalDate

@RestController
@RequestMapping("/statistics")
class StatisticController(private val userStatisticService: StatisticService) {

    @GetMapping("/{userId}")
    fun getStatistic(@PathVariable userId: String): Statistic? {
        return userStatisticService.getUserStatistic(userId)
    }
}
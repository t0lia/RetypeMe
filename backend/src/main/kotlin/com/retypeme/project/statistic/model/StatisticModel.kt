package com.retypeme.project.statistic.model

import java.io.Serializable

data class StatisticModel(
    val userId: String,
    val completedDuels: Int,
    val averageSpeed: Double,
    val totalReward: Double,
    val overallWinsInDuels: Int,
    val maxSpeed: Double,
    val topSpeeds: List<Double>
) : Serializable
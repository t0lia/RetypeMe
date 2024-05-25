package com.retypeme.project.statistic.model

import java.io.Serializable
import java.math.BigInteger

data class StatisticModel(
    val userId: String,
    val completedDuels: Int,
    val averageSpeed: Double,
    val totalReward: BigInteger,
    val overallWinsInDuels: Int,
    val maxSpeed: Double,
    val topSpeeds: List<Double>
) : Serializable
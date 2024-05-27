package com.retypeme.project.statistic.model

import java.io.Serializable
import java.math.BigInteger

data class StatisticModel(
    val userId: String,
    val completedDuels: Int = 0,
    val averageSpeed: Double = 0.0,
    val totalReward: BigInteger = BigInteger.ZERO,
    val overallWinsInDuels: Int = 0,
    val maxSpeed: Double = 0.0,
    val topSpeeds: List<Double> = emptyList()
) : Serializable

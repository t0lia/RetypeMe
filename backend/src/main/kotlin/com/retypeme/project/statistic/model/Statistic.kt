package com.retypeme.project.statistic.model

import java.time.LocalDate

class Statistic (
    val userId: String,
    var completedDuels: Int = 0,
    var averageSpeed: Double = 0.0,
    var bestSpeed: Double = 0.0,
    var wins: Int = 0,
    var maxSpeed: Double = 0.0,
    var topSpeeds: MutableList<Double> = mutableListOf(),
    var firstDuelDate: LocalDate? = null )


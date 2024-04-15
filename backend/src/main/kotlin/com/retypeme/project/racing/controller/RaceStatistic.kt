package com.retypeme.project.racing.controller

class RaceStatistic(
    val id: String,
    val users: List<DriverMetrics> = mutableListOf(),
    val errors: List<String> = mutableListOf()
)
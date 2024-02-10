package com.retypeme.project.racing.controller

class RaceStatistic(
    val id: String,
    val users: MutableList<DriverMetrics> = mutableListOf()
)
package com.retypeme.project.racing.controller

class DriverMetrics(
    val sessionId: String,
    val userId: String,
    var walletId: String,
    var place: Int,
    var cpm: Int,
    var progress: Int,
    var state: String
)
